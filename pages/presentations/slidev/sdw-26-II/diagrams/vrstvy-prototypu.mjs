// Generates the "what can be prototyped" layers diagram (slide 25) in two
// forms from one geometry: a static SVG for the IO chapter and public/, and
// components/VrstvyPrototypu.vue, which zooms out one layer per click.
// Edit the texts or geometry here and rerun; never hand-edit the outputs.
//
// Usage: node diagrams/vrstvy-prototypu.mjs
// Env: SDW_IO_SVG (where the IO chapter keeps its copy), CHROME (browser
// binary, used for the PNG copy that IS MUNI gets next to the IO SVG)
import { writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { execFileSync } from 'node:child_process'

const deck = join(dirname(fileURLToPath(import.meta.url)), '..')
const ioSvg = process.env.SDW_IO_SVG ??
  '/Users/erik/dev/ephemeron/SDW-26/artifacts/IO/02 Setkání 2 - Prototypování více do hloubky/vrstvy-prototypu.svg'

// Outermost first, in the order of IO 2.3 „Od nejmenšího po největší“ read
// backwards, so the diagram and the chapter name the same layers
const layers = [
  ['PRODUKTOVÁ VIZE', 'Knowledge Navigator (Apple, 1987)'],
  ['FYZICKÉ PROSTORY A NAVIGACE', 'zákaznické centrum úřadu'],
  ['ZÁKAZNICKÁ CESTA', 'od objednávky po vrácení zboží'],
  ['OBRAZOVKY A DÍLČÍ PRŮCHODY', 'dokončení objednávky'],
  ['OBSAH A TEXTY', 'úřední dopis'],
]

const FS = 18

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

// Muni is monospace (every glyph and the space advance 0.70em). Words are
// placed one by one with a 0.40em gap, the same gap the theme's headings get
// from word-spacing -0.3em, so the label reads right in Muni and stays apart
// in a fallback font instead of colliding.
const muni = (text, x, y, size, fill, anchor = 'start') => {
  const words = text.split(' ')
  const width = words.reduce((a, w) => a + w.length * 0.7 * size, 0) + (words.length - 1) * 0.4 * size
  let cx = anchor === 'middle' ? x - width / 2 : x
  const spans = words.map((w) => {
    const s = `<tspan x="${cx.toFixed(1)}">${esc(w)}</tspan>`
    cx += w.length * 0.7 * size + 0.4 * size
    return s
  }).join('')
  return `<text class="muni" y="${y}" font-size="${size}" fill="${fill}">${spans}</text>`
}
const sans = (text, x, y, { size = FS, fill = '#1b1f24', anchor = 'start' } = {}) =>
  `<text class="sans" x="${x}" y="${y}" font-size="${size}"${anchor === 'start' ? '' : ` text-anchor="${anchor}"`} fill="${fill}">${esc(text)}</text>`

// Geometry, viewBox 1120 x 540. The side inset is wide enough that each
// layer is visibly narrower than the one around it, which is what gives the
// slide's zoom-out room to move.
const W = 1120, H = 540
const N = { x: 36, y: 36, w: 1048, h: 430 } // outermost layer
const S = 40, T = 70, B = 16
const box = (i) => ({ x: N.x + S * i, y: N.y + T * i, w: N.w - 2 * S * i, h: N.h - (T + B) * i })
// Fills deepen toward the centre in Faculty-of-Arts blue (#4bc8ff) over white
const tint = (a) => `rgb(${Math.round(255 - a * 180)} ${Math.round(255 - a * 55)} 255)`
const alphas = [0, 0.05, 0.1, 0.15, 0.2, 0.28]

// Every example sits on its layer name's baseline and ends on one vertical
// line, the innermost layer's right padding, so the examples read as a single
// right-aligned column. The check uses a generous 0.56em per character for
// Helvetica/Arial so a longer example cannot run into its layer name.
const muniWidth = (text, size) => text.split(' ').reduce((a, w) => a + w.length * 0.7 * size, 0) + (text.split(' ').length - 1) * 0.4 * size
const exampleRight = box(layers.length - 1).x + box(layers.length - 1).w - 22
layers.forEach(([label, example], i) => {
  if (box(i).x + 22 + muniWidth(label, FS) + 24 > exampleRight - example.length * 0.56 * FS) throw new Error(`"${example}" runs into "${label}"; shorten one of them`)
})

const layerSvg = layers.map(([label, example], i) => {
  const b = box(i)
  const inner = i === layers.length - 1
  const baseline = (inner ? b.y + b.h / 2 : b.y + T / 2) + 6.5
  return `<g data-layer="${i}">` +
    `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="14" fill="${tint(alphas[i])}" stroke="#c3d3e4" stroke-width="1.5"/>` +
    muni(label, b.x + 22, baseline, FS, '#0000dc') +
    sans(example, exampleRight, baseline, { anchor: 'end' }) +
    `</g>`
}).join('\n    ')

const style = `<style>
    .muni { font-family: 'Muni', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 700; }
    .sans { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
  </style>`
const panel = `<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="22" fill="#f6f8fb" stroke="#e2e8f0" stroke-width="1.5"/>`
const nestCaption = `<text class="sans" x="${N.x}" y="${N.y + N.h + 38}" font-size="17" fill="#595959">Každá vrstva je součástí té větší</text>`
const title = 'Co se dá prototypovat: vrstvy, které do sebe zapadají'
const desc = 'Pět vnořených vrstev od nejmenší po největší: obsah a texty (úřední dopis) uvnitř obrazovek a dílčích průchodů (dokončení objednávky), ty uvnitř zákaznické cesty (od objednávky po vrácení zboží), cesta ve fyzických prostorech a navigaci (zákaznické centrum úřadu) a to celé v produktové vizi (Knowledge Navigator, Apple 1987).'

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="title desc">
  <title id="title">${title}</title>
  <desc id="desc">${desc}</desc>
  ${style}
  ${panel}
  <!-- the nesting, outermost first so each inner layer draws on top -->
  <g>
    ${layerSvg}
  </g>
  ${nestCaption}
</svg>
`
writeFileSync(ioSvg, svg)
writeFileSync(join(deck, 'public/vrstvy-prototypu.svg'), svg)

// A PNG twice the size next to the IO SVG, for IS MUNI
const chrome = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
if (existsSync(chrome)) {
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--window-size=${W},${H}`, '--force-device-scale-factor=2',
    `--screenshot=${ioSvg.replace(/\.svg$/, '.png')}`, pathToFileURL(ioSvg).href], { stdio: 'ignore' })
}

