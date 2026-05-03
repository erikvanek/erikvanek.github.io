# YAML Schema Reference

Complete schema for `slides.yaml`. Every field listed as required must be present on every slide, even if empty string.

---

## Presentation metadata

Use YAML anchors to keep key values DRY — define once in `presentation:`, reuse in the title slide. Anchors only resolve at node level; they cannot be interpolated inside block scalars (`|`).

```yaml
presentation:
  title: &title "..."             # Anchor — reused in title slide
  date: &date YYYY-MM-DD          # Anchor
  event: &event "..."             # Anchor — event name (e.g. "UX Monday Prague")
  venue: "..."                    # City or venue (no anchor needed)
  speaker: &speaker "..."         # Anchor — speaker full name
  duration: 45                    # Minutes
  language: en                    # 'en' or 'cs' — explicit, never assumed
  layout: presentation-jinag.njk
  permalink: /slug/
  eleventyExcludeFromCollections: true
  description: &description "..."  # Anchor — one-line subtitle or abstract
  customizations:
    partner_logo:                 # optional
      src: "..."
      org: "..."
    colors:                       # optional
      primary: "#..."
      secondary: "#..."
```

---

## Slide schema

```yaml
- heading: "..."          # Required. String. Empty string if layout doesn't use a heading.
  layout: heading-body    # Required. One of 8 types — see below.
  content: |              # Required. Markdown string. Empty string if layout handles content via dedicated fields.
    ...
  images: []              # Required. Array of image objects, or empty array.
  speaker_notes: |        # Required. Plain prose. Never mixed with content. Never empty if brain dump has context.
    ...
```

---

## Layout types

### `title`
Opening slide. Uses YAML aliases to stay DRY — heading and subtitle reference frontmatter anchors. Without `qr_code`: single centered column. With `qr_code`: title/info left, QR right.

```yaml
- heading: *title         # alias — references &title anchor in presentation:
  subtitle: *description  # alias — references &description anchor
  layout: title
  speaker: *speaker       # alias
  event: *event           # alias
  date: *date             # alias
  qr_code:                # optional
    src: qr.png
    url: "https://..."
  images: []
  speaker_notes: "..."
```

### `heading-body`
Standard slide. Heading + any markdown content: bullets, prose, numbered list, code block.

```yaml
- heading: "..."
  layout: heading-body
  content: |
    - Point one
    - Point two
  images: []              # optional image below or beside content
  speaker_notes: "..."
```

### `statement`
One or two short lines only. No heading needed — the content is the whole slide.

```yaml
- heading: ""
  layout: statement
  content: |
    Big claim goes here.
  images: []
  speaker_notes: "..."
```

### `quote`
Featured quote with optional attribution. `content` is optional framing text above the quote.

```yaml
- heading: ""
  layout: quote
  content: ""
  quote: "The quote text."
  author: "Name"          # optional — omit or empty string if unattributed
  images: []
  speaker_notes: "..."
```

### `two-column`
Two columns via a `columns` array. Each column is `type: text`, `type: image`, or `type: mermaid`. Handles all variants:
- text + text
- text + image
- text + mermaid
- image + image

```yaml
- heading: "..."
  layout: two-column
  content: ""
  columns:
    - type: text
      content: |
        Left column markdown
    - type: image
      src: diagram.png
      width: 480
      height: 320
      alt: "..."
      caption: "..."      # optional
  images: []
  speaker_notes: "..."
```

Mermaid column — use when a diagram belongs beside text rather than full-slide:

```yaml
  columns:
    - type: text
      content: |
        Explanation text here
    - type: mermaid
      content: |
        flowchart LR
          A["Node A"] -->|label| B(("Node B"))
```

### `full-image`
Full-bleed background image. Heading and content optional — use only if text overlay adds value.

```yaml
- heading: ""
  layout: full-image
  content: ""
  images:
    - src: image.jpg
      placement: background
      opacity: 0.85       # 0.0–1.0
      alt: "..."
  speaker_notes: "..."
```

### `section-break`
Major section divider. Minimal — section name and optional subtitle only.

```yaml
- heading: "Part 1"
  layout: section-break
  content: |
    ## Discovery
  images: []
  speaker_notes: "Transition note — what gear shift this represents."
```

### `demo`
Live demo placeholder. Speaker notes carry the full step-by-step instructions including fallback.

```yaml
- heading: "Demo 1"
  layout: demo
  content: |
    **Brief description of what the demo covers**
  images: []
  speaker_notes: |
    Step 1: ...
    Step 2: ...
    Step 3: ...
    Fallback if live demo fails: ...
```

### `transcripts-stack`
Custom light-mode visualization for showing transcripts analysis.

```yaml
- heading: "Now you have transcripts"
  layout: transcripts-stack
  subtitle: "Research plan · interview script · transcripts · research goals"
  content: ""
  images: []
  speaker_notes: "..."
```

### `custom`
Fully hand-authored HTML. Use when a slide requires bespoke markup that no standard layout can produce — custom charts, complex infographics, hand-tuned SVG compositions, etc.

The `<section>` markup lives in a **separate file** named `slide-N.html` (where N is the slide's 1-based position in the deck), stored in the same directory as the presentation. The YAML entry is metadata only — `content` is always `""`. Use `description` to document what the slide renders. `speaker_notes` is still managed in YAML and must be kept current.

```yaml
- heading: "..."
  layout: custom
  custom_file: "slide-7.html"   # relative to the presentation directory
  description: "One-line description of what the custom HTML renders"
  content: ""
  images: []
  speaker_notes: "..."
```

**HTML generation rule:** read `custom_file`, embed its `<section>` block verbatim at the correct slide position. Update only `<aside class="notes">` inside the embedded section if `speaker_notes` has changed. If `custom_file` does not exist yet, create it with a placeholder and note it in the visual-review summary:

```html
<!-- slide-N.html — custom slide: [heading] -->
<section>
  <!-- TODO: hand-author markup here -->
  <aside class="notes">SPEAKER_NOTES</aside>
</section>
```

**`type: custom-svg` column** (two-column variant): when a `two-column` slide has a column with `type: custom-svg`, that column contains a description string only — the actual SVG lives directly in the HTML file. During regeneration, preserve the SVG column markup verbatim; do not replace it with Mermaid or generated SVG.

---

## Image object

Used in the `images` array on any layout.

```yaml
images:
  - src: "..."              # direct asset URL, filename, or TBD — never a CDN optimizer wrapper
    placement: inline       # inline | background
    width: 800              # px
    height: 400             # px
    alt: "..."              # required — describe the image for accessibility and as a placeholder note
    caption: "..."          # optional — use a clean study/page URL, not the raw asset URL
    author: "..."           # optional — organisation or person
    source_url: "..."       # optional — canonical study or page URL for attribution
    opacity: 1.0            # optional — relevant for background placement
```

For `full-image` background slides use `placement: background`. For `heading-body` or `two-column` use `placement: inline`.
