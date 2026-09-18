# Secret Pond Proof — demo script

Target length: 2 minutes 30 seconds.

## 0:00–0:20 — Problem

“A trading team needs to prove that it follows profitability, speed, and liquidity rules. Publishing the asset, venues, size, or market route would reveal the opportunity and destroy the edge. Secret Pond Proof resolves that conflict with Midnight.”

“The project name uses a fishing metaphor. A pond means an arbitrage market route: the asset, buy and sell venues or networks, liquidity, and rebalancing path. A fish means one executable arbitrage opportunity: a time-sensitive trade at a defined size that remains profitable after every execution and rebalancing cost. From here I will use the market terms.”

Show the dashboard headline and the four `HIDDEN` cards.

## 0:20–0:50 — Compact contract

Open `contract/src/secret-pond.compact` and point to:

- the four witness functions that supply private data;
- the three public policy thresholds;
- the assertions in `proveOpportunity`;
- the disclosed commitment and persistent accepted-proof counter.

“The private opportunity facts enter as witnesses. The circuit enforces all three policy checks. Only a binding commitment and proof counter become public ledger state.”

## 0:50–1:25 — Accepted proof

Open the dashboard. Keep the valid synthetic values and click **Prove opportunity**.

“This button executes the generated Compact `proveOpportunity` circuit. The proof count advances and the commitment changes, while the public response discloses zero private fields.”

Point to `generated-compact-contract` in the footer and the accepted-proof counter.

## 1:25–1:50 — Circuit rejection

Change net return from `64` to `24` and click **Prove opportunity**.

“Twenty-four basis points is below the public minimum. The Compact assertion rejects it, and the accepted-proof counter does not advance.”

## 1:50–2:20 — Verification evidence

Run `npm run check` and show all nine tests passing.

“The tests execute the generated state machine, cover every policy rejection path, verify persistent ledger updates, bind every private fact into the commitment, and confirm that no route text appears in public output.”

Open `NETWORK-PROOF.md` and point to the public Preview contract, finalized transaction ID, and block height.

“This is a real proof-server transaction finalized on Midnight Preview at block 925,805. The public contract is `5ff4ed…b53eea`, and the indexer returned only the commitment and accepted-proof count. The private market route and economic inputs did not enter public state.”

## 2:20–2:30 — Close

“Secret Pond Proof lets an operator prove that an executable opportunity satisfies policy without revealing the market route. The same pattern can support private compliance, treasury execution, auctions, and any policy where evidence matters but the underlying data must remain protected.”
