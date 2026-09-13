<!--
  Featured quote slide.

  Frontmatter props (all optional):
    author: string   e.g. "Erika Hall"

  Body slot is the quote itself - plain markdown, sized big by the layout.
  The oversized quotation mark is a decorative flat-color accent, the same
  move the brand manual uses for its own divider pages (see base.css).
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
}

.quote-mark {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 8rem;
  line-height: 1;
  color: var(--muni-arts-blue);
  margin-bottom: -1.5rem;
}

.quote-body {
  max-width: 44rem;
}

.quote-body :deep(h1),
.quote-body :deep(p) {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 500;
  color: var(--muni-black);
  font-size: 1.8rem;
  line-height: 1.4;
}

.quote-author {
  margin-top: 1.2em !important;
  font-size: 1.1rem !important;
  font-weight: 400 !important;
  color: var(--muni-gray);
}

.quote-author::before {
  content: '- ';
}
</style>
