// Eleventy config for the v2 site (issue #43). It lives apart from the legacy
// .eleventy.js: input is web/, and nothing here reads pages/ or docs/. (The
// folder is not called site/ because the SITE file at the repo root would
// collide with it on case-insensitive filesystems such as macOS.)
//
//   yarn start:v2     local dev server on _site-v2/
//   yarn build:deploy builds it into _deploy/ when SITE (or PREVIEW_SITE) is v2
//
// English sits at /, Czech at /cs/. Every page carries `lang` and a
// `translationKey`; pages that share a key are translations of each other.

import { HtmlBasePlugin } from '@11ty/eleventy'

// Czech typesetting keeps a one-letter preposition or conjunction on the same
// line as the next word ("Vlna"). Applied to text only, never inside tags.
const VLNA = /(^|[\s(„])([kKsSvVzZoOuUaAiI])\s+(?=\S)/g
const RAW_BLOCK = /<(script|style|pre|code|textarea)\b[\s\S]*?<\/\1>/gi

function vlna(html) {
  const blocks = []
  const masked = html.replace(RAW_BLOCK, (block) => `\u0000${blocks.push(block) - 1}\u0000`)
  const spaced = masked
    .split(/(<[^>]+>)/)
    .map((part) => (part.startsWith('<') ? part : part.replace(VLNA, '$1$2 ')))
    .join('')
  return spaced.replace(/\u0000(\d+)\u0000/g, (_, i) => blocks[i])
}

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin)

  eleventyConfig.addPassthroughCopy({ 'web/css': 'css', 'web/js': 'js', 'web/img': 'img', 'web/documents': 'documents' })

  eleventyConfig.addTransform('vlna', function (content) {
    if (this.page?.lang !== 'cs' && !(this.page?.url || '').startsWith('/cs/')) return content
    if (!(this.page.outputPath || '').endsWith('.html')) return content
    return vlna(content)
  })

  // The page in `lang` that shares `key`, or undefined.
  eleventyConfig.addFilter('translation', (pages, key, lang) =>
    key ? pages.find((p) => p.data.translationKey === key && p.data.lang === lang) : undefined,
  )

  // Writing entries for one language, newest first. An entry is either an
  // article page (same translationKey) or a link-out / not-yet-written item
  // described only in _data/writing.json.
  eleventyConfig.addFilter('writingFor', (pages, lang, entries) =>
    entries
      .map((entry) => {
        const page = pages.find((p) => p.data.translationKey === entry.key && p.data.lang === lang)
        return {
          ...entry,
          title: page ? page.data.title : entry.title?.[lang],
          url: page ? page.url : entry.href?.[lang] ?? entry.href,
          external: !page && Boolean(entry.href),
        }
      })
      .filter((entry) => entry.title)
      .sort((a, b) => b.year - a.year),
  )

  eleventyConfig.addFilter('longDate', (date, lang) =>
    new Date(date).toLocaleDateString(lang === 'cs' ? 'cs-CZ' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
  )
}

export const config = {
  dir: { input: 'web', includes: '_includes', data: '_data' },
  markdownTemplateEngine: 'njk',
  htmlTemplateEngine: 'njk',
  templateFormats: ['md', 'njk'],
}
