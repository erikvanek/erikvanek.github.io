// Pure step/section computation for CourseProgress.vue, pulled out of the SFC
// so it can be unit tested against plain mock data without mounting a
// Vue/Slidev runtime. See course-progress.test.ts for the behavior spec this
// implements (worked out with Erik slide-by-slide, screenshot by screenshot),
// and CourseProgress.vue's own header comment for the short version.

/** The slice of Slidev's `SlideRoute` this function actually reads - any
 * real `SlideRoute` satisfies this structurally, so the .vue file can pass
 * `$slidev.nav.slides` straight through with no cast. */
export interface NavSlide {
  no: number
  meta: {
    slide: {
      title?: string
      frontmatter?: Record<string, unknown>
    }
  }
}

export interface ProgressStep {
  no: number
  /** The section's own title (the divider slide's heading) - shared by
   * every step in that section, not each step's own heading. */
  title?: string
  sectionStart: boolean
  sectionEnd: boolean
  state: 'mid' | 'current' | 'upcoming'
}

interface Section {
  title: string
  dividerNo: number
  nos: number[]
}

export function computeProgressSteps(
  slides: NavSlide[],
  currentPage: number,
  dividerLayouts: string[] = ['section-break', 'break'],
): ProgressStep[] {
  const sections: Section[] = []
  let current: Section | null = null

  for (const route of slides) {
    const frontmatter = route.meta.slide.frontmatter ?? {}
    // Only a VISIBLE divider is structural: it opens a section and never gets
    // a tick of its own. A hidden one is just a slide that happens to use a
    // divider layout (the welcome slide, a mid-deck pause), so it counts as an
    // ordinary step of whichever section is open.
    if (dividerLayouts.includes(frontmatter.layout as string) && !frontmatter.hideInToc) {
      current = { title: route.meta.slide.title ?? '', dividerNo: route.no, nos: [] }
      sections.push(current)
      continue
    }
    if (!current) {
      // Everything before the first real divider - cover, opening story, quote -
      // is still part of the deck, so it forms an implicit leading section
      // instead of falling off the bar. dividerNo 0 keeps it never-upcoming.
      current = { title: '', dividerNo: 0, nos: [] }
      sections.push(current)
    }
    current.nos.push(route.no)
  }

  const result: ProgressStep[] = []
  for (const s of sections) {
    if (!s.nos.length)
      continue
    const sectionIsFuture = currentPage < s.dividerNo
    const last = s.nos[s.nos.length - 1]
    for (const no of s.nos) {
      const state = sectionIsFuture ? 'upcoming' : no === currentPage ? 'current' : 'mid'
      result.push({ no, title: s.title, sectionStart: no === s.nos[0], sectionEnd: no === last, state })
    }
  }
  return result
}
