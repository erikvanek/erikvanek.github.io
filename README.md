Personal site built using [eleventy](https://www.11ty.dev/).

![Deployed](https://github.com/erikvanek/erikvanek.github.io/actions/workflows/deploy.yml/badge.svg)

## How to edit?

- clone repo
- source for site content can be found in _pages_ folder
- use `yarn serve` script to leverage live reload when editing project content locally
- when ready to publish a new version of site build it using `yarn build` script (and `yarn build:slides` for Slidev decks)
- final output should be regenerated in _docs_ folder, which is committed
- open a PR; it gets a preview, and merging it into `master` deploys the site

## How it deploys

- `SITE`, a one-line file at the repo root, names the site production serves. Today that is `legacy`: the committed _docs_ folder, copied as is.
- `yarn build:deploy` writes that site to `_deploy/` (gitignored), adding `CNAME` and `.nojekyll`. The contract for adding a site is at the top of `scripts/build-deploy.mjs`.
- On every push to `master`, `.github/workflows/deploy.yml` publishes `_deploy/` to the root of the `gh-pages` branch, which GitHub Pages serves at www.erikvanek.com.
- Every PR gets a preview at `https://www.erikvanek.com/pr-preview/pr-N/` (`.github/workflows/preview.yml`), linked in a PR comment and removed when the PR closes. Preview pages carry `noindex`. Previews build the v2 site (`PREVIEW_SITE` in `scripts/build-deploy.mjs`), not what `SITE` names.

## The v2 site

- v2 lives in `web/` with its own Eleventy config, `web/eleventy.config.mjs`; it never reads `pages/` or `docs/`. (It is not called `site/` because that collides with the `SITE` file on case-insensitive filesystems.)
- `yarn start:v2` serves it locally from `_site-v2/`; `yarn build:v2` builds it once.
- English sits at `/`, Czech at `/cs/`. Each page has `lang` (from its folder) and a `translationKey`; pages sharing a key are translations of each other, and the header switch links them. The English home sends a first-time visitor whose browser prefers Czech to `/cs/`, until they pick a language themselves.
- The writing list is `web/_data/writing.json`: article pages are found by key, link-outs and not-yet-written pieces carry their own titles.
- `yarn switch-site v2` rewrites `SITE`; merging that change moves production to v2.

## Converting videos to usable format

- use `ffmpeg` bu running `ffmpeg -i input.mp4 -c:v libx264 -crf 15 -preset fast -c:a aac -b:a 1080k  output.mp4`

## Exporting slides to PDF

- install [decktape](https://github.com/astefanutti/decktape)
- run `decktape [slides URL] [path/final-filename.pdf]`
- e.g. `decktape --slides 1-26 http://localhost:8080/sxd-25/ pages/presentations/kisk/export/sxd-25.pdf` or `decktape http://localhost:8080/sdw-25-IV/ ./pages/presentations/kisk/export/sdw-25-IV.pdf`
    - sadly it has some issues with https so what helps is to turn it off in `.eleventy.js` file for export purposes
    - `text-shadow` CSS property can be also problematic 

## To do
- [ ] the site should be running well even after executing `rm -rf /docs/*`
- [ ] animated favicon