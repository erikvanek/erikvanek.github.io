<!--
  Small-group work slide - marked with a small fixed eyebrow so the room
  recognizes on sight that this one is "you work now, not me". Accent is the
  Faculty of Arts blue (softer than the institutional MUNI blue), matching the
  calmer register this slide type is for.

  Renamed from `reflection` on 2026-09-14 - the layout was always used for the
  in-class group exercise rather than a closing debrief, so the name and the
  eyebrow now say that.

  With `timer` in the slide's frontmatter it also carries the activity timer
  (components/ActivityTimer.vue): `timer: 12` is one step, `timer: [2, 8, 10]`
  is three, and each step's instruction goes in its own `::step-1::` ...
  `::step-4::` slot. The default slot (heading, one-line intro) stays above
  the card. `gong: false` silences the gong on that slide. Without `timer`
  the slide renders exactly as it always did.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { parseDurations } from '../components/activity-timer'

const props = defineProps<{ timer?: number | number[], gong?: boolean }>()
const durations = computed(() => parseDurations(props.timer))
</script>

<template>
  <div class="slidev-layout groupwork" :class="{ 'has-timer': durations.length }">
    <div class="groupwork-eyebrow">Skupinová práce</div>
    <slot />
    <ActivityTimer v-if="durations.length" :durations="durations" :gong="gong !== false">
      <template v-for="(_, i) in durations" :key="i" #[`step-${i+1}`]>
        <slot :name="`step-${i + 1}`" />
      </template>
    </ActivityTimer>
  </div>
</template>

<style scoped>
.groupwork {
  border-left: 6px solid var(--muni-arts-blue);
  padding-left: 2rem;
}

.groupwork-eyebrow {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muni-arts-blue);
  margin-bottom: 0.6em;
}

/* Clear of the course-progress rail at the very bottom of the slide. */
.groupwork.has-timer {
  padding-bottom: 1.5rem;
}
</style>
