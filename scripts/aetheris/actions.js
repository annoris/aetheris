'use strict';

const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const { execFileSync } = require('child_process');
const { loadFullItem } = require('./loaders');

const SAFE_SLUG = /^[a-z0-9][a-z0-9_-]{0,80}$/i;

function assertSafeSlug(name) {
  const clean = String(name || '').trim().replace(/\.md$/i, '');
  if (!SAFE_SLUG.test(clean)) {
    throw new Error('Invalid name. Use letters, numbers, hyphens, or underscores only.');
  }
  return clean;
}

function resolveContained(root, ...parts) {
  const resolvedRoot = path.resolve(root);
  const target = path.resolve(resolvedRoot, ...parts);
  if (target !== resolvedRoot && !target.startsWith(resolvedRoot + path.sep)) {
    throw new Error('Path traversal blocked');
  }
  return target;
}

function validateAgentsIfPresent(root) {
  const validator = path.join(root, 'scripts', 'ci', 'validate-agents.js');
  if (!fs.existsSync(validator)) return { validated: false };
  try {
    const out = execFileSync(process.execPath, [validator], { cwd: root, encoding: 'utf8', timeout: 8000 });
    return { validated: true, output: out.trim() };
  } catch (err) {
    throw new Error((err.stderr || err.stdout || err.message || 'Agent validation failed').trim());
  }
}

function saveItem(root, { type, name, description = '', model = 'sonnet', tools = [], body = '' }) {
  const slug = assertSafeSlug(name);
  const cleanBody = String(body || '').trim();
  const cleanDesc = String(description || '').replace(/\r?\n/g, ' ').trim();

  if (type === 'agents') {
    const target = resolveContained(root, 'agents', `${slug}.md`);
    const toolList = Array.isArray(tools)
      ? tools.map(t => String(t).trim()).filter(Boolean)
      : String(tools || '').split(',').map(t => t.trim()).filter(Boolean);
    const frontmatter = [
      '---',
      `name: ${slug}`,
      `description: ${cleanDesc || `${slug} specialized agent`}`,
      `model: ${String(model || 'sonnet').trim()}`,
      `tools: ${toolList.length ? toolList.join(', ') : 'Read, Grep, Glob'}`,
      '---',
      '',
    ].join('\n');
    const prev = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : null;
    fs.writeFileSync(target, frontmatter + cleanBody + '\n', 'utf8');
    try {
      const validation = validateAgentsIfPresent(root);
      return { ok: true, name: slug, file: `${slug}.md`, validation };
    } catch (err) {
      if (prev !== null) fs.writeFileSync(target, prev, 'utf8');
      else if (fs.existsSync(target)) fs.unlinkSync(target);
      throw err;
    }
  }

  if (type === 'skills') {
    const dir = resolveContained(root, 'skills', slug);
    const target = path.join(dir, 'SKILL.md');
    fs.mkdirSync(dir, { recursive: true });
    const frontmatter = [
      '---',
      `name: ${slug}`,
      `description: ${cleanDesc || `${slug} workflow skill`}`,
      '---',
      '',
    ].join('\n');
    fs.writeFileSync(target, frontmatter + cleanBody + '\n', 'utf8');
    return { ok: true, name: slug, file: `${slug}/SKILL.md` };
  }

  if (type === 'commands') {
    const target = resolveContained(root, 'commands', `${slug}.md`);
    const frontmatter = [
      '---',
      `description: ${cleanDesc || `${slug} command`}`,
      '---',
      '',
    ].join('\n');
    fs.writeFileSync(target, frontmatter + cleanBody + '\n', 'utf8');
    return { ok: true, name: '/' + slug, file: `${slug}.md` };
  }

  throw new Error('Unsupported item type');
}

