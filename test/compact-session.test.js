import test from 'node:test';
import assert from 'node:assert/strict';
import { CompactSession } from '../src/compact-session.js';

const valid = {
  secretRoute: 'private-route:one',
  netBps: 80,
  bridgeSeconds: 600,
  liquidityUsd: 25_000,
};

test('session executes the generated Compact circuit and persists public ledger state', async () => {
  const session = await CompactSession.create();
  const first = await session.prove(valid);
  const second = await session.prove({ ...valid, secretRoute: 'private-route:two' });
  assert.equal(first.execution.engine, 'generated-compact-contract');
  assert.equal(first.acceptedProofs, 1);
  assert.equal(second.acceptedProofs, 2);
  assert.notEqual(first.commitment, second.commitment);
  assert.deepEqual(second.privateFieldsDisclosed, []);
});

test('session rejects private witnesses that fail Compact policy without advancing the ledger', async () => {
  const session = await CompactSession.create();
  await assert.rejects(session.prove({ ...valid, netBps: 24 }), /Net return is below policy/);
  const accepted = await session.prove(valid);
  assert.equal(accepted.acceptedProofs, 1);
});
