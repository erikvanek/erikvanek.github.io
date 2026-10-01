---
theme: ../themes/muni-arts
title: SDW-26 II - Prototypování více do hloubky
publicPath: /sdw-26/II/
info: |
  Service design workshop, podzim 2026, setkání 2 (1. 10.).
  Podklady, časový rozpočet a pořadí škrtů: SDW-26, artifacts/IO/02 Setkání 2 - Prototypování více do hloubky/deck-02.md
  Running order, rozhodnutí a otevřené body: SDW-26, backlog/026-build-session-2-deck.md
layout: cover
session: 2
sessionTitle: Prototypování více do hloubky
date: 1. 10. 2026
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

- **Rámování problému** – jak z tématu udělat problém, na kterém stojí za to pracovat
- **Co se dá prototypovat** a v jaké věrnosti
- **Designové principy a nástroje** které můžeme využít
- **Praktické cvičení** – kde se od přání dostaneme k prvním návrhům
- **Úvod do testování prototypů**
- **Zadání prvního týmového úkolu**

(dnes toho bude docela hodně, asi nejvíc v kurzu)

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
h1 { margin-bottom: 0.45em !important; }
li { margin-top: 0.35em; margin-bottom: 0.35em; }
</style>

---
layout: two-column
ratio: "60-40"
hideInToc: true
---

# Jste tu dnes poprvé?

Zvedněte prosím ruku. Abych vás trochu poznal, rád bych od vás slyšel:

1. **jméno**
2. **kde jste na své designérské cestě**
    - čtu si o tom / něco jsem vyzkoušel(a) / (částečně) mě to živí / ...

---
layout: section-break
hideProgress: true
---

# Rámování problému

Spojnice mezi dvěma diamanty

---
layout: quote
author: Nejspíš fiktivní citát Alberta Einsteina
hideInToc: true
---

Kdybych měl hodinu na vyřešení problému, strávil bych 55 minut přemýšlením o problému a 5 minut přemýšlením o řešeních.

<div class="original">If I had an hour to solve a problem I'd spend 55 minutes thinking about the problem and 5 minutes thinking about solutions.</div>


<style>
.original {
  margin-top: 1.4rem;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1.05rem;
  line-height: 1.4;
  font-style: italic;
  opacity: 0.55;
  max-width: 34rem;
}
.source {
  margin-top: 1rem;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 0.8rem;
  line-height: 1.4;
  opacity: 0.55;
  max-width: 34rem;
}
</style>

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Proč na rámování tolik záleží

::left::

- První diamant hledá **správný problém**, druhý **správné řešení**
- Rámování je spojnice mezi nimi. Popíšete problém tak, aby se na něm dalo pracovat.
- Se špatně zarámovaným problémem dojdete v lepším případě k průměrnému řešení. V horším k řešení něčeho, co nikoho nezajímá.

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<img :src="asset + 'double-diamond.png'" alt="Dvojitý diamant: problem space (Discovery) a solution space (Delivery)" class="diamond" />

<div class="credit">Rámec Double Diamond formuloval britský <a href="https://www.designcouncil.org.uk/resources/the-double-diamond/">Design Council</a> (2004)</div>

<style>
.diamond { width: 100%; height: auto; display: block; }
.col-left li { margin-top: 0.45em; margin-bottom: 0.45em; }
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 0.7rem; line-height: 1.35; }
</style>

---
layout: heading-body
hideInToc: true
---

# Pět nástrojů na rámování

Všechny sledují stejný cíl – společné porozumění problému v týmu. Vyberte si ten, který sedí vašemu tématu.

- **5W1H** – šest otázek, po kterých umíte problém základně popsat
- **5 proč** – opakovaným „Proč?“ se od příznaku dostanete k příčině
- **Problem statement a „Jak bychom mohli…?“** – popis toho, co nefunguje, a výzva, která otevírá prostor pro nápady
- **Jobs to be done** – kam se člověk chce posunout a co ho ke změně žene nebo drží zpátky
- **Problem statement podle NHS** – krátký příběh o třech částech, obyčejnou řečí

Podrobně je všech pět v osnově, v podkapitole Rámování problému.

<style>
h1 { margin-bottom: 0.4em !important; }
li { margin-top: 0.3em; margin-bottom: 0.3em; }
p:last-child { font-size: 0.85em; opacity: 0.7; margin-top: 1em; }
</style>

---
layout: heading-body
hideInToc: true
---

# 5W1H

- **Who?** Koho se problém týká?
- **What?** Co je jeho podstata?
- **When?** Kdy nastává?
- **Where?** Kde nastává?
- **Why?** Proč nastává a proč stojí za to ho řešit?
- **How?** Jak ho lidé řeší dnes?

Po pár rozhovorech a rešerši byste na těchhle šest otázek měli umět odpovědět bez velkého přemýšlení. Když to nejde, nejspíš vám chybějí data.

<div class="credit">Otázky 5W1H podle hesla <a href="https://www.productplan.com/glossary/5-ws-and-h/"><em>5 Ws and H</em></a> ve slovníku ProductPlan</div>

<style>
li { margin-top: 0.25em; margin-bottom: 0.25em; }
p { margin-top: 1em; }
.credit { font-size: 0.7em; opacity: 0.6; margin-top: 1.2rem; }
</style>

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Jobs to be done

::left::

- Lidé si produkt, službu, nebo i vás „najímají“, aby se v životě posunuli
- Chtějí **"obraz na zdi"** (žádaný posun), díky kterému se budou doma cítit příjemně, ne kupovat si vrtačku (řešení, vedoucí k problému) 
- Job má tři roviny:
  - **funkční** (co potřebuju udělat)
  - **emoční** (jak se při tom chci cítit)
  - **sociální** (jak chci, aby mě viděli ostatní)
