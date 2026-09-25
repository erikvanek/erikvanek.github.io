<!--
  Activity timer: one card on an activity slide that shows the current step's
  instruction and its own clock, with a dot stepper for the shape of the whole
  activity. Built for SDW-26 (backlog item 032), shaped with Erik from his own
  sketch on 2026-09-24.

  How it runs - all of it on the clicker, because that is the hardware in the room:
  - Landing on the slide shows step 1 with its clock stopped at full.
  - Every step takes two presses: one shows it, the next starts its clock.
    Erik gives instructions step by step, so no step ever starts on its own.
  - A press while a step runs ends it wherever its clock is and shows the next one.
  - Back on a running step resets it to full and stops it; back on a waiting
    step goes to the previous step, also waiting at full.
  - At zero one soft gong plays (./gong.ts) and the clock runs on into a muted
    overrun (+1:20). It never advances by itself.
  - Leaving the slide and coming back resets it to step 1, stopped at full.

  The mouse is only for adjustments, to the right of the clock: play/pause,
  -1 min, +1 min, and clicking the numbers to type a new time. The play button is
  always visible while a step is waiting; everything else appears only while
  the pointer is over the clock, so the projected card stays clean.

  The click registration below assumes the timer is the only thing on its slide
  that consumes clicks - don't mix it with v-click on the same slide.

  Clock state is local to each browser window. In the presenter view the two
  windows follow the same clicks, but a pause or +1 min pressed in one does not
  reach the other. The gong only ever plays from the audience window, so it
  never sounds twice.

  All timing rules live in ./activity-timer.ts, unit tested in
  activity-timer.test.ts - this file is the render and the wiring.
-->
<script setup lang="ts">
import type { Clock } from './activity-timer'
import { onSlideEnter, onSlideLeave, useIsSlideActive, useSlideContext } from '@slidev/client'
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import {
  adjust,
  clicksFor,
  crossedZero,
  formatClock,
  freshClock,
  isRunning,
  parseTimeInput,
  pause,
  phaseAt,
  remaining,
  setRemaining,
  start,
} from './activity-timer'
import { playGong, primeAudio } from './gong'

const props = withDefaults(
  defineProps<{
    /** Minutes per step, already parsed - see parseDurations(). */
    durations: number[]
    /** false turns the gong off for this slide. */
    gong?: boolean
    /** Word before the step number on the card. */
    stepLabel?: string
  }>(),
  { gong: true, stepLabel: 'Krok' },
)

const { $clicksContext, $clicks, $renderContext, $slidev } = useSlideContext()
const active = useIsSlideActive()
const count = computed(() => props.durations.length)

// Tell Slidev how many clicks this slide has, the same way v-click does.
const CLICKS_ID = 'muni-activity-timer'
$clicksContext.register(CLICKS_ID, { delta: clicksFor(count.value), max: clicksFor(count.value) })
onUnmounted(() => $clicksContext.unregister(CLICKS_ID))

const phase = computed(() => phaseAt($clicks.value, count.value))
const clocks = ref<Clock[]>(props.durations.map(freshClock))
const now = ref(Date.now())
const gongs = ref(0)

const clock = computed(() => clocks.value[phase.value.step])
const left = computed(() => remaining(clock.value, now.value))
const running = computed(() => isRunning(clock.value))
const waiting = computed(() => !phase.value.started)
const over = computed(() => left.value <= -1000)
const paused = computed(() => phase.value.started && !running.value)

function resetFrom(step: number) {
  clocks.value = clocks.value.map((c, i) => (i >= step ? freshClock(props.durations[i]) : c))
}

function setClock(c: Clock) {
  const next = clocks.value.slice()
  next[phase.value.step] = c
  clocks.value = next
}

