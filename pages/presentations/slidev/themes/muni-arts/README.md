# slidev-theme-muni-arts

Local Slidev theme for MUNI Faculty of Arts / KISK course decks (built for SDW-26, reusable for any future KISK/Faculty of Arts deck).

## Source

Three references, none committed here (see "What's not in this repo" below):
- `Grafický manuál Filozofické fakulty` (MUNI, PDF export 2019-03-22) - `~/Downloads/MUNI Arts Brand Manual Mar 22.pdf`.
- `Stručný manuál práce s vizuálním stylem MUNI ARTS` (newer, shorter, from sablony.muni.cz) - confirms the same colors/fonts, nothing contradicts the 2019 manual.
- The actual official PowerPoint template, `muni-arts-prezentace-16-9-cz-v11.potx` - `~/Downloads/`. This is where `components/MuniArtsMark.vue` traces its path data from (see that file's own header comment for how).

Faculty of Arts is the whole-manual scope; KISK (the department) has no separate written sub-brand, only its own logo (see below). If that changes, update this file and `styles/tokens.css`.

## Tokens (`styles/tokens.css`)

| Token | Value | Source |
|---|---|---|
| `--muni-blue` | `#0000dc` | p.30, MUNI's base color |
| `--muni-black` / `--muni-white` | `#000` / `#fff` | p.30 |
| `--muni-arts-blue` | `#4bc8ff` | p.31, Filozofická fakulta's faculty accent |
| `--kisk-yellow` | `#ffff00` | sampled directly from KISK's own hosted logo SVG, not from the manual |

## Fonts

- **Muni** (Light/Regular/Medium/Bold) - the university's own commissioned monospace display face. Used here for headings and the cover wordmark only (see `styles/base.css` for why not body text too).
- **Neue Haas Unica Pro** - the manual's official secondary font (p.28), licensed by the university from Linotype. Not used here at all: that license is the university's, not this repo's/account's. The manual itself documents a fallback for exactly this case ("nahrazuje se systémovými písmy Helvetica nebo Arial") - so body text and non-Muni headings just use Helvetica/Arial directly. Nothing improvised here, it's literally what the manual prescribes when Neue Haas Unica isn't available.

### What's not in this repo

This repo is **public** (builds to www.erikvanek.com). This theme never stores or loads the actual Muni font files, and never copies in the brand manual:

1. **The 4 Muni font files** (`muni-{light,regular,medium,bold}.{ttf,otf}`, already in `~/Downloads/Fonts from Filozofická fakulta/`) stay exactly there. `styles/base.css` just asks for `font-family: 'Muni', ...` by name - no `@font-face`, no local copy, nothing to gitignore. See "Using the real Muni font locally" below.
2. **The brand manual PDF itself** - stays in Downloads, referenced by path above, not copied into the repo.

The KISK logo is the opposite case: it's hotlinked live from `cdn.muni.cz` (see `components/KiskLogo.vue`), not copied in at all - which also means the mark stays current if KISK ever updates it.

### Using the real Muni font locally

A CSS `font-family: 'Muni'` request resolves to any font installed under that name on the machine viewing the page - no file management needed in this repo. For live presenting or a PDF export where the real look matters, install the 4 files as system fonts once (macOS: open each in Font Book and click "Install Font"). Every other machine - including anyone viewing the published public site - just falls straight through to Helvetica/Arial, since nothing named 'Muni' is registered there.

## Layouts

- `layouts/cover.vue` - title slide. Props: `session` (e.g. `"Session 1"`), `date` (e.g. `"17 Sep 2026"`). Everything else (title, subtitle) comes through as normal markdown content. Top-left mark is `components/MuniArtsMark.vue`, real vector paths - not a font-and-CSS approximation.

That's the only custom layout so far - a deliberate "hello world" scope. Add more (`section.vue`, `default.vue`, etc.) as real session content needs them; don't pre-build layouts nothing uses yet.

## Multi-client theming

This repo is public, so it only ever holds brand themes that are fine to publish (MUNI, a public university, qualifies). Confidential/client-specific branding for other engagements lives entirely in **other repos**, used **locally or as exported files** (PDF/PPTX) - this repo doesn't stage or preview that content at all, so there's no placeholder folder for it here.
