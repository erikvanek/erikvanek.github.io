---
theme: ../themes/muni-arts
title: SDW-26 V - Pokročilejší prototypování, AI a role designéra
publicPath: /sdw-26/V/
info: |
  Service design workshop, podzim 2026, setkání 5 (12. 11.).
  Podklady, časový rozpočet a pořadí škrtů: SDW-26, artifacts/IO/05 Setkání 5 - Pokročilejší prototypování, AI a role designéra/deck-05.md
  Running order, rozhodnutí a otevřené body: SDW-26, backlog/029-build-session-5-deck.md
  Obrázky a jejich licence: SDW-26, artifacts/IO/05 Setkání 5 - Pokročilejší prototypování, AI a role designéra/img/CREDITS.md
layout: cover
session: 5
sessionTitle: Pokročilejší prototypování, AI a role designéra
date: 12. 11. 2026
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
layout: section-break
hideInToc: true
hideProgress: true
shader: true
---

# Design je dnes docela šílený

---
layout: heading-body
hideInToc: true
---

# Dnes nás čeká

- **Trendy** – kam se posouvá role designéra
- **Koncepty, které pomáhají** – od řemesla po MVP
- **AI v práci designéra** – od vibe codingu po MCP
- **Workshop** – prototypujeme s AI
- **Další témata** – skilly, GitHub a jeho workflow
- **Úkol do příště**

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
h1 { margin-bottom: 0.45em !important; }
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>

---
layout: section-break
---

