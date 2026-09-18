import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluatePrivateOpportunity } from './proof.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const page = fs.readFileSync(path.join(root, 'web/index.html'));
const port = Number(process.env.PORT || 4190);
const proof = evaluatePrivateOpportunity({
  secretRoute: 'synthetic-origin:asset-x>bridge-y>destination-z:salt-42',
  netBps: 87,
  bridgeSeconds: 540,
  liquidityUsd: 48_000,
});

http.createServer((request, response) => {
  if (request.url === '/api/proof') {
    response.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    response.end(JSON.stringify({
      ...proof,
      compiler: { toolchain: '0.34.0', language: '0.26.0', runtime: '0.19.0' },
      demoData: 'synthetic',
    }));
    return;
  }
  if (request.url === '/' || request.url === '/index.html') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(page);
    return;
  }
  response.writeHead(404).end('Not found');
}).listen(port, '127.0.0.1', () => {
  console.log(`Secret Pond Proof dashboard: http://127.0.0.1:${port}`);
});
