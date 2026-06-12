---
title: 'Aby to mamka nechtěla vypnout'
subtitle: 'Jak by mohl vypadat digitální asistent pro orientaci v síti sociálních a zdravotních služeb?'
date: 2025-01-31
layout: dis-article.njk
hideNavigation: true
tags: ['dis', 'semestr3']
permalink: /dis-kisk/{{page.fileSlug}}/
---

<style>
    /* full-width body figures opt out of the global dotted link border */
    .hero-figure a { border: none; border-radius: 0; padding: 0; }
    .hero-figure img { border-radius: 4px; box-shadow: 0 8px 28px rgba(0, 0, 0, .18);
                       transition: transform .15s ease, box-shadow .15s ease; }
    .hero-figure a:hover img { transform: translateY(-2px); box-shadow: 0 12px 34px rgba(0, 0, 0, .26); }
    .hero-figure.diagram img { background: #fff; padding: 1.4rem; }
</style>

<div class="float-wrap">
<figure class="float-figure">
<a href="/case-studies/jarmilka/uzivatelska-studie-Jarmilka.pdf" target="_blank" rel="noopener" aria-label="Otevřít studii Aby to mamka nechtěla vypnout (PDF)">
<img src="/img/2024/case-studies/jarmilka/jarmilka-case-thumb.png" alt="Titulní strana studie Aby to mamka nechtěla vypnout" />
</a>
<figcaption>
<a href="/case-studies/jarmilka/uzivatelska-studie-Jarmilka.pdf" target="_blank" rel="noopener">Celá studie ke čtení (PDF) →</a>
</figcaption>
</figure>

Představte si paní v důchodovém věku, která se začíná starat o manžela s Alzheimerovou chorobou. Je vyčerpaná, neví, kam zavolat, a každý formulář i odborný termín ji od pomoci spíš odhání. Přesně pro ni - a pro lidi v podobně náročných situacích - jsem v rámci kurzu **Interakční design** navrhoval digitálního průvodce sítí sociálních a zdravotních služeb. Motivaci pro to, jak by takový nástroj měl vypadat dobře shrnoval jeden z citátů, který jsem zaznamenal během testování jednoho z prototypů – nástroj by měl být tak přívětivý, **aby to mamka nechtěla vypnout**.

Sociálních a zdravotních služeb je u nás celá síť, ale zorientovat se v ní je těžké i pro profesionály pracující v samotných službách. Klienti služeb často netuší, kdo a co by jim reálně mohlo pomoct, a existující nástroje po nich chtějí, aby rozuměli jazyku této domény dřív, než vůbec začnou využívat jejich služby. Tato studia vznikla v návaznosti na projekt **Access 4 all** pod hlavičkou agentury JINAG, který naplňuje jeden ze strategických cílů Jihomoravského kraje - zvyšovat informovanost obyvatel o dostupných službách.

Mým cílem bylo najít nejvhodnější podobu nástroje, který by s využití nástroje na báze velkých jazykových modelů (LLM) uměl s lidmi mluvit přirozeným jazykem - aby stačilo popsat svůj problém vlastními slovy, bez znalosti odborných názvů. Nástroj dostal jméno **Jarmilka** a měl umět odpovědět na jednu zdánlivě banální otázku: *„Co mám dělat, když…?“*
</div>

# Proč zrovna tohle?

Demografický vývoj a stárnutí populace tlačí poptávku po sociálních a zdravotních službách nahoru, zatímco samotné služby bojují s nedostatkem kapacit. Jeden z důvodů, proč to dře, je překvapivě prozaický - lidé málo vědí o tom, kdo a co by jim mohlo pomoci. Nedostanou se k pomoci včas, protože nevědí, jaké možnosti existují.

Nechtěl jsem proto navrhovat další statický rozcestník či rejstřík, který klade břemeno v orientaci se v možnostech na koncového uživatele. Chtěl jsem vytvořit nástroj, který uživateli umožní se v síti služeb **zorientovat, aniž by musel rozumět tomu, jak ta síť funguje** - popsat situaci svými slovy a dostat se k prvnímu konkrétnímu kroku, který může přinést potřebnou pomoc a podporu. Abych si rozsah udržel zvládnutelný, cílovou skupinu jsem zúžil na lidi v situacích, které vyžadují dlouhodobější péči a podporu (paní Magda a manžel s Alzheimerem, student Petr s úzkostmi, samoživitelka Jana a syn s autismem). Náhlé a akutní krize jsem vědomě nechal stranou - kladly by na rozhraní úplně jinou sadu nároků.

Potřeby uživatelů vycházející z předchozího kvalitativního výzkumu jsem popsal pomocí čtyř tzv. [Jobs-to-be-done](https://jobs-to-be-done.com/jobs-to-be-done-a-framework-for-customer-needs-c883cbf61c90){target="_blank"}, které popisují motivace, proč by klienti takový nástroj mohli využít:

- překonat náročnou životní situaci s jistotou správné volby vhodné služby,
- zajistit důstojný život sobě či blízkým i v období snížené soběstačnosti,
- zorientovat se v možnostech pomoci s důvěrou v cestu, kterou volím,
- předcházet zhoršování situace včasným jednáním.
# Jak jsem na to šel

Projektem jsem procházel v souladu s principy tzv. **dvojitého diamantu**. Výzkumná půlka - mapování potřeb klientů i aktérů - proběhla ještě dřív v rámci Access 4 all (15 hloubkových rozhovorů s klienty, službami i zástupci měst a obcí, která navazovala na širokou rešrši a rozhovory s klíčovými stakeholdery kraje). Moje studie z těch zjištění vychází a navazuje druhým diamantem: od explorace konceptu k otestované druhé verzi nástroje.

<figure class="hero-figure diagram">
<a href="/dis-kisk/img/jarmilka-double-diamond.png" target="_blank" rel="noopener">
<img src="/dis-kisk/img/jarmilka-double-diamond.png" alt="Diagram double diamond - levý diamant (mapování potřeb, definice problémů) proběhl v rámci Access 4 all, pravý diamant (explorace konceptu, první verze, hledání nedostatků, druhá verze) je uživatelská studie" />
</a>
<figcaption>Levý diamant proběhl v rámci Access 4 all, pravý je tahle studie. (Klikni pro plné rozlišení.)</figcaption>
</figure>

Prvním krokem v navrhovací fázi byl **ideační workshop v rámci akce Dny AI**. Tři paralelní skupinky - mezi nimi zástupkyně reálných služeb i CTO jedné zavedené firmy a jednoho AI startupu - prozkoumaly, co nám dnes LLM pro takový nástroj umožňují, a co od něj vlastně čekat. Workshop otevřel témata, která se pak táhla celým projektem: eskalace na živého člověka v nouzi, důvěryhodnost digitálního nástroje u citlivých situací a klady i zápory antropomorfismu (tedy nakolik nástroj „polidštit“ a dát mu více "lidskou" identitu).

Z rešerše existujících AI nástrojů a literatury jsem si vydefinoval **interakční principy**, o které jsem se při návrhu opíral - *learnability* (nástroj se používá zřídka, musí jít pochopit i po delší pauze), *progressive* a *staged disclosure* (neukázat všechno najednou a snížit tlak na kvalitu první interakce), *explorability* (bezpečně nástroj vyzkoušet bez strachu z chyby) a poctivé *indikátory průběhu* (ať uživatel ví, kde v procesu je a co jej v daný moment čeká). K nim sada návrhových vzorů pro tvorbu uživatelských rozhraní AI nástrojů: *re-stating* (systém převypráví, čemu rozuměl), *suggestions* a *open input*. I samotné jméno Jarmilka je vědomá **metafora** - nastavuje očekávání, že tu se mnou někdo je a systéme mě provází.

Pak přišlo skicování. Postupoval jsem od „high level“ pohledu ke konkrétním obrazovkám, vracel se ke starým nápadům a ty neperspektivní zahazoval. U papíru jsem si vytvořil modulární systém, abych mohl varianty obrazovek rychle skládat vedle sebe. Celou dobu jsem si opakoval jednu otázku: *„Jaká je nejštíhlejší verze, která uživatele dovede k cíli a neruší ho ničím navíc?“* Z toho se vyloupl proces o pěti krocích, kterým Jarmilka uživatele provází: **důvěra → popis → kontrola → výběr → kontakt**.

# Test s lidmi

<div class="float-wrap">
<figure class="float-figure">
<a href="/dis-kisk/img/jarmilka-testing-paper.png" target="_blank" rel="noopener">
<img src="/dis-kisk/img/jarmilka-testing-paper.png" alt="Ruka účastníka prochází papírovým prototypem Jarmilky na stole v kavárně, vedle káva a poznámky" />
</a>
<figcaption>Papírový prototyp v akci - moderované testování. (Klikni pro plné rozlišení.)</figcaption>
</figure>

První verzi jsem ověřoval **moderovaným uživatelským testováním** v kombinaci s jeho odnoží **RITE** - tj. opravuj a testuj průběžně. Prošel jsem ji s pěti zástupci a zástupkyněmi cílové skupiny, každý a každá na stejném scénáři o šesti navazujících úkolech, s přemýšlením nahlas. Po prvním a třetím testu jsem do návrhu zapracoval změny, takže poslední dva testy už ověřovaly výrazně lepší verzi. Na závěr každého sezení proběhl standardní dotazník **SUS**.

Nejcennější bylo sledovat, kde se uživatelé „ztratí“. Zdaleka nejvíce problematický moment byl přechod mezi prvním a druhým krokem - měnilo se mezi nimi rozložení ovládacích prvků a uživatelé hlásili vizuální přehlcení právě ve chvíli, kdy ještě nestihla vzniknout důvěra v nástroj.

> „Dostala jsem se do jinýho módu a nevím, co se tady po mně chce. Není vybudovaná důvěra, takže mám strach psát citlivý věci. Jsem z toho naměkko.“

Z pozorování a analýzy dat vykrystalizovala čtyři témata ke zlepšení před druhou verzí:

- **Vizuální přehlcení.** Stejná data ve dvou různých prvcích a podobách (bullet pointy i fulltext) uživatele spíš zahlcovala, než aby pomáhala.
- **Konzistentní a srozumitelný copywriting.** Nejednotná terminologie a místy příliš technický, neosobní jazyk. (*„Pojem časová perspektiva je hodně abstraktní, musela bych se nad tím hodně zamyslet.“*)
- **Srozumitelná navigace mezi kroky.** Přechod mezi kroky nebyl dost čitelný, princip staged disclosure jsem zatím neuchopil dobře.
- **Zvýšení důvěryhodnosti.** Úvodní navození důvěry je u takového nástroje klíčový moment - tam, kde chybělo, kazilo to celou další interakci.

</div>

# Finální podoba

Na základě zjištění vznikla **druhá verze**, která opravuje nejzávažnější problémy a je převedená do digitálního interaktivního prototypu. Ovládací prvky jsem sjednotil, úvod je přívětivější a rovnou říká, kolik času interakce zabere. Formulace jsou osobnější a méně stigmatizující, doptávání konkrétnější a v detailu služby zmizely matoucí prvky ve prospěch jediné jasné akce.

<figure class="hero-figure">
<a href="/img/2024/case-studies/jarmilka/jarmilka-laptop.png" target="_blank" rel="noopener">
<img src="/img/2024/case-studies/jarmilka/jarmilka-laptop.png" alt="Úvodní obrazovka finální verze nástroje Jarmilka v okně prohlížeče na notebooku" />
</a>
<figcaption>Jarmilka, druhá verze - úvodní obrazovka, která vítá a buduje důvěru. (Klikni pro plné rozlišení.)</figcaption>
</figure>

Interaktivní prototyp druhé verze si můžete **[proklikat na vlastní kůži](https://www.figma.com/proto/bfxhhYTW26rwx3KTTqx1GS/Jarmilka?node-id=9-2&p=f&viewport=237%2C1264%2C0.25&t=yPvV5ZNldI2a81JY-0&scaling=scale-down&content-scaling=fixed&starting-point-node-id=9%3A3){target="_blank"}**. Celý příběh - od cílů a interakčních principů přes testování až po doporučení dalších kroků - jsem sepsal do **[studie ke čtení (PDF)](/case-studies/jarmilka/uzivatelska-studie-Jarmilka.pdf){target="_blank"}**.

# Další kroky rozvoje

Cest, kterými se dá pokračovat, je nespočet. Tím nejdůležitějším krokem je ověřit, že provedené změny byly opravdu k lepšímu - na to by bohatě stačilo levnější nemoderované testování, tentokrát zacílené hlavně na **budování důvěry**, na kterou v prvním kole nezbyl prostor a ukázala se jako klíčová. Dále se nabízí řada nápadů, které se do první verze nevešly: hlasový vstup, ukládání a export výsledků, předávání získaných informací službám při prvním kontaktu, prvky [generativního UI](https://www.nngroup.com/articles/generative-ui/){target="_blank"} nebo funkce „chci pomoct hned teď“ pro akutní situace.

Z celého studia na DIS mě tenhle projekt posunul v „tvrdých“ design kompetencích asi nejvíc. Byl jsem u jednoho projektu od definice priorit a výzkumného záměru až po dodání otestovaného řešení, což je zkušenost, kterou si nesmírně cením. Bavilo mě zkoumat „hype“ téma AI optikou designu a mám pořád pocit, že se ty správné vzory teprve hledají - a že je to vlastně docela zábava být u toho. Celý příběh studie jsem shrnul i v [semestrální prezentaci](/ixd-25/){target="_blank"} v rámci kurzu interakčního designu.

_A taky díky Veronu, Baru i Andreo za interní design critique, která byla jedním z highlightů semestru, který můj návrh pomohl posunout o kus dál. Taky díky agentuře JINAG za možnost na projektu pracovat a všem, kdo si sedli k papírovému prototypu a poctivě nahlas přemýšleli - bez vás by Jarmilka zůstala jenom hezkým nápadem._

**[Detailněji popisuji průbeh projektu ve své bakalářské práci](/dis-kisk/thesis/)**
