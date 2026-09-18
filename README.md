# Secret Pond Proof

Secret Pond Proof is a Midnight privacy DApp for opportunity verification. A scanner can prove that a route clears public thresholds for net return, bridge time, and liquidity while keeping the token pair, venues, amounts, and route salt private.

The Compact circuit reads the opportunity facts as witnesses, enforces the policy, and publishes only a persistent commitment and an accepted-proof counter. This lets an operator demonstrate disciplined execution or selectively reveal a route later without broadcasting the pond today.

## Why Midnight

Ordinary arbitrage dashboards create a conflict: evidence builds trust, but publishing route details destroys the opportunity. Midnight's zero-knowledge circuits let the operator prove the safety and profitability rules were satisfied without exposing the inputs that create the edge.

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
