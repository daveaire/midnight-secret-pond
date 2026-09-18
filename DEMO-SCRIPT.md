# Secret Pond Proof — demo script

Target length: 2 minutes 30 seconds.

## 0:00–0:20 — Problem

“A trading team needs to prove that it follows profitability, speed, and liquidity rules. Publishing the token, venues, size, or route would reveal the opportunity and destroy the edge. Secret Pond Proof resolves that conflict with Midnight.”

Show the dashboard headline and the four `HIDDEN` cards.

## 0:20–0:50 — Compact contract

Open `contract/src/secret-pond.compact` and point to:

- the four witness functions that supply private data;
- the three public policy thresholds;
- the assertions in `proveOpportunity`;
- the disclosed commitment and persistent accepted-proof counter.

“The private route facts enter as witnesses. The circuit enforces all three policy checks. Only a binding commitment and proof counter become public ledger state.”

## 0:50–1:25 — Accepted proof

Open the dashboard. Keep the valid synthetic values and click **Prove privately**.

“This button executes the generated Compact `proveOpportunity` circuit. The proof count advances and the commitment changes, while the public response discloses zero private fields.”

Point to `generated-compact-contract` in the footer and the accepted-proof counter.

## 1:25–1:50 — Circuit rejection

Change net return from `64` to `24` and click **Prove privately**.

“Twenty-four basis points is below the public minimum. The Compact assertion rejects it, and the accepted-proof counter does not advance.”

## 1:50–2:15 — Verification evidence

Run `npm run check` and show all nine tests passing.

“The tests execute the generated state machine, cover every policy rejection path, verify persistent ledger updates, bind every private fact into the commitment, and confirm that no route text appears in public output.”

## 2:15–2:30 — Close

“Secret Pond Proof lets an operator prove that the fish exists without revealing the pond. The same pattern can support private compliance, treasury execution, auctions, and any policy where evidence matters but the underlying data must remain protected.”
