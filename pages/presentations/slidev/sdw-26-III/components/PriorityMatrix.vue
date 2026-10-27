<!--
  Prioritizační matice 2x2 pro slidy Impact a effort, Eisenhower a Vyberte si matici.

  Props:
    kind     'impact' | 'eisenhower'
    mode     'static' (výchozí): vždy svítí jen vítězné pole
             'both': vždy svítí vítězné i druhé dobré pole (světlejší modrá, čárkovaný rámeček), bez animace
    Obě osy jdou vždy zleva doprava a zdola nahoru od minus k plus.
             'reveal': dokud step < 1, jsou všechna pole v základní barvě, po kliknutí
                       se rozsvítí vítězné pole (nejsytější modrá) a druhé dobré (světlejší)
    step     $clicks slidu, jen pro mode 'reveal'
    compact  nižší pole, pro slide se dvěma maticemi vedle sebe
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ kind: 'impact' | 'eisenhower'; mode?: 'static' | 'reveal' | 'both'; step?: number; compact?: boolean }>(),
  { mode: 'static', step: 0, compact: false }
)

type Cell = { label: string; hint: string; level: 0 | 1 | 2 }

// Mřížka jde po řádcích: vlevo nahoře, vpravo nahoře, vlevo dole, vpravo dole.
const presets = {
  impact: {
    yAxis: 'impact',
    xAxis: 'effort',
    cells: [
      { label: 'Quick wins', hint: 'velký dopad, malé úsilí', level: 2 },
      { label: 'Big bets', hint: 'velký dopad, velké úsilí', level: 1 },
      { label: 'Fill-ins', hint: 'malý dopad, malé úsilí', level: 0 },
      { label: 'Time sinks', hint: 'malý dopad, velké úsilí', level: 0 }
    ] as Cell[]
  },
  eisenhower: {
    yAxis: 'importance',
    xAxis: 'urgency',
    cells: [
      { label: 'Schedule', hint: 'důležité, nenaléhavé', level: 1 },
      { label: 'Do', hint: 'důležité, naléhavé', level: 2 },
      { label: 'Delete', hint: 'nedůležité, nenaléhavé', level: 0 },
      { label: 'Delegate', hint: 'nedůležité, naléhavé', level: 0 }
    ] as Cell[]
  }
}

const preset = computed(() => presets[props.kind])
const lit = computed(() => {
  if (props.mode === 'static') return 'best'
  if (props.mode === 'both') return 'both'
  return props.step >= 1 ? 'both' : 'none'
})

function cls(c: Cell) {
  if (lit.value === 'none') return ''
  if (c.level === 2) return 'bright'
  return lit.value === 'both' && c.level === 1 ? 'mild' : ''
}
</script>

<template>
  <div class="pm" :class="{ compact }">
    <div class="plot">
      <div class="axis y"></div>
      <div class="axis x"></div>
      <span class="sign y-hi">+</span>
      <span class="sign y-lo">&minus;</span>
      <span class="sign x-lo">&minus;</span>
      <span class="sign x-hi">+</span>
      <div class="grid">
        <div v-for="c in preset.cells" :key="c.label" class="cell" :class="cls(c)">
          <strong>{{ c.label }}</strong>
          <small>{{ c.hint }}</small>
        </div>
      </div>
      <div class="axis-name y-name">{{ preset.yAxis }}</div>
      <div class="axis-name x-name">{{ preset.xAxis }}</div>
    </div>
  </div>
</template>

