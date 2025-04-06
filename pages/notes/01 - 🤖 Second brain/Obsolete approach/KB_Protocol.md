---
title: "Knowledge Base Processing Protocol"
date_created: 2025-04-01
date_modified: 2025-04-01
tags:
  - SecondBrain
  - System
  - Protocol
  - Documentation
  - Claude
  - AI
  - Prompts
  - Meta
  - KB-Protocol
---

# Knowledge Base Processing Protocol

This document serves as the complete standardized protocol for processing new information into the second-brain knowledge management system. It includes both the processing workflow and the standardized Claude prompts for consistent knowledge processing.

## Quick Reference

When asking Claude to process new information, use this standardized command:

```
KB Protocol: Process this [TYPE] note for my second brain:
[PASTE RAW CONTENT]
```

Claude will automatically search for and follow this protocol document when processing your information.

## Processing Workflow

The KB processing workflow follows these key steps:

### 1. RAW Capture
- Identify source type (book, podcast, workshop, video, braindump, etc.)
- Ensure metadata is captured (title, author, date, context)
- Preserve original format in 02-RAW folder by category

### 2. Linearization
- Convert non-linear notes to logical sequence
- Transcribe any audio/images if necessary
- Order scattered thoughts into narrative flow
- Compile into cohesive document

### 3. Restructuring
- Apply logical structure with proper headings
- Ensure content flows naturally
- Add contextual elements where needed
- Create standalone document that reads well

### 4. Chunking
- Break into meaningful thematic sections
- Consider existing knowledge for proper integration
- Label chunks for easy reference
- Prepare for proper knowledge base integration

### 5. Integration
- Preserve raw data in 02-RAW folder
- Place processed content in 03-Knowledge structure
- Create bidirectional links with `[[notation]]`
- Update relevant MOCs (Maps of Content)
- Enrich existing knowledge sections thematically

### 6. Storage & Cleanup
- Apply consistent frontmatter with appropriate tags
- Ensure proper linking structure
- Check for and handle references to empty files
- Add to maintenance log if needed
- Flag any empty referenced files for cleanup

## Output Format

Processed notes will follow this structure:

```md
---
title: "Note Title"
date_created: YYYY-MM-DD
date_modified: YYYY-MM-DD
source: "Original Source"
author: "Author Name"
tags:
  - PrimaryTopic
  - SecondaryTopic
  - ContentType
---

# Note Title

## Key Points
- Main insight 1
- Main insight 2
- Main insight 3

## Topic Section 1
Detailed content with proper formatting...

## Topic Section 2
More detailed content...

## Reflections
Personal insights and reflections on the content...

## Related Notes
- [[Related Note 1]]
- [[Related Note 2]]
- [[Topic MOC]]
```

## Integration Guidelines

When integrating new content with existing knowledge:

1. **Consult Existing Structure**
   - Review related notes in 03-Knowledge
   - Check relevant Maps of Content (MOCs)
   - Note any existing tags that apply

2. **Create Meaningful Connections**
   - Use `[[notation]]` for bidirectional links
   - Place in appropriate domain folders
   - Update MOCs to include new content

3. **Apply Organic Tagging**
   - Use existing tags where appropriate
   - Create new tags only when necessary
   - Maintain flat (non-hierarchical) tag structure

4. **Balance Note Size**
   - Notes should not exceed ~A4 length
   - Split larger content into connected smaller notes
   - Ensure each note has clear thematic focus

## Special Considerations

### For Different Content Types:

- **Book Notes**: Emphasize key concepts, personal reflections, and actionable insights
- **Podcast/Video**: Capture core message, notable quotes, and contextual information
- **Workshop Notes**: Focus on frameworks, exercises, and practical applications
- **Braindump**: Organize stream-of-consciousness into coherent themes

### For Knowledge Domains:

- **Design**: Connect to existing design principles and methodologies
- **Product Management**: Link to relevant frameworks and case studies
- **Software**: Organize by concept, technology, or problem domain
- **Productivity**: Focus on actionable techniques and systems
- **Other Domains**: Maintain domain-specific organization while enabling cross-domain connections

## Maintenance Tasks

After processing, check for:

1. **Empty Referenced Files**
   - Use command: `find /Users/erik/dev/erikvanek.github.io/pages/notes -name "*.md" -size 0 -type f -exec echo {} \;`
   - Either populate or remove empty files

