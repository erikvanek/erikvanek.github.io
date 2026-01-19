# Code Examples and Templates

Reusable HTML patterns for reveal.js presentations.

## File Template

```html
---
title: Presentation Title
date: YYYY-MM-DD
layout: presentation-jinag.njk
permalink: /{{page.fileSlug}}/
eleventyExcludeFromCollections: true
description: Subtitle or short description
---

<link rel="stylesheet" href="../css/presentation-kisk.css">

<section>
  <h1>{{title}}</h1>
  <h2>{{description}}</h2>
  <br><br>
  <h4>Erik Vaněk, {{date | date: "%d.%m.%Y"}}</h4>
  <h4><a href="mailto:me@erikvanek.com">me@erikvanek.com</a></h4>
</section>

<!-- Content slides here -->

<section>
  <h1 class="r-fit-text">Díky! ❤️</h1>
</section>
```

## Basic Slide Types

### Text Slide

```html
<section>
  <h1>Slide Title</h1>
  <ul>
    <li>Point one</li>
    <li>Point two
      <ul><li>Sub-point</li></ul>
    </li>
    <li>Point three</li>
  </ul>
</section>
```

### Emphasis Slide

```html
<section>
  <h1 class="r-fit-text">Big Statement</h1>
</section>
```

### Emphasis with Subtext

```html
<section>
  <h1 class="r-fit-text">Big Statement</h1>
  <h3 class="r-fit-text" style="text-align: center;">Supporting context</h3>
</section>
```

### Quote Slide

```html
<section>
  <p><em>"Quote text goes here that should be memorable and impactful."</em></p>
  <br>
  <p>— Attribution</p>
</section>
```

## Fragment Patterns

### Sequential Reveal

```html
<section>
  <h1>Building Concepts</h1>
  <ul>
    <li class="fragment">First concept</li>
    <li class="fragment">Second concept</li>
    <li class="fragment">Third concept</li>
  </ul>
</section>
```

### Controlled Order

```html
<section>
  <h1>Non-linear Reveal</h1>
  <p class="fragment" data-fragment-index="3">Appears third</p>
  <p class="fragment" data-fragment-index="1">Appears first</p>
  <p class="fragment" data-fragment-index="2">Appears second</p>
</section>
```

### Fragment with Image

```html
<section>
  <h1 class="r-fit-text">Concept?🤔</h1>
  <div class="fragment">
    <img src="diagram.png" alt="" style="border-radius: .5rem; max-width: 800px;">
    <p style="font-size: 1.25rem;">Source — <a href="..." target="_blank">Link</a></p>
  </div>
</section>
```

## Layout Patterns

### Two Columns (equal-columns)

```html
<section class="equal-columns">
  <div>
    <h2>Left Column</h2>
    <ul>
      <li>Point 1</li>
      <li>Point 2</li>
    </ul>
  </div>
  <div>
    <h2>Right Column</h2>
    <ul>
      <li>Point 1</li>
      <li>Point 2</li>
    </ul>
  </div>
</section>
```

### Two Columns with Image

```html
<section>
  <div class="equal-columns">
    <div>
      <h2>Text Content</h2>
      <ul>
        <li>Point one</li>
        <li>Point two</li>
      </ul>
    </div>
    <img src="image.png" alt="" style="max-width: 25rem;">
  </div>
</section>
```

### Centered Content Column

```html
<section>
  <div style="display: flex; align-items: center; flex-direction: column;">
    <h1>{{title}}</h1>
    <h2>{{description}}</h2>
    <br><br>
    <h4>Date and venue</h4>
  </div>
</section>
```

## Background Patterns

### Image Background (dimmed)

```html
<section data-background-image="image.jpg" data-background-opacity="0.3">
  <h2>Text over dimmed background</h2>
</section>
```

### Image Background (full)

```html
<section data-background="image.jpg" data-background-size="contain">
</section>
```

### Image with Text Overlay

```html
<section data-background="image.jpg" data-background-size="fill">
  <h2 class="text-shadow-black" style="color: whitesmoke;">Readable text</h2>
</section>
```

