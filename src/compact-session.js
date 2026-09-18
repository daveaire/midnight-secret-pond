import crypto from 'node:crypto';
import {
  Contract,
  ledger,
} from '../contract/src/managed/contract/index.js';
import {
  createCircuitContext,
  createConstructorContext,
  sampleContractAddress,
} from '@midnight-ntwrk/compact-runtime';

const UINT64_MAX = 18_446_744_073_709_551_615n;

function uint64(value, name) {
  const parsed = BigInt(value);
  if (parsed < 0n || parsed > UINT64_MAX) throw new RangeError(`${name} must fit Uint<64>`);
  return parsed;
}

function privateState(input) {
  if (!input.secretRoute || typeof input.secretRoute !== 'string') {
    throw new TypeError('secretRoute is required');
  }
  return {
    routeHash: new Uint8Array(crypto.createHash('sha256').update(input.secretRoute, 'utf8').digest()),
    netBps: uint64(input.netBps, 'netBps'),
    bridgeSeconds: uint64(input.bridgeSeconds, 'bridgeSeconds'),
    liquidityUsd: uint64(input.liquidityUsd, 'liquidityUsd'),
  };
}

const witnesses = {
  privateRouteHash: ({ privateState: state }) => [state, state.routeHash],
  privateNetBps: ({ privateState: state }) => [state, state.netBps],
  privateBridgeSeconds: ({ privateState: state }) => [state, state.bridgeSeconds],
  privateLiquidityUsd: ({ privateState: state }) => [state, state.liquidityUsd],
};

export class CompactSession {
  static async create() {
    const session = new CompactSession();
    session.contract = new Contract(witnesses);
    session.address = sampleContractAddress();
    const initial = await session.contract.initialState(createConstructorContext(
      privateState({ secretRoute: 'constructor-only', netBps: 0, bridgeSeconds: 0, liquidityUsd: 0 }),
      '00'.repeat(32),
    ));
    session.contractState = initial.currentContractState;
    session.zswapState = initial.currentZswapLocalState;
    return session;
  }

  async prove(input) {
    const state = privateState(input);
    const context = createCircuitContext(
      'proveOpportunity',
      this.address,
      this.zswapState,
      this.contractState,
      state,
    );
    const result = await this.contract.impureCircuits.proveOpportunity(context);
    this.contractState = result.context.callContext.currentQueryContext.state;
    this.zswapState = result.context.callContext.currentZswapLocalState;
    return this.publicState(result.result);
  }

  publicState(commitment) {
    const current = ledger(this.contractState);
    return {
      accepted: current.acceptedProofs > 0n,
      acceptedProofs: Number(current.acceptedProofs),
      commitment: Buffer.from(commitment ?? current.lastCommitment).toString('hex'),
      publicPolicy: {
        minimumNetBps: Number(current.minNetBps),
        maximumBridgeSeconds: Number(current.maxBridgeSeconds),
        minimumLiquidityUsd: Number(current.minLiquidityUsd),
      },
      privateFieldsDisclosed: [],
      execution: {
        engine: 'generated-compact-contract',
        circuit: 'proveOpportunity',
      },
    };
  }
}
