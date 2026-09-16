---
theme: ../themes/muni-arts
title: SDW-26 I - Úvod
info: |
  Service design workshop, podzim 2026, setkání 1 (17. 9.).
  Poznámky pro prezentujícího, časový rozpočet a pořadí škrtů: SDW-26, artifacts/IO/01 Setkání 1 - Úvod/deck-01.md
  Running order, rozhodnutí a otevřené body: SDW-26, backlog/001-prep-session-1-materials.md
layout: cover
session: 1
sessionTitle: Úvod, organizace kurzu, motivace k prototypování
date: 17. 9. 2026
transition: slide-left
mdc: true
hideInToc: true
---

---
layout: section-break
class: welcome-slide
hideInToc: true
---

# Vítejte v SDW 2026

<style>
/* h1 and p are authored in this slide, so they carry its scope id and need no prefix.
   .section-body belongs to the layout component, so it only reachable through :deep(). */
.welcome-slide :deep(.section-body) { max-width: 52rem; }
.welcome-slide h1 { font-size: 5rem !important; } /* line-height now comes from the theme's global heading rule. */
.welcome-slide p { font-size: 1.6rem !important; opacity: 0.9; }
</style>

---
layout: full-image
image: /mimo-provoz-II-sdr.jpg
fit: contain
dim: false
hideInToc: true
hideProgress: true
---

<div style="position:absolute;left:37.4%;top:75.8%;transform:translate(-50%,-50%);font-size:80px;line-height:1;">🥳</div>

---
hideInToc: true
class: video-slide
background: '#000000'
hideProgress: true
---

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div style="position:absolute;top:-2px;left:-2px;right:-2px;bottom:-2px;display:flex;align-items:center;justify-content:center;background:#000000;overflow:hidden;">
  <video
    :src="asset + 'mimo-provoz.mp4'"
    autoplay loop muted playsinline
    style="height:140%;width:auto;display:block;"
  ></video>
</div>

---
layout: section-break
hideInToc: true
---

# Proto jsme tady

Aby takové věci vůbec nemusely vzniknout

---
layout: quote
author: Herbert A. Simon, The Sciences of the Artificial, 1969
hideInToc: true
---

Navrhuje každý, kdo hledá cesty, jak změnit stávající situace v situace preferované.

<div class="original">Everyone designs who devises courses of action aimed at changing existing situations into preferred ones.</div>

<style>
/* Originál pod překladem: menší a lehčí, ale pořád čitelný ze zadní řady.
   .original je napsaný tady ve slidu, takže nese scope id a sedne se na něj přímo -
   na rozdíl od .quote-body, který patří layoutu a šel by jen přes :deep(). */
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
layout: two-column
ratio: "70-30"
hideInToc: true
---

# Co jsem zač?

::left::

- Freelance designer v různých odvětvích
  - Aktuálně nejvíce jeden data/AI softwarehouse
  - Vedlejší projekty v sociálních inovacích
  - Dříve taky práce pro ministerstvo či vývoj hydroponie
- Více než dekáda v prostředí vývoje softwaru (různé role)
- Na KISKu učím třetí kurz + čerstvý absolvent DIS programu
- Design je v něčem dreamjob ❤️

Mimo to
- rád vařím a kvasím
- zajdu na koncert nebo festival
- jsem obecně rád aktivně venku

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<img :src="asset + 'erik-teaching.jpg'" alt="Erik u tabule na workshopu" style="width:100%;height:100%;object-fit:cover;display:block;" />

---
layout: heading-body
hideInToc: true
---

# Dvě praktické věci než začneme
- oslovování
- výjimky v zápisu

<style>
/* Řídký slide, vycentrovaný na výšku, ať prázdné plátno vypadá jako záměr. */
.heading-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
h1 { margin-bottom: 0.45em !important; }
p { font-size: 1.35em; opacity: 0.75; }
</style>

---
layout: two-column
ratio: "60-40"
hideInToc: true
---

# Úvodní kolečko

Abych vás trochu poznal, rád bych od každého slyšel:

