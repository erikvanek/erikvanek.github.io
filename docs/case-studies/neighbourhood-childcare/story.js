/* Neighbourhood childcare — scroll story
 * Drives two Small Gravity fields (opening + coda) and the 5,000-dot grid.
 * No dependencies besides smallgravity.js.
 */
(function () {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = t => t * t * (3 - 2 * t);

  // ---------------------------------------------------------------------------
  // Field: a canvas with a cached terrain layer that crossfades when the target
  // state changes; glow, paths and presences are drawn live every frame.
  // ---------------------------------------------------------------------------
  function Field(canvas, opts) {
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    const ctx = canvas.getContext('2d');
    let W, H, sg, layers = [], targetKey = '', pendingTimer = null, visible = true, raf = null, t0 = performance.now();
    let targetFn = () => 0;

    function size() {
      const r = canvas.getBoundingClientRect();
      W = Math.max(320, Math.round(r.width * dpr)); H = Math.max(320, Math.round(r.height * dpr));
      canvas.width = W; canvas.height = H;
      sg = SmallGravity(Object.assign({ width: W, height: H }, opts)).init();
      sg.homes.forEach(h => { h.cur = 0; h.target = 0; });
      layers = []; targetKey = '';
      apply(true);
    }

    function bake() {
      const c = document.createElement('canvas'); c.width = W; c.height = H;
      const g = c.getContext('2d');
      sg.draw(g, 0, { glow: false, paths: 0, homes: false, grain: false, lit: h => h.target });
      return c;
    }

    function apply(now) {
      sg.homes.forEach(h => { h.target = h.lit ? clamp(targetFn(h), 0, 1) : 0; });
      const key = sg.homes.map(h => (h.target > 0.5 ? 1 : 0)).join('');
      if (key === targetKey) return;
      targetKey = key;
      clearTimeout(pendingTimer);
      const run = () => { layers.push({ c: bake(), born: performance.now() }); if (layers.length > 3) layers.shift(); };
      if (now || !layers.length) run(); else pendingTimer = setTimeout(run, 140);
      if (reduce) sg.homes.forEach(h => { h.cur = h.target; });
    }

    function frame(ts) {
      raf = null;
      const t = (ts - t0) / 1000;
      sg.homes.forEach(h => { h.cur += (h.target - h.cur) * (reduce ? 1 : 0.06); });
      ctx.globalAlpha = 1;
      layers.forEach((L, i) => {
        const a = i === 0 ? 1 : clamp((ts - L.born) / 900, 0, 1);
        ctx.globalAlpha = reduce ? 1 : ease(a);
        ctx.drawImage(L.c, 0, 0);
      });
      ctx.globalAlpha = 1;
      // drop fully-covered layers
      while (layers.length > 1 && ts - layers[1].born > 950) layers.shift();
      sg.draw(ctx, reduce ? 0 : t, {
        paper: false, terrain: 0, grain: true,
        lit: h => h.cur,
        paths: pa => clamp((Math.min(pa.a.cur, pa.b.cur) - 0.35) / 0.6, 0, 1)
      });
      if (visible && !reduce) raf = requestAnimationFrame(frame);
    }
    function kick() { if (!raf) raf = requestAnimationFrame(frame); }

    const io = new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) kick(); });
    io.observe(canvas);
    let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { size(); kick(); }, 250); });

    size(); kick();
    return {
      get sg() { return sg; },
      setTarget(fn) { targetFn = fn; apply(false); kick(); }
    };
  }

  // ---------------------------------------------------------------------------
  // Opening story: title → gap → idea → neighbourhood
  // ---------------------------------------------------------------------------
  const openCanvas = document.getElementById('field-open');
  if (openCanvas && window.SmallGravity) {
    const field = Field(openCanvas, { seed: 7, spacing: 210 });
    const steps = Array.from(document.querySelectorAll('[data-step]'));
    let current = 'all', progress = 0;

    function centralHome() {
      const sg = field.sg, narrow = window.innerWidth < 700;
      // keep the first home clear of the text card: right of it on desktop, below it on phones
      const cx = sg.opts.width * (narrow ? 0.5 : 0.66), cy = sg.opts.height * (narrow ? 0.82 : 0.5);
      return sg.lit.slice().sort((a, b) => Math.hypot(a.x - cx, a.y - cy) - Math.hypot(b.x - cx, b.y - cy))[0];
    }
    function update() {
      const sg = field.sg, n = sg.lit.length;
      if (current === 'all') field.setTarget(() => 1);
      else if (current === 'gap') field.setTarget(() => 0);
      else if (current === 'idea') { const c = centralHome(); field.setTarget(h => (h === c ? 1 : 0)); }
      else if (current === 'grow') {
        const c = centralHome(), k = Math.round(1 + progress * (n - 1));
        // light homes outward from the first one, nearest first
        const order = sg.lit.slice().sort((a, b) => Math.hypot(a.x - c.x, a.y - c.y) - Math.hypot(b.x - c.x, b.y - c.y));
        const on = new Set(order.slice(0, k));
        field.setTarget(h => (on.has(h) ? 1 : 0));
      }
    }
    function onScroll() {
      const vh = window.innerHeight, mid = vh * 0.55;
      let active = steps[0];
      steps.forEach(s => { const r = s.getBoundingClientRect(); if (r.top < mid) active = s; });
      const name = active.dataset.step;
      if (name === 'grow') {
        const r = active.getBoundingClientRect();
        progress = clamp((mid - r.top) / Math.max(1, r.height - vh * 0.2), 0, 1);
      }
      if (name !== current || name === 'grow') { current = name; update(); }
      steps.forEach(s => s.classList.toggle('is-active', s === active));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); update();
  }

  // ---------------------------------------------------------------------------
  // Coda field: hundreds of possible homes, a handful lit
  // ---------------------------------------------------------------------------
  const codaCanvas = document.getElementById('field-coda');
  if (codaCanvas && window.SmallGravity) {
    const coda = Field(codaCanvas, { seed: 11, spacing: 64, homeSize: 0.32, litCount: 5, levels: 12, terrain: 0.4, reach: 0 });
    coda.setTarget(() => 1);
  }

  // ---------------------------------------------------------------------------
  // 5,000 dots: one per expected group; 29 operating in clay
  // ---------------------------------------------------------------------------
  const dots = document.getElementById('dots');
  if (dots) {
    const cols = 125, gapX = 8.97, gapY = 5.9, y0 = 46;
    let s = 29; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    const litSet = new Set(); while (litSet.size < 29) litSet.add(Math.floor(rnd() * 5000));
    let out = '';
    for (let i = 0; i < 5000; i++) {
      const x = (i % cols) * gapX + 3, y = y0 + Math.floor(i / cols) * gapY + 3;
      out += litSet.has(i)
        ? '<circle class="dot-lit" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="3.1"/>'
        : '<circle class="dot" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="1.15"/>';
    }
    dots.querySelector('.dot-field').innerHTML = out;
  }
})();
