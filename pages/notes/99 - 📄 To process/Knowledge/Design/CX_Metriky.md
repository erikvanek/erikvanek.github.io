---
tags:
  - CustomerExperience
  - Metrics
  - ServiceDesign
resources:
  - https://www.surveymonkey.com/curiosity/net-promoter-scores-nps-across-the-world/
  - https://www.nngroup.com/articles/nps-ux/
---
# Metriky pro CX a design služeb

## Postojové metriky pro měření celkového zážitku

### NPS: Net Promoter Score
- **Co měří**: Loajalitu zákazníka a jeho ochotu doporučit službu
- **Jak se měří**: Zákazník odpovídá na otázku "Jak pravděpodobné je, že byste doporučil(a) naši službu přátelům či kolegům?" na škále 0-10
- **Vyhodnocení**:
  - Promotéři (9-10): Velmi spokojení a loajální zákazníci
  - Pasivní (7-8): Spokojení, ale s rezervou
  - Detraktoři (0-6): Nespokojení zákazníci
- **Výpočet**: NPS = % Promotérů - % Detraktorů
- **Výhody**: Poskytuje strategický pohled na dlouhodobou loajalitu
- **Kritika**:
  - Přílišné zjednodušení složitosti zákaznické zkušenosti
  - Metodologické problémy a kulturní rozdíly v interpretaci
  - Nejasná prediktivní hodnota pro obchodní výsledky
  - Riziko zaměření na číslo místo na konkrétní akce

### CSAT: Customer Satisfaction Score
- **Co měří**: Přímou spokojenost zákazníka s konkrétní interakcí nebo službou
- **Jak se měří**: Hodnocení spokojenosti na jednoduché škále (1-5 nebo 1-7)
- **Výhody**: Rychlý a přímý způsob získání zpětné vazby
- **Omezení**: Ovlivněno momentální náladou a aktuální zkušeností

### CES: Customer Effort Score
- **Co měří**: Míru úsilí, které zákazník musí vynaložit, aby dosáhl požadovaného výsledku
- **Jak se měří**: Otázka typu "Jak snadno jste dokázali vyřešit svůj problém?"
- **Výhody**: Pomáhá identifikovat překážky a neintuitivní místa v zákaznické cestě
- **Omezení**: Měří jen jeden aspekt zkušenosti - úsilí

## Porovnání postojových metrik

| Škála | Zaměření | Použití | Interpretace |
|-------|----------|---------|--------------|
| NPS | Dlouhodobá loajalita a ochota doporučit | Strategické rozhodování, sledování růstu značky | Souhrnný obraz o celkové spokojenosti, méně detailní |
| CSAT | Okamžitá spokojenost s konkrétní interakcí | Rychlá zpětná vazba, vyhodnocení kampaní | Přímé hodnocení aktuální zkušenosti |
| CES | Míra úsilí zákazníka pro dosažení cíle | Identifikace překážek a optimalizace | Zaměřuje se na procesní nedostatky |

## Produktové metriky

### North Star metrika
- Jeden klíčový indikátor reflektující hlavní hodnotu produktu pro zákazníky
- Vyjadřuje hlavní dlouhodobý cíl firmy
- Měří, jak dobře produkt naplňuje potřeby a přináší hodnotu
- Příklad: Pro streamingovou službu může být North Star metrikou počet hodin sledování

### OKR (Objectives - Key Results)
- Rámec pro stanovování ambiciózních cílů (Objectives) a měřitelných výsledků (Key Results)
- Klade důraz na kvalitativní, inspirativní cíle podpořené konkrétními metrikami
- Používá se typicky v kvartálních cyklech
- Slouží k nastavení směru, prioritizaci úsilí a podpoře růstu

### KPI (Key Performance Indicators)
- Konkrétní měřítka pro operativní monitoring výkonnosti
- Zaměření na kontinuální sledování klíčových ukazatelů
- Všechny KPI jsou metrikami, ale ne všechny metriky jsou KPI

## Pirate/AARRR framework
Rámec používaný v startupovém prostředí k měření a optimalizaci zákaznické cesty:
- **Acquisition** (Získání): Jak se uživatelé dostávají k produktu
- **Activation** (Aktivace): První zkušenost uživatele s produktem, "wow" moment
- **Retention** (Udržení): Jak se daří udržet uživatele aktivní a angažované
- **Revenue** (Příjem): Jak produkt generuje příjmy
- **Referral** (Doporučení): Jak uživatelé doporučují produkt dalším potenciálním zákazníkům

## Konkrétní produktové metriky

### Konverzní poměr
- Podíl návštěvníků, kteří vykonají žádoucí akci
- Výpočet: (počet konverzí / celkový počet návštěvníků) × 100 %
- Příklad: Pokud web navštíví 1000 lidí a 50 provede nákup, konverzní poměr je 5 %

### Retence
- Procento zákazníků, kteří se po určitém časovém období vracejí
- Výpočet: (počet aktivních uživatelů na konci období / počet na začátku) × 100 %
- Příklad: Pokud získáte 1000 nových uživatelů a po měsíci se vrátí 600, retence je 60 %

### Míra odchodu (Churn)
- Procento zákazníků, kteří během určitého období přestanou používat produkt
- Výpočet: (počet odchozích zákazníků / počáteční počet zákazníků) × 100 %
- Příklad: Pokud máte 100 zákazníků a 10 odejde, míra odchodu je 10 %

## Ověřování cenové citlivosti

### Van Westendorpova metoda (Price Sensitivity Meter)
- Vychází z předpokladu, že zákazníci mají představy o příliš nízké a příliš vysoké ceně
- Respondenti odpovídají na čtyři otázky:
  1. "Za jakou cenu je produkt tak drahý, že byste ho nekoupili?"
  2. "Za jakou cenu je produkt drahý, ale ještě byste o něm uvažovali?"
  3. "Za jakou cenu je produkt levný a atraktivní?"
  4. "Za jakou cenu je produkt tak levný, že to vzbuzuje podezření na nízkou kvalitu?"
- Pro každou otázku se vytvoří kumulativní frekvenční křivka
- Výhody: Jednoduchost, nízké náklady, přímá zpětná vazba
- Omezení: Rozdíl mezi deklarovaným a skutečným chováním, citlivost na formulaci otázek

### Gabor-Grangerova metoda
- Kvantitativní technika pro určení optimální ceny maximalizující tržby
- Postup:
  1. Stanovení cenového rozsahu s několika body
  2. Dotazování respondentů na pravděpodobnost nákupu při každé ceně
  3. Vytvoření křivky poptávky
  4. Určení cenového bodu s nejvyšším očekávaným příjmem
- Výhody: Jednoduchost, přímá interpretace, efektivita, nízké náklady
- Omezení: Závislost na deklarovaných preferencích, citlivost na formulaci otázek

### Měření elasticity poptávky
- Analýza reálných dat o vlivu změny ceny na poptávku
- Metody:
  - Analýza existujících prodejních dat
  - A/B testování s různými cenovými úrovněmi

## Související poznámky
- [[DESB42_Designove_experimenty|DESB42: Designové experimenty]]
- [[UX_Metriky|UX Metriky]]
- [[99 - 📄 To process/UX_Customer_Experience|UX a zákaznická zkušenost]]
- [[Designove_experimenty_metodika|Metodika designových experimentů]]
- [[99 - 📄 To process/Measuring Business Value|Měření obchodní hodnoty]]
- [[99 - 📄 To process/Product discovery|Product Discovery]]
