import crypto from 'node:crypto';
import { pureCircuits } from '../contract/src/managed/contract/index.js';

export const POLICY = Object.freeze({
  minimumNetBps: 25n,
  maximumBridgeSeconds: 1200n,
  minimumLiquidityUsd: 10_000n,
});

function asUint64(value, name) {
  const parsed = BigInt(value);
  if (parsed < 0n || parsed > 18_446_744_073_709_551_615n) {
    throw new RangeError(`${name} must fit Uint<64>`);
  }
  return parsed;
}

export function hashRouteSecret(secretRoute) {
  if (!secretRoute || typeof secretRoute !== 'string') throw new TypeError('secretRoute is required');
  return new Uint8Array(crypto.createHash('sha256').update(secretRoute, 'utf8').digest());
}

export function evaluatePrivateOpportunity(input) {
  const routeHash = hashRouteSecret(input.secretRoute);
  const netBps = asUint64(input.netBps, 'netBps');
  const bridgeSeconds = asUint64(input.bridgeSeconds, 'bridgeSeconds');
  const liquidityUsd = asUint64(input.liquidityUsd, 'liquidityUsd');
  const failedRules = [];
  if (netBps < POLICY.minimumNetBps) failedRules.push('net-return-below-policy');
  if (bridgeSeconds > POLICY.maximumBridgeSeconds) failedRules.push('bridge-too-slow');
  if (liquidityUsd < POLICY.minimumLiquidityUsd) failedRules.push('liquidity-below-policy');
  const commitment = pureCircuits.opportunityCommitment(
    routeHash,
    netBps,
    bridgeSeconds,
    liquidityUsd,
  );
  return {
    accepted: failedRules.length === 0,
    failedRules,
    commitment: Buffer.from(commitment).toString('hex'),
    publicPolicy: {
      minimumNetBps: Number(POLICY.minimumNetBps),
      maximumBridgeSeconds: Number(POLICY.maximumBridgeSeconds),
      minimumLiquidityUsd: Number(POLICY.minimumLiquidityUsd),
    },
    privateFieldsDisclosed: [],
  };
}