<style scoped>
.pm {
  --axis: var(--muni-arts-blue, #4bc8ff);
  --base: #f1f6fc;
  --mild: #a3e0fd;
  --bright: var(--muni-arts-blue, #4bc8ff);
  --lo: #8fcff2;
  --hi: #0a9be8;
  --gap: 2.8rem;
  width: 100%;
  max-width: 24rem;
  margin: 0 auto;
}
/* Detailní slidy mají o 20 % víc místa než dvojice vedle sebe */
.pm:not(.compact) {
  max-width: none;
  width: calc(100% + 2.5rem);
  margin: 0 -2.5rem 0 0;
  font-size: 1.3em;
}
.pm:not(.compact) {
  --gap: 3.6rem;
}
.pm:not(.compact) .cell {
  height: 9.2rem;
}
/* Popisky v polích na detailních slidech: při velkém písmu matice působily vedle
   pole předimenzovaně. */
.pm:not(.compact) .cell strong {
  font-size: 0.85em;
}
.pm:not(.compact) .cell small {
  font-size: 0.62em;
}
/* Název osy sedí přímo na ose, v mezeře mezi poli, takže je jasné, ke které patří */
.axis-name {
  position: absolute;
  z-index: 1;
  font-size: 0.7em;
  line-height: 1;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--muni-gray, #595959);
  background: #fff;
  padding: 0.05em 0.4em;
  white-space: nowrap;
}
.axis-name.x-name {
  right: 1.9rem;
  top: 50%;
  transform: translateY(-50%);
}
.axis-name.y-name {
  left: 50%;
  top: 1.9rem;
  writing-mode: vertical-rl;
  padding: 0.4em 0.05em;
  transform: translateX(-50%) rotate(180deg);
}
.plot {
  position: relative;
  padding: 1.3rem 1.4rem;
}
.axis {
  position: absolute;
}
.axis.y {
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  transform: translateX(-50%);
  background: linear-gradient(to top, var(--lo), var(--hi));
}
.axis.x {
  left: 0;
  right: 0;
  top: 50%;
  height: 3px;
  transform: translateY(-50%);
  background: linear-gradient(to right, var(--lo), var(--hi));
}
.axis::before,
.axis::after {
  content: '';
  position: absolute;
  width: 0.7rem;
  height: 0.7rem;
  border-style: solid;
  border-color: var(--hi);
  border-width: 3px 3px 0 0;
}
.axis.y::after,
.axis.x::before {
  border-color: var(--lo);
}
/* Znaménka sedí v prázdném okraji grafu, mimo pole i mimo hroty šipek, a mají přesně
   barvu konce osy, u kterého stojí (--lo a --hi). Svislý okraj plotu je vyšší než znaménko. */
.sign {
  position: absolute;
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1;
}
.sign.y-hi,
.sign.y-lo {
  left: calc(50% + 0.9rem);
}
.sign.y-hi { top: 0; color: var(--hi); }
.sign.y-lo { bottom: 0; color: var(--lo); }
.sign.x-lo,
.sign.x-hi {
  bottom: calc(50% + 0.7rem);
}
.sign.x-lo { left: 0.2rem; color: var(--lo); }
.sign.x-hi { right: 0.2rem; color: var(--hi); }
.axis.y::before {
  top: 0;
  left: 50%;
  transform: translate(-50%, 0) rotate(-45deg);
}
.axis.y::after {
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0) rotate(135deg);
}
.axis.x::before {
  left: 0;
  top: 50%;
  transform: translate(0, -50%) rotate(225deg);
}
.axis.x::after {
  right: 0;
  top: 50%;
  transform: translate(0, -50%) rotate(45deg);
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap);
}
.cell {
  height: 7.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  text-align: center;
  padding: 0.4rem;
  border-radius: 0.6rem;
  background: var(--base);
  border: 3px solid transparent;
  box-shadow: inset 0 0 0 1px #dbe6f2;
  transition: background-color 0.9s ease, border-color 0.9s ease, box-shadow 0.9s ease;
}
.pm.compact { max-width: none; --gap: 1.6rem; }
.compact .plot { padding: 1.1rem 1.2rem; }
.compact .cell {
  height: 5.7rem;
}
.compact .cell strong {
  font-size: 0.92em;
}
/* Podtitulek v poli je důležitý, proto je vidět i ve dvojici matic. Písmo je o chlup
   menší než odrážky plusů a minusů pod maticemi (0,72em), ať je pod nimi pořadí čitelné. */
.compact .cell small {
  font-size: 0.65em;
  line-height: 1.15;
}
.cell strong {
  font-size: 1.1em;
}
.cell small {
  font-size: 0.78em;
  color: var(--muni-gray, #595959);
}
.cell.mild {
  background: var(--mild);
  border: 3px dashed var(--hi);
  box-shadow: none;
}
.cell.bright {
  background: linear-gradient(135deg, #3fc1fb, #86dcff);
  /* Gradient přes celý rámeček. Jinak se pod průhledným okrajem opakuje další
     dlaždice gradientu a po horní a dolní hraně pole vznikne druhá čára. */
  background-origin: border-box;
  border-color: transparent;
  box-shadow: 0 6px 16px rgba(75, 200, 255, 0.4);
}
.cell.bright small {
  color: #1b1f24;
}
</style>
