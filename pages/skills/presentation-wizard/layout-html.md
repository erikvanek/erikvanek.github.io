# Layout HTML Patterns

Lean HTML patterns for converting each layout type from `slides.yaml` to reveal.js `<section>` blocks.

CSS is handled by `presentation-wizard.css`. Layout classes follow `.layout-[type]` naming. Do not add inline styles for visual design — only structural layout inline styles are acceptable.

Speaker notes always go in `<aside class="notes">` at the end of the section.

---

## `title` — without QR code

```html
<section class="layout-title">
  <h1>HEADING</h1>
  <h3>SUBTITLE</h3>            <!-- omit if no subtitle -->
  <p>SPEAKER · EVENT · DATE</p>
  <aside class="notes">SPEAKER_NOTES</aside>
</section>
```

---

## Footer visibility rule

The URL footer (`erikvanek.com/[slug]`) is shown **only on the first and last slides** — not on every slide. On all other slides it creates noise without value.

Implementation in `presentation-wizard.njk`: hook into reveal.js `slidechanged` and `ready` events, show/hide a fixed footer element based on slide index:

```js
function updateFooter(event) {
  const total = Reveal.getTotalSlides();
  const index = Reveal.getState().indexh;
  const footer = document.querySelector('.slide-footer');
  if (footer) {
    footer.style.display = (index === 0 || index === total - 1) ? 'flex' : 'none';
  }
}
Reveal.on('ready', updateFooter);
Reveal.on('slidechanged', updateFooter);
```

The footer element itself is placed outside `.slides`, with `position: fixed` and `z-index: 100`.

---

## `title` — with QR code

```html
<section class="layout-title layout-two-col">
  <div>
    <h1>HEADING</h1>
    <h3>SUBTITLE</h3>          <!-- omit if no subtitle -->
    <p>SPEAKER · EVENT · DATE</p>
  </div>
  <div>
    <img src="QR_SRC" alt="QR code — QR_URL">
  </div>
  <aside class="notes">SPEAKER_NOTES</aside>
</section>
```

---

## `heading-body`

**Default rule: content should be a `<ul>` bullet list, not bare `<p>` blocks.** Use `<p>` only for a single introductory sentence before a list, or for genuinely standalone prose (e.g. a short statement that fills the slide). Never convert list-like content into multiple `<p>` tags.

**Optional eyebrow:** Add `<p class="slide-eyebrow">LABEL</p>` immediately before `<h2>` to render a small orange uppercase label above the heading — same visual style as the `section-label` in section-break slides. Use for brief summaries, section tags, or numbered takeaways.

```html
<section class="layout-heading-body">
  <p class="slide-eyebrow">LABEL</p>   <!-- omit if no eyebrow -->
  <h2>HEADING</h2>
  <ul>
    <li>ITEM</li>
    <li>ITEM
      <ul>
        <li>Sub-item (no arrow, dim, aligned with parent text)</li>
      </ul>
    </li>
  </ul>
  <aside class="notes">SPEAKER_NOTES</aside>
</section>
```

If `images` array has an inline image, add after content:
```html
  <figure>
    <img src="SRC" alt="ALT" width="WIDTH" height="HEIGHT">
    <figcaption><a href="SOURCE_URL" target="_blank">CAPTION</a></figcaption>   <!-- omit if no caption; wrap in <a> when source_url set -->
  </figure>
```

**Optional quote-block accent:** A `<div class="quote-block">` can be placed inside a `heading-body` slide (not just `layout-quote`) to give a statement visual weight — amber left bar + italic quote treatment. Add `style="margin-top: 2rem;"` to create separation from preceding content.

```html
<section class="layout-heading-body">
  <h2>HEADING</h2>
  <div class="quote-block" style="margin-top: 2rem;">
    <blockquote>STATEMENT</blockquote>
  </div>
  <aside class="notes">SPEAKER_NOTES</aside>
</section>
```

---

## `statement`

```html
<section class="layout-statement">
  <h1>CONTENT</h1>
  <aside class="notes">SPEAKER_NOTES</aside>
</section>
```

---

## `quote`

**Simple** — blockquote centered vertically, optional intro prose above it:

```html
<section class="layout-quote">
  <p>CONTENT</p>                       <!-- omit if content is empty -->
  <blockquote>QUOTE</blockquote>
  <cite>— AUTHOR</cite>                <!-- omit if no author -->
  <aside class="notes">SPEAKER_NOTES</aside>
</section>
```

**With heading + list** — heading and list at top, blockquote separated below. When `ul` precedes `.quote-block`, CSS applies `margin-top: 4rem` (doubled gap). When only `h2` precedes, `margin-top: auto` pushes it to the bottom of available space. The amber border spans both the quote text and the attribution:

