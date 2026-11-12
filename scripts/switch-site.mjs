#!/usr/bin/env node
// Points production at a site by rewriting the SITE file: `yarn switch-site v2`
// or `yarn switch-site legacy`. Commit the change in a PR; the deploy that runs
// after the merge publishes the site SITE names.

import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const KNOWN = ['legacy', 'v2']
const ROOT = fileURLToPath(new URL('..', import.meta.url))
const file = join(ROOT, 'SITE')

const site = process.argv[2]
if (!KNOWN.includes(site)) {
  console.error(`switch-site: name a site, one of ${KNOWN.join(', ')}`)
  process.exit(1)
}

const current = (await readFile(file, 'utf8')).trim()
if (current === site) {
  console.log(`SITE already says ${site}`)
} else {
  await writeFile(file, `${site}\n`)
  console.log(`SITE: ${current} -> ${site}`)
}