function deleteItem(root, { type, name }) {
  const slug = assertSafeSlug(String(name || '').replace(/^\//, ''));
  if (type === 'agents') {
    const target = resolveContained(root, 'agents', `${slug}.md`);
    if (!fs.existsSync(target)) throw new Error('Agent not found');
    fs.unlinkSync(target);
    return { ok: true, deleted: slug };
  }
  if (type === 'skills') {
    const dir = resolveContained(root, 'skills', slug);
    if (!fs.existsSync(dir)) throw new Error('Skill not found');
    fs.rmSync(dir, { recursive: true, force: true });
    return { ok: true, deleted: slug };
  }
  if (type === 'commands') {
    const target = resolveContained(root, 'commands', `${slug}.md`);
    if (!fs.existsSync(target)) throw new Error('Command not found');
    fs.unlinkSync(target);
    return { ok: true, deleted: slug };
  }
  throw new Error('Unsupported item type');
}

function toggleMcpServer(root, { file, serverName, enabled }) {
  if (!serverName || typeof serverName !== 'string') throw new Error('Missing serverName');
  const filePath = file === '.mcp.json'
    ? resolveContained(root, '.mcp.json')
    : resolveContained(root, 'mcp-configs', path.basename(String(file || '')));
  if (!fs.existsSync(filePath)) throw new Error('MCP config file not found');

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const active = data.mcpServers || {};
  const disabled = data._disabledMcpServers || {};

  if (enabled) {
    if (disabled[serverName]) {
      active[serverName] = disabled[serverName];
      delete disabled[serverName];
    }
  } else if (active[serverName]) {
    disabled[serverName] = active[serverName];
    delete active[serverName];
  }

  data.mcpServers = active;
  if (Object.keys(disabled).length) data._disabledMcpServers = disabled;
  else delete data._disabledMcpServers;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  return { ok: true, file, serverName, enabled: Boolean(enabled) };
}

function toggleHook(root, { id, enabled }) {
  if (!id || typeof id !== 'string') throw new Error('Missing hook id');
  const hooksPath = resolveContained(root, 'hooks', 'hooks.json');
  if (!fs.existsSync(hooksPath)) throw new Error('hooks/hooks.json not found');

  const data = JSON.parse(fs.readFileSync(hooksPath, 'utf8'));
  const hooksMap = data.hooks || {};
  const disabledMap = data._disabledHooks || {};
  let changed = false;

  if (!enabled) {
    for (const [ev, list] of Object.entries(hooksMap)) {
      if (!Array.isArray(list)) continue;
      const idx = list.findIndex((entry, i) => (entry.id || `${ev.toLowerCase()}:${i + 1}`) === id);
      if (idx !== -1) {
        const [removed] = list.splice(idx, 1);
        if (!Array.isArray(disabledMap[ev])) disabledMap[ev] = [];
        disabledMap[ev].push({ ...removed, id });
        changed = true;
        break;
      }
    }
  } else {
    for (const [ev, list] of Object.entries(disabledMap)) {
      if (!Array.isArray(list)) continue;
      const idx = list.findIndex((entry, i) => (entry.id || `${ev.toLowerCase()}:${i + 1}`) === id);
      if (idx !== -1) {
        const [restored] = list.splice(idx, 1);
        if (!Array.isArray(hooksMap[ev])) hooksMap[ev] = [];
        hooksMap[ev].push(restored);
        if (!list.length) delete disabledMap[ev];
        changed = true;
        break;
      }
    }
  }

  if (!changed) throw new Error('Hook not found in hooks/hooks.json');
  data.hooks = hooksMap;
  if (Object.keys(disabledMap).length) data._disabledHooks = disabledMap;
  else delete data._disabledHooks;

  fs.writeFileSync(hooksPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  return { ok: true, id, enabled: Boolean(enabled) };
}

function buildBundle(root, { projectName = 'aetheris-client-bundle', agents = [], skills = [], rules = [] }) {
  const bundle = {
    schema: 'aetheris.bundle.v1',
    projectName: String(projectName || 'aetheris-client-bundle').trim(),
    generatedAt: new Date().toISOString(),
    counts: { agents: 0, skills: 0, rules: 0 },
    agents: [],
    skills: [],
    rules: [],
  };

  for (const name of agents) {
    const res = loadFullItem(root, 'agents', name);
    if (res.status === 200) {
      bundle.agents.push({ name, content: res.content });
    }
  }
  for (const name of skills) {
    const res = loadFullItem(root, 'skills', name);
    if (res.status === 200) {
      bundle.skills.push({ name, content: res.content });
    }
  }
  for (const langDir of rules) {
    try {
      const dir = resolveContained(root, 'rules', path.basename(String(langDir)));
      if (!fs.existsSync(dir)) continue;
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();
      bundle.rules.push({
        stack: langDir,
        files: files.map(f => ({ name: f, content: fs.readFileSync(path.join(dir, f), 'utf8') })),
      });
    } catch {}
  }

  bundle.counts = {
    agents: bundle.agents.length,
    skills: bundle.skills.length,
    rules: bundle.rules.length,
  };
  return bundle;
}

function postJsonRequest(urlString, headers, payload, timeoutMs = 25000) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(urlString);
    const lib = parsed.protocol === 'https:' ? https : http;
    const body = JSON.stringify(payload);
    const req = lib.request({
      hostname: parsed.hostname,
      port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
      path: parsed.pathname + parsed.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        ...headers,
      },
      timeout: timeoutMs,
    }, res => {
      let raw = '';
      res.setEncoding('utf8');
      res.on('data', chunk => { raw += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(raw) });
        } catch {
          resolve({ status: res.statusCode, data: { raw } });
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(new Error('Provider request timed out')); });
    req.write(body);
    req.end();
  });
}

