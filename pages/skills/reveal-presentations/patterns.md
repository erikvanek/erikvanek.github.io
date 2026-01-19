# Reveal.js Power User Patterns

Combine 4-6 features systematically rather than using individual capabilities in isolation.

## Pattern 1: Progressive Concept Building

Reveal complex ideas incrementally for cognitive scaffolding.

```html
<section>
  <h2>Service Blueprint Layers</h2>
  <div class="fragment" data-fragment-index="1">Customer Actions (visible touchpoints)</div>
  <div class="fragment" data-fragment-index="2">Frontstage (employee interactions)</div>
  <div class="fragment" data-fragment-index="3">Backstage (invisible processes)</div>
  <div class="fragment" data-fragment-index="4">Support Processes (infrastructure)</div>
</section>
```

**Use for:** Explaining layered concepts, building stakeholder maps, walking through process stages.

## Pattern 2: Vertical Slides for Depth

Horizontal = main narrative. Vertical = optional deep-dives, examples, Q&A material.

```html
<section>
  <section><h2>Personas</h2><!-- Main concept --></section>
  <section><h3>Example: Healthcare Persona</h3><!-- Optional depth --></section>
  <section><h3>Anti-patterns to Avoid</h3><!-- Reference material --></section>
</section>
```

**Use for:** Main concept + detailed examples, core material + tangential questions. Skip deep-dives when time-constrained; return during Q&A.

## Pattern 3: Stacked Image Layers (r-stack)

Layer visual elements progressively with fragments.

```html
<div class="r-stack">
  <img class="fragment" src="blueprint-layer1-customer.svg">
  <img class="fragment" src="blueprint-layer2-frontstage.svg">
  <img class="fragment" src="blueprint-layer3-backstage.svg">
  <img class="fragment" src="blueprint-layer4-support.svg">
</div>
```

**Use for:** Service blueprints, journey maps, stakeholder diagrams where layers build on each other.

## Pattern 4: Two-Panel Layouts

Side-by-side comparisons using CSS grid.

```html
<section class="equal-columns">
  <div>
    <h2>Výhody</h2>
    <ul><li>Point 1</li><li>Point 2</li></ul>
  </div>
  <div>
    <h2>Nevýhody</h2>
    <ul><li>Point 1</li><li>Point 2</li></ul>
  </div>
</section>
```

**Use for:** Current vs. future state, competitor analysis, stakeholder perspectives, pros/cons.

## Pattern 5: Background Media for Context

Full-bleed images or embedded iframes as slide backgrounds.

```html
<section data-background-image="journey-map.jpg" data-background-opacity="0.3">
  <h2 class="text-shadow-black" style="color: white;">Understanding the current experience</h2>
</section>

<section data-background-iframe="https://miro.com/board/..." data-background-interactive>
  <!-- Live Miro board exploration -->
</section>
```

**Use for:** Creating immersive context, embedding live design tools (Miro, Figma).

## Pattern 6: Auto-Animate for Visual Continuity

Automatically animate matching elements between adjacent slides.

```html
<section data-auto-animate>
  <div data-id="box" style="width: 100px; background: blue;">Step 1</div>
</section>
<section data-auto-animate>
  <div data-id="box" style="width: 300px; background: green;">Step 2</div>
</section>
```

**Use for:** Showing evolution of diagrams, demonstrating iteration, animating journey maps being built.

## Pattern 7: Speaker Notes for Teaching Prompts

Hidden notes visible only to presenter (press `S` key).

```html
<section>
  <h1>Topic</h1>
  <ul><li>Point 1</li></ul>
  
  <aside class="notes">
    - Timing: spend max 5 min here
    - Example to mention: MPSV project
    - Common question: "What about X?"
  </aside>
</section>
```

**Use for:** Timing cues, examples to mention, anticipated questions, facilitation prompts.

## Pattern 8: Emphasis Slides

Use r-fit-text for single powerful statements.

```html
<section>
  <h1 class="r-fit-text">Proč jsme tady?</h1>
</section>
```

**Use for:** Transition moments, key questions, dramatic pauses. Don't overuse.

## High-Value Feature Combinations

### Combination A: Progressive Explanation Stack
Fragments + Vertical slides + Speaker notes = Build concepts incrementally with optional depth and teaching prompts.

### Combination B: Comparative Analysis Suite
Two-panel layout + Fragments + Background images = Show comparisons with context and controlled reveal.

### Combination C: Teaching Infrastructure
Speaker notes + Question slides + Vertical slides = Main content with prompts, Q&A buffers, and reference material.

## Anti-Patterns to Avoid

- **Wall of text** – No slide should have more than 6 bullet points
- **Fragment overload** – Not every list needs fragments; use for pacing important concepts
- **Decoration backgrounds** – Backgrounds should add meaning, not distract
- **Missing speaker notes** – Complex slides need prompts for consistent delivery
- **Linear only** – Vertical slides enable flexible navigation during Q&A