- Job zachytíte větou „Když …, potřebuju …, abych …“
- Na stejný job si lidé najímají různé nástroje – kolo, MHD, auto

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<img :src="asset + 'coffee-kale-cover.jpg'" alt="Obálka knihy When Coffee and Kale Compete: muž s kelímkem kávy, ze strany do obrazu vjíždí ruka se zelenou lahví kadeřávkového smoothie" class="cover" />

<div class="credit">Obálka knihy Alana Klementa <a href="https://jtbd.info/when-coffee-and-kale-compete-in-paperback-kindle-8d4c11a3d90f"><em>When Coffee and Kale Compete</em></a>, 2. vydání (2018)</div>

<style>
.col-left li { margin-top: 0.35em; margin-bottom: 0.35em; line-height: 1.5; }
.cover { height: 21rem; width: auto; display: block; margin: 0 auto; box-shadow: 0 0.4rem 1.2rem rgb(0 0 0 / 0.18); }
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 0.7rem; line-height: 1.35; }
</style>

---
layout: two-column
ratio: "45-55"
hideInToc: true
---

# Čtyři síly

::left::

Každou změnu tahají čtyři síly naráz:

- **Push** situace – frustrace, která změnu spustí
- **Pull** nového – přitažlivost lepšího způsobu
- **Anxiety** z nového – co když to bude horší, těžší, riskantní?
- **Habit** současnosti – pohodlí toho, jak to funguje teď

**Push a pull změnu pohánějí. Anxiety a habit jí brání.**

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<img :src="asset + 'ctyri-sily.svg'" alt="Diagram čtyř sil: člověk stojí na cestě mezi dnešním stavem a novým řešením, push a pull ho táhnou k novému, habit a anxiety zpátky" class="forces-img" />

<div class="credit">Čtyři síly podle Boba Moesty a Chrise Spieka, <a href="https://jobstobedone.org/the-four-forces/">jobstobedone.org</a>, diagram překreslený pro tento kurz</div>

<style>
.col-left li { margin-top: 0.45em; margin-bottom: 0.45em; }
.col-left p:last-child { margin-top: 1.1em; }
.forces-img { width: 100%; height: auto; display: block; }
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 0.5rem; line-height: 1.35; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Příklady otázek pro 4 síly změny

::left::

**Push** – co je dnes špatně

- „Co vás přimělo začít hledat jiný způsob jak děláte ...?“
- „Vzpomeňte si, kdy se to naposledy pokazilo. Co se tehdy přesně stalo?“

**Pull** – přitažlivost nového

- „Když si představíte, že je to vyřešené, jak vypadá dobrý den?“
- „Co vám poprvé napovědělo, že tohle by mohlo být řešení?“

::right::

**Anxiety** – strach z nového

- „Co vás znepokojuje na tom, že byste to začali dělat jinak?“
- „Co byste potřebovali, abyste tomu byli ochotní věřit?“

**Habit** – síla současného způsobu

- „Co se vám na tom, jak to funguje teď, doopravdy líbí?“ To si můžete „ukrást“ pro sebe.
- „Co se rozbije, když se to změní?“

<style>
.two-column { font-size: 0.92em; }
li { margin-top: 0.3em; margin-bottom: 0.3em; }
ul + p { margin-top: 1.1em; }
.tip { margin-top: 1.4rem; padding: 0.6rem 0.9rem; border-left: 4px solid var(--muni-blue); background: rgb(0 0 220 / 0.05); font-size: 0.92em; }
</style>

---
layout: heading-body
hideInToc: true
---

# Od problému k designové výzvě

Problem statement popisuje, co dnes nefunguje. Designová výzva z něj dělá otázku, která otevírá prostor pro hledání řešení.

<div class="tpl">
  <p><strong>Problem statement:</strong> <span class="tpl-slot">[komu]</span> se nedaří <span class="tpl-slot tpl-hl">[co]</span>, protože <span class="tpl-slot">[důvod]</span>.</p>
  <p><strong>Designová výzva:</strong> Jak bychom mohli <span class="tpl-slot tpl-hl">[co změnit]</span> tak, aby <span class="tpl-slot">[žádoucí výsledek]</span>?</p>
</div>

<div class="examples">
  <div class="ex">
    <p class="ex-problem">„Uživatelům se nedaří dokončit online nákup, protože objednávkový formulář má zbytečně mnoho kroků.“</p>
    <p class="ex-arrow">↓</p>
    <p class="ex-hmw">„Jak bychom mohli zjednodušit objednávku tak, aby víc lidí nákup dokončilo?“</p>
  </div>
  <div class="ex">
    <p class="ex-problem">„Studujícím se nedaří vracet knihy včas, protože upozornění z knihovny chodí jen e-mailem, který nečtou.“</p>
    <p class="ex-arrow">↓</p>
    <p class="ex-hmw">„Jak bychom mohli studujícím usnadnit vracení knih tak, aby je vraceli včas?“</p>
  </div>
</div>

<style>
.tpl { margin: 1.1rem 0 1.4rem; padding: 0.7rem 1.1rem; border-left: 4px solid var(--muni-blue); background: rgb(0 0 220 / 0.05); }
.tpl p { margin: 0.25rem 0; }
.tpl .tpl-slot { color: var(--muni-blue); }
/* A highlighter stroke in KISK yellow, sitting slightly low with uneven ends */
.tpl .tpl-hl {
  padding: 0 0.25em;
  margin: 0 -0.05em;
  border-radius: 0.6em 0.2em 0.5em 0.25em;
  background: linear-gradient(to bottom, transparent 14%, var(--kisk-yellow) 14%, var(--kisk-yellow) 94%, transparent 94%);
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}
.examples { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem; }
.ex { border: 2px solid var(--muni-arts-blue); border-radius: 0.4rem; padding: 0.9rem 1.1rem; font-size: 0.88em; }
.ex p { margin: 0; }
.ex .ex-arrow { color: var(--muni-blue); font-size: 1.3em; line-height: 1.4; }
.ex .ex-hmw { font-weight: 700; }
</style>

---
layout: heading-body
hideInToc: true
---

# Jak široká má výzva být

