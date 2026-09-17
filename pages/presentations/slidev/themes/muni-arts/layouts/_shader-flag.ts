import { computed } from 'vue'
import type { ComputedRef } from 'vue'

/**
 * Resolves the shader feature flag for a divider layout.
 *
 * Three levels, most specific wins:
 *
 *   1. this slide's frontmatter   `shader: false`
 *   2. the deck's headmatter      `shader: false`   (turns it off everywhere)
 *   3. the default                on
 *
 * The deck-wide level works because Slidev's resolveConfig() spreads the whole
 * headmatter object into the resolved config, so a key it has never heard of
 * still arrives at runtime on `$slidev.configs` - see @slidev/parser core.mjs,
 * `{ ...defaults, ...headmatter.config, ...headmatter }`. The TypeScript type
 * for configs does not declare an index signature, which is why this reads
 * through a cast rather than pretending the key is typed.
 *
 * `shader: true` on a slide re-enables it even when the deck has switched it
 * off, so one divider can keep the effect while the rest of the deck is flat.
 */
export function useShaderFlag(frontmatter: any, configs: any) {
  const fm = computed<Record<string, any>>(() => (frontmatter ?? {}) as Record<string, any>)
  const cfg = computed<Record<string, any>>(() => (configs ?? {}) as Record<string, any>)

  const enabled: ComputedRef<boolean> = computed(() => {
    if (fm.value.shader !== undefined)
      return fm.value.shader !== false
    if (cfg.value.shader !== undefined)
      return cfg.value.shader !== false
    return true
  })

  const pick = (key: string, fallback: any) =>
    computed(() => fm.value[key] ?? cfg.value[key] ?? fallback)

  return {
    enabled,
    palette: pick('shaderPalette', 'blue'),
    seed: computed(() => Number(fm.value.shaderSeed ?? cfg.value.shaderSeed ?? 1)),
    intensity: computed(() => Number(fm.value.shaderIntensity ?? cfg.value.shaderIntensity ?? 0.62)),
    speed: computed(() => Number(fm.value.shaderSpeed ?? cfg.value.shaderSpeed ?? 0.4)),
    // shaderMotion: auto | always | off. See ShaderField.vue for why 'always'
    // exists: the presenting machine has Reduce Motion on system-wide, so under
    // 'auto' the effect is frozen on the projector at every session.
    motion: pick('shaderMotion', 'auto'),
    vignette: computed(() => Number(fm.value.shaderVignette ?? cfg.value.shaderVignette ?? 0.2)),
    centerAlpha: computed(() => Number(fm.value.shaderCenterAlpha ?? cfg.value.shaderCenterAlpha ?? 0.5)),
    fadeIn: computed(() => Number(fm.value.shaderFadeIn ?? cfg.value.shaderFadeIn ?? 7)),
    // The decay on the type. Shares shaderMotion with the field, so one key
    // governs both, but has its own on/off because a divider can reasonably
    // want the background without the text going.
    rust: computed(() => (fm.value.shaderRust ?? cfg.value.shaderRust) !== false),
    rustDelay: computed(() => Number(fm.value.shaderRustDelay ?? cfg.value.shaderRustDelay ?? 30)),
    rustDuration: computed(() => Number(fm.value.shaderRustDuration ?? cfg.value.shaderRustDuration ?? 60)),
    rustAmount: computed(() => Number(fm.value.shaderRustAmount ?? cfg.value.shaderRustAmount ?? 0.55)),
  }
}
