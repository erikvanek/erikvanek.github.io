---
title: 'Hackaton'
subtitle: 'jako hutný zakončení prvního semestru'
date: 2024-01-28
layout: dis-kisk.njk
hideNavigation: true
tags: ['dis', 'semestr1']
permalink: /{{page.fileSlug}}/
---

Jedna z posledních aktivit, která mě v 1. semestru čekala, byla účast na společném hackatonu, do kterého jsme s týmem šli s [výzvou](https://kisk.phil.muni.cz/100metod/designova-vyzva){target="_blank"}, která se týkala zkompetentňování dospělých ve vztahu k duševnímu zdraví dětí ve věku cca 2. stupně základní školy.

Vycházeli jsme [ze](https://nevypustdusi.cz/2023/10/20/dusevni-zdravi-zajima-dve-tretiny-deti-vysledky-noveho-pruzkumu-spolecnosti-t-mobile-organizace-nevypust-dusi-a-agentury-g82-ukazuji-ze-mladi-lide-hledaji-pomoc-hlavne-ve-svem-okoli/){target="_blank"} [spousty](https://open.spotify.com/episode/30d7thGp3MoTEudV552wfM?si=84e5fcd5756b4096&nd=1&dlsi=b76848c375104871){target="_blank"} [dat](https://www.nudz.cz/pro-media/tiskove-zpravy/narodni-monitoring-dusevniho-zdravi-deti-40-vykazuje-znamky-stredni-az-tezke-deprese-30-uzkosti-odbornici-pripravuji-preventivni-opatreni){target="_blank"}, která popisují špatný a postupně se zhoršující stav duševního zdraví u starších žáků základních škol. Zároveň jsme věděli, že se jedná o [zašmodrchaný problém](https://en.wikipedia.org/wiki/Wicked_problem){target="_blank"}, který bude náročný rozseknout v průběhu den a půl dlouhého setkání. V týmu lidí, kteří spolu nikdy pořádně nepracovali, s hodně narychlo spíchnutým výzkumem a taky možná s chutí se během těch dvou společných dní trošku spolu seznámit když už spolu studujeme a ještě víc než dva roky v tom chceme pokračovat.

## Jak to šlo?

Když jsme si procházeli nasbíraná data - ať už ta získaná od stolu nebo v rámci rozhovorů provedených pár dní před hackatonem - dařilo se nám nacházet dost tématických překryvů a potvrzení dílčích hypotéz z různých zdrojů dat.

Při přemýšlení nad dospělými v kontextu našeho problému jsme používali metaforu majáku. Ten reprezentuje člověka, ke kterému se děti můžou v případě nepohody obrátit a spolehnout se na bezpečí a jistotu podpory. Dalším silným tématem, které nám z dat vycházelo, byla důležitost vzájemného vztahu mezi dětmi i dospělými. Během naší společné práce jsme se snažili nacházet cesty a příležitosti jak tuto vazbu posilovat.

Nebylo úplně snadný se někdy v týmu o osmi lidech dohodnout na tom, jakým směrem bychom se rádi dál ubírali. Například jestli v daný moment chceme ještě více divergovat nebo už přišel moment, kdy chceme naši pozornost zaměřovat spíše do hloubky. Zároveň jsme se ale nikdy nedostali do do nějakého totálního záseku nebo paralýzy.

Nakonec jsme během naší spolupráce vygenerovali dva hlavní výstupy. Jedním z nich byl klikatelný prototyp pro mobilní aplikaci, která dospělým přibližuje svět mladší generace. Naše hypotéza je, že existuje část dospělých, pro které je náročné držet tempo s tématy, která jsou relevantní pro mladší generaci. Může to být jazyk, kulturní reference, sociální preference apod. Pomocí gamifikovaného nástroje jsme chtěli nastínit jednu možností, jak tuto propast postupně zacelovat.


{% assign path = '../dis-kisk/img/testing-pavucina-rotated.jpg' %}
{% assign title = 'Testování návrhu systémové změny' %}
{% render 'figure.njk', path: path, title: title %}

Druhý výstup byl o poznání abstraktnější a na problematiku se koukal více ze systémového hlediska. Snažili jsme se zamyslet nad tím, jak bychom mohli pomoci školám se stát lepšími partnery pro děti ohrožené psychickými problémy a jak je v tom procesu stávání se lepšími partnery podpořit.

Vytvořili jsme koncept pracovně pojmenovaný _Školní pavučina vyspělosti_ (což je zpětně hodně bláznivý název pro nástroj popisující nějaký kompetenční model), který koncepčně čerpá z [UX maturity model](https://www.nngroup.com/articles/ux-maturity-model/){target="_blank"}u.

Vytipovali jsme několik oblastí, kde by bylo možné školám pomáhat zlepšovat své kompetence a kapacity a stát se tak důvěryhodnějšími partnery pro ohrožené děti. Náš koncept jsme otestovali se zástupcem z jedné z brněnských základních škol a získali jsme na něj poměrně bohatou zpětnou vazbu.

## Finální poznámky
- Jak se říká, že zážitek nemusí být pozitivní, hlavně když je intenzivní tak to tady za mě neplatilo protože za mě tady platí oboje. Jasně, že jsem byl na konci vyřízenej, ale taky dost nabitej společnou energií a tím, jak nám to spolu šlo a že jsme byli schopní přijít se dvěma super výstupy byť jsou to hodně _"quick and dirty"_ koncepty.
- Za sebe jedna z nejdůležitějších rovin pro plánování podobných aktivit v budoucnu je se zamyslet nad tím, jak do celého procesu nacpat víc iterací. Reálně jsme si prošli jednu a na tu vzali zpětnou vazbu. Za mě by bylo super, kdybychom dokázali alespoň třeba tři abychom lépe věděli jak si se svým projektem stojíme. Kdybychom chtěli v případě zájmu naši práci posunout za horizont školního workshopu tak to po jediný iteraci prostě není možný.
- Jedním z highlightů naší práce bylo uživatelské testování návrhu kompetenčního modelu pro školy. Myslím, že je obecně těžší testovat abstraktnější a systémovější koncepty než jednotlivé nástroje jako jsou třeba aplikace nebo webovky. I přes kumulující se únavu byl pohled někoho zvenčí strašně osvěžující a oči otevírající. Zároveň to, že jsme se o tématu dokázali bez nějakého konkrétnějšího testovacího skriptu bavit nějakých 40 minut mi naznačuje, že náš nápad není úplně k zahození.
- Jsem rád, že jsme zvládli i dostatek kvalitního času socializací ve výběru z hroznů místní gastronomie. V něčem mi přijde fajn, že jsme nakonec z velké části v pátek skončili na chvíli v hospodě a ne pouze v knihovně (byť je krásná). Designeři patří mezi lidi a ne mezi knihy 😊. V každém případě bude příště fajn plánovat usazení 20 hladových lidí trošku víc dopředu protože řešit to ad-hoc v pátek v devět večer není úplně triviální zadání.
- Celý workshop byl hybridní - tj. měli jsme online jednu členku týmu. Za sebe si myslím, že jsme udělali dost pro to, abychom ji do procesu kvalitně zahrnuli. Ale co si budem - je to prostě náročný. Pro všechny. Myslím, že by byl vhodnější formát aby ti, kteří se nemůžou zúčastnit fyzicky, participovali společně online. Nejspíš to není nejvíc inkluzivní a ve výsledku by pak někdo pracoval na projektu o který třeba nemá zájem. Ale myslím si, že je to efektivnější model.