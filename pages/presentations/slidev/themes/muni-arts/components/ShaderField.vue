<!--
  Animated shader field for the blue divider layouts (section-break, break).

  What it is: Conway's Game of Life, simulated on the GPU, rendered through an
  8x8 ordered dither into the brand palette, with a slowly drifting lens that
  magnifies a patch of the grid so the cells read as cells.

  Why Life rather than noise: a divider on a design course can afford to show
  complex behaviour emerging from four trivial rules, and it is something to
  point at while talking. It also solves the problem plain noise has, which is
  that it looks like a compression artifact. Life has structure - gliders move,
  oscillators breathe, still lifes sit - so the eye reads it as alive.

  **No dependencies.** Two fragment shaders and a pair of framebuffers, raw
  WebGL1, about 200 lines. The Codrops/Efecto piece this started from builds on
  Three.js plus a postprocessing stack; that is ~600 KB shipped into a public
  repo to draw a background, and it would run a second render loop next to
  Slidev's own.

  **Why ordered dithering and not Floyd-Steinberg.** Efecto runs its dithering
  on the CPU, because error-diffusion kernels are sequential: each pixel's error
  depends on the one computed before it. Bayer is a threshold lookup, so every
  pixel is independent and it belongs in the fragment shader, where it is free.

  **How the simulation runs.** Ping-pong between two textures: the step shader
  reads the previous state and writes the next. The grid wraps as a torus, done
  with mod() rather than GL_REPEAT, because WebGL1 only repeats power-of-two
  textures. State is packed into two channels: R is alive, G is an afterglow
  that decays over several steps, which is what gives dying cells a trail
  instead of a blink. The step rate is deliberately slow (default 5 per second,
  not 60) and the display crossfades between the two most recent states, so the
  whole thing breathes rather than flickers.

  **It never dies out, and that needs more help than it looks.** Life on a grid
  this size settles into still lifes and oscillators within a minute or so, and
  a settled field is a static one - the first tuning pass ran slowly enough that
  the divider was visibly frozen by the time anyone reached it. Two things keep
  it alive: a birth rate high enough to seed roughly thirty cells a generation,
  which constantly provokes new structure without turning the field to static,
  and a generation rate that is slow but not glacial. The crossfade between the
  two most recent generations means the display is always mid-morph, so even at
  a couple of generations a second nothing ever snaps.

  **Brand.** The palette is locked to three tokens: --muni-blue #0000dc,
  --muni-arts-blue #4bc8ff and white. The manual's "Zakazane varianty" (p.23)
  forbids off-palette recoloring of the brand system, so `palette` picks a ramp
  within those, never an arbitrary hue.

  **Performance.** The simulation is 192x108 cells stepped 5 times a second, so
  it costs almost nothing. The display canvas renders at a low internal
  resolution and is upscaled with image-rendering: pixelated, which keeps the
  dither cells square instead of letting the browser smooth them away. The RAF
  only runs while the slide is actually on screen, and the WebGL context is not
  built until then either - Slidev mounts every slide of the deck at once, so
  building eagerly would open one context per divider (nine in session 1)
  against a browser limit of roughly sixteen.

  **Degradation is free.** The layouts already paint background: var(--muni-blue).
  If WebGL is unavailable the canvas never paints and the slide is the flat blue
  field it was before.

  **Reduced motion is honoured.** Under prefers-reduced-motion the simulation is
  advanced a few generations once and then frozen, so the slide still has
  structure but nothing moves. Worth knowing when testing: headless Chrome
  reports prefers-reduced-motion: reduce by default, so a headless screenshot
  shows the frozen frame and two screenshots taken seconds apart are identical.
  That is this code working, not a bug. To see it animate under CDP, emulate the
  feature as no-preference first. It also means Slidev's own PNG and PDF export
  captures a still frame, which is the behaviour you want there anyway.
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useIsSlideActive } from '@slidev/client'

