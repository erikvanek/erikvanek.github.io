<!--
  Hand-rolled course-progress bar (not the `slidev-component-progress` addon -
  see themes/muni-arts/snippets/global-bottom.vue for why). One tick per real
  slide ("step") - except the deck's blue-field "divider" slides (section-break,
  break) never get a tick of their own, they only mark where a section starts.
  Every other slide following a real (non-hidden) divider is a step of that
  section, all the way up to the next divider - regardless of its own heading
  or `hideInToc`, so a layout-gallery slide, a quote, a reflection slide all
  count, not just ones that repeat the section's own title. Content before the
  first real divider (the cover, the intro slide, the agenda slide itself)
  is simply never inside any section, so it's automatically never a step -
  no special-casing needed for those three.

  Sits on its own translucent-white rail rather than drawing straight onto the
  slide, so it reads the same on a plain white slide and on a full-bleed
  MUNI-blue one - a flat brand-color mark on its own brand-color background
  (or a white one on white) otherwise nearly vanishes. Understated by design:
  thin, low opacity, hidden on the cover slide.

  Color reads by SECTION, not just by step: a section you've already left
  behind and a section you're currently in both show the same mid-tone -
  entering a section (landing on its divider already counts) is what "lights
  up" its whole run of steps - and only the one exact step you're on gets the
  fuller, more saturated color. A section you haven't reached yet stays a
  faint neutral mark.
-->
<script setup lang="ts">
import type { SlideRoute } from '@slidev/types'
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = withDefaults(
  defineProps<{
    thickness?: string
    railOpacity?: number
    gap?: string
    sectionGap?: string
    /** Slide layouts that are "dividers" - never a step themselves, and (when
     * not `hideInToc`) the only thing that opens a new tracked section. */
    dividerLayouts?: string[]
  }>(),
  {
    thickness: '4px',
    railOpacity: 0.6,
    sectionGap: '2px',
    dividerLayouts: () => ['section-break', 'break'],
  },
)

const { $slidev } = useSlideContext()

const steps = computed(() => {
  const slides = ($slidev?.nav.slides ?? []) as SlideRoute[]
  const currentPage = $slidev?.nav.currentPage ?? 1

  const sections: { title: string, dividerNo: number, nos: number[] }[] = []
  let current: { title: string, dividerNo: number, nos: number[] } | null = null

  for (const route of slides) {
    const frontmatter = route.meta.slide.frontmatter ?? {}
    if (props.dividerLayouts.includes(frontmatter.layout)) {
      // A real (visible) divider opens a new section; a hidden one (the
      // cover, a mid-deck break) opens nothing and doesn't close the section
      // already open either - it's just a pause, skipped either way.
      if (!frontmatter.hideInToc) {
        current = { title: route.meta.slide.title ?? '', dividerNo: route.no, nos: [] }
        sections.push(current)
      }
      continue
    }
    current?.nos.push(route.no)
  }

  const result: { no: number, title?: string, sectionStart: boolean, sectionEnd: boolean, state: 'mid' | 'current' | 'upcoming' }[] = []
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
})
</script>

<template>
  <div
    v-if="steps.length && $slidev?.nav.currentLayout !== 'cover'"
    class="muni-course-progress"
    :style="{ padding: `0 ${sectionGap}` }"
  >
    <div
      v-for="(step, i) in steps"
      :key="step.no"
      class="muni-course-progress__step"
      :class="[
        step.state,
        step.sectionStart && 'section-start',
        step.sectionEnd && 'section-end',
      ]"
      :style="{
        height: thickness,
        marginLeft: i > 0 && step.sectionStart ? sectionGap : undefined,
      }"
      :title="step.title"
    />
  </div>
</template>

<style scoped>
.muni-course-progress {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  z-index: 10;
  pointer-events: none;
  /* The rail: a near-opaque neutral strip so ticks always sit on a known
     backdrop instead of the slide's own (arbitrary) background color. */
  background: rgba(255, 255, 255, v-bind(railOpacity));
}
.muni-course-progress__step {
  flex: 1;
  background: rgba(0, 0, 0, 0.15);
  transition: background-color 200ms ease, opacity 200ms ease;
}
/* Rounded caps only at each section's own start/end, so steps within a
   section read as one connected bar rather than a row of separate pills. */
.muni-course-progress__step.section-start {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.muni-course-progress__step.section-end {
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
.muni-course-progress__step.mid {
  background: var(--slidev-theme-primary, #5d8392);
  opacity: 0.55;
}
.muni-course-progress__step.current {
  background: var(--slidev-theme-primary, #5d8392);
  opacity: 1;
}
</style>