function checkOllamaModels() {
  return new Promise(resolve => {
    const req = http.get('http://127.0.0.1:11434/api/tags', { timeout: 1200 }, res => {
      let raw = '';
      res.setEncoding('utf8');
      res.on('data', c => { raw += c; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(raw);
          resolve((parsed.models || []).map(m => m.name));
        } catch {
          resolve([]);
        }
      });
    });
    req.on('error', () => resolve([]));
    req.on('timeout', () => { req.destroy(); resolve([]); });
  });
}

async function getPlaygroundStatus() {
  const ollamaModels = await checkOllamaModels();
  return {
    ollama: { available: ollamaModels.length > 0, models: ollamaModels },
    openai: { available: Boolean(process.env.OPENAI_API_KEY) },
    anthropic: { available: Boolean(process.env.ANTHROPIC_API_KEY) },
  };
}

async function runPlayground(root, { agentName, userMessage, provider = 'auto', model = '' }) {
  const msg = String(userMessage || '').trim();
  if (!msg) throw new Error('Enter a message to test the agent.');

  const item = loadFullItem(root, 'agents', agentName);
  if (item.status !== 200) throw new Error('Selected agent not found.');
  const systemPrompt = item.content;

  const status = await getPlaygroundStatus();
  let chosen = provider;
  if (chosen === 'auto') {
    if (status.ollama.available) chosen = 'ollama';
    else if (status.anthropic.available) chosen = 'anthropic';
    else if (status.openai.available) chosen = 'openai';
    else chosen = 'simulate';
  }

  if (chosen === 'ollama') {
    const targetModel = model || status.ollama.models[0] || 'llama3.2';
    const resp = await postJsonRequest('http://127.0.0.1:11434/api/chat', {}, {
      model: targetModel,
      stream: false,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: msg },
      ],
    });
    if (resp.status >= 400) throw new Error(resp.data.error || `Ollama error (${resp.status})`);
    return {
      provider: 'ollama',
      model: targetModel,
      reply: resp.data.message ? resp.data.message.content : JSON.stringify(resp.data),
    };
  }

  if (chosen === 'openai') {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OPENAI_API_KEY is not set in environment.');
    const targetModel = model || 'gpt-4o-mini';
    const resp = await postJsonRequest('https://api.openai.com/v1/chat/completions', {
      Authorization: `Bearer ${apiKey}`,
    }, {
      model: targetModel,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: msg },
      ],
    });
    if (resp.status >= 400) {
      if (provider !== 'auto') {
        throw new Error((resp.data.error && resp.data.error.message) || `OpenAI error (${resp.status})`);
      }
      // Graceful fallback to local dry-run when auto-detected env key is invalid/expired
      chosen = 'simulate';
    } else {
      return {
        provider: 'openai',
        model: targetModel,
        reply: resp.data.choices && resp.data.choices[0] ? resp.data.choices[0].message.content : '',
      };
    }
  }

  if (chosen === 'anthropic') {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set in environment.');
    const targetModel = model || 'claude-3-5-sonnet-latest';
    const resp = await postJsonRequest('https://api.anthropic.com/v1/messages', {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    }, {
      model: targetModel,
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: msg }],
    });
    if (resp.status >= 400) throw new Error((resp.data.error && resp.data.error.message) || `Anthropic error (${resp.status})`);
    const textBlock = Array.isArray(resp.data.content) ? resp.data.content.find(c => c.type === 'text') : null;
    return {
      provider: 'anthropic',
      model: targetModel,
      reply: textBlock ? textBlock.text : '',
    };
  }

  // Local dry-run / prompt inspection mode when no live LLM key/Ollama is active
  const estTokens = Math.round((systemPrompt.length + msg.length) / 4);
  const headings = (systemPrompt.match(/^##\s+.+$/gm) || []).slice(0, 6).map(h => h.replace(/^##\s+/, ''));
  return {
    provider: 'dry-run',
    model: 'local-inspector',
    reply: [
      `[Aetheris Dry-Run Inspector — Agent: ${agentName}]`,
      `No local Ollama instance or OPENAI_API_KEY / ANTHROPIC_API_KEY detected, so Aetheris ran a deterministic prompt execution check:`,
      '',
      `• System Prompt Loaded: ${systemPrompt.length.toLocaleString()} chars (~${estTokens.toLocaleString()} total prompt tokens)`,
      `• Active Prompt Sections: ${headings.length ? headings.join(' → ') : 'Standard instructions'}`,
      `• User Input Received: "${msg}"`,
      '',
      `To run live model inference right here:`,
      `1. Start Ollama locally (ollama serve), OR`,
      `2. Export OPENAI_API_KEY or ANTHROPIC_API_KEY and restart Aetheris.`,
    ].join('\n'),
  };
}

module.exports = {
  buildBundle,
  deleteItem,
  getPlaygroundStatus,
  runPlayground,
  saveItem,
  toggleHook,
  toggleMcpServer,
};
