---
theme: ../themes/muni-arts
title: SDW-26 I - Úvod
info: |
  Service design workshop, podzim 2026, setkání 1 (17. 9.).
  Draft - kondenzováno z kapitoly IO "01 Setkání 1 - Úvod".
  Revize 14. 9. podle braindumpu: nový otvírák (Simon), kolečko na tři otázky,
  wow slide přesunutý před skupinovou práci. Running order: backlog 001.
layout: cover
session: 1
sessionTitle: Úvod, organizace kurzu, motivace k prototypování
date: 17. 9. 2026
transition: slide-left
mdc: true
hideInToc: true
---

<!--
TENHLE SLIDE ZŮSTÁVÁ ZMRZLÝ NA PLÁTNĚ, ZATÍMCO SE LIDI SCHÁZEJÍ. Pustit ho dřív, než přijde první člověk.
Layout si všechno bere z frontmatteru (course, session, sessionTitle, date, facilitator) - tělo slidu se nikam nevykresluje, nemá slot. Takže tady text needitovat, měnit frontmatter nahoře.
Důsledek, který se hodí: moje jméno, KISK MUNI a datum jsou na plátně celou dobu, co lidi chodí dovnitř. Otázku "kdo to tam stojí" si přečtou sami a nemusím na ni pálit slide ani čas.
Až se sál usadí, přepnu na uvítací slide a jdu rovnou do příběhu. Žádné bio, žádná organizace kurzu.
-->

---
layout: section-break
class: welcome-slide
hideInToc: true
---

# Vítejte v SDW 2026

<style>
/* h1 and p are authored in this slide, so they carry its scope id and need no prefix.
   .section-body belongs to the layout component, so it only reachable through :deep(). */
.welcome-slide :deep(.section-body) { max-width: 52rem; }
.welcome-slide h1 { font-size: 5rem !important; } /* line-height now comes from the theme's global heading rule. */
.welcome-slide p { font-size: 1.6rem !important; opacity: 0.9; }
</style>

<!--
První mluvené slovo hodiny. Pozdravit, nechat sál dosednout, nespěchat.
Žádné odrážky, žádná organizace, žádné "kurz je strukturovaný takhle". Jenom uvítání a rozběh.
Spodní řádek je nájezd na kohoutek - řeknu ho a přepnu. Od téhle věty do videa už to jede samo.
-->

---
layout: full-image
image: /mimo-provoz-II-sdr.jpg
fit: contain
dim: false
hideInToc: true
hideProgress: true
---

<div style="position:absolute;left:37.4%;top:75.8%;transform:translate(-50%,-50%);font-size:80px;line-height:1;">🥳</div>

<!--
TOHLE JE TO „ROZTOMILÉ". Přichází hned po uvítání. Žádný text na slidu, jenom fotka - mluvím přes ni.
Kohoutek na záchodě podniku, kde si evidentně dávají záležet. Rozbil se. Někdo to vyřešil ručně psanou kartičkou a oranžovou mašlí, ne izolepou a vytištěnou cedulí.
Nechat sál dojít k tomu, že je to milé. „Ah, hezký, někdo si dal záležet." PŘESNĚ TAM JE CHCI MÍT, než pustím video na dalším slidu.
Nerozbalovat tady pointu. Tenhle slide je jenom ta první půlka obratu.
Fotka je Erikova vlastní, čtvercový ořez (2731x2732) - proto `fit: contain`, aby se neořízla na 16:9.
-->

---
hideInToc: true
class: video-slide
background: '#000000'
hideProgress: true
---

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<div style="position:absolute;top:-2px;left:-2px;right:-2px;bottom:-2px;display:flex;align-items:center;justify-content:center;background:#000000;overflow:hidden;">
  <video
    :src="asset + 'mimo-provoz.mp4'"
    autoplay loop muted playsinline
    style="height:140%;width:auto;display:block;"
  ></video>
</div>

