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
  <img :src="asset + 'nngroup-mapa-vyzkumnych-metod.png'" alt="A Landscape of User Research Methods: dvacet metod na osách postoje a chování, kvalitativní a kvantitativní, s doplněnými metodami RITE, fake door, SUS, heuristická evaluace a simulace služby" />
  <span class="ring" style="left:14.5%; top:27.5%; width:17.5%; height:6%"></span>
  <span class="ring" style="left:76%; top:13.8%; width:12.6%; height:6%"></span>
  <span class="add" style="left:15.5%; top:34.6%"><i class="mk square"></i><b>RITE</b></span>
  <span class="add" style="left:76.6%; top:32%"><i class="mk circle"></i><b>Fake door</b></span>
  <span class="add" style="left:76.6%; top:66.5%"><i class="mk square"></i><b>SUS</b></span>
  <span class="add" style="left:41.6%; top:34%"><i class="mk square"></i><b>Heuristic evaluation</b></span>
  <span class="add" style="left:15.5%; top:16%"><i class="mk circle"></i><b>Service simulation</b></span>
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
/* Značky podle legendy mapy: kruh přirozené použití, čtverec použití podle scénáře */
.mk { flex: none; width: 1.6cqw; height: 1.6cqw; box-sizing: border-box; border: 1px solid rgb(0 0 0 / 0.3); }
.mk.circle { background: #99cc00; border-radius: 50%; }
.mk.square { background: #ff6666; }
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

- Na začátek rozehřívací otázka nebo nedávný zážitek, který s prototypem souvisí
- Úkoly, které má účastník s prototypem splnit
- Zadejte situaci v níž se nachází a cíl, kterého má dosáhnout
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

<div class="box">"Můžete se mnou nahlas sdílet co se ve vás u jednotlivých obrazovek odehrává?"</div>


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

- **Celý tým**, výstup je scénář na jeden papír nebo digitálně
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

- Vraťte se k zarámovanému problému a ke svým prototypům
- Formulujte 1–3 otázky či předpoklady o lidech, na které má test odpovědět

<div class="box">

- Pomůže nový návrh lidem se po příjezdu vlaku lépe zorientovat?
- Najdou lidé svůj sektor dřív, než vlak přijede?
- Věří lidé údaji o sektoru natolik, aby se podle něj postavili?

</div>
</div>
<div>
<br/>
<img :src="asset + 'vlak-razeni-viden-rovne.jpg'" alt="Displej řazení vlaku ve Vídni, ukazuje polohu každého vozu podél nástupiště" class="fit-img" />

</div>
</div>

<style>
li { margin-top: 0.3em; margin-bottom: 0.3em; }
.halves { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: start; }
.halves ul:first-child { margin-top: 0; }
.halves .box { font-size: 0.85em; }
.halves .box ul { margin: 0.2em 0 0.4em; }
</style>

<!--
Otázky jsou pro tým, účastník je neuslyší. Kdo se ho zeptá přímo „Věříte údaji o sektoru?“, dostane zdvořilou odpověď místo chování (Erika Hall: Research questions are not interview questions).
-->

---
layout: groupwork
hideInToc: true
# timer: 2   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# 2 Úvod k setkání


<div class="box intro">„Díky, že jste si na nás udělali čas. <br/><br/>Zkoušíme návrh aplikace, která ukazuje, kde na nástupišti zastaví který vůz. Dám vám pár úkolů a budu sledovat, jak se vám s ním pracuje. <br/><br/> Během setkání testujeme prototyp, ne vás. Pokud něco nefunguje – je to nejspíše chyba návrhu.<br/><br/> Velmi nám pomůže pokud budete nahlas sdílet, co si u jednotlivých obrazovek myslíte. Nebojte se kdykoli zeptat nebo setkání v případě potřeby ukončit. <br/><br/>Mohli bychom si setkání nahrát? Je to jen pro naše interní potřeby.“</div>

- Následně můžete navázat "rozehřívací" otázku, třeba „Řekněte mi o své poslední cestě vlakem.“


<style>
li { margin-top: 0.4em; margin-bottom: 0.4em; }
.intro { font-size: 0.85em; }
</style>

---
layout: groupwork
hideInToc: true
# timer: 5   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# 3 Úkoly pro testující

- Úkoly, které účastníka provedou prototypem
  - Pro potřeby cvičení stačí 2-3
- Zadejte situaci a cíl, cestu k němu nechte na účastníkovi
- Nepoužívejte názvy tlačítek a obrazovek
- Každý úkol si v prototypu projděte sami, ať víte, že jde dokončit

<div class="box tasks">

1. „Máte místenku do vozu 7, vlak přijede za pět minut. Ukažte, kam se postavíte.“
2. „Jedete s kolem bez místenky. Najděte, kde počkat, abyste byli co nejblíž vozu pro kola.“
3. „Jedete z Olomouce a v Pardubicích máte na přestup šest minut. Připravte se, ať ho stihnete.“

</div>

<style>
li { margin-top: 0.4em; margin-bottom: 0.4em; }
.tasks { font-size: 0.85em; }
.tasks ol { margin: 0.2em 0; padding-left: 1.4em; }
.tasks li { margin: 0.3em 0; }
</style>

<!--
1 Jádro: použije účastník údaj o poloze vozu bez nápovědy, kde ho hledat?
2 Bez místenky: rozumí typům vozů a jejich poloze na nástupišti?
3 Přestup pod tlakem: napadne ho sám vybrat vůz u schodů? Ukazuje, jestli funkci bere jako svou.
-->


---
layout: groupwork
hideInToc: true
# timer: 5   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# 4 Doplňující otázky

- 2–3 otázky na konec, které vám pomůžou pochopit účastníka a jeho kontext
- Ptejte se otevřeně na to, co už zažil, a nenaznačujte odpověď
- Moje oblíbená otázka na závěr
  - *"Nezapomněli jsme během testování otevřít nějaké důležité téma, které se týká (orientace na nástupišti, nákupu jízdenek, cestování vlakem obecně, ...)?"*

<div class="box follow">

- „Kdy jste naposledy na nástupišti hledali svůj vůz? Jak to dopadlo?“
- „Jak dnes poznáte, kam se postavit?“
- „Kdyby aplikace na nástupišti uměla cokoli, co by to bylo?“

</div>

<style>
li { margin-top: 0.4em; margin-bottom: 0.4em; }
.follow { font-size: 0.85em; }
.follow ul { margin: 0.2em 0; padding-left: 1.4em; }
.follow li { margin: 0.3em 0; }
</style>

---
layout: groupwork
hideInToc: true
progressSection: true
# timer: [10, 10]   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# Pilotní testování
- vytvořte dojice / trojice napříč týmy
  - pokud jste dnes v týmu 3, rozdělte se na 1 a 2 osoby
- ideálně máme co nejvíce 1:1 dvojic napříč týmy
- v každé dvojici:
  - prvních 10 minut testování prototypu prvního týmu dle scénáře
  - druhých 10 minut – prohodíte se a testujete druhý prototyp
- dělejte si při testování poznámky!
- následně zpátky do svých týmů
<style>
li { margin-top: 0.4em; margin-bottom: 0.4em; }
</style>

---
layout: groupwork
hideInToc: true
# timer: 5   # zástupný čas, časovač se přidá až bude fungovat (backlog 050)
---

# Po pilotu ve svém týmu

- Co účastník udělal jinak, než jste čekali?
- Co změníte ve scénáři?
- Co změníte v prototypu, než s ním půjdete za svými uživateli?

<style>
li { margin-top: 0.5em; margin-bottom: 0.5em; }
</style>

---
layout: section-break
hideInToc: true
progressSection: true
---

# Co jste zjistili?

<!--
Odkázat zpátky na matici Jarmilky: zjištění se třídí podle dopadu a náročnosti změny stejně jako minule nápady. Pořádnou syntézu udělají doma.
-->

---
layout: section-break
---

# Další evaluační metody

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
- Prototyp opravujete hned mezi sezeními když víte jaký problém je potřeba upravit
- Po dnešním pilotu můžete prototyp opravit, než s ním půjdete ven
- Postup RITE popisuje třeba <a href="https://handbook.gitlab.com/handbook/product/ux/ux-research/rite/">GitLab Handbook</a>
- Rétorická otázka – "Co je vlastně iterace?"

::right::

<img :src="asset + 'rite-standard-vs-rite.png'" alt="Standardní test: nejdřív všichni účastníci, pak změny. Test RITE: po každém účastníkovi hned změny, třikrát za sebou" class="fit-img" />

<div class="credit">RITE vymyslel kolektive z Microsoft Game Studios, diagram z <a href="https://helio.zurb.com/blog/speed-wins-mastering-product-design-with-rapid-iterative-testing/">blogu Helio</a> (Bryan Zmijewski)</div>

<style>
.col-left li { margin: 0.4em 0; }
</style>

---
layout: two-column
ratio: "55-45"
hideInToc: true
---

# A/B/n testování

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Dvě a víc variant produktu, každý uživatel vidí jen jednu z nich
- V živém produktu měříte chování, třeba kolik lidí dokončí objednávku
- Předem si určete jednu metriku, podle které vítěze poznáte
- Kvantitativní metoda, ideálně v "živých" systémech

::right::

<img :src="asset + 'abn-testovani-magnolia.png'" alt="Varianty A, B a N stejné stránky, každou vidí jiná část publika" class="fit-img" />

<div class="credit">Diagram z dokumentace <a href="https://docs.magnolia-cms.com/product-docs/6.2/special-features/abn-testing/">Magnolia CMS</a></div>

<style>
.col-left li { margin: 0.4em 0; }
</style>

---
layout: two-column
ratio: "46-54"
hideInToc: true
---

# System Usability Scale (SUS)

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

- Deset výroků, odpovědi na škále 1–5, skóre 0–100
- Kvantitativní, ale lze indikativně využít např. spojením s uživatelským testováním
- Vyplňte ihned hned po testu, ještě před rozhovorem
- Průměrné SUS skóre je kolem 68

- Formulář např <a href="https://www.bentley.edu/centers/user-experience-center/what-every-client-should-know-about-sus-scores">zde</a>
::right::

<img :src="asset + 'sus-formular.png'" alt="Tištěný dotazník SUS: deset anglických výroků, u každého škála od 1, rozhodně nesouhlasím, po 5, rozhodně souhlasím" class="form" />

<style>
.col-left li { margin: 0.4em 0; }
.form { display: block; max-height: 25rem; width: auto; max-width: 100%; margin-left: auto; }
</style>

---
layout: heading-body
hideInToc: true
title: Sovia - varianty A a B dopisu
---

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="letters">
<img :src="asset + 'sovia-vyzva-varianta-a.png'" alt="Varianta A: platné znění Výzvy k nastoupení k trestu, hutný úřední text" />
<img :src="asset + 'sovia-vyzva-varianta-b.png'" alt="Varianta B: přepsaná Výzva s vytaženým kdy a kde, s oddílem co se stane, když nenastoupíte, a s kontakty na pomoc" />
</div>

<style>
.letters { display: flex; justify-content: center; gap: 2rem; }
.letters img { height: 29.5rem; width: auto; border: 1px solid #ddd; box-shadow: 0 2px 10px rgba(0, 0, 40, 0.08); }
</style>

<!--
Iniciativa: Sovia, podpora lidí mezi odsouzením a nástupem do výkonu trestu.
Co se testovalo: úřední dopis Výzva k nástupu výkonu trestu, platné znění (A) a přepsaná verze (B).
Co jsme chtěli zjistit: jestli přepsanému dopisu lidé rozumějí líp.
Jak: každý účastník četl obě verze, pořadí se střídalo, po každé verzi vyplnil SUS.
Co zatím vidíme: přepsaná verze vychází lépe u většiny účastníků.
-->

---
layout: two-column
ratio: "36-64"
hideInToc: true
---

# Výsledky "SUS" dotazníku

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::
- SUS dotazník upravený pro potřeby projektu
  - otázky na srozumitelnost a obsah textu
- Každý pruh jsou odpovědi každého ze 7 účastníků
- Největší rozdíl je u výroků 5–8 a 10
- Indikativní výsledek, nelze říct že je druhá varianta jasně lepší

::right::

<img :src="asset + 'sovia-ab-test-vyroky.png'" alt="Odpovědi sedmi účastníků na deset výroků o dopisu, verze A vlevo a B vpravo, na škále od rozhodně nesouhlasím po rozhodně souhlasím" class="chart" />

<style>
.col-left li { margin: 0.5em 0; }
.chart { display: block; max-height: 25rem; width: auto; max-width: 100%; margin-left: auto; }
</style>

---
layout: two-column
ratio: "45-55"
hideInToc: true
---

# Nielsenovy heuristiky

::left::

- Levná evaluace, kterou zvládnete i bez uživatelů
- Projdete rozhraní podle deseti pravidel a zapíšete, kde je porušuje
- Můžete používat třeba jako checklist
- Nálezy seřaďte podle závažnosti
- S uživateli je to lepší
- Heuristiky s příklady popisuje <a href="https://www.nngroup.com/articles/ten-usability-heuristics/">Jakob Nielsen na NN/g</a>

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
layout: full-image
image: /cesky-sen-utek.jpg
dim: false
credit: "Foto dafilms.cz"
hideInToc: true
title: Nejlepší fake door test vůbec
---

<div v-click class="film">Český sen, 2004, Vít Klusák a Filip Remunda</div>

<style>
.film { display: inline-block; margin-bottom: 1.2rem; padding: 0.45rem 1rem; background: rgba(0, 0, 30, 0.75); color: #fff; font-size: 1.5rem; font-weight: 700; }
</style>

<!--
Fake door test: nabídnete něco, co ještě neexistuje, a měříte, kolik lidí o to stojí.
Zdroj fotky: https://dafilms.cz/film/7187-cesky-sen
-->

---
layout: full-image
image: /cesky-sen-otevreni.jpg
dim: false
credit: "Foto iDNES.cz"
hideInToc: true
title: Český sen - dav na otevření hypermarketu
---

<!--
Na otevření neexistujícího hypermarketu přišly až čtyři tisíce lidí.
Zdroj fotky: Český sen slaví úspěchy ve světě, iDNES.cz, 18. 5. 2005, https://www.idnes.cz/kultura/film-televize/cesky-sen-slavi-uspechy-ve-svete.A050518_154018_filmvideo_ton
-->

---
layout: full-image
image: /cesky-sen-boure.jpg
dim: false
credit: "Záběr z filmu, Hypermarket Film, přes Wikimedia Commons"
hideInToc: true
title: Český sen - fasáda hypermarketu v bouři
---

<!--
Fasáda hypermarketu byla jen plachta napnutá na lešení.
Zdroj: https://commons.wikimedia.org/wiki/File:Český_sen_bouře.jpg, z hesla https://cs.wikipedia.org/wiki/Český_sen, licenci drží Hypermarket Film.
-->

---
layout: two-column
ratio: "62-38"
hideInToc: true
---

# Fake door test

::left::

- Nabídnete něco, co ještě neexistuje
- Kdo o to projeví zájem, dozví se, že jde o test
- Počítáte, kolik lidí o nabídku stojí
- Zájem ověříte dřív, než cokoli postavíte
- Ve videu je stránka Sousedských dětských skupin, po kliknutí se ukáže poděkování a pár otázek

::right::

<SlidevVideo autoplay autoreset="slide" controls muted playsinline class="vid">
  <source src="https://www.erikvanek.com/videos/sds-fake-door-compressed.mp4" type="video/mp4" />
</SlidevVideo>

<style>
.col-left li { margin: 0.5em 0; }
.vid { display: block; height: 26rem; width: auto; margin: 0 auto; border: 1px solid #ccc; }
</style>

---
layout: heading-body
hideInToc: true
title: Fake door test SDS ve dvou fidelitách
---

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="stack">
  <img :src="asset + 'sds-fake-door-lofi.png'" alt="Lo-fi verze: prostá stránka Sousedských dětských skupin s upozorněním, že jde o test nabídky" class="back" />
  <img :src="asset + 'sds-fake-door-hifi.jpg'" alt="Hi-fi verze: stránka Sousedských dětských skupin v podobě webu MPSV" class="front" />
</div>

<style>
.stack { position: relative; height: 30.5rem; }
.stack img { position: absolute; height: 26rem; width: auto; border: 1px solid #ccc; box-shadow: 0 0.3rem 0.8rem rgb(0 0 0 / 0.18); }
.stack .back { top: 0; left: 14%; }
.stack .front { top: 4.5rem; left: 43%; }
</style>

<!--
Iniciativa: Sousedské dětské skupiny, nová služba domácí péče o malé děti, pilot s MPSV.
Co se testovalo: web služby, která ještě neexistovala, ve dvou verzích: pro pečující a pro rodiče.
Co jsme chtěli zjistit: jestli o službu stojí lidé, kteří by ji provozovali, i rodiče.
Co jsme zjistili: o domácí péči je velký zájem, hlavně u rodičů dětí se specifickými potřebami.
Vlevo lo-fi verze na erikvanek.com/sds, vpravo hi-fi v podobě webu MPSV.
-->

---
layout: heading-body
hideInToc: true
title: Simulace služby - inkubátor SDS
---

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div class="stack">
  <img :src="asset + 'sds-blueprint-navsteva.png'" alt="Service blueprint návštěvy z kraje v pilotu Sousedských dětských skupin" class="back" />
  <img :src="asset + 'sds-inkubator-ct24.jpg'" alt="Snímek z reportáže Událostí o testovacím provozu sousedského hlídání" class="front" />
  <div class="credit">Reportáž <a href="https://ct24.ceskatelevize.cz/clanek/domaci/sousedske-hlidani-se-v-pilotnim-projektu-podle-ministerstva-osvedcilo-354955">Událostí ČT24</a></div>
</div>

<style>
.stack { position: relative; height: 30.5rem; }
.stack img { position: absolute; width: 76%; height: auto; border: 1px solid #ccc; box-shadow: 0 0.3rem 0.8rem rgb(0 0 0 / 0.18); }
.stack .back { top: 0; left: 0; }
.stack .front { top: 7rem; right: 0; }
.stack .credit { position: absolute; right: 0; bottom: 0; margin: 0; }
</style>

<!--
Co se testovalo: celá služba v pískovišti, půl roku pilotního provozu s pečujícími a rodinami, než služba oficiálně existovala, včetně adaptace nových dětí v domácí péči.
Co jsme chtěli zjistit: jestli služba odpovídá potřebám klientů i systému, než se uzákoní.
Co jsme zjistili: několik úzkých hrdel, která je potřeba vyřešit, aby služba měla šanci uspět.
Co to umožnilo: doporučení pro klíčové aktéry včetně náměstka ministra.
Vlevo service blueprint návštěvy z kraje, vpravo reportáž Událostí ČT24 o testovacím provozu.
-->


---
layout: homework
hideInToc: true
---

# Uživatelské testování do 12. 11.

- Otestujte svůj prototyp s **aspoň pěti lidmi** z cílové skupiny
- Každé sezení si ideálně nahrajte a přepište
- Klíčová zjištění z testování za tým odevzdejte do odevzdávárny v ISu
- Stručně popište, jak se zjištěními plánujete naložit
- Formu a rozsah nechám na vašem uvážení

<style>
li { margin-top: 0.45em; margin-bottom: 0.45em; }
</style>

---
layout: heading-body
hideInToc: true
---

# Příště: AI a produktové trio

- **12. 11.** – pokročilejší prototypovací techniky, AI v designovém procesu, produktové trio
- Vezměte si notebook a nainstalujte si **GitHub Copilot**, studentská licence je zdarma a návod najdete v podkapitole AI v kurzu
- Pokud si platíte jiný nástroj od OpenAI, Anthropic či jiné – klidně můžete použít je

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
