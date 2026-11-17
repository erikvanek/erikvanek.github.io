/*
 * Small Gravity — generative core, dependency-free (Canvas 2D)
 *
 * Homes are warm hills in a quiet highland terrain; neighbours are joined by
 * dotted footpaths; each summit holds at most four presences.
 *
 * Random + noise are exact ports of p5.js (LCG + p5's Perlin), so a seed here
 * draws the same village as the p5 explorer.
 *
 *   const sg = SmallGravity({ width, height, seed: 7 }).init();
 *   sg.draw(ctx, t, { lit: h => 0..1, paths: (path, i) => 0..1, ... });
 */
(function (global) {
  'use strict';

  const PALETTE = {
    paper: '#F4ECDF', paperDeep: '#E9DBC4', clay: '#B4553A', ochre: '#D9A05A',
    rose: '#DA9C88', sage: '#8C9C82', ink: '#2B2320', graphite: '#8A7E73', glow: '#FFF5E4'
  };

  // ---------- p5-compatible random + noise ----------
  const M = 4294967296, A = 1664525, C = 1013904223;
  function makeRng() {
    let state = 0, gPrev = false, y2 = 0;
    const r = {
      seed(v) { state = v >>> 0; gPrev = false; },
      next() { state = (A * state + C) % M; return state / M; },
      random(min, max) {
        const v = r.next();
        if (min === undefined) return v;
        if (max === undefined) return v * min;
        if (min > max) { const t = min; min = max; max = t; }
        return v * (max - min) + min;
      },
      gaussian(mean, sd) {
        sd = sd === undefined ? 1 : sd; let y1;
        if (gPrev) { y1 = y2; gPrev = false; }
        else {
          let x1, x2, w;
          do { x1 = r.random(2) - 1; x2 = r.random(2) - 1; w = x1 * x1 + x2 * x2; } while (w >= 1);
          w = Math.sqrt(-2 * Math.log(w) / w); y1 = x1 * w; y2 = x2 * w; gPrev = true;
        }
        return y1 * sd + (mean || 0);
      }
    };
    return r;
  }
  function makeNoise() {
    const YW = 1 << 4, ZW = 1 << 8, SIZE = 4095; let perlin = null;
    const sc = i => 0.5 * (1 - Math.cos(i * Math.PI));
    const n = {
      seed(v) {
        let z = v >>> 0; perlin = new Float64Array(SIZE + 1);
        for (let i = 0; i < SIZE + 1; i++) { z = (A * z + C) % M; perlin[i] = z / M; }
      },
      noise(x, y, z) {
        y = y || 0; z = z || 0;
        if (x < 0) x = -x; if (y < 0) y = -y; if (z < 0) z = -z;
        let xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
        let xf = x - xi, yf = y - yi, zf = z - zi, r = 0, ampl = 0.5;
        for (let o = 0; o < 4; o++) {
          let of = xi + (yi << 4) + (zi << 8);
          const rxf = sc(xf), ryf = sc(yf);
          let n1 = perlin[of & SIZE]; n1 += rxf * (perlin[(of + 1) & SIZE] - n1);
          let n2 = perlin[(of + YW) & SIZE]; n2 += rxf * (perlin[(of + YW + 1) & SIZE] - n2);
          n1 += ryf * (n2 - n1);
          of += ZW;
          n2 = perlin[of & SIZE]; n2 += rxf * (perlin[(of + 1) & SIZE] - n2);
          let n3 = perlin[(of + YW) & SIZE]; n3 += rxf * (perlin[(of + YW + 1) & SIZE] - n3);
          n2 += ryf * (n3 - n2);
          n1 += sc(zf) * (n2 - n1);
          r += n1 * ampl; ampl *= 0.5;
          xi <<= 1; xf *= 2; yi <<= 1; yf *= 2; zi <<= 1; zf *= 2;
          if (xf >= 1) { xi++; xf--; } if (yf >= 1) { yi++; yf--; } if (zf >= 1) { zi++; zf--; }
        }
        return r;
      }
    };
    return n;
  }

  // ---------- colour helpers ----------
  function hex(h) { const v = parseInt(h.slice(1), 16); return [(v >> 16) & 255, (v >> 8) & 255, v & 255]; }
  function rgba(c, a) { return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }
  function mix(c1, c2, t) { return [Math.round(c1[0] + (c2[0] - c1[0]) * t), Math.round(c1[1] + (c2[1] - c1[1]) * t), Math.round(c1[2] + (c2[2] - c1[2]) * t)]; }

  function SmallGravity(userOpts) {
    const o = Object.assign({
      seed: 7, width: 1600, height: 1000,
      spacing: 210, homeSize: 1.0, litRatio: 0.6, litCount: null,
      maxPresence: 4,           // the cap. structural, not decorative.
      levels: 18, terrain: 0.55, terrainScale: 0.0016, hill: 1.0,
      wobble: 0.3, reach: 3.0, bend: 0.22, grid: 5, grain: 0.5, margin: 0.07,
      homes: null, palette: PALETTE
    }, userOpts || {});

    const rng = makeRng(), nz = makeNoise();
    const S = () => Math.min(o.width, o.height) / 1080;
    const P = {}; Object.keys(o.palette).forEach(k => P[k] = hex(o.palette[k]));
    let homes = [], lit = [], paths = [], gw, gh, cell, field, warm, grainCanvas;

    function poisson(w, h, r, k) {
      k = k || 30;
      const cs = r / Math.SQRT2, GW = Math.ceil(w / cs), GH = Math.ceil(h / cs);
      const grid = new Array(GW * GH).fill(-1), pts = [], active = [];
      const add = (x, y) => { pts.push({ x, y }); active.push(pts.length - 1); grid[Math.floor(x / cs) + Math.floor(y / cs) * GW] = pts.length - 1; };
      add(w * (0.35 + rng.random(0.3)), h * (0.35 + rng.random(0.3)));
      while (active.length) {
        const ai = Math.floor(rng.random(active.length)), a = pts[active[ai]]; let found = false;
        for (let t = 0; t < k; t++) {
          const ang = rng.random(Math.PI * 2), d = rng.random(r, 1.8 * r);
          const x = a.x + Math.cos(ang) * d, y = a.y + Math.sin(ang) * d;
          if (x < 0 || y < 0 || x >= w || y >= h) continue;
          const gx = Math.floor(x / cs), gy = Math.floor(y / cs); let ok = true;
          for (let i = Math.max(0, gx - 2); i <= Math.min(GW - 1, gx + 2) && ok; i++)
            for (let j = Math.max(0, gy - 2); j <= Math.min(GH - 1, gy + 2); j++) {
              const id = grid[i + j * GW]; if (id < 0) continue;
              const q = pts[id]; if ((q.x - x) ** 2 + (q.y - y) ** 2 < r * r) { ok = false; break; }
            }
          if (ok) { add(x, y); found = true; break; }
        }
        if (!found) active.splice(ai, 1);
      }
      return pts;
    }

    function makePath(a, b) {
      const bend = rng.gaussian(0, o.bend), wob = rng.random(1000);
      const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
      const pts = [], N = Math.max(24, Math.floor(L / (4 * S())));
      for (let i = 0; i <= N; i++) {
        const t = i / N;
        const off = Math.sin(t * Math.PI) * bend * L + (nz.noise(wob + t * 2.2) - 0.5) * 22 * S() * Math.sin(t * Math.PI);
        pts.push({ x: a.x + dx * t + nx * off, y: a.y + dy * t + ny * off });
      }
      const keep = pts.filter(q => Math.hypot(q.x - a.x, q.y - a.y) > a.r * 0.78 && Math.hypot(q.x - b.x, q.y - b.y) > b.r * 0.78);
      let len = 0; keep.forEach((q, i) => { if (i) len += Math.hypot(q.x - keep[i - 1].x, q.y - keep[i - 1].y); q.s = len; });
      return { a, b, pts: keep, len, phase: rng.random() };
    }

    function buildHomes() {
      const s = S();
      if (o.homes) {
        homes = o.homes.map((h, i) => Object.assign({ id: i, phase: rng.random(Math.PI * 2), k: 4, r: 60 * s, lit: true }, h));
      } else {
        const mx = o.width * o.margin, my = o.height * o.margin;
        const pts = poisson(o.width - 2 * mx, o.height - 2 * my, o.spacing * s);
        homes = pts.map((q, i) => ({
          id: i, x: q.x + mx, y: q.y + my, r: rng.random(52, 80) * s * o.homeSize,
          k: [2, 3, 3, 4, 4, 4][Math.floor(rng.random(6))], phase: rng.random(Math.PI * 2), key: rng.random()
        }));
        const order = homes.slice().sort((a, b) => a.key - b.key);
        const nLit = o.litCount != null ? Math.min(o.litCount, homes.length) : Math.round(homes.length * o.litRatio);
        homes.forEach(h => h.lit = false);
        order.slice(0, nLit).forEach((h, i) => { h.lit = true; h.litOrder = i; });
      }
      homes.forEach(h => { h.k = Math.min(h.k, o.maxPresence); });
      lit = homes.filter(h => h.lit);
      paths = []; const seen = new Set();
      lit.forEach(h => {
        lit.filter(q => q !== h).map(q => ({ q, d: Math.hypot(q.x - h.x, q.y - h.y) }))
          .sort((a, b) => a.d - b.d).slice(0, 2)
          .filter(e => e.d < o.spacing * s * o.reach)
          .forEach(e => {
            const key = Math.min(h.id, e.q.id) + '-' + Math.max(h.id, e.q.id);
            if (seen.has(key)) return; seen.add(key); paths.push(makePath(h, e.q));
          });
      });
    }

    function makeGrain() {
      grainCanvas = document.createElement('canvas'); grainCanvas.width = o.width; grainCanvas.height = o.height;
      const g = grainCanvas.getContext('2d'), n = Math.floor(o.width * o.height * 0.02 * o.grain);
      for (let i = 0; i < n; i++) {
        const dark = rng.random() < 0.55;
        g.fillStyle = dark ? `rgba(90,70,54,${rng.random(5, 14) / 255})` : `rgba(255,255,255,${rng.random(8, 24) / 255})`;
        g.fillRect(rng.random(o.width), rng.random(o.height), 1, 1);
      }
    }

    function init() {
      rng.seed(o.seed); nz.seed(o.seed);
      buildHomes(); makeGrain();
      cell = o.grid * S(); gw = Math.ceil(o.width / cell) + 1; gh = Math.ceil(o.height / cell) + 1;
      field = new Float32Array(gw * gh); warm = new Float32Array(gw * gh);
      return api;
    }

    function computeField(t, litFn) {
      const ts = o.terrainScale, z = t * 0.025;
      const H = homes.map(h => { const lv = h.lit ? litFn(h) : 0; return { x: h.x, y: h.y, r2: (h.r * 1.25) ** 2, amp: o.hill * (0.5 + 0.8 * lv) * (h.presence === undefined ? 1 : h.presence), lv, id: h.id }; });
      for (let j = 0; j < gh; j++) for (let i = 0; i < gw; i++) {
        const x = i * cell, y = j * cell;
        let v = (nz.noise(x * ts, y * ts, z) - 0.5) * 2 * o.terrain + (nz.noise(x * ts * 3.1 + 40, y * ts * 3.1, z * 1.7) - 0.5) * 0.35 * o.terrain;
        let w = 0;
        for (const h of H) {
          if (h.amp <= 0) continue;
          const d2 = (x - h.x) ** 2 + (y - h.y) ** 2;
          if (d2 > h.r2 * 9) continue;
          const ang = Math.atan2(y - h.y, x - h.x);
          const def = 1 + o.wobble * (nz.noise(Math.cos(ang) * 0.5 + h.id * 7.3, Math.sin(ang) * 0.5 + 50, z * 2) - 0.5) * 2;
          v += h.amp * Math.exp(-Math.pow(d2 / (h.r2 * def * def), 1.35));
          if (h.lv > 0) w += h.lv * Math.exp(-d2 / (h.r2 * 1.6));
        }
        field[i + j * gw] = v; warm[i + j * gw] = Math.min(1, w);
      }
    }

    const CASES = { 1: [['L', 'B']], 2: [['B', 'R']], 3: [['L', 'R']], 4: [['T', 'R']], 5: [['L', 'T'], ['B', 'R']], 6: [['T', 'B']], 7: [['L', 'T']],
      8: [['L', 'T']], 9: [['T', 'B']], 10: [['T', 'R'], ['L', 'B']], 11: [['T', 'R']], 12: [['L', 'R']], 13: [['B', 'R']], 14: [['L', 'B']] };
    function iso(level, emit) {
      for (let j = 0; j < gh - 1; j++) for (let i = 0; i < gw - 1; i++) {
        const a = field[i + j * gw], b = field[i + 1 + j * gw], c = field[i + 1 + (j + 1) * gw], d = field[i + (j + 1) * gw];
        const idx = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0);
        if (idx === 0 || idx === 15) continue;
        const x = i * cell, y = j * cell;
        const E = { T: [x + cell * (level - a) / (b - a), y], R: [x + cell, y + cell * (level - b) / (c - b)],
          B: [x + cell * (level - d) / (c - d), y + cell], L: [x, y + cell * (level - a) / (d - a)] };
        const wv = warm[i + j * gw];
        for (const sg of CASES[idx]) emit(E[sg[0]], E[sg[1]], wv);
      }
    }

    function drawTerrain(ctx, t, litFn, alpha) {
      const s = S(); computeField(t, litFn);
      const lo = -o.terrain * 0.9, hi = o.hill * 3.2;
      for (let L = 0; L < o.levels; L++) {
        const level = lo + (hi - lo) * (L + 0.5) / o.levels, major = L % 5 === 2;
        const buckets = [[], [], [], [], []];
        iso(level, (A, B, wv) => { buckets[Math.min(4, Math.floor(wv * 5))].push(A, B); });
        buckets.forEach((segs, bi) => {
          if (!segs.length) return;
          if (bi === 0) { ctx.strokeStyle = rgba(P.graphite, (major ? 0.5 : 0.28) * alpha); ctx.lineWidth = (major ? 0.9 : 0.6) * s; }
          else { const wv = bi / 4; ctx.strokeStyle = rgba(mix(P.ochre, P.clay, wv), (0.3 + wv * 0.5) * alpha); ctx.lineWidth = (0.7 + wv * 0.55) * s * (major ? 1.25 : 1); }
          ctx.beginPath();
          for (let k = 0; k < segs.length; k += 2) { ctx.moveTo(segs[k][0], segs[k][1]); ctx.lineTo(segs[k + 1][0], segs[k + 1][1]); }
          ctx.stroke();
        });
      }
    }

    function drawGlow(ctx, litFn) {
      homes.forEach(h => {
        const v = h.lit ? litFn(h) : 0; if (v <= 0.001) return;
        const R = h.r * 2.1, rg = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, R);
        rg.addColorStop(0, `rgba(217,160,90,${0.40 * v})`); rg.addColorStop(0.4, `rgba(218,156,136,${0.22 * v})`); rg.addColorStop(1, 'rgba(218,156,136,0)');
        ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(h.x, h.y, R, 0, Math.PI * 2); ctx.fill();
      });
    }

    function tracePath(ctx, pa, upto) {
      ctx.beginPath(); let started = false;
      for (const q of pa.pts) { if (q.s > upto) break; if (started) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); started = true; }
    }
    function drawPaths(ctx, prog, t) {
      const s = S();
      paths.forEach((pa, idx) => {
        const vis = typeof prog === 'function' ? prog(pa, idx) : prog;
        if (vis <= 0 || pa.pts.length < 2) return;
        const upto = pa.len * Math.min(1, vis);
        ctx.lineCap = 'round'; ctx.setLineDash([]);
        ctx.strokeStyle = 'rgba(244,236,223,0.9)'; ctx.lineWidth = 8 * s; tracePath(ctx, pa, upto); ctx.stroke();
        ctx.strokeStyle = 'rgba(180,85,58,0.92)'; ctx.lineWidth = 2.4 * s;
        ctx.setLineDash([0.1, 7.5 * s]); ctx.lineDashOffset = -t * 7 * s;
        tracePath(ctx, pa, upto); ctx.stroke(); ctx.setLineDash([]);
      });
    }

    function drawHomes(ctx, t, litFn, ghostAlpha) {
      const s = S();
      homes.forEach(h => {
        const v = h.lit ? litFn(h) : 0, pres = h.presence === undefined ? 1 : h.presence;
        if (v < 0.999 && pres > 0) {
          ctx.setLineDash([2.5 * s, 4.5 * s]);
          ctx.strokeStyle = `rgba(122,111,102,${0.8 * (1 - v) * ghostAlpha * pres})`; ctx.lineWidth = 0.9 * s;
          ctx.beginPath(); ctx.arc(h.x, h.y, h.r * 0.34, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
        }
        if (v > 0) {
          const n = Math.max(1, Math.min(h.k, Math.floor(h.k * Math.min(1, Math.max(0, v * 1.5 - 0.3)) + 1e-6)));
          const spread = h.r * (n === 1 ? 0 : 0.17);
          for (let i = 0; i < n; i++) {
            const a = h.phase + (i / n) * Math.PI * 2 + 0.25 * Math.sin(t * 0.35 + i * 1.7);
            const rr = spread * (1 + 0.12 * Math.sin(t * 0.6 + i * 2.3));
            const x = h.x + Math.cos(a) * rr, y = h.y + Math.sin(a) * rr;
            const gl = ctx.createRadialGradient(x, y, 0, x, y, 15 * s);
            gl.addColorStop(0, `rgba(226,140,80,${0.55 * v})`); gl.addColorStop(1, 'rgba(226,140,80,0)');
            ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(x, y, 15 * s, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = `rgba(180,85,58,${v})`; ctx.beginPath(); ctx.arc(x, y, 6.2 * s * (0.6 + 0.4 * v), 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = `rgba(255,240,214,${v})`; ctx.beginPath(); ctx.arc(x - 1.2 * s, y - 1.2 * s, 2.2 * s, 0, Math.PI * 2); ctx.fill();
          }
        }
      });
    }

    function paper(ctx) {
      ctx.fillStyle = o.palette.paper; ctx.fillRect(0, 0, o.width, o.height);
      const rg = ctx.createRadialGradient(o.width / 2, o.height * 0.45, Math.min(o.width, o.height) * 0.2, o.width / 2, o.height / 2, Math.max(o.width, o.height) * 0.78);
      rg.addColorStop(0, 'rgba(244,236,223,0)'); rg.addColorStop(1, 'rgba(225,208,183,0.55)');
      ctx.fillStyle = rg; ctx.fillRect(0, 0, o.width, o.height);
    }

    function draw(ctx, t, opt) {
      t = t || 0;
      opt = Object.assign({ paper: true, terrain: 1, glow: true, paths: 1, homes: true, grain: true, lit: 1, ghosts: 1 }, opt || {});
      const litFn = typeof opt.lit === 'function' ? opt.lit : () => opt.lit;
      if (opt.paper) paper(ctx);
      if (opt.glow) drawGlow(ctx, litFn);
      if (opt.terrain > 0) drawTerrain(ctx, t, litFn, opt.terrain);
      if (opt.paths) drawPaths(ctx, opt.paths, t);
      if (opt.homes) drawHomes(ctx, t, litFn, opt.ghosts);
      if (opt.grain) ctx.drawImage(grainCanvas, 0, 0);
    }

    const api = { init, draw, opts: o, palette: o.palette, rng, noise: nz,
      get homes() { return homes; }, get lit() { return lit; }, get paths() { return paths; } };
    return api;
  }

  SmallGravity.PALETTE = PALETTE;
  global.SmallGravity = SmallGravity;
})(typeof window !== 'undefined' ? window : globalThis);
