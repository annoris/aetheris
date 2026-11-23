'use strict';

const fs = require('fs');
const path = require('path');
const { parseFrontmatter, readFrontmatter, stripFrontmatter } = require('./lib');

const DEFAULT_ROOT = path.resolve(__dirname, '..', '..');

const COMMAND_CATEGORIES = {
  plan: 'Planning',
  'plan-': 'Planning',
  'prp-': 'Git & PR',
  pr: 'Git & PR',
  'review-': 'Review',
  'code-': 'Review',
  build: 'Build',
  fix: 'Build',
  test: 'Testing',
  e2e: 'Testing',
  coverage: 'Testing',
  quality: 'Testing',
  session: 'Session',
  save: 'Session',
  resume: 'Session',
  skill: 'Knowledge',
  learn: 'Knowledge',
  instinct: 'Knowledge',
  evolve: 'Knowledge',
  hookify: 'System',
  model: 'System',
  setup: 'System',
  multi: 'Multi-Agent',
  security: 'Security',
  harness: 'Security',
  'go-': 'Languages',
  'rust-': 'Languages',
  'cpp-': 'Languages',
  'kotlin-': 'Languages',
  'flutter-': 'Languages',
  'react-': 'Languages',
  'python-': 'Languages',
  'fastapi-': 'Languages',
  'gradle-': 'Languages',
  gan: 'GAN',
  marketing: 'Marketing',
  jira: 'Projects',
  pm2: 'Process',
  cost: 'Analytics',
  promote: 'Projects',
  aside: 'General',
  santa: 'Creative',
};

function readSkill(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fm = parseFrontmatter(content);
    return {
      d: fm.description || '',
      b: fm._body || stripFrontmatter(content),
    };
  } catch (err) {
    if (err && err.code !== 'ENOENT') {
      console.error(`[AETHERIS] Failed to read skill ${filePath}:`, err.message);
    }
    return { d: '', b: '' };
  }
}

function loadAgents(root = DEFAULT_ROOT) {
  const dir = path.join(root, 'agents');
  if (!fs.existsSync(dir)) return [];

  const list = fs
    .readdirSync(dir)
    .filter(file => file.endsWith('.md'))
    .sort()
    .map(file => {
      const fm = readFrontmatter(path.join(dir, file));
      return {
        n: fm.name || file.replace(/\.md$/, ''),
        d: fm.description || '',
        m: fm.model || 'default',
        t: Array.isArray(fm.tools) ? fm.tools : [],
        b: (fm._body || '').slice(0, 1600),
        f: file,
      };
    });

  const priority = ['prompt-engineering-expert', 'graphic-design-expert', 'brand-identity-architect'];
  return list.sort((a, b) => {
    const pa = priority.indexOf(a.n);
    const pb = priority.indexOf(b.n);
    if (pa !== -1 || pb !== -1) {
      if (pa === -1) return 1;
      if (pb === -1) return -1;
      return pa - pb;
    }
    return a.n.localeCompare(b.n);
  });
}

function loadSkills(root = DEFAULT_ROOT) {
  const dir = path.join(root, 'skills');
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter(entry => {
      try {
        return fs.statSync(path.join(dir, entry)).isDirectory();
      } catch {
        return false;
      }
    })
    .sort()
    .map(entry => {
      const skill = readSkill(path.join(dir, entry, 'SKILL.md'));
      return {
        n: entry,
        d: skill.d,
        b: skill.b.slice(0, 1200),
      };
    });
}

function loadCommands(root = DEFAULT_ROOT) {
  const dir = path.join(root, 'commands');
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter(file => file.endsWith('.md'))
    .sort()
    .map(file => {
      const fm = readFrontmatter(path.join(dir, file));
      const name = '/' + file.replace(/\.md$/, '');
      let category = 'General';
      for (const [prefix, label] of Object.entries(COMMAND_CATEGORIES)) {
        if (file.startsWith(prefix)) {
          category = label;
          break;
        }
      }
      return {
        n: name,
        f: file,
        d: fm.description || fm['argument-hint'] || '',
        c: category,
        b: (fm._body || '').slice(0, 800),
      };
    });
}

function loadRules(root = DEFAULT_ROOT) {
  const dir = path.join(root, 'rules');
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter(entry => {
      try {
        return fs.statSync(path.join(dir, entry)).isDirectory();
      } catch {
        return false;
      }
    })
    .sort()
    .map(langDir => ({
      l: langDir,
      f: fs
        .readdirSync(path.join(dir, langDir))
        .filter(file => file.endsWith('.md'))
        .sort()
        .map(file => file.replace(/\.md$/, '')),
    }));
}

