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
- Every PR gets a preview at `https://www.erikvanek.com/pr-preview/pr-N/` (`.github/workflows/preview.yml`), linked in a PR comment and removed when the PR closes. Preview pages carry `noindex`. Legacy previews hold text files only, so images, PDFs and links resolve against production.

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