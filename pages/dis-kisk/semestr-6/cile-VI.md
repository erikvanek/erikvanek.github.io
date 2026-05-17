---
title: 'Reflexe studijních cílů 6. semestru'
date: 2026-05-17
layout: dis-kisk.njk
hideNavigation: true
tags: ['dis', 'semestr6']
permalink: /{{page.fileSlug}}/
---

Cíle cíle cíle — naposledy. Jak to bylo v [1.](/cile-I), [2.](/cile-II), [3.](/cile-III), [4.](/cile-IV) a [5.](/cile-V) semestru? Po šesti reflexích už ten oblouk konečně začíná být vidět.

## Co jsem si stanovil pro celé studium?
- Načerpat kvalitní metodologický základ
- Umět kvalitně zadat uživatelský výzkum
- Obohatit svůj nástrojový aparát
- Zlepšit facilitační dovednosti v dosud neznámých prostředích
- Umět "lépe prodávat" human centered design v dosud nenakloněných prostředích
- Pomáhat organizacím stoupat v design maturity

## Co jsem si stanovil na 6. semestr?
- Posunout AI-first workflow z [minulého semestru](/cile-V) do agentnější podoby — místo mluvení ho používat: MCP, second brain, kód jako source of truth
- Vytáhnout to ven z prostředí, kde mám domácí výhodu (klienti, studenti, účastníci workshopů), do místnosti, kde nemám předem nic

## Jak jsem s tím naložil?

### Agentní mód, tentokrát doopravdy

Minule jsem psal, že můj workflow je "výrazně více agentní". Pravda, ale ještě dost volné. Tenhle semestr jsem to dotáhl. MCP servery propojené s Obsidian vaultem, s paper.design, s výzkumnými repozitáři. Skills jako malé znovupoužitelné funkce napříč projekty. Claude Code jako prototypovací nástroj, který místo statických mockupů rovnou shipuje pull requesty s preview. A markdown jako lingua franca, která to celé drží pohromadě.

<figure>
  <svg viewBox="0 0 500 260" width="100%" xmlns="http://www.w3.org/2000/svg" style="max-width:500px;">
    <defs>
      <marker id="mcp-tip" markerWidth="7" markerHeight="6" refX="7" refY="3" orient="auto">
        <polygon points="0 0, 7 3, 0 6" fill="#7a7060" />
      </marker>
    </defs>
    <path d="M 160,65 C 260,65 310,118 385,118" fill="none" stroke="#3a342c" stroke-width="1.5" marker-end="url(#mcp-tip)" />
    <path d="M 160,130 C 295,130 310,130 383,130" fill="none" stroke="#3a342c" stroke-width="1.5" marker-end="url(#mcp-tip)" />
    <path d="M 160,195 C 260,195 310,142 385,142" fill="none" stroke="#3a342c" stroke-width="1.5" marker-end="url(#mcp-tip)" />
    <rect x="0" y="41" width="160" height="48" rx="8" fill="#252019" stroke="#46403a" stroke-width="1" />
    <text x="80" y="70" font-family="Space Grotesk" font-size="15" font-weight="500" fill="#ddd8d0" text-anchor="middle">Obsidian</text>
    <rect x="0" y="106" width="160" height="48" rx="8" fill="#252019" stroke="#46403a" stroke-width="1" />
    <text x="80" y="135" font-family="Space Grotesk" font-size="15" font-weight="500" fill="#ddd8d0" text-anchor="middle">Google Drive</text>
    <rect x="0" y="171" width="160" height="48" rx="8" fill="#252019" stroke="#46403a" stroke-width="1" />
    <text x="80" y="200" font-family="Space Grotesk" font-size="15" font-weight="500" fill="#ddd8d0" text-anchor="middle">Paper.design</text>
    <rect x="258" y="83.5" width="48" height="17" rx="8.5" fill="#ddd8d0" />
    <text x="282" y="95" font-family="Inter" font-size="9" font-weight="700" fill="#2a251e" text-anchor="middle" letter-spacing="0.14em">MCP</text>
    <rect x="248" y="121.5" width="48" height="17" rx="8.5" fill="#ddd8d0" />
    <text x="272" y="133" font-family="Inter" font-size="9" font-weight="700" fill="#2a251e" text-anchor="middle" letter-spacing="0.14em">MCP</text>
    <rect x="258" y="160.5" width="48" height="17" rx="8.5" fill="#ddd8d0" />
    <text x="282" y="172" font-family="Inter" font-size="9" font-weight="700" fill="#2a251e" text-anchor="middle" letter-spacing="0.14em">MCP</text>
    <circle cx="435" cy="130" r="52" fill="#e8a030" />
    <text x="435" y="136" font-family="Space Grotesk" font-size="16" font-weight="700" fill="#1c1812" text-anchor="middle">Claude</text>
  </svg>
  <figcaption>Topologie agentního workflow: druhý mozek a další nástroje napojené přes MCP servery na jeden orchestrující LLM. Použito v prezentaci na UX Monday.</figcaption>
</figure>

