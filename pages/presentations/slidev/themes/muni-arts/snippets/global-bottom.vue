<!--
  Copy this file into the ROOT of each deck project as `global-bottom.vue`
  (e.g. `sdw-26-hello-world/global-bottom.vue`) - Slidev only auto-discovers
  global-top.vue / global-bottom.vue at the project root, not inside a theme
  folder, so this can't be wired up from the theme alone.

  It just renders the theme's own `<CourseProgress />` component (see
  components/CourseProgress.vue) - a hand-rolled progress bar, not the
  `slidev-component-progress` npm addon. That addon was the first thing
  tried here (2026-09-13); it silently renders nothing against this
  Slidev version (@slidev/cli 52.19.1) - its last release (Apr 2024)
  declares a peer dependency on @slidev/client ^0.48.0, and Slidev has
  since moved to a 52.x line, well outside that range. No error, no
  warning, just an empty DOM node. Confirmed via `--dump-dom` on a
  rendered slide (zero matches for "progress" anywhere in the markup).
  Hand-rolling it directly against Slidev's own `useSlideContext()` /
  `$slidev.nav.tocTree` avoids depending on a two-year-stale package for
  something this small - see CourseProgress.vue for the ~40 lines it took.

  One more per-deck step this still depends on: give each real "agenda
  item" slide a single H1 heading, and mark any other H1 that shouldn't
  count (filler content, layout examples) with `hideInToc: true` in that
  slide's own frontmatter - see sdw-26-hello-world for a full worked example.
-->
<template>
  <CourseProgress />
</template>
