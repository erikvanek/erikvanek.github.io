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


---
layout: heading-body
hideInToc: true
---

# Dnes nás čeká

- **Ideace** – mindset a dvě techniky, brainwriting a SCAMPER
- **Prioritizace** – jak ze spousty nápadů vybrat ty, které stojí za prototyp
- **Co nám má prototyp přinést?**
- **Úkol** – první prototyp k testování

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
h1 { margin-bottom: 0.45em !important; }
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>



---
layout: section-break
hideInToc: true
hideProgress: true
---

# Jak šly první úkoly?

---
layout: section-break
---

# Ideační techniky

Nápady jsou levné

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
  <div class="credit">Impose constraints, <a href="https://hci.stanford.edu/courses/cs147/2021/wi/readings/bootcamp_bootleg.pdf">d.school Bootcamp Bootleg</a></div>
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
- Kreativita není o tom umět precizně kreslit nebo skládat hudbu

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

---
layout: heading-body
hideInToc: true
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
  <div class="credit">Big Mind. <a href="https://press.princeton.edu/books/hardcover/9780691170794/big-mind">Geoff Mulgan</a>, <a href="https://press.princeton.edu/">Princeton University Press</a></div>
</div>

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
.cover { text-align: center; }
.cover img { height: 21rem; width: auto; display: inline-block; box-shadow: 0 0.3rem 0.8rem rgb(0 0 0 / 0.18); }
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 0.8rem; line-height: 1.35; }
</style>

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

---
layout: heading-body
hideInToc: true
---

# Ideačních technik je spousta

- Brainstorming – skupinové "střílení" nápadů
- **Brainwriting** – nápady píšete každý sám a pak je skládáte dohromady
- Myšlenkové mapy – nápady jako větve kolem tématu
- Crazy 8s – osm náčrtů za osm minut
- **SCAMPER** – sedm otázek, které nápad přetvářejí
- Thinking hats – každý ve skupině přichází s jiným mindsetem
  - variaci si vyzkoušíme v šestém setkání při design crit

Dnes si vyzkoušíte ty vytučněné. Detailnější popis všech technik najdete v osnově.

<style>
li { margin-top: 0.4em; margin-bottom: 0.4em; }
p { margin-top: 1.2em; opacity: 0.75; }
</style>

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

<div class="wall" aria-label="Schéma: stůl plný post-itů s nápady">
  <div class="note y"><i></i><i></i></div>
  <div class="note p"><i></i><i></i><i></i></div>
  <div class="note b"><i></i></div>
  <div class="note g"><i></i><i></i></div>
  <div class="note b"><i></i><i></i><i></i></div>
  <div class="note y"><i></i></div>
  <div class="note g"><i></i><i></i></div>
  <div class="note p"><i></i><i></i></div>
  <div class="note y"><i></i><i></i><i></i></div>
  <div class="note p"><i></i></div>
  <div class="note b"><i></i><i></i></div>
  <div class="note g"><i></i><i></i></div>
</div>

<div class="credit">Schéma: nápady na post-itech na stole</div>

