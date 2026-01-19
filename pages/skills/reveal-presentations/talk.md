# Conference Talk Presentations

For conference sessions, guest lectures, and keynote-style presentations.

## Typical Structure

1. **Title** – Talk name, date, venue
2. **Cíl** – What audience will learn
3. **Agenda** – Roadmap of the talk
4. **Představení** – Who you are (brief)
5. **Core content** – Main sections with visual anchors
6. **Interactive moment** – Question, demo, or reflection
7. **Zdroje** – Further reading, links
8. **Q&A** – Questions slide
9. **Díky** – Closing with contact

## Key Patterns

### Title Slide with Context

```html
<section>
  <h1 class="r-fit-text">Vývoj (digitálních) produktů</h1>
  <br><br>
  <h4>Erik Vaněk | <a href="erikvanek.com">erikvanek.com</a></h4>
  <h4>15. 11. 2024, KISK FF MUNI</h4>
</section>
```

### Goal Statement

```html
<section>
  <h1 class="r-fit-text">Cíl: představit moderní<br>způsoby vývoje (nejen)<br>digitálních produktů</h1>
  <br><br>
  <p>Příklady budou na digitálních produktech, ale lze je překlopit i do jiných prostředí.</p>
</section>
```

### Agenda Overview

```html
<section>
  <h2>Co nás dnes čeká?</h2>
  <ul>
    <li>Představení</li>
    <li>Výlet do historie</li>
    <li>Rozmach agilních přístupů</li>
    <li>Role a struktura</li>
    <li>Nové odnože a možnosti</li>
    <li>Co s tím dál?</li>
  </ul>
</section>
```

### Disclaimers/Meta

Set expectations early.

```html
<section>
  <h1>Disclaimer</h1>
  <ul>
    <li>Ptejte se kdykoli pls!</li>
    <li>Anglicismy – co nešlo přeložit dávám do uvozovek</li>
    <li><em>Subjektivní</em> perspektiva zakotvená v literatuře
      <ul><li>Vítám kritiku 🙌</li></ul>
    </li>
    <li>Možná nuda pro lidi, který tvorba produktů nezajímá</li>
    <li>Generické maskulinum</li>
  </ul>
</section>
```

### Personal Introduction

Keep it brief, relevant to the topic.

```html
<section>
  <h1>Zdarec! 👋</h1>
</section>

<section>
  <h1>Něco o mně</h1>
  <ul>
    <li>Cca 10 let v technologických firmách
      <ul>
        <li>engineering a vedení týmů</li>
        <li>design</li>
        <li>product management</li>
      </ul>
    </li>
    <li>Odvětví: Finančnictví, pohostinost, <strong>hydroponie</strong></li>
  </ul>
</section>
```

### Visual Story Slides

Use full-bleed backgrounds for impactful moments.

```html
<section data-background="infarm/store-2.jpg">
  <h1 class="r-fit-text" style="text-shadow: 4px 4px 4px black;">Infarm 🌿</h1>
</section>

<section data-background="infarm/bust.png" data-background-size="contain">
</section>
```

### Video Embeds

```html
<section data-autoplay
  data-background-iframe="https://www.youtube.com/embed/VIDEO_ID?si=...&amp;controls=0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
</section>
```

### Concept Explanation

```html
<section>
  <h1>Klíčové charakteristiky</h1>
  <ul>
    <li>Říká se tomu vodopád 🌊</li>
    <li>Detailní plánování</li>
    <li>Lineární proces</li>
    <li>"Kaskáda"</li>
    <li>Validace probíhá úplně na konci</li>
    <li>Chybí důraz na člověka</li>
  </ul>
</section>
```

### Check-in with Audience

```html
<section>
  <h1 class="r-fit-text">Co se vám honí hlavou?</h1>
</section>

<section>
  <h1 class="r-fit-text">Koho tu dnes máme?</h1>
</section>
```

### Example Companies/Products

```html
<section>
  <h1>3 konkrétní příklady</h1>
  <div style="display: flex; gap: 5rem; justify-content: center; margin-top: 2rem;">
    <img src="basecamp-logo.svg" style="height: 15rem; width: 15rem; border-radius: 2rem;">
    <img src="linear-logo.avif" style="height: 15rem; width: 15rem; border-radius: 2rem;">
    <img src="arc-logo.svg" style="height: 15rem; width: 15rem; border-radius: 2rem;">
  </div>
  <br>
  <p>Znáte / používáte nějaký z těchto produktů?</p>
</section>
```

### Interactive Demo Section

```html
<section>
  <h1>Interaktivní demo</h1>
  <ul>
    <li>Jednoduchý nástroj na prioritizaci úkolů</li>
    <li>Postupně rozvíjíme přidáváním featur</li>
    <li>Pouze copy-paste, není nutné umět kódovat</li>
  </ul>
</section>
```

### Further Resources

```html
<section>
  <h1>Další zdroje</h1>
  <ul>
    <li><a href="..." target="_blank">Lenny's podcast</a></li>
    <li><a href="..." target="_blank">Teresa Torres</a></li>
    <li><a href="..." target="_blank">David Heinemeier Hansson</a></li>
    <li><a href="..." target="_blank">Design better podcast</a></li>
  </ul>
</section>
```

### Closing with Video Background

```html
<section data-background-video-loop data-background-video="kombucha-compressed.mp4">
  <h2 style="text-align: center;">Dík za pozornost!</h2>
  <h1>Máte otázky? 🌈</h1>
</section>
```

## Content Guidelines

- **Hook early** – why should audience care?
- **Keep intro short** – ~2 slides max about yourself
- **Visual variety** – alternate text slides with full-bleed images/videos
- **Check in periodically** – "Co se vám honí hlavou?"
- **Concrete examples** – name companies, products, projects
- **End with resources** – give audience places to go deeper
- **Leave Q&A time** – don't cram content to the last minute

## Pacing

For a 45-minute talk:
- 5 min: intro + context
- 30 min: core content (~15-20 slides)
- 5 min: wrap-up + resources
- 5 min: Q&A

## Visual Style

- Use `r-fit-text` for impact statements and transitions
- Full-bleed backgrounds for story moments
- Consistent image styling across examples
- Video backgrounds for memorable closing

## Audience Engagement

- Ask questions even if rhetorical
- Show of hands for calibration ("Kdo z vás už...?")
- Reference what you've heard about the audience
- Interactive demo if technical topic allows
