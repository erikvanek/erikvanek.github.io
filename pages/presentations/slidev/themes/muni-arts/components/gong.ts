// The gong ActivityTimer.vue plays once when a step reaches zero.
//
// Synthesised with the Web Audio API rather than shipped as a sound file: the
// deck has to work with no network (pwa is off, the room may have no wifi), and
// a generated tone carries no licence or attribution to track. The shape is a
// few inharmonic partials with long exponential decays - the thing that makes a
// struck metal plate read as a gong rather than a beep - kept soft on purpose:
// one strike at moderate volume, never an alarm, because a sudden loud sound
// lands hardest on students with sensory sensitivities (SDW-26 backlog 032).
//
// Browsers only let a page make sound after a user gesture. The clicker press
// that starts a step is that gesture, so primeAudio() is called from there, and
// the gong itself can then fire minutes later from a timer.

let ctx: AudioContext | null = null

function audio(): AudioContext | null {
  if (typeof window === 'undefined' || !('AudioContext' in window))
    return null
  ctx ??= new AudioContext()
  if (ctx.state === 'suspended')
    void ctx.resume()
  return ctx
}

export function primeAudio(): void {
  audio()
}

const BASE_HZ = 196 // G3: low enough to feel like a gong, high enough for laptop speakers
const PARTIALS = [
  { ratio: 1, gain: 0.5, decay: 4.5 },
  { ratio: 1.52, gain: 0.22, decay: 3.2 },
  { ratio: 2.76, gain: 0.16, decay: 2.2 },
  { ratio: 4.07, gain: 0.07, decay: 1.4 },
]

export function playGong(volume = 0.35): void {
  const a = audio()
  if (!a)
    return
  const t = a.currentTime
  const master = a.createGain()
  master.gain.value = volume
  master.connect(a.destination)
  for (const p of PARTIALS) {
    const osc = a.createOscillator()
    const env = a.createGain()
    osc.type = 'sine'
    osc.frequency.value = BASE_HZ * p.ratio
    // Soft 15 ms attack so the strike has no click, then a long ring-out.
    env.gain.setValueAtTime(0.0001, t)
    env.gain.exponentialRampToValueAtTime(p.gain, t + 0.015)
    env.gain.exponentialRampToValueAtTime(0.0001, t + p.decay)
    osc.connect(env).connect(master)
    osc.start(t)
    osc.stop(t + p.decay + 0.05)
  }
}