const props = withDefaults(
  defineProps<{
    /** Ramp within the approved palette. Not a free color. */
    palette?: 'blue' | 'ice' | 'mono'
    /** Stable per-slide variation: same seed, same starting soup. */
    seed?: number
    /** Overall strength, 0 to 1. Lower is calmer behind text. */
    intensity?: number
    /** Generations per second. Deliberately under 1: the crossfade between
     * generations means the field is always mid-morph, so it reads as barely
     * moving rather than as a ticking simulation. */
    speed?: number
    /** Starting density of the soup, 0 to 1. */
    density?: number
    /** Internal render width; the canvas upscales from here. */
    resolution?: number
    /**
     * 'auto'   - honour prefers-reduced-motion (default)
     * 'always' - animate regardless; for the presenting machine
     * 'off'    - never animate, render one still frame
     */
    motion?: 'auto' | 'always' | 'off'
    /**
     * How much darker the corners go than the centre, 0 to 1. Deliberately
     * small: this is meant to seat the slide, not to frame it.
     */
    vignette?: number
    /**
     * Opacity of the simulation at the centre of the slide, rising smoothly to
     * full outside the ellipse. Lower means calmer behind the type.
     */
    centerAlpha?: number
    /**
     * Seconds the field takes to bloom in after the slide lands. 0 disables it.
     * The slide opens as the flat blue it has always been and the simulation
     * arrives afterwards, which gives the divider a beat of its own instead of
     * hitting the room fully formed.
     */
    fadeIn?: number
  }>(),
  {
    palette: 'blue',
    seed: 1,
    intensity: 0.62,
    speed: 0.4,
    density: 0.28,
    resolution: 520,
    motion: 'auto',
    vignette: 0.2,
    centerAlpha: 0.5,
    fadeIn: 7,
  },
)

const GRID_W = 192
const GRID_H = 108

const host = ref<HTMLCanvasElement | null>(null)
const isActive = useIsSlideActive()
let ready = false
const prefersReduced = ref(
  typeof window !== 'undefined'
  && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
)

if (typeof window !== 'undefined' && window.matchMedia) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener?.('change', e => { prefersReduced.value = e.matches })
}

/**
 * Whether this field animates.
 *
 * 'auto' honours the OS preference, which is the right default for the
 * PUBLISHED deck: a student who has asked their machine to stop moving things
 * should get a still background.
 *
 * It is the wrong default for the ROOM, and that is not a hypothetical - the
 * presenting Mac here has Reduce Motion switched on system-wide, so under
 * 'auto' the effect would be frozen on the one screen the audience actually
 * sees, at every single session, while looking perfectly fine everywhere else.
 * 'always' is the deliberate opt-out for that machine; set it in headmatter as
 * shaderMotion: always.
 *
 * The honest trade this makes: 'always' also animates for a reader of the
 * published deck who has the same preference set. That is a real cost, and the
 * reason this is an explicit author decision rather than the default. The field
 * is a slow, low-contrast background with no flashing and no scrolling parallax,
 * which is the mildest end of what the preference is meant to catch.
 */
const animates = computed(() => {
  if (props.motion === 'off')
    return false
  if (props.motion === 'always')
    return true
  return !prefersReduced.value
})

const RAMPS: Record<string, number[][]> = {
  // muni-blue -> a mid blue -> a softened arts-blue.
  // The top of the ramp is deliberately NOT white. White against #0000dc is a
  // ~14:1 contrast step and the dither turns every one of those steps into a
  // hard edge, so the field fought the type. Capping the ramp near arts-blue
  // (luminance ~0.72 against white's 1.0) takes about 30% off the brightest
  // cells and leaves the white headline as the brightest thing on the slide,
  // which is where the eye should land anyway.
  blue: [[0.0, 0.0, 0.863], [0.16, 0.42, 0.95], [0.45, 0.80, 1.0]],
  // Lifted: arts-blue carries more of the range. For a divider with no text.
  ice: [[0.0, 0.0, 0.663], [0.24, 0.62, 0.98], [0.56, 0.86, 1.0]],
  // Brand blue only, into a single soft step. The quietest of the three.
  mono: [[0.0, 0.0, 0.863], [0.0, 0.0, 0.863], [0.38, 0.62, 0.98]],
}

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