// The click count is the source of truth for where the activity is; the
// clocks follow it. Showing a step resets it and everything after it;
// starting it sets its clock running.
watch(() => $clicks.value, (c, old) => {
  // Back from a waiting step lands on the previous step waiting at full, not
  // on it running: skip the "started" click on the way down.
  if (old !== undefined && c === old - 1 && c % 2 === 1) {
    $clicksContext.current = c - 1
    return
  }
  const p = phaseAt(c, count.value)
  const prev = old === undefined ? undefined : phaseAt(old, count.value)
  now.value = Date.now()
  if (!p.started) {
    resetFrom(p.step)
    return
  }
  if (!prev || prev.step !== p.step || !prev.started) {
    primeAudio()
    setClock(start(clocks.value[p.step], now.value))
  }
}, { immediate: true })

onSlideEnter(() => {
  resetFrom(0)
  if ($clicksContext.current !== 0)
    $clicksContext.current = 0
})
onSlideLeave(() => resetFrom(0))

let tickHandle: ReturnType<typeof setInterval> | undefined
function tick() {
  const before = left.value
  now.value = Date.now()
  if (running.value && crossedZero(before, left.value)) {
    gongs.value++
    if (props.gong && $renderContext.value === 'slide')
      playGong()
  }
}
watch(active, (isActive) => {
  clearInterval(tickHandle)
  if (isActive)
    tickHandle = setInterval(tick, 200)
}, { immediate: true })
onUnmounted(() => clearInterval(tickHandle))

function onPlayPause() {
  if (waiting.value) {
    // Starting from the button is the same move as a clicker press.
    primeAudio()
    $slidev.nav.next()
    return
  }
  now.value = Date.now()
  setClock(running.value ? pause(clock.value, now.value) : start(clock.value, now.value))
}

function onAdjust(minutes: number) {
  now.value = Date.now()
  setClock(adjust(clock.value, minutes * 60_000, now.value))
}

const editing = ref(false)
const draft = ref('')
const input = ref<HTMLInputElement>()
async function beginEdit() {
  draft.value = formatClock(Math.max(0, left.value))
  editing.value = true
  await nextTick()
  input.value?.focus()
  input.value?.select()
}
function commitEdit() {
  if (!editing.value)
    return
  const ms = parseTimeInput(draft.value)
  editing.value = false
  if (ms != null) {
    now.value = Date.now()
    setClock(setRemaining(clock.value, ms, now.value))
  }
}
function cancelEdit() {
  editing.value = false
}
</script>

<template>
  <div
    class="activity-timer"
    :class="{ waiting, running, paused, over }"
    :data-step="phase.step + 1"
    :data-started="phase.started"
    :data-gongs="gongs"
  >
    <div class="activity-timer__body">
      <div v-if="count > 1" class="activity-timer__label">
        {{ stepLabel }} {{ phase.step + 1 }}/{{ count }}
      </div>
      <div :key="phase.step" class="activity-timer__step">
        <slot :name="`step-${phase.step + 1}`" />
      </div>
    </div>

    <div class="activity-timer__foot">
      <ol v-if="count > 1" class="activity-timer__dots" aria-label="Kroky aktivity">
        <li
          v-for="(minutes, i) in durations"
          :key="i"
          :class="i < phase.step ? 'done' : i === phase.step ? 'current' : 'upcoming'"
          :title="`${stepLabel} ${i + 1}: ${minutes} min`"
        />
      </ol>

      <div class="activity-timer__clock">
        <input
          v-if="editing"
          ref="input"
          v-model="draft"
          class="activity-timer__time activity-timer__input"
          inputmode="numeric"
          aria-label="Zbývající čas"
          @keydown.stop
          @keydown.enter.prevent="commitEdit"
          @keydown.esc.prevent="cancelEdit"
          @blur="commitEdit"
        >
        <button
          v-else
          class="activity-timer__time"
          title="Kliknutím přepíšete zbývající čas"
          @mousedown.prevent
          @click="beginEdit"
        >
          {{ formatClock(left) }}
        </button>

        <div class="activity-timer__controls">
          <button
            class="activity-timer__play"
            :title="running ? 'Pozastavit' : 'Spustit'"
            @mousedown.prevent
            @click="onPlayPause"
          >
            <svg v-if="running" viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="2" width="3.5" height="12" rx="1" /><rect x="9.5" y="2" width="3.5" height="12" rx="1" /></svg>
            <svg v-else viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11a1 1 0 0 0 1.5.86l9-5.5a1 1 0 0 0 0-1.72l-9-5.5A1 1 0 0 0 4 2.5Z" /></svg>
          </button>
          <button title="-1 min" @mousedown.prevent @click="onAdjust(-1)">−</button>
          <button title="+1 min" @mousedown.prevent @click="onAdjust(1)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activity-timer {
  display: flex;
  flex-direction: column;
  min-height: 15rem;
  border: 2px solid var(--muni-arts-blue);
  border-radius: 6px;
  background: #fff;
  padding: 1.1rem 1.5rem 0.9rem;
}

