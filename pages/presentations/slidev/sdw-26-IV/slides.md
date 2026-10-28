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

- **Vaše prototypy** – kolečko týmů
- **Usability testování** – jak připravit a vést sezení
- **Testovací scénář** – v týmech
- **Pilot** – týmy se testují navzájem
- **Další evaluační metody**
- **Úkol** – test s pěti lidmi

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

Za každý tým jeden člověk, zhruba minutu:

1. Co jste při prototypování zkoušeli
2. Co jste se naučili
3. Co máte v ruce – ukažte nám to

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
h1 { margin-bottom: 0.45em !important; }
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>

---
layout: section-break
---

# Usability testování

Funguje to tak, jak si myslíte?

---
layout: heading-body
hideInToc: true
---

# Vaše představa a jejich zkušenost

- Máte prototyp a chcete vědět, jestli funguje tak, jak čekáte
- Vaše myšlenky a očekávání jsou jedna věc, druhá je to, jak prototyp vnímají uživatelé
- Dnes hlavně **usability testování**, ostatní techniky jsou jeho obměny

<div class="box"><strong>Jestli si z kurzu odnesete jednu věc, ať je to testování jako denní chleba.</strong></div>

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
h1 { margin-bottom: 0.45em !important; }
li { margin-top: 0.4em; margin-bottom: 0.4em; }
.box { margin-top: 1.2em; }
</style>

---
layout: two-column
ratio: "45-55"
hideInToc: true
---

# Dobrý design vzniká iterací

::left::

- **Iterace** je další kolo návrhu, které stojí na zjištěních z toho předchozího
- Nemusíte začít s něčím skvělým, stačí začít a pak ladit
- S AI nástroji je iterace rychlá, proto se tolik ujaly agilní metodiky, třeba Scrum

::right::

<svg viewBox="0 0 520 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dvojitý diamant se šipkami, které se vracejí z řešení zpátky k problému" class="diamond">
  <defs>
    <marker id="dd-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#0000dc" />
    </marker>
  </defs>
  <g fill="none" stroke="#0000dc" stroke-width="4" stroke-linejoin="round">
    <path d="M20 125 L125 45 L230 125 L125 205 Z" />
    <path d="M230 125 L335 45 L440 125 L335 205 Z" />
  </g>
  <line x1="440" y1="125" x2="500" y2="125" stroke="#0000dc" stroke-width="4" marker-end="url(#dd-arrow)" />
  <g fill="none" stroke="#4bc8ff" stroke-width="5" stroke-linecap="round">
    <path d="M415 75 C 395 10, 290 10, 262 75" marker-end="url(#dd-arrow)" />
    <path d="M425 180 C 380 265, 120 265, 70 170" marker-end="url(#dd-arrow)" />
  </g>
  <g style="font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 26px" fill="#000" text-anchor="middle">
    <text x="125" y="134">Problém</text>
    <text x="335" y="134">Řešení</text>
  </g>
</svg>

<p class="claim">Good design is iterative</p>

<div class="credit">Rámec Double Diamond formuloval britský <a href="https://www.designcouncil.org.uk/resources/the-double-diamond/">Design Council</a> (2004), šipky iterace jsou dokreslené</div>