// ---- simulation pass: one Conway generation ----
const STEP_FRAG = `
precision highp float;
uniform sampler2D uState;
uniform vec2  uGrid;
uniform float uGen;
uniform float uBirth;

float cellAt(vec2 c) {
  // Torus wrap by hand: WebGL1 only repeats power-of-two textures.
  vec2 w = mod(c + uGrid, uGrid);
  return texture2D(uState, (w + 0.5) / uGrid).r;
}

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 c = floor(gl_FragCoord.xy);
  vec4 s = texture2D(uState, (c + 0.5) / uGrid);
  float alive = s.r;

  float n = cellAt(c + vec2(-1.0, -1.0)) + cellAt(c + vec2(0.0, -1.0)) + cellAt(c + vec2(1.0, -1.0))
          + cellAt(c + vec2(-1.0,  0.0))                               + cellAt(c + vec2(1.0,  0.0))
          + cellAt(c + vec2(-1.0,  1.0)) + cellAt(c + vec2(0.0,  1.0)) + cellAt(c + vec2(1.0,  1.0));

  // B3/S23, the original rules.
  float next = alive > 0.5
    ? ((n > 1.5 && n < 3.5) ? 1.0 : 0.0)
    : ((n > 2.5 && n < 3.5) ? 1.0 : 0.0);

  // A trickle of new cells so the field keeps provoking structure instead of
  // settling into still lifes a few minutes in.
  if (hash(c + uGen * 7.77) < uBirth)
    next = 1.0;

  // Afterglow: a dying cell fades over several generations rather than
  // blinking out, which is most of what makes this read as slow.
  float glow = max(next, s.g * 0.86);

  gl_FragColor = vec4(next, glow, 0.0, 1.0);
}
`

