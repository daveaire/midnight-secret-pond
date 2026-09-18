# Midnight Korea Hackathon 2026 submission draft

**Project:** Secret Pond Proof

**One line:** Prove an executable arbitrage opportunity satisfies profitability, speed, and liquidity policy without revealing the asset, venues, trade size, or market route.

## Problem

Trading teams need auditability, but public evidence can destroy the edge it proves. An arbitrage market route consists of an asset, buy and sell venues or networks, available liquidity, and a bridge or inventory-rebalancing path. Within that route, an executable arbitrage opportunity is a specific, time-sensitive trade whose expected proceeds remain positive after acquisition cost, trading fees, gas, slippage, bridge cost, and expected rebalancing cost. A screenshot that names those inputs lets competitors copy the route before the operator can use it.

## Midnight implementation

The Compact contract receives opportunity facts through private witness functions. `proveOpportunity` checks three public rules inside the circuit:

- net return is at least 25 basis points;
- bridge time is at most 20 minutes;
- available liquidity is at least $10,000.

Only a persistent commitment and accepted-proof counter enter public ledger state. The market-route hash, exact net return, bridge time, and liquidity remain private. Changing any private fact changes the commitment.

The current circuit proves that one observed opportunity satisfies policy. It does not claim that the underlying market route will remain profitable or that quoted liquidity will still exist at execution time.

## Evidence

- The contract compiles with Compact `0.34.0` / language `0.26.0`.
- Generated proving and verification keys are included.
- Nine tests execute the generated Compact state machine and prove valid acceptance, all three circuit rejection paths, persistent ledger updates, commitment binding, and absence of route text in public output.
- The interactive dashboard calls `proveOpportunity` on the generated contract, displays the resulting public ledger, and explicitly marks every hidden field.

## Demo

1. Show the private scanner record locally.
2. Run `npm run demo`; only policy, result, and commitment appear.
3. Change net return below 25 bps and show rejection.
4. Restore valid inputs and show that changing one private fact changes the commitment.
5. Open the dashboard and contrast public policy with hidden route fields.

Bundled values are synthetic; the product never publishes a production pond.
