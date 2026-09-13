<!--
  Two-column slide, optional heading spanning both.

  Usage:
```md
---
layout: two-column
ratio: "60-40"
---
# Heading (optional, spans both columns)

::left::
- bullets on the left

::right::
![](./diagram.png)
```

  Frontmatter props (all optional):
    ratio: string   "L-R" split, e.g. "60-40" (default "50-50")
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  ratio?: string
}>()

const columns = computed(() => {
  const [l, r] = (props.ratio ?? '50-50').split('-').map(Number)
  if (!l || !r) return '1fr 1fr'
  return `${l}fr ${r}fr`
})
</script>

<template>
  <div class="slidev-layout two-column" :style="{ gridTemplateColumns: columns }">
    <div class="col-header">
      <slot />
    </div>
    <div class="col-left">
      <slot name="left" />
    </div>
    <div class="col-right">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
.two-column {
  display: grid;
  grid-template-rows: auto 1fr;
  column-gap: 2.5rem;
  height: 100%;
}

.col-header {
  grid-column: 1 / 3;
}

.col-header:empty {
  display: none;
}

.col-left,
.col-right {
  min-width: 0;
}

.col-left :deep(img),
.col-right :deep(img) {
  max-width: 100%;
}
</style>
