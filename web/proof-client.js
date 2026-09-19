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

async function privateState(input) {
  if (!input.secretRoute || typeof input.secretRoute !== 'string') throw new TypeError('secretRoute is required');
  const encoded = new TextEncoder().encode(input.secretRoute);
  const routeHash = new Uint8Array(await crypto.subtle.digest('SHA-256', encoded));
  return {
    routeHash,
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

function hex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export class BrowserCompactSession {
  static async create() {
    const session = new BrowserCompactSession();
    session.contract = new Contract(witnesses);
    session.address = sampleContractAddress();
    const initial = await session.contract.initialState(createConstructorContext(
      await privateState({ secretRoute: 'constructor-only', netBps: 0, bridgeSeconds: 0, liquidityUsd: 0 }),
      '00'.repeat(32),
    ));
    session.contractState = initial.currentContractState;
    session.zswapState = initial.currentZswapLocalState;
    return session;
  }

  async prove(input) {
    const state = await privateState(input);
    const context = createCircuitContext(this.address, this.zswapState, this.contractState, state);
    const result = await this.contract.impureCircuits.proveOpportunity(context);
    this.contractState = result.context.currentQueryContext.state;
    this.zswapState = result.context.currentZswapLocalState;
    const current = ledger(this.contractState);
    return {
      accepted: true,
      acceptedProofs: Number(current.acceptedProofs),
      commitment: hex(result.result ?? current.lastCommitment),
      publicPolicy: {
        minimumNetBps: Number(current.minNetBps),
        maximumBridgeSeconds: Number(current.maxBridgeSeconds),
        minimumLiquidityUsd: Number(current.minLiquidityUsd),
      },
      privateFieldsDisclosed: [],
      execution: { engine: 'generated-compact-contract-browser', circuit: 'proveOpportunity' },
      compiler: { toolchain: '0.31.1', language: '0.23.0', runtime: '0.16.0' },
    };
  }
}
