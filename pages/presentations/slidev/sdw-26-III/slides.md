---
theme: ../themes/muni-arts
title: SDW-26 III - Ideační techniky a prioritizace
publicPath: /sdw-26/III/
info: |
  Service design workshop, podzim 2026, setkání 3 (15. 10.).
  Podklady, časový rozpočet, poznámky ke slidům a pořadí škrtů: SDW-26, artifacts/IO/03 Setkání 3 - Ideační techniky/deck-03.md
  Running order, rozhodnutí a otevřené body: SDW-26, backlog/027-build-session-3-deck.md
layout: cover
session: 3
sessionTitle: Ideační techniky a prioritizace
date: 15. 10. 2026
transition: slide-left
mdc: true
shader: false
shaderMotion: always
shaderFadeIn: 60
shaderRustDelay: 20
shaderRustDuration: 180
hideInToc: true
---


<!--
<br/>

**Úvod <span style="white-space:nowrap">18:00–18:10 (1/3)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Dnes nás čeká

- **Ideace** – mindset a dvě techniky, brainwriting a SCAMPER
- **Pauza** – doufám!
- **Prioritizace** – jak ze spousty nápadů vybrat ty, které stojí za prototyp
- **Co nám má prototyp přinést?**
- **Úkol** – první prototyp k testování

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
h1 { margin-bottom: 0.45em !important; }
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>

<!--
<br/>

**Úvod <span style="white-space:nowrap">18:00–18:10 (2/3)</span>**
-->

---
layout: section-break
hideInToc: true
hideProgress: true
---

# Jak šly první úkoly?

<!--
<br/>

**Úvod <span style="white-space:nowrap">18:00–18:10 (3/3)</span>**

<br/>

🛑 **Nejpozději 18:10 končí úvod a zpětná vazba k úkolům.**
-->

---
layout: section-break
---

# Ideační techniky

Nápady jsou levné

<!--
<br/>

**Ideační mindset a techniky <span style="white-space:nowrap">18:10–18:23 (1/7)</span>**
-->

---
layout: heading-body
hideInToc: true
clicks: 4
---

<div class="stage">

<Transition name="swap" mode="out-in">
<h1 v-if="$clicks === 0" key="0">Jak nakreslit slona za 10 sekund?</h1>
<h1 v-else-if="$clicks === 1" key="1">A za dvě minuty?</h1>
<h1 v-else-if="$clicks === 2" key="2">A za jednu minutu?</h1>
<h1 v-else-if="$clicks === 3" key="3">A za třicet sekund?</h1>
<h1 v-else key="4">A za deset sekund?</h1>
</Transition>

<Transition name="late">
<div v-if="$clicks >= 4" class="elephant">
  <svg viewBox="0 100 930 700" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rychle načmáraný slon z boku s kudrnatým chobotem">
    <g fill="none" stroke="#0000dc" stroke-width="13" stroke-linecap="round" stroke-linejoin="round">
      <path d="M205 470 C198 390 200 300 235 235 C275 175 340 158 420 158" />
      <path d="M660 322 C760 322 830 360 852 428 C866 520 860 640 840 710 C825 760 780 775 730 765 C695 758 688 735 688 705 C650 698 560 698 500 706 C482 735 462 760 415 765 C370 765 342 735 340 690 C338 640 342 590 346 555" />
      <path d="M385 225 C400 170 440 120 500 118 C600 118 660 220 655 330 C650 440 620 560 530 562 C470 562 430 500 428 395" />
      <path d="M205 470 L200 510 C196 535 150 548 108 535 C84 524 82 496 100 484 C112 476 104 458 80 456 C46 458 26 495 28 535 C32 590 72 628 128 638 C206 650 292 600 346 556 L392 540" />
      <path d="M850 425 C868 435 886 428 898 410" />
    </g>
    <ellipse cx="300" cy="347" rx="10" ry="23" transform="rotate(-2 300 347)" fill="#0000dc" />
  </svg>
  <p class="note">Omezení pomáhá začít. Důležité je začít a dokonalost hledat až později.</p>
  <div class="credit">Impose constraints, <a href="https://hci.stanford.edu/courses/cs147/2021/wi/readings/bootcamp_bootleg.pdf">d.school</a></div>
</div>
</Transition>

</div>

