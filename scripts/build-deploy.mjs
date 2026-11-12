#!/usr/bin/env node
// Builds the site GitHub Pages serves into _deploy/. CI publishes that folder to
// the gh-pages branch: production to its root, PR previews to pr-preview/pr-N/.
//
// THE CONTRACT (the v2 site, issue #43, plugs into it):
//
//   SITE                    One-line file at the repo root naming the site
//                           production serves: `legacy` today, `v2` later.
//   yarn build:deploy       Wipes _deploy/ and builds the SITE site into it for
//                           the domain root, plus CNAME (copied from the root
//                           CNAME file) and an empty .nojekyll.
//   yarn build:deploy --preview /pr-preview/pr-12/
//                           Builds PREVIEW_SITE for that path prefix instead, and
//                           stamps <meta name="robots" content="noindex"> into
//                           every HTML page. No CNAME, no .nojekyll.
//
// A site is one entry in SITES: an async function ({ outDir, basePath, preview })
// that fills the already-empty outDir. basePath is "/" in production and the
// preview prefix otherwise; a site that wants working previews must build its
// links under it. Every build must end with an index.html at the top of outDir,
// so a broken build can never publish an empty site over the live one.

import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const OUT_DIR = join(ROOT, '_deploy')
const DOCS_DIR = join(ROOT, 'docs')

// The site PR previews build: v2, so previews show the new site while
// production still serves whatever SITE says.
const PREVIEW_SITE = 'v2'

// Legacy previews copy text files only. The full legacy site is about 1.6 GB,
// mostly PDFs and images, and every open preview would add another copy to the
// Pages deployment. Legacy pages link media by absolute URL anyway, so in a
// preview most of it still loads from production.
const LEGACY_PREVIEW_EXTENSIONS = new Set([
  '.html', '.htm', '.css', '.js', '.mjs', '.json', '.xml', '.txt', '.svg', '.webmanifest', '.map',
])

const SITES = {
  // The legacy site is built by hand: `yarn build` and `yarn build:slides` write
  // docs/, and docs/ is committed. Production serves exactly that, so this copies
  // it as is and runs no build of its own.
  async legacy({ outDir, preview }) {
    if (!preview) {
      await cp(DOCS_DIR, outDir, { recursive: true })
      return
    }
    await cp(DOCS_DIR, outDir, {
      recursive: true,
      filter: async (src) =>
        (await stat(src)).isDirectory() || LEGACY_PREVIEW_EXTENSIONS.has(extname(src).toLowerCase()),
    })
  },

  // The v2 site (#43) is built from web/ by its own Eleventy config. basePath
  // becomes Eleventy's pathPrefix, which HtmlBasePlugin applies to every link.
  async v2({ outDir, basePath }) {
    const { default: Eleventy } = await import('@11ty/eleventy')
    const eleventy = new Eleventy('web', outDir, {
      configPath: join(ROOT, 'web', 'eleventy.config.mjs'),
      pathPrefix: basePath,
      quietMode: true,
    })
    await eleventy.write()
  },
}

const NOINDEX = '<meta name="robots" content="noindex">'

function usage(problem) {
  console.error(`build-deploy: ${problem}`)
  console.error('Usage: yarn build:deploy [--preview /pr-preview/pr-N/]')
  process.exit(1)
}

function parseArgs(args) {
  let previewPath = null
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--preview') previewPath = args[++i] ?? usage('--preview needs a path')
    else if (arg.startsWith('--preview=')) previewPath = arg.slice('--preview='.length)
    else usage(`unknown argument "${arg}"`)
  }
  if (previewPath === null) return { preview: false, basePath: '/' }
  if (!/^\/[\w./-]+\/$/.test(previewPath) || previewPath.includes('..')) {
    usage(`preview path must look like /pr-preview/pr-12/ (got "${previewPath}")`)
  }
  return { preview: true, basePath: previewPath }
}

async function readSiteFile() {
  let raw
  try {
    raw = await readFile(join(ROOT, 'SITE'), 'utf8')
  } catch {
    usage('no SITE file at the repo root')
  }
  const lines = raw.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  if (lines.length !== 1) usage(`SITE must hold exactly one line, it holds ${lines.length}`)
  return lines[0]
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

// Inserts the noindex meta right after <head>; for the fragments that have no
// <head>, after <html> or the doctype, so the meta never lands before a doctype
// and flips the page into quirks mode.
function addNoindex(html) {
  for (const pattern of [/<head\b[^>]*>/i, /<html\b[^>]*>/i, /<!doctype\b[^>]*>/i]) {
    const match = pattern.exec(html)
    if (match) {
      const end = match.index + match[0].length
      return html.slice(0, end) + NOINDEX + html.slice(end)
    }
  }
  return NOINDEX + html
}

const { preview, basePath } = parseArgs(process.argv.slice(2))
const site = preview ? PREVIEW_SITE : await readSiteFile()
const build = SITES[site]
if (!build) usage(`unknown site "${site}"; known sites: ${Object.keys(SITES).join(', ')}`)

console.log(`Building site "${site}" for ${preview ? `preview at ${basePath}` : 'production'} into _deploy/`)
await rm(OUT_DIR, { recursive: true, force: true })
await mkdir(OUT_DIR)
await build({ outDir: OUT_DIR, basePath, preview })

try {
  await stat(join(OUT_DIR, 'index.html'))
} catch {
  console.error(`build-deploy: site "${site}" produced no index.html; refusing to leave a deployable _deploy/`)
  await rm(OUT_DIR, { recursive: true, force: true })
  process.exit(1)
}

if (preview) {
  let stamped = 0
  for await (const file of walk(OUT_DIR)) {
    if (!/\.html?$/i.test(file)) continue
    // latin1 maps bytes 1:1, so pages in any encoding come back byte-identical
    // apart from the inserted meta.
    await writeFile(file, addNoindex(await readFile(file, 'latin1')), 'latin1')
    stamped++
  }
  console.log(`Stamped noindex into ${stamped} HTML pages`)
} else {
  const domain = (await readFile(join(ROOT, 'CNAME'), 'utf8')).trim()
  await writeFile(join(OUT_DIR, 'CNAME'), `${domain}\n`)
  await writeFile(join(OUT_DIR, '.nojekyll'), '')
  console.log(`Wrote CNAME (${domain}) and .nojekyll`)
}

let files = 0
let bytes = 0
for await (const file of walk(OUT_DIR)) {
  files++
  bytes += (await stat(file)).size
}
console.log(`_deploy/ holds ${files} files, ${(bytes / 1048576).toFixed(1)} MB`)