- „Jak bychom mohli upravit barvu tlačítka Odeslat?“ – moc úzká, pro nápady nezbývá prostor ❌
- „Jak bychom mohli zlepšit digitální zkušenost našich uživatelů?“ – příliš široká ❌
- „Jak bychom mohli zjednodušit dokončení nákupu v mobilní aplikaci?“ – něco mezi – spousta prostoru pro hledání funkčních řešení ✅

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
li { margin-top: 0.6em; margin-bottom: 0.6em; }
</style>

<!--
🛑 **Nejpozději 18:25 končí teorie rámování.**
-->

---
layout: section-break
hideProgress: true
hideInToc: true
progressSection: exercise
---

# TopVlaky

Poptávka od nového klienta

<!--
Kdo z vás ještě není v žádném týmu?
-->

---
layout: groupwork
hideInToc: true
timer: [8, 4]
---

# Od zadání k problému

Vaším úkolem je vydefinovat, jaký problém by měl klient vlastně řešit.

::step-1::

**Podklady a další data**

- Rozdělte si tři zdroje – e-mail, recenze a výpis stížností
- Každý si pokuste projít všechny, postupně si je protočte
- Na konci si shrňte vaše zjištění, kde se zdroje shodují a kde si odporují

::step-2::

**Canvas**

- Vyplňte 5W1H, začněte zhruba a postupně zpřesňujte
- V každém poli oddělte, co víte, od toho, co si jen myslíte
- Napište problém jednou větou

Radši celý canvas zhruba než polovinu přesně.

<style>
h1 { font-size: 1.9rem !important; margin-bottom: 0.5em !important; }
li { margin-top: 0.3em; margin-bottom: 0.3em; }
</style>

---
layout: heading-body
hideInToc: true
---

# Jaký problém jste našli?

Každá skupina přečte svůj problém jednou větou.

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
p { font-size: 1.35em; }
p + p { margin-top: 1.2em; }
</style>

---
layout: heading-body
hideInToc: true
---

# Dvě možná rámování

Každé stojí na něčem jiném a každé má slabé místo.

<div class="frm-grid">
  <div class="frm-card">
    <p class="frm-name">Zmatečné informace při výjimkách</p>
    <p class="frm-text">„Cestující, kteří během výluky stojí na nádraží, s aplikací i bez ní, nevědí, odkud a kdy jede náhradní doprava, protože aplikace, nádraží a infolinka jim každý říkají něco jiného, nebo nic.“</p>
    <p class="frm-weak">Slabé místo: opora hlavně z Tišnova</p>
  </div>
  <div class="frm-card">
    <p class="frm-name">Reaktivní informace o změnách</p>
    <p class="frm-text">„Když se provoz změní, dozvídá se to aplikace, nádraží i infolinka pozdě a každý jinak, a cestující pak neví, čemu věřit.“</p>
    <p class="frm-weak">Slabé místo: stojí na jedné větě vedoucí infolinky</p>
  </div>
</div>

<div class="frm-nudge">
  <p v-click>Co potřebujeme vědět, abychom věděli?</p>
  <p v-click>A proč? A proč? …</p>
</div>

<style>
.frm-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.2rem; margin-top: 1.3rem; }
.frm-card { border: 2px solid var(--muni-arts-blue); border-radius: 0.4rem; padding: 0.9rem 1rem; font-size: 0.8em; display: flex; flex-direction: column; gap: 0.6rem; }
.frm-card p { margin: 0; }
.frm-name { font-weight: 700; color: var(--muni-blue); }
.frm-weak { margin-top: auto !important; opacity: 0.65; font-size: 0.92em; }
.frm-nudge { margin-top: 1.4rem; }
.frm-nudge p { margin: 0.3rem 0; font-weight: 700; color: var(--muni-blue); font-size: 1.1em; }
</style>

---
layout: heading-body
hideInToc: true
---

# Co si ze cvičení vzít

<v-clicks>

1. Zadání od klienta může vypadat jasně a klientka může působi, že ví, co chce. Málokdy je to ale celá pravda.
2. Obhajitelných rámování je víc a každé má slabé místo. Dobré rámování slabiny umí popsat a odděluje, co víme, od toho, co si myslíme.
3. Než začnete navrhovat, ověřte, na čem zadání stojí. V tuhle chvíli je nejlepší výstup sada dobře mířených otázek na klientku.

</v-clicks>

<style>
li { margin-top: 0.7em; margin-bottom: 0.7em; }
</style>

<!--
🛑 **Nejpozději 18:45 končí cvičení včetně debriefu.**
-->

---
layout: section-break
hideProgress: true
---

# Mindset prototypování

Krátké zopakování z prvního setkání

---
layout: quote
author: Marty Cagan, The Purpose of Prototypes (SVPG, 2025)
link: https://www.svpg.com/the-purpose-of-prototypes/
hideInToc: true
---

Nejvyšším smyslem prototypu je pomoct vám objevit úspěšný produkt.

<div class="original">The highest order use of a prototype is to help you discover a successful product.</div>

<style>
.original {
  margin-top: 1.4rem;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1.05rem;
  line-height: 1.4;
  font-style: italic;
  opacity: 0.55;
  max-width: 34rem;
}
</style>

---
layout: heading-body
hideInToc: true
---

# Každý prototyp stojí alespoň na jedné otázce

- Funguje tenhle průchod službou tak, jak si myslíme?
- Dá se ten text přečíst a pochopit napoprvé?
- Dostane se do toho prostoru člověk na vozíku?

Otázka vám řekne, jak propracovaný prototyp potřebujete.

**Prototyp je něco, co nejspíš na konci vyhodíte.**

<style>
li { margin-top: 0.3em; margin-bottom: 0.3em; }
p { margin-top: 1em; }
</style>

---
layout: heading-body
hideInToc: true
---

# Design jako vykreslení záměru

