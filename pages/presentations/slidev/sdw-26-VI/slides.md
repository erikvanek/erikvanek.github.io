---
theme: ../themes/muni-arts
title: SDW-26 VI - Design critique a business case
publicPath: /sdw-26/VI/
info: |
  Service design workshop, podzim 2026, setkání 6 (26. 11.).
  Podklady, časový rozpočet a pořadí škrtů: SDW-26, artifacts/IO/06 Setkání 6 - Design critique + business case/deck-06.md
  Running order, rozhodnutí a otevřené body: SDW-26, backlog/030-build-session-6-deck.md
layout: cover
session: 6
sessionTitle: Design critique a business case
date: 26. 11. 2026
transition: slide-left
mdc: true
shader: false
hideInToc: true
---

<!--
<br/>

**Úvod <span style="white-space:nowrap">18:00–18:05 (1/2)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Dnes nás čeká

- **Testování** – jak dopadlo
- **Design critique** – proč, jak a kdo jak na to
- **Workshop** – příprava v týmech a crit ve trojicích
- **Business case a vyprávění** pro závěrečnou prezentaci
- **Závěrečná prezentace** – co od vás chci
- **Otázky**

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
h1 { margin-bottom: 0.45em !important; }
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>

<!--
<br/>

**Úvod <span style="white-space:nowrap">18:00–18:05 (2/2)</span>**

<br/>

🛑 **Nejpozději 18:05 končí úvod.**
-->

---
layout: section-break
---

# Testování

<!--
<br/>

**Debrief testování <span style="white-space:nowrap">18:05–18:15 (1/2)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Testování

<div class="qs">
  <div class="q" :class="{ past: $clicks >= 1 }"><span class="n">1</span>Jaké to pro vás bylo?</div>
  <div class="q" v-click="1" :class="{ past: $clicks >= 2 }"><span class="n">2</span>Co vás nejvíc překvapilo?</div>
  <div class="q" v-click="2"><span class="n">3</span>Co s tím budete dělat dál?</div>
