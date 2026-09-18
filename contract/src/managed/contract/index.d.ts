import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
  privateRouteHash(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  privateNetBps(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint];
  privateBridgeSeconds(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint];
  privateLiquidityUsd(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint];
}

export type ImpureCircuits<PS> = {
  proveOpportunity(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, Uint8Array>;
}

export type ProvableCircuits<PS> = {
  proveOpportunity(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, Uint8Array>;
}

export type PureCircuits = {
  opportunityCommitment(routeHash_0: Uint8Array,
                        netBps_0: bigint,
                        bridgeSeconds_0: bigint,
                        liquidityUsd_0: bigint): Uint8Array;
}

export type Circuits<PS> = {
  proveOpportunity(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, Uint8Array>;
  opportunityCommitment(context: __compactRuntime.CircuitContext<PS>,
                        routeHash_0: Uint8Array,
                        netBps_0: bigint,
                        bridgeSeconds_0: bigint,
                        liquidityUsd_0: bigint): __compactRuntime.CircuitResults<PS, Uint8Array>;
}

export type Ledger = {
  readonly acceptedProofs: bigint;
  readonly lastCommitment: Uint8Array;
  readonly minNetBps: bigint;
  readonly maxBridgeSeconds: bigint;
  readonly minLiquidityUsd: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