<!--
TOHLE JE POINTA. Takhle se ten kohoutek rozbil.
Páčka je drobná a celá výtoková ramena se volně otáčejí, takže člověk neví, čeho se má chytit a kterým směrem to jde. Chytí se špatného dílu, zapáčí - a je to.
Věta, na kterou to celé směřuje: tu kartičku někdo musel napsat, PROTOŽE ten kohoutek lidem neřekne, jak se používá. Ta mašle je záplata na designové rozhodnutí.
A ještě jedna, pokud bude nálada: ten kohoutek je krásný. Matná čerň, čistý tvar. A neumí to jediné, co umět má. K tomuhle se vrátíme u Nestu a platebního terminálu.
Celý obrat je „ah, to je hezký" -> „fuj, ono to nemělo být rozbité už na začátku". Tím kohoutek končí, později se k němu nevracím.
Video je bez zvuku a smyčkuje se - klidně ho nechat běžet, zatímco mluvím. 17 s.
Je na výšku (9:16), zvětšené na 140 % výšky slidu a vycentrované na černé ploše. Nahoře a dole se tím záměrně ořízne (zrcadlo a rukáv), zato je kohoutek velký. Černé pruhy po stranách jsou záměr.
Slide je bez progress baru (`hideProgress: true` ve frontmatteru), stejně jako fotka kohoutku před ním - přes celoplošný vizuál je to rušivý prvek. Černá plocha přetéká o 2 px přes okraje, aby na hraně nevznikl šedý vlas z Slidevího scale transformu.
Styly jsou schválně inline, ne v <style> bloku: Slidev scopuje styly slidu a u tohohle slidu se to dvakrát tiše minulo účinkem.
-->

---
layout: section-break
hideInToc: true
---

# Proto jsme tady

Aby takové věci vůbec nemusely vzniknout

<!--
Obrat z háčku do toho, o čem kurz je. Přichází hned po videu, dokud jim v hlavě visí ten ulomený kohoutek.
„Jsme" tady znamená nás v téhle místnosti, ne instituci.
Osobní věta, která sem patří říct nahlas (byla dřív na vlastním slidu, teď ji říkám tady): design mi dovoluje dvě věci najednou - zkoumat svět, ve kterém žiju, a pak do něj sáhnout a změnit ho.
Netlačit na pilu a nevysvětlovat dlouho. Simon na dalším slidu to zobecní za mě.
Vědomě jsem NEZAČÍNAL organizací kurzu ani tím, jak AI všechno mění - na AI je to moc kontroverzní start a část sálu bych ztratil v první minutě.
-->

---
layout: quote
author: Herbert A. Simon, The Sciences of the Artificial
hideInToc: true
---

Navrhuje každý, kdo hledá cesty, jimiž chce změnit stávající situace v situace preferované.

<!--
Originál: "Everyone designs who devises courses of action aimed at changing existing situations into preferred ones."
Kap. 5 s. 111 (3. vydání, 1996) / kap. 3 s. 55 (1. vydání, 1969). Ověřeno 14. 9. proti otisku kapitoly v Design Issues 4(1/2), 1988, s. 67-82.
POZOR: Simon píše "preferred ones", tedy preferované *situace*. Ne "preferred futures" - to je slovník futures studies a kolidovalo by s paralelním kurzem Futures.
Pointa, kterou na tom stavím: designem se zabývá každý, kdo něco mění. Řemeslo je to, co vám dá sílu tu změnu opravdu provést - a o tom je tenhle kurz.
TODO: rozhodnout, jestli na slidu nechat český překlad, anglický originál, nebo obojí. Překlad je můj, publikovaný český překlad knihy neexistuje.
-->

---
layout: two-column
ratio: "70-30"
hideInToc: true
---

# Co jsem zač?

::left::

- Freelance designer v různých odvětvích
  - Aktuálně nejvíce jeden data/AI softwarehouse
  - Vedlejší projekty v sociálních inovacích
  - Dříve taky práce pro ministerstvo či vývoj hydroponie
- Více než dekáda v prostředí vývoje softwaru (různé role)
- Na KISKu učím třetí kurz + čerstvý absolvent DIS programu
- Design je v něčem dreamjob ❤️

