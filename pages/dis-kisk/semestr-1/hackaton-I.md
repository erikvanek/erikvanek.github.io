---
title: 'Hackaton'
subtitle: 'jako hutný zakončení prvního semestru'
date: 2024-01-28
layout: dis-kisk-note.njk
hideNavigation: true
tags: ['dis', 'semestr1']
permalink: /{{page.fileSlug}}/
---

Jedna z posledních aktivit, která mě v 1. semestru byla účast na společném hackatonu, do kterého jsme s týmem šli s výzvou, která se týkala zkompetentňování dospělých ve vztahu k duševnímu zdraví dětí ve věku cca 2. stupně základní školy.
Vycházeli jsme [ze](https://nevypustdusi.cz/2023/10/20/dusevni-zdravi-zajima-dve-tretiny-deti-vysledky-noveho-pruzkumu-spolecnosti-t-mobile-organizace-nevypust-dusi-a-agentury-g82-ukazuji-ze-mladi-lide-hledaji-pomoc-hlavne-ve-svem-okoli/){target="\_blank"} [spousty](https://open.spotify.com/episode/30d7thGp3MoTEudV552wfM?si=84e5fcd5756b4096&nd=1&dlsi=b76848c375104871){target="\_blank"} [dat](https://www.nudz.cz/pro-media/tiskove-zpravy/narodni-monitoring-dusevniho-zdravi-deti-40-vykazuje-znamky-stredni-az-tezke-deprese-30-uzkosti-odbornici-pripravuji-preventivni-opatreni){target="\_blank"}, která popisují špatný a ne zrovna lepšící se stav duševního zdraví u nastupující generace. Zároveň jsme věděli, že se jedná o obrovský problém, který bude náročný rozseknout v průběhu den a půl dlouhého setkání. V týmu lidí, kteří spolu nikdy pořádně nepracovali, s hodně narychlo spíchnutým výzkumem a taky možná s chutí se trošku spolu i seznámit když už spolu studujem během těch dvou společných dní.

## Jak to šlo?

Když jsme si procházeli nasbíraná data - ať už ty získaná od stolu nebo v rámci rozhovorů provedených pár dní před hackatonech - dařilo se nám nacházet dost tématických překryvů a momentů, kdy se nám data z různých zdrojů vzájemně potvrzovala.

Přili jsme si k tomu, že pomocí našeho úsilí na hackatonu chceme z dospělých "majáky", ke kterým se děti můžou v případě nepohody obrátit a spolehnout se na ně. Zároveň velká se velká část problému týká mezilidských vztahů, jejichž kvalitu bychom rádi pomohli posílit.

Nebylo úplně snadný se někdy v týmu o osmi lidech dohodnout na tom, jakým směrem bychom se rádi dál ubírali, jestli teď chceme ještě víc divergovat anebo ještě o kus víc konvergovat. Zároveň jsme se ale nikdy nedostali do do nějakého totálního záseku nebo paralýzy.

Nakonec jsme během naší spolupráce vygenerovali dva hlavní výstupy. Jedním z nich byl klikatelný prototyp pro mobilní aplikaci, která dospělým přibližuje svět mladší generace. Naše hypotéza je, že existuje část dospělých, pro které je náročné držet tempo s tématy, která jsou relevantní pro mladší generaci. Může to být jazyk, kulturní reference, sociální preference apod. Pomocí gamifikovaného nástroje jsme chtěli nastínit jednu možností jak tuto propast postupně zacelovat.


{% assign path = 'dis-kisk/img/testing-pavucina.jpg' %}
{% assign title = 'Testování návrhu systémové změny' %}
{% render 'figure.njk', path: path, title: title %}

Druhý výstup byl o poznání abstraktnější a na problematiku se koukal více ze systémového hlediska. Snažili jsme se zamyslet nad tím, jak bychom mohli pomoci školám se stát lepšími partnery pro děti ohrožené psychickými problémy a jak je v tom procesu stávání se lepšími partnery podpořit.

Vytvořili jsme koncept pracovně pojmenovaný _Školní pavučina vyspělosti_, který koncepčně čerpá z [UX maturity model](https://www.nngroup.com/articles/ux-maturity-model/){target="_blank"}u. Vytipovali jsme několik oblastí, kde by bylo možné školám pomáhat zlepšovat své kapacity a stát se tak důvěryhodnějšími partnery pro ohrožené děti. Náš koncept jsme otestovali se zástupcem z jedné z brněnských základních škol a získali jsme na něj poměrně bohatou zpětnou vazbu.

## Random poznámky
- Jak se říká, že zážitek nemusí být pozitivní, hlavně když je intenzivní tak to tady za mě neplatilo protože za mě tady platí oboje. Jasně, že jsem byl na konci vyřízenej, ale zároveň dost nabitej společnou energií a tím, jak nám to spolu šlo a že jsme byli schopní přijít se dvěma super výstupy byť jsou to jen hodně _"quick and dirty"_ koncepty.
- Za sebe jedna z nejdůležitějších point pro podobné aktivity v budoucnu je se zamyslet nad tím, jak do celého procesu nacpat víc iterací. Reálně jsme si prošli jednu a na tu vzali zpětnou vazbu. Za mě by bylo super, kdybychom dokázali alespoň třeba tři abychom lépe věděli jak si se svým projektem stojíme. Zároveň by bylo krásný jej umět posunout i dál za horizont školního workshopu a to je po jedný iteraci prostě nemožný.
- Zároveň pro mě bylo testování tak obecného a širokého konceptu jedním z highlightů celého našeho úsilí. I přes kumulující se únavu byl pohled někoho zvenčí strašně osvěžující a oči otevírající. Zároveň to, že jsme se o tématu dokázali bez nějakého konkrétnějšího testovacího skriptu bavit nějakých 40 minut mi naznačuje, že náš nápad není úplně k zahození.
-  Jsem rád, že jsme zvládli i dostatek kvalitního času socializací ve výběru z hroznů místní gastronomie. Z jedné návštěvy mám trošku mrzení, ale jsem rád, že jsme nakonec v pátek skončili v hospodě a ne v knihovně. Designeři patří mezi lidi a ne mezi knihy 😊. Zároveň teda sehnat v pátek v devět večer místo pro 20 hladových lidí není úplná zábava.
-   Celý workshop byl hybridně - tj. měli jsme online jednu členku týmu. Za sebe si myslím, že jsme udělali dost pro to, abychom ji do procesu kvalitně zahrnuli. Ale co si budem - je to prostě náročný. Pro všechny. Myslím, že by byl vhodnější formát aby ti, kteří se nemůžou zúčastnit fyzicky, participovali společně online. Nejspíš to není nejvíc inkluzivní a ve výsledku by pak někdo pracoval na projektu o který třeba nemá zájem. Ale myslím si, že je to efektivnější model.