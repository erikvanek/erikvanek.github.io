---
name: presentation-wizard
description: Full wizard for creating reveal.js presentations from a brain dump. Guides through intake, Obsidian second brain check, structure proposal, stylistic customizations, YAML generation, visual review, and HTML output. Use when creating any presentation — conference talk, lecture, workshop, client pitch.
---

# Presentation Wizard

Takes a brain dump and produces a complete, structured reveal.js presentation in two output files:
- `slides.yaml` — structured source of truth (schema in [yaml-schema.md](yaml-schema.md))
- `[name].html` — reveal.js file ready to deploy via eleventy

---

## Phase 1 — Intake

Receive the brain dump. Then ask for anything not already answered in it:

1. **Event** — name and type (conference talk, lecture, workshop, client pitch)
2. **Date** — YYYY-MM-DD
3. **Venue / city**
4. **Audience** — who are they, what do they know, what do they care about?
5. **Duration** — minutes available
6. **Language** — `en` or `cs` — must be explicit, never assumed
7. **Lead-gen intent** — is there a commercial goal? (e.g. "subtly generate freelance leads") — affects closing slide
8. **Partner / co-brand** — is this talk co-branded with an organization?

Do not proceed to Phase 2 until all eight are answered or explicitly skipped by the user.

---

## Phase 2 — Second Brain Check

Attempt to connect to Obsidian via MCP.

**If MCP succeeds:**
- Query for notes relevant to the talk topic: research methods, past project reflections, domain knowledge, method notes, anything topically adjacent
- Surface 3–5 most relevant notes and briefly state what each contributes
- Carry this context into Phase 3 when proposing structure

**If MCP fails:**
- Stop immediately. Do not proceed.
- Say: *"Second brain (Obsidian MCP) is unavailable. This step enriches the outline with your accumulated knowledge — skipping it may produce a thinner structure. Options: (a) start your local MCP server and let me know, or (b) type OVERRIDE to continue without it."*
- Wait for response before continuing.

---

## Phase 3 — Talk Structure Proposal

Propose a section-by-section outline. For each section include:
- Section name
- List of proposed slides (one line each — heading + type hint)
- Estimated duration

Flag in the outline:
- `[DEMO]` — live demo slot
- `[QUOTE]` — strong quote moment
- `[VISUAL]` — slide that likely needs a diagram or image
- `[ENGAGEMENT]` — audience interaction moment

End with total estimated duration vs. available duration.

**Wait for explicit approval. Iterate until approved. Do not proceed to Phase 3.5 without a green light.**

---

## Phase 3.5 — Stylistic Customizations (optional)

Ask:
1. **Partner logo?** If yes: which organization, what file? → placed bottom-right on all slides, subtle (see HTML generation)
2. **Color palette?** Any brand or preference? → stored in `presentation.customizations`
3. **Any other visual constraints?** (client brand, accessibility requirements, etc.)

If user says none or skips, proceed with defaults. Record any confirmed customizations in the `presentation.customizations` block of the YAML.

---

## Phase 4 — YAML Generation

Convert approved structure + brain dump into `slides.yaml`.

Follow the schema in [yaml-schema.md](yaml-schema.md) exactly. Rules:

- **Use `-` not `—` in all slide content**: headings, bullets, prose, speaker notes, captions. Never write an em dash `—` anywhere in the `slides.yaml` content fields. This applies to both generated content and verbatim brain dump material.

- Every slide has: `heading`, `layout`, `content`, `images`, `speaker_notes`
- `speaker_notes` come from the brain dump's intent — never leave empty if the brain dump contains relevant context for that slide
- Assign layout types from the defined types — see [yaml-schema.md](yaml-schema.md)
- Mark slides needing a visual with a YAML comment: `# VISUAL NEEDED — [reason]`
- `images: []` by default — populated in Phase 5
- Diagrams (Mermaid or SVG) go in the `content` field or a `type: mermaid` column — see [diagrams.md](diagrams.md)
- **`layout: custom`** — use when a slide has bespoke HTML no standard layout can produce (custom charts, complex infographics, hand-tuned compositions). Set `content: ""`, add `custom_file: "slide-N.html"` (N = 1-based slide number, relative to the presentation directory) and a `description` field. Keep `speaker_notes` current — still managed in YAML. The `slide-N.html` file holds the actual `<section>` markup; it is never generated from YAML. See [yaml-schema.md](yaml-schema.md) and [layout-html.md](layout-html.md).
- **DRY frontmatter**: use YAML anchors (`&title`, `&date`, `&event`, `&speaker`, `&description`) in the `presentation:` block and aliases (`*title` etc.) on the title slide — see [yaml-schema.md](yaml-schema.md)
- **Compress list slides**: when a section has multiple short conceptual items (declared biases, principles, rules), collapse into a single `heading-body` slide with bullet points. Keep all elaboration in numbered `speaker_notes`. Do not give each item its own slide unless it warrants a dedicated visual or demo.
- **Default to bullet lists**: `heading-body` content should almost always be a `<ul>` list, not bare `<p>` blocks. Use `<p>` only for a single short intro sentence before a list, or for genuinely standalone statements. Multiple `<p>` tags for what are effectively list items is not allowed. Exception: `statement` and `quote` layouts which have their own rules.