<style>
.swap-enter-active, .swap-leave-active { transition: opacity 0.15s ease; }
.swap-enter-from, .swap-leave-to { opacity: 0; }
.late-enter-active { transition: opacity 0.15s ease 0.15s; }
.late-enter-from { opacity: 0; }
.heading-body { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
.stage { position: relative; flex: 1; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; }
.stage h1 { font-size: 3.2rem !important; margin: 0 !important; margin-left: 0 !important; }
.elephant { position: absolute; top: calc(50% + 2.6rem); left: 50%; transform: translateX(-50%); width: 40rem; }
.elephant svg { width: 11rem; height: auto; display: block; margin: 0 auto; }
.elephant .note { margin: 0.6em 0 0; font-size: 0.85em; line-height: 1.4; }
.elephant .credit { font-size: 0.68em; opacity: 0.62; margin-top: 0.3rem; line-height: 1.35; }
</style>

<!--
<br/>

**Ideační mindset a techniky <span style="white-space:nowrap">18:10–18:23 (2/7)</span>**
-->

---
layout: two-column
ratio: "60-40"
hideInToc: true
---

# Kreativní je každý

::left::

- Víc než talent rozhoduje tvorba **prostředí stimulující kreativitu**
- Kreativní sebedůvěra je *přesvědčení* spíš než něco co "máte nebo nemáte"
  - V knížce se tomu taky říká *karaoke confidence*
- Kreativita není jen o tom umět precizně kreslit nebo skládat hudbu

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="cover">
  <img :src="asset + 'creative-confidence-cover.jpg'" alt="Obálka knihy Creative Confidence od Toma Kelleyho a Davida Kelleyho" />
  <div class="credit">Creative Confidence. <a href="https://www.designkit.org/mindsets/3.html">Tom Kelley a David Kelley</a>, <a href="https://images.penguinrandomhouse.com/cover/9780385349369">Penguin Random House</a></div>
</div>

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
.cover { text-align: center; }
.cover img { height: 21rem; width: auto; display: inline-block; box-shadow: 0 0.3rem 0.8rem rgb(0 0 0 / 0.18); }
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 0.8rem; line-height: 1.35; }
</style>

<!--
<br/>

**Ideační mindset a techniky <span style="white-space:nowrap">18:10–18:23 (3/7)</span>**
-->

---
layout: quote
author: Julian Shapiro, The Creativity Faucet (22. 1. 2021)
link: https://www.julian.com/blog/creativity-faucet
hideInToc: true
---

Jakmile se špatné nápady vypustí ven, stane se něco překvapivého – začnou přicházet lepší.

<div class="original">Once bad ideas are emptied, a surprising thing happens: better ideas begin to arrive.</div>
<div class="source">Proto dnes budeme hledat spoustu možných řešení a hodnotit je budeme až je budeme mít.</div>

<style>
.original {
  margin-top: 1.4rem;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1.3rem;
  line-height: 1.4;
  font-style: italic;
  opacity: 0.6;
  max-width: 40rem;
}
.source {
  margin-top: 1rem;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1.4rem;
  line-height: 1.4;
  opacity: 0.8;
  max-width: 40rem;
}
</style>

<!--
<br/>

**Ideační mindset a techniky <span style="white-space:nowrap">18:10–18:23 (4/7)</span>**
-->

---
layout: heading-body
hideInToc: true
disabled: true
---

# Máte někdo nějaký trik?
prostředí, nástroj, proces, občerstvení, ...


---
layout: two-column
ratio: "60-40"
hideInToc: true
---

# Skupina vymyslí víc než jednotlivec

::left::

- Ideace z týmu pomáhá maximálně vytěžit tzv. kolektivní inteligenci.
-  Ve skupině je ale riziko "group-thinku"
  - Proto začínáte **každý sám**, nápady potom složíte
- Zajímavé nápady mohou vzniknout remixem či rekombinací jiných

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="cover">
  <img :src="asset + 'big-mind-cover.jpg'" alt="Obálka knihy Big Mind od Geoffa Mulgana" />
  <div class="credit">Big Mind. <a href="https://press.princeton.edu/books/hardcover/9780691170794/big-mind">Geoff Mulgan</a></div>
</div>

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
.cover { text-align: center; }
.cover img { height: 21rem; width: auto; display: inline-block; box-shadow: 0 0.3rem 0.8rem rgb(0 0 0 / 0.18); }
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 0.8rem; line-height: 1.35; }
</style>

<!--
<br/>

**Ideační mindset a techniky <span style="white-space:nowrap">18:10–18:23 (5/7)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Co se dá prototypovat

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="proto-grid">
  <figure>
    <img :src="asset + 'palmpilot-wooden-model.jpg'" alt="Dřevěný model PalmPilotu s papírovou obrazovkou a dřevěným perem, které Jeff Hawkins používal místo stylusu" style="object-fit: contain; background: #fff" />
    <figcaption>Fyzický předmět</figcaption>
  </figure>
  <figure>
    <img :src="asset + 'paper-prototype-screen.jpg'" alt="Papírový prototyp aplikace: vystřižený telefon s posuvnými ručně kreslenými obrazovkami Log in, Create account a feed" style="object-position: 50% 45%" />
    <figcaption>Obrazovka</figcaption>
  </figure>
  <figure>
    <img :src="asset + 'journey-map-banka.jpg'" alt="Ukázková mapa zákaznické cesty banky" />
    <figcaption>Zákaznická cesta</figcaption>
  </figure>
  <figure>
    <img :src="asset + 'citelna-praha-palmovka.jpg'" alt="Testovací cedule Čitelné Prahy pod stropem stanice metra Palmovka" />
    <figcaption>Prostor</figcaption>
  </figure>
</div>