1. **jméno**
2. **kde jste na své designérské cestě**
    - čtu si o tom / něco jsem vyzkoušel(a) / (částečně) mě to živí / ...
3. **jedno konkrétní očekávání** od kurzu
4. **produkt nebo službu, ke které máte silný vztah** – používáte ji pravidelně a buď ji zbožňujete, nebo vás spolehlivě vytáčí a proč?

<br>
<br>
Nechcete mluvit před ostatními? Klidně přeskočte, jen mi to pak prosím napište na Teams.

---
layout: section-break
---

# Průběh kurzu

Organizace, týmové projekty, co po vás v průběhu budu chtít

---
layout: heading-body
hideInToc: true
---

# Sedm setkání, jednou za čtrnáct dní

17\. 9. – úvod, organizace kurzu, motivace
<br>
<br>
1\. 10. – prototypování více do hloubky
<br>
<br>
15\. 10. – ideační techniky
<br>
<br>
29\. 10. – evaluace prototypů, AI v designu, produktové trio
<br>
<br>
12\. 11. – pokročilejší prototypovací techniky
<br>
<br>
26\. 11. – design critique + business case
<br>
<br>
10\. 12. – závěrečné prezentace 🔥

<style>
/* The nested lines are a supporting layer, not siblings of the dates - and
   fourteen lines only fit on one slide with the leading pulled in. */
h1 {
  margin-bottom: 0.35em !important;
}

li {
  margin-top: 0.04em;
  margin-bottom: 0.04em;
  font-size: 1.5rem;
}

ul ul {
  font-size: 0.8em;
  opacity: 0.82;
  margin-top: 0;
}
</style>

---
layout: two-column
ratio: "53-47"
hideInToc: true
---

# Komunikace v semestru + užívání AI

::left::

- **MS Teams** je preferovaný komunikační kanál
  - budu rád, když ho budete otevřeně využívat i mezi sebou
  - např. při hledání lidí do týmů
- **Konzultace se mnou v případě potřeby** – ideálně týmově a s předem nasdílenou přípravou
<br>
<br>
- **AI nástroje** používejte dle vlastního uvážení a platných univerzitních pravidel
  - Mám jedinou podmínku: u svých rozhodnutí a výstupů musíte umět vysvětlit, proč mají podobu, jakou mají

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<img :src="asset + 'muni-ai-doporuceni.png'" alt="Doporučení k využívání AI od MUNI" style="width:100%;height:22.5rem;object-fit:cover;object-position:top;display:block;border:1px solid rgba(0,0,0,0.12);" />

