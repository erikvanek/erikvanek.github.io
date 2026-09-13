<!--
  Standard content slide - a heading plus body text/bullets. The default,
  highest-volume slide type (the SDW-25 / Discovery Practice audit found
  this shape covers the large majority of any real deck), so it stays
  deliberately plain: no added chrome, just the theme's own heading color
  and a blue bullet marker to tie lists back to the brand without noise.

  No props - heading and body both come through as normal markdown content.
-->
<template>
  <div class="slidev-layout heading-body">
    <slot />
  </div>
</template>

<style scoped>
.heading-body :deep(h1) {
  font-size: 2.2rem;
  margin-bottom: 0.8em;
}

.heading-body :deep(li)::marker {
  color: var(--muni-blue);
}
</style>