// ---- display pass: lens, dither, brand ramp ----
const DRAW_FRAG = `
precision highp float;
uniform sampler2D uCur;
uniform sampler2D uPrev;
uniform vec2  uRes;
uniform vec2  uGrid;
uniform float uMix;
uniform float uTime;
uniform float uSeed;
uniform float uIntensity;
uniform vec3  uC0;
uniform vec3  uC1;
uniform vec3  uC2;
uniform float uVignette;
uniform float uCenterAlpha;

float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}
#define bayer4(a) (bayer2(0.5 * (a)) * 0.25 + bayer2(a))
#define bayer8(a) (bayer4(0.5 * (a)) * 0.25 + bayer2(a))

float sampleLife(vec2 uv) {
  vec2 w = fract(uv);
  vec4 a = texture2D(uCur, w);
  vec4 b = texture2D(uPrev, w);
  // Crossfade the two most recent generations, and weight the afterglow in.
  float cur = a.r * 0.62 + a.g * 0.38;
  float prv = b.r * 0.62 + b.g * 0.38;
  return mix(prv, cur, uMix);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  float aspect = uRes.x / uRes.y;
  vec2 uv0 = frag / uRes;
  vec2 p0 = vec2(uv0.x * aspect, uv0.y);

  // ---- the drifting lens ----
  // Two incommensurable periods, so it never visibly repeats within a talk.
  vec2 lens = vec2(
    0.5 * aspect + 0.31 * aspect * sin(uTime * 0.00515 + uSeed * 2.4),
    0.5 + 0.27 * cos(uTime * 0.0035 + uSeed * 1.3)
  );
  float radius = 0.30;
  float d = distance(p0, lens);
  float g = smoothstep(radius, radius * 0.55, d);
  float rim = smoothstep(radius * 1.05, radius, d) - smoothstep(radius, radius * 0.88, d);

  // Magnify toward the lens centre: inside the glass you are looking at fewer,
  // bigger cells, so the structure of the simulation becomes legible.
  vec2 p = mix(p0, lens + (p0 - lens) * 0.34, g * uIntensity);
  vec2 uv = vec2(p.x / aspect, p.y);

  float v = sampleLife(uv);

  // Blur only inside the glass, in cell units so it scales with the zoom.
  if (g > 0.01) {
    vec2 e = vec2(1.6, 1.6) / uGrid * g;
    float b = sampleLife(uv + vec2(e.x, 0.0))
            + sampleLife(uv + vec2(-e.x, 0.0))
            + sampleLife(uv + vec2(0.0, e.y))
            + sampleLife(uv + vec2(0.0, -e.y));
    v = mix(v, (v + b) * 0.2, g * 0.85);
  }

  // Flatten outside the lens so the field stays wallpaper and the glass is the
  // event; lift contrast inside so it announces itself.
  v = mix(v * 0.68, smoothstep(0.06, 0.62, v), g);

  // ---- ordered dither ----
  float cellPx = mix(2.0, 6.0, g);
  float levels = mix(5.0, 3.0, g);
  float threshold = bayer8(frag / cellPx) - 0.5;
  float q = floor(v * levels + threshold) / (levels - 1.0);
  q = clamp(q + rim * 0.5, 0.0, 1.0);

  // ---- brand ramp ----
  // Biased hard toward the ground colour: white type sits on top of this.
  float k = pow(q, 1.35) * uIntensity;
  vec3 col = k < 0.5
    ? mix(uC0, uC1, k * 2.0)
    : mix(uC1, uC2, (k - 0.5) * 2.0);
  col = mix(uC0, col, mix(0.62, 1.0, g));

  // ---- the ellipse ----
  // One soft ellipse, wider than it is tall so it follows the shape of a 16:9
  // frame rather than sitting on it as a circle, breathing on a period of
  // several minutes. Slow enough that you never catch it moving, but two
  // dividers an hour apart are not the same frame. It drives two things.
  vec2 vc = (uv0 - 0.5) * vec2(1.0, 0.86);
  float breathe = 0.5 + 0.5 * sin(uTime * 0.00625 + uSeed * 0.7);
  float vd = length(vc) / (0.40 * mix(0.94, 1.10, breathe));

  // First: how much of the simulation shows through. Held down to uCenterAlpha
  // inside the ellipse, where the type sits, and rising to full outside it, so
  // the field is liveliest at the edges and quietest under the words. The ramp
  // is a smoothstep across the whole ellipse rather than a hard boundary, so
  // there is no visible rim where the two levels meet.
  float alpha = mix(uCenterAlpha, 1.0, smoothstep(0.0, 1.0, vd));
  col = mix(uC0, col, alpha);

  // Second: a gentle vignette. Multiplying rather than mixing toward black
  // keeps it inside the blue - at the default 0.2 the darkest corner is about
  // #0000b0, the brand blue with the lights down rather than a grey.
  float vig = 1.0 - uVignette * smoothstep(0.30, 1.35, vd);
  col *= vig;

  gl_FragColor = vec4(col, 1.0);
}
`

let gl: WebGLRenderingContext | null = null
let stepProg: WebGLProgram | null = null
let drawProg: WebGLProgram | null = null
let texA: WebGLTexture | null = null
let texB: WebGLTexture | null = null
let fboA: WebGLFramebuffer | null = null
let fboB: WebGLFramebuffer | null = null
let readIsA = true
let raf = 0
let startMs = 0
let lastStepMs = 0
let generation = 0
let stepMix = 1

function compile(g: WebGLRenderingContext, type: number, src: string) {
  const sh = g.createShader(type)!
  g.shaderSource(sh, src)
  g.compileShader(sh)
  if (!g.getShaderParameter(sh, g.COMPILE_STATUS)) {
    console.warn('[ShaderField] compile failed:', g.getShaderInfoLog(sh))
    return null
  }
  return sh
}

