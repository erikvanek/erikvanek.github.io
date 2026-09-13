<!--
  Closing debrief slide - calmer than a regular content slide, marked with
  a small fixed eyebrow so the room recognizes the ritual on sight. Accent
  is the Faculty of Arts blue (softer than the institutional MUNI blue),
  matching the calmer register this slide type is for.
-->
<template>
  <div class="slidev-layout reflection">
    <div class="reflection-eyebrow">Reflection</div>
    <slot />
  </div>
</template>

<style scoped>
.reflection {
  border-left: 6px solid var(--muni-arts-blue);
  padding-left: 2rem;
}

.reflection-eyebrow {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muni-arts-blue);
  margin-bottom: 0.6em;
}
</style>
