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
<br/>

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
  <div class="q" :class="{ past: $clicks >= 1 }"><span class="n">1</span>Jaké to pro vás bylo?</div>
  <div class="q" v-click="1" :class="{ past: $clicks >= 2 }"><span class="n">2</span>Co vás nejvíc překvapilo?</div>
  <div class="q" v-click="2"><span class="n">3</span>Jak s tím plánujete naložit?</div>
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

**Úvod do critu <span style="white-space:nowrap">18:15–18:30 (1/10)</span>**
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
  - Po každé iteraci / před vydáním nové verze / po nasbírání XY kusů nové zpětné vazby / ...

::right::

<img :src="asset + 'gds-crit.jpg'" alt="Tři lidé u stolu nad notebookem, jeden ukazuje propiskou na obrazovku" class="fit-img" />
<div class="credit">Crit v GDS: kolegové nad rozpracovaným návrhem. <a href="https://designnotes.blog.gov.uk/2017/11/27/using-design-crits-to-improve-collaboration/">Design in government</a>, <a href="https://designnotes.blog.gov.uk/">GOV.UK blog</a></div>

<style>
.col-left li { margin-top: 0.45em; margin-bottom: 0.45em; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
</style>

<!--
<br/>

**Úvod do critu <span style="white-space:nowrap">18:15–18:30 (2/10)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Mindset

- Usability testování je **evaluativní**, design critique je **spíš generativní**
  - Tj. hledáme nové perspektivy a nápady
- Otevřený formát, ale zároveň **strukturované**
- Důležitost přípravy
  - **Řekněte na úvod, jakou zpětnou vazbu chcete** a co taky co teď nepotřebujete
- Hledáte odpověď na otázku: „Co byste nám doporučili k…?“
- Při skupinové práci pozor na dominantní hlasy
  - Můžete řešit např. pomocí brainwritingu

<style>
li { margin-top: 0.45em; margin-bottom: 0.45em; }
</style>

<!--
<br/>

**Úvod do critu <span style="white-space:nowrap">18:15–18:30 (3/10)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Tři druhy zpětné vazby

- Během crit uslyšíte spoustu komentářů a každý pomůže jinak
- Kniha *Discussing Design* je dělí podle toho, jak s nimi můžete pracovat dál
- Snažte se sbírat a sdílet zejména třetí typ – kritiku
  - Dobrou facilitací můžete z Reakce dostat Kritiku

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
<br/>

**Úvod do critu <span style="white-space:nowrap">18:15–18:30 (4/10)</span>**
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

1. Prezentující shrne problém, cíl a kde v procesu je
2. Řekne, co jej teď zajímá a co ne
3. Krátce projde diskutovaný návrh + klíčová rozhodnutí, které za ním jsou
4. Kritici se nejdřív ptají, aby návrhu porozuměli
5. Doptávání se, "stavění na nápadech ostatních"
5. Shrnutí výsledků + případně co budou další kroky
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
<br/>

**Úvod do critu <span style="white-space:nowrap">18:15–18:30 (5/10)</span>**
-->

---
layout: heading-body
hideInToc: true
---

# Úvod a nastavení pravidel

1. Popište jaký problém řešíte a kdo je cílová skupina
2. Popište kde jste v procesu a co chete probírat:
  - Hrubá skica X celkový průchod X varianty X interakční design X ...
3. Jasně rozliště co **chcete a nechcete** řešit
4. Popište několik témat nad kterými si lámete hlavu a jejichž zodpovězení vám teď pomůže
5. Stručně ukažte váš návrh tak, aby mu účastníci porozuměli
<style>
li { margin: 0.4em 0; }
</style>

<!--
<br/>

**Úvod do critu <span style="white-space:nowrap">18:15–18:30 (6/10)</span>**
-->

---
layout: two-column
ratio: "50-50"
hideInToc: true
---
# Jak se doptávat
- Po představení návrhu přichází na řadu diskuze
- Dobrá facilitace a **kladení správných otázek** jsou klíčové pro úspěch
- Dobrou zpětnou vazbu předáte i položením správně položené otázky!
- Při prezentaci a facilitaci dejte pozor, abyste neobhajovali své návrhy

<br>

::left::

**Otázky pro prezentující**

- „Co by uživateli přinesla změna, kterou navrhuješ?“
- „Máš příklad nějakého produktu, kde to funguje lépe?“
- „Můžeš svůj návrh rychle načrtnout?“

::right::

**Otázky pro kritizující**

- „Co má uživatel v tomto kroku udělat?“
- „Proč jste zvolili zrovna tuto variantu?“
- „Co tu bylo nejtěžší rozhodnout?“
<style>
.col-left li, .col-right li { margin: 0.4em 0; }
.col-left p, .col-right p { margin-bottom: 0.4em; }
</style>

<!--
<br/>

**Úvod do critu <span style="white-space:nowrap">18:15–18:30 (7/10)</span>**
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
- Přidejte situace uživatelů ve tvaru *„Když…, chci…, abych…“*
  - Využijte jobs to be done, job stories, user stories, ...
- Přineste několik odlišných variant řešení a každou pojmenujte
- U každé varianty sepište, co je na ní dobré, co špatné a jaké otázky k ní máte

::right::

<img :src="asset + 'intercom-user-vs-job-story.png'" alt="Ručně kreslená user story As a, I want to, So that: persona je označená jako irelevantní, akce jako předpoklad a celé jako příliš mnoho předpokladů" class="fit-img" style="width: 80%; margin: 0 auto;" />
<div class="credit">User story stojí na personě a předpokladech, job story začíná situací. <a href="https://www.intercom.com/blog/using-job-stories-design-features-ui-ux/">Alan Klement</a>, <a href="https://www.intercom.com/blog/">Intercom</a></div>

<!--
<br/>

**Úvod do critu: příklady <span style="white-space:nowrap">18:15–18:30 (8/10)</span>**
-->

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Figma: standardní crit

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Standardní průběh crit v jejich týmu
  1. Kontext řešeného problému 10–15 min
  2. Doplňující otázky účastníků 2–5 min
  3. Zpětná vazba 10 min a víc
- Na začátku popis **„jakou zpětnou vazbu hledám a jakou ne“**
- Předem řečeno, jestli se smí skákat do řeči
- Prezentující neobhajuje jednotlivá řešení, může vysvětlit důležitá rozhodnutí

::right::

<img :src="asset + 'figma-lepik-u-obrazovky.jpg'" alt="Notebook s navrhovanou obrazovkou a vedle ní žlutá poznámka kritika" class="fit-img" />
<div class="credit">Sběr zpětné vazby probíhá přímo <a href="https://www.figma.com/blog/design-critiques-at-figma/">ve Figmě</a></div>

<style>
.col-left li { margin: 0.25em 0; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
</style>

<!--
<br/>

**Úvod do critu: příklady <span style="white-space:nowrap">18:15–18:30 (9/10)</span>**
-->

---
layout: heading-body
hideInToc: true
clicks: 5
---

# Neexistuje "ten správný" formát

<script setup>
const asset = import.meta.env.BASE_URL
const cards = [
  { img: 'stack-pivotal-vytisk.jpg', alt: 'Vytištěný návrh na zdi, poznámky kritiků nalepené přímo na něm', cap: 'Pivotal Labs: kritici lepí poznámky přímo na výtisk.', who: 'Pivotal Labs', whoUrl: 'https://blogs.vmware.com/tanzu/design-critique/', site: 'VMware Tanzu', siteUrl: 'https://blogs.vmware.com/tanzu/', rot: -4 },
  { img: 'stack-atlassian-lepiky.jpg', alt: 'Tabule se třemi sloupci co funguje, co zlepšit a otázky, plná barevných lepíků', cap: 'Atlassian: sparring, každý potichu píše lepíky do tří sloupců.', who: 'Sparring', whoUrl: 'https://www.atlassian.com/team-playbook/plays/sparring', site: 'Atlassian Team Playbook', siteUrl: 'https://www.atlassian.com/team-playbook', rot: -2 },
  { img: 'stack-gds-vytisk.jpg', alt: 'Designérka drží vytištěnou obrazovku nad stolem, ostatní se dívají a komentují', cap: 'GDS: crit day napříč úřady nad vytištěnou obrazovkou.', who: 'Jeremy Yun a Clara Greo', whoUrl: 'https://designnotes.blog.gov.uk/2019/04/08/how-a-cross-government-design-crit-day-helps-your-work/', site: 'Design in government', siteUrl: 'https://designnotes.blog.gov.uk/', rot: 3 },
  { img: 'stack-nng-zapis.jpg', fit: true, alt: 'Tabulka se zápisem critu: prezentující, návrhy, poznámky a navazující otázky', cap: 'NN/g: zápis critu v tabulce, poznámky a navazující otázky.', who: 'Design critiques', whoUrl: 'https://www.nngroup.com/articles/design-critiques/', site: 'Nielsen Norman Group', siteUrl: 'https://www.nngroup.com/', rot: 5 },
  { img: 'stack-figma-skica.jpg', alt: 'Ruka kreslí tužkou skicu obrazovky na papír', cap: 'Figma: crit nad skicou tužkou.', who: 'Noah Levin', whoUrl: 'https://www.figma.com/blog/design-critiques-at-figma/', site: 'Figma', siteUrl: 'https://www.figma.com/blog/', rot: -3 },
  { img: 'stack-nng-klobouky.jpg', fit: true, alt: 'Šest barevných klobouků, každý pro jiný druh pohledu', cap: 'Šest klobouků: celá skupina se dívá stejným pohledem.', who: 'Edward de Bono', whoUrl: 'https://www.debonogroup.com/services/core-programs/six-thinking-hats/', site: 'Nielsen Norman Group', siteUrl: 'https://www.nngroup.com/articles/facilitating-design-studio-workshop/', rot: 4 },
]
</script>

<div class="stack">
  <div v-for="(c, i) in cards" :key="c.img" class="card" :class="{ fit: c.fit }"
    :style="i < $clicks
      ? { zIndex: 20, opacity: 0, transform: 'translate(40%, 8%) rotate(12deg)' }
      : { zIndex: 10 - (i - $clicks), opacity: (i - $clicks) > 3 ? 0 : 1, transform: `translate(${-(i - $clicks) * 12}%, ${(i - $clicks) * 3}%) rotate(${(i - $clicks) === 0 ? 3 : -(i - $clicks) * 4}deg) scale(${1 - (i - $clicks) * 0.06})` }">
    <img :src="asset + c.img" :alt="c.alt" />
  </div>
</div>
<div class="credit">{{ cards[$clicks].cap }} <a :href="cards[$clicks].whoUrl">{{ cards[$clicks].who }}</a>, <a :href="cards[$clicks].siteUrl">{{ cards[$clicks].site }}</a></div>

<style>
.stack { position: relative; height: 404px; margin: -10px 0 0 150px; }
.credit { text-align: center; margin-top: -6px; }
.card {
  position: absolute; top: 6px; left: 0; right: 0; margin: 0 auto; width: 620px; height: 368px;
  border-radius: 18px; overflow: hidden; background: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 40, 0.25);
  transition: transform 0.45s ease, opacity 0.45s ease;
}
.card img { width: 100%; height: 100%; object-fit: cover; display: block; }
.card.fit img { object-fit: contain; padding: 10px; box-sizing: border-box; }
@media (prefers-reduced-motion: reduce) { .card { transition: none; } }
</style>

<!--
<br/>

**Úvod do critu: příklady <span style="white-space:nowrap">18:15–18:30 (10/10)</span>**
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
