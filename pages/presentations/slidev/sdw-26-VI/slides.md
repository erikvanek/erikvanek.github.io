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
sessionTitle: Design critique, business case, prezentace
date: 26. 11. 2026
transition: slide-left
mdc: true
shader: false
hideInToc: true
---

<!--
**Úvod <span style="white-space:nowrap">18:00–18:05 (1/2)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Dnes nás čeká

- **Testování** – jak to šlo?
- **Design critique** – motivace, přístup a cvičení
- **Business case a storytelling**
- **Instrukce pro závěrečné prezentace**

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
h1 { margin-bottom: 0.45em !important; }
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>

<!--
**Úvod <span style="white-space:nowrap">18:00–18:05 (2/2)</span>**

<br/>

🛑 **Nejpozději 18:05 končí úvod.**
-->

---
layout: heading-body
hideInToc: true
---

# Testování

<div class="qs">
  <div class="q">Jaké to pro vás bylo a co vás nejvíc překvapilo?</div>
</div>

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
.qs { margin-top: 0.6em; }
.q {
  font-size: 1.6em;
  font-weight: 700;
  margin: 0.55em 0;
}
</style>

<!--
**Debrief testování <span style="white-space:nowrap">18:05–18:20 (2/3)</span>**
-->

---
layout: heading-body
hideInToc: true
clicks: 8
---

# Střípky z úkolů

<script setup>
const asset = import.meta.env.BASE_URL
// Each item is a quote (string) or an image ({ img, alt }).
const quotes = [
  'Mezi hlavní zjištění patří nedostatečná smysluplnost prototypu v případě prvního přidání fotky, kdy si **respondentka nejdříve myslela**, že má přidat fotku sebe místo bytu',
  '„takže jestli chcete, **aby to lidi zaklikli a necítili se jako red flag**, tak bych to možná přepsala, protože mě by se na to nechtělo kliknout“',
  { img: 'stripky-graf-pokladna.png', alt: 'Sloupcový graf: časy úkolů v současné pokladně a v redesignu, u posledního úkolu 3:55 proti 1:16' },
  'Hlavním zjištěním bylo, že některé klíčové funkce respondent nedokázal použít',
  'pochopila úkoly, ale nedokázala předem říct, co se s nimi bude pak dít',
  '„To nejde vylosovat vše najednou? To se mi nechce překlikávat pořád.“',
  'čekající úkoly pochopila a a sama na ně poukázala, ale nechapala proč je tam nula',
  '“I already help a lot of people through Whatsapp, so why not do it here?”',
  'Zároveň by ocenila, **keby bol stav rezervovanej knihy odlíšený červenou farbou**, nielen tučným písmom',
]
// Inline Markdown in the quotes: **bold**, *italic*.
const md = (t) => t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>")
</script>

<div class="stack">
  <div v-for="(q, i) in quotes" :key="i" class="card" :class="{ long: typeof q === 'string' && q.length > 120, pic: typeof q !== 'string' }"
    :style="i < $clicks
      ? { zIndex: 20, opacity: 0, transform: 'translate(45%, -2%) rotate(10deg) scale(1.02)' }
      : { zIndex: 10 - (i - $clicks), opacity: (i - $clicks) > 3 ? 0 : 1, transform: `translate(${-(i - $clicks) * 12}%, ${(i - $clicks) * 3}%) rotate(${(i - $clicks) === 0 ? 0 : -(i - $clicks) * 4}deg) scale(${1 - (i - $clicks) * 0.06})` }">
    <img v-if="typeof q !== 'string'" :src="asset + q.img" :alt="q.alt" />
    <blockquote v-else v-html="md(q)" />
  </div>
</div>

