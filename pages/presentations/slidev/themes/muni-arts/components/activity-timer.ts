// Pure logic for ActivityTimer.vue, pulled out of the SFC so it can be unit
// tested without mounting a Vue/Slidev runtime - the same split as
// course-progress.ts. See activity-timer.test.ts for the behavior spec, and
// SDW-26 backlog item 032 for where each rule came from.

export const MAX_STEPS = 4

/** Reads the slide's `timer` frontmatter: `timer: 12` is one step of 12
 * minutes, `timer: [2, 8, 10]` is three steps. Anything unusable gives [],
 * which the component treats as "no timer here". Capped at four steps. */
export function parseDurations(raw: unknown): number[] {
  const list = Array.isArray(raw) ? raw : raw == null ? [] : [raw]
  const minutes = list.map(Number)
  if (!minutes.length || minutes.some(m => !Number.isFinite(m) || m <= 0))
    return []
  return minutes.slice(0, MAX_STEPS)
}

/** Every step takes two clicks: one to show it (clock stopped at full), one to
 * start it. So a slide with n steps needs 2n - 1 clicks after landing, since
 * landing on the slide is already "show step 1". */
export function clicksFor(stepCount: number): number {
  return stepCount > 0 ? stepCount * 2 - 1 : 0
}

export interface Phase {
  /** Zero-based index of the step on the card. */
  step: number
  /** false = shown and waiting for Erik, true = its clock has been started. */
  started: boolean
}

/** Maps Slidev's click count to where the activity is: 0 = show step 1,
 * 1 = start step 1, 2 = show step 2, 3 = start step 2, and so on. */
export function phaseAt(clicks: number, stepCount: number): Phase {
  const c = Math.min(Math.max(0, Math.floor(clicks)), clicksFor(stepCount))
  return { step: Math.floor(c / 2), started: c % 2 === 1 }
}

/** One step's clock. `budgetMs` is the step's length including any +/- or
 * typed-in change; `elapsedMs` is time run before the last pause;
 * `runningSince` is the timestamp it was (re)started at, or null while stopped. */
export interface Clock {
  budgetMs: number
  elapsedMs: number
  runningSince: number | null
}

export function freshClock(minutes: number): Clock {
  return { budgetMs: minutes * 60_000, elapsedMs: 0, runningSince: null }
}

export function elapsed(clock: Clock, now: number): number {
  return clock.elapsedMs + (clock.runningSince == null ? 0 : now - clock.runningSince)
}

/** Positive while the step has time left, negative once it has run over. */
export function remaining(clock: Clock, now: number): number {
  return clock.budgetMs - elapsed(clock, now)
}

export function isRunning(clock: Clock): boolean {
  return clock.runningSince != null
}

export function start(clock: Clock, now: number): Clock {
  return isRunning(clock) ? clock : { ...clock, runningSince: now }
}

export function pause(clock: Clock, now: number): Clock {
  return isRunning(clock) ? { ...clock, elapsedMs: elapsed(clock, now), runningSince: null } : clock
}

/** +/- one minute, allowed while running. The budget never drops below what
 * has already run, so a minus press on an overrunning step lands on 0:00
 * rather than pushing the overrun further out. */
export function adjust(clock: Clock, deltaMs: number, now: number): Clock {
  const floor = elapsed(clock, now)
  return { ...clock, budgetMs: Math.max(floor, clock.budgetMs + deltaMs) }
}

/** Typing a new time into the clock sets what is LEFT, not the total. */
export function setRemaining(clock: Clock, remainingMs: number, now: number): Clock {
  return { ...clock, budgetMs: elapsed(clock, now) + Math.max(0, remainingMs) }
}

/** True exactly once per step: on the tick where the clock goes from time
 * left to none. This is the moment the gong plays. */
export function crossedZero(before: number, after: number): boolean {
  return before > 0 && after <= 0
}

/** `2:00`, `0:07`, `12:30` while time is left; `+1:20` once over. Seconds
 * round up while counting down, so the clock reads 2:00 for the whole first
 * second rather than jumping to 1:59 immediately, and hits 0:00 exactly at
 * zero. The overrun counts whole seconds past zero. */
export function formatClock(ms: number): string {
  const over = ms <= -1000
  const totalSec = over ? Math.floor(-ms / 1000) : Math.max(0, Math.ceil(ms / 1000))
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${over ? '+' : ''}${m}:${String(s).padStart(2, '0')}`
}

/** Parses what Erik types into the clock: `5` is five minutes, `5:30` and
 * `0:45` are minutes and seconds. Returns null for anything else, so a typo
 * leaves the clock as it was. */
export function parseTimeInput(text: string): number | null {
  const t = text.trim()
  const m = /^(\d{1,3})(?::(\d{1,2}))?$/.exec(t)
  if (!m)
    return null
  const sec = m[2] == null ? 0 : Number(m[2])
  if (sec > 59)
    return null
  return (Number(m[1]) * 60 + sec) * 1000
}