2. **Integration Quality**
   - Verify bidirectional links work properly
   - Ensure MOC updates are complete
   - Check tag consistency

3. **Backlog Updates**
   - Add to the system backlog for items needing further attention
   - Flag any incomplete processing for future review

# Standardized Claude Prompts

This section contains all standardized prompts to use with Claude for different aspects of your second-brain workflow.

## Core Processing Prompt

Use this prompt for comprehensive processing of raw notes:

```
# Claude Second-Brain Processing Prompt

## INSTRUCTIONS
Process the attached [NOTE TYPE] according to my KB Protocol, integrating it properly into my knowledge base.

## SOURCE INFORMATION
- **Type**: [BOOK/PODCAST/WORKSHOP/VIDEO/BRAINDUMP/OTHER]
- **Title**: [TITLE]
- **Author/Creator**: [CREATOR]
- **Date Consumed**: [DATE]
- **Context**: [ANY ADDITIONAL CONTEXT]

## RAW CONTENT
[PASTE RAW CONTENT HERE]

## PROCESSING REQUESTED
[Select processing steps needed]
- [ ] Transcription (for handwritten/audio)
- [ ] Linearization
- [ ] Restructuring
- [ ] Chunking
- [ ] Integration with existing knowledge
- [ ] Tag suggestion
- [ ] All processing steps

## EXISTING KNOWLEDGE CONTEXT
[Optional: mention related notes or areas in your second brain]

## SPECIAL INSTRUCTIONS
[Any specific requirements or focus areas]
```

## Quick Processing Prompt

For more straightforward processing needs:

```
KB Protocol: Process this [TYPE] note for my second brain:
[PASTE RAW CONTENT]
```

## Knowledge Retrieval Prompt

Use this prompt to leverage your second brain for new projects:

```
KB Protocol: Help me retrieve knowledge for a new project:

Project: [DESCRIBE PROJECT/TASK]
Topic: [TOPIC]
Context: [PROVIDE CONTEXT]
Goals: [LIST GOALS]
Relevant domains: [RELEVANT DOMAINS]
```

## Reshuffling Assessment Prompt

Use this to evaluate areas of your knowledge base that might need restructuring:

```
KB Protocol: I need to assess whether this area needs reshuffling:

Domain: [DOMAIN OR AREA]
Current structure: [DESCRIBE CURRENT ORGANIZATION]
Issues: [LIST ANY CONCERNS]
```

## Template Evaluation Prompt

Use this to review and improve your note templates:

```
KB Protocol: Evaluate this template:

Template:
[PASTE TEMPLATE]

Purpose: [TEMPLATE PURPOSE]
Issues: [ANY CONCERNS]
```

## Integration Strategy Prompt

When you need help figuring out how to integrate new information:

```
KB Protocol: Help me integrate new information:

Topic: [TOPIC]
Existing notes: [LIST RELATED NOTES]
New information: [SUMMARIZE NEW INFORMATION]
```

## Tag Analysis Prompt

For periodically assessing and optimizing your tagging system:

```
KB Protocol: Analyze my tagging system:

Current tags: [LIST KEY TAGS]
Tag challenges: [DESCRIBE CHALLENGES]
```

## Handle Empty Referenced Files

```
KB Protocol: Create content for this empty referenced file:

File: [FILE NAME]
References: [NOTES THAT REFERENCE THIS FILE]
```

## Empty Files Cleanup Prompt

```
KB Protocol: Find empty files in my second brain.
Directory: /Users/erik/dev/erikvanek.github.io/pages/notes
```

## Update MOC Prompt

```
KB Protocol: Update this Map of Content:

New notes: [LIST OF NEW NOTES]
Current MOC: [PASTE CURRENT MOC]
```

## Best Practices for Claude Interaction

When using these prompts with Claude:
1. Always start with "KB Protocol:" for consistent recognition
2. Be specific about what you need
3. Provide sufficient context
4. Mention any relevant existing knowledge 
5. Include special considerations or constraints
6. Adapt the prompts as your system evolves

## Reference

This protocol implements the system described in:
- [[Master_Prompt]]
- [[Guide]]
- [[Workflow]]

For a history of system improvements, see:
- [[Changelog]]
- [[01 - 🤖 Second brain/Obsolete approach/Backlog]]
