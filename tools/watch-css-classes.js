#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const SRC_DIR = path.resolve(process.cwd(), 'projects/gp-ui/src');
const OUTPUT_FILE = path.resolve(process.cwd(), 'projects/gp-ui/css/generated-classes.css');
const WATCH_EXTENSIONS = new Set(['.html', '.ts']);
const DEBOUNCE_MS = 100;

let timer = null;
let running = false;
let pending = false;
let currentChild = null;

function runExtractor() {
  if (running) {
    pending = true;
    return;
  }

  running = true;
  pending = false;

  const scriptPath = path.resolve(__dirname, 'extract-css-classes.js');
  currentChild = spawn(process.execPath, [scriptPath], { stdio: 'inherit' });

  currentChild.on('exit', () => {
    running = false;
    currentChild = null;
    if (pending) {
      scheduleRun();
    }
  });

  currentChild.on('error', (error) => {
    running = false;
    currentChild = null;
    console.error(`Extractor failed: ${error.message}`);
  });
}

function scheduleRun() {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    timer = null;
    runExtractor();
  }, DEBOUNCE_MS);
}

function handlePath(fullPath) {
  if (!fullPath) {
    return;
  }

  const normalized = path.resolve(fullPath);
  if (normalized === OUTPUT_FILE) {
    return;
  }

  if (!normalized.startsWith(SRC_DIR)) {
    return;
  }

  const ext = path.extname(normalized).toLowerCase();
  if (!WATCH_EXTENSIONS.has(ext)) {
    return;
  }

  scheduleRun();
}

const watchers = new Map();

function watchDirectory(dirPath) {
  if (watchers.has(dirPath)) {
    return;
  }

  let watcher;
  try {
    watcher = fs.watch(dirPath, (eventType, entry) => {
      if (!entry) {
        return;
      }
      const fullPath = path.join(dirPath, entry);
      try {
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory() && eventType === 'rename') {
          watchDirectory(fullPath);
        }
      } catch (error) {
        /* ignore missing files */
      }
      handlePath(fullPath);
    });
  } catch (error) {
    console.error(`Unable to watch ${dirPath}: ${error.message}`);
    return;
  }

  watcher.on('error', (error) => {
    console.warn(`Watcher error in ${dirPath}: ${error.message}`);
  });

  watchers.set(dirPath, watcher);

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    entries.forEach((entry) => {
      if (entry.isDirectory()) {
        watchDirectory(path.join(dirPath, entry.name));
      }
    });
  } catch (error) {
    console.warn(`Failed to enumerate ${dirPath}: ${error.message}`);
  }
}

function closeWatchers() {
  watchers.forEach((watcher) => {
    try {
      watcher.close();
    } catch (error) {
      /* ignore close errors */
    }
  });
  watchers.clear();
}

function main() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`Source directory not found: ${SRC_DIR}`);
    process.exit(1);
  }

  watchDirectory(SRC_DIR);
  console.log(`Watching ${path.relative(process.cwd(), SRC_DIR)} for class changes...`);

  runExtractor();

  process.on('SIGINT', () => {
    closeWatchers();
    if (currentChild) {
      currentChild.kill('SIGINT');
    }
    process.exit(0);
  });
}

main();
