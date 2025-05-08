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

### Digest Format
- 10-20 minute read
- 10-20 most interesting topics
- Scannable format with bold key insights
- Links to original articles

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
- Score content based on relevance to my focus areas
- Group related articles by topic
- Select top 10-20 most valuable pieces of content

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

**Structure:**
- AI-assisted summary with bullet points and whitespace for scannability
- Main content sections grouped by topic
- 1-3 paragraph summaries with **bold key insights** for each article
- Product updates in compact release notes format
- Conference section with upcoming events and deadlines (prioritizing European in-person events)
- Related notes section linking to relevant knowledge

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

1. **Never fabricate content** - Only include information that actually exists in the labeled emails
2. **Do not make up articles, conferences, or updates** - If insufficient content exists, note this in the digest
3. **Prioritize European in-person events** - But only if they actually appear in the labeled emails
4. **Verify all information** - Ensure accuracy in summaries and links
5. **When in doubt, exclude** - Better to have a shorter digest than fabricated information

## Digest Template

```markdown
# Newsletter Digest #[N]: [Start Date] to [End Date]

## AI-assisted summary

This week's digest covers key developments in design, AI, and related professional areas:

* **[Key point 1]**
  
* **[Key point 2]**

* **[Key point 3]**

* **[Key point 4]**

* **[Key point 5]**

---

## Design Insights

### [Article Title]
**[Bold key insight or takeaway]** [1-3 paragraph summary with relevant information]
[Read the article](link to original)

### [Article Title]
**[Bold key insight or takeaway]** [1-3 paragraph summary with relevant information]
[Read the article](link to original)

[Additional articles...]

## AI Development

### [Article Title]
**[Bold key insight or takeaway]** [1-3 paragraph summary with relevant information]
[Read the article](link to original)

[Additional articles...]

## Supporting Areas
[Business/Development/Leadership/etc. insights grouped by topic]

## Product Updates
- **[Product A]**: [1-2 sentence update] [Learn more](link)
- **[Product B]**: [1-2 sentence update] [Learn more](link)
- [etc.]

## Upcoming Conferences
- **[Conference Name]**: [Dates] - [Location: European city] - [Brief description] - [Registration deadline] [Learn more](link)
- [etc.]

*Note: Only includes conferences that actually appear in your labeled emails, with priority given to European in-person events.*

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
- Explore adding automatic extraction of knowledge nuggets from digests
- Implement tagging suggestions based on digest content
- Add analytics to track most frequent newsletter sources and topics
