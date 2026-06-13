/* Reading-progress bar — reveal.js visual pattern (revealjs/reveal.css: faint
   track + a scaleX fill that glides on reveal's easing curve), but driven like
   a real scrollbar: the fill tracks the true scroll fraction, and a thin cut is
   placed at each heading PROPORTIONALLY — so the segment between two cuts is as
   long as the section it depicts (a long section gets a wide segment, a short
   one a narrow segment). Pairs with the .progress markup in dis-article.njk.
   Progressive enhancement — without JS the bar is the faint track only. */
(function () {
  'use strict';

  var bar = document.querySelector('.progress');
  var fill = bar && bar.querySelector('.progress__fill');
  var done = bar && bar.querySelector('.progress__done');
  var article = document.querySelector('article');
  if (!bar || !fill || !done || !article) return;

  var heads = Array.prototype.slice.call(article.querySelectorAll('h1, h2, h3'));
  var OFFSET = 8;   // a heading "starts" a touch before it reaches the very top
  var bounds = [];  // section-start fractions (0..1), ascending — set by refresh

  function maxScroll() {
    var d = document.documentElement;
    return Math.max(1, d.scrollHeight - d.clientHeight);
  }

  // A divider at each heading's scroll position as a fraction of the scroll
  // range — same space the fill lives in, so the fill crosses a cut exactly
  // when you reach that section, and segment widths mirror section lengths.
  function placeMarks() {
    var old = bar.querySelectorAll('.progress__mark');
    for (var i = 0; i < old.length; i++) old[i].remove();
    var max = maxScroll();
    var frag = document.createDocumentFragment();
    bounds = [];
    heads.forEach(function (h) {
      var y = h.getBoundingClientRect().top + window.scrollY - OFFSET;
      var p = y / max;
      if (p < 0) p = 0; else if (p > 1) p = 1;
      bounds.push(p);                       // every boundary feeds "done" logic
      if (p <= 0.01 || p >= 0.99) return;   // but skip cuts hard against the ends
      var m = document.createElement('i');
      m.className = 'progress__mark';
      m.style.left = (p * 100).toFixed(2) + '%';
      frag.appendChild(m);
    });
    bounds.sort(function (a, b) { return a - b; });
    bar.appendChild(frag);                  // painted over the fill + done
  }

  function update() {
    var p = window.scrollY / maxScroll();
    if (p < 0) p = 0; else if (p > 1) p = 1;
    fill.style.transform = 'scaleX(' + p.toFixed(4) + ')';

    // "done" reaches the last section boundary you've scrolled fully past, so
    // completed segments tint a touch more orange; the in-progress segment
    // stays sand. Hitting the bottom completes the final segment too.
    var d = 0;
    for (var i = 0; i < bounds.length; i++) {
      if (p >= bounds[i]) d = bounds[i]; else break;
    }
    if (p >= 0.999) d = 1;
    done.style.transform = 'scaleX(' + d.toFixed(4) + ')';
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { update(); ticking = false; });
  }

  function refresh() { placeMarks(); update(); }

  refresh();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    clearTimeout(refresh._t);
    refresh._t = setTimeout(refresh, 150);
  });
  // recompute once fonts swap in / everything's loaded (layout shifts)
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  window.addEventListener('load', refresh);
})();
