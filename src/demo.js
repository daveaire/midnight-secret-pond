import { evaluatePrivateOpportunity } from './proof.js';

const privateOpportunity = {
  secretRoute: 'synthetic-origin:asset-x>bridge-y>destination-z:salt-42',
  netBps: 87,
  bridgeSeconds: 540,
  liquidityUsd: 48_000,
};

const proof = evaluatePrivateOpportunity(privateOpportunity);
console.log(JSON.stringify({
  contract: 'Secret Pond Proof',
  proof,
  privateInputPublished: false,
  note: 'Synthetic demo data; no production pond is disclosed.',
}, null, 2));
