<!--
  Full-bleed image slide - background photo/diagram with optional overlaid
  heading text and a credit line. Uses Slidev's own background helper (same
  one the built-in `image` layouts use), with the dim scrim on by default so
  overlaid white text stays legible - the same problem the old reveal.js
  decks solved with a hand-rolled text-shadow hack.

  Frontmatter props:
    image: string    required - image src (local path or URL)
    credit: string   optional - small caption, bottom-right
    dim: boolean     default true - scrim behind overlaid text; set false
                     for a slide with no text over the image
    fit: string      default "cover" - background-size. Use "contain" for a
                     photo that is not 16:9 (square, portrait) so the whole
                     frame stays visible instead of being cropped to the
                     slide's aspect ratio.
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    image?: string
    credit?: string
    dim?: boolean
    fit?: 'cover' | 'contain'
  }>(),
  { dim: true, fit: 'cover' },
)

// Same shape as @slidev/client's own layoutHelper.handleBackground(), inlined
// so this theme has no dependency on @slidev/client internals (that subpath
// import fails to resolve from a local-path theme's own build - a rolldown
// resolution quirk, not a real dependency this theme needs).
function resolveAssetUrl(url: string) {
  if (url.startsWith('/')) return import.meta.env.BASE_URL + url.slice(1)
  return url
}

const style = computed(() => {
  if (!props.image) return {}
  const url = resolveAssetUrl(props.image)
  return {
    backgroundImage: props.dim
      ? `linear-gradient(#0005, #0008), url("${url}")`
      : `url("${url}")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: props.fit,
  }
})
</script>

<template>
  <div class="slidev-layout full-image" :style="style">
    <div class="full-image-body">
      <slot />
    </div>
    <div v-if="credit" class="full-image-credit">{{ credit }}</div>
  </div>
</template>

<style scoped>
.full-image {
  position: relative;
  display: flex;
  align-items: flex-end;
  height: 100%;
}

.full-image-body :deep(h1),
.full-image-body :deep(p) {
  color: var(--muni-white);
}

.full-image-credit {
  position: absolute;
  right: 1rem;
  bottom: 0.6rem;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 0.8rem;
  color: var(--muni-white);
  opacity: 0.85;
}
</style>
