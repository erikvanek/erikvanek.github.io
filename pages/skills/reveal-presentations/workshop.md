# Workshop Facilitation Presentations

For co-design sessions, stakeholder workshops, and facilitated group activities.

## Typical Structure

1. **Title** – Workshop name, date, location
2. **Plán workshopu** – Timed agenda overview
3. **Představení** – Icebreaker/intro round
4. **Pravidla** – Ground rules for participation
5. **Úvodní informace** – Context setting
6. **Aktivita 1** – Instructions, then work time
7. **Sdílení 1** – Group share-out
8. **Pauza** – Clearly marked break
9. **Aktivita 2** – Instructions, then work time
10. **Sdílení 2** – Group share-out
11. **Další kroky** – What happens next
12. **Reflexe** – What are you taking away?
13. **Díky** – Closing with contact info

## Key Patterns

### Timed Agenda Slide

```html
<section>
  <h1>Plán workshopu:</h1>
  <ul>
    <li>Představení</li>
    <li>Úvodní informace</li>
    <li>Cílové skupiny</li>
    <li>Pauza ☕ (cca 11:00 – 11:20)</li>
    <li>Co řešíme za problém?</li>
    <li>Diskuze a další kroky</li>
  </ul>
</section>
```

### Ground Rules

```html
<section>
  <h1>Pravidla</h1>
  <ul>
    <li><strong>Vzájemný respekt</strong> během diskuze</li>
    <li>Jste tu dobrovolně a ze zájmu</li>
    <li>"Žádný nápad není špatný"
      <ul><li>Možná jen nepřišel ve správný moment</li></ul>
    </li>
    <li>Nebojte se kdykoli ptát při nejasnostech</li>
    <li>Pro hladší průběh diskuze použijte <strong>jmenovky</strong></li>
  </ul>
</section>
```

### Activity Instructions

Always include: what, how long, what output.

```html
<section>
  <h1>Skupinová aktivita I</h1>
  <ul>
    <li>Rozdělíme se do skupin</li>
    <li>V každé skupině jeden facilitátor</li>
    <li>Každá skupina si vybere jednu kategorii</li>
    <li>Společně vytvoříte osobnostní profil</li>
    <li>Na práci máte cca 40 minut</li>
    <li>Následně si výsledky nasdílíme</li>
  </ul>
</section>
```

### Tips Before Activity

```html
<section>
  <h1>Tipy a triky</h1>
  <ul>
    <li>Představte si profil jako lidský příběh, který lze odvyprávět</li>
    <li>Nejdřív vyplňujte poznámky nahrubo a pak do detailu</li>
    <li>Znátě někoho takového? Zkuste se co nejvíce vcítit</li>
    <li>Chybí vám něco? Nebojte se zeptat</li>
  </ul>
</section>
```

### Transition to Activity

```html
<section>
  <h1>Otázky než začneme?</h1>
</section>

<section>
  <h1>Skupinová práce</h1>
</section>
```

### Break Slide

```html
<section>
  <h1>Pauza</h1>
  <h3>11:00 – 11:20</h3>
</section>
```

### Share-out Prompts

```html
<section>
  <h1>Sdílení</h1>
  <ul>
    <li>Jak zní definice problému vaší skupiny?</li>
    <li>Na co jste se zaměřili?</li>
    <li>Co je podstata definovaného problému?</li>
    <li>Jak to šlo?</li>
    <li>Co na to ostatní?</li>
  </ul>
</section>
```

## Speaker Notes for Facilitation

Critical for workshops. Include:
- **Exact timing** for each section
- **Transition language** to use
- **Fallback questions** if discussion stalls
- **End time** for each activity

```html
<section>
  <h1>Průběh 2. části</h1>
  <ul>
    <li>Vyberte si téma</li>
    <li>Shrneme diskuze z 1. části</li>
    <li>Navážeme individuální prací</li>
  </ul>
  
  <aside class="notes">
    končit ideálně 12:35
    nejpozději 12:38
    
    - If groups uneven, ask 1-2 people to switch
    - Timer on projector: 18 minutes per round
  </aside>
</section>
```

## Interactive Elements

### Live Timer Display

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
    const hours = now.getHours();
    const minutes = now.getMinutes();
    document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
  }
  updateClock();
  setInterval(updateClock, 1000);
})();
</script>
```

### External Timer Link

```html
<section>
  <h1>Časovač</h1>
  <a href="https://www.bigtimer.net/?minutes=18&repeat=false" target="_blank">časovač</a>
</section>
```

### Menti/Polling QR

```html
<section>
  <div class="equal-columns">
    <div>
      <h1>Očekávání od workshopu</h1>
      <ul>
        <li>Jaká máte očekávání?</li>
        <li>Co si chcete odnést?</li>
      </ul>
    </div>
    <img src="menti.png" style="max-width: 400px;">
  </div>
</section>
```

## Content Guidelines

- **Show agenda early** – participants need to know what's coming
- **Time everything** – put times in speaker notes
- **Question slides before activities** – "Otázky než začneme?"
- **Separate instruction from work** – instruction slide, then blank "Skupinová práce" slide
- **Mark breaks clearly** – include specific times
- **End with reflection** – "Co si odnášíte?"

## Logistics Slides

Always include:
- Refreshment location
- Toilets
- WiFi (if needed)
- Emergency contact

```html
<section>
  <h1>Logistika</h1>
  <ul>
    <li>Nebojte se v průběhu libovolně občerstvit ☕</li>
    <li>Možnosti jsou:
      <ul>
        <li>Vodu máte na stolech</li>
        <li>Kávu si lze požádat na baru</li>
        <li>Občerstvení ve vstupní hale</li>
      </ul>
    </li>
    <li>Toalety jsou v patře pod námi</li>
  </ul>
</section>
```
