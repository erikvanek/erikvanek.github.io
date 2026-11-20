---
title: Je programování mrtvé? Případová studie prototypování s pomocí LLM
date: 2024-07-16
translationKey: is-coding-dead
translatedFrom: en
permalink: /cs/psani/je-programovani-mrtve/
---

Jako service designéra, který dřív programoval, mě vždycky fascinovalo, kde se potkává design s technologiemi. Vyzkoušel jsem si malý projekt pro radost, který ukazuje, jak zásadně umí AI proměnit prototypování.

V tomhle článku podrobně popisuju, jak jsem s pomocí AI rychle naprototypoval webovou aplikaci, a nabízím postřehy pro designéry, kteří chtějí podobné nástroje využít. Celý proces netrval víc než 30 minut.

Interaktivní demo toho, co stavíme, najdete [tady](/documents/writing/mindsort/) 🔗

<figure>
  <video controls autoplay loop muted playsinline src="/img/writing/is-coding-dead/mindsort.mp4"></video>
  <figcaption>Jak se prototyp v čase vyvíjel. Mrkněte na živou verzi!</figcaption>
</figure>

Prompty nechávám v původním znění v angličtině.

#### Krok 1: Sběr dat a první koncept

> **Prompt:** Scrape to the bone two websites I give you as an attachment. One is a registry of social services in my region, the other one is a registry of health services in whole country. I want you to scrape all different types of services those two pillars serve to their clients and customers and then we do something more with it. Display those services you scraped as a comma-separated list of services.

Tímhle promptem celý projekt odstartoval. AI sice weby doopravdy scrapovat neuměla, ale ze sdílených informací sestavila ucelený seznam zdravotních a sociálních služeb.

Do Clauda jsem nahrál obsah dvou webů – prvním je [Katalog sociálních služeb Jihomoravského kraje](https://prostedoma.jmk.cz/Sluzby/Vyhledavani) a druhým [Národní registr poskytovatelů zdravotních služeb](https://nrpzs.uzis.cz/index.php?pg=vyhledavani-poskytovatele--pro-verejnost#). Tenhle krok simuloval sběr dat, který by normálně obnášel skutečný scraping webů nebo analýzu dat.

#### Krok 2: Zpracování a kategorizace dat

> **Prompt:** Reduce them to some broader categories based on similarity, say 20-30 tops.

AI rozsáhlý seznam zhustila do 20 širších kategorií. Tenhle krok napodobuje fázi analýzy a syntézy v designovém procesu, kdy se surová data přetavují do zvládnutelnějších a smysluplnějších kategorií.

#### Krok 3: Návrh herního rozhraní

> **Prompt:** From those categories create an interactive single page website that is an interactive card-sorting game which starts with user seeing all those categories. And then by intuitively combing them they can combine and thus categories of services.

Z tohohle promptu vznikla základní HTML struktura hry na třídění karet, včetně drag-and-drop a vytváření kategorií. Ukazuje, jak se dají složité požadavky na design předat AI a převést do funkčního kódu.

#### Krok 4: Lepší uživatelský zážitek

> **Prompt:** Add a feature that allows to name each cluster

AI přidala možnost vytvořené kategorie pojmenovat, takže hra je interaktivnější. Je to ukázka toho, jak snadno se dají s pomocí AI doplnit konkrétní funkce.

#### Krok 5: Odeslání výsledků

> **Prompt:** Add a feature that allows to send the results of the categorization to an email address kemboi@ezekiel.yup

Výsledkem bylo tlačítko „Send Results“, které posbírá uživatelovy kategorie a otevře e-mailového klienta s předvyplněnou zprávou. Je vidět, že AI zvládne i složitější funkce, které pracují s daty a s akcemi mimo aplikaci.

#### Krok 6: Lepší vizuál a navádění uživatele

> **Prompt:** Add a visual cue to nudge users to create between 6-8 categories. Use mild tones of pastel colors and add a counter that nudges positively to create more categories if there are less than 6. Be playful in copyrighting and use some sort of gratification pattern when there are 3, 2 and 1 category remaining to 6.

AI doplnila počítadlo kategorií s povzbudivými hláškami a vizuální zpětnou vazbou a pastelovými barvami vylepšila vzhled hry. Tenhle krok ukazuje, že AI jde nasměrovat ke konkrétním návrhovým vzorům a vylepšením uživatelského zážitku.

#### Krok 7: Optimalizace pro mobil

> **Prompt:** Make it mobile friendly

Následovaly úpravy responzivního designu, takže hra dobře funguje na počítači i na mobilu. Je vidět, že AI umí existující kód přizpůsobit různým zařízením.

#### Krok 8: Opravy chyb a poslední úpravy

Posledních pár výměn se točilo kolem nalezení a opravy chyby s dvojklikem a finálních úprav kódu. Tenhle iterativní proces odpovídá skutečnému vývoji, kde je testování a dolaďování zásadní.

Zamyšlení nad procesem

### Tenhle projekt ukazuje několik klíčových věcí o prototypování s pomocí AI v service designu:

- Rychlé iterace: Kód jde rychle vygenerovat i upravit, takže se dá rychle prototypovat a experimentovat.
- Most mezi designem a vývojem: Designéři se základní znalostí programování zvládnou vytvořit funkční prototypy i bez rozsáhlých vývojářských dovedností.
- AI jako spolupracovník: AI funguje jako znalý partner, který v průběhu celého designového procesu nabízí řešení a návrhy.
- Na jasné komunikaci záleží: Kvalita výstupu hodně závisí na tom, jak jasné a konkrétní jsou prompty.
- Limity a dohled: AI sice umí kód vygenerovat rychle, ale lidský dohled je zásadní, aby věci fungovaly, byly bezpečné a odpovídaly cílům návrhu.
- Příležitost se učit: Práce s AI může designérům pomoct lépe pochopit principy programování a osvědčené postupy.

### Výzvy a na co myslet

Proces byl sice velmi efektivní, ale je dobré zmínit i pár výzev:

- Prompt engineering: Psát účinné prompty je dovednost, která chce praxi a vypilování.
- Konzistence: Udržet konzistenci napříč různými kusy kódu vygenerovanými AI může být náročné.
- Složitější funkce: Pokročilejší funkce můžou vyžadovat podrobnější prompty nebo zásah člověka.
- Testování a ověřování: Důkladné testování je zásadní, protože kód od AI může obsahovat nečekané chyby.

## Závěr 🚀

Prototypování s pomocí AI je v service a digitálním designu výrazný skok kupředu. Designéři díky němu můžou rychle přivádět nápady k životu, testovat koncepty a rychle iterovat. Designové myšlení ani znalost programování ale nenahrazuje. Tyhle dovednosti naopak zesiluje, takže designéři můžou pracovat efektivněji a soustředit se na náročnější designové výzvy.

S tím, jak se technologie bude vyvíjet, můžeme čekat ještě propracovanější nástroje, které hranici mezi designem a vývojem dál rozmažou. Pro service designéry bude klíčem k úspěchu v tomhle novém prostředí tyhle nástroje přijmout, a přitom si udržet kritický pohled a pevné designové principy.

Kolegy designéry vybízím, ať s AI ve svém prototypování experimentují. Začněte v malém, buďte zvědaví a nebojte se iterovat.
