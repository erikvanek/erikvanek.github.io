/* Rough.js easter eggs on DIS article pages — progressive enhancement.
   Three spots: sketched hr dividers, hand-drawn figure frames, and
   marker-on-paper hover annotations (back-link ellipse, section
   heading underline). Without rough.js the page is simply fine. */
(function () {
  'use strict';
  if (typeof rough === 'undefined') return;

  var QUIET = 'rgba(122, 112, 96, .8)';
  var SVG_NS = 'http://www.w3.org/2000/svg';

  function makeSvg(w, h) {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'rough-note');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);
    svg.setAttribute('aria-hidden', 'true');
    return svg;
  }

  // the draw-on animation in CSS keys off --len per path
  function primePaths(svg) {
    svg.querySelectorAll('path').forEach(function (p) {
      try { p.style.setProperty('--len', p.getTotalLength()); } catch (e) { /* not rendered yet */ }
    });
  }

  // --- 1. hr → sketched divider -----------------------------------------
  document.querySelectorAll('article hr').forEach(function (hr) {
    var W = 220, H = 16;
    var svg = makeSvg(W, H);
    var rc = rough.svg(svg);
    svg.appendChild(rc.line(6, 9, W - 6, 7, {
      roughness: 2.4, bowing: 3, strokeWidth: 1.2, stroke: QUIET
    }));
    var box = document.createElement('div');
    box.className = 'rough-divider';
    box.setAttribute('aria-hidden', 'true');
    box.appendChild(svg);
    hr.replaceWith(box);
    primePaths(svg);
  });

  // --- 2. figure frames ---------------------------------------------------
  function frameFigure(img) {
    if (img.closest('.rough-frame')) return;
    var wrap = document.createElement('span');
    wrap.className = 'rough-frame';
    img.parentNode.insertBefore(wrap, img);
    wrap.appendChild(img);

    var w = img.offsetWidth + 14, h = img.offsetHeight + 14;
    if (w < 40 || h < 40) return;
    var svg = makeSvg(w, h);
    var rc = rough.svg(svg);
    svg.appendChild(rc.rectangle(4, 4, w - 8, h - 8, {
      roughness: 1.6, bowing: 1.5, strokeWidth: 1.1, stroke: QUIET
    }));
    wrap.appendChild(svg);
    primePaths(svg);
  }
  document.querySelectorAll('article figure img').forEach(function (img) {
    if (img.complete && img.offsetWidth) frameFigure(img);
    else img.addEventListener('load', function () { frameFigure(img); }, { once: true });
  });

  // --- 3. hover annotations (drawn once, then they stay) ------------------
  function annotateOnce(el, draw) {
    var done = false;
    function go() {
      if (done) return;
      done = true;
      draw();
    }
    el.addEventListener('mouseenter', go, { once: true });
    el.addEventListener('focus', go, { once: true });
  }

  // back link: a loose ellipse around it, like a marker on paper
  var back = document.querySelector('.back');
  if (back) {
    annotateOnce(back, function () {
      var w = back.offsetWidth + 28, h = back.offsetHeight + 18;
      var svg = makeSvg(w, h);
      var rc = rough.svg(svg);
      svg.appendChild(rc.ellipse(w / 2, h / 2, w - 6, h - 4, {
        roughness: 1.8, strokeWidth: 1.2, stroke: QUIET
      }));
      back.appendChild(svg);
      primePaths(svg);
    });
  }

  // section headings: rough underline under the text on first hover
  document.querySelectorAll('article h1, article h2').forEach(function (h) {
    annotateOnce(h, function () {
      var range = document.createRange();
      range.selectNodeContents(h);
      var textW = Math.min(range.getBoundingClientRect().width, h.offsetWidth);
      if (!textW) return;
      var W = textW + 8, H = 12;
      var svg = makeSvg(W, H);
      svg.style.width = W + 'px';
      svg.style.height = H + 'px';
      var rc = rough.svg(svg);
      svg.appendChild(rc.line(2, 6, W - 4, 5, {
        roughness: 2, bowing: 2.5, strokeWidth: 1.4, stroke: QUIET
      }));
      h.appendChild(svg);
      primePaths(svg);
    });
  });
})();
