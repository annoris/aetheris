#!/usr/bin/env node
'use strict';
if (!process.env.AETHERIS_EDITION) process.env.AETHERIS_EDITION = 'preview';

/**
 * Aetheris — Modern AI Automation Platform CLI Entry Point
 * Usage: node scripts/aetheris-web.js [port]
 * Default: http://127.0.0.1:4820
 */

const { DEFAULT_HOST, DEFAULT_PORT, PLATFORM_VERSION, parsePort, resolvePlatformHost } = require('./aetheris/lib');
const { loadPlatformData } = require('./aetheris/loaders');
const { createPlatformServer, listenPlatformServer } = require('./aetheris/server');
const { renderHTML } = require('./aetheris/template');

const PORT = parsePort(process.argv[2] || process.env.AETHERIS_PORT, DEFAULT_PORT);
const HOST = resolvePlatformHost(process.env);

if (require.main === module) {
  const server = createPlatformServer({ host: HOST, port: PORT });
  listenPlatformServer(server, {
    port: PORT,
    host: HOST,
    onListening: () => {
      const displayHost = HOST.includes(':') ? `[${HOST}]` : HOST;
      console.log(`\n    Aetheris v${PLATFORM_VERSION}  →  http://${displayHost}:${PORT}\n`);
    },
  });
}

module.exports = {
  DEFAULT_HOST,
  DEFAULT_PORT,
  HOST,
  PLATFORM_VERSION,
  PORT,
  createPlatformServer,
  listenPlatformServer,
  loadPlatformData,
  renderHTML,
};
