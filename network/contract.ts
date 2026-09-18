import * as path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import * as SecretPond from '../contract/src/managed/contract/index.js';

export interface OpportunityPrivateState {
  routeHash: Uint8Array;
  netBps: bigint;
  bridgeSeconds: bigint;
  liquidityUsd: bigint;
}

export const PRIVATE_STATE_ID = 'secretPondPrivateState';

export const INITIAL_PRIVATE_STATE: OpportunityPrivateState = {
  routeHash: new Uint8Array(createHash('sha256').update('synthetic-network-route').digest()),
  netBps: 80n,
  bridgeSeconds: 600n,
  liquidityUsd: 25_000n,
};

export const opportunityWitnesses: SecretPond.Witnesses<OpportunityPrivateState> = {
  privateRouteHash: ({ privateState }) => [privateState, privateState.routeHash],
  privateNetBps: ({ privateState }) => [privateState, privateState.netBps],
  privateBridgeSeconds: ({ privateState }) => [privateState, privateState.bridgeSeconds],
  privateLiquidityUsd: ({ privateState }) => [privateState, privateState.liquidityUsd],
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const zkConfigPath = path.resolve(__dirname, '..', 'contract', 'src', 'managed');

export const compiledContract = CompiledContract.make('SecretPondProof', SecretPond.Contract).pipe(
  CompiledContract.withWitnesses(opportunityWitnesses),
  CompiledContract.withCompiledFileAssets(zkConfigPath),
);

export { SecretPond };