- Jared Spool definuje design jako *rendering of intent*. Představíte si výsledek a děláte kroky, aby se stal skutečností.
- Prototyp ověřuje, že váš záměr vede tam, kam chcete.
- Záměr proto nejdřív potřebujete umět popsat a teprve pak ho zhmotnit. Odtud dnešní pořadí – nejdřív rámování, potom prototypy.

<div class="credit">Jared Spool, <a href="https://articles.centercentre.com/design_rendering_intent/">Design is the Rendering of Intent</a> (Center Centre)</div>

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
.credit { font-size: 0.7em; opacity: 0.6; margin-top: 1.4rem; }
</style>

<!--
🛑 **Nejpozději 18:50 končí mindset prototypování.**
-->

---
layout: section-break
hideProgress: true
---

# Co se dá prototypovat

Skoro všechno, co navrhujete

---
layout: heading-body
hideInToc: true
clicks: 4
---

<VrstvyPrototypu :step="$clicks" />

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
</style>

---
layout: heading-body
hideInToc: true
hide: true
---

# Od textu po prostor

- **Obsah a texty** – metodika o 20–30 stranách, která se ve třech kolech testovala, až byla pro lidi čitelná
- **Obrazovky a dílčí průchody** – registrace, dokončení objednávky, klidně papírem a tužkou
- **Zákaznická cesta** – víc kroků za sebou: zvládne člověk vyřídit, co potřebuje? Načrtnout ji jde třeba storyboardem
- **Fyzické prostory a navigace** – kartonové zákaznické centrum ve Victorii, lékárna v nemocnici Whittington za provozu, cedule Čitelné Prahy v MHD
- **Produktová vize** – video, o kterém se dá diskutovat

<style>
li { margin-top: 0.3em; margin-bottom: 0.3em; }
</style>

---
layout: two-column
ratio: "60-40"
hideInToc: true
---

# Obsah a texty

::left::

Prototypovat můžete i jen to, co je napsané.

- Metodika Sousedských dětských skupin pro MPSV měla 20–30 stran a testovala se ve třech kolech s lidmi, kteří měli službu využívat
- První verze od odborníků z ministerstva byla pro ně prakticky nečitelná, po třech kolech stravitelná a použitelná
- Stejně se dá prototypovat úřední dopis, menu v restauraci, textace webu nebo instrukce na automatu

<div class="credit">Jak na srozumitelný text: web <a href="https://www.ochrance.cz/srozumitelne/">Jak psát srozumitelně úřední texty</a> a <a href="https://www.ochrance.cz/uploads-import/ESO/p%C5%99%C3%ADru%C4%8Dka/Prirucka_srozumitelneho_psani_tisk.pdf">příručka v PDF</a> od Kanceláře veřejného ochránce práv</div>

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<img :src="asset + 'vop-prirucka.jpg'" alt="Obálka příručky Jak psát srozumitelné úřední texty s kresbou úředníka, který čte papír" class="guide" />

<div class="credit"><em>Jak psát srozumitelné úřední texty</em>, Kancelář veřejného ochránce práv (2022)</div>

