---
theme: ../themes/muni-arts
title: SDW-26 IV - Evaluace prototypů
publicPath: /sdw-26/IV/
info: |
  Service design workshop, podzim 2026, setkání 4 (29. 10.).
  Podklady, poznámky ke slidům a obrázky s kredity: SDW-26, artifacts/IO/04 Setkání 4 - Evaluace prototypů/deck-04.md a notes/2026-10-28 Podklady k decku setkání 4 - obrázky a zdroje.md
  Running order, rozhodnutí a otevřené body: SDW-26, backlog/028-build-session-4-deck.md
layout: cover
session: 4
sessionTitle: Evaluace prototypů
date: 29. 10. 2026
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

- **Jak šlo prototypování?**
- **Uživatelské testování** – jak se připravit a vést setkání
- **Tvorba testovacího scénáře**
- **Pilotní testování** – vzájemně na svých projektech
- **Další evaluační metody**
- **Úkol do příště**

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
h1 { margin-bottom: 0.45em !important; }
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>

---
layout: heading-body
hideInToc: true
---

# Jak šlo prototypování?

Krátké shrnutí za každý tým:

1. Čím jste si od minula prošli?
2. Co jste se naučili?
3. S čím v ruce přicházíte?

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
h1 { margin-bottom: 0.45em !important; }
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>

---
layout: section-break
---

# Evaluace prototypů

---
layout: heading-body
hideInToc: true
---

# Hlavní motivace pro testování

- Máte prototyp a chcete **vědět, jestli funguje tak, jak čekáte**
- Vaše myšlenky a očekávání jsou jedna věc, druhá je to, jak vaše návrhy vnímají uživatelé
- Dnes hlavně **uživatelské testování**, ostatní techniky jsou jeho obměny
  - Nejdůležitější technika k osvojení

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
h1 { margin-bottom: 0.45em !important; }
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>

---
layout: heading-body
hideInToc: true
title: Mapa výzkumných metod
---

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="figure">
<div class="map">
  <img :src="asset + 'nngroup-mapa-vyzkumnych-metod.png'" alt="A Landscape of User Research Methods: dvacet metod na osách postoje a chování, kvalitativní a kvantitativní, s doplněnými metodami RITE, fake door a five-second test" />
  <span class="ring" style="left:14.5%; top:27.5%; width:17.5%; height:6%"></span>
  <span class="ring" style="left:76%; top:13.8%; width:12.6%; height:6%"></span>
  <span class="ring" style="left:41.2%; top:64.3%; width:24.6%; height:6%"></span>
  <span class="add" style="left:15.5%; top:34.6%"><i class="mk square"></i><b>RITE</b></span>
  <span class="add" style="left:76.6%; top:32%"><i class="mk circle"></i><b>Fake door</b></span>
  <span class="add" style="left:62.8%; top:53.5%"><i class="mk diamond"></i><b>Five-second test</b></span>
</div>
<div class="credit">Mapa výzkumných metod. <a href="https://www.nngroup.com/articles/which-ux-research-methods/">Christian Rohrer</a>, <a href="https://www.nngroup.com/">NN/g</a>, modré štítky jsou doplněné</div>
</div>

