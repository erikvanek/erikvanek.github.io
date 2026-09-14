// Behavior spec for CourseProgress.vue's step/section logic, worked out with
// Erik through several rounds of screenshots against the sdw-26-hello-world
// demo deck. Each test below traces back to a specific thing he asked for or
// a specific bug he caught - see the commit/backlog history (016) for the
// blow-by-blow if a test here seems oddly specific.
import type { NavSlide } from './course-progress'
import { describe, expect, it } from 'vitest'
import { computeProgressSteps } from './course-progress'

const DIVIDERS = ['section-break', 'break']

/** Builds a minimal stand-in for a Slidev `SlideRoute`. `title` is the
 * slide's own heading - only meaningful when the slide is itself a divider,
 * since that's the only place computeProgressSteps reads it (it becomes the
 * whole section's title, not that one slide's). */
function slide(no: number, opts: { layout?: string, hideInToc?: boolean, title?: string } = {}): NavSlide {
  return {
    no,
    meta: {
      slide: {
        title: opts.title,
        frontmatter: {
          ...(opts.layout ? { layout: opts.layout } : {}),
          ...(opts.hideInToc ? { hideInToc: true } : {}),
        },
      },
    },
  }
}

describe('dividers', () => {
  it('never get a step of their own', () => {
    const slides = [
      slide(1, { layout: 'section-break', title: 'Warm-up' }),
      slide(2),
    ]
    expect(computeProgressSteps(slides, 2, DIVIDERS).map(s => s.no)).toEqual([2])
  })

  it('open a new section when visible, so a slide right after one starts a fresh section', () => {
    const slides = [
      slide(1, { layout: 'section-break', title: 'Warm-up' }),
      slide(2),
      slide(3, { layout: 'section-break', title: 'Concept input' }),
      slide(4),
    ]
    const steps = computeProgressSteps(slides, 4, DIVIDERS)
    expect(steps.find(s => s.no === 2)?.title).toBe('Warm-up')
    expect(steps.find(s => s.no === 4)?.title).toBe('Concept input')
  })

  it('count as ordinary steps when hidden - they open no section, but they are still slides', () => {
    const slides = [
      slide(1, { layout: 'section-break', title: 'Hands-on exercise' }),
      slide(2),
      slide(3, { layout: 'break', hideInToc: true, title: 'Break' }),
      slide(4),
      slide(5, { layout: 'section-break', title: 'Debrief' }),
    ]
    const steps = computeProgressSteps(slides, 5, DIVIDERS)
    // slide 3 (the hidden break) is a step of "Hands-on exercise" like any
    // other slide, and does not start a section of its own
    expect(steps.map(s => s.no)).toEqual([2, 3, 4])
    expect(steps.every(s => s.title === 'Hands-on exercise')).toBe(true)
  })
})

it('tracks content before the first divider as an implicit leading section, so nothing falls off the bar', () => {
  const slides = [
    slide(1, { layout: 'cover', hideInToc: true, title: 'Cover' }),
    slide(2, { hideInToc: true, title: 'Intro' }),
    slide(3, { layout: 'heading-body', hideInToc: true, title: 'Agenda' }),
    slide(4, { layout: 'section-break', title: 'Warm-up' }),
    slide(5),
  ]
  const steps = computeProgressSteps(slides, 1, DIVIDERS)
  expect(steps.map(s => s.no)).toEqual([1, 2, 3, 5])
  // the leading run has no divider of its own, so it carries no title and is
  // never "upcoming" - you are already in it on slide 1
  expect(steps.filter(s => s.no <= 3).every(s => s.title === '')).toBe(true)
  expect(steps.find(s => s.no === 1)?.state).toBe('current')
  expect(steps.find(s => s.no === 3)?.state).toBe('mid')
})

it('tracks every slide as one section when a deck has no dividers at all', () => {
  const slides = [slide(1, { layout: 'cover', hideInToc: true }), slide(2), slide(3)]
  const steps = computeProgressSteps(slides, 2, DIVIDERS)
  expect(steps.map(s => s.no)).toEqual([1, 2, 3])
  expect(steps[0].sectionStart).toBe(true)
  expect(steps[2].sectionEnd).toBe(true)
})