<style>
.stack { position: relative; height: 404px; margin: -10px 0 0 150px; }
.card {
  position: absolute; top: 6px; left: 0; right: 0; margin: 0 auto; width: 620px; height: 368px;
  border-radius: 18px; overflow: hidden; background: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 40, 0.25);
  display: flex; align-items: center; justify-content: center;
  padding: 2.2rem 2.6rem; box-sizing: border-box;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease-out;
}
.card blockquote {
  margin: 0; padding: 0; border: 0; background: none;
  font-size: 30px; line-height: 1.3; font-weight: 400; color: var(--muni-black);
}
.card.long blockquote { font-size: 25px; }
.card.pic { padding: 1.4rem; }
.card.pic img { width: 100%; height: 100%; object-fit: contain; display: block; }
</style>

<!--
Úryvky z odevzdaných zpráv, ke každému krátký komentář. Klik přenese další úryvek navrch.

<br/>

**Debrief testování <span style="white-space:nowrap">18:05–18:20 (3/3)</span>**

<br/>

🛑 **Nejpozději 18:20 končí debrief testování.**
-->

---
layout: section-break
---

# Design critique

<!--
**Úvod do critu <span style="white-space:nowrap">18:20–18:30 (1/10)</span>**
-->

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Design crit/critique

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Další z formátů pro **sběr zpětné vazby a nápadů**
- Neexistuje jediný správný formát
  - V rámci týmu nebo s uživateli
  - Online X osobně
  - Asynchronně X synchronně
  - Hotový návrh X koncepty X varianty
- Nejvíce vás posune **pravidelnost**
  - Po každé iteraci / před vydáním nové verze / po nasbírání nové zpětné vazby 

::right::

<img :src="asset + 'gds-crit.jpg'" alt="Tři lidé u stolu nad notebookem, jeden ukazuje propiskou na obrazovku" class="fit-img" />
<div class="credit">Crit v GDS: kolegové nad rozpracovaným návrhem. <a href="https://designnotes.blog.gov.uk/2017/11/27/using-design-crits-to-improve-collaboration/">Design in government</a>, <a href="https://designnotes.blog.gov.uk/">GOV.UK blog</a></div>