<style>
h1 { margin-bottom: 0.4em !important; }
.proto-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; max-width: 49rem; margin: 0 auto; }
.proto-grid figure { margin: 0; position: relative; }
.proto-grid img { width: 100%; aspect-ratio: 2 / 1; object-fit: cover; display: block; border: 1px solid #d3dce7; }
.proto-grid figcaption { position: absolute; left: 0; bottom: 0; background: var(--muni-blue, #0000dc); color: #fff; font-size: 0.85em; font-weight: 700; padding: 0.2em 0.6em; }
</style>

<!--
<br/>

**Ideační mindset a techniky <span style="white-space:nowrap">18:10–18:23 (6/7)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Ideačních technik je spousta

- Brainstorming – skupinové "střílení" nápadů
- **Brainwriting** – nápady píšete každý sám a pak je skládáte dohromady
- Myšlenkové mapy – nápady jako větve rozvíjející téma
- Crazy 8s – osm náčrtů za osm minut
- **SCAMPER** – sedm otázek, které nápad přetvářejí
- Thinking hats – každý ve skupině přichází s jiným mindsetem
  - variaci si vyzkoušíme v šestém setkání při design crit

Dnes si vyzkoušíte ty vytučněné. Detailnější popis všech technik najdete v osnově.

<style>
li { margin-top: 0.4em; margin-bottom: 0.4em; }
p { margin-top: 1.2em; opacity: 0.75; }
</style>

<!--
<br/>

**Ideační mindset a techniky <span style="white-space:nowrap">18:10–18:23 (7/7)</span>**

<br/>

🛑 **Nejpozději 18:23 končí ideační mindset a techniky.**
-->

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Brainwriting

::left::

- Každý píše nápady **sám a potichu**
- Jeden nápad na jeden post-it, stačí pár slov či jednoduchá kresba
- Čím víc nápadů, tím líp. Teď záleží na množství.
- Hlasitější lidé nikoho nepřehluší, každý přispěje stejným dílem

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="pic">
  <img :src="asset + 'brainwriting-post-its.jpg'" alt="Růžové, žluté a modré post-ity s ručně psanými nápady rozházené na papíru na stole" />
</div>

<style>
.col-left li { margin-top: 0.5em; margin-bottom: 0.5em; }
.pic img { width: 100%; height: auto; display: block; }
</style>

<!--
<br/>

**Brainwriting <span style="white-space:nowrap">18:23–18:30 (1/3)</span>**
-->

---
layout: groupwork
hideInToc: true
progressSection: true
# timer: 5   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# Jak bychom mohli…?

- Přeformulujte zarámovaný problém z canvasu jako **„Jak bychom mohli…?“**
  - Řešení nechte stranou, otázka popisuje jen to, čeho chcete dosáhnout
  - Už ji máte v canvasu? Vezměte ji, nebo ji upravte.
- Napište ji na papír před sebe

<div class="tpl">Šablona: <strong>Jak bychom mohli</strong> <span>pomoci komu</span> <span>udělat co</span>, <strong>aby</strong> <span>očekávaný dopad</span>?</div>

<style>
h1 { font-size: 1.9rem !important; margin-bottom: 0.5em !important; }
li { margin-top: 0.4em; margin-bottom: 0.4em; }
ul ul { font-size: 0.9em; }
.tpl { margin: 1.4em 0 0; padding: 0.7em 1em; background: #eef4fb; border-left: 4px solid var(--muni-arts-blue, #4bc8ff); line-height: 1.8; }
.tpl { white-space: nowrap; }
.tpl span { padding: 0.05em 0.3em; background: rgba(255, 226, 0, 0.5); border-radius: 0.3em 0.7em 0.4em 0.6em / 0.6em 0.3em 0.7em 0.4em; }
</style>

<!--
<br/>

**Brainwriting <span style="white-space:nowrap">18:23–18:30 (2/3)</span>**

<br/>

- ⏱️ 5 minut
-->

---
layout: groupwork
hideInToc: true
# timer: 5   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# Každý sám

- Na post-ity pište nápady, **jeden nápad na lístek**
- Nijak se necenzurujte
- Kdyby došly nápady – zkuste něco "ukrást" či remixovat
  - např. "Tinder pro spolubydlení" nebo "Uber pro dojíždění do firem" (už existuje)
- Pište čitelně a srozumitelně
- **Kreslení je myšlení**

<style>
h1 { font-size: 1.9rem !important; margin-bottom: 0.5em !important; }
li { margin-top: 0.4em; margin-bottom: 0.4em; }
ul ul { font-size: 0.9em; }
</style>

<!--
<br/>

**Brainwriting <span style="white-space:nowrap">18:23–18:30 (3/3)</span>**

<br/>

- ⏱️ 5 minut

<br/>

🛑 **Nejpozději 18:30 končí brainwriting.**
-->

---
layout: groupwork
hideInToc: true
# timer: 4   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# Sdílení v týmu

- Postupně každý čtěte své nápady kolegům a lepte je viditelně na stůl
- Vyřaďte očividné duplicity
- (pokud máte čas) Seskupte nápady do tématických oblastí

<style>
h1 { font-size: 1.9rem !important; margin-bottom: 0.5em !important; }
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>

<!--
<br/>

**Sdílení v týmu <span style="white-space:nowrap">18:30–18:35 (1/1)</span>**

<br/>

- ⏱️ 4 minuty

<br/>

🛑 **Nejpozději 18:35 končí sdílení v týmu.**
-->

---
layout: two-column
ratio: "50-50"
hideInToc: true
progressSection: true
---

# SCAMPER

::left::

- Sedm otázek, kterými jde přetvořit libovolný nápad
- Dnes tři, každá na tři minuty: **Combine**, **Eliminate**, **Modify**
- Výsledek načrtněte na půlku listu A4

<div class="credit">SCAMPER: Bob Eberle (1971), podle seznamu Alexe Osborna</div>

::right::

<svg viewBox="15 0 470 335" class="scamper" role="img" aria-label="Schéma SCAMPER: nápad uprostřed a sedm otázek kolem, tři zvýrazněné">
  <g class="spokes">
    <line x1="250" y1="170" x2="250" y2="65" />
    <line x1="250" y1="170" x2="332" y2="104.5" />
    <line x1="250" y1="170" x2="352" y2="193.4" />
    <line x1="250" y1="170" x2="295.6" y2="264.6" />
    <line x1="250" y1="170" x2="204.4" y2="264.6" />
    <line x1="250" y1="170" x2="147.6" y2="193.4" />
    <line x1="250" y1="170" x2="167.9" y2="104.5" />
  </g>
  <circle cx="250" cy="170" r="40" class="core" />
  <text x="250" y="175" class="core-t">Nápad</text>
  <g class="node"><circle cx="250" cy="65" r="26" /><text x="250" y="73" class="l">S</text><text x="250" y="20" class="w">Substitute</text><text x="250" y="34" class="c">nahradit</text></g>
  <g class="node on"><circle cx="332" cy="104.5" r="26" /><text x="332" y="112.5" class="l">C</text><text x="366" y="100" class="w s">Combine</text><text x="366" y="114" class="c s">spojit</text></g>
  <g class="node"><circle cx="352" cy="193.4" r="26" /><text x="352" y="201.4" class="l">A</text><text x="386" y="189" class="w s">Adapt</text><text x="386" y="203" class="c s">přizpůsobit</text></g>
  <g class="node on"><circle cx="295.6" cy="264.6" r="26" /><text x="295.6" y="272.6" class="l">M</text><text x="318" y="306" class="w">Modify</text><text x="318" y="320" class="c">změnit</text></g>
  <g class="node"><circle cx="204.4" cy="264.6" r="26" /><text x="204.4" y="272.6" class="l">P</text><text x="190" y="306" class="w">Put to another use</text><text x="190" y="320" class="c">použít jinak</text></g>
  <g class="node on"><circle cx="147.6" cy="193.4" r="26" /><text x="147.6" y="201.4" class="l">E</text><text x="114" y="189" class="w e">Eliminate</text><text x="114" y="203" class="c e">odebrat</text></g>
  <g class="node"><circle cx="167.9" cy="104.5" r="26" /><text x="167.9" y="112.5" class="l">R</text><text x="134" y="100" class="w e">Reverse</text><text x="134" y="114" class="c e">obrátit</text></g>
</svg>

<style>
.col-left li { margin-top: 0.45em; margin-bottom: 0.45em; }
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 1rem; line-height: 1.35; }
.scamper { width: 100%; height: auto; display: block; }
.scamper .spokes line { stroke: #cfd9e6; stroke-width: 2; }
.scamper .core { fill: var(--muni-blue, #0000dc); }
.scamper .core-t { fill: #fff; font: 700 17px 'Helvetica Neue', Helvetica, Arial, sans-serif; text-anchor: middle; }
.scamper .node circle { fill: #eef4fb; stroke: #cfd9e6; stroke-width: 2; }
.scamper .node.on circle { fill: var(--muni-arts-blue, #4bc8ff); stroke: var(--muni-blue, #0000dc); stroke-width: 3; }
.scamper .l { font: 700 24px 'Helvetica Neue', Helvetica, Arial, sans-serif; text-anchor: middle; fill: var(--muni-blue, #0000dc); }
.scamper .w { font: 700 17px 'Helvetica Neue', Helvetica, Arial, sans-serif; text-anchor: middle; fill: #666; }
.scamper .c { font: 400 14.5px 'Helvetica Neue', Helvetica, Arial, sans-serif; text-anchor: middle; fill: #777; }
.scamper .s { text-anchor: start; }
.scamper .e { text-anchor: end; }
.scamper .node.on .w { fill: #000; }
.scamper .node.on .c { fill: #333; }
</style>

<!--
<br/>

**SCAMPER <span style="white-space:nowrap">18:35–18:45 (1/5)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Příklad na jednom nápadu

Výchozí nápad: aplikace, která cestujícím pošle upozornění na zpoždění vlaku.

- **Combine** – upozornění rovnou nabídne náhradní spojení, takže cestující nemusí nic hledat
- **Eliminate** – bez aplikace: informace přijde SMS a objeví se na displeji na zastávce
- **Modify** – upozornění přijde mnohem dřív: už při plánování cesty, kdy se zpoždění dá odhadnout z dřívějších dat

Z jednoho nápadu jsou tak tři další.

<style>
li { margin-top: 0.55em; margin-bottom: 0.55em; }
p { margin-top: 1.2em; }
</style>

<!--
<br/>

**SCAMPER <span style="white-space:nowrap">18:35–18:45 (2/5)</span>**
-->

---
layout: groupwork
hideInToc: true
progressSection: true
# timer: 3   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# SCAMPER: Combine

<div class="ask">S čím jde nápad spojit?</div>

- Vezměte jeden nebo víc nápadů z brainwritingu a spojte je dohromady, nebo s něčím úplně jiným
- Co se stane, když tyto nápady slijete do jednoho?
- Výsledek načrtněte na půlku listu A4

<style>
h1 { font-size: 1.9rem !important; margin-bottom: 0.4em !important; }
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>

<!--
<br/>

**SCAMPER <span style="white-space:nowrap">18:35–18:45 (3/5)</span>**

<br/>

- ⏱️ 3 minuty
-->

---
layout: groupwork
hideInToc: true
# timer: 3   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# SCAMPER: Eliminate

<div class="ask">Co jde odebrat?</div>

- Vezměte nápad a vyhoďte z něj polovinu: kroky, funkce, lidi, vybavení
- Co zbyde? Dá se to pořád použít? Co klíčové zůstává a co zahazujete?
- Načrtněte nejmenší verzi takového nápadu na půlku listu A4

<style>
h1 { font-size: 1.9rem !important; margin-bottom: 0.4em !important; }
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>

<!--
<br/>

**SCAMPER <span style="white-space:nowrap">18:35–18:45 (4/5)</span>**

<br/>

- ⏱️ 3 minuty
-->

---
layout: groupwork
hideInToc: true
# timer: 3   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# SCAMPER: Modify

<div class="ask">Co jde zvětšit, zmenšit nebo změnit?</div>

- Zkuste extrémy: desetkrát víc, desetkrát míň, mnohem rychlejší, mnohem pomalejší
- Co se změní, když upravíte jednu vlastnost nápadu: cenu, velikost, rychlost, četnost, počet lidí či vzhled?
- Načrtněte výsledek na půlku listu A4

<style>
h1 { font-size: 1.9rem !important; margin-bottom: 0.4em !important; }
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>

<!--
<br/>

**SCAMPER <span style="white-space:nowrap">18:35–18:45 (5/5)</span>**

<br/>

- ⏱️ 3 minuty

<br/>

🛑 **Nejpozději 18:45 končí SCAMPER.**
-->

---
layout: groupwork
hideInToc: true
progressSection: true
# timer: 10   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# Sdílení náčrtů v týmu

- Postupně každý ukažte všechny své náčrty kolegům a položte je viditelně na stůl
- Vyřaďte očividné duplicity
- (pokud máte čas) Seskupte náčrty do tématických oblastí
- Co z remixu je lepší než původní nápad?

<style>
h1 { font-size: 1.9rem !important; margin-bottom: 0.5em !important; }
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>

<!--
<br/>

**Sdílení náčrtů <span style="white-space:nowrap">18:45–18:50 (1/1)</span>**

<br/>

- ⏱️ 10 minut

<br/>

🛑 **Nejpozději 18:50 končí sdílení náčrtů.**
-->

---
layout: break
hideProgress: true
hideInToc: true
---

# Pauza

5 minut

<!--
<br/>

**Pauza <span style="white-space:nowrap">18:50–18:55 (1/1)</span>**

<br/>

- ⏱️ 5 minut

<br/>

🛑 **Nejpozději 18:55 končí pauza.**
-->

---
layout: section-break
---

# Výběr

Z palety nápadů k těm nejlepším

<!--
<br/>

**Úvod do prioritizace <span style="white-space:nowrap">18:55–19:05 (1/8)</span>**
-->

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Zóna kvílení (opět)

::left::

- **Divergentní** část máte za sebou, nehodnotili jsme a generovali formou „Ano, a…“
- **Konvergentní** část před námi – vybíráme, čemu se dál věnovat pomocí „Ano, ale…“
- Mezi nimi leží zóna kvílení. Teď děláte důležitá rozhodnutí.

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<img :src="asset + 'groanzone.webp'" alt="Diamant participace: introduction, divergent, emergent se zónou kvílení uprostřed, convergent, closure" class="groan" />

<div class="credit">Zóna kvílení. Diamant participace <a href="https://i2insights.org/2019/05/28/collaboration-groan-zone/">Sama Kanera</a>, <a href="https://futuropolis.cz/knihovna/groan-zone-zona-kvileni/">Futuropolis</a></div>

<style>
.groan { width: 100%; height: auto; display: block; }
.col-left li { margin-top: 0.5em; margin-bottom: 0.5em; }
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 0.7rem; line-height: 1.35; }
</style>

<!--
<br/>

**Úvod do prioritizace <span style="white-space:nowrap">18:55–19:05 (2/8)</span>**
-->

---
layout: two-column
ratio: "60-40"
hideInToc: true
---

# Dvě věci, než začnete vybírat

::left::

**Kill your darlings**

<div class="credit">Arthur Quiller-Couch, <em>On the Art of Writing</em> (1916), přednáška On Style: „Murder your darlings.“</div>


- **Nápady jsou levné** a vy jich máte desítky
  - Nebojte se je zahazovat nebo odložit na později
- Nápad je pořád jen nápad – jeho hodnotu ukáže prototyp a jeho testování
  - Iterace vám dá víc než trefa na první dobrou

::right::

**Čtyři rizika produktu**

1. **Hodnota** – budou to lidé chtít?
2. **Použitelnost** – pochopí, jak se to používá?
3. **Proveditelnost** – umíme to postavit?
4. **Životaschopnost** – uživí se to?

<div class="credit">Marty Cagan, <a href="https://www.svpg.com/four-big-risks/">Four Big Risks</a> (SVPG)</div>

<style>
.col-left ul { margin-top: 0.5em; }
.col-left ul ul { font-size: 0.9em; }
.col-left li { margin-top: 0.2em; margin-bottom: 0.2em; }
.col-right ol { margin-top: 0.5em; }
.col-right li { margin-top: 0.3em; margin-bottom: 0.3em; }
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 1rem; line-height: 1.35; }
</style>

<!--
<br/>

**Úvod do prioritizace <span style="white-space:nowrap">18:55–19:05 (3/8)</span>**
-->

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Dot voting

::left::

- Každý dostane pár teček a rozdělí je mezi nápady
- Rychlé a hned vidíte výsledky
- Problém je, že lidé můžou snadno opisovat
- Falešný pocit "harmonizace" v týmu
  - Má stejnou hodnotu hlas od vedoucí a stážisty?

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="pic">
  <img :src="asset + 'dot-voting-nngroup.jpg'" alt="Nástěnka s lepicími lístky, na kterých jsou červené tečky z dot votingu" />
  <div class="credit">Dot voting,  <a href="https://www.nngroup.com/articles/dot-voting/">NN/g</a></div>
</div>

<style>
.col-left li { margin-top: 0.4em; margin-bottom: 0.4em; }
.col-left ul ul { font-size: 0.9em; }
.pic img { width: 100%; height: auto; display: block; }
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 0.6rem; line-height: 1.35; }
</style>

<!--
<br/>

**Úvod do prioritizace <span style="white-space:nowrap">18:55–19:05 (4/8)</span>**
-->

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Skórování, třeba NUF test

::left::

- Každý nápad ohodnotíte v nějakých kritériích
  - u NUF jsou to **N**ew, **U**seful, **F**easible na škále 1-10
- Hodnoty následně pronásobíte / sečtete a máte pořadí
- Pomalejší, ale mnohem více strukturovaný postup
- Hodí se na užší výběr a když už je "co hodnotit"

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="pic">
  <img :src="asset + 'nuf-test-gamestorming.jpg'" alt="Ručně kreslená tabulka NUF testu: nápady v řádcích, sloupce New, Useful, Feasible a součet" />
  <div class="credit">NUF test. <a href="https://gamestorming.com/nuf-test/">Gamestorming</a></div>
</div>

<style>
.col-left li { margin-top: 0.4em; margin-bottom: 0.4em; }
.col-left ul ul { font-size: 0.9em; }
.pic img { width: 100%; height: auto; display: block; }
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 0.6rem; line-height: 1.35; }
</style>

<!--
<br/>

**Úvod do prioritizace <span style="white-space:nowrap">18:55–19:05 (5/8)</span>**
-->

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Impact a effort

::left::

- Každý nápad zařadíte podle dvou os: **dopad na uživatele** a **složitost tvorby**
- Hned vidíte "rychlé výhry" a nápady náročné na realizaci

**Pozor na rychlé výhry**

- Týmy často vyberou jen rychlé výhry a pomalé nápady přeskočí
- Právě pomalé nápady mohou být nejdůležitější

<div class="credit">Slabiny matice: <a href="https://www.claytonkjos.com/blog/6-major-flaws-that-make-the-impact-vs-effort-matrix-obsolete">Clayton Kjos</a></div>

::right::

<PriorityMatrix kind="impact" />

<style>
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 1rem; line-height: 1.35; }
.col-left li { margin-top: 0.25em; margin-bottom: 0.25em; }
.col-left p { margin-top: 0.8em; }
</style>

<!--
<br/>

**Úvod do prioritizace <span style="white-space:nowrap">18:55–19:05 (6/8)</span>**
-->

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Eisenhowerova matice

::left::

- Pojmenovaná po Eisenhowerovi, který prohlásil, že *naléhavé věci nebývají důležité a důležité nebývají naléhavé*
- Nápady umisťujete na matici podle **důležitosti** a **urgence**
- Pomůže identifikovat důležitá a strategická témata stejně jako zahodit ta zpomalující
- Naléhavé a nedůležité často stojí nejvíc času

::right::

<PriorityMatrix kind="eisenhower" />

<style>
.col-left li { margin-top: 0.3em; margin-bottom: 0.3em; }
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 1rem; line-height: 1.35; }
</style>

<!--
<br/>

**Úvod do prioritizace <span style="white-space:nowrap">18:55–19:05 (7/8)</span>**
-->

---
layout: two-column
ratio: "45-55"
hideInToc: true
---

# Opportunity-solution tree

::left::

- Na rozdíl od ostatních technik má **vrstvy**
- Nahoře je **výsledek**, kterého chcete dosáhnout
- Pod ním **příležitosti**: potřeby a bolesti lidí
- Pod nimi **řešení**, která zkoumáte
- Dole **testy předpokladů**
- Může sloužit jako „odkladiště“ nápadů

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="pic">
  <svg viewBox="0 0 480 345" class="ost" role="img" aria-label="Opportunity-solution tree: výsledek nahoře, pod ním příležitosti, řešení a testy předpokladů">
    <path d="M240 56 C240 80.5, 80 80.5, 80 105" class="l dim"/><path d="M240 56 C240 80.5, 240 80.5, 240 105" class="l"/><path d="M240 56 C240 80.5, 400 80.5, 400 105" class="l dim"/>
    <path d="M240 151 C240 175.5, 170 175.5, 170 200" class="l"/><path d="M240 151 C240 175.5, 310 175.5, 310 200" class="l dim"/>
    <path d="M170 246 C170 270.5, 84 270.5, 84 295" class="l"/><path d="M170 246 C170 270.5, 256 270.5, 256 295" class="l"/>
    <rect x="165" y="10" width="150" height="46" rx="10" class="n o"/><text x="240" y="40" class="t o">Výsledek</text>
    <rect x="10" y="105" width="140" height="46" rx="10" class="n p dim"/><text x="80" y="135" class="t p dim">Příležitost</text><rect x="170" y="105" width="140" height="46" rx="10" class="n p"/><text x="240" y="135" class="t p">Příležitost</text><rect x="330" y="105" width="140" height="46" rx="10" class="n p dim"/><text x="400" y="135" class="t p dim">Příležitost</text>
    <rect x="105" y="200" width="130" height="46" rx="10" class="n s"/><text x="170" y="230" class="t s">Řešení</text><rect x="245" y="200" width="130" height="46" rx="10" class="n s dim"/><text x="310" y="230" class="t s dim">Řešení</text>
    <rect x="2" y="295" width="164" height="46" rx="10" class="n a"/><text x="84" y="325" class="t a">Test předpokladu</text><rect x="174" y="295" width="164" height="46" rx="10" class="n a"/><text x="256" y="325" class="t a">Test předpokladu</text>
    </svg>
  <div class="credit">Opportunity solution tree, <a href="https://www.producttalk.org/">Product Talk</a></div>
</div>

<style>
.col-left li { margin-top: 0.25em; margin-bottom: 0.25em; }
.ost { width: 100%; height: auto; display: block; }
.ost rect.o { fill: var(--muni-blue, #0000dc); }
.ost rect.p { fill: var(--muni-arts-blue, #4bc8ff); }
.ost rect.s { fill: #bdeaff; }
.ost rect.a { fill: #f1f6fc; stroke: #9fc4e6; stroke-width: 2; }
.ost .dim { opacity: 0.45; }
.ost .t { font: 700 18px Helvetica, Arial, sans-serif; text-anchor: middle; fill: #111; }
.ost .t.o { fill: #fff; }
.ost .l { fill: none; stroke: #4a5a6a; stroke-width: 2.5; }
.ost .l.dim { opacity: 0.35; }
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 0.6rem; line-height: 1.35; }
</style>

<!--
<br/>

**Úvod do prioritizace <span style="white-space:nowrap">18:55–19:05 (8/8)</span>**

<br/>

🛑 **Nejpozději 19:05 končí úvod do prioritizace.**
-->

---
layout: heading-body
hideInToc: true
disabled: true
---

# Strom jako odkladiště

- Vybrané nápady putují do stromu, který složí jako "tracker"
- Z nápadu, který byste jinak zahodili, se může později stát příležitost
- Prototyp je v tomhle pohledu experiment, který testuje předpoklad pod řešením

<style>
li { margin-top: 0.55em; margin-bottom: 0.55em; }
</style>

---
layout: groupwork
hideInToc: true
---

# Umístěte své nápady

<div class="duo">
  <div class="choice">
    <div class="mname">Impact and effort</div>
    <PriorityMatrix kind="impact" mode="both" compact />
    <ul class="pc">
      <li class="pro">Rychlá ilustrace přínosu a nákladů</li>
      <li class="pro">Pomůže identifikovat rychlé výhry</li>
      <li class="con">Může přehlížet strukturální problémy</li>
      <li class="con">Dopad i úsilí často jen odhadujete</li>
    </ul>
  </div>
  <div class="choice">
    <div class="mname">Eisenhower matrix</div>
    <PriorityMatrix kind="eisenhower" mode="both" compact />
    <ul class="pc">
      <li class="pro">Oddělí to důležité od akutního</li>
      <li class="pro">Pomáhá identifikovat strategická témata</li>
      <li class="con">Vznikla pro úkoly, ne pro nápady</li>
      <li class="con">Důležitost je věc názoru</li>
    </ul>
  </div>
</div>

<style>
h1 { font-size: 1.9rem !important; margin-bottom: 0.3em !important; }
.duo { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.mname { font-weight: 700; font-size: 1em; margin-bottom: 0.1em; }
.pc { list-style: none; padding: 0; margin: 0.3rem 0 0; font-size: 0.72em; line-height: 1.2; }
.pc li { position: relative; padding-left: 1.1rem; margin: 0 0 0.2rem; }
.pc li::before { position: absolute; left: 0; font-weight: 700; }
.pro::before { content: "+"; color: #1a7f37; }
.con::before { content: "-"; color: #b42318; }
</style>

<!--
<br/>

**Prioritizace v týmech <span style="white-space:nowrap">19:05–19:20 (1/2)</span>**

<br/>

- ⏱️ 9 minut
-->

---
layout: groupwork
hideInToc: true
progressSection: true
# timer: 6   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# Co by vám prototyp řekl?

Vezměte jeden nebo dva vítězné nápady.

- Co byste se díky prototypu **dozvěděli od uživatelů**?
- Jak by prototyp vypadal? Načrtněte hroubou představu.
- Následně si vzájemně nasdílíme

<style>
h1 { font-size: 1.9rem !important; margin-bottom: 0.5em !important; }
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>

<!--
<br/>

**Prioritizace v týmech <span style="white-space:nowrap">19:05–19:20 (2/2)</span>**

<br/>

- ⏱️ 6 minut

<br/>

🛑 **Nejpozději 19:20 končí prioritizace v týmech.**
-->

---
layout: heading-body
hideInToc: true
---

# Sdílení

- Sdílení za skupinu ve formátu:
  - **problém**, který řešíte
  - **návrh řešení**, které chcete převést do prototypu (a jak?)
  - **otázka**, na kterou vám prototyp odpoví

<style>
li { margin-top: 0.55em; margin-bottom: 0.55em; }
</style>

<!--
<br/>

**Sdílení za týmy <span style="white-space:nowrap">19:20–19:25 (1/1)</span>**

<br/>

🛑 **Nejpozději 19:25 končí sdílení za týmy.**
-->

---
layout: section-break
hideInToc: true
hideProgress: true
---

# (re)frame?

<!--
<br/>

**Domácí úkol <span style="white-space:nowrap">19:25–19:30 (1/4)</span>**
-->

---
layout: section-break
hideInToc: true
hideProgress: true
---

# Ideace a remix nápadů je jen začátek

<!--
<br/>

**Domácí úkol <span style="white-space:nowrap">19:25–19:30 (2/4)</span>**
-->

---
layout: homework
hideInToc: true
---

# První prototyp do 29. 10.

- **Dokončete hrubý prototyp** aspoň jednoho nápadu
- Dopracujte něco z dneška, nebo si vyberte něco jiného, nebo klidně projděte celým procesem znovu
- Příště přineste výsledek tak, abyste jej mohli ukázat druhým
  - Uděláme si první vzájemné testování
  - Každý v týmu si přineste vlastní kopii vašeho prototypu – anebo ještě lépe – za tým si přineste prototypů několik!

<!--
<br/>

**Domácí úkol <span style="white-space:nowrap">19:25–19:30 (3/4)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Příště: evaluace prototypů

- **29. 10.** – jak prototyp otestovat, AI v designovém procesu a produktové trio

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
li { margin-top: 0.5em; margin-bottom: 0.5em; }
</style>

<!--
<br/>

**Domácí úkol <span style="white-space:nowrap">19:25–19:30 (4/4)</span>**

<br/>

🛑 **Nejpozději 19:30 končí domácí úkol včetně (re)frame.**
-->

---
layout: section-break
hideInToc: true
shader: true
hideProgress: true
---

# Co se vám honí hlavou?

<!--
<br/>

**Debrief a otázky <span style="white-space:nowrap">19:30–19:40 (1/2)</span>**
-->

---
layout: section-break
hideProgress: true
hideInToc: true
---

# Díky a pěkný večer!

<!--
<br/>

**Debrief a otázky <span style="white-space:nowrap">19:30–19:40 (2/2)</span>**

<br/>

🛑 **Nejpozději 19:40 končí hodina, debrief a otázky.**
-->