it('tracks every slide after a divider as a step of that section, whatever its own heading or hideInToc says (regression: the 5-slides-after-Debrief bug)', () => {
  const slides = [
    slide(1, { layout: 'section-break', title: 'Debrief & homework' }),
    slide(2, { hideInToc: true }), // filler, repeats the section's own heading
    slide(3, { hideInToc: true }), // "Layout gallery" - different heading entirely
    slide(4, { hideInToc: true }), // "What changes this run"
    slide(5, { layout: 'quote', hideInToc: true }), // quote slide, no heading at all
    slide(6, { layout: 'two-column', hideInToc: true }), // "Double diamond..."
    slide(7, { layout: 'section-break', title: 'Part II' }),
  ]
  const steps = computeProgressSteps(slides, 7, DIVIDERS)
  expect(steps.map(s => s.no)).toEqual([2, 3, 4, 5, 6])
})

it('drops a section with no content slides at all, e.g. two dividers back to back', () => {
  const slides = [
    slide(1, { layout: 'section-break', title: 'Warm-up' }),
    slide(2, { layout: 'section-break', title: 'Concept input' }),
    slide(3),
  ]
  const steps = computeProgressSteps(slides, 3, DIVIDERS)
  expect(steps.map(s => s.no)).toEqual([3])
  expect(steps[0].title).toBe('Concept input')
})

describe('per-step state', () => {
  const slides = [
    slide(1, { layout: 'section-break', title: 'Warm-up' }),
    slide(2),
    slide(3, { layout: 'section-break', title: 'Concept input' }),
    slide(4),
    slide(5),
    slide(6, { layout: 'section-break', title: 'Hands-on exercise' }),
    slide(7),
  ]

  it('marks every step of a section not yet reached as upcoming', () => {
    const steps = computeProgressSteps(slides, 2, DIVIDERS) // sitting in Warm-up
    expect(steps.filter(s => s.title === 'Hands-on exercise').every(s => s.state === 'upcoming')).toBe(true)
  })

  it('activates a section the moment you land on its own divider, even before its first step', () => {
    const steps = computeProgressSteps(slides, 3, DIVIDERS) // sitting on the Concept input divider
    expect(steps.filter(s => s.title === 'Concept input').every(s => s.state === 'mid')).toBe(true)
  })

  it('gives the exact current slide "current" and every other step in that section "mid", on either side of it', () => {
    const steps = computeProgressSteps(slides, 4, DIVIDERS)
    expect(steps.find(s => s.no === 4)?.state).toBe('current')
    expect(steps.find(s => s.no === 5)?.state).toBe('mid')
  })

  it('keeps a section already left behind at the same mid-tone as the one you are in - no separate "done" state', () => {
    const steps = computeProgressSteps(slides, 7, DIVIDERS)
    expect(steps.filter(s => s.title === 'Warm-up').every(s => s.state === 'mid')).toBe(true)
    expect(steps.find(s => s.no === 7)?.state).toBe('current')
  })
})

it('flags only the first and last step of each section for rounded caps - a single-step section gets both', () => {
  const slides = [
    slide(1, { layout: 'section-break', title: 'Warm-up' }),
    slide(2), // Warm-up's only step
    slide(3, { layout: 'section-break', title: 'Concept input' }),
    slide(4),
    slide(5),
  ]
  const steps = computeProgressSteps(slides, 5, DIVIDERS)

  const onlyStep = steps.find(s => s.no === 2)!
  expect(onlyStep.sectionStart).toBe(true)
  expect(onlyStep.sectionEnd).toBe(true)

  const [first, second] = steps.filter(s => s.title === 'Concept input')
  expect(first.sectionStart).toBe(true)
  expect(first.sectionEnd).toBe(false)
  expect(second.sectionStart).toBe(false)
  expect(second.sectionEnd).toBe(true)
})