<style>
.col-left li { margin-top: 0.45em; margin-bottom: 0.45em; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
</style>

<!--
**Úvod do critu <span style="white-space:nowrap">18:20–18:30 (2/10)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Mindset

- Usability testování je **evaluativní**, design critique je **spíš generativní**
  - Tj. hledáme nové perspektivy a návrhy ke zlepšení
- Otevřený, ale zároveň **strukturovaný** formát
- Důležitost přípravy
  - **Řekněte na úvod, jakou zpětnou vazbu chcete** a co teď naopak nepotřebujete
- Hledáte odpověď na otázku: „Co byste nám doporučili k…?“
- Při skupinové práci pozor na dominantní hlasy

<style>
li { margin-top: 0.45em; margin-bottom: 0.45em; }
</style>

<!--
**Úvod do critu <span style="white-space:nowrap">18:20–18:30 (3/10)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Tři druhy zpětné vazby

- Během crit uslyšíte spoustu různých komentářů
- Kniha *Discussing Design* je dělí podle toho, jak s nimi můžete pracovat dál
- Snažte se sbírat a sdílet zejména třetí typ – kritiku
- Doptáváním se můžete reakci přetvořit na kritiku

<div class="fb">
  <div class="fb-h">Druh</div>
  <div class="fb-h">Co to je</div>
  <div class="fb-h">Jak to zní</div>
  <div class="fb-type">Reakce</div>
  <div>První dojem, „gut feeling“</div>
  <div class="fb-q">„Je to zmatené.“</div>
  <div class="fb-type">Pokyn</div>
  <div>Navržená změna bez vysvětlení</div>
  <div class="fb-q">„Přidejte tam potvrzení.“</div>
  <div class="fb-type fb-key">Kritika</div>
  <div class="fb-key">Posouzení návrhu vůči cíli, ideálně včetně „protože“</div>
  <div class="fb-q fb-key">„Jestli je cílem, aby člověk porozuměl procesu, tak na kroku 3 chybí potvrzení, protože…“</div>
</div>

<style>
li { margin: 0.3em 0; }
.fb {
  display: grid;
  grid-template-columns: 7.5em 1fr 1.5fr;
  margin-top: 1em;
  font-size: 0.9em;
  line-height: 1.35;
}
.fb > div { padding: 0.45em 0.7em; border-bottom: 1px solid #c9d6e6; }
.fb-h { font-size: 0.8em; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.6; border-bottom: 2px solid var(--muni-blue, #0000dc) !important; }
.fb-type { font-weight: 700; }
.fb-q { background: #eef4fb; border-left: 4px solid var(--muni-arts-blue, #4bc8ff); }
.fb-key { font-weight: 700; }
.fb-key.fb-q { background: #d9e8fa; }
</style>

<!--
**Úvod do critu <span style="white-space:nowrap">18:20–18:30 (4/10)</span>**
-->

---
layout: two-column
ratio: "58-42"
hideInToc: true
---

# Jak crit běžně probíhá

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

1. Prezentující popíše řešený problém
2. Řekne, co jej teď zajímá a co ne
3. Krátce projde diskutovaný návrh + klíčová rozhodnutí, která za ním jsou
4. Kritici se nejdřív ptají, aby návrhu porozuměli
5. Facilitovaná diskuze a sběr nových podnětů, „stavění na nápadech ostatních“
6. Shrnutí výsledků + případně co budou další kroky
<br>
<br>
  - nahrát a přepsat průběh setkání nebo
  - poznámky píše facilitující či přísedící


::right::

<img :src="asset + 'intercom-navrhy-na-zdi.jpg'" alt="Vytištěné stránky s návrhy, diagramem toku a grafy, vylepené vedle sebe na skleněné stěně" class="fit-img" />
<div class="credit">Návrhy vylepené na zdi, připravené na crit. <a href="https://www.intercom.com/blog/running-productive-design-critiques/">Gustavs Cirulis</a>, <a href="https://www.intercom.com/blog/">Intercom</a></div>

<style>
.col-left li { margin: 0.3em 0; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
</style>

<!--
**Úvod do critu <span style="white-space:nowrap">18:20–18:30 (5/10)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Úvod a nastavení pravidel

1. Popište, jaký problém řešíte a kdo je cílová skupina
2. Popište, kde jste v procesu a úroveň detailu, která vás zajímá:
  - Hrubá skica / celkový průchod / varianty / interakční design / ...
3. Jasně rozlište, co **chcete a nechcete** řešit
4. Popište několik témat, nad kterými si lámete hlavu a jejichž zodpovězení vám teď pomůže
5. Stručně ukažte váš návrh tak, aby mu účastníci porozuměli
<style>
li { margin: 0.4em 0; }
</style>

<!--
**Úvod do critu <span style="white-space:nowrap">18:20–18:30 (6/10)</span>**
-->

---
layout: two-column
ratio: "50-50"
hideInToc: true
---
# Jak se doptávat
- Po představení návrhu přichází na řadu diskuze
- Dobrá facilitace a **kladení správných otázek** jsou klíčové pro úspěch
- Dobrou zpětnou vazbu předáte i správně položenou otázkou!
  - *"Zvažovali jste při návrhu ... ?"*
- Při prezentaci a facilitaci neobhajujte své návrhy

<br>

::left::

**Otázky pro prezentující**

- „Co by uživateli přinesla změna, kterou navrhuješ?“
- „Máš příklad nějakého produktu, kde to funguje lépe?“
- „Můžeš svůj návrh rychle načrtnout?“

::right::

**Otázky pro kritizující**

- Čeho má uživatel v tomto kroku docílit?“
- „Proč jste zvolili zrovna tuto variantu?“
- „Co tu bylo nejtěžší rozhodnout?“
<style>
.col-left li, .col-right li { margin: 0.4em 0; }
.col-left p, .col-right p { margin-bottom: 0.4em; }
</style>

<!--
**Úvod do critu <span style="white-space:nowrap">18:20–18:30 (7/10)</span>**
-->

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Intercom – silné zaměření na problém

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Řešený problém pojmenujte a srozumitelně popište
- Využijte jobs to be done, job stories, user stories, ...
  - např. *„Když…, chci…, abych…“*
- Přineste několik odlišných variant řešení a každou pojmenujte
- U každé varianty sepište, co je na ní dobré, co špatné a jaké otázky k ní máte

::right::

<img :src="asset + 'intercom-user-vs-job-story.webp'" alt="Ručně kreslená user story As a, I want to, So that: persona je označená jako irelevantní, akce jako předpoklad a celé jako příliš mnoho předpokladů" class="fit-img" style="width: 110%; margin: 0 auto;" />
<div class="credit">Formát tzv. job story pro popis problému <a href="https://www.intercom.com/blog/using-job-stories-design-features-ui-ux/">Alan Klement</a>, <a href="https://www.intercom.com/blog/">Intercom</a></div>

<!--
**Úvod do critu: příklady <span style="white-space:nowrap">18:20–18:30 (8/10)</span>**
-->

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Design crit v týmu Figmy

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Standardní průběh critu v jejich týmu
  1. Kontext řešeného problému 10–15 min
  2. Doplňující otázky účastníků 2–5 min
  3. Zpětná vazba ostatních 10 min a víc
- Na začátku popis **„jakou zpětnou vazbu hledám a jakou ne“**
- Předem řečeno, jestli se smí skákat do řeči
- Prezentující neobhajuje jednotlivá řešení, může vysvětlit důležitá rozhodnutí

::right::

<img :src="asset + 'figma-lepik-u-obrazovky.jpg'" alt="Notebook s navrhovanou obrazovkou a vedle ní žlutá poznámka kritika" class="fit-img" />
<div class="credit">Sběr zpětné vazby může probíhat přímo <a href="https://www.figma.com/blog/design-critiques-at-figma/">ve Figmě</a></div>

<style>
.col-left li { margin: 0.25em 0; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
</style>

<!--
**Úvod do critu: příklady <span style="white-space:nowrap">18:20–18:30 (9/10)</span>**
-->

---
layout: heading-body
hideInToc: true
clicks: 5
---

# Neexistuje „ten správný“ formát

<script setup>
const asset = import.meta.env.BASE_URL
const cards = [
  { img: 'stack-pivotal-vytisk.jpg', alt: 'Vytištěný návrh na zdi, poznámky kritiků nalepené přímo na něm', cap: 'Pivotal Labs: kritici lepí poznámky přímo na výtisk.', who: 'Pivotal Labs', whoUrl: 'https://blogs.vmware.com/tanzu/design-critique/', site: 'VMware Tanzu', siteUrl: 'https://blogs.vmware.com/tanzu/', rot: -4 },
  { img: 'stack-atlassian-lepiky.jpg', alt: 'Tabule se třemi sloupci co funguje, co zlepšit a otázky, plná barevných lepíků', cap: 'Atlassian: sparring, každý potichu píše lepíky do tří sloupců.', who: 'Sparring', whoUrl: 'https://www.atlassian.com/team-playbook/plays/sparring', site: 'Atlassian Team Playbook', siteUrl: 'https://www.atlassian.com/team-playbook', rot: -2 },
  { img: 'stack-gds-vytisk.jpg', alt: 'Designérka drží vytištěnou obrazovku nad stolem, ostatní se dívají a komentují', cap: 'GDS: crit day napříč úřady nad vytištěnou obrazovkou.', who: 'Jeremy Yun a Clara Greo', whoUrl: 'https://designnotes.blog.gov.uk/2019/04/08/how-a-cross-government-design-crit-day-helps-your-work/', site: 'Design in government', siteUrl: 'https://designnotes.blog.gov.uk/', rot: 3 },
  { img: 'stack-nng-zapis.jpg', fit: true, alt: 'Tabulka se zápisem critu: prezentující, návrhy, poznámky a navazující otázky', cap: 'NN/g: zápis critu v tabulce, poznámky a navazující otázky.', who: 'Design critiques', whoUrl: 'https://www.nngroup.com/articles/design-critiques/', site: 'Nielsen Norman Group', siteUrl: 'https://www.nngroup.com/', rot: 5 },
  { img: 'stack-figma-skica.jpg', alt: 'Ruka kreslí tužkou skicu obrazovky na papír', cap: 'Figma: crit nad skicou tužkou.', who: 'Noah Levin', whoUrl: 'https://www.figma.com/blog/design-critiques-at-figma/', site: 'Figma', siteUrl: 'https://www.figma.com/blog/', rot: -3 },
  { img: 'google_thinking_hats_design_sprint.jpg', fit: true, alt: 'Šest barevných klobouků, každý pro jiný druh pohledu', cap: 'Šest klobouků: celá skupina se dívá stejným pohledem.', who: 'Edward de Bono', whoUrl: 'https://www.debonogroup.com/services/core-programs/six-thinking-hats/', site: 'Nielsen Norman Group', siteUrl: 'https://www.nngroup.com/articles/facilitating-design-studio-workshop/', rot: 4 },
]
</script>

<div class="stack">
  <div v-for="(c, i) in cards" :key="c.img" class="card" :class="{ fit: c.fit }"
    :style="i < $clicks
      ? { zIndex: 20, opacity: 0, transform: 'translate(45%, -2%) rotate(10deg) scale(1.02)' }
      : { zIndex: 10 - (i - $clicks), opacity: (i - $clicks) > 3 ? 0 : 1, transform: `translate(${-(i - $clicks) * 12}%, ${(i - $clicks) * 3}%) rotate(${(i - $clicks) === 0 ? 3 : -(i - $clicks) * 4}deg) scale(${1 - (i - $clicks) * 0.06})` }">
    <img :src="asset + c.img" :alt="c.alt" />
  </div>
</div>
<Transition name="cap" mode="out-in"><div class="credit" :key="$clicks">{{ cards[$clicks].cap }} <a :href="cards[$clicks].whoUrl">{{ cards[$clicks].who }}</a>, <a :href="cards[$clicks].siteUrl">{{ cards[$clicks].site }}</a></div></Transition>

<style>
.stack { position: relative; height: 404px; margin: -10px 0 0 150px; }
.credit { position: relative; z-index: 30; text-align: center; margin-top: -6px; text-shadow: 0 0 4px #fff, 0 0 8px #fff, 0 0 12px #fff; }
.card {
  position: absolute; top: 6px; left: 0; right: 0; margin: 0 auto; width: 620px; height: 368px;
  border-radius: 18px; overflow: hidden; background: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 40, 0.25);
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease-out;
}
.cap-enter-active, .cap-leave-active { transition: opacity 0.2s ease; }
.cap-enter-from, .cap-leave-to { opacity: 0; }
.card img { width: 100%; height: 100%; object-fit: cover; display: block; }
.card.fit img { object-fit: contain; padding: 10px; box-sizing: border-box; }
</style>

<!--
**Úvod do critu: příklady <span style="white-space:nowrap">18:20–18:30 (10/10)</span>**
-->

---
layout: section-break
---

# Pojďme to vyzkoušet

<!--
**Workshop: zadání <span style="white-space:nowrap">18:30–18:31 (1/1)</span>**
-->

---
layout: two-column
ratio: "58-42"
hideInToc: true
---

# Příprava v týmech

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Vyplňte přípravný list (najdete ho v Teams)
- Cíl critu, rozsah a otázky, na které chcete odpověď
- Každý z vás pak bude projekt prezentovat sám v jiné skupině
- Mezitím vás rozdělím do dvojic/trojic

::right::

<img :src="asset + 'pripravny-list-canvas.png'" alt="" class="fit-img" style="box-shadow: 0 2px 12px rgba(0,0,0,0.15);" />

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
</style>

<!--
**Workshop: příprava <span style="white-space:nowrap">18:31–18:41 (1/3)</span>**
-->

---
layout: two-column
ratio: "58-42"
hideInToc: true
---

# Doporučená příprava

::left::

1. Popis problému, který řešíte
2. Co chcete ukazovat: celý průchod, jednu funkci, nebo varianty?
3. Co si chcete odnést?
4. Dvě až tři konkrétní otázky, na které chcete odpověď
5. Co řešit nechcete
6. Jak to ukážeme ostatním?
7. Jak si zpětnou vazbu zachytíte?
8. Chcete s ostatními něco nakreslit?

::right::

<RingTimer :minutes="10" :size="312" />

<style>
li { margin-top: 0.3em; margin-bottom: 0.3em; }
</style>

<!--
Záloha pro ty, kdo nechtějí pracovat v Google Docu. Na plátně po celou dobu přípravy.

<br/>

**Workshop: příprava <span style="white-space:nowrap">18:31–18:41 (2/3)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Rozdělení do trojic

<!--
**Workshop: přesun <span style="white-space:nowrap">18:41–18:44 (3/3)</span>**
-->

---
layout: groupwork
hideInToc: true
---
<RingTimer :minutes="36" :size="325" :rings="[{ parts: 3, label: 'Trojice' }, { parts: 2, label: 'Dvojice' }]" />

<style>
.slidev-layout.groupwork { display: flex; flex-direction: column; height: 100%; }
.ring-timer { margin-top: auto; margin-bottom: auto; }
</style>

<!--
**Workshop: crit <span style="white-space:nowrap">18:44–19:20 (1/1)</span>**

<br/>

🛑 **V 19:20 končí crit.**
-->

---
layout: heading-body
hideInToc: true
---

# Co si odnášíte zpátky do týmu?

<style>
.slidev-layout { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
.slidev-layout h1 { font-size: 2.6rem; }
</style>

<!--
**Workshop: debrief critu <span style="white-space:nowrap">19:20–19:25 (1/1)</span>**

<br/>

🛑 **Nejpozději 19:25 končí workshop.**
-->

---
layout: section-break
---

# K prezentacím

<!--
**Závěr <span style="white-space:nowrap">19:25–19:40 (1/9)</span>**
-->

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Storytelling

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Nejúčinnější způsob předání informace je příběhem
- Každý příběh má „hrdinu“, překážku a vyústění
- Nebojte se být ve sdělení osobní (obzvlášť pokud řešíte problém, který se vás dotýká)
- „Představte si, že…“
- Tip: Při stavbě příběhu začněte u jeho konce
  - Nejdřív si ujasněte, co chcete předat, pak stavějte příběh

::right::

<img :src="asset + 'lichaw-pribehovy-oblouk.png'" alt="Panáček s mečem šplhá po příběhovém oblouku: expozice, spouštěcí událost, stoupající děj, krize s drakem, vyvrcholení, rozuzlení, konec" class="fit-img" style="width: 115%; margin: 0 auto;" />
<div class="credit">Příběhový oblouk. <a href="https://rosenfeldmedia.com/books/storymapping/">Donna Lichaw</a>, <a href="https://www.uxmatters.com/mt/archives/2020/09/book-review-the-users-journey-storymapping-products-that-people-love.php">UXmatters</a></div>

<style>
.col-left li { margin-top: 0.45em; margin-bottom: 0.45em; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
</style>

<!--
**Závěr: vyprávění <span style="white-space:nowrap">19:25–19:30 (2/9)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Ke komu mluvíte?

- Hrdina či persona je člověk, kterému vaše řešení pomáhá
- Jak vypadá jeho běžný den?
- Co se jednoho dne stane, že už to tak dál nejde?
  - Tím příběh začíná, tzv. inciting incident (zápletka)
  - Vzpomeňte si na „push“ z jobs to be done
- Co mu stojí v cestě?
- Jak vypadá jeho svět, když mu vaše řešení pomohlo?

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
</style>

<!--
**Závěr: hrdina <span style="white-space:nowrap">19:25–19:30 (3/9)</span>**
-->

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Business case

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Kdo o vašem řešení rozhoduje a před jakým rozhodnutím stojí?
- Standardní formát pro popis vašeho záměru
- Měl by obsahovat:
  - Potřeby, cíle, přínosy, náklady, rizika
- Může předkládat různé varianty
- Pokud nemáte konkrétní čísla (uživatelé, příjmy…), i odhad může pomoci pro ilustraci

::right::

<img :src="asset + 'kaninsky-business-case.png'" alt="Úvod článku A design system business case and business benefits, the ultimate guide" class="fit-img" />
<div class="credit">Business case ilustrující využití design systému, <a href="https://uxdesign.cc/a-design-system-business-case-business-benefits-the-ultimate-guide-cc2e09715ab">Matěj Káninský</a></div>

<style>
.col-left li { margin-top: 0.45em; margin-bottom: 0.45em; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
.col-right img { max-height: 340px; object-fit: contain; }
</style>

<!--
**Závěr: business case <span style="white-space:nowrap">19:25–19:30 (4/9)</span>**
-->

---
layout: two-column
ratio: "60-40"
hideInToc: true
---

# Příklad: Jarmilka

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Business case, který jsem psal pro Jihomoravskou agenturu pro veřejné inovace (JINAG)
- Měl sloužit pro další investici kraje do inovací v sociálně-zdravotním sektoru
- Berte ho jako inspiraci, strukturu si přizpůsobte svému projektu
- Formát lze použít pro firmu i pro neziskovku

::right::

<img :src="asset + 'jarmilka-business-case.png'" alt="Obálka business case Jarmilka, osobní průvodkyně sociálně-zdravotní sítí" class="fit-img" />
<div class="credit"><a href="https://jinag.eu/files/2025/10/jarmilka-osobni-pruvodkyne-socialne-zdravotni-siti.pdf" target="_blank">Business case Jarmilka pro JINAG</a></div>

<style>
.col-right img { max-height: 380px; object-fit: contain; }
.col-left li { margin-top: 0.45em; margin-bottom: 0.45em; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
</style>

<!--
**Závěr: příklad business case <span style="white-space:nowrap">19:25–19:30 (5/9)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Závěrečné prezentace 10. 12.

- 100 minut / šest týmů = na každý tým cca **15 minut**
- Délka prezentace max 8–10 minut, 5–7 na otázky od ostatních
- Prezentaci mi pošlete do 16:00 téhož dne do Teams, nebo přineste notebook s HDMI
- Finální výstup odevzdejte taky do odevzdávárny ve stejném termínu
- Formát je na vás: PowerPoint, PDF, video, Figma…

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
</style>

<!--
**Závěr: organizace <span style="white-space:nowrap">19:30–19:35 (6/9)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Co by nemělo chybět

1. Srozumitelný popis řešeného problému
2. Jaké kroky jste v průběhu projektu prošli
3. Jak probíhalo uživatelské testování
4. Co jste zjistili
  - O tématu, cílové skupině, sobě, ...
5. Dokumentace – z testování, prototypování, finální podoba vašeho návrhu

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
</style>

<!--
**Závěr: obsah <span style="white-space:nowrap">19:30–19:35 (7/9)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Co mě zajímá nejvíc

- Iterace: rozdíl mezi první a druhou verzí
- Co jste se naučili během projektu a na konci
- Jste s výsledkem spokojení? Co mu ještě chybí?
- Co dál? Plánujete s tím něco, nebo končíte? Obojí je v pořádku
- Co byste dělali jinak, kdybyste začínali znovu?
<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
</style>

<!--
**Závěr: proces <span style="white-space:nowrap">19:30–19:35 (8/9)</span>**
-->
