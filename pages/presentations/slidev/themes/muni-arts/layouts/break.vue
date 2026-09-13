<!--
  Explicit break slide - same flat-field family as section-break.vue, but
  sparser: just the word plus whatever short line the deck author writes
  (e.g. a duration). Not the place for an agenda recap - that's what
  section-break is for.
-->
<template>
  <div class="slidev-layout break">
    <div class="break-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.break {
  background: var(--muni-blue);
  color: var(--muni-white);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
}

.break-body :deep(h1) {
  color: var(--muni-white);
  font-size: 2.2rem;
}

.break-body :deep(p) {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1.1rem;
  color: var(--muni-white);
  opacity: 0.85;
}
</style>