Posun je nenápadný, ale podstatný. Před půl rokem jsem sahal po LLM na izolované úkoly. Teď je jeden LLM, který orchestruju, a všechno ostatní jsou tooly, které si k sobě zatahuje, když je potřebuje. Není to o rychlosti pro rychlost — ten ušetřený čas se vrací zpátky do těch částí řemesla, na kterých mi reálně záleží. Lepší výzkumné scénáře. Pozornější čtení transkriptů. Víc iterací na prototypu, než ho někomu ukážu. Víc procházek.

A pořád samozřejmě generuju slop, když do toho slop hodím. Staré "garbage in, garbage out" platí čím dál víc — rozdíl mezi promyšleným vstupem a YOLO promptem se s každou novou verzí modelu rozevírá. Hlídat výstup je práce, která nezmizí.

### Vibe coding na vlastním side projektu

<figure>
  <img src="/dis-kisk/img/teo.png" alt="Whippet zírá do kamery" />
  <figcaption>Pejsek, kterého český realitní portál neumí vyfiltrovat. Důvod, proč nakonec existuje vlastní scraper.</figcaption>
</figure>

Větší část toho posunu jsem si vyzkoušel mimo klienty, na vlastním projektu — rent scraper, který bere inzeráty z realitních portálů a hoduje je podle tvrdých atributů (plocha, cena, lokalita) i měkkých vlastností vytažených z popisů (např. zda pronajímatel toleruje psa, což jinak vyřazuje třetinu až polovinu inzerátů). Když dva inzeráty proklouznou prahem, oba uživatelé je nezávisle ohodnotí stylem *hot or not*, a teprve když je shoda, jde se na prohlídku. Tinder na byty, pokud chcete.

Workflow je celý postavený na Claude Code: popíšu chování v textu, vznikne pull request s preview deployem, koukenem jestli se mi to líbí, mergne se. Source of truth zůstává v kódu, ne ve Figmě. Pro mě osobně byl tohle moment, kdy se vibe coding přestal cítit jako experiment a začal se chovat jako pracovní nástroj.

### UX Monday Praha — test toho všeho najednou

V květnu 2026 jsem dostal zhruba 45 minut na UX Monday v Praze. *"The process isn't dead. It's just different."* Talk procházel přesně tím, co jsem v semestru postavil: brain dump method, AI-asistované kódování rozhovorů (živý demo na transkriptech ze side projektu pro architekty a interiérové designéry), Claude Code prototyping na rent scraperu a krátký closing o sociální inovaci jako protiváze hlavní AI linky.

Bylo to poprvé, co jsem ten materiál vzal do místnosti, kde nemám domácí výhodu. Žádní účastníci workshopů, co mi už věří, žádní studenti, kteří znají můj rejstřík, žádní klienti, se kterými jsem si roky budoval společný jazyk. UX komunita, Praha, veřejný meetup. Předem vyslovené pozice (design = výzkum + design; designéři by měli mít mentální model GitHubu; tool-agnostic; přestaňte říkat "AI", jako by to ještě bylo něco oddělitelného), pak dva live demos.

<figure>
  <img src="/dis-kisk/img/labor-market-impacts.png" alt="Spider chart Anthropic – occupational exposure to AI napříč povoláními" />
  <figcaption>Anthropic, <em>Labor Market Impacts</em>. Designerská a knowledge work povolání patří mezi nejvíc vystavená — slide, na který jsem v talku odkazoval, když jsem říkal "tohle není další automatizační vlna jako ty předchozí, tahle jde rovnou po white-collar práci".</figcaption>
</figure>

Co jsem se naučil v přípravě: talk mě donutil artikulovat workflow rozhodnutí, která jsem dělal intuitivně. Proč markdown a ne Dovetail? Proč Claude Code a ne Figma? Proč je dneska "AI" špatné slovo? Vysvětlit to cizím lidem mě dotlačilo dál než další čtvrtletí klientské práce.

Co jsem se naučil v doručení: sál byl vlídnější, než jsem čekal, otázky ostřejší, než jsem čekal, a freelance "najměte si mě" podtón zafungoval, aniž by působil cynicky.

## Co si odnáším?

Před třemi lety jsem do programu vstupoval jako dost surový praktik — inženýrský základ, vyhraněné názory, díry v metodologii. V květnu 2026 jsem mluvil na největším designérském meetupu v zemi o tom, jak pracuju. Nepíšu to, abych se chválil — píšu to proto, že ten oblouk pro mě sám nebyl viditelný, dokud jsem si k téhle reflexi nesedl. Program ze mě nedělal řečníka. Dal mi dost metodologické půdy pod nohama na to, abych měl co říct, když ta příležitost přišla.

## Co dál?

Bakalářka. A po ní — chci tenhle orchestrátorský způsob práce vzít do větších problémů. Méně obrazovek, víc služeb. Veřejný sektor, neziskovky, sociální inovace, místa, kde je dobrý proces pořád vzácný. Closing UX Monday talku byl veřejná verze toho záměru. Teď to udělat.
