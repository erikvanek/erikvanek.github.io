# Feedback & Progress Tracker
Date: 2026-01-26

## Feedback Summary

### Critical Issues
1. **Cards not visible without scrolling** - Main content should contain at most 60% of the width of the site
2. **Spacing too large** - Space between 'Průvodce před nástupem do výkonu trestu' and 'Dostal(a) jsi rozsudek a nevíš co dělat?' is unnecessary
3. **SOS section misrepresented** - 'Potřebuješ pomoct hned' should be a footer/disclaimer/SOS button, not presented as a card

### Styling Improvements
4. **Card padding** - Cut inner padding by half
5. **Card corners** - Add rounded corners (4px)
6. **Emoji placement** - Emojis should be part of headings, not on separate line
7. **Hover effect missing** - 'Pro odborníky' card should have blue border on hover
8. **Checklist padding** - Reduce padding to half the size

### Inspirations & Considerations
9. **Typography & whitespace** - Inspire from Linear's landing page approach
10. **Navigation** - Consider adding top-level navigation (especially for checklists)
11. **CSS organization** - Split shared CSS file into several files for more efficient changes

### Markup Flexibility
12. **Don't be afraid to change markup** - Index page structure can be modified

---

## Progress Tracking

### ✅ Completed
1. ✅ **Card padding reduced by half** - Changed from 40px to 20px for tool-card and checklist-link
2. ✅ **Checklist item padding reduced by half** - Changed from 24px to 12px
3. ✅ **Added 4px rounded corners** - Applied to .tool-card, .checklist-link (not crisis - it's now a banner)
4. ✅ **Emojis moved inline with headings** - Removed .tool-icon spans, emojis now part of h3 text
5. ✅ **Blue border hover for 'Pro odborníky' card** - Added hover state with primary color border
6. ✅ **Redesigned crisis section as SOS banner** - Moved outside nav, banner style with top/bottom borders, extends to edges
7. ✅ **Aggressive spacing reduction** - Reduced header padding, subtitle font size, intro margins, line-height, card gaps, h3 margins to make cards visible without scrolling
8. ✅ **Typography improvements (Linear-inspired)** - Added tighter letter-spacing to headings, refined line-heights, improved visual hierarchy with better font weights
9. ✅ **Navigation implementation** - Added sticky top navigation bar to all pages with link back to home, minimal and clean design
10. ✅ **CSS file splitting (prepared)** - Created modular CSS files (base.css, layout.css, components.css) for better organization. Files are ready for implementation when needed.
11. ✅ **Responsive width fix** - Changed from fixed 60% to responsive widths (100% mobile → 90% tablet → 80% laptop → 70% desktop → 60% large screens) for better mid-sized viewport support

### 🔄 In Progress
- (none yet)

### ⏳ To Do
1. [x] Reduce main content width to max 60% - Done with responsive width approach in #11 (adaptive based on viewport)
2. [x] Reduce spacing between title and main heading - Done with aggressive spacing reduction in #7
3. [x] Cut card inner padding by half
4. [x] Add 4px rounded corners to cards
5. [x] Move emojis inline with headings
6. [x] Redesign 'Potřebuješ pomoct hned' as footer/SOS element
7. [x] Add blue border hover effect to 'Pro odborníky' card
8. [x] Reduce checklist padding by half
9. [x] Consider navigation implementation
10. [x] Consider splitting CSS files
11. [x] Review typography/whitespace inspired by Linear

---

## Notes
- Working one change at a time with approval
- Session may need continuation due to credit limits

### CSS File Organization (Ready for Implementation)
Three modular CSS files have been created in `shared/` folder:
- **base.css**: Variables, reset, typography foundation
- **layout.css**: Page structure, navigation, header, footer
- **components.css**: Reusable UI components (cards, buttons, info boxes)

To implement, update HTML files to include:
```html
<link rel="stylesheet" href="../shared/base.css">
<link rel="stylesheet" href="../shared/layout.css">
<link rel="stylesheet" href="../shared/components.css">
```

Current single-file approach (styles.css) is still in use and working.
