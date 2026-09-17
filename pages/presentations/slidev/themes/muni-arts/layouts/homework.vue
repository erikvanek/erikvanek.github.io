<!--
  Assignment brief slide - same shape as groupwork.vue (fixed eyebrow +
  accent rule), but with the KISK yellow accent: this slide type is about
  to send people off to do something, so it reads as "action", not "calm".
-->
<template>
  <div class="slidev-layout homework">
    <div class="homework-eyebrow">Domácí práce</div>
    <slot />
  </div>
</template>

<style scoped>
.homework {
  border-left: 6px solid var(--kisk-yellow);
  padding-left: 2rem;
}

.homework-eyebrow {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muni-black);
  background: var(--kisk-yellow);
  display: inline-block;
  padding: 0.15em 0.5em;
  margin-bottom: 0.6em;
}
</style>