<style>
.col-left li { margin-top: 0.5em; margin-bottom: 0.5em; }
.wall { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.7rem; padding: 1rem; background: #f4f7fb; border: 1px solid #d3dce7; }
.note { aspect-ratio: 1; padding: 0.55rem 0.5rem; display: flex; flex-direction: column; gap: 0.35rem; box-shadow: 0 0.15rem 0.3rem rgb(0 0 0 / 0.12); }
.note i { display: block; height: 0.28rem; background: rgb(0 0 0 / 0.28); border-radius: 0.2rem; }
.note i:nth-child(2) { width: 75%; }
.note i:nth-child(3) { width: 55%; }
.note.y { background: #ffe94d; transform: rotate(-3deg); }
.note.p { background: #ffb3c7; transform: rotate(2deg); }
.note.b { background: #9fe0ff; transform: rotate(-1.5deg); }
.note.g { background: #c5f0a4; transform: rotate(3deg); }
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 0.6rem; line-height: 1.35; }
</style>

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

---
layout: break
hideProgress: true
hideInToc: true
---

# Pauza

5 minut

---
layout: section-break
---

# Výběr

Z palety nápadů k těm nejlepším

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
  <div class="credit">Dot voting. <a href="https://www.nngroup.com/articles/author/sarah-gibbons/">Sarah Gibbons</a>, <a href="https://www.nngroup.com/articles/dot-voting/">NN/g</a></div>
</div>

<style>
.col-left li { margin-top: 0.4em; margin-bottom: 0.4em; }
.col-left ul ul { font-size: 0.9em; }
.pic img { width: 100%; height: auto; display: block; }
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 0.6rem; line-height: 1.35; }
</style>

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

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Impact a effort

::left::

- Každý nápad zařadíte podle dvou os: **dopad na uživatele** a **složitost vývoje**
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

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="pic">
  <img :src="asset + 'ost-product-talk.webp'" alt="Opportunity solution tree: výsledek nahoře, pod ním příležitosti, řešení a testy předpokladů" />
  <div class="credit">Opportunity solution tree. <a href="https://www.producttalk.org/opportunity-solution-trees/">Teresa Torres</a>, <a href="https://www.producttalk.org/">Product Talk</a></div>
</div>

<style>
.col-left li { margin-top: 0.25em; margin-bottom: 0.25em; }
.pic img { width: 100%; height: auto; display: block; }
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 0.6rem; line-height: 1.35; }
</style>

---
layout: heading-body
hideInToc: true
---

# Strom jako odkladiště

- Vybrané nápady putují do stromu, který složí jako "tracker"
- Z nápadu, který byste jinak zahodili, se může později stát příležitost
- Prototyp je v tomhle pohledu experiment, který testuje předpoklad pod řešením

<style>
li { margin-top: 0.55em; margin-bottom: 0.55em; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
clicks: 1
---

# Vyberte si matici

::left::

<div class="choice">
  <div class="mname">Impact and effort</div>
  <PriorityMatrix kind="impact" mode="reveal" :step="$clicks" compact />
  <ul class="pc">
    <li class="pro">Rychlá ilustrace přínosu a nákladů</li>
    <li class="pro">Pomůže identifikovat rychlé výhry</li>
    <li class="con">Neustálý výběr rychlých výher neřeší strukturální problémy</li>
    <li class="con">Dopad i úsilí často jen odhadujete</li>
  </ul>
</div>

::right::

<div class="choice">
  <div class="mname">Eisenhower matrix</div>
  <PriorityMatrix kind="eisenhower" mode="reveal" :step="$clicks" compact />
  <ul class="pc">
    <li class="pro">Oddělí to důležité od akutního</li>
    <li class="pro">Pomáhá identifikovat strategická témata</li>
    <li class="con">Vznikla pro úkoly, ne pro nápady</li>
    <li class="con">Důležitost je věc názoru</li>
  </ul>
</div>

<style>
.choice { max-width: 25rem; margin: 0 auto; }
.mname { font-weight: 700; font-size: 1.1em; margin-bottom: 0.2em; }
.pc { list-style: none; padding: 0; margin: 0.4rem 0 0; font-size: 0.82em; line-height: 1.25; }
.pc li { position: relative; padding-left: 1.2rem; margin: 0 0 0.3rem; }
.pc li::before { position: absolute; left: 0; font-weight: 700; }
.pro::before { content: "+"; color: #1a7f37; }
.con::before { content: "-"; color: #b42318; }
</style>

---
layout: groupwork
hideInToc: true
progressSection: true
# timer: 6   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# Co by vám prototyp řekl?

Vezměte jeden nebo dva vítězné nápady.

- Co byste se díky prototypu **dozvěděli od uživatelů**?
- Jak by prototyp vypadal? Stačí hrubá představa.

<style>
h1 { font-size: 1.9rem !important; margin-bottom: 0.5em !important; }
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>

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

---
layout: section-break
hideInToc: true
hideProgress: true
---

# (re)frame?

---
layout: section-break
hideInToc: true
hideProgress: true
---

# Ideace a remix nápadů je jen začátek

---
layout: homework
hideInToc: true
---

# První prototyp do 29. 10.

- **Dokončete hrubý prototyp** aspoň jednoho nápadu – buď dopracujte něco z dneška, nebo si vyberte něco jiného, nebo klidně projděte celým procesem znovu
- Příště přineste výsledek tak, abyste jej mohli ukázat druhým
  - Uděláme si první vzájemné testování
  - Každý v týmu si přineste vlastní kopii vašeho prototypu – anebo ještě lépe – za tým si přineste prototypů několik!

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

---
layout: section-break
hideInToc: true
shader: true
hideProgress: true
---

# Co se vám honí hlavou?

---
layout: section-break
hideProgress: true
hideInToc: true
---

# Díky a pěkný večer!
