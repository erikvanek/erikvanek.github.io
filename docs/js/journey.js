/* The journey (D15) — linear walkthrough across milestone articles.
   Single source of truth for the curated 2023→2026 sequence. Loaded on
   every article (dis-article.njk); renders prev/next + a rough.js dotted
   progress bar only when the current page is one of the milestones.
   Reuses existing pages — never re-authors content. */
(function () {
  'use strict';

  // Curated PRESENTATION flow (Erik, 2026-06-13). A highlight reel for the
  // state-exam walk-through — NOT the full portfolio. Every required Praxe /
  // Reflexe cílů still lives in the story-page parts-summary + the cesta wall;
  // this sequence is the guided story, deliberately trimmed. erik-2023 is
  // "before" context, not a step. Edit here to reorder/extend.
  var JOURNEY = [
    { slug: 'hackaton-I',                    label: 'Hackathon s Adamem' },
    { slug: 'ostrovy-pozitivni-inovace',     label: 'Studie inovativních týmů' },
    { slug: 'aby-to-mamka-nechtela-vypnout', label: 'Usability studie Jarmilky' },
    { slug: 'fleda-audit',                   label: 'Fléda – audit přívětivosti' },
    { slug: 'retro-workshop',                label: 'Retrospektiva studia' },
    { slug: 'praxe-IV',                      label: 'Workshop s tajemnictvem' },
    // Design KANTÝNA = a section inside the Zlín Design Week article; deep-link
    // straight to that heading (the page slug still matches, so nav renders).
    { slug: 'ucast-na-konferencich',         label: 'Podcast Design KANTÝNA',
      url: '/dis-kisk/ucast-na-konferencich/#design-kantyna' },
    { slug: 'vyuka',                         label: 'Tři kurzy: jak jsem se učil učit' },
    // UX Monday = the polished section inside the cile-VI reflection; the page
    // IS cile-VI, the url deep-links to that section (not the braindump page),
    // so the journey nav still renders when you land there.
    { slug: 'cile-VI',                       label: 'UX Monday Praha',
      url: '/dis-kisk/cile-VI/#ux-monday-praha-test-toho-veho-najednou' },
    // FINAL STOP — bachelor's thesis (Jarmilka). Short article PLANNED in
    // plan.md (D13), not built yet → /dis-kisk/thesis/ 404s until it exists.
    // The cesta "Jarmilka" tile points here too; building the article fixes
    // both. (Comment this entry out if a clean no-404 flow is needed sooner.)
    { slug: 'thesis',                        label: 'Bakalářská práce',
      url: '/dis-kisk/thesis/' }
  ];

  var STORY = '/dis-kisk/portfolio/';
  var WALL  = '/dis-kisk/cesta/';

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function href(slug) { return '/dis-kisk/' + slug + '/'; }
  function itemUrl(item) { return item.url || href(item.slug); }

  // which milestone are we on? (case-insensitive, trailing-slash tolerant)
  var path = window.location.pathname.replace(/\/+$/, '');
  var slug = path.split('/').pop().toLowerCase();
  var idx = -1;
  for (var i = 0; i < JOURNEY.length; i++) {
    if (JOURNEY[i].slug.toLowerCase() === slug) { idx = i; break; }
  }
  if (idx === -1) return;            // not a journey page — render nothing

  var N = JOURNEY.length;
  var wrap = document.getElementById('wrapper');
  if (!wrap) return;

  var nav = el('nav', 'journey-nav');
  nav.setAttribute('aria-label', 'Procházka portfoliem');

  // --- prev ---
  var prev = (idx > 0)
    ? { url: itemUrl(JOURNEY[idx - 1]), dir: '← Předchozí', label: JOURNEY[idx - 1].label }
    : { url: STORY,                     dir: '←',           label: 'Zpět na příběh' };
  var aPrev = el('a', 'jn-prev');
  aPrev.setAttribute('href', prev.url);
  aPrev.appendChild(el('span', 'jn-dir', prev.dir));
  aPrev.appendChild(el('span', 'jn-label', prev.label));
  nav.appendChild(aPrev);

  // --- progress (dots + counter) ---
  var prog = el('div', 'jn-progress');
  var dots = el('div', 'jn-dots');
  function dot(i) {
    var state = i < idx ? 'done' : i === idx ? 'is-current' : 'todo';
    var a = el('a', 'jn-dot ' + state);
    a.setAttribute('href', itemUrl(JOURNEY[i]));
    a.setAttribute('title', (i + 1) + '. ' + JOURNEY[i].label);
    a.setAttribute('aria-label', (i + 1) + '. ' + JOURNEY[i].label);
    if (i === idx) a.setAttribute('aria-current', 'step');
    a.appendChild(el('span', 'jn-pip'));   // clean round pip, styled in CSS
    return a;
  }
  for (var d = 0; d < N; d++) dots.appendChild(dot(d));
  prog.appendChild(dots);
  prog.appendChild(el('span', 'jn-count', (idx + 1) + ' / ' + N));
  nav.appendChild(prog);

  // --- next ---
  var next = (idx < N - 1)
    ? { url: itemUrl(JOURNEY[idx + 1]), dir: 'Další →', label: JOURNEY[idx + 1].label }
    : { url: WALL,                      dir: 'Konec →', label: 'Zpět na zeď' };
  var aNext = el('a', 'jn-next');
  aNext.setAttribute('href', next.url);
  aNext.appendChild(el('span', 'jn-dir', next.dir));
  aNext.appendChild(el('span', 'jn-label', next.label));
  nav.appendChild(aNext);

  wrap.appendChild(nav);
})();
