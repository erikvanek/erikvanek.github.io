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

Names and shapes are carried over from the layout taxonomy Erik has used across SDW-25 and the Discovery Practice Program (audited 2026-09-13) - same nine slide types, minus the facilitation-prep fields (those lived in a yaml/pptx pipeline, not here) and speaker notes (out of scope for now).

- `layouts/cover.vue` - title slide. Props: `session` (e.g. `"Session 1"`), `date` (e.g. `"17 Sep 2026"`). Everything else (title, subtitle) comes through as normal markdown content. Top-left mark is `components/MuniArtsMark.vue`, real vector paths - not a font-and-CSS approximation.
- `layouts/heading-body.vue` - standard content slide, heading + bullets/prose. No props. The default, highest-volume slide type - deliberately plain.
- `layouts/quote.vue` - featured quote. Props: `author` (optional). Body slot is the quote text.
- `layouts/two-column.vue` - heading (optional, spans both) over two columns. Props: `ratio` (e.g. `"60-40"`, default `"50-50"`). Slots: default (header), `left`, `right`.
- `layouts/section-break.vue` - major divider, flat MUNI-blue field. No props.
- `layouts/reflection.vue` - closing debrief slide, fixed "Reflection" eyebrow, Faculty of Arts blue accent rule. No props.
- `layouts/homework.vue` - assignment brief, fixed "Homework" eyebrow, KISK yellow accent rule. No props.
- `layouts/full-image.vue` - full-bleed image. Props: `image` (src), `credit` (optional caption), `dim` (default `true` - scrim for legible overlaid text).
- `layouts/break.vue` - explicit break slide, same field family as section-break but sparser. No props.

See `sdw-26-hello-world/slides.md` for one worked example of each - that deck doubles as the layout gallery for fine-tuning these together before they hit a real session deck.

## Course-progress bar

A thin bar at the bottom of the screen: one tick per real slide ("step"), grouped into sections, steps within a section flush against each other (one connected bar per section, 2px between sections) - pairs with an agenda slide built from `<Toc minDepth="1" maxDepth="1" />` so both read the same structure. Color reads by section, not just by step: entering a section (landing on its divider already counts) lights up its whole run of steps at a mid-tone, and only the one exact step you're on gets the fuller, more saturated color; a section you haven't reached yet stays a faint neutral mark. Sits on its own translucent-white rail rather than drawing straight onto the slide, so it reads the same on a plain white slide and on a full-bleed MUNI-blue one - a flat brand-color (or plain white) mark drawn directly on a same-color slide otherwise nearly vanishes (2026-09-13 fix, after it tested invisible on white slides). Understated by design (2026-09-13 request: "doesn't have to be super visible").

**Sections are bounded by layout, not by heading text** (`dividerLayouts` prop, default `['section-break', 'break']`): a slide using one of those layouts is a "divider" - never a step in the bar itself, and (when it isn't `hideInToc`) the one thing that opens a new tracked section. Every other slide belongs to whichever section's divider it most recently followed, right up to the next divider - a layout-gallery slide, a quote, a reflection slide all count as steps, not just ones that happen to repeat the section's own heading (2026-09-13 rework, replacing an earlier heading-text-matching version - see git history on this file if curious). A hidden divider (the cover, a mid-deck break) opens nothing and closes nothing, it's just skipped. Content before the first real divider - the cover, the intro slide, the agenda slide itself - is never inside any section, so none of it needs special-casing to stay untracked.

Hand-rolled (`components/CourseProgress.vue`), not the `slidev-component-progress` npm addon - that addon renders nothing against this Slidev version (`@slidev/cli` 52.x vs. its peer dep on `@slidev/client ^0.48.0`, last published April 2024). See `snippets/global-bottom.vue` for the full story.

Wiring up a new deck (3 steps, none automatic from the theme alone - Slidev addon/global-layer discovery is per-deck):
1. Copy `snippets/global-bottom.vue` into the deck's own project root as `global-bottom.vue`.
2. Give each real agenda-item divider slide `layout: section-break` (or `break`) and no `hideInToc`; everything else can be any other layout and any `hideInToc` value - it'll track as a step of whichever section it falls in either way. Only add `hideInToc: true` to a divider itself if you want it to act as a silent pause (like the cover, or a mid-deck breather) that doesn't open its own section.
3. Add an agenda slide near the top: `<Toc minDepth="1" maxDepth="1" />`.

See `sdw-26-hello-world/slides.md` for the full worked example (Agenda slide + five sections, the fifth being the pre-existing "Part II" gallery slide).

## Favicon

The MUNI Arts mark (`components/MuniArtsMark.vue`'s same paths, on a white rounded-square backdrop so it stays legible in a dark browser tab bar too) as the browser-tab icon. The `favicon: /favicon.svg` default is set in the theme's own `package.json` (`slidev.defaults`) so every deck on this theme picks it up with no per-deck frontmatter - confirmed this actually works (theme-level `slidev.defaults` do merge into a deck automatically).

The *file* still needs one per-deck step, same limitation as the progress bar: Slidev's static-asset copying for a theme's own `public/` folder lands it at a deep, unpredictable build path (`theme/themes/muni-arts/public/...`), not at the site root - confirmed by an actual build, not just reasoning about it. So the real, working copy has to live in each deck's own `public/` folder instead (Vite's native `publicDir`, which reliably serves at the root in both dev and build):
1. Copy `snippets/favicon.svg` into the deck's own project root as `public/favicon.svg`.

See `sdw-26-hello-world/public/favicon.svg` for the worked example.

## Multi-client theming

This repo is public, so it only ever holds brand themes that are fine to publish (MUNI, a public university, qualifies). Confidential/client-specific branding for other engagements lives entirely in **other repos**, used **locally or as exported files** (PDF/PPTX) - this repo doesn't stage or preview that content at all, so there's no placeholder folder for it here.
