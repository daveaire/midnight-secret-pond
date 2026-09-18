# Secret Pond Proof

Secret Pond Proof is a Midnight privacy DApp for verifying executable arbitrage opportunities. A scanner can prove that a market route clears public thresholds for net return, bridge time, and liquidity while keeping the asset, venues, trade size, and route salt private.

The Compact circuit reads the opportunity facts as witnesses, enforces the policy, and publishes only a persistent commitment and an accepted-proof counter. This lets an operator demonstrate disciplined execution or selectively reveal a route later without broadcasting the pond today.

## Why Midnight

Ordinary arbitrage dashboards create a conflict: evidence builds trust, but publishing route details destroys the opportunity. Midnight's zero-knowledge circuits let the operator prove the safety and profitability rules were satisfied without exposing the inputs that create the edge.

## Domain terminology

The project name uses a fishing metaphor, but the product and demo use precise market terms:

- **Arbitrage market route** (the “pond”): a repeatable configuration consisting of an asset, buy and sell venues or networks, usable liquidity, and a bridge or inventory-rebalancing path.
- **Executable arbitrage opportunity** (a “fish”): a time-sensitive quote for a defined trade size whose expected proceeds exceed acquisition cost, trading fees, gas, slippage, bridge cost, and expected rebalancing cost.
- **Inventory arbitrage**: execute the buy and sell legs against capital already positioned on both sides, then rebalance only when one side approaches its inventory limit.

A route can remain viable even when no executable opportunity exists at the current prices. Secret Pond Proof evaluates an individual opportunity, not the general existence or future profitability of a market route.

## Verified build

- Compact toolchain `0.34.0`
- Compact language `0.26.0`
- Compact runtime `0.19.0`
- Generated prover/verifier keys and ZKIR are under `contract/src/managed`
- Nine tests execute the generated Compact state machine, persistent session ledger, and public-output helper, including every policy rejection path

The dashboard calls `proveOpportunity` on the generated Compact contract. Try a valid private route, then set net return below 25 bps to watch the circuit reject it without publishing the route.

```sh
npm install
npm run check
npm run demo
npm run dashboard
```

To regenerate the circuit artifacts with Compact installed:

```sh
npm run compile
```

All bundled demo values are synthetic. No production opportunity, wallet secret, API credential, or private route is committed to this repository.
