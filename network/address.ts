/** Generate or restore the selected network wallet and print only its public address. */
import { WebSocket } from 'ws';

import { getOrCreateWallet, resolveNetwork } from './network';
import { createWallet, persistWalletState, unshieldedToken } from './wallet';

// @ts-expect-error wallet sync requires a global WebSocket implementation
globalThis.WebSocket = WebSocket;

const { network, config: networkConfig } = resolveNetwork();
const walletRecord = getOrCreateWallet(network);

async function main(): Promise<void> {
  const walletCtx = await createWallet({ network, networkConfig, seed: walletRecord.seed });
  try {
    console.log(`Syncing ${network} wallet...`);
    const state = await walletCtx.wallet.waitForSyncedState();
    await persistWalletState(network, walletCtx);
    const address = walletCtx.unshieldedKeystore.getBech32Address().toString();
    const balance = state.unshielded.balances[unshieldedToken().raw] ?? 0n;

    console.log(`Network: ${network}`);
    console.log(`Address: ${address}`);
    console.log(`tNIGHT:  ${balance}`);
    if (networkConfig.faucet) console.log(`Faucet:  ${networkConfig.faucet}`);
    if (walletRecord.created) {
      console.log('Recovery material was created in the owner-only, gitignored .midnight-state.json file.');
    }
  } finally {
    await walletCtx.wallet.stop();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
