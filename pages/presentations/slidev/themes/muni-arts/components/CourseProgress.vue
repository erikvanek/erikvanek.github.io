<!--
  Hand-rolled course-progress bar (not the `slidev-component-progress` addon -
  see themes/muni-arts/snippets/global-bottom.vue for why).

  **Every slide in the deck gets a tick ("step") except one thing: a VISIBLE
  divider.** A divider is a slide on a blue-field divider layout (section-break,
  break) that is not `hideInToc` - it marks where a section starts and never
  gets a tick of its own. Everything else counts, regardless of its own heading
  or `hideInToc`: a quote, a full-image photo, a video slide, a groupwork
  slide, and a slide that merely uses a divider layout while hidden (an opening
  welcome slide, a mid-deck pause) are all steps of whichever section is open.

  Content before the first real divider - cover, opening story, quote, bio -
  forms an implicit leading section rather than falling off the bar. Leaving
  a third of the deck untracked read as confusing rather than tidy, so the
  default is now "show everything, minus the dividers themselves".

  Sits on its own translucent-white rail rather than drawing straight onto the
  slide, so it reads the same on a plain white slide and on a full-bleed
  MUNI-blue one - a flat brand-color mark on its own brand-color background
  (or a white one on white) otherwise nearly vanishes. Understated by design:
  thin, low opacity, hidden on the cover slide, and hidden on any slide whose
  frontmatter sets `hideProgress: true`.

  Color reads by SECTION, not just by step: a section you've already left
  behind and a section you're currently in both show the same mid-tone -
  entering a section (landing on its divider already counts) is what "lights
  up" its whole run of steps - and only the one exact step you're on gets the
  fuller, more saturated color. A section you haven't reached yet stays a
  faint neutral mark.

  The actual step/section computation lives in ./course-progress.ts, unit
  tested in course-progress.test.ts - this file is just the render.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import { computeProgressSteps } from './course-progress'

const props = withDefaults(
  defineProps<{
    thickness?: string
    railOpacity?: number
    gap?: string
    sectionGap?: string
    /** Slide layouts that can act as "dividers". A slide on one of these is
     * structural - no tick of its own, opens a new tracked section - only when
     * it is NOT `hideInToc`; a hidden one is treated as an ordinary step. */
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

/** Per-slide opt-out: `hideProgress: true` in a slide's frontmatter. For slides
 *  where the rail is visual noise rather than orientation - a full-bleed photo
 *  or video that should reach every edge of the frame. */
const hiddenHere = computed(
  () => $slidev?.nav.currentSlideRoute?.meta?.slide?.frontmatter?.hideProgress === true,
)

const steps = computed(() => computeProgressSteps(
  $slidev?.nav.slides ?? [],
  $slidev?.nav.currentPage ?? 1,
  props.dividerLayouts,
))
</script>

<template>
  <div
    v-if="steps.length && $slidev?.nav.currentLayout !== 'cover' && !hiddenHere"
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