### Color Background

```html
<section data-background-color="#483a6e">
  <h1 style="color: whitesmoke;">Content on colored background</h1>
</section>
```

### Interactive iframe Background

```html
<section data-background-iframe="https://miro.com/board/..." data-background-interactive>
</section>
```

### Video Background (looping)

```html
<section data-background-video-loop data-background-video="video.mp4">
  <h1 style="text-shadow: 4px 4px 4px black;">Text over video</h1>
</section>
```

### Embedded YouTube

```html
<section data-autoplay
  data-background-iframe="https://www.youtube.com/embed/VIDEO_ID?si=...&amp;controls=0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
</section>
```

## Vertical Slides

```html
<section>
  <section>
    <h2>Main Concept</h2>
    <p>Overview content</p>
  </section>
  <section>
    <h3>Detailed Example 1</h3>
    <p>Deep dive content</p>
  </section>
  <section>
    <h3>Detailed Example 2</h3>
    <p>More detail</p>
  </section>
</section>
```

## Speaker Notes

```html
<section>
  <h1>Slide Title</h1>
  <ul>
    <li>Visible content</li>
  </ul>
  
  <aside class="notes">
    - Timing: 3-5 minutes
    - Mention the MPSV example
    - Common question: "What about X?"
    - Transition: "So what does this mean for..."
  </aside>
</section>
```

## Interactive Elements

### QR Code with Text

```html
<section>
  <div class="equal-columns">
    <div>
      <h1>Call to Action</h1>
      <ul>
        <li>Question 1?</li>
        <li>Question 2?</li>
      </ul>
    </div>
    <img src="qr-code.png" style="max-width: 400px;">
  </div>
</section>
```

### External Timer Link

```html
<section>
  <h1>Časovač</h1>
  <a href="https://www.bigtimer.net/?minutes=18&repeat=false" target="_blank">časovač</a>
</section>
```

### Live Clock Display

```html
<section>
  <div style="font-size: 20rem;">
    <span id="hours"></span>:<span id="minutes"></span>
  </div>
</section>

<script>
(function() {
  function updateClock() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    document.getElementById('hours').textContent = h < 10 ? '0' + h : h;
    document.getElementById('minutes').textContent = m < 10 ? '0' + m : m;
  }
  updateClock();
  setInterval(updateClock, 1000);
})();
</script>
```

## Common Closing Slides

### Simple Thanks

```html
<section>
  <h1 class="r-fit-text">Díky! ❤️</h1>
</section>
```

### Thanks with Background

```html
<section data-background="nice-image.png" data-background-size="fit">
  <h2 class="r-fit-text text-shadow-black" style="color: white;">Dík!</h2>
  <br><br>
  <h3 class="r-fit-text text-shadow-black" style="color: white;">Otázky?</h3>
</section>
```

### Contact Info

```html
<section class="equal-columns">
  <div>
    <h1>Moc díky!</h1>
    <p>Buďme dále v kontaktu!</p>
    <ul>
      <li><a href="mailto:me@erikvanek.com">me@erikvanek.com</a></li>
      <li><a href="https://erikvanek.com">erikvanek.com</a></li>
    </ul>
  </div>
  <div>
    <img src="qr-code.png" alt="">
  </div>
</section>
```

## CSS Classes Reference

Available in presentation-kisk.css:

| Class | Effect |
|-------|--------|
| `r-fit-text` | Auto-scale text to fit container |
| `fragment` | Progressive reveal |
| `equal-columns` | Two-column grid layout |
| `text-shadow-black` | Black text shadow for readability |

## Inline Style Patterns

### Readable text over images
```html
style="color: whitesmoke; text-shadow: 4px 4px 4px black;"
```

### Centered heading
```html
style="text-align: center;"
```

### Constrained image width
```html
style="max-width: 800px; border-radius: .5rem;"
```

### Small source text
```html
style="font-size: 1.25rem; color: whitesmoke;"
```
