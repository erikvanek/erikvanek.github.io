<!--
  Ring timer: one countdown drawn as one or more rings, each splitting the same
  total time into equal parts. Shaped with Erik on 2026-11-23 (SDW-26 #22) in
  Paper ("SDW-26 VI odpočet - D"): a trio ring in thirds and a pair ring in
  halves side by side, the clock between them, so every group sees where it
  should switch presenters without a step stepper. A single ring with one part
  is a plain countdown (the 10-minute prep slide).

    <RingTimer :minutes="36" :rings="[{ parts: 3, label: 'Trojice' }, { parts: 2, label: 'Dvojice' }]" />
    <RingTimer :minutes="10" />

  Running it: landing on a fresh timer shows the full time, stopped. One
  clicker press or the play button starts it; the button then pauses and
  resumes. At zero one soft gong plays and the clock runs on into a muted
  overrun (+1:20), the rings fully grey.

  Under the play button: -1 and +1 take a minute off or add one (never below
  the time already spent), the circular arrow resets to full and stopped. The
  reset button is the only thing that resets it (Erik 26. 11.): leaving the
  slide, going back on the clicker and reloading the page all keep the clock.
  Coming back to a started timer, the clicker passes straight through to the
  next slide; a paused one resumes only from the play button.

  State lives in localStorage (slide and presenter windows only), keyed by
  slide number and minutes, and the windows follow each other's changes live,
  so pausing in the presenter view pauses the projector too. An entry older
  than the budget plus 30 minutes since its last change is ignored, so a
  rehearsal doesn't leak into the real run. The clock reuses ActivityTimer's tested logic
  (./activity-timer.ts); the ring geometry is ./ring-timer.ts.

  Like ActivityTimer it registers its own click, so don't mix it with v-click
  on the same slide.
-->
<script setup lang="ts">
import type { Clock } from './activity-timer'
import { onSlideEnter, onSlideLeave, useIsSlideActive, useSlideContext } from '@slidev/client'
import { computed, onUnmounted, ref, watch } from 'vue'
import { adjust, crossedZero, formatClock, freshClock, isRunning, pause, remaining, start } from './activity-timer'
import { playGong, primeAudio } from './gong'
import { elapsedShare, partRemaining, restoreClock, ringParts, ringTicks } from './ring-timer'

const props = withDefaults(
  defineProps<{
    minutes: number
    rings?: { parts: number, label?: string }[]
    gong?: boolean
    /** Ring diameter in slide pixels (the canvas is 980 wide). */
    size?: number
  }>(),
  { rings: () => [{ parts: 1 }], gong: true, size: 210 },
)

const THICK = 18
const C = props.size / 2
const R = C - THICK / 2
const CIRC = 2 * Math.PI * R

const { $clicksContext, $clicks, $page, $renderContext, $slidev } = useSlideContext()
const active = useIsSlideActive()

const CLICKS_ID = 'muni-ring-timer'
$clicksContext.register(CLICKS_ID, { delta: 1, max: 1 })
onUnmounted(() => $clicksContext.unregister(CLICKS_ID))

const clock = ref<Clock>(freshClock(props.minutes))
const now = ref(Date.now())
const left = computed(() => remaining(clock.value, now.value))
const running = computed(() => isRunning(clock.value))
const started = computed(() => hasStarted(clock.value) || $clicks.value >= 1)
const over = computed(() => left.value <= -1000)
const budget = computed(() => clock.value.budgetMs)
const total = computed(() => formatClock(budget.value))
const share = computed(() => elapsedShare(budget.value, left.value))

// Persistence. Only the real slide windows store the clock (not the overview
// or the presenter's next-slide preview), and only once the slide has been
// entered, so the mount-time clicks watch can't overwrite a saved clock
// before it is read back.
const persists = ['slide', 'presenter'].includes($renderContext.value)
const storeKey = `muni-ring-timer:${$page.value}:${props.minutes}`
let storageReady = false
let entered = false

function hasStarted(c: Clock) {
  return isRunning(c) || c.elapsedMs > 0
}
function sameClock(a: Clock | null, b: Clock) {
  return !!a && a.budgetMs === b.budgetMs && a.elapsedMs === b.elapsedMs && a.runningSince === b.runningSince
}
function load(): Clock | null {
  if (!persists)
    return null
  try {
    return restoreClock(localStorage.getItem(storeKey), Date.now())
  }
  catch {
    return null
  }
}
function save(c: Clock | null) {
  if (!persists || !storageReady)
    return
  try {
    if (!c)
      localStorage.removeItem(storeKey)
    // Skipping unchanged writes stops two windows echoing each other.
    else if (!sameClock(load(), c))
      localStorage.setItem(storeKey, JSON.stringify({ ...c, savedAt: Date.now() }))
  }
  catch {}
}
watch(clock, (c) => {
  if (hasStarted(c) || c.budgetMs !== props.minutes * 60_000)
    save(c)
})

// Another window (presenter or projector) changed this timer.
function onStorage(e: StorageEvent) {
  if (e.key !== storeKey)
    return
  now.value = Date.now()
  clock.value = restoreClock(e.newValue, now.value) ?? freshClock(props.minutes)
}
if (persists && typeof window !== 'undefined') {
  window.addEventListener('storage', onStorage)
  onUnmounted(() => window.removeEventListener('storage', onStorage))
}

function reset() {
  clock.value = freshClock(props.minutes)
  save(null)
}

// A clicker press on this slide starts a fresh timer and nothing else. Clicks
// that arrive with navigation (entering backwards) are ignored.
watch(() => $clicks.value, (c, prev) => {
  if (!entered || c < 1 || (prev ?? 0) >= 1 || hasStarted(clock.value))
    return
  now.value = Date.now()
  primeAudio()
  clock.value = start(clock.value, now.value)
})

onSlideEnter(() => {
  storageReady = true
  now.value = Date.now()
  const restored = load()
  if (restored)
    clock.value = restored
  const want = hasStarted(clock.value) ? 1 : 0
  if ($clicksContext.current !== want)
    $clicksContext.current = want
  entered = true
})
onSlideLeave(() => {
  entered = false
})

let tickHandle: ReturnType<typeof setInterval> | undefined
function tick() {
  const before = left.value
  now.value = Date.now()
  if (running.value && crossedZero(before, left.value) && props.gong && $renderContext.value === 'slide')
    playGong()
}
watch(active, (isActive) => {
  clearInterval(tickHandle)
  if (isActive)
    tickHandle = setInterval(tick, 200)
}, { immediate: true })
onUnmounted(() => clearInterval(tickHandle))

function onButton() {
  if (!started.value) {
    primeAudio()
    $slidev.nav.next()
    return
  }
  now.value = Date.now()
  clock.value = running.value ? pause(clock.value, now.value) : start(clock.value, now.value)
}

function onAdjust(minutes: number) {
  now.value = Date.now()
  clock.value = adjust(clock.value, minutes * 60_000, now.value)
}

function onReset() {
  reset()
  if ($clicksContext.current !== 0)
    $clicksContext.current = 0
}

/** stroke-dasharray/offset for an arc from a0 to a1 degrees on a circle that
 * is rotated so 0 sits at 12 o'clock. */
function arc(a0: number, a1: number) {
  const len = ((a1 - a0) / 360) * CIRC
  return { 'stroke-dasharray': `${len} ${CIRC}`, 'stroke-dashoffset': `${-(a0 / 360) * CIRC}` }
}
function tick2(a: number) {
  const t = ((a - 90) * Math.PI) / 180
  const r0 = R - THICK / 2 + 4
  const r1 = R + THICK / 2 - 4
  return { x1: C + r0 * Math.cos(t), y1: C + r0 * Math.sin(t), x2: C + r1 * Math.cos(t), y2: C + r1 * Math.sin(t) }
}

const drawn = computed(() => props.rings.map(r => ({
  label: r.label,
  time: formatClock(partRemaining(budget.value, left.value, r.parts)),
  parts: ringParts(r.parts, share.value),
  ticks: ringTicks(r.parts).map(tick2),
})))
</script>

<template>
  <div class="ring-timer" :class="{ running, over, idle: !started, single: drawn.length === 1 }">
    <template v-for="(ring, i) in drawn" :key="i">
      <div v-if="i === 1" class="ring-timer__clock">
        <button class="ring-timer__btn" :title="running ? 'Pozastavit' : 'Spustit'" @mousedown.prevent @click="onButton">
          <svg v-if="running" viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="2" width="3.5" height="12" rx="1" /><rect x="9.5" y="2" width="3.5" height="12" rx="1" /></svg>
          <svg v-else viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11a1 1 0 0 0 1.5.86l9-5.5a1 1 0 0 0 0-1.72l-9-5.5A1 1 0 0 0 4 2.5Z" /></svg>
        </button>
        <div class="ring-timer__small">
          <button class="ring-timer__btn ring-timer__btn--small" title="O minutu méně" @mousedown.prevent @click="onAdjust(-1)">−1</button>
          <button class="ring-timer__btn ring-timer__btn--small" title="Od začátku" @mousedown.prevent @click="onReset">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.5a5.5 5.5 0 1 1-5.2 3.7.75.75 0 1 1 1.4.5A4 4 0 1 0 8 4h-.6l1.1 1.1a.75.75 0 0 1-1.06 1.06L5.06 3.78a.75.75 0 0 1 0-1.06L7.44.34A.75.75 0 0 1 8.5 1.4L7.4 2.5H8Z" /></svg>
          </button>
          <button class="ring-timer__btn ring-timer__btn--small" title="O minutu víc" @mousedown.prevent @click="onAdjust(1)">+1</button>
        </div>
        <div class="ring-timer__total">{{ total }}</div>
      </div>
      <figure class="ring-timer__ring">
        <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" aria-hidden="true">
          <g :transform="`rotate(-90 ${C} ${C})`" fill="none" :stroke-width="THICK">
            <template v-for="(p, j) in ring.parts" :key="j">
              <circle :cx="C" :cy="C" :r="R" class="track" v-bind="arc(p.start, p.end)" />
              <circle v-if="p.remainingFrom !== null" :cx="C" :cy="C" :r="R" class="fill" v-bind="arc(p.remainingFrom, p.end)" />
            </template>
          </g>
          <line v-for="(t, k) in ring.ticks" :key="k" v-bind="t" class="mark" />
        </svg>
        <span class="ring-timer__time ring-timer__inside" :style="{ top: `${C}px` }">{{ ring.time }}</span>
        <figcaption v-if="ring.label">{{ ring.label }}</figcaption>
      </figure>
    </template>
    <div v-if="drawn.length === 1" class="ring-timer__clock">
      <button class="ring-timer__btn" :title="running ? 'Pozastavit' : 'Spustit'" @mousedown.prevent @click="onButton">
        <svg v-if="running" viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="2" width="3.5" height="12" rx="1" /><rect x="9.5" y="2" width="3.5" height="12" rx="1" /></svg>
        <svg v-else viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11a1 1 0 0 0 1.5.86l9-5.5a1 1 0 0 0 0-1.72l-9-5.5A1 1 0 0 0 4 2.5Z" /></svg>
      </button>
      <div class="ring-timer__small">
        <button class="ring-timer__btn ring-timer__btn--small" title="O minutu méně" @mousedown.prevent @click="onAdjust(-1)">−1</button>
        <button class="ring-timer__btn ring-timer__btn--small" title="Od začátku" @mousedown.prevent @click="onReset">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.5a5.5 5.5 0 1 1-5.2 3.7.75.75 0 1 1 1.4.5A4 4 0 1 0 8 4h-.6l1.1 1.1a.75.75 0 0 1-1.06 1.06L5.06 3.78a.75.75 0 0 1 0-1.06L7.44.34A.75.75 0 0 1 8.5 1.4L7.4 2.5H8Z" /></svg>
        </button>
        <button class="ring-timer__btn ring-timer__btn--small" title="O minutu víc" @mousedown.prevent @click="onAdjust(1)">+1</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ring-timer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
}
.ring-timer__ring {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
}
.ring-timer__ring figcaption {
  font-family: 'Muni', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 22px;
  text-transform: uppercase;
  letter-spacing: 0.01em;
  color: var(--muni-black);
}
/* One ring: the clock sits inside it and the button below, so it fits a column. */
.single { flex-direction: column; gap: 1rem; }
.ring-timer__ring { position: relative; }
.single .ring-timer__clock { padding-bottom: 0; }
.ring-timer__time.ring-timer__inside { position: absolute; left: 50%; transform: translate(-50%, -50%); font-size: 46px; letter-spacing: -0.06em; white-space: nowrap; }
.track { stroke: #e8e8e8; }
.fill { stroke: #3b5bf0; }
.mark { stroke: #a9b8f8; stroke-width: 2; }
.ring-timer__clock {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  /* sit level with the ring centres, not with ring plus caption */
  padding-bottom: 2.2rem;
}
.ring-timer__time {
  font-family: 'Muni', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 64px;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  color: var(--muni-black);
}
.idle .ring-timer__time,
.over .ring-timer__time { color: var(--muni-gray); }
.ring-timer__btn {
  display: grid;
  place-items: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  border: 1.5px solid #3b5bf0;
  background: #fff;
  color: #3b5bf0;
  cursor: pointer;
}
.ring-timer__btn svg { width: 0.9rem; height: 0.9rem; fill: currentColor; }
.ring-timer__small { display: flex; gap: 0.4rem; }
/* Total set time under the two-ring controls, as faint as the small buttons.
   Absolute, so the play button stays level with the ring centres. */
.ring-timer__clock { position: relative; }
.ring-timer__total {
  position: absolute;
  top: calc(100% - 2.2rem + 0.5rem);
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-family: 'Muni', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1.125rem;
  font-variant-numeric: tabular-nums;
  color: var(--muni-gray);
  opacity: 0.25;
}
.ring-timer__btn--small {
  width: 1.9rem;
  height: 1.9rem;
  font-family: 'Muni', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.ring-timer__btn--small svg { width: 0.8rem; height: 0.8rem; }
/* As faint as the grey pause button on a running clock: for the presenter, not the room. */
.ring-timer__small .ring-timer__btn--small,
.running .ring-timer__small .ring-timer__btn--small {
  opacity: 0.25;
  border-color: var(--muni-gray);
  color: var(--muni-gray);
  transition: opacity 0.15s;
}
.ring-timer__small .ring-timer__btn--small:hover,
.running .ring-timer__small .ring-timer__btn--small:hover { opacity: 1; color: #3b5bf0; }
/* Once running, the buttons step back so the projected slide stays clean. */
.running .ring-timer__btn { opacity: 0.25; border-color: var(--muni-gray); color: var(--muni-gray); }
.running .ring-timer__btn:hover { opacity: 1; }
</style>