<style>
.col-left li { margin-top: 0.45em; margin-bottom: 0.45em; }
.diamond { width: 100%; height: auto; display: block; }
.claim { font-weight: 700; font-size: 1.3em; color: var(--muni-blue, #0000dc); text-align: center; margin: 0.4em 0 0; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Jeden účastník na sezení

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Každý má v hlavě vlastní představu o tom, jak věc funguje, a ve skupině se lidé navzájem ovlivňují
- Sledujete, co dělá jeden člověk, a máte na něj čas
- U stolu sedí **účastník**, **facilitátor** a **zapisovatel**

::right::

<img :src="asset + 'jarmilka-testovani-1.jpg'" alt="Testování papírového prototypu shora: ruce účastníka nad papírovými obrazovkami" class="fit-img" />

<div class="credit">Testování papírového prototypu Jarmilky</div>

<style>
.col-left li { margin-top: 0.5em; margin-bottom: 0.5em; }
</style>

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Připravte sebe

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

Checklist je infrastruktura, na kterou se můžete spolehnout:

<ul class="checklist">
  <li>Prototyp funguje a čeká na prvním kroku</li>
  <li>Scénář máte vytištěný</li>
  <li>Souhlas s nahráváním, nabitý telefon, místo v paměti</li>
  <li>Zapisovatel má šablonu na poznámky</li>
  <li>Místo a čas jsou s účastníkem potvrzené</li>
</ul>

<div class="box"><strong>Všechno nahrávejte, nechte si to přepsat a pracujte s přepisem.</strong></div>

::right::

<img :src="asset + 'jarmilka-papirovy-prototyp.jpg'" alt="Papírový prototyp asistenta Jarmilka rozložený na stole" class="fit-img" />

<div class="credit">Papírový prototyp Jarmilky</div>

<style>
.col-left p { margin-bottom: 0.3em; }
.checklist { list-style: none; padding-left: 0; margin: 0.2em 0 0; }
.checklist li { position: relative; padding-left: 1.6em; margin: 0.3em 0; }
.checklist li::before { content: ""; position: absolute; left: 0; top: 0.25em; width: 0.9em; height: 0.9em; border: 2px solid var(--muni-blue, #0000dc); border-radius: 0.15em; }
</style>

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Pozvěte účastníka

::left::

**Kde lidi sehnat**

- Cold call, kamarád kamaráda
- Placení účastníci
- V B2B přes zákazníky a partnery

**Pozvánka má vítat**

<div class="box">„Není to schůzka. Projdeme spolu nápad nebo pár nápadů.“</div>

::right::

<div class="invite">„Dávám vám možnost spoluutvářet to, na čem pracuji, abyste z toho v budoucnu měli užitek.“</div>

<style>
.col-left p { margin: 0.6em 0 0.2em; }
.col-left li { margin: 0.2em 0; }
.col-right { display: flex; align-items: center; }
.invite { font-size: 1.35em; line-height: 1.35; font-weight: 700; color: var(--muni-blue, #0000dc); }
</style>

---
layout: two-column
ratio: "55-45"
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
3. Jak sezení poběží
4. Souhlas s nahráváním
5. Ať mluví nahlas
6. Kdykoli se může zeptat i skončit

::right::

<div class="box"><strong>„Testujeme prototyp, ne vás.“</strong></div>

<img :src="asset + 'jarmilka-testovani-2.jpg'" alt="Sezení nad papírovým prototypem shora" class="fit-img photo" />

<p class="goal">Cíl: co nejvíc psychologického bezpečí</p>

<style>
.col-left p { margin-bottom: 0.3em; }
.col-left li { margin: 0.2em 0; }
.col-right .box { margin: 0 0 0.8em; }
.goal { font-weight: 700; margin-top: 0.6em; }
</style>

---
layout: two-column
ratio: "60-40"
hideInToc: true
---

# Think aloud

::left::

- Do hlavy účastníkovi nevidíte, tak ho poprosíte, ať říká, co se v ní děje
- Uslyšíte, jak rozhraní chápe a jaký má o něm mentální model
- Usability test je o tom pochopit, jak lidé rozumějí tomu, co jste udělali

<div class="box">„Nerozumím textu v bublině Jarmilky. Pojem časová perspektiva je hodně abstraktní.“</div>

<div class="credit">Účastnice testu Jarmilky</div>

::right::

<a class="book" href="https://sensible.com/dont-make-me-think/">
  <span class="book-title">Don't Make Me Think</span>
  <span class="book-author">Steve Krug</span>
</a>

<div class="credit">Kniha <a href="https://sensible.com/dont-make-me-think/">Steva Kruga</a> o tom, jak lidé opravdu používají rozhraní</div>

<style>
.col-left li { margin: 0.35em 0; }
.col-right { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
.book { display: flex; flex-direction: column; justify-content: space-between; width: 13rem; height: 17rem; padding: 1.4rem 1.2rem; background: #fff; border: 2px solid #000; box-shadow: 0.4rem 0.4rem 0 var(--muni-arts-blue, #4bc8ff); text-align: left; text-decoration: none !important; color: #000 !important; }
.book-title { font-size: 1.5em; font-weight: 700; line-height: 1.15; }
.book-author { font-size: 0.9em; }
</style>

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Testovací scénář

::left::

- Úkoly, které má účastník v prototypu udělat
- Zadejte situaci a cíl, cestu ať najde sám
- Raději méně úkolů a víc času pozorovat a ptát se
- Scénář je lešení pro facilitátora

::right::

<div class="box"><strong>Návodně</strong><p>„Klikněte na Řazení vlaku a najděte svůj vůz.“</p></div>

<div class="box"><strong>Nenávodně</strong><p>„Máte místenku ve voze 7 a vlak přijede za pět minut. Ukažte mi, kam se na nástupišti postavíte.“</p></div>

<style>
.col-left li { margin: 0.4em 0; }
.col-right .box:first-child { margin-top: 0; opacity: 0.7; }
</style>

---
layout: heading-body
hideInToc: true
---

# To, co dnes uděláte, je pilot

- Pilotujte rozhovory i usability sezení, než s nimi půjdete ven
- Na pilotu zjistíte, kde scénář drhne, kolik zabere času a jestli funguje technika

<style>
.heading-body { display: flex; flex-direction: column; justify-content: center; }
h1 { margin-bottom: 0.45em !important; }
li { margin-top: 0.5em; margin-bottom: 0.5em; }
</style>

---
layout: heading-body
hideInToc: true
---

# Než začnete: spojte test s discovery

<svg viewBox="0 0 640 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rozhodovací diagram: krátký rozhovor, pak otázka, jestli účastník odpovídá profilu. Ne vede k discovery otázkám, ano vede k prototypu." class="flow">
  <defs>
    <marker id="fl-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#0000dc" />
    </marker>
  </defs>
  <g fill="none" stroke="#0000dc" stroke-width="3">
    <rect x="200" y="5" width="240" height="54" rx="6" />
    <path d="M320 92 L450 142 L320 192 L190 142 Z" fill="#eef4fb" />
    <rect x="10" y="205" width="250" height="60" rx="6" />
    <rect x="410" y="205" width="220" height="60" rx="6" fill="#0000dc" />
    <path d="M320 59 L320 90" marker-end="url(#fl-arrow)" />
    <path d="M190 142 L135 142 L135 203" marker-end="url(#fl-arrow)" />
    <path d="M450 142 L520 142 L520 203" marker-end="url(#fl-arrow)" />
  </g>
  <g style="font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 22px" text-anchor="middle">
    <text x="320" y="40">Krátký rozhovor</text>
    <text x="320" y="149" style="font-weight: 700">Odpovídá profilu?</text>
    <text x="160" y="132" style="font-size: 18px">Ne</text>
    <text x="480" y="132" style="font-size: 18px">Ano</text>
    <text x="135" y="231">Discovery otázky,</text>
    <text x="135" y="255">nebo ušetřit čas</text>
    <text x="520" y="242" fill="#fff" style="font-weight: 700">Ukázat prototyp</text>
  </g>
</svg>

<style>
h1 { margin-bottom: 0.4em !important; }
.flow { width: 40rem; max-width: 100%; height: auto; display: block; margin: 0.4rem auto 0; }
</style>

---
layout: two-column
ratio: "60-40"
hideInToc: true
---

# Jarmilka: usability studie

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

<div class="fields">

- **Iniciativa** – AI asistent, který lidem v těžké životní situaci pomůže najít sociální nebo zdravotní službu
- **Co se testovalo** – papírový prototyp, šest navazujících úkolů, pět lidí z cílové skupiny, každý zvlášť
- **Co jsem chtěl zjistit** – jestli lidé asistentem projdou a jak mu rozumějí
- **Co jsem zjistil** – nejvíc problémů dělal přechod mezi prvním a druhým krokem
- **Co to umožnilo** – po prvním a třetím testu jsem návrh upravil a poslední dva testy běžely na výrazně lepší verzi

</div>

::right::

<img :src="asset + 'jarmilka-papirovy-prototyp.jpg'" alt="Papírový prototyp asistenta Jarmilka" class="fit-img" />

<div class="credit">Celá <a href="https://www.erikvanek.com/case-studies/jarmilka/uzivatelska-studie-Jarmilka.pdf">studie Jarmilka</a> (PDF)</div>

---
layout: two-column
ratio: "55-45"
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

<div class="box">„Dostala jsem se do jinýho módu a nevím co se tady po mně chce, není vybudovaná důvěra takže mám strach psát citlivý věci.“</div>

<div class="credit">Účastnice testu Jarmilky</div>

::right::

<div class="page"><img :src="asset + 'jarmilka-studie-zjisteni.jpg'" alt="Strana studie Jarmilka se zjištěními a zakroužkovanými místy v papírovém prototypu" /></div>

<div class="credit">Strana 11 <a href="https://www.erikvanek.com/case-studies/jarmilka/uzivatelska-studie-Jarmilka.pdf">studie Jarmilka</a></div>

<style>
.col-left li { margin: 0.3em 0; }
.page { height: 20rem; overflow: hidden; border: 1px solid #ddd; }
.page img { width: 100%; height: auto; display: block; }
</style>

---
layout: section-break
hideInToc: true
hideProgress: true
---

# Máte teď nějaké dotazy?

---
layout: two-column
ratio: "40-60"
hideInToc: true
---

# Co vás při testování zajímá?

::left::

- Test s uživateli míří hlavně na **použitelnost**
- Hodnotu, proveditelnost a životaschopnost přitom neztrácejte z očí
- Na co se zeptáte, záleží na tom, co je u vašeho nápadu největší neznámá

<div class="credit">Marty Cagan, <a href="https://www.svpg.com/four-big-risks/">Four Big Risks</a> (SVPG)</div>

::right::

<svg viewBox="0 0 560 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Vennův diagram čtyř rizik produktu: hodnota, použitelnost, proveditelnost a životaschopnost, použitelnost je zvýrazněná" class="venn">
  <circle cx="165" cy="240" r="120" fill="#0000dc" fill-opacity="0.85" />
  <g fill="#4bc8ff" fill-opacity="0.18" stroke="#0000dc" stroke-width="3">
    <circle cx="280" cy="125" r="120" />
    <circle cx="395" cy="240" r="120" />
    <circle cx="280" cy="355" r="120" />
  </g>
  <circle cx="165" cy="240" r="120" fill="none" stroke="#0000dc" stroke-width="3" />
  <g style="font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 24px" text-anchor="middle">
    <text x="145" y="248" fill="#fff" style="font-weight: 700">Použitelnost</text>
    <text x="280" y="70">Hodnota</text>
    <text x="415" y="248">Proveditelnost</text>
    <text x="280" y="418">Životaschopnost</text>
  </g>
</svg>

<style>
.col-left li { margin: 0.45em 0; }
.venn { width: 100%; max-height: 27rem; height: auto; display: block; }
</style>

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# Příklad: kam se postavit na nástupišti

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

<div class="fields">

- **Situace** – v aplikaci vidím, odkud mi vlak jede, ale nevím, kam se na nástupišti postavit, abych po příjezdu vlaku neběhal sem a tam
- **Předpoklad** – nejistota na nástupišti přispívá ke zpoždění vlaků
- **Otázka pro test** – pomůže nový návrh lidem se po příjezdu vlaku lépe zorientovat?

</div>

::right::

<img :src="asset + 'vlak-razeni-viden.jpg'" alt="Displej řazení vlaku ve Vídni, ukazuje polohu každého vozu podél nástupiště" class="fit-img" />

<div class="credit">Řazení vlaku ve Vídni, ze setkání 1</div>

---
layout: groupwork
hideInToc: true
progressSection: true
---

# Napište testovací scénář

- **Celý tým**, výstup je scénář na jednu A4
- Tři kroky: výzkumné otázky, úkoly, doplňující otázky a k tomu krátký úvod sezení
- **Hned potom ho pilotně otestujete na jiném týmu**

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
</style>

---
layout: groupwork
hideInToc: true
# timer: 5   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# 1 Výzkumné otázky

- Vezměte svůj zarámovaný problém a prototyp
- Napište 1–3 otázky nebo předpoklady o lidech, na které má test odpovědět

<div class="box">

**Příklady**

- Pomůže nový návrh lidem se po příjezdu vlaku lépe zorientovat?
- Najdou lidé svůj sektor dřív, než vlak přijede?
- Věří lidé údaji o sektoru natolik, aby se podle něj postavili?

</div>

<style>
li { margin-top: 0.3em; margin-bottom: 0.3em; }
.box ul { margin: 0.2em 0 0; }
</style>

---
layout: groupwork
hideInToc: true
# timer: 8   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# 2 Úkoly

- 2–3 úkoly, které účastníka provedou prototypem tak, aby ho viděl svýma očima
- Zadejte situaci a cíl, cestu ať najde sám

<div class="box">„Máte místenku ve voze 7 a vlak přijede za pět minut. Ukažte mi, kam se na nástupišti postavíte.“</div>

<style>
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>

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
ratio: "55-45"
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
ratio: "60-40"
hideInToc: true
---

# Mapa výzkumných metod

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

<div class="map">
  <img :src="asset + 'nngroup-mapa-vyzkumnych-metod.png'" alt="A Landscape of User Research Methods: dvacet metod na osách postoje a chování, kvalitativní a kvantitativní" />
  <span class="ring" style="left:14.5%; top:27.5%; width:17.5%; height:6%"></span>
  <span class="ring" style="left:76%; top:13.8%; width:12.6%; height:6%"></span>
  <span class="ring" style="left:62%; top:23.3%; width:22.2%; height:6%"></span>
  <span class="ring" style="left:41.2%; top:64.3%; width:24.6%; height:6%"></span>
</div>

<div class="credit">Mapa výzkumných metod. <a href="https://www.nngroup.com/articles/which-ux-research-methods/">Christian Rohrer</a>, <a href="https://www.nngroup.com/">NN/g</a></div>

::right::

**Na mapě**

- Usability testování
- A/B testování
- Benchmark, třeba se SUS
- Tree testing

**Mimo mapu**

- RITE, heuristiky, fake door, five-second test

<style>
.map { position: relative; }
.map img { width: 100%; height: auto; display: block; }
.ring { position: absolute; border: 4px solid #e4002b; border-radius: 50%; box-sizing: border-box; }
.col-right p { margin: 0.4em 0 0.1em; }
.col-right li { margin: 0.15em 0; }
</style>

---
layout: two-column
ratio: "55-45"
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
.page { height: 20rem; overflow: hidden; border: 1px solid #ddd; }
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

<style>
.col-header .box { margin: 0 0 1em; }
</style>

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
.stack { position: relative; height: 20rem; }
.stack img { position: absolute; width: 80%; height: auto; border: 1px solid #ccc; box-shadow: 0 0.3rem 0.8rem rgb(0 0 0 / 0.18); }
.stack img:first-child { top: 0; left: 0; }
.stack img:last-child { top: 7rem; right: 0; }
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
.shot { max-height: 10rem; width: auto; max-width: 100%; display: block; }
.col-right .credit { margin: 0.3rem 0 0.7rem; }
</style>

---
layout: two-column
ratio: "50-50"
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
