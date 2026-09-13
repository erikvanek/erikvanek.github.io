#!/usr/bin/env node
// Finds every FILED Slidev deck under pages/presentations/slidev/<name>/slides.md
// and builds it straight into the matching docs/ path, so one command
// regenerates all of them - the Slidev equivalent of Eleventy transpiling
// every page on each run.
//
// "Filed" means one directory level or deeper under pages/presentations/slidev/ -
// the scratch working file directly at pages/presentations/slidev/slides.md
// (edited live via `yarn slides`) is deliberately excluded, since a draft
// isn't meant to publish until you've moved it into its own named folder.
//
// Scoped strictly to pages/presentations/slidev/ so this never touches the
// reveal.js decks living elsewhere under pages/presentations/ (kisk/, sovia/,
// drymtym/, ...), and Eleventy's own build never touches this subtree either
// (see the ignores in .eleventy.js) - the two pipelines stay fully isolated.

import { readdir } from 'node:fs/promises'
import { join, relative, dirname } from 'node:path'
import { spawnSync } from 'node:child_process'

const ROOT = process.cwd()
const SLIDEV_DIR = join(ROOT, 'pages', 'presentations', 'slidev')
const SLIDEV_BIN = join(ROOT, 'node_modules', '.bin', 'slidev')

async function findSlideDecks(dir) {
  const found = []
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return found
  }
  for (const entry of entries) {
    if (entry.name === 'node_modules') continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      found.push(...(await findSlideDecks(full)))
    } else if (entry.name === 'slides.md' && dir !== SLIDEV_DIR) {
      // Only decks filed into their own subfolder - skip the top-level scratch file.
      found.push(full)
    }
  }
  return found
}

const decks = await findSlideDecks(SLIDEV_DIR)

if (decks.length === 0) {
  console.log('No filed Slidev decks yet (nothing under pages/presentations/slidev/<name>/slides.md).')
  process.exit(0)
}

for (const entry of decks) {
  const deckDir = dirname(entry)
  const relDir = relative(join(ROOT, 'pages'), deckDir) // e.g. presentations/slidev/sdw-26-I
  const outDir = join(ROOT, 'docs', relDir)
  const base = `/${relDir}/`

  console.log(`\nBuilding Slidev deck: ${relDir}`)
  const result = spawnSync(SLIDEV_BIN, ['build', entry, '--out', outDir, '--base', base], {
    stdio: 'inherit',
  })
  if (result.status !== 0) {
    console.error(`Slidev build failed for ${relDir}`)
    process.exit(result.status ?? 1)
  }
}
