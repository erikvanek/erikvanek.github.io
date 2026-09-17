<!--
  Major section divider - a flat MUNI-blue field with white type, the same
  move the brand manual uses for its own divider pages (p.26 "Styl", p.33
  "Merkantil"). Heading + optional subtitle come through as normal markdown.

  The flat field is now the floor rather than the whole slide: <ShaderField />
  paints a slow animated dither over it, inside the approved palette. It is on
  by default and switched off per slide with `shader: false`, or deck-wide by
  setting that in headmatter. The blue background below stays in place, so if
  WebGL is unavailable, or the shader is off, the slide is exactly what it was.

  The flag, most specific wins (see layouts/_shader-flag.ts):
    shader: false          in HEADMATTER  - off for the whole deck
    shader: false          in a slide     - off on that slide only
    shader: true           in a slide     - back on, even if the deck is off
  Everything else can be set in either place, slide overriding deck:
    shaderPalette: blue | ice | mono
    shaderSeed: 4          - stable variation; same seed, same starting soup
    shaderIntensity: 0.62  - 0 to 1; lower is calmer behind text
    shaderSpeed: 0.4       - generations per second
    shaderVignette: 0.2    - how much darker the corners go than the centre
    shaderCenterAlpha: 0.5 - opacity of the simulation at the centre, rising
                             smoothly to full outside the ellipse
    shaderFadeIn: 7        - seconds the field takes to bloom in after the
                             slide lands; 0 for no fade
    shaderRust: false      - switch off the slow decay on the type
    shaderRustDelay: 30    - seconds on screen before the type starts to go
    shaderRustDuration: 60 - seconds from first sign of decay to full extent
    shaderRustAmount: 0.55 - 0 to 1; how far the decay is allowed to go
    shaderMotion: auto     - auto honours prefers-reduced-motion (default),
                             always animates regardless (use this for the
                             presenting machine), off freezes it
-->
<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import ShaderField from '../components/ShaderField.vue'
import RustyText from '../components/RustyText.vue'
import { useShaderFlag } from './_shader-flag'

const { $frontmatter, $slidev } = useSlideContext()
const { enabled, palette, seed, intensity, speed, motion, vignette, centerAlpha, fadeIn, rust, rustDelay, rustDuration, rustAmount } = useShaderFlag($frontmatter, $slidev?.configs)
</script>

<template>
  <div class="slidev-layout section-break">
    <ShaderField
      v-if="enabled"
      :palette="palette"
      :seed="seed"
      :intensity="intensity"
      :speed="speed"
      :motion="motion"
      :vignette="vignette"
      :center-alpha="centerAlpha"
      :fade-in="fadeIn"
    />
    <div class="section-body">
      <RustyText
        v-if="enabled && rust"
        :delay="rustDelay"
        :duration="rustDuration"
        :amount="rustAmount"
        :seed="seed"
        :motion="motion"
      >
        <slot />
      </RustyText>
      <slot v-else />
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
  position: relative;
  overflow: hidden;
}

.section-body {
  max-width: 40rem;
  position: relative;
  z-index: 1;
}

/* A soft scrim in the brand blue, sized to the text block rather than the
   slide, so the type keeps its contrast wherever the lens happens to drift.
   Radial and very wide, so it never reads as a visible panel behind the
   words - on a flat slide with the shader off it is invisible. */
.section-body::before {
  content: '';
  position: absolute;
  inset: -18vh -14vw;
  background: radial-gradient(
    ellipse at center,
    rgb(0 0 220 / 78%) 0%,
    rgb(0 0 220 / 55%) 45%,
    rgb(0 0 220 / 0%) 72%
  );
  z-index: -1;
  pointer-events: none;
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
