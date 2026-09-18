import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { Contract, ledger } from '../contract/src/managed/contract/index.js';
import {
  createCircuitContext,
  createConstructorContext,
  sampleContractAddress,
} from '@midnight-ntwrk/compact-runtime';

function privateState(overrides = {}) {
  return {
    routeHash: new Uint8Array(crypto.createHash('sha256').update('private-route').digest()),
    netBps: 80n,
    bridgeSeconds: 600n,
    liquidityUsd: 25_000n,
    ...overrides,
  };
}

const witnesses = {
  privateRouteHash: ({ privateState: state }) => [state, state.routeHash],
  privateNetBps: ({ privateState: state }) => [state, state.netBps],
  privateBridgeSeconds: ({ privateState: state }) => [state, state.bridgeSeconds],
  privateLiquidityUsd: ({ privateState: state }) => [state, state.liquidityUsd],
};

async function prepare(state) {
  const contract = new Contract(witnesses);
  const initial = await contract.initialState(
    createConstructorContext(state, '00'.repeat(32)),
  );
  const context = createCircuitContext(
    sampleContractAddress(),
    initial.currentZswapLocalState,
    initial.currentContractState,
    initial.currentPrivateState,
  );
  return { contract, context };
}

test('generated Compact circuit publishes one commitment for valid private witnesses', async () => {
  const state = privateState();
  const { contract, context } = await prepare(state);
  const result = await contract.impureCircuits.proveOpportunity(context);
  const publicLedger = ledger(result.context.currentQueryContext.state);
  assert.equal(publicLedger.acceptedProofs, 1n);
  assert.equal(publicLedger.minNetBps, 25n);
  assert.equal(publicLedger.maxBridgeSeconds, 1200n);
  assert.equal(publicLedger.minLiquidityUsd, 10_000n);
  assert.deepEqual(publicLedger.lastCommitment, result.result);
  assert.equal(result.context.currentPrivateState, state);
});

for (const [name, overrides, message] of [
  ['low net return', { netBps: 24n }, 'Net return is below policy'],
  ['slow bridge', { bridgeSeconds: 1201n }, 'Bridge is too slow'],
  ['low liquidity', { liquidityUsd: 9999n }, 'Liquidity is below policy'],
]) {
  test(`generated Compact circuit rejects ${name}`, async () => {
    const { contract, context } = await prepare(privateState(overrides));
    assert.throws(
      () => contract.impureCircuits.proveOpportunity(context),
      new RegExp(message),
    );
  });
}
