// Runs on the English home page only. A first-time visitor whose browser
// prefers Czech (or Slovak) goes to the Czech home page; once someone picks a
// language with the switch, that choice wins on every later visit.
;(() => {
  const script = document.currentScript
  if (script.dataset.lang !== 'en') return

  let saved = null
  try {
    saved = localStorage.getItem('lang')
  } catch {}

  const preferred = (navigator.languages || [navigator.language || ''])
    .map((tag) => tag.toLowerCase())
    .find((tag) => /^(en|cs|sk)\b/.test(tag))
  const wantsCzech = saved ? saved === 'cs' : Boolean(preferred) && !preferred.startsWith('en')

  // The Czech home URL is already rebased onto the preview prefix by Eleventy.
  if (wantsCzech) location.replace(script.dataset.cs)
})()
