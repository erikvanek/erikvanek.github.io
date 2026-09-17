<!--
  Slow decay on a divider's type: after the slide has been up for a while the
  headline starts to crumble at the edges and open transparent patches, through
  which the Game of Life field behind it shows.

  **Why an SVG filter and not a canvas.** The obvious way to erode text is to
  redraw it into a canvas and dissolve the pixels, but that means reimplementing
  the typography - the Muni face, the word-spacing correction, the markdown, the
  wrapping - and keeping it in sync with the layout forever. An SVG filter runs
  on the real DOM text, so the type stays type: selectable, styleable, correct at
  any size, and identical to an undecayed slide when the effect is off.

  **How it decays.** Two turbulence fields doing different jobs:
    1. a low-frequency fractal noise drives feDisplacementMap over the glyphs,
       which pushes their edges around and reads as crumbling;
    2. a second field is flattened to alpha and pushed through a linear transfer
       whose slope and intercept ramp over time, then composited with `in`, so
       that progressively more of the darkest areas fall below zero alpha and
       become holes. The holes are what let the background through.

  Both are capped well short of illegible. This runs on slides students read
  from the back of a room, so the endpoint is "weathered", not "destroyed".

  **Timing.** Nothing happens for `delay` seconds after the slide lands, so a
  divider you pass straight through is never touched and only a slide you
  actually dwell on starts to go. Then it ramps over `duration` seconds and
  stops. The clock resets every time the slide is left.

  **Reduced motion.** Honoured through the same `motion` prop the shader uses,
  so one headmatter key governs both: under prefers-reduced-motion, with no
  override, the text simply never decays.

  **Degradation is free.** If filters are unavailable the text renders normally;
  there is no state to unwind.
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useIsSlideActive } from '@slidev/client'

const props = withDefaults(
  defineProps<{
    /** Seconds on screen before anything starts happening. */
    delay?: number
    /** Seconds from the first sign of decay to the full extent. */
    duration?: number
    /**
     * Overall strength, 0 to 1. 0 disables it entirely. The default stops well
     * short of the top: at 1 the headline is genuinely hard to read from the
     * back of a room, and these are teaching slides before they are an effect.
     */
    amount?: number
    /** Stable per-slide variation. */
    seed?: number
    /** Matches the shader: auto | always | off. */
    motion?: 'auto' | 'always' | 'off'
  }>(),
  { delay: 30, duration: 60, amount: 0.55, seed: 1, motion: 'auto' },
)

// Filters are referenced by id, and nine dividers mount at once, so a fixed id
// would have every slide pointing at the last one rendered.
const uid = Math.random().toString(36).slice(2, 9)
const filterId = computed(() => `rust-${uid}`)

const isActive = useIsSlideActive()
const prefersReduced = ref(
  typeof window !== 'undefined'
  && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
)
if (typeof window !== 'undefined' && window.matchMedia) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener?.('change', e => { prefersReduced.value = e.matches })
}

const enabled = computed(() => {
  if (props.motion === 'off' || props.amount <= 0)
    return false
  if (props.motion === 'always')
    return true
  return !prefersReduced.value
})

/** 0 to 1: how far through the decay we are. */
const t = ref(0)

const eased = computed(() => {
  const x = Math.min(1, Math.max(0, t.value))
  // Smoothstep, so it creeps in and settles rather than arriving on a ramp.
  return x * x * (3 - 2 * x)
})

const k = computed(() => eased.value * Math.min(1, Math.max(0, props.amount)))

// Edges: displacement grows from nothing to a few pixels.
const edgeScale = computed(() => (k.value * 5.5).toFixed(2))
// A slow drift of the noise itself, so the crumbling keeps moving once it has
// arrived instead of freezing into one texture.
const drift = ref(0)
const edgeFreq = computed(() => (0.022 + 0.004 * Math.sin(drift.value * 0.05)).toFixed(4))

// Holes: alpha = slope * luminance + intercept, clamped. At rest slope 0 and
// intercept 1 means every pixel is fully opaque, so the text is untouched.
const slope = computed(() => (k.value * 2.0).toFixed(3))
const intercept = computed(() => (1 - k.value * 1.45).toFixed(3))
const patchFreq = computed(() => (0.035 + 0.006 * Math.cos(drift.value * 0.037)).toFixed(4))

let raf = 0
let enteredAt = 0
let lastTick = 0

function frame(now: number) {
  if (!enteredAt)
    enteredAt = now
  // 8 fps is plenty for something this slow, and it keeps the filter from
  // being re-evaluated 60 times a second on the compositor.
  if (now - lastTick > 125) {
    lastTick = now
    const elapsed = (now - enteredAt) / 1000
    const since = elapsed - props.delay
    t.value = since <= 0 ? 0 : Math.min(1, since / Math.max(0.001, props.duration))
    drift.value = elapsed
  }
  raf = requestAnimationFrame(frame)
}

function start() {
  if (raf || !enabled.value)
    return
  enteredAt = 0
  lastTick = 0
  t.value = 0
  raf = requestAnimationFrame(frame)
}

function stop() {
  if (raf) {
    cancelAnimationFrame(raf)
    raf = 0
  }
  t.value = 0
  drift.value = 0
}

watch(isActive, (on) => { on ? start() : stop() }, { immediate: true })
watch(enabled, (on) => { if (!on) stop(); else if (isActive.value) start() })
onBeforeUnmount(stop)
</script>

<template>
  <div class="rusty" :style="enabled && k > 0 ? { filter: `url(#${filterId})` } : undefined">
    <svg v-if="enabled" class="rust-defs" aria-hidden="true" focusable="false">
      <filter
        :id="filterId"
        x="-15%" y="-15%" width="130%" height="130%"
        color-interpolation-filters="sRGB"
      >
        <feTurbulence
          type="fractalNoise" :baseFrequency="edgeFreq" numOctaves="2"
          :seed="seed" result="edgeNoise"
        />
        <feDisplacementMap
          in="SourceGraphic" in2="edgeNoise" :scale="edgeScale"
          xChannelSelector="R" yChannelSelector="G" result="crumbled"
        />
        <feTurbulence
          type="fractalNoise" :baseFrequency="patchFreq" numOctaves="3"
          :seed="seed + 4" result="patch"
        />
        <feColorMatrix in="patch" type="luminanceToAlpha" result="patchA" />
        <feComponentTransfer in="patchA" result="patchMask">
          <feFuncA type="linear" :slope="slope" :intercept="intercept" />
        </feComponentTransfer>
        <feComposite in="crumbled" in2="patchMask" operator="in" />
      </filter>
    </svg>
    <slot />
  </div>
</template>

<style scoped>
.rusty {
  position: relative;
}

/* The filter definition needs to be in the document but must never take space
   or paint anything of its own. */
.rust-defs {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
}
</style>