<style>
.slidev-layout.heading-body { padding-top: 1.5rem; padding-bottom: 1.25rem; }
.figure { width: 38rem; margin: 0 auto; }
.map { position: relative; container-type: inline-size; }
.map img { width: 100%; height: auto; display: block; }
.ring { position: absolute; border: 4px solid #e4002b; border-radius: 50%; box-sizing: border-box; }
.add { position: absolute; display: flex; align-items: center; gap: 0.6cqw; font-size: 2.1cqw; white-space: nowrap; }
.add b { font-weight: 700; line-height: 1.3; color: #fff; background: var(--muni-blue, #0000dc); padding: 0.15em 0.5em; border-radius: 0.25em; }
/* Značky podle legendy mapy: kruh přirozené použití, čtverec použití podle scénáře, kosočtverec omezená podoba produktu */
.mk { flex: none; width: 1.6cqw; height: 1.6cqw; box-sizing: border-box; border: 1px solid rgb(0 0 0 / 0.3); }
.mk.circle { background: #99cc00; border-radius: 50%; }
.mk.square { background: #ff6666; }
.mk.diamond { background: #0099cc; transform: rotate(45deg) scale(0.85); }
</style>

---
layout: two-column
ratio: "45-55"
hideInToc: true
---

# Dobrý design vzniká iterací

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- **Iterace** je další kolo návrhu, které stojí na zjištěních z předchozích
- Nemusíte začít s něčím skvělým, stačí začít a pak opravit
- S rozvojem AI nástrojů je možné iterovat velice rychle
- Na iterativních procesech stojí tzv. agilní metodiky vývoje produktů jako např. Scrum

::right::

<img :src="asset + 'design-council-framework-for-innovation.png'" alt="Framework for Innovation: dvojitý diamant Discover, Define, Develop, Deliver s přerušovanými šipkami iterace zpátky k začátku" class="framework" />

<div class="credit">Revised Double Diamond – <a href="https://www.designcouncil.org.uk/resources/the-double-diamond/">Design Council</a></div>

<style>
.col-left li { margin-top: 0.45em; margin-bottom: 0.45em; }
.framework { max-height: 22.5rem; width: auto; max-width: 100%; display: block; margin: 0 auto; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Průběh uživatelského testování

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="box">Cílem je zjistit <strong>jak se uživatelům váš návrh používá a jak mu rozumí</strong></div>

::left::

- Uživatelé procházejí prototypem
- Dáváte jim úkoly, které s jeho pomocí mají splnit
- Testujete individuálně
- Aktivně se doptáváte a děláte si poznámky
- Doporučuju setkání nahrát (alespoň zvuk), záznam přepsat + si psát poznámky "bokem"

::right::

<img :src="asset + 'jarmilka-testovani-3.jpg'" alt="Účastník testu ukazuje prstem na papírový prototyp Jarmilky, pohled přes stůl od facilitátora" class="fit-img" />

<div class="credit">Testování papírového prototypu Jarmilky</div>

<style>
.col-left li { margin-top: 0.3em; margin-bottom: 0.3em; }
.col-right .fit-img { max-height: 19.5rem; width: auto; max-width: 100%; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Úvod sezení

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

Přečtěte ho doslova, nebo si napište pár bodů:

1. Kdo jste
2. Proč tu účastník je
3. Jak bude sezení probíhat
4. Souhlas s nahráváním
6. Kdykoli se může zeptat i skončit
5. Prosba o "sdílení nahlas"

<div class="box"><strong>Cíl:</strong> co nejvíc psychologického bezpečí</div>

::right::

<div class="box"><strong>„Testujeme prototyp, ne vás.“</strong></div>

<img :src="asset + 'jarmilka-testovani-2.jpg'" alt="Sezení nad papírovým prototypem shora" class="fit-img photo" />

<style>
.col-left p { margin-bottom: 0.3em; }
.col-left li { margin: 0.2em 0; }
.col-left .box { margin: 1.5em -1rem 0 0; white-space: nowrap; }
.col-right .box { margin: 0 0 0.8em; }
</style>

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Testovací scénář

::left::

- Úkoly, které má účastník pomocí prototypu provést
- Zadejte situaci v níž se nachází a cíl, kterého mají dosáhnout
- Raději zadejte méně úkolů a nechte si více času na pozorování a doptávání se
- Scénář testování je pro vás klíčová pomůcka, abyste **nemuseli přemýšlet nad tím, co zrovna říkat a mohli se soustředit na poslouchání a pozorování**

::right::

<div class="box"><strong>Návodně</strong><p>„Klikněte na Řazení vlaku a najděte svůj vůz.“</p></div>

<div class="box"><strong>Nenávodně</strong><p>„Máte místenku ve voze 7 a vlak přijede za pět minut. Ukažte mi, kam se na nástupišti postavíte.“</p></div>

<style>
.col-left li { margin: 0.4em 0; }
.col-right .box:first-child { margin-top: 0; opacity: 0.7; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Pozvánka k testování

::left::

- Rozhodněte se jestli on-line nebo osobně
  - On-line snazší logisticky, získáte však méně non-verbálních informací

**Kde získávat lidi?**

- Cold call, kamarád kamaráda, metoda "sněhové koule"
- V B2B přes zákazníky a partnery
- Placení účastníci
- Facebookové skupiny, zájmové aktivity, nástěnky na univerzitě, ...

::right::

<div class="box">„Dávám vám možnost spolu-tvořit to, na čem pracuji, abyste z toho v budoucnu mohli mít užitek.“</div>

<style>
.col-left p { margin: 0.6em 0 0.2em; }
.col-left li { margin: 0.2em 0; }
.col-right { display: flex; align-items: center; }
.col-right .box { margin: 0; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Připravte se

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

Připravte všechno, co pro setkání potřebujete:

<ul class="checklist">
  <li>Prototyp, který chcete testovat</li>
  <li>Připravený scénář testování</li>
  <li>Potvrzení místa a času s účastníkem</li>
</ul>

<br>
<h3>Doplňkové položky</h3>

<ul class="checklist">
<li>Zařízení pro nahrávání zvuku</li>
  <li>Šablona na poznámky</li>
  <li>Papírový souhlas s nahráváním</li>
  <li>Dohoda o mlčenlivosti</li>
</ul>


::right::

<img :src="asset + 'jarmilka-design-crit.jpg'" alt="Papírový prototyp asistenta Jarmilka s poznámkami k menu, krokům wizardu a ovládání" class="fit-img" />

<div class="credit">Papírový prototyp pro testování</div>

<style>
.col-left p { margin-bottom: 0.3em; }
.col-right .fit-img { width: calc(100% + 1.75rem); max-width: none !important; }
.checklist { list-style: none; padding-left: 0; margin: 0.2em 0 0; }
.checklist li { position: relative; padding-left: 1.6em; margin: 0.3em 0; }
.checklist li::before { content: ""; position: absolute; left: 0; top: 0.25em; width: 0.9em; height: 0.9em; border: 2px solid var(--muni-blue, #0000dc); border-radius: 0.15em; }
</style>

---
layout: two-column
ratio: "60-40"
hideInToc: true
---

# Think aloud protokol

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Do hlavy účastníkovi nevidíte, tak ho poprosíte, ať říká, co se v nich odehrává
- Uslyšíte, jak rozhraní rozumí a jaký mu rozumí
- Usability test je o tom pochopit, jak lidé rozumějí tomu, co jste vytvořili
<br/>
<br/>
- *"Můžete se mnou nahlas sdílet co se ve vás u jednotlivých obrazovek odehrává?"*

<div class="box">„Nerozumím textu v bublině Jarmilky. Pojem časová perspektiva je hodně abstraktní.“</div>

<div class="credit">Citát účastnice z testování</div>

::right::

<img :src="asset + 'krug-dont-make-me-think.jpg'" alt="Obálka knihy Steva Kruga Don't Make Me Think, Revisited" class="cover" />

<div class="credit">Kniha Steva Kruga o tom, jak lidé opravdu používají rozhraní, <a href="https://sensible.com/dont-make-me-think/">sensible.com</a></div>

<style>
.col-left li { margin: 0.35em 0; }
.cover { max-height: 21rem; width: auto; max-width: 100%; display: block; }
</style>

---
layout: two-column
ratio: "45-55"
hideInToc: true
---

# Spojení testování s výzkumem

::left::

- Lze spojit dohromady – obzvlášť když je náročné získat ty správné lidi
- Úvodní rozhovor ověří profil účastníka
- Pokud nesplňuje profil, můžete setkání zkrátit
- Případně využít jako výzkumný rozhovor

::right::

<svg viewBox="0 0 460 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rozhodovací diagram: krátký rozhovor, pak otázka, jestli účastník odpovídá profilu. Ne vede k výzkumnému rozhovoru, nebo k ušetření času, ano vede k prototypu." class="flow">
  <defs>
    <marker id="fl-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#0000dc" />
    </marker>
  </defs>
  <g fill="none" stroke="#0000dc" stroke-width="3">
    <rect x="120" y="5" width="220" height="54" rx="6" />
    <path d="M230 94 L350 150 L230 206 L110 150 Z" fill="#eef4fb" />
    <rect x="5" y="245" width="210" height="70" rx="6" />
    <rect x="245" y="245" width="210" height="70" rx="6" fill="#0000dc" />
    <path d="M230 59 L230 92" marker-end="url(#fl-arrow)" />
    <path d="M110 150 L110 243" marker-end="url(#fl-arrow)" />
    <path d="M350 150 L350 243" marker-end="url(#fl-arrow)" />
  </g>
  <g style="font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 21px" text-anchor="middle">
    <text x="230" y="40">Krátký rozhovor</text>
    <text x="230" y="157" style="font-weight: 700; font-size: 19px">Odpovídá profilu?</text>
    <text x="96" y="200" text-anchor="end" style="font-size: 18px">Ne</text>
    <text x="364" y="200" text-anchor="start" style="font-size: 18px">Ano</text>
    <text x="110" y="274">Výzkumný rozhovor,</text>
    <text x="110" y="300">nebo ušetřit čas</text>
    <text x="350" y="287" fill="#fff" style="font-weight: 700">Ukázat prototyp</text>
  </g>
</svg>

<style>
.col-left li { margin: 0.45em 0; }
.flow { width: 100%; height: auto; display: block; }
</style>

---
layout: heading-body
hideInToc: true
title: Jarmilka - matice zjištění
---

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="matrix">
<div class="overview">
<div class="axis">Vysoký dopad na uživatelky</div>
<div class="board">
<img :src="asset + 'jarmilka-matice-celek.png'" alt="Celá matice zjištění ze studie Jarmilka, osy dopad na uživatelky a náročnost změny" />
<span class="axis hard">Náročná<br/>změna</span>
<span class="axis easy">Snadná<br/>změna</span>
<img :src="asset + 'jarmilka-matice-shluky.svg'" alt="" class="loops on-overview" />
</div>
<div class="axis">Nízký dopad na uživatelky</div>
</div>
<div class="detail">
<img :src="asset + 'jarmilka-matice-kvadrant.png'" alt="Detail kvadrantu s vysokým dopadem a snadnou změnou, čtyři shluky zjištění zakroužkované červeně" />
<img :src="asset + 'jarmilka-matice-shluky.svg'" alt="" class="loops on-detail" />
</div>
</div>

<style>
.slidev-layout.heading-body { padding: 1rem 1.25rem 1.5rem; }
.matrix { display: flex; gap: 1rem; align-items: center; justify-content: center; height: 100%; }
.overview { flex: 1; min-width: 0; }
.board, .detail { position: relative; }
.board img, .detail img { display: block; }
.board img { width: 100%; height: auto; }
.detail { flex: none; }
.detail img { height: 31rem; width: auto; }
/* jarmilka-matice-shluky.svg is drawn in the detail shot's pixels (934x850) with 24px of room
   around it; the overview shows the same quadrant at 0.51x, offset by (445, 16.4) of 924x876 */
.board img.loops, .detail img.loops { position: absolute; max-width: none; }
.loops.on-detail { left: -2.5696%; top: -2.8235%; width: 105.139%; height: 105.647%; }
.loops.on-overview { left: 46.835%; top: 0.475%; width: 54.201%; height: 52.281%; }
.axis { font-size: 0.8rem; font-weight: 700; color: #0000dc; text-align: center; line-height: 1.15; margin: 0.2em 0; }
.board .axis { position: absolute; margin: 0; }
.hard { left: 1%; top: 54%; text-align: left; }
.easy { right: 0.5%; bottom: 51.5%; text-align: right; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Jarmilka: čtyři zjištění

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

1. Vizuální přehlcení
2. Nejednotný a místy příliš technický jazyk
3. Nesrozumitelná navigace mezi kroky
4. Důvěryhodnost nástroje
<br/>
<br/>

<div class="box">„Dostala jsem se do jinýho módu a nevím co se tady po mně chce, není vybudovaná důvěra takže mám strach psát citlivý věci.“</div>

::right::

<div class="page"><img :src="asset + 'jarmilka-studie-zjisteni.jpg'" alt="Strana studie Jarmilka se zjištěními a zakroužkovanými místy v papírovém prototypu" /></div>

<div class="credit">Strana 11 <a href="https://www.erikvanek.com/case-studies/jarmilka/uzivatelska-studie-Jarmilka.pdf">studie Jarmilka</a></div>

<style>
.col-left li { margin: 0.3em 0; }
.page { height: 22rem; overflow: hidden; border: 1px solid #ddd; }
.page img { width: 100%; height: auto; display: block; }
</style>

---
layout: section-break
hideInToc: true
hideProgress: true
---

# Máte teď nějaké dotazy?

---
layout: groupwork
hideInToc: true
progressSection: true
---

# Tvorba testovacího scénáře

- **Celý tým**, výstup je scénář na jednen papír nebo digitálně
- 4 kroky:
  1. Výzkumné otázky
  2. Úvod k setkání
  3. Úkoly pro testující
  4. Doplňující otázky 

**Následně scénáře napříč týmy budete pilotně testovat**

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
</style>

---
layout: groupwork
hideInToc: true
# timer: 5   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# 1 Výzkumné otázky

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="halves">
<div>

- Vezměte svůj zarámovaný problém a prototyp
- Napište 1–3 otázky nebo předpoklady o lidech, na které má test odpovědět

<div class="box">

- Pomůže nový návrh lidem se po příjezdu vlaku lépe zorientovat?
- Najdou lidé svůj sektor dřív, než vlak přijede?
- Věří lidé údaji o sektoru natolik, aby se podle něj postavili?

</div>
</div>
<div>
<br/>
<img :src="asset + 'vlak-razeni-viden.jpg'" alt="Displej řazení vlaku ve Vídni, ukazuje polohu každého vozu podél nástupiště" class="fit-img" />
</div>
</div>

<style>
li { margin-top: 0.3em; margin-bottom: 0.3em; }
.halves { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: start; }
.halves ul:first-child { margin-top: 0; }
.halves .box { font-size: 0.85em; }
.halves .box ul { margin: 0.2em 0 0.4em; }
</style>

---
layout: groupwork
hideInToc: true
# timer: 8   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# Testovací úkoly

- 2–3 úkoly, které účastníka provedou prototypem
- Zadejte situaci a cíl, kterého má dosáhnout

<div class="box tasks">

1. „Zítra ráno jedete v 7:40 z Brna do Prahy. Zjistěte, ze které koleje vlak pojede.“
2. „Máte místenku ve voze 7 a vlak přijede za pět minut. Ukažte mi, kam se na nástupišti postavíte.“
3. „Jedete s kolem a místenku nemáte. Najděte, kde na nástupišti počkat, abyste to měli k vozu pro kola co nejblíž.“
4. „Jedete z Olomouce do Hradce Králové a v Pardubicích máte na přestup šest minut. Připravte se tak, abyste ho stihli.“

</div>

<style>
li { margin-top: 0.4em; margin-bottom: 0.4em; }
.tasks { font-size: 0.85em; }
.tasks ol { margin: 0.2em 0; padding-left: 1.4em; }
.tasks li { margin: 0.3em 0; }
</style>

<!--
1 Rozjezd: najde účastník spojení a detail vlaku? Testuje základní navigaci.
2 Jádro: použije údaj o poloze vozu bez nápovědy, kde ho hledat?
3 Bez místenky: rozumí typům vozů a jejich poloze na nástupišti?
4 Přestup pod tlakem: napadne ho sám vybrat vůz u schodů? Ukazuje, jestli funkci bere jako svou.
-->


---
layout: groupwork
hideInToc: true
# timer: 5   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# 3 Doplňující otázky a úvod

- 2–3 otázky na konec, které vám pomůžou pochopit účastníka a jeho kontext
- Nakonec třeba kouzelná hůlka: „Kdyby aplikace na nástupišti uměla cokoli, co by to bylo?“
- Pár bodů úvodu: kdo jste, ať mluví nahlas, „testujeme prototyp, ne vás“

<style>
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>

---
layout: groupwork
hideInToc: true
progressSection: true
# timer: [8, 8]   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# Pilot: tým testuje tým

- **Dvojice týmů**, otestujete se navzájem
- Druhý tým vám půjčí **jednoho účastníka**
- U vás **facilitátor** vede sezení podle scénáře a **zapisovatel** píše, co účastník dělá a říká
- Ostatní se dívají a mlčí
- Pak se týmy prohodí

<style>
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>

---
layout: groupwork
hideInToc: true
# timer: 3   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# Po pilotu ve svém týmu

- Co účastník udělal jinak, než jste čekali?
- Co změníte ve scénáři?
- Co změníte v prototypu, než s ním půjdete ven?

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
progressSection: true
---

# Co jste zjistili?

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Za každý tým jeden člověk: jedna věc, kterou jste viděli, a co s ní uděláte
- Zjištění pak seřaďte podle dopadu a úsilí, jako minule nápady
- Pořádnou syntézu uděláte doma

::right::

<img :src="asset + 'jarmilka-prioritizace.jpg'" alt="Papíry a lepicí lístky s otázkou, jaký je nejmenší workflow s nejméně rozptýlením" class="fit-img" />

<div class="credit">Jarmilka: co patří do nejmenšího workflow</div>

<style>
.col-left li { margin: 0.5em 0; }
</style>

---
layout: section-break
---

# Další evaluační metody

Obměny usability testu, o kterých je dobré vědět

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# RITE

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- **Rapid Iterative Testing and Evaluation**
- Prototyp opravujete hned mezi sezeními, jakmile je problém jasný
- Po dnešním pilotu můžete prototyp malou i velkou úpravou opravit, než s ním půjdete ven
- Jak AI iteraci zrychluje, uvidíme příště

<div class="credit">Postup RITE popisuje třeba <a href="https://handbook.gitlab.com/handbook/product/ux/ux-research/rite/">GitLab Handbook</a></div>

::right::

<div class="page"><img :src="asset + 'jarmilka-studie-overeni-navrhu.jpg'" alt="Strana studie Jarmilka: testování s pěti lidmi, změny návrhu po prvním a třetím testu" /></div>

<div class="credit">Jarmilka: změny po prvním a třetím testu, strana 9 <a href="https://www.erikvanek.com/case-studies/jarmilka/uzivatelska-studie-Jarmilka.pdf">studie</a></div>

<style>
.col-left li { margin: 0.4em 0; }
.page { height: 22rem; overflow: hidden; border: 1px solid #ddd; }
.page img { width: 100%; height: auto; display: block; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Testovat se dá i dlouhý text

::left::

**Metodická příručka SDS**

Obsah dlouhého dokumentu jsme testovali ve třech kolech.

::right::

**Metodika ze Sovie**

Nástroje pro pracovníky služeb a předpenitenciární péči jsme upravovali podle zpětné vazby, zhruba podle RITE.

<style>
.col-left p, .col-right p { margin-top: 0.4em; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# A/B/n testování a SUS

::left::

**A/B/n testování**

- Dvě a víc variant téhož, každý člověk dostane jednu
- V živém produktu měříte chování, třeba kolik lidí dokončí objednávku
- V malém testu vidí každý obě varianty, polovina nejdřív A, druhá nejdřív B

::right::

**System Usability Scale (SUS)**

- Deset výroků, odpovědi na škále 1–5, skóre 0–100
- Kvantitativní, s pár lidmi ale jen orientační
- Hodí se na srovnání staré a nové verze

<div class="credit">System Usability Scale. <a href="https://web.archive.org/web/20250126084800/https://uxpajournal.org/sus-a-retrospective/">John Brooke</a></div>

<style>
.col-left p, .col-right p { margin-bottom: 0.2em; }
.col-left li, .col-right li { margin: 0.3em 0; }
</style>

---
layout: heading-body
hideInToc: true
---

# Sovia: A/B test dopisu se SUS

<div class="fields">

- **Iniciativa** – Sovia, podpora lidí mezi odsouzením a nástupem do výkonu trestu
- **Co se testovalo** – úřední dopis Výzva k nástupu výkonu trestu, platné znění (A) a přepsaná verze (B)
- **Co jsme chtěli zjistit** – jestli přepsanému dopisu lidé rozumějí líp
- **Jak** – každý účastník četl obě verze, pořadí se střídalo, po každé verzi vyplnil SUS
- **Co zatím vidíme** – přepsaná verze vychází lépe u většiny účastníků

</div>

---
layout: two-column
ratio: "45-55"
hideInToc: true
---

# Nielsenovy heuristiky

::left::

- Levná evaluace, kterou zvládnete i bez uživatelů
- Projdete rozhraní podle deseti pravidel a zapíšete, kde je porušuje
- S uživateli je to lepší

<div class="credit">Deset heuristik <a href="https://www.nngroup.com/articles/ten-usability-heuristics/">Jakoba Nielsena</a>, <a href="https://www.nngroup.com/">NN/g</a></div>

::right::

<ol class="heur">
  <li>Viditelnost stavu systému</li>
  <li>Shoda se skutečným světem</li>
  <li>Kontrola a svoboda uživatele</li>
  <li>Konzistence a standardy</li>
  <li>Prevence chyb</li>
  <li>Rozpoznat je lepší než si vybavovat</li>
  <li>Flexibilita a efektivita</li>
  <li>Estetický a minimalistický design</li>
  <li>Pomoc s rozpoznáním a nápravou chyb</li>
  <li>Nápověda a dokumentace</li>
</ol>

<style>
.col-left li { margin: 0.4em 0; }
.heur { font-size: 0.85em; margin: 0; padding-left: 1.6em; }
.heur li { margin: 0.12em 0; line-height: 1.3; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Nejlepší fake door test vůbec

<div class="box"><strong>Fake door test:</strong> nabídnete něco, co ještě neexistuje, a měříte, kolik lidí o to stojí</div>

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

<img :src="asset + 'cesky-sen-davy.jpg'" alt="Dav lidí jde k fasádě hypermarketu Český sen" class="fit-img" />

<div class="credit">Český sen. Film <a href="https://cs.wikipedia.org/wiki/%C4%8Cesk%C3%BD_sen">Víta Klusáka a Filipa Remundy</a>, <a href="https://commons.wikimedia.org/wiki/File:%C4%8Cesk%C3%BD_sen_davy.jpg">Wikimedia Commons</a></div>

::right::

<img :src="asset + 'cesky-sen-fasada.jpg'" alt="Fasáda hypermarketu na lešení, za ní tráva a bouřková obloha" class="fit-img" />

<div class="credit">Český sen. Film <a href="https://cs.wikipedia.org/wiki/%C4%8Cesk%C3%BD_sen">Víta Klusáka a Filipa Remundy</a>, <a href="https://commons.wikimedia.org/wiki/File:%C4%8Cesk%C3%BD_sen_bou%C5%99e.jpg">Wikimedia Commons</a></div>

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Fake door test: Sousedské dětské skupiny

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

<div class="fields">

- **Iniciativa** – Sousedské dětské skupiny, nová služba domácí péče o malé děti, pilot s MPSV
- **Co se testovalo** – web služby, která ještě neexistovala, ve dvou verzích: pro pečující a pro rodiče
- **Co jsme chtěli zjistit** – jestli o službu stojí lidé, kteří by ji provozovali, i rodiče
- **Co jsme zjistili** – o domácí péči je velký zájem, hlavně u rodičů dětí se specifickými potřebami

</div>

::right::

<div class="stack">
  <img :src="asset + 'sds-fake-door-pecujici.png'" alt="Landing page Sousedských dětských skupin pro pečující" />
  <img :src="asset + 'sds-fake-door-rodice.png'" alt="Landing page Sousedských dětských skupin pro rodiče" />
</div>

<style>
.stack { position: relative; height: 22.5rem; }
.stack img { position: absolute; width: 90%; height: auto; border: 1px solid #ccc; box-shadow: 0 0.3rem 0.8rem rgb(0 0 0 / 0.18); }
.stack img:first-child { top: 0; left: 0; }
.stack img:last-child { top: 7.9rem; right: 0; }
</style>

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Simulace služby: inkubátor SDS

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

<div class="fields">

- **Co se testovalo** – celá služba v pískovišti: půl roku pilotního provozu s pečujícími a rodinami, než služba oficiálně existovala, včetně adaptace nových dětí v domácí péči
- **Co jsme chtěli zjistit** – jestli služba odpovídá potřebám klientů i systému, než se uzákoní
- **Co jsme zjistili** – několik úzkých hrdel, která je potřeba vyřešit, aby služba měla šanci uspět
- **Co to umožnilo** – doporučení pro klíčové aktéry včetně náměstka ministra

</div>

::right::

<img :src="asset + 'sds-inkubator-ct24.jpg'" alt="Snímek z reportáže Událostí o testovacím provozu sousedského hlídání" class="shot" />

<div class="credit">Testovací provoz sousedského hlídání. Reportáž <a href="https://ct24.ceskatelevize.cz/clanek/domaci/sousedske-hlidani-se-v-pilotnim-projektu-podle-ministerstva-osvedcilo-354955">Událostí</a>, <a href="https://ct24.ceskatelevize.cz/">ČT24</a></div>

<img :src="asset + 'sds-blueprint-navsteva.png'" alt="Service blueprint návštěvy z kraje v pilotu Sousedských dětských skupin" class="shot" />

<div class="credit">Service blueprint návštěvy z kraje</div>

<style>
.shot { max-height: 10.6rem; width: auto; max-width: 100%; display: block; }
.col-right .credit { margin: 0.3rem 0 0.5rem; }
</style>

---
layout: two-column
ratio: "40-60"
hideInToc: true
---

# Evaly pro produkty s LLM

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- **Eval** je test pro AI systém: dáte mu vstup a jeho výstup ohodnotíte
- Hodnotí kód, jiný model, nebo člověk
- Každá vrstva má díry, proto se skládají za sebe: automatické evaly, čtení přepisů, A/B testy v provozu

::right::

<img :src="asset + 'anthropic-evals-svycarsky-syr.png'" alt="Švýcarský sýr kvality: vrstvy automatických evalů, ručního čtení přepisů a provozu s A/B testy a zpětnou vazbou" class="fit-img" />

<div class="credit">Švýcarský sýr kvality. Model <a href="https://en.wikipedia.org/wiki/Swiss_cheese_model">Jamese Reasona</a>, <a href="https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents">Anthropic</a></div>

<style>
.col-left li { margin: 0.45em 0; }
</style>

---
layout: homework
hideInToc: true
---

# Usability test do 12. 11.

- Otestujte svůj prototyp s **aspoň pěti lidmi** z cílové skupiny
- Každé sezení nahrajte a přepište
- Zjištění odevzdejte do odevzdávárny v IS
- Nedaří se vám sehnat lidi z cílové skupiny? Ozvěte se, domluvíme se.

<style>
li { margin-top: 0.45em; margin-bottom: 0.45em; }
</style>

---
layout: heading-body
hideInToc: true
---

# Příště: AI a produktové trio

- **12. 11.** – pokročilejší prototypování, AI v designovém procesu a produktové trio
- Vezměte si notebook a nainstalujte si **GitHub Copilot**, studentská licence je zdarma a návod najdete v podkapitole AI v kurzu
- Kdo už platí za **Claude Code**, může použít ten

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