function parseMcpServers(rawJson) {
  const servers = rawJson && typeof rawJson === 'object' ? rawJson.mcpServers || {} : {};
  const disabled = rawJson && typeof rawJson === 'object' ? rawJson._disabledMcpServers || {} : {};
  const mapEntry = (enabled) => ([name, cfg]) => ({
    n: name,
    cmd: typeof cfg === 'object' && cfg !== null ? cfg.command || cfg.url || '' : String(cfg),
    args: cfg && Array.isArray(cfg.args) ? cfg.args : [],
    env:
      cfg && cfg.env && typeof cfg.env === 'object'
        ? Object.keys(cfg.env).reduce((acc, key) => {
            acc[key] = '••••••';
            return acc;
          }, {})
        : {},
    type: (cfg && cfg.type) || 'stdio',
    enabled,
  });
  return [
    ...Object.entries(servers).map(mapEntry(true)),
    ...Object.entries(disabled).map(mapEntry(false)),
  ];
}

function loadMcps(root = DEFAULT_ROOT) {
  const results = [];
  const rootMcp = path.join(root, '.mcp.json');
  if (fs.existsSync(rootMcp)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(rootMcp, 'utf8'));
      results.push({ f: '.mcp.json', s: parseMcpServers(parsed) });
    } catch (err) {
      console.error(`[AETHERIS] Failed to parse ${rootMcp}:`, err.message);
    }
  }

  const dir = path.join(root, 'mcp-configs');
  if (fs.existsSync(dir)) {
    for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort()) {
      const fullPath = path.join(dir, file);
      try {
        const parsed = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        results.push({ f: file, s: parseMcpServers(parsed) });
      } catch (err) {
        console.error(`[AETHERIS] Failed to parse ${fullPath}:`, err.message);
      }
    }
  }

  return results;
}

function loadHooks(root = DEFAULT_ROOT) {
  const hooksPath = path.join(root, 'hooks', 'hooks.json');
  if (!fs.existsSync(hooksPath)) return [];

  let hooksData;
  try {
    hooksData = JSON.parse(fs.readFileSync(hooksPath, 'utf8'));
  } catch (err) {
    console.error(`[AETHERIS] Failed to parse ${hooksPath}:`, err.message);
    return [];
  }

  let metadataEntries = {};
  const metadataPath = path.join(root, 'hooks', 'hooks.metadata.json');
  if (fs.existsSync(metadataPath)) {
    try {
      const parsedMeta = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      metadataEntries = (parsedMeta && parsedMeta.entries) || {};
    } catch (err) {
      console.error(`[AETHERIS] Failed to parse ${metadataPath}:`, err.message);
    }
  }

  const hooks = [];
  const pushMap = (mapObj, enabled) => {
    for (const [eventName, entries] of Object.entries(mapObj || {})) {
      const eventMeta = Array.isArray(metadataEntries[eventName]) ? metadataEntries[eventName] : [];
      (entries || []).forEach((entry, index) => {
        const meta = eventMeta[index] || {};
        const id = entry.id || meta.id || `${eventName.toLowerCase()}:${index + 1}`;
        const description = entry.description || meta.description || '';
        hooks.push({
          ev: eventName,
          m: entry.matcher || '*',
          id,
          d: description,
          enabled,
        });
      });
    }
  };
  pushMap(hooksData && hooksData.hooks, true);
  pushMap(hooksData && hooksData._disabledHooks, false);

  return hooks;
}

function loadFullItem(root = DEFAULT_ROOT, type = '', name = '') {
  const cleanType = String(type || '');
  const cleanName = String(name || '');
  if (!cleanName || cleanName.includes('..') || cleanName.includes('/') || cleanName.includes('\\') || cleanName.includes('\0')) {
    return { status: 400, error: 'Invalid item name' };
  }

  let baseDir = null;
  let targetPath = null;
  if (cleanType === 'agents') {
    baseDir = path.resolve(root, 'agents');
    targetPath = path.resolve(baseDir, cleanName.endsWith('.md') ? cleanName : `${cleanName}.md`);
  } else if (cleanType === 'skills') {
    baseDir = path.resolve(root, 'skills');
    targetPath = path.resolve(baseDir, cleanName, 'SKILL.md');
  } else if (cleanType === 'commands') {
    baseDir = path.resolve(root, 'commands');
    targetPath = path.resolve(baseDir, cleanName.endsWith('.md') ? cleanName : `${cleanName}.md`);
  } else {
    return { status: 400, error: 'Invalid item type' };
  }

  if (!targetPath.startsWith(baseDir + path.sep)) {
    return { status: 400, error: 'Invalid item path' };
  }

  if (!fs.existsSync(targetPath)) {
    return { status: 404, error: 'Item not found' };
  }

  try {
    const raw = fs.readFileSync(targetPath, 'utf8');
    return { status: 200, content: stripFrontmatter(raw) };
  } catch (err) {
    console.error(`[AETHERIS] Failed to read item ${targetPath}:`, err.message);
    return { status: 500, error: 'Failed to read item' };
  }
}

function loadPlatformData(root = DEFAULT_ROOT) {
  return {
    agents: loadAgents(root),
    skills: loadSkills(root),
    commands: loadCommands(root),
    rules: loadRules(root),
    mcps: loadMcps(root),
    hooks: loadHooks(root),
  };
}

module.exports = {
  DEFAULT_ROOT,
  loadAgents,
  loadCommands,
  loadFullItem,
  loadHooks,
  loadMcps,
  loadPlatformData,
  loadRules,
  loadSkills,
};
