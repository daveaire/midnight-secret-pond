/**
 * Submit one Secret Pond Proof transaction to a deployed Midnight contract.
 *
 * The route label and policy inputs remain in the local private-state store.
 * The network receives the zero-knowledge proof and the contract publishes only
 * its commitment plus the cumulative accepted-proof count.
 */
import { createHash } from 'node:crypto';
import { WebSocket } from 'ws';

import { findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';

import { compiledContract, PRIVATE_STATE_ID, SecretPond, zkConfigPath, type OpportunityPrivateState } from './contract';
import { formatWalletBackupNotice, getDeployment, getOrCreateWallet, resolveNetwork } from './network';
import { createWallet, persistWalletState, type WalletContext } from './wallet';

// @ts-expect-error wallet sync requires a global WebSocket implementation
globalThis.WebSocket = WebSocket;

interface Inputs {
  route: string;
  netBps: bigint;
  bridgeSeconds: bigint;
  liquidityUsd: bigint;
}

function option(name: string, fallback: string): string {
  const equals = process.argv.find((arg) => arg.startsWith(`--${name}=`));
  if (equals) return equals.slice(name.length + 3);
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

function positiveBigInt(name: string, fallback: string): bigint {
  const value = option(name, fallback);
  if (!/^\d+$/.test(value)) throw new Error(`--${name} must be a non-negative integer`);
  return BigInt(value);
}

function readInputs(): Inputs {
  return {
    route: option('route', `synthetic-route-${Date.now()}`),
    netBps: positiveBigInt('net-bps', '80'),
    bridgeSeconds: positiveBigInt('bridge-seconds', '600'),
    liquidityUsd: positiveBigInt('liquidity-usd', '25000'),
  };
}

async function createProviders(walletCtx: WalletContext) {
  const privateStatePassword = process.env.PRIVATE_STATE_PASSWORD?.trim() || 'Local-Devnet-Development-Placeholder-1';
  const zkConfigProvider = new NodeZkConfigProvider<'proveOpportunity'>(zkConfigPath);
  const walletProvider = {
    getCoinPublicKey: () => walletCtx.shieldedSecretKeys.coinPublicKey,
    getEncryptionPublicKey: () => walletCtx.shieldedSecretKeys.encryptionPublicKey,
    async balanceTx(tx: any, ttl?: Date) {
      const recipe = await walletCtx.wallet.balanceUnboundTransaction(
        tx,
        { shieldedSecretKeys: walletCtx.shieldedSecretKeys, dustSecretKey: walletCtx.dustSecretKey },
        { ttl: ttl ?? new Date(Date.now() + 30 * 60 * 1000) },
      );
      return walletCtx.wallet.finalizeRecipe(recipe);
    },
    submitTx: (tx: any) => walletCtx.wallet.submitTransaction(tx) as any,
  };

  return {
    privateStateProvider: levelPrivateStateProvider<typeof PRIVATE_STATE_ID, OpportunityPrivateState>({
      privateStateStoreName: 'secret-pond-private-state',
      accountId: walletCtx.unshieldedKeystore.getBech32Address().toString(),
      privateStoragePasswordProvider: () => privateStatePassword,
    }),
    publicDataProvider: indexerPublicDataProvider(networkConfig.indexer, networkConfig.indexerWS),
    zkConfigProvider,
    proofProvider: httpClientProofProvider(networkConfig.proofServer, zkConfigProvider),
    walletProvider,
    midnightProvider: walletProvider,
  };
}

const { network, config: networkConfig } = resolveNetwork();
const walletRecord = getOrCreateWallet(network);
const backupNotice = formatWalletBackupNotice(walletRecord, network);
if (backupNotice) console.log(backupNotice);

async function main(): Promise<void> {
  const deployment = getDeployment(network);
  if (!deployment) throw new Error(`No ${network} deployment found. Run npm run network:setup first.`);

  const inputs = readInputs();
  const privateState: OpportunityPrivateState = {
    routeHash: new Uint8Array(createHash('sha256').update(inputs.route).digest()),
    netBps: inputs.netBps,
    bridgeSeconds: inputs.bridgeSeconds,
    liquidityUsd: inputs.liquidityUsd,
  };

  console.log(`\nSecret Pond Proof · ${network}`);
  console.log(`Contract: ${deployment.address}`);
  console.log('Syncing wallet...');

  const walletCtx = await createWallet({ network, networkConfig, seed: walletRecord.seed });
  try {
    await walletCtx.wallet.waitForSyncedState();
    await persistWalletState(network, walletCtx);

    const providers = await createProviders(walletCtx);
    const deployed = await findDeployedContract(providers, {
      compiledContract,
      contractAddress: deployment.address,
      privateStateId: PRIVATE_STATE_ID,
      initialPrivateState: privateState,
    });

    // A previous proof may already have populated this key. Set the new inputs
    // only after findDeployedContract scopes the provider to this contract.
    await providers.privateStateProvider.set(PRIVATE_STATE_ID, privateState);

    console.log('Generating proof and submitting transaction...');
    const tx = await deployed.callTx.proveOpportunity();
    const state = await providers.publicDataProvider.queryContractState(deployment.address);
    if (!state) throw new Error('The finalized contract state was not returned by the indexer.');
    const ledger = SecretPond.ledger(state.data);

    console.log('\n✅ Opportunity proof finalized');
    console.log(`Transaction:     ${tx.public.txId}`);
    console.log(`Block height:    ${tx.public.blockHeight}`);
    console.log(`Accepted proofs: ${ledger.acceptedProofs}`);
    console.log(`Commitment:      ${Buffer.from(ledger.lastCommitment).toString('hex')}`);
    console.log('\nPrivate route and economic inputs were not printed or published.');
  } finally {
    await persistWalletState(network, walletCtx);
    await walletCtx.wallet.stop();
  }
}

main().catch((error) => {
  console.error('\n❌ Proof transaction failed');
  console.error(error);
  process.exit(1);
});
