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

/* The subtitle carries the brand face rather than the neutral sans stack -
   in Helvetica it read as a default caption under a styled heading. Muni's
   monospace space needs the same 40%-twice correction the headings get - that
   rule lives in styles/base.css, because Vue's scoped compiler collapses a
   `:global(.muni-font) ... :deep(p)` selector down to a bare `.muni-font`,
   which would land on <html> and inherit into every text element in the deck. */
.section-body :deep(p) {
  font-family: 'Muni', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1.55rem;
  color: var(--muni-white);
  opacity: 0.9;
  margin-top: 2rem;
  /* Wrapped subtitles were rendering at ~19px baseline-to-baseline against a
     17px cap height - a 1px gap, so the two lines read as one block. */
  line-height: 1.6;
}
</style>
