// Behavior spec for ActivityTimer.vue, worked out with Erik on 2026-09-24
// (SDW-26 backlog item 032). The rules that shape it: Erik starts every step
// himself because he gives instructions step by step, back rewinds and
// pauses, a step never ends on its own, and at zero the clock runs into a
// soft overrun instead of stopping.
import { describe, expect, it } from 'vitest'
import {
  adjust,
  clicksFor,
  crossedZero,
  formatClock,
  freshClock,
  isRunning,
  parseDurations,
  parseTimeInput,
  pause,
  phaseAt,
  remaining,
  setRemaining,
  start,
} from './activity-timer'

const MIN = 60_000

describe('parseDurations', () => {
  it('reads a single number as one step', () => {
    expect(parseDurations(12)).toEqual([12])
  })
  it('reads a list as one step per entry', () => {
    expect(parseDurations([2, 8, 10])).toEqual([2, 8, 10])
  })
  it('caps at four steps, since nothing in either run of the course needs more', () => {
    expect(parseDurations([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4])
  })
  it('gives no timer for missing or broken values rather than a half-working one', () => {
    expect(parseDurations(undefined)).toEqual([])
    expect(parseDurations([])).toEqual([])
    expect(parseDurations([2, 'x'])).toEqual([])
    expect(parseDurations(0)).toEqual([])
  })
})

describe('the click sequence', () => {
  it('needs two clicks per step, minus the landing', () => {
    expect(clicksFor(1)).toBe(1)
    expect(clicksFor(3)).toBe(5)
    expect(clicksFor(0)).toBe(0)
  })

  it('lands on step 1, shown and not started', () => {
    expect(phaseAt(0, 3)).toEqual({ step: 0, started: false })
  })

  it('walks show 1, start 1, show 2, start 2 - no step ever starts on its own', () => {
    expect([0, 1, 2, 3, 4, 5].map(c => phaseAt(c, 3))).toEqual([
      { step: 0, started: false },
      { step: 0, started: true },
      { step: 1, started: false },
      { step: 1, started: true },
      { step: 2, started: false },
      { step: 2, started: true },
    ])
  })

  it('treats a single-step slide as show then start', () => {
    expect(phaseAt(0, 1)).toEqual({ step: 0, started: false })
    expect(phaseAt(1, 1)).toEqual({ step: 0, started: true })
  })

  it('clamps out-of-range clicks instead of inventing a fifth step', () => {
    expect(phaseAt(99, 2)).toEqual({ step: 1, started: true })
    expect(phaseAt(-3, 2)).toEqual({ step: 0, started: false })
  })
})

describe('a step clock', () => {
  it('starts at the full budget and does not move until started', () => {
    const c = freshClock(2)
    expect(remaining(c, 50_000)).toBe(2 * MIN)
    expect(isRunning(c)).toBe(false)
  })

  it('counts down once started', () => {
    const c = start(freshClock(2), 1000)
    expect(remaining(c, 1000 + 30_000)).toBe(90_000)
  })

  it('pauses and resumes without losing time', () => {
    let c = start(freshClock(2), 0)
    c = pause(c, 30_000)
    expect(remaining(c, 500_000)).toBe(90_000)
    c = start(c, 500_000)
    expect(remaining(c, 510_000)).toBe(80_000)
  })

  it('runs past zero into a negative overrun instead of stopping', () => {
    const c = start(freshClock(1), 0)
    expect(remaining(c, 80_000)).toBe(-20_000)
  })

  it('takes +1 min while running', () => {
    const c = adjust(start(freshClock(2), 0), MIN, 30_000)
    expect(remaining(c, 30_000)).toBe(150_000)
  })

  it('never lets -1 min push the budget below what has already run', () => {
    const c = adjust(start(freshClock(1), 0), -MIN, 70_000)
    expect(remaining(c, 70_000)).toBe(0)
  })

  it('treats a typed-in time as what is left, not as a new total', () => {
    const c = setRemaining(start(freshClock(10), 0), 3 * MIN, 4 * MIN)
    expect(remaining(c, 4 * MIN)).toBe(3 * MIN)
  })
})

describe('the gong', () => {
  it('fires on the tick that crosses zero', () => {
    expect(crossedZero(400, -100)).toBe(true)
    expect(crossedZero(400, 0)).toBe(true)
  })
  it('does not fire again while the step is already over', () => {
    expect(crossedZero(0, -1000)).toBe(false)
    expect(crossedZero(-1000, -2000)).toBe(false)
  })
})

describe('formatClock', () => {
  it('reads m:ss while counting down', () => {
    expect(formatClock(2 * MIN)).toBe('2:00')
    expect(formatClock(750_000)).toBe('12:30')
    expect(formatClock(7000)).toBe('0:07')
  })
  it('holds the full minute for the whole first second', () => {
    expect(formatClock(2 * MIN - 400)).toBe('2:00')
  })
  it('reads 0:00 at zero and a plus-signed overrun after it', () => {
    expect(formatClock(0)).toBe('0:00')
    expect(formatClock(-80_000)).toBe('+1:20')
    expect(formatClock(-400)).toBe('0:00')
  })
})

describe('parseTimeInput', () => {
  it('reads a bare number as minutes', () => {
    expect(parseTimeInput('5')).toBe(5 * MIN)
  })
  it('reads m:ss', () => {
    expect(parseTimeInput('5:30')).toBe(330_000)
    expect(parseTimeInput(' 0:45 ')).toBe(45_000)
  })
  it('rejects anything else so a typo leaves the clock alone', () => {
    expect(parseTimeInput('')).toBeNull()
    expect(parseTimeInput('5:75')).toBeNull()
    expect(parseTimeInput('abc')).toBeNull()
    expect(parseTimeInput('-2')).toBeNull()
  })
})
