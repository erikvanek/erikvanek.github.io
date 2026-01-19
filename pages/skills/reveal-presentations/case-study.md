# Case Study Presentations

For presenting project work, design research outcomes, and methodological examples.

## Typical Structure

1. **Title** – Project name, subtitle describing approach
2. **Problém** – The challenge/opportunity being addressed
3. **Projekty** – Overview of project phases/scope
4. **HCD metody** – Methods used (for design audiences)
5. **Key Findings** – What we learned (3-5 insights)
6. **Syntéza** – Artifacts produced (personas, journeys, etc.)
7. **Prototypy** – What we built/tested
8. **Pivot/Iterations** – What changed and why
9. **Co si odnést** – Key takeaways for audience
10. **Více informací** – Resources, contact

## Key Patterns

### Problem Statement

Lead with the problem, make it concrete with numbers.

```html
<section>
  <h1>Problém</h1>
  <ul>
    <li>Ročně nastupuje cca 9 500 osob výkon trestu odnětí svobody
      <ul><li><strong>2 794 nenastoupí včas</strong></li></ul>
    </li>
    <li><strong>Prepenitenciární péče a podpora v ČR neexistuje</strong></li>
    <li>Odsouzení v psychické krizi, bez informací a podpory</li>
    <li><strong>Důsledky:</strong> horší adaptace, prohlubování krize, vyšší náklady</li>
  </ul>
  <br>
  <p><em>"Jak navrhnout systém podpory pro těžko dosažitelnou skupinu v krizi?"</em></p>
</section>
```

### Project Phases Overview

```html
<section>
  <h1>Dva projekty</h1>
  <ul>
    <li><strong>Inkubace (2023-2024):</strong> Výzkum, návrh, prototypy ✅</li>
    <li><strong>Realizace (2025-2028):</strong> Implementace ve 3 krajích
      <ul><li>právě běží 👉 <a href="..." target="_blank">podrobnosti k projektu</a></li></ul>
    </li>
  </ul>
  <p><br><em>Dnes: Case study z inkubační fáze</em></p>
</section>
```

### Methods List

```html
<section>
  <h1>HCD metody v projektu</h1>
  <ol>
    <li><strong>Rešerše</strong> (akademie, zahraničí)</li>
    <li><strong>Hloubkové rozhovory</strong> (15 osob)</li>
    <li><strong>Workshopy ve věznici</strong> (3 setkání)</li>
    <li><strong>Pozorování u soudu</strong> (6x)</li>
    <li><strong>Focus groups s odborníky</strong> (8x)</li>
    <li><strong>Prototypování a testování</strong></li>
  </ol>
</section>
```

### Challenge/Solution Pattern

Describe a specific challenge and how you addressed it.

```html
<section>
  <h1>Výzva: Jak oslovit lidi v krizi?</h1>
  <ul>
    <li>Neexistuje "místo" v systému, kterým projdou všichni
      <ul><li>Dobrá ilustrace "díry v systému"</li></ul>
    </li>
    <li>Ne všichni mají advokáta</li>
    <li><strong>Mitigace:</strong> Kombinace kanálů + 1000 Kč odměna
      <ul><li>Pomohly NNO, adiktologické služby, ubytovny</li></ul>
    </li>
    <li><strong>Poučení:</strong> nábor participantů může být časově náročný</li>
  </ul>
</section>
```

### Synthesis Artifacts

Show personas, journeys, or other outputs with full-bleed backgrounds.

```html
<section data-background="persona.png" data-background-size="contain">
</section>

<section data-background="journey.png" data-background-size="contain">
</section>
```

### Pivot Story

Show iteration and learning from failure.

```html
<section>
  <h1>Pivot: Kufřík → Dotazník</h1>
  <ul>
    <li><strong>V1:</strong> "Kufřík pomoci" - kartičky pro odsouzené</li>
    <li>Test: Příliš složité pro lidi v krizi ❌</li>
    <li><strong>Pivot</strong> → Změna cílové skupiny + formátu + zjednodušení</li>
    <li><strong>V2:</strong> Diagnostický dotazník pro odborníky</li>
    <li><strong>V2: ověřováno pomocí uživatelského testování</strong></li>
  </ul>
  <p><br><em>→ Odvaha opustit nefunkční nápad</em></p>
</section>
```

### Prototype Evolution

Show versions side by side or sequentially.

```html
<section>
  <h1>Prototypování - příklad</h1>
  <p><strong>Leták:</strong></p>
  <ul>
    <li>V1: Návrh první podoby na workshopu s odborníky</li>
    <li>V2: Testování ve věznici a doplnění údajů</li>
    <li>V3: Zapracování změn z testování</li>
    <li>V4: Finální grafická podoba (aktuálně v procesu)</li>
  </ul>
</section>

<section data-background="letak-I.png" data-background-size="contain">
</section>

<section data-background="letak-II.png" data-background-size="contain">
</section>
```

### Key Takeaways

Use checkmarks for things that worked, warnings for caveats.

```html
<section>
  <h1>Co si odnést?</h1>
  <ul>
    <li>✅ <strong>Kombinujte metody</strong> - triangulace dat</li>
    <li>✅ <strong>Testovat co nejdříve</strong></li>
    <li>✅ <strong>Co-creation přinese víc než konzultace</strong></li>
    <li>✅ <strong>Buďte připravení pivotovat</strong> - data jsou víc než ego</li>
    <li>⚠️ <strong>HCD není řešení všeho</strong> - change management, evangelizace...</li>
  </ul>
</section>
```

### Resources/Contact Slide

```html
<section>
  <h1>Více informací</h1>
  <ul>
    <li><strong>Web:</strong> <a href="..." target="_blank">sovia.cz/projekt</a></li>
    <li><strong>Dokumenty:</strong> Mapa aktérů, Zpráva z empatické fáze</li>
    <li><strong>Kontakt:</strong>
      <ul>
        <li>Lenka Kuti - lenka@sovia.cz</li>
        <li>Erik Vaněk - design@sovia.cz</li>
      </ul>
    </li>
  </ul>
</section>
```

## Content Guidelines

- **Lead with the problem** – make audience care before showing solution
- **Be specific with numbers** – "15 rozhovorů" not "many interviews"
- **Show the mess** – pivots and failures make the story credible
- **Full-bleed artifacts** – let personas, journeys, blueprints speak for themselves
- **End with actionable takeaways** – what can audience apply in their work?

## Visual Approach

- Use `data-background-size="contain"` for artifacts to show full context
- Minimal text on artifact slides – let image speak
- Consistent image styling (rounded corners, shadows if your CSS supports it)
- Link to detailed resources rather than cramming everything in

## For Different Audiences

### Design/Research Audience
- Emphasize methods and rationale
- Show research artifacts
- Discuss analytical process

### Stakeholder/Client Audience
- Lead with impact and outcomes
- Minimize methodological detail
- Emphasize business case

### General/Conference Audience
- Balance story and method
- Make problem relatable
- Focus on transferable lessons
