import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluatePrivateOpportunity } from '../src/proof.js';

const valid = {
  secretRoute: 'private-route-with-salt',
  netBps: 80,
  bridgeSeconds: 600,
  liquidityUsd: 25_000,
};

test('accepts a private opportunity that satisfies every public policy bound', () => {
  const result = evaluatePrivateOpportunity(valid);
  assert.equal(result.accepted, true);
  assert.deepEqual(result.failedRules, []);
  assert.match(result.commitment, /^[0-9a-f]{64}$/);
  assert.deepEqual(result.privateFieldsDisclosed, []);
  assert.equal(JSON.stringify(result).includes(valid.secretRoute), false);
});

test('commitment changes when any private route fact changes', () => {
  const baseline = evaluatePrivateOpportunity(valid).commitment;
  assert.notEqual(evaluatePrivateOpportunity({ ...valid, netBps: 81 }).commitment, baseline);
  assert.notEqual(evaluatePrivateOpportunity({ ...valid, bridgeSeconds: 601 }).commitment, baseline);
  assert.notEqual(evaluatePrivateOpportunity({ ...valid, liquidityUsd: 25_001 }).commitment, baseline);
  assert.notEqual(evaluatePrivateOpportunity({ ...valid, secretRoute: 'another-private-route' }).commitment, baseline);
});

test('rejects each policy failure without revealing the route', () => {
  const result = evaluatePrivateOpportunity({
    ...valid,
    netBps: 24,
    bridgeSeconds: 1201,
    liquidityUsd: 9999,
  });
  assert.equal(result.accepted, false);
  assert.deepEqual(result.failedRules, [
    'net-return-below-policy',
    'bridge-too-slow',
    'liquidity-below-policy',
  ]);
  assert.equal(JSON.stringify(result).includes(valid.secretRoute), false);
});
