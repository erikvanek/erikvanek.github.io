/* ============================================================================
   CESTA — obsah dlaždic (jediný zdroj pravdy). Tenhle soubor edituj ručně.
   index.html se stará o vykreslení a styl; sem patří jen obsah.

   PROJEKTOVÁ dlaždice:
     sem      'I'…'VI' nebo '?'   — semestr (jen barevný štítek, ne nadpis)
     tag?     text štítku          — přebije "semestr X" (např. '2023', 'II–V')
     color?   #hex                 — přebije barvu štítku
     title    text                 — nadpis dlaždice (emoji se při vykreslení strhnou)
     link?    '/dis-kisk/slug/' — proklik na stránku portfolia
              POUZE vlastní portfolio (zdroj pod semestr-x/, URL /dis-kisk/slug/). Prázdné = bez prokliku.
     photo?   { src, alt, ratio }  — ratio řídí tvar dlaždice:
                                      <0.85 = 1×2 na výšku, >1.25 = 2×1 na šířku, jinak 1×1
     fp?      'f-big'|'f-landscape'|'f-portrait' — ruční přepis tvaru
     feature? true                 — povýší na 2×2 kartu
     pin?     'start'|'end'         — ukotví na začátek/konec řady
     lead?    1,2,…                — pořadí v úvodní kompozici
     missing? true                 — placeholder (čárkovaný rámeček)
     tags?    [..]                 — tematické štítky (zatím skryté, viz plan.md)
     chips?   [{text, variant?}]   — útržky (zatím skryté; variant: 'mark'|'dashed'|'stamp')

   CITAČNÍ dlaždice (samostatná karta — výzkumný hlas, žije sama za sebe):
     quote    text „…“             — citace; vykreslí se jako vlastní dlaždice 2×1
     ref      text                 — zdroj/projekt pod citací („— …“)
     (citace se zobrazí tam, kde leží v poli — drž je u jejich projektu, nebo je rozmísti dle libosti)

   Pořadí v poli = výchozí čtení (ukotvený start → lead → prostředek dle pořadí → ukotvený konec).
   ============================================================================ */
