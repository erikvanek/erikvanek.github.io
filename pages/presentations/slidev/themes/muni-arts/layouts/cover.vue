<!--
  Title-slide layout for MUNI/KISK course decks.

  Frontmatter props (all optional):
    session: string   e.g. "Session 1"
    date:    string    e.g. "17 Sep 2026"

  Top-left mark is the real "MUNI ARTS" lockup (see MuniArtsMark.vue for
  where it came from) - not a hand-built approximation.
-->
<script setup lang="ts">
import KiskLogo from '../components/KiskLogo.vue'
import MuniArtsMark from '../components/MuniArtsMark.vue'

defineProps<{
  session?: string
  date?: string
}>()
</script>

<template>
  <div class="slidev-layout cover">
    <header class="cover-header">
      <MuniArtsMark :height="34" />
    </header>

    <div class="cover-body">
      <slot />
    </div>

    <footer class="cover-footer">
      <KiskLogo :height="36" />
      <span v-if="session || date" class="meta">
        <template v-if="session">{{ session }}</template>
        <template v-if="session && date"> &middot; </template>
        <template v-if="date">{{ date }}</template>
      </span>
    </footer>
  </div>
</template>

<style scoped>
.cover {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cover-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cover-body :deep(h1) {
  font-size: 3rem;
  margin: 0 0 0.3em;
}

.cover-body :deep(p) {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: var(--muni-gray);
  font-size: 1.2rem;
}

.cover-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid var(--muni-blue);
  padding-top: 0.6em;
}

.meta {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 0.9rem;
  color: var(--muni-gray);
}
</style>
