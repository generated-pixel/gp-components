#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const ROOT = process.cwd()
const DIST_DIR = path.resolve(ROOT, 'dist/gp-ui')
const OUTPUT_FILE = path.join(DIST_DIR, 'gp-ui.css')
const CSS_SOURCES = [
  'projects/gp-ui/css/preflight.css',
  'projects/gp-ui/css/theme.css',
  'projects/gp-ui/css/utilities.css',
  'projects/gp-ui/css/generated-classes.css',
]
const PACKAGE_JSON = path.join(DIST_DIR, 'package.json')
const README_FILE = path.join(DIST_DIR, 'README.md')

function ensureDistExists() {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error(`Missing library output directory: ${DIST_DIR}`)
  }
}

function readCss(file) {
  const fullPath = path.resolve(ROOT, file)
  if (!fs.existsSync(fullPath)) {
    throw new Error(`CSS source not found: ${file}`)
  }
  return fs.readFileSync(fullPath, 'utf8').trim()
}

function bundleCss() {
  ensureDistExists()

  const contents = CSS_SOURCES.map((source) => {
    const css = readCss(source)
    return css ? `/* ${path.basename(source)} */\n${css}\n` : ''
  }).filter(Boolean)

  fs.writeFileSync(OUTPUT_FILE, contents.join('\n'), 'utf8')
}

function removeLegacyAssets() {
  const cssDir = path.join(DIST_DIR, 'css')
  if (fs.existsSync(cssDir)) {
    fs.rmSync(cssDir, { recursive: true, force: true })
  }
}

function updatePackageManifest() {
  if (!fs.existsSync(PACKAGE_JSON)) {
    throw new Error('Expected package manifest missing after build.')
  }

  const manifest = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'))
  manifest.style = './gp-ui.css'
  manifest.exports = {
    '.': {
      types: './types/gp-ui.d.ts',
      default: './fesm2022/gp-ui.mjs',
    },
    './gp-ui.css': {
      default: './gp-ui.css',
    },
    './package.json': {
      default: './package.json',
    },
  }
  manifest.files = [
    'fesm2022/**/*',
    'types/**/*',
    'gp-ui.css',
    fs.existsSync(README_FILE) ? 'README.md' : undefined,
  ].filter(Boolean)

  fs.writeFileSync(PACKAGE_JSON, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
}

function main() {
  bundleCss()
  removeLegacyAssets()
  updatePackageManifest()
  console.log(`Bundled CSS written to ${path.relative(ROOT, OUTPUT_FILE)}`)
}

main()