[Doporučení k využívání AI od MUNI](https://kvalita.muni.cz/kvalita-na-mu/kvalita-vyuky/doporuceni-k-vyuzivani-umele-inteligence-ve-vyuce)

<style>
/* Source line under the screenshot - a credit, not body copy. */
.col-right p {
  font-size: 0.75em;
  margin-top: 0.5em;
  line-height: 1.35;
}
</style>

---
layout: heading-body
hideInToc: true
---

# Týmové projekty

Tým **3–5 lidí**, ideálně 4. Téma si vybíráte sami – v interaktivní osnově jsou detailní instrukce.
- ve zkratce – **vyberte si něco, co vás vážně zajímá a ideálně i trochu štve**
- týmy ideálně utvořte do příště – nebojte se využít MS Teams kanál

Každý projekt musí splnit tři náležitosti:

1. **Doložit, že řešíte reálný problém**
- úspěšné projekty se opírají buď o existující, nebo nově nasbíraná data
2. **První pokus o řešení, otestovaný**
- testování proběhne s alespoň pěti lidmi
3. **Projít alespoň jednou iterací**
- iterace probíhá na základě výsledků testování

---
layout: heading-body
hideInToc: true
---

# Inspirace z minulého běhu

<div style="display:flex;justify-content:center;align-items:flex-start;height:calc(100% - 4.5rem);">
  <iframe
    src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7343239400803188736"
    title="LinkedIn: Service design workshop 2025 - studentské projekty"
    style="width:30rem;height:100%;border:1px solid rgba(0,0,0,0.12);"
    allowfullscreen
  ></iframe>
</div>

---
layout: heading-body
hideInToc: true
---

# Milníky a povinnosti

| **Termín** | **Co odevzdáváte** |
|---|---|
| **8. 10.** | Vyplněného canvas řešeného problému + příspěvek do Teams |
| **25. 11.** | Výsledky prvního testování (min. 5 lidí) |
| **10. 12.** | Závěrečná prezentace projektu |
| **15. 1.** | Individuální písemná reflexe |

<br>

Pro úspěšné absolvování předmětu je potřeba aktivní osobní účast **alespoň na 5 ze 7 setkáních**. Finální prezentace je jediné povinné setkání.
<br>

<style>
/* The row rules stretched the full content width while the text stopped about
   two thirds in, so the table gets an explicit width instead of filling. */
table {
  width: 68%;
}
</style>

---
layout: heading-body
hideInToc: true
---

# Co lze od kurzu reálně očekávat

- Vedení kurzu na stejné úrovni jako klientskou práci
- Většina práce probíhá v čase mezi setkáními
  - Kurz je za 5 kreditů, [1 ECTS kredit odpovídá ~ 25-30 hodinám času](https://en.wikipedia.org/wiki/European_Credit_Transfer_and_Accumulation_System)
- S vašimi návrhy budete pracovat v terénu a budete sami získávat lidi pro testování a zpětnou vazbu
- Budeme se hodně dotýkat současného dění v oboru a jak se dynamicky v posledních letech proměňuje
- Budu maximálně podněcovat vzájemné P2P a reflektivní učení
- Já od vás a vaší účasti očekávám, že jste dospělí

---
layout: section-break
---

# Nějajké otázky k průběhu a organizaci?


---
layout: section-break
---

# Existuje dobrý nebo špatný design?

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Znáte některé z nich?

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

<img :src="asset + 'nest.png'" alt="Termostat Nest Learning" style="max-height:19rem;width:auto;max-width:100%;display:block;margin:0 auto;" />

<v-click at="1">

**Nest Learning Thermostat**

</v-click>

::right::

<img :src="asset + 'nayax-onyx.png'" alt="Platební terminál Nayax Onyx" style="max-height:18rem;width:auto;max-width:90%;display:block;margin:.5rem auto;" />

<v-click at="1">

**Nayax Onyx**

</v-click>

<style>
/* Captions sit under each photo and arrive together on the first click. */
.col-left p:last-child,
.col-right p:last-child {
  text-align: center;
  margin-top: 0.8rem;
  font-size: 0.95em;
}
</style>

---
hideInToc: true
background: '#000000'
hideProgress: true
---

<div style="position:absolute;top:-2px;left:-2px;right:-2px;bottom:-2px;background:#000000;overflow:hidden;">
  <iframe
    src="https://www.youtube.com/embed/HhqD-ljcD6I?autoplay=1&amp;rel=0&amp;modestbranding=1&amp;playsinline=1&amp;color=white"
    title="Nest Learning Thermostat - produktové video"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;display:block;"
    allow="encrypted-media; picture-in-picture; fullscreen"
    allowfullscreen
  ></iframe>
</div>

---
layout: groupwork
hideInToc: true
---

# Podle čeho poznáte, že je to navržené dobře?

První společná rozehřívací aktivita. 3 kroky:
1. **Každý sám** (2 min)
    - promyslete si jednu věc, která je podle vás navržená dobře, a jednu, která ne a důvody proč
2. **Skupinky po ~ 4 lidech** (8 min)
    - projděte si k čemu jste společně došli je a hledejte společné znaky
    - zkuste společně najít odpověď na otázku "podle čeho to poznáme?"
3. **Skupinové sdílení** (10 min)
    - k čemu jste ve skupině došli?

<style>
/* Instrukce zůstávají na plátně celých dvanáct minut a čtou se z posledních řad,
   takže se text stahuje o kus dolů proti výchozí velikosti odrážek. */
h1 { font-size: 1.9rem !important; margin-bottom: 0.5em !important; }
li { margin-top: 0.3em; margin-bottom: 0.3em; }
p:last-child { margin-top: 1em; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Stejná situace, dvě různé varianty

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

<img :src="asset + 'vlak-cedule-1.jpg'" alt="Displej řazení vlaku ve Vídni, ukazuje polohu každého vozu podél nástupiště" />

Kde přesně bude stát můj vůz

::right::

<img :src="asset + 'vlak-cedule-2.jpg'" alt="Cedule na českém nádraží: cílová stanice, číslo vlaku, zpoždění 60 minut" />

Vlak má zpoždění 60 minut

<style>
.col-left img, .col-right img { width: 100%; height: auto; object-fit: contain; display: block; }
.col-left p, .col-right p { text-align: center; margin-top: 0.8rem; font-size: 0.95em; opacity: 0.8; }
h1 { font-size: 1.9rem !important; }
</style>

---
layout: heading-body
hideInToc: true
---

# Jde to i lépe

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<img :src="asset + 'berlin-board.jpg'" alt="Informační tabule na berlínském nádraží: tři vlaky vedle sebe, u každého čas, zpoždění, trasa a schéma řazení vozů podle písmen na nástupišti" class="tabule" />

---
hideInToc: true
hideProgress: true
---

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="duo">
  <div class="cell"><img :src="asset + 'terminal-2.jpg'" alt="Malý platební terminál dotypay na pultu kavárny, na displeji čitelně 58,00 Kč, zákazník k němu přikládá telefon" /></div>
  <div class="cell"><img :src="asset + 'terminal-1.jpg'" alt="Objemný terminál Fiskal Pro T6 přišroubovaný na dřevěném prkně u zdi, obsluha se k němu natahuje přes pult" /></div>
</div>

<style>
/* Stejný vzorec jako u kolejnicového slidu níž: dvě fotky přes celé plátno, bez textu.
   Obě jsou oříznuté na 8:9, tedy přesně na polovinu plátna, takže cover nic neukrajuje.
   Přetéká o 2 px přes okraje, aby na hraně nevznikl šedý vlas ze Slidevího scale transformu. */
.duo {
  position: absolute;
  top: -2px; left: -2px; right: -2px; bottom: -2px;
  display: flex;
  gap: 4px;
  background: #fff;
}
.duo .cell { flex: 1 1 0; min-width: 0; overflow: hidden; }
.duo img { width: 100%; height: 100%; object-fit: cover; display: block; }
</style>

---
hideInToc: true
hideProgress: true
---

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="duo">
  <div class="cell"><img :src="asset + 'klikatko-2.jpg'" alt="Prezentační klikátko Logitech R400 v ruce, tvarované do dlaně, dvě výrazně odlišená tlačítka dopředu a dozadu" /></div>
  <div class="cell"><img :src="asset + 'klikatko-1.jpg'" alt="Prezentační klikátko Genius v ruce, placatá symetrická destička, tlačítka stejně velká a bez hmatového rozlišení" /></div>
</div>

<style>
.duo {
  position: absolute;
  top: -2px; left: -2px; right: -2px; bottom: -2px;
  display: flex;
  gap: 4px;
  background: #fff;
}
.duo .cell { flex: 1 1 0; min-width: 0; overflow: hidden; }
.duo img { width: 100%; height: 100%; object-fit: cover; display: block; }
</style>

---
layout: quote
author: Mike Monteiro, Ruined by Design, 2019
hideInToc: true
---

Svět není rozbitý. Funguje přesně tak, jak byl navržený. A navrhli jsme ho my.

<div class="original">The world isn't broken. It's working exactly as it was designed to work. And we're the ones who designed it.</div>

<style>
/* Stejný vzorec jako u Simona: česky velkým, originál pod tím menším. */
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
layout: section-break
---

# Základní pojmy

Service design, dvojitý diamant a dva způsoby přemyšlení

---
layout: heading-body
hideInToc: true
---

# Service design? 🤔

<div class="definice">
<strong>Service design:</strong> The activity of planning and organizing a business's resources (people, props, and processes) in order to (1) directly improve the employee's experience, and (2) indirectly, the customer's experience.
</div>

**Service design vs. designing a service**

- **Service design** řeší, jak organizace něco dělá – tedy „zkušenost zaměstnance".
- **Designing a service** řeší dotykové body (touchpoints), ze kterých se skládá cesta zákazníka – tedy „zkušenost uživatele".

V kurzu se pohybujeme v obojím a nebudeme to nijak zvlášť rozlišovat.

<div class="credit">Sarah Gibbons, <a href="https://www.nngroup.com/articles/service-design-101/">Service Design 101</a> (NN/g) – mezi doporučenými zdroji v osnově</div>

<style>
/* Gibbonsova definice doslova, proto vizuálně oddělená jako citace. */
.definice {
  border-left: 4px solid var(--muni-arts-blue);
  padding-left: 1rem;
  margin: 0.2rem 0 1.4rem;
}
h1 { font-size: 1.9rem !important; margin-bottom: 0.6em !important; }
li { margin-top: 0.25em; margin-bottom: 0.25em; }
.credit { margin-top: 1.4rem; font-size: 0.75em; opacity: 0.65; }
</style>

---
layout: heading-body
hideInToc: true
---

# Dvojitý diamant

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div style="position:relative;display:inline-block;margin-top:-0.5rem;">
  <img :src="asset + 'double-diamond.png'" alt="Dvojitý diamant: problem space (Discovery) a solution space (Delivery)" style="display:block;width:38rem;height:auto;" />
  <v-click>
    <div style="position:absolute;top:0;left:0;width:50%;height:100%;background:rgba(255,255,255,0.78);"></div>
  </v-click>
</div>

<v-click>

**Tento kurz se zabývá zejména druhým diamantem.**

Problematikou prvního diamantu se někteří z vás budou zabývat v paralelním kurzu uživatelského výzkumu.

</v-click>

<div class="credit">Rámec Double Diamond formuloval britský <a href="https://www.designcouncil.org.uk/resources/the-double-diamond/">Design Council</a> (2004)</div>

<style>
h1 { font-size: 1.9rem !important; margin-bottom: 0.5em !important; }
p { font-size: 0.9em; margin-top: 0.9rem; }
.credit { font-size: 0.7em; opacity: 0.6; margin-top: 0.7rem; }
</style>

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Dva typy myšlení, které se střídají

::left::

- **Divergentní** (rozbíhavé) – generujeme co nejpestřejší paletu možností a záměrně nehodnotíme ani nekritizujeme. „Ano, a…"
- **Konvergentní** (sbíhavé) – vybíráme, porovnáváme a rozhodujeme. „Ano, ale…"

S oběma je potřeba umět pracovat a je potřeba vědět, který kdy využít.

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<img :src="asset + 'groanzone.webp'" alt="Diamant participace: introduction, divergent, emergent se zónou kvílení uprostřed, convergent, closure" class="groan" />

<div class="credit">Zóna kvílení. Diamant participace <a href="https://i2insights.org/2019/05/28/collaboration-groan-zone/">Sama Kanera</a>, kresba Carrie Kappel (2019), i2insights.org. Česky na <a href="https://futuropolis.cz/knihovna/groan-zone-zona-kvileni/">Futuropolis</a></div>

<style>
.groan { width: 100%; height: auto; display: block; }
.col-left li { margin-top: 0.4em; margin-bottom: 0.4em; }
.credit { font-size: 0.68em; opacity: 0.62; margin-top: 0.7rem; line-height: 1.35; }
</style>

---
layout: section-break
---

# Proč vůbec prototypovat

---
hideInToc: true
hideProgress: true
clicks: 2
---

<script setup>
import { watch, onUnmounted } from 'vue'
import { useSlideContext, onSlideEnter, onSlideLeave } from '@slidev/client'

const asset = import.meta.env.BASE_URL
// Slidev sám vkládá do slidu $clicks, takže se nesmí znovu deklarovat - přejmenováno na krok.
const { $clicks: krok } = useSlideContext()

// Každý snímek dostane 5 s. Časovač i šipka sahají na tentýž ref, takže
// se nemůžou rozejít: když Erik klikne dřív, odpočet se jen přenastaví na další.
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

<div class="rails">
  <div class="cell"><img :src="asset + 'ljub-4.jpg'" alt="Neopracovaný dřevěný hranol přišroubovaný závitovými tyčemi k betonové zdi venkovního schodiště, po kterém zrovna chodí lidé" /></div>
  <div class="cell" :class="{ on: $clicks >= 1 }"><img :src="asset + 'ljub-3.jpg'" alt="Stejná maketa uvnitř nádraží, provizorně uchycená vedle rozpracovaných úchytů" /></div>
  <div class="cell" :class="{ on: $clicks >= 2 }"><img :src="asset + 'zabradli-1.jpg'" alt="Hotové zábradlí o kus dál v nádraží, broušené a nalakované dřevo v čistých úchytech" /></div>
</div>

<style>
/* Celoplošně a bez textu - fotky nesou sdělení samy, mluví se přes ně.
   Přetéká o 2 px přes okraje, aby na hraně nevznikl šedý vlas ze Slidevího scale transformu. */
.rails {
  position: absolute;
  top: -2px; left: -2px; right: -2px; bottom: -2px;
  display: flex;
  gap: 4px;
  background: #fff;
}
/* Každá fotka má napevno svoji třetinu plátna a jenom se objeví - žádné
   přeskupování, rozměr se během slidu nemění. */
.rails .cell {
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
}
.rails .cell:nth-child(2),
.rails .cell:nth-child(3) {
  opacity: 0;
  transition: opacity 600ms ease;
}
.rails .cell.on { opacity: 1; }
.rails img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>

---
layout: heading-body
hideInToc: true
---

# Prototyp je nástroj, jak se něco dozvědět

- Každý prototyp odpovídá na jednu konkrétní otázku
- Podstatou prototypování je získávat poznání, ne vytvářet artefakty
- Čím dřív něco někomu dáte k užívání tím rychleji se dozvíte, jak dál

Tenhle přístup má svoje jméno – **research through design**. Poznání vzniká tím, že něco navrhnete a pustíte to mezi lidi k užívání. Tímto přístupem dnes postupuje hodně AI-first produktových týmů. O jeho (ne)výhodách si povíme později.

<div class="credit">Zimmerman, Forlizzi a Evenson: <a href="https://arl.human.cornell.edu/879Readings/Research%20through%20Design.pdf">Research Through Design as a Method for Interaction Design Research in HCI</a> (CHI 2007)</div>

<style>
.credit { font-size: 0.7em; opacity: 0.6; margin-top: 1.1rem; }
</style>

---
layout: homework
hideInToc: true
---

# Do příště, tedy do 1. 10.

- **Domluvte se na týmu** – 3 až 5 lidí, ideálně 4.
    - Pokud nikoho neznáte a hledáte lidi do týmu – použijte MS Teams
- **Vyberte si rámcově téma** – stačí tematický okruh

Kritéria, rychlý test náměty kdybyste neměli žádná vlastní témata jsou detailněji rozebrány v osnově.

---
layout: heading-body
hideInToc: true
---

# Příště: prototypování více do hloubky

- **Věrnost prototypu** – od skici po klikatelný prototyp a co s tím udělala AI
- **Principy interakčního designu**, které použijete rovnou při stavění
- **Nástroje** – co si vybrat podle toho, co zrovna potřebujete zjistit
- **Úvod do testování prototypů**
- Na konec **rámování problému** – jak z „něco tu nefunguje" udělat zadání. Na to bude navazovat první "ostrý" úkol.

---
layout: section-break
hideInToc: true
---

# Co se vám honí hlavou?

---
layout: section-break
hideInToc: true
---

# Díky a pěkný večer!