// Vue component: step 0 shows only the innermost layer, framed large in the
// middle of the panel; each step adds the next layer out and pulls the camera
// back until the whole nesting fills the panel.
const last = layers.length - 1
const view = N // the panel's content area
const maxZoom = 1.6
const fit = (b) => {
  const s = Math.min(view.w / b.w, view.h / b.h, maxZoom)
  return { s, tx: view.x + view.w / 2 - s * (b.x + b.w / 2), ty: view.y + view.h / 2 - s * (b.y + b.h / 2) }
}
const css = ({ s, tx, ty }) => `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${s.toFixed(4)})`
// cameras[step]: step k frames layer ${last}-k, so the last step is the whole nesting
const cam = layers.map((_, k) => css(fit(box(last - k))))
const vueSvg = svg
  .replace(/^<svg ([^>]*) width="\d+" height="\d+"/, '<svg $1 class="vrstvy"')
  .replace('<g>\n', `<g class="nest" :style="{ transform: camera }">\n`)
  .replace(nestCaption, `<g class="layer" :class="{ on: step >= ${last} }">${nestCaption}</g>`)
  .replace(/<g data-layer="(\d)">/g, (_, i) => `<g class="layer" :class="{ on: step >= ${last - Number(i)} }">`)
  .replace(/<style>[\s\S]*?<\/style>/, '')
  // Slidev's UnoCSS attributify mode reads font-size="18" as a utility and
  // sets 4.5rem, so on the slide the size goes in an inline style instead
  .replace(/ font-size="(\d+)"/g, ' style="font-size: $1px"')
const vue = `<!--
  Co se dá prototypovat: the layers diagram, drawn as code and zoomed out one
  layer per click. Generated by diagrams/vrstvy-prototypu.mjs together with
  public/vrstvy-prototypu.svg (the static version the IO chapter uses), so
  both share one geometry - edit the generator, not this file.

  Props:
    step: number   the slide's $clicks (frontmatter clicks: ${last}). 0 shows
                   only the innermost layer, 1-${last} add one layer each and
                   pull the camera back; at ${last} the caption comes in.
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ step?: number }>(), { step: ${last} })

const cameras = ${JSON.stringify(cam, null, 2).replace(/"/g, "'")}
const camera = computed(() => cameras[Math.max(0, Math.min(props.step, ${last}))])
</script>

<template>
  ${vueSvg.trim()}
</template>

<style scoped>
.vrstvy { width: 100%; height: auto; display: block; }
.muni { font-family: 'Muni', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 700; }
.sans { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
.nest { transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1); }
.layer { opacity: 0; transition: opacity 0.5s ease 0.15s; }
.layer.on { opacity: 1; }
</style>
`
writeFileSync(join(deck, 'components/VrstvyPrototypu.vue'), vue)
console.log('vrstvy-prototypu: wrote public/vrstvy-prototypu.svg, components/VrstvyPrototypu.vue and the IO copy')