</div>

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
.qs { margin-top: 0.6em; }
.q {
  font-size: 1.6em;
  font-weight: 700;
  margin: 0.55em 0;
  transition: opacity 600ms ease, transform 600ms ease;
}
.q.past { opacity: 0.28; transform: scale(0.94); transform-origin: left center; }
.q .n {
  display: inline-block;
  width: 1.4em;
  color: var(--muni-blue, #0000dc);
}
</style>

<!--
<br/>

**Debrief testování <span style="white-space:nowrap">18:05–18:15 (2/2)</span>**

<br/>

🛑 **Nejpozději 18:15 končí debrief testování.**
-->

---
layout: section-break
---

# Design critique

<!--
<br/>

**Úvod do critu <span style="white-space:nowrap">18:15–18:30 (1/12)</span>**
-->

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Proč design critique

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Cílem je **dobrá zpětná vazba**: nové myšlenky, inspirace, věci k promyšlení
- Uvnitř týmu i s uživateli, obojí má své pro a proti
- Posiluje spolupráci napříč obory a týmy
- Další způsob, jak **sdílet práci** s ostatními
- Řešení se nehledá na místě, rozhodujete až potom vy

::right::

<img :src="asset + 'gds-crit.jpg'" alt="Tři lidé u stolu se skloní nad notebookem, jeden ukazuje propiskou na obrazovku" class="fit-img" />
<div class="credit">Crit v GDS: kolegové nad rozpracovaným návrhem. <a href="https://designnotes.blog.gov.uk/2017/11/27/using-design-crits-to-improve-collaboration/">Design in government</a>, <a href="https://designnotes.blog.gov.uk/">GOV.UK blog</a></div>

<style>
.col-left li { margin-top: 0.45em; margin-bottom: 0.45em; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
</style>

<!--
<br/>

**Úvod do critu <span style="white-space:nowrap">18:15–18:30 (2/12)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Mindset

- Usability testování je **evaluativní**, design critique je **generativní**
- Teď divergujeme a hledáme nové perspektivy
- Otevřené, ale **strukturované** – žádné YOLO
- Stejně jako u testování rozhoduje příprava: **řekněte předem, jakou zpětnou vazbu chcete** a co je pro vás teď zajímavé otvírat
- Ptejte se o radu: „Co byste nám poradili k…?“
- Komentář s **„protože“** se do návrhu opravdu dostane

<style>
li { margin-top: 0.45em; margin-bottom: 0.45em; }
</style>

<!--
<br/>

**Úvod do critu <span style="white-space:nowrap">18:15–18:30 (3/12)</span>**
-->

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Tři druhy zpětné vazby

::left::

- **Reakce** – první dojem, pocit z břicha
- **Pokyn** – navržená změna bez vysvětlení
- **Kritika** – posouzení návrhu vůči cíli, s „protože“

::right::

<div class="steps">
  <div class="step s1">„Je to zmatené.“</div>
  <div class="step s2">„Přidejte tam potvrzení.“</div>
  <div class="step s3">„Jestli je cílem, aby člověk věděl, že má jízdenku, tak na kroku 3 chybí potvrzení, protože…“</div>
</div>

<style>
.col-left li { margin: 0.5em 0; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
.steps { display: flex; flex-direction: column; gap: 0.6em; }
.step {
  padding: 0.5em 0.9em;
  border-left: 4px solid var(--muni-arts-blue, #4bc8ff);
  background: #eef4fb;
  line-height: 1.35;
}
.s1 { margin-right: 30%; opacity: 0.6; }
.s2 { margin-right: 15%; opacity: 0.8; }
.s3 { font-weight: 700; }
</style>

<!--
<br/>

**Úvod do critu <span style="white-space:nowrap">18:15–18:30 (4/12)</span>**
-->

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Figma: menu formátů

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Šest formátů: standardní, jam, párový design, tichý, výtisky na zdi, FYI
- Prezentující si připraví slide **„jakou zpětnou vazbu hledám a jakou ne“**
- Kolem stolu jeden po druhém, protože popcorn odměňuje nejhlasitější

::right::

<img :src="asset + 'figma-crit.jpg'" alt="Lidé sedí v kruhu na critu, jeden zvedá ruku a mluví" class="fit-img" />
<div class="credit">Crit ve Figmě. <a href="https://www.figma.com/blog/design-critiques-at-figma/">Noah Levin</a>, <a href="https://www.figma.com/blog/">Figma</a></div>

<!--
<br/>

**Úvod do critu: příklady <span style="white-space:nowrap">18:15–18:30 (5/12)</span>**
-->

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Intercom: problém v jednom odstavci

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Problém dostane jméno a jeden odstavec srozumitelné češtiny
- Ideálně několik **radikálně odlišných variant**, každá pojmenovaná zvlášť
- Prezentující řekne, kterou favorizuje a proč

::right::

<img :src="asset + 'intercom-sablona-critu.jpg'" alt="Dvě stránky šablony: vlevo Problem title s odstavcem o problému a tabulkou jobs, vpravo Concept A s návrhem, dopady, obrazovkou, pro a proti a otevřenými otázkami" class="fit-img" />
<div class="credit">Šablona na crit: vlevo problém, vpravo jedna varianta. <a href="https://www.intercom.com/blog/running-productive-design-critiques/">Gustavs Cirulis</a>, <a href="https://www.intercom.com/blog/">Intercom</a></div>

<!--
<br/>

**Úvod do critu: příklady <span style="white-space:nowrap">18:15–18:30 (6/12)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# GitLab: kodex nahlas

- Facilitátor přečte pravidla nahlas: „Focus on the design work, not the designer“
- Kontext 5 min, ukázka 10 min, většina času na otázky a kritiku
- Zpětná vazba se zapíše k práci a **v další iteraci se ukáže, co změnila**

<!--
<br/>

**Úvod do critu: příklady <span style="white-space:nowrap">18:15–18:30 (7/12)</span>**
-->

---
layout: two-column
ratio: "45-55"
hideInToc: true
---

# Atlassian: Sparring

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- 2–5 lidí, 15 minut příprava, 30 minut crit
- **Tichá písemná fáze** na časovač dá prostor i tišším
- Varianta „Leave the room“: prezentující odejde, kritici píšou otevřeněji
- Na konci: co udělám dál a kdy se ozvu s další iterací

::right::

<img :src="asset + 'atlassian-sparring-sablona.jpg'" alt="Stránka v Confluence s přehledem sparringu a tabulkou se sloupci What looks good, What could be improved a Questions, vedle videohovor se čtyřmi lidmi" class="fit-img" />
<div class="credit">Písemná fáze: co funguje, co zlepšit, otázky. <a href="https://www.atlassian.com/team-playbook/plays/sparring">Sparring</a>, <a href="https://www.atlassian.com/team-playbook">Atlassian Team Playbook</a></div>

<!--
<br/>

**Úvod do critu: příklady <span style="white-space:nowrap">18:15–18:30 (8/12)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# GOV.UK: service assessment

- Opak critu: panel specialistů hodnotí službu podle standardu
- Asi čtyři hodiny, výsledek zelená, oranžová, nebo červená
- „Do not just focus on the happy path“
- V critu rozhoduje prezentující, v assessmentu panel

<!--
<br/>

**Úvod do critu: příklady <span style="white-space:nowrap">18:15–18:30 (9/12)</span>**
-->

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Six thinking hats

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Celá skupina nosí v jednu chvíli **stejný klobouk**
- Červený: první dojem, oddělí reakci od kritiky
- Černý a žlutý: rizika a přínosy vůči cíli
- Zelený: z kritiky udělá návrh
- Modrý: hlídá proces

::right::

<img :src="asset + 'six-thinking-hats-nng.jpg'" alt="Tabulka šesti barevných klobouků s popisem: bílý fakta, žlutý přínosy, černý rizika, červený pocity, zelený nápady, modrý řízení procesu" class="fit-img hats-img" />
<div class="credit">Šest klobouků a k čemu je který. <a href="https://www.debonogroup.com/services/core-programs/six-thinking-hats/">Edward de Bono</a>, <a href="https://www.nngroup.com/articles/facilitating-design-studio-workshop/">Nielsen Norman Group</a></div>

<style>
.col-left li { margin: 0.4em 0; }
.col-right { display: flex; flex-direction: column; justify-content: center; align-items: center; }
.hats-img { max-height: 400px; width: auto; }
</style>

<!--
<br/>

**Úvod do critu: příklady <span style="white-space:nowrap">18:15–18:30 (10/12)</span>**
-->

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Design Studio

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Kola: **skica, prezentace, kritika, iterace**, každé jen pár minut
- Kritizovaná skica se hned předělá, takže kritik vidí dopad své poznámky
- Šestiminutovou skicu nikdo neobhajuje
- Jde zkombinovat s critem: tým přinese otázku, trojice ji skicuje

::right::

<img :src="asset + 'design-studio-tri-kola-nng.jpg'" alt="Tři skici téže obrazovky v kolech 1, 2 a 3, každá propracovanější než předchozí" class="fit-img" />
<div class="credit">Tři kola skicování, každé po kritice toho předchozího. <a href="https://www.nngroup.com/articles/facilitating-design-studio-workshop/">Kate Kaplan</a>, <a href="https://www.nngroup.com/">Nielsen Norman Group</a></div>

<!--
<br/>

**Úvod do critu: příklady <span style="white-space:nowrap">18:15–18:30 (11/12)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# V čem se liší

| | Kdo rozhoduje | Jak | Co se nese předem |
|---|---|---|---|
| Figma, GitLab, Intercom | prezentující | naživo, v týmu | cíl a otázky |
| Atlassian | prezentující | potichu a písemně | stránka s kontextem |
| GOV.UK | panel | podle standardu | celá služba |
| Design Studio | skupina | tvorbou v kolech | jen zadání |

<style>
table { font-size: 0.8em; }
</style>

<!--
<br/>

**Úvod do critu: souhrn <span style="white-space:nowrap">18:15–18:30 (12/12)</span>**

<br/>

🛑 **Nejpozději 18:30 končí úvod do critu.**
-->

---
layout: section-break
---

# Workshop

<!--
<br/>

**Workshop: zadání <span style="white-space:nowrap">18:30–18:31 (1/1)</span>**
-->

---
layout: groupwork
hideInToc: true
timer: 10
---

# Příprava v týmech

- Vyplňte přípravný list (najdete ho v Teams)
- Cíl critu, rozsah a otázky, na které chcete odpověď
- Každý z vás pak bude projekt prezentovat sám v jiné skupině
- Mezitím vás rozdělím do trojic

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
</style>

<!--
<br/>

**Workshop: příprava <span style="white-space:nowrap">18:31–18:41 (1/2)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Přesun do trojic

<!--
<br/>

**Workshop: přesun <span style="white-space:nowrap">18:41–18:44 (2/2)</span>**
-->

---
layout: groupwork
hideInToc: true
timer: [12, 12, 12]
---

# Design critique

- Trojice, každý prezentuje 12 minut
- Prezentující: nahrajte si to, nebo si pište poznámky
- Kritici: pište si do handoutu, půlku pak předejte prezentujícímu

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
</style>

<!--
<br/>

**Workshop: crit <span style="white-space:nowrap">18:44–19:20 (1/1)</span>**

<br/>

🛑 **V 19:20 končí crit.**
-->

---
layout: heading-body
hideInToc: true
---

# Co si odnášíte zpátky do týmu?

<!--
<br/>

**Workshop: debrief critu <span style="white-space:nowrap">19:20–19:25 (1/1)</span>**

<br/>

🛑 **Nejpozději 19:25 končí workshop.**
-->

---
layout: section-break
---

# Závěrečná prezentace

<!--
<br/>

**Závěr <span style="white-space:nowrap">19:25–19:40 (1/5)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Business case

<!--
<br/>

**Závěr: business case <span style="white-space:nowrap">19:25–19:30 (2/5)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Vyprávění

<!--
<br/>

**Závěr: vyprávění <span style="white-space:nowrap">19:25–19:30 (3/5)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Co od vás chci na závěrečné prezentaci

<!--
<br/>

**Závěr: zadání prezentace <span style="white-space:nowrap">19:30–19:35 (4/5)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Otázky

<!--
<br/>

**Závěr: otázky <span style="white-space:nowrap">19:35–19:40 (5/5)</span>**

<br/>

🛑 **V 19:40 konec.**
-->
