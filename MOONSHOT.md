# Midnight Monthly Moonshots evidence map

Secret Pond Proof is also a candidate for Rise In's **New Moon to Full: Monthly Moonshots on Midnight** program. The program is open to everyone, closes registration on September 30, 2026, and advertises an $8,000 monthly prize pool.

Official program page: <https://risein.com/programs/new-moon-to-full-monthly-moonshots-on-midnight>

## Evidence already complete

### Level 1 — Setup and first contract

- Approved by Rise In on September 19, 2026.
- Compact contract: `contract/src/secret-pond.compact`
- Public Preview deployment: `NETWORK-PROOF.md`
- Finalized proof transaction at Preview block `925805`
- Public project idea and setup instructions: `README.md`

### Level 2 — Frontend integration

- Working browser dashboard: `src/server.js` and `web/index.html`
- Public demo: <https://daveaire.github.io/midnight-secret-pond/>
- Dashboard executes the generated Compact state machine directly in the browser and shows only public policy results, the commitment, and the accepted-proof counter.
- Lace is discovered through the official `window.midnight` connector. The UI requests Preprod, verifies both connection and configuration network IDs, reads the unshielded address, and disconnects the local DApp session without signing or spending.
- The command-line workflow now has public Preview and Preprod proof evidence. The Preprod contract is `106445fc38b1291834ca9fd0eb22e3a89147c1717a2379ae3885b2dbb1989214`; its first `proveOpportunity` call finalized in transaction `00723ecaa4aba4213b4b053d68405d726fc96947f57d5d7d4f5b3b6b252b723e08` at block `2612394`.
- A recorded Lace-connected browser demonstration remains incomplete and must not be claimed yet.

### Level 3 — Production-grade dApp

- Nine automated tests cover acceptance, every rejection path, persistent state, commitment binding, and privacy output.
- `npm run check` combines syntax checks, TypeScript type checking, and all tests.
- `.github/workflows/ci.yml` runs the same verification on pushes and pull requests.
- Reproducible natural-voice demo builder: `scripts/build-demo-video.py`
- Published demo: <https://youtu.be/5Ik1cGvbOrY>

## Remaining program gates

- Import or fund a Lace Preprod test wallet, then record wallet connection and a successful browser circuit call.
- Do not claim Level 4, Level 5, or Level 6 until the MVP, feedback, user-count, and Mainnet requirements are actually met.