Mimo to
- rád vařím a kvasím
- zajdu na koncert nebo festival
- jsem obecně rád aktivně venku

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<img :src="asset + 'erik-teaching.jpg'" alt="Erik u tabule na workshopu" style="width:100%;height:100%;object-fit:cover;display:block;" />

<!--
Čtvrtý slide, vědomě ne první. Příběh a Simon jdou napřed, tohle je až odpověď na "a kdo to tvrdí".
Krátce a mimochodem. Zároveň tím modeluju tempo, jakým chci, aby za chvíli mluvili oni v kolečku - pár vět, konkrétně, bez CV.
-->

---
layout: heading-body
hideInToc: true
---

# Úvodní kolečko

Abych vás trochu poznal, rád bych od každého slyšel:

- **jméno**
- **kde jste na své designérské cestě** – od „zatím jsem si o tom jen četl(a)“ přes pár vlastních projektů až po „už v oboru pracuju“
- **jedno konkrétní očekávání** od kurzu
- **s jakým konkrétním produktem nebo službou**, se kterou přicházíte pravidelně do styku a máte k ní silný vztah – zbožňujete ji, nebo vás spolehlivě vytáčí – a proč?

<br>
(Pokud nechcete sdílet veřejně – klidně můžeme přeskočit ale rád bych si to alespoň privátně pak přečetl na MS Teams.)

<!--
25 minut, nejdůležitější blok hodiny. Slide zůstává na plátně po celou dobu kolečka.
Tenhle běh neznám nikoho z nich - kolečko je jediný nástroj, jak si nakalibrovat obsah zbytku semestru. Odpovědi si zapisuju, vracím se k nim později v semestru.
U očekávání tlačit na konkrétnost. „Chci se naučit něco o designu“ je k ničemu; „zkoušel jsem vést testování a nešlo mi napsat scénář“ je zlato.
Opt-out vyslovit nahlas rovnou při zadávání, ne až se někdo ozve - v kohortě jsou studenti se speciálními potřebami.
Produkty píšu na tabuli: munice pro diskuzi o dobrém designu a zároveň seznam kandidátů na téma projektu.
POZOR NA ČAS: čtyři údaje na dvacet lidí ve 25 minutách vychází na 75 sekund na člověka. Když to nevyjde, první padá dotaz na produkt - jenže pak chybí ten seznam témat na tabuli. Rozhodnout předem, ne za běhu.
TODO: zvážit vizuální škálu 1-5 pro designérskou cestu - rychlejší a porovnatelnější než dvacet improvizovaných sebepopisů.
-->

---
layout: section-break
---

# Průběh kurzu

Organizace, týmové projekty, co po vás v průběhu budu chtít

---
layout: heading-body
hideInToc: true
---

# Sedm setkání, jednou za čtrnáct dní

- 17\. 9. – úvod, organizace kurzu, motivace
  - seznámení a očekávání, dobrý a špatný design, proč prototypovat
- 1\. 10. – prototypování více do hloubky
  - věrnost a typy prototypů, interakční principy, úvod do vyhodnocování
- 15\. 10. – ideační techniky
  - praktický workshop pro semestrální projekty
- 29\. 10. – evaluace prototypů, AI v designu, produktové trio
  - uživatelské testování a jeho variace, role v týmech a role AI v odvětví
- 12\. 11. – pokročilejší prototypovací techniky
  - HCI, design systémy a UI kity, vibe coding a agentní vývoj
- 26\. 11. – design critique
  - peer-to-peer sdílení prototypů, techniky pro finální prezentace
- 10\. 12. – závěrečné prezentace
  - prezentace týmových projektů, zpětná vazba, zadání individuální reflexe


<style>
/* The nested lines are a supporting layer, not siblings of the dates - and
   fourteen lines only fit on one slide with the leading pulled in. */
h1 {
  margin-bottom: 0.35em !important;
}

li {
  margin-top: 0.04em;
  margin-bottom: 0.04em;
}

ul ul {
  font-size: 0.8em;
  opacity: 0.82;
  margin-top: 0;
}
</style>

