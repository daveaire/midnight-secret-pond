import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CompactSession } from './compact-session.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const page = fs.readFileSync(path.join(root, 'web/index.html'));
const browserProof = fs.readFileSync(path.join(root, 'web/proof-client.bundle.js'));
const browserRuntime = fs.readFileSync(path.join(root, 'web/midnight-runtime.wasm'));
const port = Number(process.env.PORT || 4190);
const session = await CompactSession.create();
let latestProof = await session.prove({
  secretRoute: 'synthetic-origin:asset-x>bridge-y>destination-z:salt-42',
  netBps: 87,
  bridgeSeconds: 540,
  liquidityUsd: 48_000,
});

function sendJson(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  let raw = '';
  for await (const chunk of request) {
    raw += chunk;
    if (raw.length > 16_384) throw new Error('Request is too large');
  }
  return JSON.parse(raw || '{}');
}

http.createServer(async (request, response) => {
  if (request.method === 'GET' && request.url === '/api/proof') {
    sendJson(response, 200, {
      ...latestProof,
      compiler: { toolchain: '0.31.1', language: '0.23.0', runtime: '0.16.0' },
      demoData: 'synthetic',
    });
    return;
  }
  if (request.method === 'POST' && request.url === '/api/proof') {
    try {
      latestProof = await session.prove(await readJson(request));
      sendJson(response, 200, {
        ...latestProof,
        compiler: { toolchain: '0.31.1', language: '0.23.0', runtime: '0.16.0' },
        demoData: 'synthetic',
      });
    } catch (error) {
      sendJson(response, 422, {
        accepted: false,
        error: error instanceof Error ? error.message : 'Circuit rejected the opportunity',
        privateFieldsDisclosed: [],
      });
    }
    return;
  }
  if (request.url === '/' || request.url === '/index.html') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(page);
    return;
  }
  if (request.method === 'GET' && request.url === '/proof-client.bundle.js') {
    response.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8', 'Cache-Control': 'no-store' });
    response.end(browserProof);
    return;
  }
  if (request.method === 'GET' && request.url === '/midnight-runtime.wasm') {
    response.writeHead(200, { 'Content-Type': 'application/wasm', 'Cache-Control': 'no-store' });
    response.end(browserRuntime);
    return;
  }
  response.writeHead(404).end('Not found');
}).listen(port, '127.0.0.1', () => {
  console.log(`Secret Pond Proof dashboard: http://127.0.0.1:${port}`);
});
