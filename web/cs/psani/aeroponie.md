---
title: Čerstvá zelenina po celý rok
date: 2018-03-23
translationKey: aero
translatedFrom: en
permalink: /cs/psani/aeroponie/
---

Tohle je jeden z mých vedlejších projektů, na kterém jsem pracoval hlavně v letech 2016 a 2017. Vychází ze dvou souvisejících věcí. Zaprvé, jedním z mých největších koníčků je jídlo. Zadruhé, bez dobrých surovin se chutné jídlo připravuje těžko. Nemyslím luxusních. Spíš čerstvých a plných chuti, nejlíp sezonních a místních.

Ještě víc je to vidět mimo zelenou sezonu, řekněme od poloviny října do začátku května. Obchody sice nějakou zeleninu a ovoce nabízejí, ale většinou dost mdlé a bez chuti. O jejich uhlíkové stopě ani nemluvě. Nebo je to moc, nečekat ve střední Evropě jablka z Jižní Ameriky? Snadno by se z toho dal udělat rant o globalizaci, nadnárodních korporacích atd. Tam se dostat nechci. Nakonec ekonomiku hýbou peněženky lidí.

Chtěl jsem vytvořit prototyp malého soběstačného systému, který by mimo hlavní sezonu aspoň částečně pokryl mou potřebu čerstvé zeleniny. Postavil jsem ho z umělého LED osvětlení, aeroponického systému na koleně a trochy nástrojů na monitoring.

<figure>
  <a href="https://www.youtube.com/watch?v=-G95A098uSY" title="Timelapse pěstování bazalky v aeroponii"><img src="/img/writing/aero/basil-crops.jpg" alt="Průběžná sklizeň bylinek"></a>
  <figcaption>Průběžná sklizeň bylinek – kliknutím na obrázek se dostanete na tříměsíční timelapse video</figcaption>
</figure>

## Jak nasytit pořád rostoucí města

S tímhle projektem souvisí ještě jedna náročná myšlenka. _Díky_ urbanizaci se čím dál víc lidí stěhuje z venkova do měst.

Jak je nasytit? A jak to udělat udržitelně, když má naše planeta omezené zdroje? A co spotřeba vody, která bude brzy velký problém? Vlastně už [je](https://www.independent.co.uk/environment/cape-town-drought-day-zero-climate-change-global-warming-south-africa-a8236511.html), i když tenhle článek píšu. Zemědělské postupy z minulosti už na nasycení rostoucí populace nestačí.

Dnešní potravinové řetězce navíc silně spoléhají na dopravu ze zemí, které mají pro pěstování zeleniny lepší podmínky. Hlavně v zimě má šanci pěstovat zeleninu pro vlastní spotřebu (a pak i na export) jen pár _šťastných_ zemí. Bylo by fajn tuhle ekologicky škodlivou dopravu omezit tím, že se zelenina bude pěstovat blíž k těm, kdo ji jedí. Nemusí to jít u všech rostlin, ale hej, něco je lepší než nic.

## Hlavní myšlenka

Tak jo, teď k věci. Hlavním konceptem bylo vytvořit nízkotlaký aeroponický systém a pěstovat v něm zeleninu pro vlastní potřebu. Jako zdroj světla pro rostliny v zimě jsem použil kvalitní LED světla. Když jsem vybíral materiál na konstrukci _boxu_, kladl jsem velký důraz na možnou škálovatelnost. Zatím se bavíme _jen_ o škálování do šířky. S pevnější konstrukcí jde škálovat i do výšky. Mým nápadem bylo vytvořit snadno replikovatelný _box_ se základnou o ploše jednoho metru čtverečního a výškou zhruba 1,5 m.

<figure>
  <img src="/img/writing/aero/box-in-system.jpg" alt="Pěstební box s rozsvícenými světly">
  <figcaption>Pěstební box s rozsvícenými světly</figcaption>
</figure>

Na takových systémech je hezké, že když jsou dobře navržené, snadno se udržují. Podle velikosti nádrže by neměl být problém odjet na týden na dovolenou, aniž by rostliny trpěly. Zkusil jsem to a bylo fajn vidět, jak za tu dobu rostliny povyrostly :). Velký potenciál je taky v automatizaci řízení teploty, vlhkosti, parametrů živného roztoku atd. Moc daleko jsem s tím nedošel, protože to nebyl hlavní cíl tohohle prototypu. Automatizace údržby by ho ale posunula na úplně jinou úroveň.

