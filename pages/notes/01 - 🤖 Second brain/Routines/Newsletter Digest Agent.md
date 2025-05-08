---
title: Newsletter Digest Agent
date_created: 2025-05-08
tags:
  - process
  - routine
  - agent
---

# Newsletter Digest Agent

## Purpose
This agent processes newsletter subscriptions from Gmail labels to create a focused digest of professional content aligned with my design-first interests and supporting areas.

## When to Use
- During weekly reviews
- When I need to catch up on industry news
- Before strategic planning sessions
- After returning from time away

## Configuration

### Input Sources
- **Gmail Labels**: 
  - "Blogs" - Main newsletter subscriptions
  - "Product updates" - Product release notes and updates
  - "Konference" - Conference announcements and event information

### Focus Areas (Priority Order)
1. Design (primary focus)
2. AI development
3. Supporting areas:
   - Business
   - Development
   - Leadership
   - Learning
   - Team

## Process

### 1. Initialization
```
claude, create a digest from my newsletter subscriptions since [date of last digest]
```

The agent will:
- Check the Digest-Tracker.md to determine the latest digest number and when it was created
- Set the time range from the last digest date to present
- Collect emails from specified labels within that timeframe

### 2. Email Analysis
The agent will:
- Read all emails with the specified labels
- Extract key excerpts with minimal interpretation
- Group related articles by topic (if applicable)
- Prioritize content based on relevance to focus areas

### 3. Digest Creation
The agent will create a digest with:

**Frontmatter:**
```
---
title: "Newsletter Digest #[N]: [Start Date] to [End Date]"
date_created: YYYY-MM-DD
period_start: YYYY-MM-DD
period_end: YYYY-MM-DD
type: digest
layout: note.njk
permalink: /ephemeron-[N]/
tags:
  - ephemeron
  - digest
  - design
  - ai-development
  - [other relevant tags based on content]
---
```

**Content Structure:**
- Direct excerpts from relevant newsletters with minimal interpretation
- Bold text for key points to enhance scannability
- Links to original sources
- Sections only included when relevant content exists
- Length based on quality and relevance of available content, not timespan

### 4. Email Labeling
After creating the digest, the agent will add the label "claude-digested" to all processed emails to track what has been included.

### 5. Storage
The agent will:
- Save the digest to `/Users/erik/dev/erikvanek.github.io/pages/notes/20 - ✨ Ephemeron/Digest-[N].md` where [N] is the sequential number
- Update the Digest-Tracker.md with the new digest information

## Storage Structure

### Digest Storage
All digests are stored in:
```
/Users/erik/dev/erikvanek.github.io/pages/notes/20 - ✨ Ephemeron/
```

### Tracker File
The agent maintains a tracker file at:
```
/Users/erik/dev/erikvanek.github.io/pages/notes/20 - ✨ Ephemeron/Digest-Tracker.md
```

## Web Access
Digests are accessible through your website at:
```
erikvanek.com/ephemeron-[N]/
```
Where [N] is the sequential number of the digest.

## Important Guidelines

1. **Present direct excerpts** - Minimal interpretation of content
2. **Skip sections without content** - No need to mention when a section is empty
3. **Quality over quantity** - Length based on relevance, not timespan
4. **Include only what exists** - Never fabricate content
5. **Prioritize European events** - For conference listings when available

## Digest Template

```markdown
# Newsletter Digest #[N]: [Start Date] to [End Date]

## Design Insights

### [Article Title]
**[Key excerpt directly from the newsletter]** Additional relevant information with minimal interpretation.
[Read the article](link to original)

### [Article Title]
**[Key excerpt directly from the newsletter]** Additional relevant information with minimal interpretation.
[Read the article](link to original)

[Additional articles as available...]

## AI Development

### [Article Title]
**[Key excerpt directly from the newsletter]** Additional relevant information with minimal interpretation.
[Read the article](link to original)

[Additional articles as available...]

## Supporting Areas
[Business/Development/Leadership/etc. insights from newsletters, grouped by topic if applicable]

## Product Updates
- **[Product A]**: [Direct excerpt about update from newsletter] [Learn more](link)
- **[Product B]**: [Direct excerpt about update from newsletter] [Learn more](link)
- [etc. as available]

## Upcoming Conferences
- **[Conference Name]**: [Dates] - [Location: European city] - [Description from newsletter] - [Registration deadline] [Learn more](link)
- [etc. as available]

## Related notes
- [[Related note 1]]
- [[Related note 2]]
- [[Related note 3]]
- [[Related note 4]]
- [[Related note 5]]
```

## Example Command

```
claude, create a digest from my newsletter subscriptions since April 30, 2025
```

## Future Improvements
- Consider moving to a dedicated "Agents" folder when created
- Implement tagging suggestions based on digest content
- Add analytics to track most frequent newsletter sources and topics
