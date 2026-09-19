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
- Dashboard executes the generated Compact state machine and shows only public policy results, the commitment, and the accepted-proof counter.
- Lace is discovered through the official `window.midnight` connector. The UI requests Preprod, verifies both connection and configuration network IDs, reads the unshielded address, and disconnects the local DApp session without signing or spending.
- The command-line workflow has public Preview proof evidence. Preprod deployment and a recorded Lace-connected circuit demonstration remain incomplete and must not be claimed yet.

### Level 3 — Production-grade dApp

- Nine automated tests cover acceptance, every rejection path, persistent state, commitment binding, and privacy output.
- `npm run check` combines syntax checks, TypeScript type checking, and all tests.
- `.github/workflows/ci.yml` runs the same verification on pushes and pull requests.
- Reproducible natural-voice demo builder: `scripts/build-demo-video.py`
- Published demo: <https://youtu.be/5Ik1cGvbOrY>

## Remaining program gates

- Deploy the contract to Preprod and record the verifiable address.
- Fund and connect a Lace Preprod test wallet, then record wallet connection and a successful circuit call.
- Host the dashboard at a public URL.
- Do not claim Level 4, Level 5, or Level 6 until the MVP, feedback, user-count, and Mainnet requirements are actually met.
