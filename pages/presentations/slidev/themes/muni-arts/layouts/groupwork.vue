<!--
  Small-group work slide - marked with a small fixed eyebrow so the room
  recognizes on sight that this one is "you work now, not me". Accent is the
  Faculty of Arts blue (softer than the institutional MUNI blue), matching the
  calmer register this slide type is for.

  Renamed from `reflection` on 2026-09-14 - the layout was always used for the
  in-class group exercise rather than a closing debrief, so the name and the
  eyebrow now say that.
-->
<template>
  <div class="slidev-layout groupwork">
    <div class="groupwork-eyebrow">Skupinová práce</div>
    <slot />
  </div>
</template>

<style scoped>
.groupwork {
  border-left: 6px solid var(--muni-arts-blue);
  padding-left: 2rem;
}

.groupwork-eyebrow {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muni-arts-blue);
  margin-bottom: 0.6em;
}
</style>
