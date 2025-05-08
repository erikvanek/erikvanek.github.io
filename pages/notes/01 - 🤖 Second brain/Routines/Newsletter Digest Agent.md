---
title: Newsletter Digest Agent
date_created: 2025-05-08
date_updated: 2025-05-08
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

### Content Priorities
- Content from C-level executives of respectable startups/companies
- Content from frequent conference speakers and published authors
- Podcasts with AI company CEOs and leaders
- Product releases and AI industry milestones
- European design events and conferences
- Novel approaches to UX/UI design
- Novel approaches to design leadership
- AI development techniques and applications

### Current Interest Areas
- Design research methodologies and findings
- AI-assisted design tools and approaches
- Design leadership frameworks and practices
- Product management and product trio collaboration models
- Efficient leadership techniques
- Cross-department collaboration strategies

### Content Evaluation Criteria
- **Novelty of ideas** (high priority) - Does the content present fresh perspectives or innovative approaches?
- **Practical applicability** (high priority) - Can the insights be applied to real-world design and leadership challenges?
- **Source reputation** (high priority) - Is the author/speaker a recognized authority in their field?
- **Intellectual depth** (medium priority) - Unless exceptionally insightful
- **Contrarian perspectives** (variable priority) - Higher if from reputable sources like Jakob Nielsen, lower if from less established voices

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
- For newsletters that contain multiple items:
  - Extract individual pieces of content rather than summarizing the entire newsletter
  - Use web_fetch to read the full content of linked articles when possible
  - Evaluate each piece separately based on relevance to focus areas
- Group related articles by topic (if applicable)
- Consolidate multiple entries from the same source into one comprehensive entry
- Prioritize content based on relevance to focus areas and content priorities

### 3. Content Curation & Evaluation
The agent will:
- Perform deep analysis of each potential content item (spending significant time on this step)
- Retrieve and analyze the full text of linked articles using web_fetch when possible
- Apply a rigorous scoring system based on the content evaluation criteria
- Prioritize only the highest-quality content that meets multiple criteria
- Consider the author's credentials and reputation as a strong factor in selection
- Ensure representation from current interest areas
- Select only the most valuable content, even if this means fewer total items
- IMPORTANT: Only include actual content from the emails - never fabricate articles, resources, or links
- Only use the exact links provided in the original newsletters
- Limit creative writing to ONLY the introductory paragraph - all other content should use direct excerpts

### 4. Digest Creation
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
- Each extracted item must have its own "Learn more" link to the original source
- Sections only included when relevant content exists
- Length based on quality and relevance of available content, not timespan
- No general introduction or summary section

### 5. Email Labeling
After creating the digest, the agent will add the label "claude-digested" to all processed emails to track what has been included.

### 6. Storage
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

1. **Extract specific content** - Never summarize entire newsletters; extract and evaluate individual pieces
2. **Fetch full content** - Use web_fetch to retrieve complete article content when evaluating relevance
3. **Provide individual links** - Each content item must have its own "Learn more" link
4. **Consolidate from same source** - Merge multiple entries from the same source into one comprehensive item
5. **Skip sections without content** - No need to mention when a section is empty
6. **Quality over quantity** - Length based on relevance, not timespan
7. **Include only what exists** - Never fabricate content or create fictional resources
8. **Use exact links from source** - Always use the original links from the newsletters
9. **Only use real content** - Only include articles, events, and updates that actually appear in the Gmail emails
10. **Prioritize European events** - For conference listings when available
11. **Omit redundant title** - Do not include the H1 title as it's already in the layout
12. **Rigorously analyze everything** - Spend significant time analyzing all potential content items
13. **Check author credentials** - Research author backgrounds to assess credibility and relevance
14. **Verify content quality** - Read the full content when possible to ensure quality and depth

## Content Analysis Process
When analyzing potential content for inclusion:

1. **Initial screening**:
   - Check the author's credentials and position
   - Evaluate the publishing platform's reputation
   - Assess if the topic aligns with focus areas and current interests

2. **Deep analysis**:
   - Fetch and read the complete content where possible
   - Score the content on:
     * Novelty (1-10)
     * Practical value (1-10)
     * Authority of source (1-10)
     * Relevance to current interests (1-10)
   - Only include content scoring highly in multiple categories

3. **Final selection**:
   - Compare across all analyzed content
   - Select only the highest-quality items
   - Ensure representation across key interest areas
   - Prioritize content from recognized authorities and thought leaders

## Digest Template

```markdown
## Welcome to Ephemeron

This is Ephemeron issue vol. [N] – your weekly distillation of design brilliance, AI innovations, and leadership insights. Today's issue explores [brief overview of main themes in this digest].

[2-3 sentences highlighting key content pieces, mentioning specific articles/insights that stand out].

Ready for a thought-provoking journey through the ideas and innovations shaping our creative landscape? Let's begin.

## Design Insights

### [Article Title]
**[Key excerpt directly from the content]** Additional relevant information with minimal interpretation.
[Learn more](link to original)

### [Another Article Title]
**[Key excerpt directly from the content]** Additional relevant information with minimal interpretation.
[Learn more](link to original)

[Additional articles as available...]

## AI Development

### [Article Title]
**[Key excerpt directly from the content]** Additional relevant information with minimal interpretation.
[Learn more](link to original)

[Additional articles as available...]

## Supporting Areas

### Business
**[Key excerpt directly from the content]** Additional relevant information with minimal interpretation.
[Learn more](link to original)

### Development
**[Key excerpt directly from the content]** Additional relevant information with minimal interpretation.
[Learn more](link to original)

### Leadership
**[Key excerpt directly from the content]** Additional relevant information with minimal interpretation.
[Learn more](link to original)

[etc. as needed for other supporting areas...]

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
- Develop preference learning to improve curation quality over time