window.INITIATIVES = [
  {
    sem: 'I', tag: '2023', color: '#7a7060', pin: 'start', fp: 'f-big', title: 'Erik 2023 - neohrabaný praktik',
    link: '/dis-kisk/erik-2023/',
    photo: { src: 'img/i-me-melon.jpeg', alt: 'Erik v roce 2023', ratio: 0.75 },
    chips: [{ text: 'inženýrský základ, díry v metodologii' },
    { text: 'čerstvě po vyhazovu z Infarmu 🌱' },
    { text: 'motivák za mě napsal GPT-3 ✍️' }]
  },

  {
    sem: 'I', title: 'Hackathon a testování s Adamem', 
    link: '/dis-kisk/hackaton-I/',
    tags: ['výzkum'],
    photo: { src: 'img/i-hackathon-adam.jpg', alt: 'Testování s Adamem na hackathonu', ratio: 1.49 },
    chips: [{ text: '„mačkám tlačítka a koukám, co zabere“ 🔘' }]
  },

  {
    sem: 'I', fp: 'f-landscape', title: 'Když nevíš, tak se zeptej',
    link: 'https://medium.com/design-kisk/kdy%C5%BE-nev%C3%AD%C5%A1-tak-se-zeptej-s-dominikou-potu%C5%BE%C3%A1kovou-o-inkluzivn%C3%ADm-designu-a-n%C3%A1vrhu-wayfinding-faae3273f6f9',  /* externí - rozhovor na Medium (Design KISK), otevře se v novém panelu */
    tags: ['service design'],
    photo: { src: 'img/dominika.webp', alt: 'Rozhovor s Dominikou Potužákovou o inkluzivním designu', ratio: 1.5 },
    chips: [{ text: 'rozhovor s Dominikou Potužákovou - inkluzivní design 🎙️' }]
  },


  {
    sem: 'II', fp: 'f-landscape', title: 'Studie inovativních týmů ve státní správě',
    link: '/dis-kisk/ostrovy-pozitivni-inovace/',
    tags: ['výzkum', 'veřejná správa'],
    photo: { src: 'img/ii-report-tymy.png', alt: 'Studie inovativních týmů ve státní správě', ratio: 0.71 },
    chips: [{ text: 'jak fungují týmy, co mění stát 🔬' },
    { text: 'co dělá tým úspěšným? 🧩' }]
  },

  {
    sem: 'III', title: 'Retrospektiva DIS v půlce studia',
    link: '/dis-kisk/retro-workshop/',
    tags: ['facilitace'],
    photo: { src: 'img/retro.png', alt: 'Účastníci retrospektivního workshopu, leden 2025' },
    chips: [{ text: 'retrospektiva DIS v půlce studia 🛠️' },
    { text: 'pokračuje → Design cirkus 🎪' }]
  },

  // { quote: '„Lidé v mém týmu chápou svoji roli a jsou proaktivní. Manažersky si svou práci uhlídají, není potřeba je každodenně úkolovat a hlídat, zda své úkoly splnili.“', ref: 'Studie inovativních týmů ve státní správě' },
  // { quote: '„Nebojím se v týmu říct, co mě napadne, i kdyby to měla být blbost, vím, že se nic nestane.“', ref: 'Studie inovativních týmů ve státní správě' },
  // { quote: '„Snažím se objevovat svou schopnost vykonávat různé úkoly, ať už ve vedoucí pozici nebo na jiných úrovních, abych neustále přinášel nový pohled a nedovolil, aby mě to semlelo.“', ref: 'Studie inovativních týmů ve státní správě' },


  {
    sem: 'III', title: 'Studie použitelnosti digitálního průvodce Jarmilka', fp: 'f-big',
    link: '/dis-kisk/aby-to-mamka-nechtela-vypnout/',
    photo: { src: '/img/2024/case-studies/jarmilka/jarmilka-case-thumb.png', alt: 'Papírový prototyp z IxD', ratio: 1.5 },
    chips: []
  },
  

  {
    sem: 'III', title: 'Fléda - audit přívětivosti', fp: 'f-landscape',
    link: '/dis-kisk/fleda-audit/',
    tags: ['service design', 'výzkum'],
    photo: { src: 'img/iii-fleda.png', alt: 'Cedule Fléda – flákání, nicnedělání' },
    chips: [{ text: 'studený e-mail → CEO volá zpět 📞' }]
  },

  { quote: '„na Flédě mám rada její atmosféru a duši, klub je tak akorát velký a snad každý měsíc je tam nějaká pro mě super akce”', ref: 'Fléda - service design' },
  // { quote: '„Jsem rad, ze se starate o zakazniky i touhle formou. Jen tak dal!”', ref: 'Fléda - service design' },
  // { quote: '„páči sa mi ako je priestorovo usporiadané - človek má čo objavovať a kde sa pohybovať aj mimo koncertu + kurárna na vzduchu. tiež že tam sú dva bary a nemusíme sa tlačiť v jednej miestnosti iba”', ref: 'Fléda - service design' },

  // {
  //   sem: 'III', fp: 'f-landscape', title: 'JINAG → bakalářka 📕',
  //   tags: ['výzkum', 'service design'],
  //   chips: [{ text: 'JINAG → bakalářka 📕' }]
  // },




  {
    sem: 'IV', title: 'Medaile Ministerstva vnitra za inovace', fp: 'f-big',
    link: '/dis-kisk/sousedske-detske-skupiny/',
    tags: ['veřejná správa'],
    photo: { src: 'img/sds.webp', alt: 'Sousedské dětské skupiny - Úřednický čin roku 2024', ratio: 1.5 },
    chips: [{ text: '🎖️ medaile Ministerstva vnitra', variant: 'mark' }]
  },

  {
    sem: 'IV', feature: true, title: 'Workshop s panem nejvyšším',
    link: '/dis-kisk/praxe-IV/',
    tags: ['facilitace', 'veřejná správa'],
    photo: { src: 'img/iv-tajemnicky.jpg', alt: 'Workshop s tajemníky ministerstev', ratio: 0.75 },
    chips: [{ text: 'workshop s panem nejvyšším 🏛️' },
    { text: '5. 5. 2025', variant: 'stamp' }]
  },

  {
    sem: 'V', tag: 'II–V', feature: true, title: 'Výuka a tutoring v rámci tří kurzů',
    link: '/dis-kisk/vyuka/',
    tags: ['facilitace', 'veřejná správa'],
    photo: { src: 'img/v-urednici.jpg', alt: 'Workshop s úředníky veřejné správy', ratio: 1.31 },
    chips: [{ text: 'poprvé učím — DM&L 👥' },
    { text: 'poprvé učím sólo — Service Design Workshop 🧑‍🏫' },
    { text: 'učím úředníky veřejné správy 🏛️' },
    { text: 'od facilitace lídrů k učení terénu 🎼' }]
  },

  {
    sem: 'IV', title: 'Podcast Design KANTÝNA - ZDW 2024',
    link: '/dis-kisk/ucast-na-konferencich/#design-kantyna',
    tags: ['veřejná správa'],
    photo: { src: 'img/iv-design-kantyna.jpg', alt: 'Design kantýna podcast na Zlin Design Weeku', ratio: 1.5 },
    chips: []
  },

  { quote: '„Nebojím se v týmu říct, co mě napadne, i kdyby to měla být blbost, vím, že se nic nestane."', ref: 'Studie inovativních týmů ve státní správě' },

  {
    sem: 'VI', feature: true, title: 'UX Monday - veřejná přednáška o tom, jak pracuju',
    link: '/dis-kisk/cile-vi/',
    tags: ['AI workflow'],
    photo: { src: 'img/vi-ux-monday.jpg', alt: 'UX Monday talk', ratio: 0.75 },
    chips: [{ text: 'práci diktuju z kola 🚲' }]
  },

  {
    sem: 'VI', fp: 'f-landscape', title: 'Design cirkus 🎪 - srpen 2026',
    link: '/dis-kisk/design-cirkus/',
    tags: ['facilitace'],
    photo: { src: 'img/cerych.jpg', alt: 'Design cirkus — srpen 2026' },
    chips: [{ text: 'Design cirkus — srpen 2026 🎪' },
    { text: 'follow-up retrospektivy ze 3. semestru' }]
  },

  {
    sem: 'V', fp: 'f-landscape', title: 'Etika v designu',
    link: '/dis-kisk/etika/',
    tags: ['service design', 'výzkum'],
    photo: { src: 'img/v-etika-normative.png', alt: 'Vyplněný canvas Normative design scheme pro Jarmilku', ratio: 1.54 },
    chips: [{ text: 'etická rozvaha nad Jarmilkou 🧭' },
    { text: 'záměr → návrh → dopad' }]
  },
  // { quote: '„Tohle jsem fakt nečekal — tlačím kolo přes bažinu, paráda. To je asi cena za to, že rád mluvím do diktafonu. No nic, zpátky k tomu.”', ref: 'Erik 2026 - designér, který učí' },

  {
    sem: 'VI', fp: 'f-big', title: 'Jarmilka - bakalářská práce',
    link: '/dis-kisk/thesis/',  /* reveal.js shrnutí bakalářské práce (Jarmilka) — NENÍ hotové, 404 dokud stránka nevznikne (viz plan.md D13) */
    photo: { src: 'img/vi-jarmilka-bp.png', alt: 'Digitální prototyp průvodkyně Jarmilky - obrazovka pro popis životní situace', ratio: 1 },
    chips: []
  },

  { closing: true, title: 'Na designu je nejlepší to, že člověk může každý den zjišťovat nové věci o světě v němž se pohybuje.' },

  // {
  //   sem: 'VI', tag: '2026', color: '#C26818', pin: 'end', fp: 'f-landscape', title: 'Erik 2026 - designér, který učí',
  //   tags: ['AI workflow'],
  //   chips: [{ text: 'designér-orchestrátor' },
  //   { text: 'učím tři kurzy 🧑‍🏫' },
  //   { text: 'práci diktuju z kola 🚲' },
  //   { text: 'UX Monday — největší meetup v zemi 🎤' }]
  // }
];
