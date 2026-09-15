<!--
  Featured quote slide.

  Frontmatter props (all optional):
    author: string   e.g. "Erika Hall"

  Body slot is the quote itself - plain markdown, sized big by the layout.

  Composition: the quotation mark is a full-bleed graphic in Faculty-of-Arts
  blue running off the top-left corner, with the quote set left-aligned and
  overlapping it - the flat-color accent move from the brand manual's divider
  pages, scaled up to carry the slide. The attribution runs in Muni, which is
  caps-only and therefore suits a short credit line but not the quote itself.
-->
<script setup lang="ts">
defineProps<{
  author?: string
}>()
</script>

<template>
  <div class="slidev-layout quote">
    <div class="quote-mark" aria-hidden="true">&#8220;</div>
    <div class="quote-body">
      <slot />
      <p v-if="author" class="quote-author">{{ author }}</p>
    </div>
  </div>
</template>

<style scoped>
.quote {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  overflow: hidden;
}

.quote-mark {
  position: absolute;
  /* Placement is set from the glyph's INK box, not its em box - Georgia inks at
     ~26% of font-size, offset ~4% right and ~11% down, so the two differ by tens
     of px at display sizes. Current values sit the mark beside the quote's first
     line, just off the top-left corner of the slide. */
  left: 1.25rem;
  margin-top: -1.5rem;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 16rem;
  line-height: 1;
  color: var(--muni-arts-blue);
  z-index: 0;
  pointer-events: none;
  user-select: none;
}

.quote-body {
  position: relative;
  z-index: 1;
  max-width: 40rem;
  margin-left: 4rem;
  text-align: left;
}

.quote-body :deep(h1),
.quote-body :deep(p) {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 600;
  color: var(--muni-black);
  font-size: 2.1rem;
  line-height: 1.25;
  letter-spacing: -0.015em;
}

.quote-author {
  margin-top: 1.8em !important;
  font-family: 'Muni', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
  font-size: 0.95rem !important;
  font-weight: 500 !important;
  color: var(--muni-blue) !important;
  letter-spacing: 0.02em;
}

.quote-author::before {
  content: '- ';
}
</style>
