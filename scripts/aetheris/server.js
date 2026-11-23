'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');
const {
  DEFAULT_HOST,
  DEFAULT_PORT,
  buildAllowedHostnames,
  isAllowedHostHeader,
  isAllowedOrigin,
  loadActivity,
  resolvePlatformHost,
} = require('./lib');
const { DEFAULT_ROOT, loadFullItem, loadPlatformData } = require('./loaders');
const {
  buildBundle,
  deleteItem,
  getPlaygroundStatus,
  runPlayground,
  saveItem,
  toggleHook,
  toggleMcpServer,
} = require('./actions');
const { MODERN_SVG_LOGO, renderHTML } = require('./template');

const MAX_BODY_BYTES = 2 * 1024 * 1024;

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(payload));
}

function sendHtml(res, statusCode, html) {
  res.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(html);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    let size = 0;
    req.setEncoding('utf8');
    req.on('data', chunk => {
      size += Buffer.byteLength(chunk);
      if (size > MAX_BODY_BYTES) {
        reject(new Error('Payload too large'));
        req.destroy();
        return;
      }
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', reject);
  });
}

function createPlatformServer({
  root = DEFAULT_ROOT,
  host = DEFAULT_HOST,
  port = DEFAULT_PORT,
  loadData = loadPlatformData,
  render = renderHTML,
} = {}) {
  const resolvedHost = resolvePlatformHost({ AETHERIS_HOST: host });
  const allowedHostnames = buildAllowedHostnames(resolvedHost);

  return http.createServer(async (req, res) => {
    if (!isAllowedHostHeader(req.headers.host, allowedHostnames)) {
      return sendJson(res, 421, { error: 'Misdirected request' });
    }
    if (!isAllowedOrigin(req.headers.origin, allowedHostnames)) {
      return sendJson(res, 403, { error: 'Forbidden origin' });
    }

    let url;
    try {
      url = new URL(req.url, `http://${DEFAULT_HOST}`);
    } catch {
      return sendJson(res, 400, { error: 'Bad request' });
    }

    if (url.pathname === '/sol-qr.png') {
      const qrPath = path.join(root, 'assets', 'sol-qr.png');
      if (fs.existsSync(qrPath)) {
        res.writeHead(200, { 'Content-Type': 'image/png', 'Cache-Control': 'no-cache' });
        return fs.createReadStream(qrPath).pipe(res);
      }
      return sendJson(res, 404, { error: 'QR not found' });
    }

    if (url.pathname === '/avatar.png') {
      const avatarPath = path.join(root, 'assets', 'aetheris-avatar.png');
      if (fs.existsSync(avatarPath)) {
        res.writeHead(200, { 'Content-Type': 'image/png', 'Cache-Control': 'no-cache' });
        const stream = fs.createReadStream(avatarPath);
        stream.on('error', err => {
          console.error('[AETHERIS] Failed to stream avatar:', err.message);
          if (!res.headersSent) sendJson(res, 500, { error: 'Avatar read error' });
          else res.end();
        });
        return stream.pipe(res);
      }
      return sendJson(res, 404, { error: 'Avatar not found' });
    }

    if (url.pathname === '/brand-logo.png') {
      const logoPath = path.join(root, 'assets', 'brand-logo.png');
      if (fs.existsSync(logoPath)) {
        res.writeHead(200, { 'Content-Type': 'image/png', 'Cache-Control': 'no-cache' });
        const stream = fs.createReadStream(logoPath);
        stream.on('error', err => {
          console.error('[AETHERIS] Failed to stream brand logo:', err.message);
          if (!res.headersSent) sendJson(res, 500, { error: 'Logo read error' });
          else res.end();
        });
        return stream.pipe(res);
      }
      res.writeHead(200, { 'Content-Type': 'image/svg+xml; charset=utf-8', 'Cache-Control': 'no-cache' });
      return res.end(MODERN_SVG_LOGO);
    }

    if (url.pathname === '/api/item' && req.method === 'GET') {
      const type = url.searchParams.get('type') || '';
      const name = url.searchParams.get('name') || '';
      const result = loadFullItem(root, type, name);
      if (result.status !== 200) return sendJson(res, result.status, { error: result.error });
      return sendJson(res, 200, { content: result.content });
    }

    const isPreview = String(process.env.AETHERIS_EDITION || 'full').toLowerCase() === 'preview';

    if (url.pathname === '/api/item/save' && req.method === 'POST') {
      if (isPreview) return sendJson(res, 402, { error: 'Full License required. Contribute in SOL to unlock editing and downloads.' });
      try {
        const body = await readJsonBody(req);
        const result = saveItem(root, body);
        return sendJson(res, 200, result);
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    if (url.pathname === '/api/item/delete' && req.method === 'POST') {
      if (isPreview) return sendJson(res, 402, { error: 'Full License required. Contribute in SOL to unlock.' });
      try {
        const body = await readJsonBody(req);
        const result = deleteItem(root, body);
        return sendJson(res, 200, result);
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    if (url.pathname === '/api/mcps/toggle' && req.method === 'POST') {
      try {
        const body = await readJsonBody(req);
        return sendJson(res, 200, toggleMcpServer(root, body));
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    if (url.pathname === '/api/hooks/toggle' && req.method === 'POST') {
      try {
        const body = await readJsonBody(req);
        return sendJson(res, 200, toggleHook(root, body));
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    if (url.pathname === '/api/bundle/export' && req.method === 'POST') {
      if (isPreview) return sendJson(res, 402, { error: 'Downloads are locked in Preview Edition. Contribute in SOL to unlock the Full Licensed Repository.' });
      try {
        const body = await readJsonBody(req);
        return sendJson(res, 200, buildBundle(root, body));
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    if (url.pathname === '/api/playground/status' && req.method === 'GET') {
      try {
        return sendJson(res, 200, await getPlaygroundStatus());
      } catch (err) {
        return sendJson(res, 500, { error: err.message });
      }
    }

    if (url.pathname === '/api/playground/run' && req.method === 'POST') {
      try {
        const body = await readJsonBody(req);
        const result = await runPlayground(root, body);
        return sendJson(res, 200, result);
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    if (url.pathname === '/api/activity') {
      try {
        return sendJson(res, 200, { entries: loadActivity() });
      } catch (error) {
        console.error('[AETHERIS] Activity error:', error.message);
        return sendJson(res, 500, { error: 'Internal server error' });
      }
    }

    if (url.pathname === '/api/data') {
      try {
        return sendJson(res, 200, loadData(root));
      } catch (error) {
        console.error('[AETHERIS] Data load error:', error.message);
        return sendJson(res, 500, { error: 'Internal server error' });
      }
    }

    try {
      return sendHtml(res, 200, render(loadData(root), { port, edition: isPreview ? 'preview' : 'full' }));
    } catch (error) {
      console.error('[AETHERIS] Render error:', error);
      return sendHtml(res, 500, '<!DOCTYPE html><p>Unavailable.</p>');
    }
  });
}

function listenPlatformServer(platformServer, { port = DEFAULT_PORT, host = DEFAULT_HOST, onListening } = {}) {
  const resolvedHost = resolvePlatformHost({ AETHERIS_HOST: host });
  return platformServer.listen(port, resolvedHost, onListening);
}

module.exports = {
  createPlatformServer,
  listenPlatformServer,
  sendHtml,
  sendJson,
};
