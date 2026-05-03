# Diagrams

Two tools for generating visuals from descriptions:
- **Mermaid** — structured/process diagrams
- **Inline SVG** — spatial and geometric layouts

Both embed directly in the `content` field of a slide's YAML, and render in the HTML `<section>` without build steps.

---

## When to use which

| Use Mermaid | Use SVG |
|---|---|
| Process flows, step sequences | Venn diagrams, overlapping circles |
| Decision trees | Concentric shapes, spatial relationships |
| Timelines | Custom icons or freehand-ish geometry |
| Before/after comparisons (horizontal flow) | Diagrams where position matters more than connection |

If unsure: Mermaid for "things that happen in order," SVG for "things that exist in relation to each other."

---

## Mermaid

### Basic embed in `content` field

````yaml
content: |
  ```mermaid
  flowchart LR
    A[Brain dump] --> B[Structure] --> C[YAML] --> D[HTML]
  ```
````

In the HTML output this becomes:

```html
<div class="mermaid">
flowchart LR
  A[Brain dump] --> B[Structure] --> C[YAML] --> D[HTML]
</div>
```

### Theming

Always use `base` theme with `themeVariables` so diagrams respond to CSS custom properties.

Minimal init block (add at top of diagram):
```
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#e0e0e0', 'primaryTextColor': '#1a1a1a', 'lineColor': '#666666', 'fontSize': '18px'}}}%%
```

If custom colors were set in `presentation.customizations.colors`, replace `primaryColor` with the primary color value.

### Per-node styling (flowcharts)

```
classDef highlight fill:#6366f1,color:#fff,stroke:none
A:::highlight --> B --> C
```

### Common diagram types

**Process flow (left to right):**
```
flowchart LR
  A[Start] --> B[Step 2] --> C[End]
```

**Process flow with decision:**
```
flowchart TD
  A[Input] --> B{Good enough?}
  B -->|Yes| C[Ship]
  B -->|No| D[Iterate] --> A
```

**Timeline / phases:**
```
flowchart LR
  subgraph Discovery
    A[Research] --> B[Synthesis]
  end
  subgraph Delivery
    C[Prototype] --> D[Handover]
  end
  B --> C
```

**Simple sequence:**
```
sequenceDiagram
  Designer->>AI: Here are my codes
  AI-->>Designer: Codebook draft
  Designer->>AI: Code these transcripts
  AI-->>Designer: Coded data
```

---

## Inline SVG

Used for spatial and geometric diagrams where position conveys meaning.

### Basic embed in `content` field

```yaml
content: |
  <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;">
    <!-- shapes here -->
  </svg>
```

### Color convention

Always use CSS custom properties for colors so SVG responds to light/dark mode:

```svg
fill="var(--accent)"
fill="var(--text)"
stroke="var(--muted)"
```

### Venn diagram (3 circles)

```svg
<svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;">
  <circle cx="200" cy="140" r="110" fill="var(--accent)" opacity="0.25"/>
  <circle cx="300" cy="140" r="110" fill="var(--accent)" opacity="0.25"/>
  <circle cx="250" cy="230" r="110" fill="var(--accent)" opacity="0.25"/>
  <text x="155" y="100" text-anchor="middle" fill="var(--text)" font-size="16">Label A</text>
  <text x="345" y="100" text-anchor="middle" fill="var(--text)" font-size="16">Label B</text>
  <text x="250" y="295" text-anchor="middle" fill="var(--text)" font-size="16">Label C</text>
  <text x="250" y="175" text-anchor="middle" fill="var(--text)" font-size="14" font-style="italic">You</text>
</svg>
```

### Two overlapping circles

```svg
<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;">
  <circle cx="140" cy="100" r="90" fill="var(--accent)" opacity="0.3"/>
  <circle cx="260" cy="100" r="90" fill="var(--muted)" opacity="0.3"/>
  <text x="95"  y="105" text-anchor="middle" fill="var(--text)" font-size="16">Left</text>
  <text x="305" y="105" text-anchor="middle" fill="var(--text)" font-size="16">Right</text>
  <text x="200" y="105" text-anchor="middle" fill="var(--text)" font-size="13" font-style="italic">Both</text>
</svg>
```

### Simple arrow / flow (horizontal)

```svg
<svg viewBox="0 0 500 80" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;">
  <rect x="10"  y="20" width="120" height="40" rx="6" fill="var(--surface)" stroke="var(--accent)"/>
  <rect x="190" y="20" width="120" height="40" rx="6" fill="var(--surface)" stroke="var(--accent)"/>
  <rect x="370" y="20" width="120" height="40" rx="6" fill="var(--surface)" stroke="var(--accent)"/>
  <line x1="130" y1="40" x2="190" y2="40" stroke="var(--muted)" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="310" y1="40" x2="370" y2="40" stroke="var(--muted)" stroke-width="2" marker-end="url(#arr)"/>
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="var(--muted)"/>
    </marker>
  </defs>
  <text x="70"  y="45" text-anchor="middle" fill="var(--text)" font-size="14">Step 1</text>
  <text x="250" y="45" text-anchor="middle" fill="var(--text)" font-size="14">Step 2</text>
  <text x="430" y="45" text-anchor="middle" fill="var(--text)" font-size="14">Step 3</text>
</svg>
```

---

## Generating diagrams from brain dump descriptions

When the brain dump contains a description like:
- *"a process with steps A, B, C"* → Mermaid `flowchart LR`
- *"I'm somewhere between X, Y, Z"* → SVG 3-circle Venn
- *"before and after"* → Mermaid `flowchart LR` with two nodes and a contrast arrow
- *"how X connects to Y"* → Mermaid `flowchart` or SVG two-circle overlap
- *"phases or timeline"* → Mermaid `flowchart LR` with subgraphs

Always generate a draft diagram and offer it to the user for approval before embedding.
