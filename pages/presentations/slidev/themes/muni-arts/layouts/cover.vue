<!--
  Title-slide layout for MUNI/KISK course decks.

  Content is four fixed lines, all from props (no slide-body markdown needed):
    1. {{ course }} + roman numeral of `session` (e.g. "Service Design Workshop I")
    2. `sessionTitle` - the session's own topic (e.g. "Foundations & framing")
    3. "KISK MUNI" + `date`
    4. `facilitator`

  `sessionTitle` is a prop, not slide-body content, because it's reused
  verbatim as the footer's session line too - one source of truth instead of
  typing the title twice.

  Frontmatter props (all optional):
    course:       string          default "Service Design Workshop"
    session:      number | string e.g. 1 (-> "I" on the heading) - a
                                   non-numeric string (e.g. a demo label)
                                   skips the roman numeral and is shown as-is
                                   in the footer instead
    sessionTitle: string          e.g. "Foundations & framing" - also shown
                                   in the footer in place of "Session I"
    date:         string          e.g. "17 Sep 2026"
    facilitator:  string          default "Erik Vaněk"

  Top-left mark is the real "MUNI ARTS" lockup (see MuniArtsMark.vue for
  where it came from) - not a hand-built approximation.
-->
<script setup lang="ts">
import { computed } from 'vue'
import KiskLogo from '../components/KiskLogo.vue'
import MuniArtsMark from '../components/MuniArtsMark.vue'

const props = withDefaults(
  defineProps<{
    course?: string
    session?: number | string
    sessionTitle?: string
    date?: string
    facilitator?: string
  }>(),
  {
    course: 'Service Design Workshop',
    facilitator: 'Erik Vaněk',
  },
)

function toRoman(n: number): string {
  const table: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ]
  let rest = n
  let out = ''
  for (const [value, symbol] of table) {
    while (rest >= value) {
      out += symbol
      rest -= value
    }
  }
  return out
}

// `session` is a number for real use (-> roman numeral); an arbitrary string
// (e.g. a "Hello world" demo label) is shown as-is instead, numeral-free.
const sessionNumeral = computed(() => {
  if (typeof props.session === 'number') return toRoman(props.session)
  if (typeof props.session === 'string' && /^\d+$/.test(props.session)) return toRoman(Number(props.session))
  return undefined
})

const footerLines = computed(() => {
  const lines: string[] = []
  if (props.sessionTitle) lines.push(props.sessionTitle)
  else if (sessionNumeral.value) lines.push(`Session ${sessionNumeral.value}`)
  else if (typeof props.session === 'string' && props.session) lines.push(props.session)
  if (props.date) lines.push(props.date)
  return lines
})
</script>

<template>
  <div class="slidev-layout cover">
    <header class="cover-header">
      <MuniArtsMark :height="34" />
    </header>

    <div class="cover-body">
      <h1 class="cover-course">{{ sessionNumeral ? `${course} ${sessionNumeral}` : course }}</h1>
      <h2 v-if="sessionTitle" class="cover-session-title">{{ sessionTitle }}</h2>
      <p class="cover-institute">KISK MUNI<template v-if="date">, {{ date }}</template></p>
      <p class="cover-facilitator">{{ facilitator }}</p>
    </div>

    <footer class="cover-footer">
      <KiskLogo :height="40" />
      <span v-if="footerLines.length" class="meta">
        <span v-for="line in footerLines" :key="line" class="meta-line">{{ line }}</span>
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

.cover-course {
  font-size: 3rem;
  margin: 0 0 0.3em;
}

.cover-session-title {
  font-size: 1.6rem;
  margin: 0 0 0.7em;
}

.cover-institute,
.cover-facilitator {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: var(--muni-gray);
  margin: 0;
  /* The cover is an alignment composition: the mark, both headings, these two
     lines and the footer rule all have to sit on one edge. Helvetica's own left
     side bearing is small (measured 1.37px at 17.6px type, 0.078em) but at this
     scale, against a hard rule, it is visible. The headings get the equivalent
     correction theme-wide in base.css; this is the body half of the same idea,
     kept local because 1.4px is not worth chasing inside ordinary content. */
  margin-left: -0.078em;
}

.cover-institute {
  font-size: 1.1rem;
  margin-bottom: 0.2em;
}

.cover-facilitator {
  font-size: 1rem;
}

.cover-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid var(--muni-blue);
  padding: 0.9em 0 0.2em;
}

.meta {
  display: flex;
  flex-direction: column;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 0.9rem;
  line-height: 1.4;
  color: var(--muni-gray);
  text-align: right;
}
</style>