.activity-timer__body {
  flex: 1;
}

.activity-timer__label {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muni-gray);
  margin-bottom: 0.4em;
}

.activity-timer__step {
  font-size: 1.35rem;
  line-height: 1.4;
}
.activity-timer__step :deep(p) {
  margin: 0 0 0.4em;
}
.activity-timer__step :deep(ul) {
  margin-top: 0.2em;
}

/* A new step fades in as its element is recreated (keyed on the step). A
   plain CSS animation rather than a <Transition mode="out-in">, which waits
   on transitionend before swapping and left the old step on the card when
   that event never came (seen under headless Chrome) - not a risk to take
   in front of a room. */
.activity-timer__step {
  animation: activity-step-in 200ms ease both;
}
@keyframes activity-step-in {
  from { opacity: 0; transform: translateX(12px); }
  to { opacity: 1; transform: none; }
}

.activity-timer__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.8rem;
}

/* The stepper: a finished step shrinks into its filled dot, the current one
   is the largest mark, the ones still to come are hollow rings, so the room
   sees how many parts there are before it knows what they are. */
.activity-timer__dots {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.activity-timer__dots li {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  border: 2px solid var(--muni-arts-blue);
  margin: 0;
  transition: all 200ms ease;
}
.activity-timer__dots li.done {
  background: var(--muni-arts-blue);
  opacity: 0.55;
}
.activity-timer__dots li.current {
  width: 1.1rem;
  height: 1.1rem;
  background: var(--muni-arts-blue);
}

.activity-timer__clock {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-left: auto;
}

.activity-timer__time {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  color: var(--muni-black);
  background: none;
  border: 0;
  padding: 0.1em 0.15em;
  border-radius: 4px;
  cursor: text;
  min-width: 4.2ch;
  text-align: right;
}
.activity-timer__input {
  width: 4.6ch;
  outline: 2px solid var(--muni-arts-blue);
}
/* Waiting to be started, or paused: the clock reads as set, not live. */
.waiting .activity-timer__time,
.paused .activity-timer__time {
  color: var(--muni-gray);
}
/* The soft overrun: quieter than the countdown, never red, never flashing. */
.over .activity-timer__time {
  color: var(--muni-gray);
  font-weight: 400;
}

.activity-timer__controls {
  display: flex;
  gap: 0.3rem;
}
.activity-timer__controls button {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1.5px solid var(--muni-gray);
  background: #fff;
  color: var(--muni-gray);
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0;
  transition: opacity 150ms ease;
}
.activity-timer__controls svg {
  width: 0.8rem;
  height: 0.8rem;
  fill: currentColor;
}
/* Controls stay out of the room's sight until the pointer is over the clock -
   except the play button while a step is waiting, so the card reads as
   "ready, not yet running". */
.activity-timer__clock:hover .activity-timer__controls button,
.activity-timer__clock:focus-within .activity-timer__controls button,
.waiting .activity-timer__controls .activity-timer__play {
  opacity: 1;
}
.waiting .activity-timer__play {
  border-color: var(--muni-arts-blue);
  color: var(--muni-arts-blue);
}
</style>