<style>
.col-left p { margin-bottom: 0.5em; }
.col-left li { margin-top: 0.35em; margin-bottom: 0.35em; }
.guide { height: 19rem; width: auto; display: block; margin: 0 auto; box-shadow: 0 0.4rem 1.2rem rgb(0 0 0 / 0.15); }
.credit { font-size: 0.66em; opacity: 0.62; margin-top: 0.8rem; line-height: 1.35; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Zná někdo?

::left::

<img src="https://images.computerhistory.org/revonline/images/102716262p-03-01.jpg?w=600" alt="Prototyp kapesního počítače Palm Pilot z doby kolem roku 1995: bílé tělo, dřevěný stylus a vložený papírový obrázek obrazovky" class="palm" />

<div class="credit" v-click="1">Palm Pilot wooden form factor prototype, kolem 1995. <a href="https://www.computerhistory.org/collections/catalog/102716262">Computer History Museum</a></div>

::right::

<v-click at="1">

<img src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Palm-IMG_7025.jpg" alt="Hotový kapesní počítač PalmPilot" class="palm" />

<div class="credit">PalmPilot. Foto Rama &amp; Musée Bolo, <a href="https://commons.wikimedia.org/wiki/File:Palm-IMG_7025.jpg">CC BY-SA 2.0 fr</a></div>

</v-click>

<style>
.palm { max-height: 19rem; width: auto; max-width: 100%; display: block; margin: 0 auto; }
.credit { font-size: 0.65em; opacity: 0.62; margin-top: 0.6rem; line-height: 1.35; text-align: center; }
</style>

---
layout: two-column
ratio: "40-60"
hideInToc: true
---

# Zákaznická cesta

::left::

- Víc kroků za sebou – i když každý krok zvlášť funguje, celek může narazit
- Typická mapa má fáze (*stages*), kroky (*steps*), touchpointy a problémová místa
- Pomáhá i hledat příležitosti, jak službu dál rozvíjet
- [Návod, jak journey mapu vytvořit](https://www.figma.com/resource-library/what-is-a-customer-journey-map/)

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<img :src="asset + 'journey-map-banka.jpg'" alt="Ukázková mapa zákaznické cesty banky: řádky pro uživatele, kanály, cestu klienta od objevení po hypotéku, funkce a obchodní jednotky" class="map" />

<div class="credit">Ukázková mapa zákaznické cesty banky od Slide Team, z článku <a href="https://www.zendesk.com/blog/customer-service/customer-journey-map/">Customer journey maps</a> na blogu Zendesku</div>

<style>
.col-left li { margin-top: 0.5em; margin-bottom: 0.5em; }
.map { width: 100%; height: auto; display: block; border-radius: 0.3rem; }
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 0.8rem; line-height: 1.35; }
</style>

---
layout: heading-body
hideInToc: true
---

# Čitelná Praha

Jednotný navigační systém pro pražskou MHD i ulice, který vede ROPID.

- Od roku 2022 ho zkoušejí na jednoduchých testovacích cedulích, u Štvanické lávky pak s třiceti lidmi
- Ukazuju ho jako prototypování služby v prostoru – levně, za provozu a s lidmi, kteří se tam orientují. Navigace byla i jádrem cvičení TopVlaky.

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="cp-row">
  <img :src="asset + 'citelna-praha-palmovka.jpg'" alt="Testovací cedule Čitelné Prahy pod stropem stanice metra Palmovka se šipkami k východům na Bus Terminal a do Zenklovy" style="flex-grow: 1.65" />
  <img :src="asset + 'citelna-praha-obelisk.jpg'" alt="Prototyp obelisku pěší navigace Čitelné Prahy s oranžovým pruhem, názvem místa a mapou" style="flex-grow: 0.8" />
  <img :src="asset + 'citelna-praha-test.jpg'" alt="Výzkumnice s respondentem při testování mapy na prototypu obelisku u Štvanické lávky" style="flex-grow: 1.5" />
</div>

<div class="credit">Zleva: testovací cedule na Palmovce, 2022, foto Bilykralik16, <a href="https://commons.wikimedia.org/wiki/File:Palmovka,_cedule_s_v%C3%BDchody_E1-E9.jpg">Wikimedia Commons</a></div>

<style>
h1 { margin-bottom: 0.4em !important; }
.heading-body > p { margin-bottom: 0.3em; }
.heading-body li { margin-top: 0.2em; margin-bottom: 0.2em; }
.cp-row { display: flex; gap: 0.5rem; margin-top: 0.8rem; }
.cp-row img { flex-basis: 0; min-width: 0; height: auto; display: block; }
.credit { font-size: 0.62em; opacity: 0.62; margin-top: 0.5rem; line-height: 1.35; }
</style>

---
layout: heading-body
hideInToc: true
---

# Fyzické prototypování

<div class="video">
  <iframe
    src="https://www.youtube.com/embed/DOP7q-YMeY8?rel=0&amp;modestbranding=1&amp;playsinline=1&amp;color=white"
    title="Service Staging Prototype"
    allow="encrypted-media; picture-in-picture; fullscreen"
    allowfullscreen
  ></iframe>
</div>

<div class="credit">Angelika Simonfalvi, Service Staging Prototype (<a href="https://www.youtube.com/watch?v=DOP7q-YMeY8">YouTube</a>)</div>

<style>
h1 { margin-bottom: 0.4em !important; }
.video { width: 38rem; aspect-ratio: 16 / 9; }
.video iframe { width: 100%; height: 100%; border: 0; display: block; }
.credit { font-size: 0.7em; opacity: 0.6; margin-top: 0.6rem; }
</style>

---
layout: heading-body
hideInToc: true
---

# Knowledge Navigator

<div class="video">
  <iframe
    src="https://www.youtube.com/embed/umJsITGzXd0?rel=0&amp;modestbranding=1&amp;playsinline=1&amp;color=white"
    title="Apple Knowledge Navigator, 1987"
    allow="encrypted-media; picture-in-picture; fullscreen"
    allowfullscreen
  ></iframe>
</div>

<div class="credit">Knowledge Navigator, Apple Computer, 1987 (<a href="https://www.youtube.com/watch?v=umJsITGzXd0">YouTube</a>)</div>

<style>
h1 { margin-bottom: 0.4em !important; }
.video { width: 38rem; aspect-ratio: 16 / 9; }
.video iframe { width: 100%; height: 100%; border: 0; display: block; }
.credit { font-size: 0.7em; opacity: 0.6; margin-top: 0.6rem; }
</style>

<!--
🛑 **Nejpozději 19:00 končí Co se dá prototypovat.**
-->

---
layout: section-break
hideProgress: true
---

# Věrnost prototypu

Od náčrtu na ubrousku po skoro hotový produkt

---
layout: heading-body
hideInToc: true
---

# Nízká, střední, vysoká

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="nsv">
  <div class="nsv-col">
    <img :src="asset + 'ljub-4.jpg'" alt="Neopracovaný dřevěný hranol přišroubovaný závitovými tyčemi k betonové zdi venkovního schodiště, po kterém zrovna chodí lidé" />
    <p><strong>Nízká</strong> – ruční náčrty, papírové modely, setříděné post-ity. Hotové za desítky minut.</p>
  </div>
  <div class="nsv-col">
    <img :src="asset + 'ljub-3.jpg'" alt="Stejná maketa uvnitř nádraží, provizorně uchycená vedle rozpracovaných úchytů" />
    <p><strong>Střední</strong> – proklikávací wireframy, fake-door test, Wizard of Oz</p>
  </div>
  <div class="nsv-col">
    <img :src="asset + 'zabradli-1.jpg'" alt="Hotové zábradlí o kus dál v nádraží, broušené a nalakované dřevo v čistých úchytech" />
    <p><strong>Vysoká</strong> – skutečné texty, data a chování skoro v produkční kvalitě</p>
  </div>
</div>

<p class="nsv-take">Věrnost volte podle otázky, na kterou chcete znát odpověď.</p>

<style>
h1 { margin-bottom: 0.5em !important; }
.nsv { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.nsv-col img { width: 100%; height: 17.5rem; object-fit: cover; display: block; }
.nsv-col p { font-size: 0.82em; line-height: 1.4; margin-top: 0.55em; }
.nsv-take { margin-top: 0.9em; font-size: 1em; }
</style>

---
hideInToc: true
hideProgress: true
clicks: 2
---

<script setup>
import { watch, onUnmounted } from 'vue'
import { useSlideContext, onSlideEnter, onSlideLeave } from '@slidev/client'

const asset = import.meta.env.BASE_URL
const { $clicks: krok } = useSlideContext()

// Same rhythm as the Ljubljana railing in deck I: 5 s per photo, a click moves on sooner
const PAUZA = 5000
let timer = null
const clear = () => { if (timer) { clearTimeout(timer); timer = null } }
const schedule = () => {
  clear()
  if (krok.value < 2) timer = setTimeout(() => { krok.value = krok.value + 1 }, PAUZA)
}
onSlideEnter(schedule)
onSlideLeave(clear)
onUnmounted(clear)
watch(krok, schedule)
</script>

<div class="woz">
  <div class="cell"><img :src="asset + 'woz-1.jpg'" alt="Dřevěná skříňka s tabletem uprostřed, na displeji nápis „Dotkněte se pro ztišení“ – takhle ji vidí návštěvník výstavy" /></div>
  <div class="cell" :class="{ on: $clicks >= 1 }"><img :src="asset + 'woz-2.jpg'" alt="Stejná skříňka, přední deska s tabletem se právě odklápí" /></div>
  <div class="cell" :class="{ on: $clicks >= 2 }"><img :src="asset + 'woz-3.jpg'" alt="Otevřená skříňka: uvnitř leží powerbanky, kabely a bluetooth reproduktor" /></div>
</div>

<style>
/* Full bleed, no text: the photos carry it and the talk goes over them */
.woz {
  position: absolute;
  top: -2px; left: -2px; right: -2px; bottom: -2px;
  display: flex;
  gap: 4px;
  background: #fff;
}
.woz .cell { flex: 1 1 0; min-width: 0; overflow: hidden; }
.woz .cell:nth-child(2),
.woz .cell:nth-child(3) { opacity: 0; transition: opacity 600ms ease; }
.woz .cell.on { opacity: 1; }
.woz img { width: 100%; height: 100%; object-fit: cover; display: block; }
</style>

---
layout: heading-body
hideInToc: true
---

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="jm">
  <div class="jm-col" style="grid-area: c1">Papír</div>
  <div class="jm-col" style="grid-area: c2">Digitál</div>
  <div class="jm-row" style="grid-area: r1"><span>Statický</span></div>
  <div class="jm-row" style="grid-area: r2"><span>Interaktivní</span></div>
  <figure class="jm-cell" style="grid-area: a">
    <img :src="asset + 'jarmilka-1-skica.jpg'" alt="Ruční skica průchodu Jarmilkou modrou propiskou: čtyři obrazovky od úvodního vyhledávání po doporučené služby" />
    <figcaption>Skica průchodu</figcaption>
  </figure>
  <figure class="jm-cell" style="grid-area: c" v-click="1">
    <img :src="asset + 'jarmilka-2-papir.jpg'" alt="Papírový prototyp obrazovky doporučených služeb s Jarmilkou, kartami služeb s mírou shody a vysvětlivkami typů služeb" />
    <figcaption>Papírový prototyp</figcaption>
  </figure>
  <figure class="jm-cell" style="grid-area: b" v-click="2">
    <img :src="asset + 'jarmilka-3-figma.jpg'" alt="Obrazovka Jarmilky ve Figmě: ilustrovaná průvodkyně, pole pro popis situace a časté životní situace" />
    <figcaption>Obrazovka ve Figmě</figcaption>
  </figure>
  <figure class="jm-cell" style="grid-area: d" v-click="3">
    <img :src="asset + 'jarmilka-4-interaktivni.png'" alt="Interaktivní prototyp Jarmilky ve Figmě na notebooku: doporučené služby s mírou shody a barevnými značkami" />
    <figcaption>Interaktivní prototyp ve Figmě</figcaption>
  </figure>
</div>

<div class="credit">Věrnost v praxi na Jarmilce, z <a href="https://www.erikvanek.com/case-studies/jarmilka/uzivatelska-studie-Jarmilka.pdf">případové studie</a></div>

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
.jm { display: grid; grid-template-columns: 1rem 1fr 1fr; grid-template-rows: auto 1fr 1fr; grid-template-areas: ". c1 c2" "r1 a b" "r2 c d"; gap: 0.25rem 0.9rem; }
.jm-col { font-size: 0.6em; font-weight: 700; color: var(--muni-blue); text-align: center; line-height: 1.2; }
.jm-row { display: flex; align-items: center; justify-content: center; }
.jm-row span { writing-mode: vertical-rl; transform: rotate(180deg); font-size: 0.6em; font-weight: 700; color: var(--muni-blue); line-height: 1; }
.jm-cell { margin: 0; display: flex; flex-direction: column; align-items: center; }
.jm-cell img { height: 13.2rem; width: auto; max-width: 100%; object-fit: contain; display: block; border-radius: 0; }
.jm-cell figcaption { font-size: 0.58em; opacity: 0.7; margin-top: 0.15rem; line-height: 1.2; }
.credit { font-size: 0.55em; opacity: 0.55; margin-top: 0.3rem; }
</style>

---
layout: heading-body
hideInToc: true
---

# Věrnost mění podobu zpětné vazbu

- Na nízkou věrnost lidé reagují spíš na myšlenku a koncept
- Nedokončený návrh je ponouká k bohatší kritice
- Na hotově vypadající návrh reagují opatrně a nechtějí vám ho „bořit“

Osvědčilo se mi začínat s co nejnižší věrností a zvyšovat ji, až když vím, co chci ověřit do detailu.

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
p { margin-top: 1.2em; }
</style>

---
layout: heading-body
hideInToc: true
---

# Papírový prototyp v akci

<div class="video">
  <iframe
    src="https://www.youtube.com/embed/y20E3qBmHpg?rel=0&amp;modestbranding=1&amp;playsinline=1&amp;color=white"
    title="Mobile Application Design: Paper Prototype Video"
    allow="encrypted-media; picture-in-picture; fullscreen"
    allowfullscreen
  ></iframe>
</div>

<div class="credit">Cor-mac, <a href="https://www.youtube.com/watch?v=y20E3qBmHpg">Mobile Application Design: Paper Prototype Video</a> (YouTube)</div>

<style>
h1 { margin-bottom: 0.4em !important; }
.video { width: 38rem; aspect-ratio: 16 / 9; }
.video iframe { width: 100%; height: 100%; border: 0; display: block; }
.credit { font-size: 0.7em; opacity: 0.6; margin-top: 0.6rem; }
</style>

---
layout: heading-body
hideInToc: true
---

# Co s věrností udělala AI

- Interaktivní prototyp, který dřív stál dny práce, dnes vznikne za desítky minut
- Je lákavé skočit rovnou do vysoké věrnosti
- Zvažte, jestli se tím nepřipravujete o pestrost nápadů a směrů

Čím později chybu najdete, tím víc práce je na ní postavené. Nejdražší je chyba v samotném zadání.

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
p { margin-top: 1.2em; }
</style>

<!--
🛑 **Nejpozději 19:08 končí věrnost prototypu.**
-->

---
layout: groupwork
hideInToc: true
timer: [5, 5]
progressSection: true
---

# První návrhy řešení

Vraťte se ke svému rámování z první části.

::step-1::

**Každý sám**

- Na zadní stranu jednoho z listů načrtněte váš nápad řešení rámovaného problému
- Nízká fidelita

::step-2::

**Ve skupině**

- Položte náčrty vedle sebe
- V čem se liší a na jakou otázku by každý z nich odpověděl?
- Rozhodněte, který ukážete ostatním

<style>
h1 { font-size: 1.9rem !important; margin-bottom: 0.5em !important; }
li { margin-top: 0.3em; margin-bottom: 0.3em; }
</style>

---
layout: section-break
hideInToc: true
shader: true
hideProgress: true
---

# Vzájemné sdílení

<!--
🛑 **Nejpozději 19:26 končí druhá část cvičení včetně sdílení** (18 minut od 19:08).
-->

---
layout: section-break
hideProgress: true
---

# Nástroje

Podle toho, co potřebujete zjistit

---
layout: heading-body
hideInToc: true
---

# Tužka a papír

- Nejrychlejší smyčka mezi nápadem a jeho zhmotněním
- Nepotřebuje software, účet ani připojení
- Lidé při testování do papírového návrhu snadno sami zasáhnou

**Kreslení je myslení.**

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
p { margin-top: 1.4em; font-size: 1.4em; }
</style>

---
layout: heading-body
hideInToc: true
---

# Od slidů po kódovací agenty

- **Co už máte v počítači** – PowerPoint, Keynote nebo Google Slides s odkazy mezi snímky
- **Wireframy** – Balsamiq
- **Webové editory** – Framer, Webflow, WordPress
- **Figma** – pořád standard pro návrh rozhraní
- **Prototypování s AI** – Lovable, Bolt, v0, Figma Make
- **Kódovací agenti** – Claude Code, Cursor, Codex, GitHub Copilot

<style>
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>

---
layout: heading-body
hideInToc: true
---

# Prototypování s AI

- Aplikace z Lovable vypadá hotově od první minuty a lidé na ni reagují opatrně
- Hodí se ve chvíli, kdy už víte, co chcete ověřit
- Na první průzkum nápadů volte spíš nižší věrnost

AI vyrobí prototyp rychle a působivě. Záměr a otázku, kterou má prototyp zodpovědět, si ale musíte promyslet sami.

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
p { margin-top: 1.2em; }
</style>

---
layout: section-break
hideProgress: true
---

# Úvod do testování

Prototyp stavíte právě pro něj

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Co je uživatelské testování

::left::

- Člověk z cílové skupiny plní s prototypem několik úkolů a nahlas říká, co si myslí
- Díváte se, kde váhá, tápe a ztrácí se
- To, co lidé dělají, váží víc než to, co o prototypu říkají
- Testujte brzy a opakovaně, dokud je oprava levná
- Think-a-loud protocol – "Co se vám honí hlavou?"

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<img :src="asset + 'testovani-papiroveho-prototypu.jpg'" alt="Pohled shora na kavárenský stolek: papírový prototyp aplikace s ručně kreslenými obrazovkami, nad ním ruce účastníka testování, vedle šálky kávy a limonáda" class="ut-photo" />

<div class="ut-caption">Uživatelské testování papírového prototypu</div>

<style>
.col-left li { margin-top: 0.5em; margin-bottom: 0.5em; }
.ut-photo { width: 100%; height: auto; display: block; }
.ut-caption { font-size: 0.68em; opacity: 0.62; margin-top: 0.6rem; line-height: 1.35; }
</style>

---
layout: heading-body
hideInToc: true
---

# Jak testování připravit

1. Ujasněte si, co chcete zjistit
2. Určete, koho potřebujete, a začněte shánět lidi
3. Připravte úkoly, které nenapovídají řešení
4. Napište si scénář
5. Rozdělte si role
6. Zařiďte souhlas s nahráváním
7. Vyzkoušejte si to nanečisto
8. Hned po sezení si zapište dojmy

<style>
li { margin-top: 0.15em; margin-bottom: 0.15em; }
</style>

---
layout: heading-body
hideInToc: true
---

# Stačí pět lidí?

- Podle Jakoba Nielsena najde pět testujících zhruba 85 % problémů. Sám radí spíš tři kola po pěti lidech než jeden velký test.
- Ve studii CUE-2 Rolfa Molicha testovalo Hotmail devět týmů. Našly 310 problémů a tři čtvrtiny z nich našel jen jeden tým.
- Pětka je rozumné minimum pro jedno kolo. Testujte víckrát.

<div class="credit">Jakob Nielsen, <a href="https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/">Why You Only Need to Test with 5 Users</a> (NN/g, 2000); Robert Hoekman, <a href="https://alistapart.com/article/the-myth-of-usability-testing/">The Myth of Usability Testing</a> (A List Apart)</div>

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
.credit { font-size: 0.68em; opacity: 0.6; margin-top: 1.2rem; line-height: 1.35; }
</style>

---
layout: heading-body
hideInToc: true
---

# Lidi na testování shánějte hned

- Nábor trvá týdny, někdy i měsíce
- Začněte, jakmile víte, kdo vaším problémem trpí, i když ještě nevíte, co přesně budete testovat
- Kdo začne týden před termínem, skončí u spolubydlících a kamarádů

*Proper Preparation Prevents Poor Performance.*

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
p { margin-top: 1.4em; opacity: 0.75; }
</style>

---
layout: section-break
hideProgress: true
hide: true
---

# Designové principy

První dvě sady, víc na pátém setkání

---
layout: two-column
ratio: "60-40"
hideInToc: true
hide: true
---

# Normanových sedm principů

::left::

Klasika designu z roku 1988. Norman v ní vysvětluje, proč některé věci ovládáme bez přemýšlení a u jiných se zasekneme.

- **Zjistitelnost** – dá se poznat, co s věcí jde udělat
- **Zpětná vazba** – okamžitá odpověď na to, co člověk udělal
- **Koncepční model** – jak si člověk vysvětluje, jak věc funguje
- **Afordance** – co s věcí jde udělat
- **Signifikátory** – znamení, která afordanci ukazují
- **Mapování** – z rozmístění ovladačů je jasné, co ovládají
- **Omezení** – pravidla, která vedou ke správné akci

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<img :src="asset + 'norman-doet-cover.jpg'" alt="Obálka knihy The Design of Everyday Things: žlutá obálka s červenou konvicí, ze které stoupá pára" class="cover" />

<div class="credit">Obálka knihy Dona Normana <a href="https://jnd.org/books/the-design-of-everyday-things-revised-and-expanded-edition/"><em>The Design of Everyday Things</em></a>, revidované vydání (2013), sken z <a href="https://openlibrary.org/isbn/9780465050659">Open Library</a></div>

<style>
.col-left p { margin-bottom: 0.6em; }
.col-left li { margin-top: 0.2em; margin-bottom: 0.2em; }
.cover { height: 21rem; width: auto; display: block; margin: 0 auto; box-shadow: 0 0.4rem 1.2rem rgb(0 0 0 / 0.18); }
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 0.7rem; line-height: 1.35; }
</style>

---
layout: two-column
ratio: "60-40"
hideInToc: true
hide: true
---

# Dobrá služba podle Lou Downe

::left::

Patnáct principů vzniklo v roce 2018 ze zkušeností Lou Downe s designem služeb pro britskou vládu. Podrobně je rozebírá kniha *Good Services* (2020).

Dobrá služba

- umožní člověku dokončit to, kvůli čemu přišel,
- dá se snadno najít,
- nemá slepé uličky,
- je použitelná pro všechny stejně,
- nevyžaduje předchozí znalosti,
- když je potřeba, snadno se dostanete k živému člověku.

Než začnete prototypovat, vyberte si pár principů, které se na váš projekt hodí.

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<img :src="asset + 'downe-15-principu.jpg'" alt="Červený plakát The 15 principles of good service design s patnácti očíslovanými principy" class="poster" />

<div class="credit">Šest z <a href="https://loudowne.com/2018/06/14/15-principles-of-good-service-design/">15 principů dobré služby</a> Lou Downe (2018). Plakát <a href="https://good.services/shop/p/15-principles-of-service-design-a2-poster">Good Services</a>, design Daly Lyon</div>

<style>
.col-left li { margin-top: 0.1em; margin-bottom: 0.1em; }
.col-left p { margin-top: 0.6em; margin-bottom: 0.4em; }
.col-left ul { margin-top: 0; margin-bottom: 0; }
.poster { height: 21rem; width: auto; display: block; margin: 0 auto; }
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 0.7rem; line-height: 1.35; }
</style>