```html
<section class="layout-quote">
  <h2>HEADING</h2>
  <ul>
    <li>ITEM
      <ul>
        <li>Sub-item (no arrow, dim, aligned with parent text)</li>
      </ul>
    </li>
    <li>ITEM</li>
  </ul>
  <div class="quote-block">
    <blockquote>QUOTE</blockquote>
    <cite>— AUTHOR</cite>      <!-- omit if no author -->
  </div>
  <aside class="notes">SPEAKER_NOTES</aside>
</section>
```

Use `<div class="quote-block">` whenever `<cite>` is present — it extends the amber left bar over both the quote and the attribution. For simple quote slides without `<cite>`, the bare `<blockquote>` is fine.

---

**All two-column variants require a `.cols` wrapper** so the CSS flex-row kicks in. Without it, columns stack vertically (the section is flex-column to allow an optional `<h2>` heading above the columns).

## `two-column` — text + text

```html
<section class="layout-two-col">
  <h2>HEADING</h2>                <!-- omit if no heading -->
  <div class="cols">
    <div>
      COLUMN_0_CONTENT_AS_HTML
    </div>
    <div>
      COLUMN_1_CONTENT_AS_HTML
    </div>
  </div>
  <aside class="notes">SPEAKER_NOTES</aside>
</section>
```

## `two-column` — text + image

```html
<section class="layout-two-col">
  <h2>HEADING</h2>                <!-- omit if no heading -->
  <div class="cols">
    <div>
      COLUMN_0_CONTENT_AS_HTML
    </div>
    <figure>
      <img src="SRC" alt="ALT">
      <figcaption><a href="SOURCE_URL" target="_blank">CAPTION</a></figcaption>   <!-- omit if no caption; wrap in <a> when source_url set -->
    </figure>
  </div>
  <aside class="notes">SPEAKER_NOTES</aside>
</section>
```

## `two-column` — image + image

```html
<section class="layout-two-col">
  <div class="cols">
    <figure>
      <img src="SRC_0" alt="ALT_0">
    </figure>
    <figure>
      <img src="SRC_1" alt="ALT_1">
    </figure>
  </div>
  <aside class="notes">SPEAKER_NOTES</aside>
</section>
```

## `two-column` — text + mermaid

```html
<section class="layout-two-col">
  <h2>HEADING</h2>                <!-- omit if no heading -->
  <div class="cols">
    <div>
      COLUMN_0_CONTENT_AS_HTML
    </div>
    <div class="mermaid">
MERMAID_DIAGRAM_CONTENT
    </div>
  </div>
  <aside class="notes">SPEAKER_NOTES</aside>
</section>
```

## `two-column` — mermaid + text

```html
<section class="layout-two-col">
  <h2>HEADING</h2>                <!-- omit if no heading -->
  <div class="cols">
    <div class="mermaid">
MERMAID_DIAGRAM_CONTENT
    </div>
    <div>
      COLUMN_1_CONTENT_AS_HTML
    </div>
  </div>
  <aside class="notes">SPEAKER_NOTES</aside>
</section>
```

---

## `full-image`

```html
<section class="layout-full-image"
  data-background-image="SRC"
  data-background-opacity="OPACITY">
  <h2>HEADING</h2>               <!-- omit if heading is empty -->
  <aside class="notes">SPEAKER_NOTES</aside>
</section>
```

---

## `section-break`

Always include the orange section label above the h1 and the rule below it. LABEL is typically the section number or category (e.g. "Part 1", "Context", "Closing").

```html
<section class="layout-section-break">
  <p class="section-label">LABEL</p>
  <h1>HEADING</h1>
  <div class="section-rule"></div>
  <aside class="notes">SPEAKER_NOTES</aside>
</section>
```

---

## `demo`

Always include the demo badge before the heading. The badge renders a small amber dot + "Live demo" label.

```html
<section class="layout-demo">
  <div class="demo-badge"><span>Live demo</span></div>
  <h2>HEADING</h2>
  CONTENT_AS_HTML
  <aside class="notes">SPEAKER_NOTES</aside>
</section>
```

---

## `transcripts-stack`

A custom progress UI layout for showing qualitative analysis steps.