Většinu vybavení jsem koupil v běžných hobbymarketech, se dvěma výjimkami. Těmi jsou Raspberry Pi s USB kamerou a LED světlo na míru od mého kamaráda [Romana Pavelky](http://romanpavelka.cz/) (díky za něj!).

### Použité komponenty

- LED světlo na míru – 100 W, kombinace červené a modré – 4 červené 15W LED a 4 modré 10W LED s nejvhodnějšími vlnovými délkami, jaké byly v době výroby k dostání,
- pěstební systém tvořily:
  - dva eurokontejnery – 60 cm na šířku × 30 cm do hloubky × 40 cm na výšku,
  - nízkotlaké akvarijní čerpadlo – příkon 35 W, výtlak 2000 l/h,
  - plastové hadičky,
  - rotační trysky,
  - spínací hodiny,
- profily _ve tvaru L_ na hlavní konstrukci,
- diamantová fólie pro správný odraz světla,
- ventilátory, aby se rostliny hýbaly, vzduch líp proudil a stonky byly silnější,
- Raspberry Pi s USB kamerou.

Zbývá odpovědět na dvě hlavní otázky, které obhájí použitou technologii.

### Proč aeroponie?

Hlavním důvodem bylo, že jsem s aeroponií už měl zkušenost, a docela radostnou. S dost velkou nádrží se dají stabilizovat hodnoty pH a EC. Pěstování v aeroponii pak spočívá v dodržování několika pravidel, udržování perfektní čistoty a v dochvilné údržbě.

Druhý velký důvod je spíš strategický / ekologický. Velkou výhodou aeroponie (a případně hydroponie) oproti pěstování v půdě je úspora vody. Voda se nerozptýlí v půdě, ale _recykluje_ se zpátky do nádrže a používá se znovu a znovu. Živný roztok je potřeba čas od času vyměnit.

I když se zdá, že hydroponie je známější metoda, já mám radši aeroponii ze dvou hlavních důvodů. Zaprvé má kořenový systém k dispozici víc kyslíku (takže by rostliny měly být zdravější). Zadruhé aeroponie není tak hladová po živinách. Věřím (ale jsem otevřený diskuzi), že střídmost v živinách je dobrá volba. A když nic jiného, má to ekonomické výhody.

### Proč LED světla?

LED světla pro mě byla jasná volba. I když jsou pořád dost drahá, jejich účinnost se s jinými zdroji světla nedá srovnat. Jde to ruku v ruce s tím, že rostliny pro správnou fotosyntézu potřebují jen určité části světelného spektra. Druhou výhodou je, že skoro nehřejí, takže není velká potřeba řešit teplotu. Za zvážení stojí i jejich dlouhá očekávaná životnost.

## Jak to celé dopadlo

Pěstoval jsem ve dvou různých složeních rostlin. Nejdřív jsem chtěl pěstovat náročnější rostliny jako rajčata, jahody nebo ředkvičky. Později jsem zjistil, že bude pohodlnější (hlavně co se manipulace a údržby týče) pěstovat rostliny, které jsou si podobnější. Dobrými kandidáty jsou různé druhy bylinek. Různé odrůdy bazalky se ukázaly jako opravdu vděčné, co do množství sklizně i chuti.

<figure>
  <img src="/img/writing/aero/bush-from-top.jpg" alt="Hromady bazalky z druhého kola pěstování">
  <figcaption>Hromady bazalky z druhého kola pěstování</figcaption>
</figure>

### Co jsem se naučil

Cestou jsem se pár věcí naučil. Tu asi největší jsem zmínil v předchozím odstavci.

Kvůli omezenému prostoru jsem chtěl do toho malého místa nacpat všechny ty různé druhy rostlin. Prostě to nefunguje. Různé rostliny mají různé potřeby, rostou různě rychle, mají různou výšku atd. Protože LED panel svítí _naplocho_, chceme mít všechny rostliny víceméně stejně vysoké. Mít rajčata a ředkvičky ve stejnou dobu vedle sebe prostě nedávalo smysl.

Druhé kolo pěstování bylo co do sklizně mnohem příjemnější. Nakonec to dopadlo tak, že bazalka přerostla ostatní rostliny a box najednou vypadal jako jeden velký keř bazalky. Nevadilo mi to. Ve druhém kole jsem taky začal experimentovat s klonováním nových rostlin. To ale probíhalo s mlžičem, který vytváří opravdový aerosol, a ne v nízkotlaké aeroponii.

Hlavní důvod, proč teď nepěstuju, je, že box stál zhruba tři metry od mé postele. Se správně nastaveným časovačem je to sice úžasný vizuální budík, ale neustálé zapínání a vypínání čerpadla časem leze na nervy, hlavně v noci. Těch pár měsíců se to vydržet dalo, ale spát vedle toho bych nedoporučil nikomu.

<figure>
  <img src="/img/writing/aero/roots.jpg" alt="Zdravě vypadající kořenový systém">
  <figcaption>Zdravě vypadající kořenový systém</figcaption>
</figure>

<figure>
  <img src="/img/writing/aero/roots-profile.jpg" alt="Ukázka délky kořenového systému rajčat">
  <figcaption>Ukázka délky kořenového systému rajčat</figcaption>
</figure>

Nejvíc prostoru ke zlepšení bylo asi v regulaci teploty v nádrži. Doporučená teplota živného roztoku je kolem 20 °C. V teplejších měsících se teplota v nádrži snaží vyrovnat té v místnosti. Kořeny pak slizovatí a bez pořádného chlazení rostliny trpí. Já žádné neměl. Pořádná regulace teploty v nádrži je nezbytná, pokud má systém běžet delší dobu.

## Proč tohle všechno?

Hlavně proto, že je docela zábava mít kolem sebe takové geekovské hřiště. Při pěstování v aeroponii dostáváte od rostlin docela rychlou zpětnou vazbu, na rozdíl od _normálního_ pěstování v půdě. Když něco zkazíte, zjistíte to hodně brzo :). Rostliny působí vitálněji a chutnají úžasně. Takovou čerstvost v zimních měsících těžko seženete i v dražších obchodech.

A taky jsem chtěl zjistit, jak těžké je udržet celý systém v chodu několik měsíců bez výpadku. I když jsem měl s rozvodem vody pár drobných problémů, systém běžel skoro deset měsíců bez přerušení. Umělé světlo jsem v létě odstranil, protože nebylo potřeba.

Kdybych měl jeden pokoj navíc, určitě bych v tom pokračoval. Jasným dalším krokem by bylo přidat chlazení nádrže a zavést propracovanější automatizaci a monitoring celého systému.
