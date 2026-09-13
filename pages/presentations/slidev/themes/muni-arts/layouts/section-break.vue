<!--
  Major section divider - a flat MUNI-blue field with white type, the same
  move the brand manual uses for its own divider pages (p.26 "Styl", p.33
  "Merkantil"). Heading + optional subtitle come through as normal markdown.
-->
<template>
  <div class="slidev-layout section-break">
    <div class="section-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.section-break {
  background: var(--muni-blue);
  color: var(--muni-white);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
}

.section-body {
  max-width: 40rem;
}

.section-body :deep(h1) {
  color: var(--muni-white);
  font-size: 3rem;
}

.section-body :deep(p) {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1.3rem;
  color: var(--muni-white);
  opacity: 0.85;
}
</style>