function link(g: WebGLRenderingContext, fragSrc: string) {
  const vs = compile(g, g.VERTEX_SHADER, VERT)
  const fs = compile(g, g.FRAGMENT_SHADER, fragSrc)
  if (!vs || !fs)
    return null
  const p = g.createProgram()!
  g.attachShader(p, vs)
  g.attachShader(p, fs)
  g.linkProgram(p)
  if (!g.getProgramParameter(p, g.LINK_STATUS)) {
    console.warn('[ShaderField] link failed:', g.getProgramInfoLog(p))
    return null
  }
  return p
}

/** Deterministic soup, so a given seed always starts the same way. */
function soup(seed: number) {
  const data = new Uint8Array(GRID_W * GRID_H * 4)
  let s = Math.imul(seed || 1, 0x9e3779b1) >>> 0
  const rnd = () => {
    s ^= s << 13; s >>>= 0
    s ^= s >> 17
    s ^= s << 5; s >>>= 0
    return s / 0xffffffff
  }
  for (let i = 0; i < GRID_W * GRID_H; i++) {
    const alive = rnd() < props.density ? 255 : 0
    data[i * 4] = alive
    data[i * 4 + 1] = alive
    data[i * 4 + 3] = 255
  }
  return data
}

function makeTarget(g: WebGLRenderingContext, data: Uint8Array | null) {
  const tex = g.createTexture()!
  g.bindTexture(g.TEXTURE_2D, tex)
  g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, GRID_W, GRID_H, 0, g.RGBA, g.UNSIGNED_BYTE, data)
  g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.NEAREST)
  g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.NEAREST)
  g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE)
  g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE)
  const fbo = g.createFramebuffer()!
  g.bindFramebuffer(g.FRAMEBUFFER, fbo)
  g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, tex, 0)
  const ok = g.checkFramebufferStatus(g.FRAMEBUFFER) === g.FRAMEBUFFER_COMPLETE
  g.bindFramebuffer(g.FRAMEBUFFER, null)
  return ok ? { tex, fbo } : null
}

function init() {
  const canvas = host.value
  if (!canvas)
    return false

  gl = (canvas.getContext('webgl', { antialias: false, alpha: false, preserveDrawingBuffer: true })
    || canvas.getContext('experimental-webgl', { antialias: false, alpha: false })) as WebGLRenderingContext | null
  if (!gl)
    return false

  stepProg = link(gl, STEP_FRAG)
  drawProg = link(gl, DRAW_FRAG)
  if (!stepProg || !drawProg)
    return false

  const start = soup(props.seed)
  const a = makeTarget(gl, start)
  const b = makeTarget(gl, start)
  if (!a || !b)
    return false
  texA = a.tex; fboA = a.fbo
  texB = b.tex; fboB = b.fbo
  readIsA = true
  generation = 0

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  for (const p of [stepProg, drawProg]) {
    gl.useProgram(p)
    const loc = gl.getAttribLocation(p, 'aPos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
  }
  return true
}

function step() {
  if (!gl || !stepProg)
    return
  const readTex = readIsA ? texA : texB
  const writeFbo = readIsA ? fboB : fboA
  gl.useProgram(stepProg)
  gl.bindFramebuffer(gl.FRAMEBUFFER, writeFbo)
  gl.viewport(0, 0, GRID_W, GRID_H)
  // The display pass leaves BOTH state textures bound to sampler units. If the
  // one we are about to render into is still bound, that is a feedback loop and
  // the driver skips the draw with no error at all - which reads exactly like a
  // frozen simulation. Clear unit 1 before binding the read texture to unit 0.
  gl.activeTexture(gl.TEXTURE1)
  gl.bindTexture(gl.TEXTURE_2D, null)
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, readTex)
  gl.uniform1i(gl.getUniformLocation(stepProg, 'uState'), 0)
  gl.uniform2f(gl.getUniformLocation(stepProg, 'uGrid'), GRID_W, GRID_H)
  gl.uniform1f(gl.getUniformLocation(stepProg, 'uGen'), generation)
  gl.uniform1f(gl.getUniformLocation(stepProg, 'uBirth'), 0.0016)
  gl.drawArrays(gl.TRIANGLES, 0, 3)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  readIsA = !readIsA
  generation++
}