```html
<section class="layout-transcripts-stack">
  <h2>HEADING</h2>
  <div class="subtitle">SUBTITLE</div>

  <div class="visual-container">
    <div class="transcripts-stack-container">
      <!-- Bottom Sheet -->
      <div class="transcript-paper" style="top: 40px; left: 0; transform: rotate(-4deg);">
        <div class="paper-line" style="width: 60%;"></div>
        <div class="paper-line" style="width: 90%;"></div>
        <div class="paper-line" style="width: 85%;"></div>
        <div class="paper-line highlight" style="width: 40%;"></div>
        <div class="paper-line" style="width: 95%;"></div>
      </div>
      <!-- Middle Sheet -->
      <div class="transcript-paper" style="top: 20px; left: 40px; transform: rotate(2deg);">
        <div class="paper-line" style="width: 70%;"></div>
        <div class="paper-line highlight" style="width: 30%;"></div>
        <div class="paper-line" style="width: 80%;"></div>
        <div class="paper-line" style="width: 90%;"></div>
        <div class="paper-line" style="width: 65%;"></div>
      </div>
      <!-- Top Sheet -->
      <div class="transcript-paper top" style="top: 0; left: 80px; transform: rotate(-1deg);">
        <div class="paper-line" style="width: 60%; background: #1c1812; height: 10px; margin-bottom: 8px;"></div>
        <div class="paper-line" style="width: 100%;"></div>
        <div class="paper-line" style="width: 100%;"></div>
        <div class="paper-line highlight" style="width: 70%;"></div>
        <div class="paper-line" style="width: 100%;"></div>
        <div class="paper-line highlight" style="width: 40%;"></div>
        <div class="paper-line" style="width: 100%;"></div>
      </div>
    </div>

    <!-- Progress List -->
    <div class="progress-list">
      <div class="progress-header">Qualitative Analysis</div>
      <div class="progress-items">
        <div class="progress-item">
          <div class="checkbox"><span>✓</span></div>
          <span class="item-text done">Brain dump</span>
        </div>
        <div class="progress-item">
          <div class="checkbox"><span>✓</span></div>
          <span class="item-text done">Research plan</span>
        </div>
        <div class="progress-item">
          <div class="checkbox"><span>✓</span></div>
          <span class="item-text done">Interview script</span>
        </div>
        <div class="progress-item">
          <div class="checkbox"><span>✓</span></div>
          <span class="item-text done">Interviews conducted</span>
        </div>
        <div class="progress-item">
          <div class="checkbox"><span>✓</span></div>
          <span class="item-text">Transcripts generated</span>
        </div>
      </div>
    </div>
  </div>

  <aside class="notes">SPEAKER_NOTES</aside>
</section>
```

---

## `custom`

Do not generate markup from YAML for this layout. The `<section>` lives in a separate file identified by the `custom_file` field in YAML (e.g., `slide-7.html`), stored in the same directory as the presentation.

**Regeneration:** read `custom_file`, embed its full content verbatim at the correct slide position. Update only `<aside class="notes">` inside the embedded section if `speaker_notes` in YAML has changed from what is in the file — and write that change back to the file too, so the file stays in sync.

**If `custom_file` does not exist yet:** create it as a placeholder, flag it in the post-generation summary:

```html
<!-- slide-N.html — custom slide: [heading] -->
<section>
  <!-- TODO: hand-author markup here -->
  <aside class="notes">SPEAKER_NOTES</aside>
</section>
```

**`type: custom-svg` column (inside a `two-column` slide):** the SVG markup lives directly in the main HTML file. During regeneration, copy it unchanged — never substitute Mermaid or a generated diagram.

---

## Markdown → HTML conversion rules

When converting `content` markdown to HTML for embedding in sections:

| Markdown | HTML |
|---|---|
| `- item` / `* item` | `<ul><li>` |
| `1. item` | `<ol><li>` |
| `**bold**` | `<strong>` |
| `*italic*` | `<em>` |
| `> quote` | `<blockquote>` |
| ` ```lang ` block | `<pre><code class="language-lang">` |
| `[text](url)` | `<a href="url">text</a>` |

Nested lists: use nested `<ul>` / `<ol>`. Max two levels deep in a presentation context.

---

## Fragment (progressive reveal)

To reveal bullet points one at a time, add `class="fragment"` to each `<li>`:

```html
<ul>
  <li class="fragment">First point</li>
  <li class="fragment">Second point</li>
  <li class="fragment">Third point</li>
</ul>
```

Use fragments when the speaker notes indicate building up a concept step by step. Do not use by default — only when explicitly useful for pacing.

---

## Vertical sub-slides

When a slide has deep content best split across two screens, wrap in a parent `<section>`:

```html
<section>
  <section class="layout-heading-body">
    <h2>Main concept</h2>
    ...
  </section>
  <section class="layout-heading-body">
    <h2>Detail / example</h2>
    ...
  </section>
</section>
```
