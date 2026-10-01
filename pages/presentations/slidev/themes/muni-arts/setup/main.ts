/**
 * Flags whether the real 'Muni' font actually resolved on this machine.
 *
 * Muni is a monospace display face: every glyph, the space included, carries
 * the same 0.70em advance - about 2.5x the space of a normal sans. In headings
 * that reads as a hole between words rather than a word gap. The correction
 * lives in base.css, but it must NOT apply when Muni is absent: the documented
 * fallback (Helvetica/Arial, ~0.278em space) is already correctly spaced and
 * the same negative word-spacing would run its words together. Anyone viewing
 * the published site is in exactly that case - the font files are never
 * shipped with this repo (see README.md).
 *
 * Detection is the canvas-measure comparison rather than document.fonts.check,
 * which is unreliable for locally-installed system families across browsers.
 */
import type { AppContext } from '@slidev/types'

const MUNI_CLASS = 'muni-font'

function muniIsInstalled(): boolean {
  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) return false
  // A string with wide per-glyph variance, so a monospace face measures
  // clearly differently from a proportional one.
  const probe = 'WWWiii ll MM'
  const widthIn = (family: string) => {
    ctx.font = `700 100px ${family}`
    return ctx.measureText(probe).width
  }
  // Compare against two structurally different fallbacks: if 'Muni' fails to
  // resolve, both measurements collapse onto their own fallback's width.
  return (['serif', 'sans-serif'] as const).some(
    fallback => widthIn(`'Muni', ${fallback}`) !== widthIn(fallback),
  )
}

/**
 * Every link that leaves the deck opens in a new tab, so a click during the
 * session never navigates the presentation away (Erik, 1 Oct). Done once here
 * with a capture-phase listener instead of target="_blank" on each link, so it
 * covers markdown links, HTML links and links added later alike. Links inside
 * the deck (same origin: slide numbers, presenter view) keep their behaviour.
 */
function openExternalLinksInNewTab() {
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0) return
    const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
    if (!link) return
    const url = new URL(link.href, location.href)
    if (!/^https?:$/.test(url.protocol) || url.origin === location.origin) return
    event.preventDefault()
    window.open(url.href, '_blank', 'noopener,noreferrer')
  }, true)
}

export default function ({ app: _app }: AppContext) {
  if (typeof document === 'undefined') return
  if (muniIsInstalled()) document.documentElement.classList.add(MUNI_CLASS)
  openExternalLinksInNewTab()
}
