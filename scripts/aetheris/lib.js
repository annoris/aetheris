'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = 4820;
const PLATFORM_VERSION = '4.0';
const MAX_ACTIVITY_LOG_BYTES = 256 * 1024;
const LOOPBACK_HOSTNAMES = new Set(['127.0.0.1', 'localhost', '[::1]', '::1']);

function parseHostHeader(value) {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const match = trimmed.match(/^(\[[^\]]+\]|[^:]+)(?::(\d+))?$/);
  if (!match) return null;
  if (match[2] !== undefined) {
    const port = Number(match[2]);
    if (!Number.isInteger(port) || port < 1 || port > 65535) return null;
  }
  return match[1].toLowerCase();
}

function buildAllowedHostnames(configuredHost) {
  const allowed = new Set(LOOPBACK_HOSTNAMES);
  if (configuredHost) {
    const normalized = String(configuredHost).trim().toLowerCase();
    if (normalized) allowed.add(normalized);
  }
  return allowed;
}

function isAllowedHostHeader(hostHeader, allowedHostnames) {
  const hostname = parseHostHeader(hostHeader);
  if (!hostname) return false;
  return allowedHostnames.has(hostname);
}

function isAllowedOrigin(originHeader, allowedHostnames) {
  if (!originHeader || typeof originHeader !== 'string') return true;
  try {
    const url = new URL(originHeader);
    return allowedHostnames.has(url.hostname.toLowerCase());
  } catch {
    return false;
  }
}

function resolvePlatformHost(env = process.env) {
  const configured = String(env.AETHERIS_HOST || '').trim().toLowerCase();
  if (!configured) return DEFAULT_HOST;
  if (!LOOPBACK_HOSTNAMES.has(configured)) {
    throw new Error('[AETHERIS] AETHERIS_HOST must be loopback-only (127.0.0.1, localhost, or ::1).');
  }
  return configured === '[::1]' ? '::1' : configured;
}

function parsePort(value, fallback = DEFAULT_PORT) {
  if (value === undefined || value === null || value === '') return fallback;
  const n = parseInt(String(value), 10);
  if (Number.isNaN(n) || n < 1 || n > 65535) return fallback;
  return n;
}

function normalizeTools(value) {
  if (Array.isArray(value)) {
    return value.map(item => String(item).trim()).filter(Boolean);
  }
  if (typeof value !== 'string') return [];
  const trimmed = value.trim();
  if (!trimmed) return [];
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map(item => String(item).trim()).filter(Boolean);
      }
    } catch {
      return trimmed
        .slice(1, -1)
        .split(',')
        .map(item => item.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    }
  }
  return trimmed
    .split(',')
    .map(item => item.trim().replace(/^["']|["']$/g, ''))
    .filter(Boolean);
}

function stripFrontmatter(content) {
  return String(content || '').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n*/, '').trim();
}

function parseFrontmatter(content) {
  const text = String(content || '');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    return { _body: text.trim() };
  }
  const fm = {};
  for (const line of match[1].split(/\r?\n/)) {
    const sep = line.indexOf(':');
    if (sep <= 0) continue;
    const key = line.slice(0, sep).trim();
    let val = line.slice(sep + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (key === 'tools') {
      val = normalizeTools(val);
    } else if (val.startsWith('[') && val.endsWith(']')) {
      try {
        val = JSON.parse(val);
      } catch {
        val = val
          .slice(1, -1)
          .split(',')
          .map(item => item.trim().replace(/^["']|["']$/g, ''))
          .filter(Boolean);
      }
    }
    fm[key] = val;
  }
  fm._body = stripFrontmatter(text);
  return fm;
}

function readFrontmatter(filePath) {
  try {
    return parseFrontmatter(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    if (err && err.code === 'ENOENT') return { _body: '' };
    console.error(`[AETHERIS] Failed to read frontmatter from ${filePath}:`, err.message);
    return { _body: '' };
  }
}

function getActivityLogPath(env = process.env) {
  const dataDir = String(env.AETHERIS_DATA_DIR || '').trim() || path.join(os.homedir(), '.aetheris');
  return path.join(dataDir, 'metrics', 'tool-usage.jsonl');
}

function loadActivity(limit = 200, logPath = getActivityLogPath()) {
  let fd;
  let text = '';
  try {
    fd = fs.openSync(logPath, 'r');
    const stat = fs.fstatSync(fd);
    if (!stat.isFile() || stat.size === 0) return [];
    const length = Math.min(stat.size, MAX_ACTIVITY_LOG_BYTES);
    const start = stat.size - length;
    const buffer = Buffer.alloc(length);
    const bytesRead = fs.readSync(fd, buffer, 0, length, start);
    text = buffer.toString('utf8', 0, bytesRead);
    if (start > 0) {
      const nlIndex = text.indexOf('\n');
      text = nlIndex === -1 ? '' : text.slice(nlIndex + 1);
    }
  } catch (err) {
    if (err && err.code === 'ENOENT') return [];
    console.error(`[AETHERIS] Failed to read activity log ${logPath}:`, err.message);
    return [];
  } finally {
    if (fd !== undefined) {
      try {
        fs.closeSync(fd);
      } catch (closeErr) {
        console.error('[AETHERIS] Failed to close activity log descriptor:', closeErr.message);
      }
    }
  }

  const lines = text.split('\n').filter(Boolean);
  const startIndex = Math.max(0, lines.length - limit);
  const entries = [];
  for (let i = lines.length - 1; i >= startIndex; i -= 1) {
    try {
      const row = JSON.parse(lines[i]);
      if (row && typeof row === 'object' && !Array.isArray(row) && typeof row.session_id === 'string' && typeof row.tool_name === 'string') {
        entries.push(row);
      }
    } catch {
      // Skip malformed JSONL line
    }
  }
  return entries;
}

module.exports = {
  DEFAULT_HOST,
  DEFAULT_PORT,
  LOOPBACK_HOSTNAMES,
  MAX_ACTIVITY_LOG_BYTES,
  PLATFORM_VERSION,
  buildAllowedHostnames,
  getActivityLogPath,
  isAllowedHostHeader,
  isAllowedOrigin,
  loadActivity,
  normalizeTools,
  parseFrontmatter,
  parseHostHeader,
  parsePort,
  readFrontmatter,
  resolvePlatformHost,
  stripFrontmatter,
};