function resize() {
  const canvas = host.value
  if (!canvas)
    return
  const w = Math.max(64, Math.round(props.resolution))
  const rect = canvas.getBoundingClientRect()
  const h = Math.max(64, Math.round(w * (rect.height || 9) / (rect.width || 16)))
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w
    canvas.height = h
  }
}

function render(tSeconds: number) {
  const canvas = host.value
  if (!gl || !drawProg || !canvas)
    return
  resize()
  gl.useProgram(drawProg)
  gl.viewport(0, 0, canvas.width, canvas.height)
  const cur = readIsA ? texA : texB
  const prev = readIsA ? texB : texA
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, cur)
  gl.uniform1i(gl.getUniformLocation(drawProg, 'uCur'), 0)
  gl.activeTexture(gl.TEXTURE1)
  gl.bindTexture(gl.TEXTURE_2D, prev)
  gl.uniform1i(gl.getUniformLocation(drawProg, 'uPrev'), 1)
  const ramp = RAMPS[props.palette] ?? RAMPS.blue
  gl.uniform2f(gl.getUniformLocation(drawProg, 'uRes'), canvas.width, canvas.height)
  gl.uniform2f(gl.getUniformLocation(drawProg, 'uGrid'), GRID_W, GRID_H)
  gl.uniform1f(gl.getUniformLocation(drawProg, 'uMix'), stepMix)
  gl.uniform1f(gl.getUniformLocation(drawProg, 'uTime'), tSeconds)
  gl.uniform1f(gl.getUniformLocation(drawProg, 'uSeed'), props.seed)
  gl.uniform1f(gl.getUniformLocation(drawProg, 'uIntensity'), props.intensity)
  gl.uniform1f(gl.getUniformLocation(drawProg, 'uVignette'), props.vignette)
  gl.uniform1f(gl.getUniformLocation(drawProg, 'uCenterAlpha'), props.centerAlpha)
  gl.uniform3fv(gl.getUniformLocation(drawProg, 'uC0'), ramp[0])
  gl.uniform3fv(gl.getUniformLocation(drawProg, 'uC1'), ramp[1])
  gl.uniform3fv(gl.getUniformLocation(drawProg, 'uC2'), ramp[2])
  gl.drawArrays(gl.TRIANGLES, 0, 3)
}

function loop(now: number) {
  if (!startMs) {
    startMs = now
    lastStepMs = now
  }
  const interval = 1000 / Math.max(0.5, props.speed)
  if (now - lastStepMs >= interval) {
    step()
    lastStepMs = now
  }
  stepMix = Math.min(1, (now - lastStepMs) / interval)
  render((now - startMs) / 1000)
  raf = requestAnimationFrame(loop)
}

function play() {
  if (raf || !gl)
    return
  if (!animates.value) {
    // Advance a few generations so there is structure, then freeze.
    for (let i = 0; i < 12; i++) step()
    stepMix = 1
    render(props.seed * 7.3)
    return
  }
  raf = requestAnimationFrame(loop)
}

/**
 * The bloom-in, done as opacity on the canvas rather than as a uniform inside
 * the shader.
 *
 * Fading a uniform toward the palette's own ground colour would be wrong at
 * zero: the 'ice' ramp starts darker than --muni-blue, so the canvas would
 * open as a visibly darker rectangle sitting on the layout's background before
 * lifting out of it. Opacity has no such coupling - at 0 you see exactly
 * whatever the layout painted, whichever palette is in play.
 *
 * Web Animations rather than a CSS class, because this has to re-trigger every
 * time the slide is entered, and re-running a CSS transition means toggling a
 * class and forcing a reflow between the two states. el.animate() just runs
 * again.
 */
