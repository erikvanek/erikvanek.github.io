# Social Media Preview System

## Overview
Comprehensive system for generating rich social media previews when your second brain notes are shared on platforms like Twitter, LinkedIn, Facebook, Discord, Slack, etc.

## Features
- **Rich OpenGraph tags** for Facebook, LinkedIn sharing
- **Twitter Card support** for enhanced Twitter previews  
- **Custom thumbnails** for each note category
- **Automatic meta descriptions** from AI-assisted summaries
- **Proper SEO meta tags** for search engines

## Preview Examples

### When someone shares your note:
**Before:** Plain link with no preview
**After:** Rich preview with:
- ✅ Thumbnail image (1200x630px)
- ✅ Note title
- ✅ Description from AI summary
- ✅ Your branding ("Erik Vaněk")
- ✅ Proper link preview

## Implementation

### 1. Template Integration
The `note.njk` template now includes comprehensive meta tags:

```html
{% raw %}
<!-- OpenGraph Tags -->
<meta property="og:title" content="{{ title }}">
<meta property="og:description" content="{{ description or (content | extractSummary) }}">
<meta property="og:image" content="{{ site.url }}{{ thumbnail }}">
<meta property="og:url" content="{{ site.url }}{{ page.url }}">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ title }}">
<meta name="twitter:description" content="{{ description or (content | extractSummary) }}">
<meta name="twitter:image" content="{{ site.url }}{{ thumbnail }}">
{% endraw %}
```

### 2. Thumbnail System

#### Default Thumbnails
- **Books**: `/img/social/book-note-preview.png` (blue gradient, book emoji)
- **Knowledge**: `/img/social/note-preview.png` (purple gradient, clean design)
- **Custom**: Specify `thumbnail: "/img/social/custom-image.png"` in frontmatter

#### Thumbnail Requirements
- **Size**: 1200px × 630px (optimal for all platforms)
- **Format**: PNG or JPG
- **File size**: < 1MB recommended
- **Safe area**: Keep text within central 1000×500px area

### 3. Frontmatter Configuration

#### Basic Configuration (Automatic)
```yaml
---
title: "How to Speak Machine - Reading Notes"
url_category: "book"  # Uses book-note-preview.png
---
```

#### Custom Thumbnail
```yaml
---
title: "How to Speak Machine - Reading Notes"
thumbnail: "/img/social/how-to-speak-machine-preview.png"
description: "Custom description for social sharing"
---
```

#### Override Description
```yaml
---
title: "Team Effectiveness"
description: "Research-backed insights on building high-performing teams"
---
```

## Thumbnail Generation

### Method 1: HTML Generator (Recommended)
Use the built-in thumbnail generator:

1. **Open**: `Social Media Thumbnail Generator` (artifact above)
2. **Fill in**: Note title and optional description
3. **Select**: Note type (book vs general note)
4. **Generate**: Get HTML code
5. **Screenshot**: Save as 1200×630px image
6. **Upload**: To `/img/social/[note-slug]-preview.png`

### Method 2: Design Tools
- **Canva**: Use 1200×630px template
- **Figma**: Create social media frame
- **Photoshop**: Use Facebook post template

### Method 3: Online Generators
- **Pablo by Buffer**
- **Canva Social Media**
- **RelayThat**

## Processing Workflow Integration

### Book Notes Processing
Add to Step 2 (RAW File Creation):

```bash
# 1. Generate thumbnail (optional)
# Use thumbnail generator or design tool

# 2. Add to frontmatter if custom thumbnail created
thumbnail: "/img/social/how-to-speak-machine-preview.png"

# 3. Default will use book-note-preview.png automatically
```

### Knowledge Notes
For important knowledge notes:

```yaml
---
title: "Team Effectiveness"
description: "Google's research on psychological safety and team performance"
thumbnail: "/img/social/team-effectiveness-preview.png"  # optional
---
```

## 11ty Filters Needed

Add these filters to your `.eleventy.js` configuration:

```javascript
// Extract page title from content
eleventyConfig.addFilter("getPageTitle", function(content) {
    const match = content.match(/<h1[^>]*>(.*?)<\/h1>/);
    return match ? match[1].replace(/<[^>]*>/g, '') : 'Note';
});

// Extract summary from AI-assisted summary section
eleventyConfig.addFilter("extractSummary", function(content) {
    const summaryMatch = content.match(/## AI-assisted [Ss]ummary\s*\n(.*?)\n---/s);
    if (summaryMatch) {
        const summary = summaryMatch[1]
            .replace(/\n/g, ' ')
            .replace(/<[^>]*>/g, '')
            .trim();
        return summary.length > 160 ? summary.substring(0, 157) + '...' : summary;
    }
    return '';
});
```

## Testing Social Previews

### Validation Tools
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Inspector**: https://www.linkedin.com/post-inspector/
- **OpenGraph.xyz**: https://www.opengraph.xyz/

### Testing Process
1. **Publish note** with social meta tags
2. **Test URL** in validation tools
3. **Check preview** appearance
4. **Clear cache** if needed (use ?v=1 parameter)
5. **Share** to verify real-world appearance

## Troubleshooting

### Common Issues
1. **No preview showing**
   - Check OpenGraph tags are present
   - Verify image URLs are absolute
   - Test with validation tools

2. **Image not loading**
   - Ensure 1200×630px dimensions
   - Check file path is correct
   - Verify image is publicly accessible

3. **Description truncated**
   - Keep under 160 characters
   - Test with extractSummary filter
   - Provide custom description if needed

4. **Cache issues**
   - Use platform debugging tools to refresh
   - Add version parameter: `?v=2`
   - Wait 24-48 hours for cache expiry

### Platform-Specific Notes
- **Twitter**: Prefers summary_large_image card type
- **LinkedIn**: Strict about image requirements
- **Facebook**: Caches aggressively (use debugger to refresh)
- **Discord**: Shows previews immediately
- **Slack**: Good preview support with proper meta tags

## Benefits

### Professional Appearance
- ✅ Branded, consistent look across all shares
- ✅ Clear visual hierarchy
- ✅ Professional thumbnail design
- ✅ Proper attribution

### Better Engagement
- ✅ Higher click-through rates with rich previews
- ✅ More social shares due to visual appeal
- ✅ Better discoverability
- ✅ Enhanced credibility

### SEO Benefits
- ✅ Proper meta descriptions
- ✅ Structured data for search engines
- ✅ Canonical URLs
- ✅ Social signals

## Related Notes
- [[Clean URL System]] - Clean URLs for better sharing
- [[Book Notes Extraction]] - Integration with book processing
- [[Inbox processing]] - General note processing workflows

## File Structure
```
/img/social/
├── book-note-preview.png          # Default book thumbnail
├── note-preview.png               # Default knowledge note thumbnail
├── how-to-speak-machine-preview.png  # Custom book thumbnail
└── team-effectiveness-preview.png    # Custom knowledge thumbnail
```

## Examples

### Book Note Preview
```yaml
---
title: "How to Speak Machine - Reading Notes"
url_category: "book"
# Uses /img/social/book-note-preview.png automatically
---
```

**Result**: Rich preview with blue gradient, book icon, and note title

### Custom Thumbnail
```yaml
---
title: "Team Effectiveness" 
thumbnail: "/img/social/team-effectiveness-preview.png"
description: "Research-backed insights on psychological safety and high-performing teams"
---
```

**Result**: Custom designed thumbnail with specific description