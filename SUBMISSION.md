# Midnight Korea Hackathon 2026 submission draft

**Project:** Secret Pond Proof

**One line:** Prove a trading opportunity satisfies profitability, speed, and liquidity policy without revealing the token, venues, size, or route.

## Problem

Trading teams need auditability, but public evidence can destroy the edge it proves. A screenshot or dashboard that names the asset and venues lets competitors copy the route before the operator can use it.

## Midnight implementation

The Compact contract receives route facts through private witness functions. `proveOpportunity` checks three public rules inside the circuit:

- net return is at least 25 basis points;
- bridge time is at most 20 minutes;
- available liquidity is at least $10,000.

Only a persistent commitment and accepted-proof counter enter public ledger state. The route hash, exact return, bridge time, and liquidity remain private. Changing any private fact changes the commitment.

## Evidence

- The contract compiles with Compact `0.34.0` / language `0.26.0`.
- Generated proving and verification keys are included.
- Seven tests execute the generated Compact state machine and prove valid acceptance, all three circuit rejection paths, commitment binding, and absence of route text in public output.
- The dashboard shows the public proof surface and explicitly marks every hidden field.

## Demo

1. Show the private scanner record locally.
2. Run `npm run demo`; only policy, result, and commitment appear.
3. Change net return below 25 bps and show rejection.
4. Restore valid inputs and show that changing one private fact changes the commitment.
5. Open the dashboard and contrast public policy with hidden route fields.

Bundled values are synthetic; the product never publishes a production pond.