let fadeAnim: Animation | null = null

function startFade() {
  const el = host.value
  if (!el)
    return
  fadeAnim?.cancel()
  // Whatever happens, the resting state is fully visible.
  el.style.opacity = '1'
  if (!animates.value || props.fadeIn <= 0)
    return
  fadeAnim = el.animate(
    [{ opacity: 0 }, { opacity: 1 }],
    // A gentle S, close to linear through the middle with soft ends. An
    // ease-out was the first instinct and it was wrong: it put 70% of the
    // reveal into the first 1.8 seconds, so a seven-second fade read as a
    // two-second one with a long tail. A dissolve wants its time spread evenly.
    { duration: props.fadeIn * 1000, easing: 'cubic-bezier(.35,.08,.6,.94)', fill: 'both' },
  )
}

function resetFade() {
  const el = host.value
  if (!el)
    return
  fadeAnim?.cancel()
  fadeAnim = null
  // Back to the stylesheet's 0, so the next entrance starts from the flat slide.
  el.style.opacity = ''
}

function pause() {
  if (raf) {
    cancelAnimationFrame(raf)
    raf = 0
  }
}

function onVisibility() {
  if (document.hidden)
    pause()
  else if (isActive.value)
    play()
}

/**
 * Created on first use, never eagerly. Slidev mounts every slide of the deck at
 * once, so a theme that built a context in onMounted would open one per divider
 * slide - nine in session 1 - against a browser limit of roughly sixteen live
 * WebGL contexts per page. Anything past the limit gets the oldest context
 * killed out from under it. Building it the first time the slide is actually
 * shown means a deck only pays for the dividers somebody visits.
 */
function ensure() {
  if (ready)
    return true
  ready = init()
  return ready
}

/**
 * useIsSlideActive() rather than onSlideEnter/onSlideLeave. The hooks fire on
 * transitions, so the slide that is already on screen at load never gets an
 * enter, and pairing them with a mount-time play() raced against the leave that
 * Slidev fires while resolving the initial route - the loop was cancelled one
 * frame after it started, which looked exactly like a frozen simulation.
 * The reactive flag has no such edge: immediate:true settles the initial state
 * and every later change is just a transition of the same boolean.
 */
function sync() {
  if (isActive.value) {
    if (ensure()) {
      play()
      startFade()
    }
  }
  else {
    pause()
    resetFade()
  }
}

// watch(..., { immediate: true }) is wrong here: the immediate call runs during
// setup, before the template exists, so the canvas ref is still null and init()
// fails - and if the slide is active from the start the flag never changes, so
// the watcher never gets a second chance and the canvas stays blank forever.
// onMounted covers the initial state, the watcher covers every change after.
onMounted(sync)
watch(isActive, sync, { flush: 'post' })

watch([animates, () => props.palette, () => props.intensity, () => props.speed, () => props.vignette, () => props.centerAlpha, () => props.fadeIn], () => {
  pause()
  if (isActive.value && ready)
    play()
})

if (typeof document !== 'undefined')
  document.addEventListener('visibilitychange', onVisibility)

if (typeof window !== 'undefined')
  window.addEventListener('resize', resize)

onBeforeUnmount(() => {
  pause()
  window.removeEventListener('resize', resize)
  document.removeEventListener('visibilitychange', onVisibility)
})

</script>

<template>
  <canvas ref="host" class="shader-field" aria-hidden="true" />
</template>

<style scoped>
.shader-field {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  /* Rendered small on purpose - upscaling hard is what keeps the dither cells
     square instead of letting the browser smooth them away. */
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  pointer-events: none;
  /* Starts invisible; startFade() in the script owns every change from here.
     A divider that is never entered stays flat, which is also what print and
     the overview grid want. */
  opacity: 0;
}
</style>
