#!/usr/bin/env node
// Finds every FILED Slidev deck under pages/presentations/slidev/<name>/slides.md
// and builds it into docs/, so one command regenerates all of them - the Slidev
// equivalent of Eleventy transpiling every page on each run.
//
// "Filed" means one directory level or deeper under pages/presentations/slidev/ -
// the scratch working file directly at pages/presentations/slidev/slides.md
// (edited live via `yarn slides`) is deliberately excluded, since a draft
// isn't meant to publish until you've moved it into its own named folder.
//
// WHERE A DECK PUBLISHES. By default a deck publishes at the same path it lives
// at under pages/, so pages/presentations/slidev/foo/ lands on /presentations/slidev/foo/.
// A deck that wants a shorter public URL declares it in its own headmatter:
//
//     publicPath: /sdw-26/I/
//
// Keep such a path under a prefix that Eleventy cannot reach. Every Eleventy page
// on this site routes through `permalink: /{{page.fileSlug}}/`, which can only ever
// produce a single URL segment, so a two-segment path like /sdw-26/I/ is structurally
// safe: no Eleventy page can be made to write there, whatever it gets named. A
// one-segment publicPath would put the deck in the same namespace as those 50-odd
// pages, where Eleventy would silently overwrite it - and since CI runs Eleventy but
// not this script, that overwrite would only ever show up on the live site.
//
// Slidev bakes --base into every asset URL, so a deck works at exactly the path it
// was built for and nowhere else (opening index.html off disk gives a blank page).
// Moving a deck therefore means rebuilding it, and leaving a redirect behind at the
// old URL - see pages/_data/redirects.json.
//
// Scoped strictly to pages/presentations/slidev/ so this never touches the
// reveal.js decks living elsewhere under pages/presentations/ (kisk/, sovia/,
// drymtym/, ...), and Eleventy's own build never touches this subtree either
// (see the ignores in .eleventy.js) - the two pipelines stay fully isolated.

import { readdir, readFile, rm } from 'node:fs/promises'
import { join, relative, dirname, resolve, sep } from 'node:path'
import { spawnSync } from 'node:child_process'

const ROOT = process.cwd()
const PAGES_DIR = join(ROOT, 'pages')
const DOCS_DIR = join(ROOT, 'docs')
const SLIDEV_DIR = join(PAGES_DIR, 'presentations', 'slidev')
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

// Pulls the optional `publicPath:` out of a deck's headmatter, the first `---`
// fenced block at the top of slides.md. Hand-parsed on purpose: it's one key on
// one line, and the build stays dependency-free.
async function readPublicPath(slidesFile) {
  const source = await readFile(slidesFile, 'utf8')
  const headmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source)
  if (!headmatter) return null
  const declared = /^publicPath:[ \t]*(.+?)[ \t]*$/m.exec(headmatter[1])
  if (!declared) return null
  return declared[1].replace(/^['"]|['"]$/g, '')
}

function routeFor(deckDir, publicPath) {
  const segments = (publicPath ?? relative(PAGES_DIR, deckDir).split(sep).join('/'))
    .split('/')
    .filter(Boolean)
  const relDir = segments.join('/')
  const outDir = join(DOCS_DIR, ...segments)

  // The build wipes outDir before writing, so a typo'd publicPath must never be
  // able to point the wipe at docs/ itself or at anything outside it.
  const resolved = resolve(outDir)
  if (segments.length === 0 || !resolved.startsWith(resolve(DOCS_DIR) + sep)) {
    throw new Error(
      `Deck at ${deckDir} resolves to ${resolved}, which is not a folder inside docs/. ` +
        `Check its publicPath - it must be at least one segment and must not climb out with "..".`
    )
  }
  return { relDir, outDir, base: `/${relDir}/` }
}

const decks = await findSlideDecks(SLIDEV_DIR)

if (decks.length === 0) {
  console.log('No filed Slidev decks yet (nothing under pages/presentations/slidev/<name>/slides.md).')
  process.exit(0)
}

for (const entry of decks) {
  const deckDir = dirname(entry)
  const { outDir, base } = routeFor(deckDir, await readPublicPath(entry))
  const source = relative(PAGES_DIR, deckDir).split(sep).join('/')

  console.log(`\nBuilding Slidev deck: ${source} -> ${base}`)

  // Slidev fingerprints asset filenames, so building over an old output leaves the
  // superseded ones behind forever - and docs/ is committed, so they'd accumulate in
  // git too. The whole folder is this script's to own, so clear it first.
  await rm(outDir, { recursive: true, force: true })

  const result = spawnSync(SLIDEV_BIN, ['build', entry, '--out', outDir, '--base', base], {
    stdio: 'inherit',
  })
  if (result.status !== 0) {
    console.error(`Slidev build failed for ${source}`)
    process.exit(result.status ?? 1)
  }
}
