# University Teaching Presentations

For courses, lectures, and educational content at KISK and similar contexts.

## Typical Structure

1. **Title** – Course name, date, contact
2. **Úvodní hodina** – What to expect, disclaimers
3. **Agenda** – What we'll cover today
4. **Expectations** – What students should/shouldn't expect
5. **Core content** – Grouped by theme with fragments
6. **Praktická část** – Exercises, discussion prompts
7. **Shrnutí** – Key takeaways
8. **Do příště** – Homework, next steps
9. **Otázky?** – Q&A slide
10. **Kontakt** – Email, resources

## Key Patterns

### Course Introduction Slides

```html
<section>
  <h1>Co čekat v kurzu</h1>
  <ul>
    <li class="fragment"><strong>Design</strong> 🔥</li>
    <li class="fragment">Společnou práci a <strong>workshopy</strong></li>
    <li class="fragment">Týmový projekt</li>
    <li class="fragment">Vzájemné sdílení a reflexe procesu</li>
  </ul>
</section>

<section>
  <h1>Co od kurzu nečekat</h1>
  <ul>
    <li>Dominanci frontální výuky</li>
    <li><em>„A for effort"</em> hodnocení</li>
    <li>Babysitting – jste tu dobrovolně a dospělí</li>
  </ul>
</section>
```

### Concept Explanation with Fragments

Build up complex concepts step by step:

```html
<section>
  <h1 class="r-fit-text">Service design?🤔</h1>
  <div class="fragment custom blur">
    <img src="service-design.png" alt="" style="border-radius: .5rem; max-width: 800px;">
    <p style="font-size: 1.25rem;">Sarah Gibbons – <a href="..." target="_blank">Service Design 101</a></p>
  </div>
</section>
```

### Reference Section with Vertical Slides

Main concept horizontal, detailed examples vertical:

```html
<section>
  <section>
    <h2>Projekty</h2>
    <ul>
      <li>Budeme v 2. diamantu</li>
      <li>ideace, iterace, prototypy, testování</li>
    </ul>
  </section>
  <section>
    <h2>Projekt 1: Informovanost o službách</h2>
    <!-- Detailed project description -->
  </section>
  <section>
    <h2>Projekt 2: Inovace ve státní správě</h2>
    <!-- Detailed project description -->
  </section>
</section>
```

### Assignment Slide

```html
<section>
  <h1>Do příště</h1>
  <ul>
    <li>Pokuste si najít tým</li>
    <li>Zkuste si vybrat téma
      <ul>
        <li>Pokud se to podaří, zamyslete se nad tím kudy byste chtěli jít</li>
        <li>Příště bychom si nasdíleli pro vzájemnou inspiraci</li>
      </ul>
    </li>
  </ul>
</section>
```

## Speaker Notes for Teaching

Always add notes for:
- Timing estimates
- Examples to mention from your experience
- Questions students typically ask
- Transition prompts

```html
<section>
  <h1>Úvodní kolečko 👋</h1>
  <ul>
    <li>Populární technika!</li>
    <li>Vezměte si čas, není potřeba spěchat</li>
  </ul>
  
  <aside class="notes">
    - Allocate ~2 min per student
    - If >15 students, split into pairs first
    - Watch for students who seem reluctant
  </aside>
</section>
```

## Visual Elements

### Question/Transition Slides

Create breathing room between sections:

```html
<section>
  <h1 class="r-fit-text">Otázky?</h1>
</section>

<section>
  <h1 class="r-fit-text">Pauza?</h1>
</section>
```

### Closing with Background

```html
<section data-background="../img/random/light-glass.png" data-background-size="fit">
  <h2 class="r-fit-text text-shadow-black" style="color: white;">Dík!</h2>
  <br><br>
  <h3 class="r-fit-text text-shadow-black" style="color: white;">Otázky?</h3>
</section>
```

## Content Guidelines

- **Max 6 bullets** per slide
- **Use fragments** for concepts students need to process one at a time
- **Include page numbers** – students reference specific slides
- **Add speaker notes** – you'll thank yourself next semester
- **Pros/cons** always use two-column layout
- **End with homework** – clear next steps

## Emoji Usage

Sparingly. Good for:
- Emphasis on key points (🔥)
- Transitions/breaks (☕, 🌈)
- Humanizing moments (👋, ❤️)

Avoid: Decorating every slide or multiple emojis in one list.