# Trendy

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Produktové trio

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- [Mezioborový tým](https://www.producttalk.org/2024/06/product-trios/), který rozhoduje, co dává smysl tvořit, a zároveň to tvoří
- **Produktová manažerka** hlídá žádoucnost a životaschopnost
- **Designér** hlídá použitelnost
- **Vývojářský tým** hlídá proveditelnost
- Za etiku a za celek [odpovídají všichni tři společně](https://www.producttalk.org/responsibility-in-a-product-trio/)

::right::

<img :src="asset + 'torres-trio-rizika.png'" alt="Tři překryvné kruhy Desirable, Viable a Feasible a kolem nich pět otázek: Does anyone want it? Should we build it? Can we build it? Usable: Can anyone use it? Ethical: Is there any potential harm?" class="fit-img" />

<div class="credit">Rizika, za které každý člen tria odpovídá</div>

<style>
.col-left li { margin: 0.45em 0; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
</style>

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Každý je dnes "builder"

::left::

- ~~Designér opraví kód, vývojář navrhne obrazovku a produktový manažer zvládne obojí~~ <br>každý dělá tak trochu od každého něco
- [Johan Rydberg](https://confidence.spotify.com/blog/the-product-builder) (Spotify): „builder is someone who operates across the full product loop, from idea generation to experiment interpretation“
- V [týmu Claude Code](https://www.lennysnewsletter.com/p/head-of-claude-code-what-happens) v Anthropicu programuje každý, i designéři a produktoví manažeři

::right::

<div class="big-q">Generalist vs specialist?</div>

<style>
.col-left li { margin: 0.45em 0; }
.big-q { font-size: 1.5em; font-weight: 700; color: var(--muni-blue, #0000dc); line-height: 1.25; margin: 0.4em 0 0.8em; }
</style>

---
layout: heading-body
hideInToc: true
---

# AI na vzestupu

- Mluvit v roce 2026 o AI je trochu jako mluvit v roce 2010 o internetu
- Já to vidím tak, že AI zesiluje dovednosti, které už máte
  - Investujte do základních principů a znalostí, abyste věděli "co od AI chcete"
- Nový software nevytvoří AI sama, ale [lidé, kteří ji používají](https://www.oreilly.com/radar/the-end-of-programming-as-we-know-it/) jako další svou schopnost
- Výroky firem, které AI vyrábějí, berte se zrnkem soli
  - např. *"U nás už AI tvoří 100% kódu"* nebo *"Tenhle nástroj AI vytvoří za den"*

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Klesá cena produkce kódu

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Funkční prototyp dnes postaví i člověk, který neprogramuje
- [Studie Anthropicu](https://www.anthropic.com/research/labor-market-impacts): u programátorů Claude pokrývá 75 % úkolů
- Počítačové profese by AI teoreticky pokryla z 94 %, reálně je to 33 %
- Podobnou mezeru mají odvětví jako třeba umění či média
::right::

<img :src="asset + 'anthropic-pokryti-uloh-ai.jpg'" alt="Paprskový graf pokrytí pracovních úkolů AI podle skupin povolání, modrá plocha teoretických možností je u většiny skupin mnohem větší než červená plocha skutečného používání" class="fit-img radar" />

<div class="credit">Teoretické a skutečné pokrytí úkolů AI, <a href="https://www.anthropic.com/research/labor-market-impacts">od Anthropic</a>, březen 2026</div>

<style>
.col-left li { margin: 0.45em 0; }
.radar { max-height: 25rem; width: auto; margin: 0 auto; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Levný kód má i stinnou stránku

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Drahý kód dřív fungoval jako [filtr](https://emilkowal.ski/ui/friction-as-a-feature) – než se něco vytvořilo, muselo se to promyslet
- S AI tenhle filtr mizí, úsudek o tom, co stojí za postavení, ale potřebujete dál
- [Martin Fowler](https://martinfowler.com/articles/is-quality-worth-cost.html): zanedbaná kvalita kódu zdražuje každou další úpravu
  - Vzniká z toho [technický dluh](https://martinfowler.com/bliki/TechnicalDebt.html), který se dříve nebo později ukáže – a čím později, tím bolestivěji

::right::

<img :src="asset + 'ai-slop-landing-page.png'" alt="Typická landing page z AI: tmavé pozadí s fialovým přechodem, nadpis Supercharge your workflow with AI-powered magic, emoji v ikonách, pět hvězdiček a tři zaoblené karty s kartami uvnitř" class="fit-img slop" />

<style>
.col-left li { margin: 0.45em 0; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
.slop { max-height: 22rem; width: auto; margin: 0 auto; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Junioři to mají na trhu těžší

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Trh práce v UX se podle [NN/g](https://www.nngroup.com/articles/state-of-ux-2026/) od konce roku 2024 stabilizuje
- Seniorní a generalistické role se ale zotavují rychleji, juniorních míst je pořád málo a je o ně velký boj
- **Můj názor:** kdo rozumí principům, zná základní výzkumné a návrhové koncepty, z trhu nevypadne a AI mu může i pomoct

::right::

<img :src="asset + 'nng-ai-horska-draha.png'" alt="Kreslená horská dráha AI ve 20. letech: strmé kopce AGI Hype, Magic Demo a Everyone Add Chatbots, prudké pády Layoffs, AI Fatigue a Over-Promise, za cedulí Stabilization se trať uklidní a vozík míří k rozcestníku plnému otazníků" class="fit-img" />

<div class="credit">Horská dráha AI ve 20. letech. <a href="https://www.nngroup.com/articles/state-of-ux-2026/">Kate Moran a kol.</a>, <a href="https://www.nngroup.com/">Nielsen Norman Group</a></div>

<style>
.col-left li { margin: 0.5em 0; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
</style>

---
layout: heading-body
hideInToc: true
---

# Baví vás od nástupu AI práce víc, nebo míň?

<div class="poll">
  <div class="role">Inženýři</div>
  <div class="bars">
    <div class="line"><div class="bar more" style="width: 72.2%"></div><span>72,2 %</span></div>
    <div class="line"><div class="bar less" style="width: 10.7%"></div><span>10,7 %</span></div>
  </div>
  <div class="role">Produktoví manažeři</div>
  <div class="bars">
    <div class="line"><div class="bar more" style="width: 70.2%"></div><span>70,2 %</span></div>
    <div class="line"><div class="bar less" style="width: 11.1%"></div><span>11,1 %</span></div>
  </div>
  <div class="role">Designéři</div>
  <div class="bars">
    <div class="line"><div class="bar more" style="width: 55%"></div><span>55,0 %</span></div>
    <div class="line"><div class="bar less" style="width: 18.2%"></div><span>18,2 %</span></div>
  </div>
</div>

<div class="legend"><span class="sw more"></span> baví víc <span class="sw less"></span> baví míň</div>

- Tři ankety [Lennyho Rachitského](https://x.com/lennysan/status/2020266745722991051) na síti X (únor 2026), odpovídali hlavně jeho sledující

<style>
h1 { font-size: 1.9rem !important; }
.poll { display: grid; grid-template-columns: 12rem 1fr; gap: 0.8rem 1rem; align-items: center; margin-top: 0.2em; }
.poll .role { font-weight: 700; }
.poll .bars { display: flex; flex-direction: column; gap: 0.25rem; }
.poll .line { display: flex; align-items: center; gap: 0.5rem; }
.poll .bar { height: 1.2rem; max-width: 80%; }
.poll .line span { font-size: 0.85em; }
.more { background: var(--muni-blue, #0000dc); }
.less { background: var(--kisk-yellow, #f2d45c); }
.legend { margin: 0.7em 0 0.4em; font-size: 0.85em; display: flex; align-items: center; gap: 0.4rem; }
.legend .sw { display: inline-block; width: 1.2em; height: 0.9em; margin-left: 0.8em; }
.legend .sw:first-child { margin-left: 0; }
</style>

---
layout: section-break
hideInToc: true
hideProgress: true
shader: true
---

# A jak to máte vy?

Jste první generace, která do designu vstupuje rovnou s AI

---
layout: section-break
---

# Koncepty, které pomáhají

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Vkus a řemeslo

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- S AI se tvoří rychleji, [péče o detail a kvalita úsudku](https://linear.app/now/why-is-quality-so-rare) je o to důležitější
- Vkus [roste se znalostí oboru](https://paulgraham.com/taste.html)
- Samotné slovo vkus je ale [dost vágní](https://www.linkedin.com/pulse/thoughts-design-ai-jiri-jerabek-gt73e/), užitečnější je mluvit o konkrétních rozhodnutích
- Úsudek se dá trénovat, zkuste si [Train Your Judgement](https://emilkowal.ski/ui/train-your-judgement)

::right::

<img :src="asset + 'opticky-stred-play.png'" alt="Dvě černá kolečka s bílým trojúhelníkem play. Vlevo je trojúhelník vycentrovaný podle rámečku a zdá se posunutý doleva, vpravo je posunutý k optickému středu a působí vycentrovaně" class="fit-img play" />

<div class="credit">Geometrický a optický střed. <a href="https://bjango.com/articles/opticaladjustments/">Marc Edwards</a>, <a href="https://bjango.com/">Bjango</a></div>

<style>
.col-left li { margin: 0.4em 0; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
.play { max-height: 16rem; width: auto; margin: 0 auto; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Typografie a paleta s pravidly

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Z brand manuálu potřebujete paletu s pravidly a typografickou škálu
- Každá barva má svůj účel a správné a špatné užití
- Jedno, nanejvýš dvě písma a hierarchie z velikosti, řezu a bílého místa
- Vizuální hierarchii můžete ověřit tzv. "squint" testem a s přimhouřením očí zkontrolujete, jestli je struktura vidět i rozmazaná

::right::

<img :src="asset + 'sketchplanations-rozmazane-oci.jpg'" alt="Kreslený vtip: postavička přimhouří oči nad dvěma e-maily pod lupou s rozmazaným textem. Vlevo souvislá šedá masa označená křížkem, vpravo nadpis, odstavce a číslovaný seznam označené fajfkou" class="fit-img squint" />

<div class="credit">Squint test <a href="https://sketchplanations.com/the-blur-your-eyes-test">Jono Hey</a>, <a href="https://sketchplanations.com/">Sketchplanations</a></div>

<style>
.col-left li { margin: 0.45em 0; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
.squint { max-height: 22rem; width: auto; margin: 0 auto; }
</style>

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# CRAP: čtyři principy rozvržení

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- **Kontrast** – co má být jiné, ať je výrazně jiné
- **Opakování** – stejné prvky vypadají všude stejně
- **Zarovnání** – každý prvek je s jiným spojený neviditelnou linkou
- **Blízkost** – co k sobě patří, dejte k sobě
- Principy popsány v knize [Non designer's design book](https://www.pearson.com/en-us/subject-catalog/p/non-designer-s-design-book-the/P200000000691/9780133966343)

::right::

<img :src="asset + 'crap-principy-scott.png'" alt="Čtyři ručně kreslené ukázky: kontrast jako jeden vyšrafovaný kruh mezi prázdnými, opakování jako mřížka stejných čtverců, zarovnání jako tři řádky s ikonou a textem pod sebou, blízkost jako dvě skupiny čtverců s popisky" class="fit-img crap" />

<div class="credit">Čtyři principy CRAP, <a href="https://1018.uxui.cat/lessons/visual-design/">UX/UI 10/18</a></div>

<style>
.col-left li { margin: 0.4em 0; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
.crap { max-height: 24rem; width: auto; margin: 0 auto; }
</style>

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Laws of UX

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Principy z kognitivní psychologie, které popisují co lidé od rozhraní očekávají
- **Fittsův zákon** – hlavní tlačítko má být dost velké a snadno dostupné
- **Hickův zákon** – s počtem možností roste čas rozhodování (implikace pro počet položek v menu, ...)
- **Zeigarnik efekt** – nedokončené úkoly si pamatujeme lépe (progress bary, ...)

::right::

<div class="cards">
  <img :src="asset + 'laws-of-ux-fitts.png'" alt="Karta Fitts's Law se soustřednými kruhy jako terčem" class="c1" />
  <img :src="asset + 'laws-of-ux-hick.png'" alt="Karta Hick's Law s jedním zvýrazněným čtvercem uprostřed mřížky kruhů" class="c2" />
  <img :src="asset + 'laws-of-ux-zeigarnik.png'" alt="Karta Zeigarnik Effect se sloupcem pruhů, z nichž poslední je kratší" class="c3" />
</div>

<div class="credit">Karty zákonů <a href="https://lawsofux.com/">Laws of UX</a></div>

<style>
.col-left li { margin: 0.4em 0; }
.cards { position: relative; height: 23rem; }
.cards img { position: absolute; width: 11.5rem; border-radius: 0.5rem; box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.18); }
.cards .c1 { left: 0; top: 0; transform: rotate(-5deg); }
.cards .c2 { left: 5.5rem; top: 2.6rem; transform: rotate(2deg); }
.cards .c3 { left: 11rem; top: 5.2rem; transform: rotate(6deg); }
</style>

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Vzory a platformní guidelines

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- **Návrhové vzory** – osvědčená řešení opakujících se problémů, GOV.UK u komponenty píše, kdy ji použít a kdy ne
- **AI vzory** – třeba knihovna [The Shape of AI](https://www.shapeof.ai/)
- **Platformní guidelines**
  - [Apple HIG](https://developer.apple.com/design/human-interface-guidelines)
  - [Material Design 3](https://m3.material.io/)
  - [Fluent 2](https://fluent2.microsoft.design/)
  - Web vlastní nemá

::right::

<img :src="asset + 'govuk-radios.png'" alt="Stránka komponenty Radios s ukázkou otázky Where do you live a oddíly When to use this component a When not to use this component" class="fit-img shot" />

<div class="credit"><a href="https://design-system.service.gov.uk/components/radios/">Příklad komponenty z GDS design systému</a></div>

<style>
.col-left li { margin: 0.4em 0; }
.shot { max-height: 26rem; width: auto; margin: 0 auto; border: 1px solid #ddd; }
</style>

---
layout: heading-body
hideInToc: true
---

# Designové systémy a komponentové knihovny

- [shadcn/ui](https://ui.shadcn.com/) – kód komponent si zkopírujete do projektu, de facto standard dneška, i když trochu nudný
- [GitHub Primer](https://primer.style/) – střídmý, počítá s hustými obrazovkami plnými dat
- [GOV.UK Design System](https://design-system.service.gov.uk/) a [Design systém gov.cz](https://designsystem.gov.cz/) – důraz na přístupnost a u komponent popsaný výzkum
- Kde komponenty nestačí, pomůžou designové principy, třeba [principy GOV.UK](https://www.gov.uk/guidance/government-design-principles)

<style>
h1 { font-size: 1.9rem !important; }
li { margin-top: 0.45em; margin-bottom: 0.45em; }
</style>

---
layout: heading-body
hideInToc: true
---

# shadcn/ui

<script setup>
const asset = import.meta.env.BASE_URL
</script>

- Kód komponent si zkopírujete do projektu a upravíte ho podle sebe
- S AI nástroji ho potkáte hned, proto spousta vygenerovaných aplikací vypadá podobně

<img :src="asset + 'shadcn-ukazky.png'" alt="Ukázky komponent shadcn/ui: tlačítka, pole formuláře, přepínače, sloupcový graf, formulář pro nový cíl, QR kód, navigační seznamy a okno chatu" class="fit-img shot" />

<div class="credit">Ukázky komponent. <a href="https://github.com/shadcn-ui/ui">shadcn</a>, <a href="https://ui.shadcn.com/">shadcn/ui</a></div>

<style>
li { margin-top: 0.3em; margin-bottom: 0.3em; }
.shot { max-height: 17rem; width: auto; margin: 0.7em auto 0; border: 1px solid #ddd; }
</style>

---
layout: two-column
ratio: "40-60"
hideInToc: true
---

# Radix Themes

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Hotové celé bloky: nastavení notifikací, ceník, platební karta, faktura
- Barvy, zaoblení i velikost písma přepnete pro celou aplikaci najednou
- Než začnete kreslit vlastní komponentu, podívejte se, jestli ji už někdo nevyřešil

::right::

<img :src="asset + 'radix-themes-ukazky.png'" alt="Ukázky postavené z Radix Themes: nastavení notifikací s přepínači, ceník se třemi tarify, firemní platební karta, potvrzení zaplacené faktury a detail faktury" class="fit-img shot" />

<div class="credit">Ukázky komponent. <a href="https://github.com/radix-ui/website">WorkOS</a>, <a href="https://www.radix-ui.com/themes">Radix Themes</a></div>

<style>
.col-left li { margin: 0.5em 0; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
.shot { max-height: 24rem; width: auto; margin: 0 auto; border: 1px solid #ddd; }
</style>

---
layout: two-column
ratio: "40-60"
hideInToc: true
---

# Atomic design

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Skládání rozhraní si půjčuje metaforu z biologie
- Tlačítko je atom, vyhledávací formulář molekula a hlavička webu organismus
- Šablona rozmístí organismy bez obsahu, stránka je šablona naplněná obsahem

::right::

<img :src="asset + 'atomic-design-instagram-frost.png'" alt="Obrazovka Instagramu rozložená do pěti sloupců: ikony a popisky jako atomy, skupiny prvků jako molekuly, příspěvek jako organismus, šablona se zástupným obrázkem a hotová stránka s fotkou psa" class="fit-img insta" />

<div class="credit">Atomic design na příkladu Instagramu. <a href="https://atomicdesign.bradfrost.com/chapter-2/">Brad Frost</a>, <a href="https://atomicdesign.bradfrost.com/">Atomic Design</a></div>

<style>
.col-left li { margin: 0.45em 0; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
.insta { max-height: 24rem; width: auto; margin: 0 auto; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Přístupnost od prvního náčrtu

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Naše [schopnosti se během života mění](https://mitpress.mit.edu/9780262539487/mismatch/), každý z nás jednou narazí na rozhraní, které mu nesedí
- Typy omezení
  - Trvalé
  - Dočasné
  - Situační
- Návrh pro člověka s jednou rukou poslouží i rodiči s miminkem v náručí

::right::

<img :src="asset + 'persona-spectrum.png'" alt="Mřížka dvanácti postav: pro dotek, zrak, sluch a řeč vždy trvalé, dočasné a situační omezení, například jedna ruka, zraněná ruka a rodič s miminkem" class="fit-img" />

<div class="credit">Persona spectrum. <a href="https://inclusive.microsoft.design/articles/inclusive-101-guidebook">Microsoft Design</a>, <a href="https://inclusive.microsoft.design/">Inclusive Design</a></div>

<style>
.col-left li { margin: 0.5em 0; }
</style>

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Dark patterns

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Rozhraní, která záměrně obracejí kognitivní zkratky proti lidem
- Desítky příkladů najdete na [deceptive.design](https://www.deceptive.design/)
- **Nerovná volba u cookies** – francouzský úřad CNIL za ni pokutoval Google a Facebook
- **Těžké zrušení** – objednáte jedním kliknutím, rušíte přes řadu překážek
- **Falešná naléhavost** – odpočet času, který tlačí k rychlému nákupu

::right::

<img :src="asset + 'dark-patterns-cmglee.png'" alt="Vyskakovací okno: odpočet do konce slevy, zbývá jen pět kuponů, oranžové tlačítko pro registraci, 67 přátel se už přihlásilo, šedý odkaz I'm boring and like paying full price a zaškrtnuté políčko s dvojitým záporem o marketingových e-mailech" class="fit-img dark" />

<div class="credit">Vyskakovací okno plné dark patterns. <a href="https://commons.wikimedia.org/wiki/File:Dark_patterns_example.svg">Cmglee</a>, <a href="https://commons.wikimedia.org/">Wikimedia Commons</a></div>

<style>
.col-left li { margin: 0.4em 0; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
.dark { max-height: 22rem; width: auto; margin: 0 auto; border: 1px solid #ddd; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# A když chcete prosadit změnu?

- může pomoci systémový design
- tvořit obrazovky je fajn, problém se ale často schovává hlouběji
<br>
<br>

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

<img :src="asset + 'model-ledovce.jpg'" alt="Ledovec rozdělený na čtyři vrstvy: nad hladinou události, pod hladinou vzorce, struktury a nejhlouběji mentální modely" class="fit-img sys" />

<div class="credit"><a href="https://sketchplanations.com/the-iceberg-model">Iceberg model</a></div>

::right::

<img :src="asset + 'model-dvou-smycek-commonland.png'" alt="Diagram dvou smyček: horní oblouk dominantního systému s průkopníky, ochránci a hospicovou prací se láme ke smrti a kompostu, dolní oblouk vznikajícího systému roste od propojených průkopníků přes komunity praxe k systému vlivu" class="fit-img sys" />

<div class="credit"> <a href="https://commonland.com/how-the-berkana-two-loops-model-guides-us-through-system-change/">Two loops model</a></div>


<style>
.sys { max-height: 15rem; width: auto; margin: 0 auto; }
li { margin: 0.5em 0; }
</style>

---
layout: two-column
ratio: "45-55"
hideInToc: true
---

# MVP

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- **Minimum viable product** – nejmenší verze, která lidem přinese hodnotu hned od začátku
- Každý krok jde použít, i když toho umí málo
- Další funkce přidáváte po iteracích podle zpětné vazby

::right::

<img :src="asset + 'kniberg-making-sense-of-mvp.png'" alt="Kresba: horní řada staví auto po dílech, kola, podvozek, karoserie, a zákazník je pořád nespokojený; dolní řada jde od skateboardu přes koloběžku a kolo k autu a zákazník je spokojený čím dál víc" class="fit-img" />

<div class="credit">Making sense of MVP. <a href="https://blog.crisp.se/2016/01/25/henrikkniberg/making-sense-of-mvp">Henrik Kniberg</a>, <a href="https://blog.crisp.se/">Crisp</a></div>

<style>
.col-left li { margin: 0.5em 0; }
</style>

---
layout: section-break
---

# AI v práci designéra

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Od vibe codingu k agentic engineering

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- **Vibe coding** – ["vizuálně programujete" a na kód úplně zapomenete](https://x.com/karpathy/status/1886192184808149383), skvělá hračka na tvorbu prototypů
- **Agentic engineering** – [víc práce předem](https://addyosmani.com/blog/new-sdlc-vibe-coding/), každá další funkce pak stojí míň
- Ten rozdíl je důležitý pokud chcete tvořit něco dlouhodoběji

::right::

<img :src="asset + 'ai-osmani-krivky-nakladu.jpg'" alt="Graf celkových nákladů v čase: křivka vibe codingu začíná nízko a pak prudce stoupá, křivka agentic engineering začíná výš a zplošťuje se, v bodě protnutí stojí vibe coding na funkci třikrát až desetkrát víc" class="fit-img" />

<div class="credit">Náklady vibe codingu a agentic engineering v čase. <a href="https://addyosmani.com/blog/new-sdlc-vibe-coding/">Addy Osmani a kol.</a>, <a href="https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding">Kaggle</a></div>

<style>
.col-left li { margin: 0.45em 0; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
</style>

---
layout: two-column
ratio: "45-55"
hideInToc: true
---

# Claude Cowork jako příklad

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- V lednu 2026 vydal Anthropic Claude Cowork, který zpřístupňuje Claude Code i lidem, kteří neprogramují
- Stavba [trvala zhruba deset dní](https://www.lennysnewsletter.com/p/head-of-claude-code-what-happens) a [kód napsal skoro celý Claude Code](https://x.com/bcherny/status/2010815545495495111)
  - Deseti dnům předcházely týdny, možná měsíce prototypování (to už často status na sítích neřekne)

::right::

<img :src="asset + 'claude-cowork-kroky.jpg'" alt="Přepínač Chat a Cowork s kurzorem na Cowork. Vlevo výběr složky Meeting Transcripts, uprostřed postup úkolu: přečíst přepisy schůzek a vytáhnout hlavní body je odškrtnuté, čeká najít úkoly, zkontrolovat Google Calendar a připravit deck na standup. Vpravo kontext: složka s přepisy, soubory SKILL.md, pptx-patterns.md, css.md a Claude in Chrome" class="fit-img shot" />

<div class="credit">Cowork rozkládá úkol na kroky. <a href="https://claude.com/product/cowork">Anthropic</a>, <a href="https://www.softr.io/blog/claude-code-vs-claude-cowork">Softr</a></div>

<style>
.col-left li { margin: 0.5em 0; }
.col-right { display: flex; flex-direction: column; justify-content: center; }
.shot { max-height: 22rem; width: auto; margin: 0 auto; }
</style>

---
layout: heading-body
hideInToc: true
---

# MCP

<script setup>
const asset = import.meta.env.BASE_URL
</script>

- Otevřený standard, přes který se AI připojí k dalším nástrojům a datům
- Funguje jako [USB-C port pro AI aplikace](https://modelcontextprotocol.io/docs/getting-started/intro): jeden konektor a připojíte, co potřebujete
- Já mám takhle napojené poznámky v Obsidianu, Google Drive a Paper

<img :src="asset + 'mcp-diagram.png'" alt="Diagram: vlevo AI aplikace (chat, vývojová prostředí, další AI aplikace), uprostřed MCP jako standardizovaný protokol, vpravo data a nástroje (databáze a soubory, vývojářské nástroje, Slack a Google Maps), mezi nimi obousměrné šipky" class="fit-img wide" />

<div class="credit">MCP mezi AI aplikacemi a nástroji. <a href="https://github.com/modelcontextprotocol/modelcontextprotocol">Model Context Protocol</a>, <a href="https://modelcontextprotocol.io/docs/getting-started/intro">modelcontextprotocol.io</a></div>

<style>
li { margin-top: 0.3em; margin-bottom: 0.3em; }
.wide { max-height: 12rem; width: auto; margin: 0.6em auto 0; }
</style>

---
layout: heading-body
hideInToc: true
---

# Pozor na buzzwordy

<div class="words">
  <span>vibe coding</span><span>agentic engineering</span><span>context engineering</span><span>prompt engineering</span><span>harness engineering</span><span>loop engineering</span><span>spec-driven development</span><span>…</span>
</div>

- Nové pojmy přibývají rychleji, než se ustálí
- U každého se ptejte, jakou praxi popisuje a co z ní využijete
- Třeba [context engineering](https://x.com/tobi/status/1935533422589399127) říká, že výsledek nejvíc ovlivní to, co nástroji dáte k dispozici
- Agent je zjednodušeně [model plus prostředí](https://addyosmani.com/blog/new-sdlc-vibe-coding/), ve kterém pracuje

<style>
.words { display: flex; flex-wrap: wrap; gap: 0.4rem 0.5rem; margin: 0.2em 0 0.8em; }
.words span { padding: 0.15em 0.6em; background: #eef4fb; border: 1px solid #c9d9ee; font-size: 0.85em; }
li { margin: 0.45em 0; }
</style>

---
layout: full-image
image: /claude-design-upravy.jpg
dim: false
hideInToc: true
title: Claude Design
---

<div class="dates"><strong>Claude Design</strong><br>spuštěno 17. 4. 2026, samostatná verze končí 14. 12. 2026</div>

<style>
.dates { position: absolute; top: 1.1rem; left: 1.6rem; padding: 0.55rem 1.1rem; background: rgba(0, 0, 30, 0.85); color: #fff; font-size: 1.4rem; line-height: 1.4; white-space: nowrap; }
.dates strong { font-size: 1.7rem; }
.design-credit { position: absolute; right: 1rem; bottom: 0.6rem; margin: 0; padding: 0.15rem 0.5rem; background: rgba(0, 0, 30, 0.7); color: #fff; }
.design-credit a { color: #fff; }
</style>

---
layout: groupwork
hideInToc: true
progressSection: true
---

# Workshop: spolujízda do Žiliny

<div class="box">Chcete se dostat s přítelkyní a jejím kokršpanělem do Žiliny na Slovensku na její rodinnou oslavu v pátek odpoledne s pomocí spolujízdy. Navrhněte, jak by vypadala aplikace pro hledání spolujízdy, která s tím pomůže.</div>

- Pracujete ve dvojicích
- Vyjíždíte z Brna
- Nejdřív tužka a papír, poté s Copilotem
- Pět kroků: brainstorming, náčrt na papír, prototyp s Copilotem, test, iterace

<style>
li { margin-top: 0.45em; margin-bottom: 0.45em; }
.box { margin-bottom: 0.8em; }
</style>

---
layout: groupwork
hideInToc: true
# timer: 10   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# 1 Co všechno musí aplikace zvládnout?

- Všichni společně
- Co je potřeba zvážit při návrhu?
- Zapíšu vše na tabuli
- ± 10 minut

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
</style>

---
layout: groupwork
hideInToc: true
# timer: 10   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# 2 Náčrt na papír

- Ve dvojicích, tužkou na papír
- Vyberte si z tabule témata, která chcete řešit
- Nakreslete na jeden list obrazovky od hledání spoje po rezervaci:
  - hledání
  - výsledky
  - detail jízdy
  - potvrzení
  - ...
- ± 10 minut

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
</style>

---
layout: heading-body
hideInToc: true
---

# Ukázka: od náčrtu ke kostře aplikace

- Nakreslím obrazovky na papír a vyfotím je
- Fotku dám Copilotu spolu se zadáním
- Za pár minut je z toho klikací prototyp

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
li { margin-top: 0.5em; margin-bottom: 0.5em; }
</style>

---
layout: groupwork
hideInToc: true
# timer: 10   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# 3 Prototyp s Copilotem

- Ve dvojicích na jednom počítači
- Náčrt vyfoťte a pošlete si do počítače
- Fotku dejte Copilotu spolu se zadáním, vybranými tématy a pokynem
- Když vám výsledek nesedí, rovnou iterujte
- ± 10 minut

<br>
<div class="box">Build it for me as a <b>web application</b> that can then showcase / share with my classmates via a simple link</div>

<style>
li { margin-top: 0.4em; margin-bottom: 0.4em; }
.box { margin-top: 0.8em; }
</style>

---
layout: groupwork
hideInToc: true
# timer: 15   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# 4 Test mezi dvojicemi

- S vedlejší dvojicí
- Vyzkoušejte si navzájem prototypy, nemusíte být tak „rigorózní“ jako u uživatelského testování
- Cílem je rychlá zpětná vazba, proto si zapisujte, kde se druhá dvojice ve vašem prototypu zasekne
- 15 minut na obě dvojice, po polovině se vystřídejte

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
</style>

---
layout: groupwork
hideInToc: true
# timer: 10   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# 5 Iterace?

---
layout: section-break
hideInToc: true
hideProgress: true
---

# Rozdíly oproti předchozím prototypům?

---
layout: section-break
---

# Doplňky

---
layout: heading-body
hideInToc: true
---

# Skilly

- Skill je složka s návodem, který agentovi dodá znalosti a postup pro určitý typ úkolu
- [Agent Skills](https://agentskills.io) jsou otevřený formát, stejný skill funguje v Claude Code, Copilotu i jinde
- Tři repozitáře, se kterými mám dobrou zkušenost:
  - [Emil Kowalski](https://emilkowal.ski/skill) – design rozhraní a animace
  - [Matt Pocock](https://github.com/mattpocock/skills) – malé skilly z každodenní praxe, rád používám `/grill-me`
  - [Addy Osmani](https://github.com/addyosmani/agent-skills) – celý vývoj od plánu po nasazení

<style>
li { margin-top: 0.35em; margin-bottom: 0.35em; }
</style>

---
layout: heading-body
hideInToc: true
---

# GitHub a jeho workflow

- Na [UX Monday](https://www.erikvanek.com/ux-monday-26/) jsem ukazoval, jak prototypuju vlastní nástroj na hledání bydlení
- Zadání napíšu do issue, Claude Code ho naimplementuje a layout doladím v Paperu
- Pull request zreviduje Copilot a náhled se sám nasadí na web
- Repozitář drží celou historii, takže každou změnu jde vrátit
- Velice doporučuju osahat Git a Github

<div class="box prompt">work on issue 122</div>

<style>
li { margin-top: 0.4em; margin-bottom: 0.4em; }
.prompt { font-family: ui-monospace, Menlo, monospace; display: inline-block; margin-top: 1em; }
</style>

---
layout: heading-body
hideInToc: true
---

# Ukázka: Paper a MCP

- Přes [MCP server Paperu](https://paper.design/docs/mcp) agent čte a zapisuje vaše soubory
- Z vybrané obrazovky vygeneruje kód, nebo naopak navrhne layout přímo na canvas
- [Figma](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server) má vlastní MCP server a ověření studenti ji mají zdarma tak můžete vyzkoušet

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
li { margin-top: 0.5em; margin-bottom: 0.5em; }
</style>

---
layout: heading-body
hideInToc: true
---

# Kam vložit svůj čas?

- **Investujte do technických dovedností** a naučte se základy programování,třeba napsat jednoduchá kalkulačka
- **Učte se dobře ptát** uživatelů, kolegů i AI
- **Naučte se základy řemesla** – principy, typografii, přístupnost
- Pak vám práci žádná AI nevezme

<div class="box">Kde začít s programováním? <a href="https://developer.mozilla.org/en-US/docs/Learn_web_development">Learn web development</a> od Mozilly nebo kurzy <a href="https://www.czechitas.cz/kurzy">Czechitas</a></div>

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
.box { margin-top: 1.1em; }
</style>

---
layout: homework
hideInToc: true
---

# Do příště

- Testování s **aspoň pěti lidmi** odevzdejte do **25. 11.**, doufám, že už máte domluvené testující
- Při druhé iteraci můžete využít nějaké z technik z dnešní hodiny
- Na design critique přineste klidně i první iteraci, odnesete si ale víc, když už zapracujete nějaké změny

<style>
li { margin-top: 0.45em; margin-bottom: 0.45em; }
</style>

---
layout: heading-body
hideInToc: true
---

# Příště: design critique a business case

- **26. 11.** – ukážete svůj prototyp a dostanete na něj zpětnou vazbu od ostatních týmů, jen trochu v jiném formátu než při uživatelském testování
- K tomu otevřeme téma business casu a závěrečných prezentací

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