<!--
Mezi setkáními se pracuje - sto minut jednou za dva týdny nestačí na nic, co by stálo za to. Tuhle větu říct nahlas, byla dřív na slidu vpravo.
Všechno ostatní je v interaktivní osnově.
Podbody jsou orientační, ne slib - ať vidí, že kurz má tvar, a ať si dokážou představit, do čeho jdou.
-->
---
layout: two-column
ratio: "53-47"
hideInToc: true
---

# Komunikace v semestru + užívání AI

::left::

- **MS Teams** je preferovaný komunikační kanál
  - budu rád když jej budete i otevřeně využívat mezi sebou
  - např. při hledání lidí do týmů
- **Konzultace se mnou v případě potřeby** – ideálně týmově + se mnou nasdílet přípravu
<br>
<br>
- **AI nástroje** používejte dle vlastního uvážení a platných univerzitních pravidel
  - Mám jedinou podmínku u svých rozhodnutí a výstupů musíte umíte vysvětlit proč mají podobu jakou mají

::right::

<script setup>
const asset = import.meta.env.BASE_URL
</script>

<img :src="asset + 'muni-ai-doporuceni.png'" alt="Doporučení k využívání AI od MUNI" style="width:100%;height:22.5rem;object-fit:cover;object-position:top;display:block;border:1px solid rgba(0,0,0,0.12);" />