Ask user to confirm save location. Default: a new subfolder under `pages/presentations/[event-slug]/`.

---

## Phase 5 — Visual Review

Walk through every slide marked `# VISUAL NEEDED` one at a time.

For each flagged slide:
1. State the slide heading and why a visual would help
2. Offer: **(a)** user provides image path/description, **(b)** generate Mermaid diagram, **(c)** generate inline SVG, **(d)** mark TBD and continue
3. If Mermaid or SVG — generate immediately, embed in `content` field of the YAML
4. If image — ask for `src`, `placement`, `dimensions`, `alt`; update the `images` array
5. If TBD — leave `src: TBD` with a descriptive `alt` as a placeholder note

After all flagged slides: show a summary list of resolved vs. TBD assets.

---

## Phase 6 — HTML Generation

Convert `slides.yaml` to a reveal.js HTML file following [layout-html.md](layout-html.md).

### Frontmatter
```yaml
---
title: [presentation.title]
date: [presentation.date]
layout: presentation-wizard.njk
permalink: /[slugified-title]/
eleventyExcludeFromCollections: true
description: [presentation.description]
---
```

### CSS, theme toggle, Mermaid, and footer
All handled by `presentation-wizard.njk` + `presentation-wizard.css`. Do not add any `<style>`, `<link>`, or `<script>` tags manually — the layout includes everything.

### Partner logo (if set in customizations)
Add directly in the HTML output, after the frontmatter:
```html
<img class="partner-logo" src="[logo-src]" alt="[org name]">
```
The `.partner-logo` class is defined in `presentation-wizard.css`.

### Footer URL
`presentation-wizard.njk` renders `erikvanek.com/[slug]` automatically as a footer. Do not add it manually.

### Slides
Convert each slide from YAML using [layout-html.md](layout-html.md).

For `layout: custom` slides: **do not generate markup**. Read the `custom_file` path from YAML, embed its `<section>` block verbatim at the correct position. Update only `<aside class="notes">` inside that section if `speaker_notes` has changed. If the file does not exist, create it as a placeholder and flag it in the post-generation summary. See [layout-html.md](layout-html.md) and [yaml-schema.md](yaml-schema.md).

For `two-column` slides with a `type: custom-svg` column: preserve the SVG markup verbatim — do not replace with Mermaid or a generated diagram.

Ask user to confirm output path before writing. Default: `pages/presentations/[event-slug]/[talk-slug].html`.

---

## Pre-delivery checklist

Before handing off the HTML file:

- [ ] No slide has more than 6 bullet points
- [ ] All `[DEMO]` slides have step-by-step speaker notes including a fallback if live demo fails
- [ ] All section breaks have gear-shift speaker notes
- [ ] Intro slide has date, place, speaker
- [ ] Closing slide has contact info; if lead-gen intent was set, includes "currently available" line
- [ ] Footer URL is visible only on the first and last slides — hidden on all other slides via the `slidechanged` / `ready` JS hook (see [layout-html.md](layout-html.md))
- [ ] All `layout: custom` slides preserved verbatim from existing HTML (only `<aside class="notes">` updated if speaker_notes changed)
- [ ] All `type: custom-svg` columns preserved verbatim — not replaced with Mermaid
- [ ] TBD images are listed in a final summary for the user
- [ ] If Mermaid is used in `content` field: diagrams use `base` theme; themeVariables set if custom colors were requested
- [ ] If Mermaid is used as a `type: mermaid` column: content is raw Mermaid (no fences), rendered via `<div class="mermaid">`
- [ ] Language is consistent throughout — matches the explicit choice from Phase 1