---
layout: homework
hideInToc: true
---

# Odevzdání do 8. 10.

- **Zarámujte problém, který chcete v týmu řešit.** Vyberte si jeden ze tří canvasů – NHS, 5W1H nebo jobs to be done – a vyplňte jej.
- Opírejte se o rozhovory a rešerši a data, která máte k dispozici. Není cílem mít data pro všechna pole.
- Jeden z vás nahraje canvas do odevzdávárny, přidejte ke canvasu taky jména všech členů vašeho týmu.
- Jeden člověk za každý tým napíše příspěvek do Teams a přidá aspoň tři otevřené otázky pro ostatní.
- Každý z vás odpoví aspoň jednomu jinému týmu na jednu z jejich otázek.

---
layout: heading-body
hideInToc: true
---

# Tři canvasy na výběr

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="cv-grid">
  <div class="cv">
    <img :src="asset + 'canvas-nhs.png'" alt="Canvas Problem statement podle NHS: pole Pozadí a kontext, V čem je problém, Jaký to má dopad, Data, na kterých stavíme, a checklist dobrého problem statementu" />
    <p><strong>NHS</strong> – když máte data a chcete problém vyprávět jako krátký příběh</p>
  </div>
  <div class="cv">
    <img :src="asset + 'canvas-jtbd.png'" alt="Canvas Jobs to be done: čtyři síly push, pull, habit a anxiety, sloupec Data, na kterých stavíme, a dole věta Když…, potřebuju…, abych…" />
    <p><strong>Jobs to be done</strong> – když vás zajímá, kam se lidé chtějí posunout a co je drží u starého</p>
  </div>
</div>

<p class="cv-where">Třetí je 5W1H z dnešního cvičení. Všechny tři najdete v osnově u druhého setkání v části Práce na projektu do příště. Nutně je využít nemusíte pokud dokážete problém dostatečně zarámovat jinak.</p>

<style>
h1 { margin-bottom: 0.6em !important; }
.cv-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.6rem; max-width: 50rem; }
.cv img { width: 100%; height: auto; display: block; border: 1px solid #d3dce7; }
.cv p { font-size: 0.8em; line-height: 1.4; margin-top: 0.6em; }
.cv-where { margin-top: 1em; font-size: 0.92em; }
</style>


---
layout: heading-body
hideInToc: true
---

# Příště: ideační techniky

- **15. 10.** – techniky na generování nápadů a stavební kameny vašeho prvního prototypu

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
