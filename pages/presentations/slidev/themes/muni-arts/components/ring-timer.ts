// Pure geometry for RingTimer.vue, unit tested in ring-timer.test.ts. The clock
// itself (start, pause, remaining, formatting) is shared with ActivityTimer via
// ./activity-timer.ts. Shaped with Erik on 2026-11-23 (SDW-26 #22): one
// countdown, drawn as rings that each split the same total into equal parts,
// so the room sees at a glance where a trio (thirds) or a pair (halves) should
// switch presenters.

/** Degrees of empty space between two parts of one ring. */
export const GAP_DEG = 4.5

export interface Part {
  /** Where the part starts and ends, in degrees clockwise from 12 o'clock. */
  start: number
  end: number
  /** Where the still-remaining (coloured) stretch of this part begins, or
   * null once the part is fully used up. */
  remainingFrom: number | null
}

/** Splits a ring into `parts` equal parts and works out how much of each is
 * still to go. `elapsed` is the share of the whole time already run, 0 to 1.
 * A single part has no gap, so a one-part ring is a closed circle. */
export function ringParts(parts: number, elapsed: number): Part[] {
  const n = Math.max(1, Math.floor(parts))
  const seg = 360 / n
  const gap = n > 1 ? GAP_DEG : 0
  const cut = Math.min(1, Math.max(0, elapsed)) * 360
  return Array.from({ length: n }, (_, i) => {
    const start = i * seg + gap / 2
    const end = (i + 1) * seg - gap / 2
    const from = Math.max(start, cut)
    return { start, end, remainingFrom: from < end ? from : null }
  })
}

/** Watch-style marks splitting each part into thirds. A ring of one part
 * gets none (Erik, 23 Nov: a plain 10-minute ring needs no division). */
export function ringTicks(parts: number): number[] {
  const n = Math.max(1, Math.floor(parts))
  if (n === 1)
    return []
  const seg = 360 / n
  return Array.from({ length: n }, (_, i) => [1, 2].map(k => i * seg + (k * seg) / 3)).flat()
}

/** Share of the whole time already run, clamped to 0..1. */
export function elapsedShare(totalMs: number, remainingMs: number): number {
  if (totalMs <= 0)
    return 1
  return Math.min(1, Math.max(0, (totalMs - remainingMs) / totalMs))
}

/** Time left in the part that is running now, so each ring can show its own
 * countdown (Erik, 23 Nov: 12:00 in the trio ring, 18:00 in the pair ring).
 * At a boundary the next part shows full. At zero and in overrun it returns
 * the overall remaining time unchanged, so the overrun reads the same in
 * every ring. */
export function partRemaining(totalMs: number, remainingMs: number, parts: number): number {
  const n = Math.max(1, Math.floor(parts))
  if (remainingMs <= 0 || n === 1)
    return remainingMs
  const partMs = totalMs / n
  return remainingMs - Math.floor((remainingMs - 1) / partMs) * partMs
}

/** Reads a clock saved by RingTimer back from storage. Returns null for
 * anything missing, malformed, or saved longer ago than the budget plus
 * `graceMs` (a leftover from a rehearsal, not this run). */
export function restoreClock(raw: string | null, now: number, graceMs = 30 * 60_000): { budgetMs: number, elapsedMs: number, runningSince: number | null } | null {
  if (!raw)
    return null
  let v: any
  try {
    v = JSON.parse(raw)
  }
  catch {
    return null
  }
  const num = (x: unknown) => typeof x === 'number' && Number.isFinite(x)
  if (!v || !num(v.budgetMs) || !num(v.elapsedMs) || !num(v.savedAt))
    return null
  if (v.runningSince !== null && !num(v.runningSince))
    return null
  if (now - v.savedAt > v.budgetMs + graceMs)
    return null
  return { budgetMs: v.budgetMs, elapsedMs: v.elapsedMs, runningSince: v.runningSince }
}
