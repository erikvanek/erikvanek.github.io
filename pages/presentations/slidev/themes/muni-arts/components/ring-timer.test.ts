import { describe, expect, it } from 'vitest'
import { elapsedShare, GAP_DEG, ringParts, ringTicks } from './ring-timer'

describe('ringParts', () => {
  it('splits a trio ring into three equal parts with gaps', () => {
    const p = ringParts(3, 0)
    expect(p).toHaveLength(3)
    expect(p[0].start).toBe(GAP_DEG / 2)
    expect(p[0].end).toBe(120 - GAP_DEG / 2)
    expect(p.every(x => x.remainingFrom === x.start)).toBe(true)
  })

  it('a single part is a closed circle', () => {
    expect(ringParts(1, 0)).toEqual([{ start: 0, end: 360, remainingFrom: 0 }])
  })

  it('uses up parts as time runs', () => {
    // 12:20 of 36:00 run: the first third is gone, the second just started
    const p = ringParts(3, 740 / 2160)
    expect(p[0].remainingFrom).toBeNull()
    expect(p[1].remainingFrom).toBeCloseTo(123.3, 1)
    expect(p[2].remainingFrom).toBe(p[2].start)
  })

  it('a finished ring has nothing left', () => {
    expect(ringParts(2, 1).every(x => x.remainingFrom === null)).toBe(true)
  })
})

describe('ringTicks', () => {
  it('marks thirds of each part', () => {
    expect(ringTicks(2)).toEqual([60, 120, 240, 300])
  })
  it('a single-part ring has no marks', () => {
    expect(ringTicks(1)).toEqual([])
  })
})

describe('elapsedShare', () => {
  it('is 0 at full and 1 at zero or in overrun', () => {
    expect(elapsedShare(600_000, 600_000)).toBe(0)
    expect(elapsedShare(600_000, 0)).toBe(1)
    expect(elapsedShare(600_000, -5_000)).toBe(1)
  })
})