[Doporučení k využívání AI od MUNI](https://kvalita.muni.cz/kvalita-na-mu/kvalita-vyuky/doporuceni-k-vyuzivani-umele-inteligence-ve-vyuce)

<style>
/* Source line under the screenshot - a credit, not body copy. */
.col-right p {
  font-size: 0.75em;
  margin-top: 0.5em;
  line-height: 1.35;
}
</style>

<!--
Odkaz na oficiální stanovisko MUNI je v osnově, kapitola 00.6. Nevykládat dlouho - je to demonstrace postoje, že AI je doplňková dovednost, ne téma kurzu.
-->

---
layout: heading-body
hideInToc: true
---

# Týmové projekty

Tým **3–5 lidí**, ideálně 4. Téma si vybíráte sami – v interaktivní osnově jsou detailní instrukce.
- ve zkratce – vyberte si něco, co vás vážně zajímá a ideálně i trochu štve
- týmy ideálně utvořte do příště – nebojte se využít MS Teams kanál

Do konce semestru musí každý projekt splnit tři věci:

1. **Doložit, že řešíte reálný problém**
- úspěšné projekty se opírají buď o existující nebo nově nasbíraná data
2. **První pokus o řešení, otestovaný**
- testování proběhne s alespoň pěti lidmi
3. **Projít alespoň jednou iterací**
- iterace probíhá na základě výsledků testování


---
layout: heading-body
hideInToc: true
---

# Inspirace z minulého běhu

<div style="display:flex;justify-content:center;align-items:flex-start;height:calc(100% - 4.5rem);">
  <iframe
    src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7343239400803188736"
    title="LinkedIn: Service design workshop 2025 - studentské projekty"
    style="width:30rem;height:100%;border:1px solid rgba(0,0,0,0.12);"
    allowfullscreen
  ></iframe>
</div>

<!--
Ukázka projektů z jarního běhu 2025 - můj vlastní LinkedIn post. Zhruba 4 minuty.
Rámovat jako "tohle je možné", ne jako "tohle je strop".
POZOR: embed se načítá živě z LinkedInu, takže potřebuje síť. Když bude v sále špatné wifi, slide zůstane prázdný - mít po ruce screenshot jako zálohu.
-->


---
layout: heading-body
hideInToc: true
---

# Milníky a povinnosti

| **Termín** | **Co odevzdáváte** |
|---|---|
| **8. 10.** | Rámovaný problém formou vyplněného canvasu + příspěvek do Teams |
| **25. 11.** | Výsledky prvního testování (min. 5 lidí) |
| **10. 12.** | Závěrečná prezentace projektu |
| **15. 1.** | Individuální písemná reflexe |

<br>

Pro úspěšné absolvování předmětu je potřeba aktivní osobní účast **alespoň na 5 ze 7 setkáních**. Finální prezentace je jediné povinné setkání.
<br>

<style>
/* The row rules stretched the full content width while the text stopped about
   two thirds in, so the table gets an explicit width instead of filling. */
table {
  width: 68%;
}
</style>

---
layout: heading-body
hideInToc: true
---

# Co lze kurzu reálně očekávat

- Vnímám vedení kurzu na stejné úrovni jako klientskou práci
- Většina práce probíhá v čase mezi setkáními
  - Kurz je za 5 kreditů, [1 ECTS kredit odpovídá ~ 25-30 hodinám času](https://en.wikipedia.org/wiki/European_Credit_Transfer_and_Accumulation_System)
- S vašimi návrhy budete pracovat v terénu a budete sami získávat lidi pro testování a zpětnou vazbu
- Budeme se hodně dotýkat současného dění v oboru a jak se dynamicky v posledních letech proměňuje
- Budu maximálně podněcovat vzájemné P2P a reflektivní učení
- Já od vás a vaší účasti očekávám, že jste dospělí
---
layout: section-break
---

# Existuje dobrý nebo špatný design?

---
layout: two-column
ratio: "50-50"
hideInToc: true
---

# Znáte některé z nich?

<script setup>
const asset = import.meta.env.BASE_URL
</script>

::left::

<img :src="asset + 'nest.png'" alt="Termostat Nest Learning, 3. generace" style="max-height:19rem;width:auto;max-width:100%;display:block;margin:0 auto;" />

<v-click at="1">

**Nest Learning Thermostat** (3. generace)

</v-click>

::right::

<img :src="asset + 'nayax-onyx.png'" alt="Platební terminál Nayax Onyx" style="max-height:18rem;width:auto;max-width:90%;display:block;margin:.5rem auto;" />

<v-click at="1">

**Nayax Onyx**

</v-click>

<style>
/* Captions sit under each photo and arrive together on the first click. */
.col-left p:last-child,
.col-right p:last-child {
  text-align: center;
  margin-top: 0.8rem;
  font-size: 0.95em;
}
</style>

<!--
WOW SLIDE. Žádné popisky, žádná jména značek. Jenom dvě fotky vedle sebe a otázka.
Nechat je chvíli hádat a ptát se, jestli něco z toho používali.
5 minut. NEROZBALOVAT tady rozdíly - tenhle slide je provokace, která otevírá skupinovou práci.
Nejdřív jenom fotky bez popisků. Až je necháš chvíli hádat, JEDNO kliknutí dole odkryje oba názvy naráz.
Nechat je chvíli hádat, zeptat se, jestli něco z toho používali, a rovnou z toho poslat do skupinek.
Odpověď přijde až v debriefu, a ideálně od nich, ne ode mě.
Produktové video Nest (1. generace), k přehrání: https://www.youtube.com/watch?v=HhqD-ljcD6I
Zdroj fotky termostatu: https://www.alza.cz/google-nest-learning-thermostat-3rd-generation-black-d12424061.htm
Zdroj fotky terminálu: https://www.alibaba.com/product-detail/Vending-Machine-Card-System-Entertainment-Multi_1601801280406.html
POZOR: fotka i popisek jsou 3. generace. Video v odkazu výš je 1. generace - sjednotit, ať na slidu a v mluveném slově sedí stejná generace.
-->

---
hideInToc: true
background: '#000000'
hideProgress: true
---

<div style="position:absolute;top:-2px;left:-2px;right:-2px;bottom:-2px;background:#000000;overflow:hidden;">
  <iframe
    src="https://www.youtube.com/embed/HhqD-ljcD6I?autoplay=1&amp;rel=0&amp;modestbranding=1&amp;playsinline=1&amp;color=white"
    title="Nest Learning Thermostat - produktové video"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;display:block;"
    allow="encrypted-media; picture-in-picture; fullscreen"
    allowfullscreen
  ></iframe>
</div>

<!--
Produktové video k termostatu (YouTube: "Nest Learning Thermostat - 1st Generation", kanál Green San Diego).
Celoplošné na černé, bez progress baru - stejný režim jako kohoutkové video. 16:9, takže sedí přesně na formát slidu.
Autoplay je zapnutý. Prohlížeč pustí video se zvukem jenom tehdy, když už na stránce došlo k interakci - což při proklikávání slidů platí, takže by to mělo naběhnout samo.
Kdyby se video nerozjelo, zůstane na náhledu a stačí jedno kliknutí. Vyzkoušet dopředu na tom notebooku, ze kterého budeš prezentovat.
POZOR: tohle je živý embed z YouTube, potřebuje síť. Bez wifi zůstane slide černý - mít po ruce zálohu.
-->

---
layout: groupwork
hideInToc: true
---

# Podle čeho poznáte, že je něco navržené dobře?

Ve skupinkách po pěti. Vezměte si ty dvě zařízení a věci z tabule.

Cíl: vaše vlastní definice dobrého designu.

<!--
12 minut ve skupinkách. Není to World Café, jenom skupinky s jedním zadáním.
TODO: napsat jim facilitační instrukce - co přesně mají ve skupince udělat a s čím vylézt ven.
Pak 13 minut debrief: posbírat definice, doplnit vlastní příklady, dojet to na etiku.
V debriefu tlačit na to, aby odpovědi stály na zkušenosti, ne na vzhledu.
-->

---
layout: heading-body
hideInToc: true
---

# Obojí vypadá vyladěně

- Kulatý displej, minimum ovládacích prvků, „moderní“ vzhled
- Zkušenost z nich je přitom úplně jiná
- Povrch o kvalitě designu neřekne skoro nic

<!--
Tady rozbalit konkrétní rozdíly. Video Nest: https://www.youtube.com/watch?v=HhqD-ljcD6I
-->

---
layout: quote
author: Mike Monteiro
hideInToc: true
---

Každé designové rozhodnutí někomu něco usnadní a někomu jinému zavře dveře.

<!--
Přednáška je mezi povinnými zdroji. Moje vlastní příklady sem.
-->

---
layout: section-break
---

# Proč vůbec prototypovat

---
layout: heading-body
hideInToc: true
---

# Prototyp je nástroj, jak se něco dozvědět

- Každý prototyp odpovídá na konkrétní otázku
- Není to zmenšená verze hotové věci
- Není to ani „tady to máte, snad se vám to líbí"

Na tohle navážeme naplno příště.

---
layout: homework
hideInToc: true
---

# Do příště, tedy do 1. 10.

- **Domluvte se na týmu** – 3 až 5 lidí, ideálně 4. Nikoho neznáte? Ozvěte se v kurzovním týmu v Teams
- **Vyberte si rámcově téma** – stačí tematický okruh
- **Přijďte s obojím** – pracujeme s tím od začátku hodiny

Kritéria, rychlý test i náhradní náměty jsou v osnově.

<!--
3 minuty. Nést sem myšlenku z Fadella: všímat si toho, co je rozbité, je samo o sobě designová dovednost.
Odkázat na tabuli - je tam dvacet věcí, které vás štvou, začněte tam.
-->

---
layout: heading-body
hideInToc: true
---

# Příště: rámování problému a ideace

- Jak z „něco tu nefunguje" udělat zadání, se kterým se dá pracovat
- „Jak bychom mohli…?" a generování nápadů
- Prototypování: věrnosti, nástroje, co s tím udělala AI
- Odnesete si plátno pro rámování problému

Otázky?

<!--
POZOR, TOHLE JE NEDODĚLANÝ KONEC. Celá hodina je stavěná na peak-end pravidlo, podle kterého si
zapamatují začátek a konec - a konec je zatím jenom "co bude příště" a Q&A buffer. Sedm minut.
Otvírák dostal příběh a Simona, konec nedostal nic.
TODO: rozhodnout, čím hodina skutečně končí. Erik zatím neřekl. Viz backlog 001, otevřené body.
-->