describe('regression: the sdw-26-hello-world demo deck', () => {
  // Mirrors the real slide sequence in sdw-26-hello-world/slides.md - the
  // shape that originally surfaced the 5-slides-after-Debrief bug and the
  // missing-5th-section bug.
  const slides = [
    slide(1, { layout: 'cover', hideInToc: true, title: 'SDW-26' }),
    slide(2, { hideInToc: true, title: 'This is the MUNI Arts theme' }),
    slide(3, { layout: 'heading-body', hideInToc: true, title: 'Agenda' }),
    slide(4, { layout: 'section-break', title: 'Warm-up' }),
    slide(5, { layout: 'heading-body', hideInToc: true, title: 'Warm-up' }),
    slide(6, { layout: 'section-break', title: 'Concept input' }),
    slide(7, { hideInToc: true, title: 'Concept input' }),
    slide(8, { layout: 'section-break', title: 'Hands-on exercise' }),
    slide(9, { hideInToc: true, title: 'Hands-on exercise' }),
    slide(10, { layout: 'section-break', title: 'Debrief & homework' }),
    slide(11, { hideInToc: true, title: 'Debrief & homework' }),
    slide(12, { layout: 'heading-body', hideInToc: true, title: 'Layout gallery' }),
    slide(13, { hideInToc: true, title: 'What changes this run' }),
    slide(14, { layout: 'quote', hideInToc: true }),
    slide(15, { layout: 'two-column', hideInToc: true, title: 'Double diamond, still the spine' }),
    slide(16, { layout: 'section-break', title: 'Part II' }),
    slide(17, { layout: 'groupwork', hideInToc: true, title: 'What shifted for you today?' }),
    slide(18, { layout: 'homework', hideInToc: true, title: 'Before session 2' }),
    slide(19, { layout: 'full-image', hideInToc: true, title: 'Session 1, spring 2025' }),
    slide(20, { layout: 'break', hideInToc: true, title: 'Break' }),
  ]

  it('tracks the right step count per section, all 5 slides of Debrief & homework included', () => {
    const steps = computeProgressSteps(slides, 12, DIVIDERS)
    const bySection = (title: string) => steps.filter(s => s.title === title)
    expect(bySection('')).toHaveLength(3) // cover, intro, Agenda - the leading run
    expect(bySection('Warm-up')).toHaveLength(1)
    expect(bySection('Concept input')).toHaveLength(1)
    expect(bySection('Hands-on exercise')).toHaveLength(1)
    expect(bySection('Debrief & homework')).toHaveLength(5)
    expect(bySection('Part II')).toHaveLength(4) // 17-19 plus the hidden Break at 20
    expect(steps).toHaveLength(15)
  })

  it('tracks the cover, intro and Agenda slide as steps of the leading run', () => {
    const steps = computeProgressSteps(slides, 3, DIVIDERS)
    expect(steps.filter(s => s.no <= 3).map(s => s.no)).toEqual([1, 2, 3])
  })

  it('never turns a VISIBLE divider into a step, but a hidden one counts like any slide', () => {
    const steps = computeProgressSteps(slides, 20, DIVIDERS)
    expect(steps.some(s => [4, 6, 8, 10, 16].includes(s.no))).toBe(false)
    expect(steps.some(s => s.no === 20)).toBe(true)
  })

  it('marks the exact current slide "current" and leaves the rest of its section "mid"', () => {
    const steps = computeProgressSteps(slides, 13, DIVIDERS)
    expect(steps.find(s => s.no === 13)?.state).toBe('current')
    expect(steps.find(s => s.no === 11)?.state).toBe('mid')
    expect(steps.find(s => s.no === 15)?.state).toBe('mid')
  })

  it('leaves a not-yet-reached section fully upcoming', () => {
    const steps = computeProgressSteps(slides, 5, DIVIDERS)
    expect(steps.filter(s => s.title === 'Part II').every(s => s.state === 'upcoming')).toBe(true)
  })

  it('folds the trailing hidden Break into Part II rather than opening a 6th section', () => {
    const steps = computeProgressSteps(slides, 19, DIVIDERS)
    const titles = new Set(steps.map(s => s.title))
    expect(titles.has('Break')).toBe(false)
    expect(steps.find(s => s.no === 20)?.title).toBe('Part II')
    // 5 named sections plus the untitled leading run
    expect(titles.size).toBe(6)
  })
})
