---
title: "Claude Prompts for Second Brain"
date_created: 2025-04-01
date_modified: 2025-04-01
tags:
  - SecondBrain
  - System
  - Claude
  - AI
  - Prompts
---

# Claude Prompts for Second Brain System

This document contains standardized prompts to use with Claude for different aspects of your second-brain workflow.

## Core Processing Prompt

Use this prompt to process raw notes into your second-brain structure:

```
# Claude Second-Brain Processing Prompt

## INSTRUCTIONS
Process the attached [NOTE TYPE] according to my second-brain methodology, integrating it properly into my knowledge base.

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
Process this note for my second brain:
[PASTE RAW CONTENT]

Type: [BOOK/PODCAST/WORKSHOP/VIDEO/BRAINDUMP/OTHER]
Context: [ANY ADDITIONAL CONTEXT]
```

## Knowledge Retrieval Prompt

Use this prompt to leverage your second brain for new projects:

```
I'm about to [DESCRIBE PROJECT/TASK] on the topic of [TOPIC].

The context is: [PROVIDE CONTEXT].
My goals are: [LIST GOALS].

Help me compile relevant information from my second brain to kickstart this project. Consider previous knowledge in areas like [RELEVANT DOMAINS].
```

## Reshuffling Assessment Prompt

Use this to evaluate areas of your knowledge base that might need restructuring:

```
I need to assess whether the following area of my second brain needs reshuffling:
[DOMAIN OR AREA]

The current structure is:
[DESCRIBE CURRENT ORGANIZATION]

Some issues I've noticed:
[LIST ANY CONCERNS]

Please analyze whether this needs restructuring, and if so, recommend a specific approach to rebalance this knowledge area.
```

## Template Evaluation Prompt

Use this to review and improve your note templates:

```
I'd like to evaluate and potentially improve this template in my second-brain system:
[PASTE TEMPLATE]

This template is used for: [TEMPLATE PURPOSE]
Issues or limitations I've noticed: [ANY CONCERNS]

Please suggest improvements that would make this template more effective while maintaining simplicity and usability.
```

## Integration Strategy Prompt

When you need help figuring out how to integrate new information:

```
I have new information about [TOPIC] that I need to integrate into my second brain.

Current relevant notes in my system:
[LIST RELATED NOTES]

New information to integrate:
[SUMMARIZE NEW INFORMATION]

How should I integrate this - should I extend existing notes, create new ones, or both? Please suggest a specific integration strategy.
```

## Tag Analysis Prompt

For periodically assessing and optimizing your tagging system:

```
I'd like to analyze my current tagging system in my second brain.

Some of my most used tags include:
[LIST KEY TAGS]

Areas where I struggle to find the right tags:
[DESCRIBE CHALLENGES]

Could you suggest refinements to my tagging approach to improve discoverability while keeping the system intuitive and organic?
```

## Handle Empty Referenced Files

```
The following file is referenced in my second brain but is empty or missing:
[FILE NAME]

Context:
[NOTES THAT REFERENCE THIS FILE]

Please create appropriate content for this file following my second-brain system. The note should:
1. Have proper frontmatter
2. Include relevant content based on how it's referenced
3. Link to related notes
4. Be structured appropriately based on its type
```

## Empty Files Cleanup Prompt

```
After processing notes into my second brain, please identify any empty files that were referenced but not properly filled.

Directory to check: /Users/erik/dev/erikvanek.github.io/pages/notes

Please generate:
1. A list of all empty markdown files in my notes directory
2. A shell command I can run to safely remove these empty files
3. Information about which files reference the empty files so I can ensure proper linking
```

## Update MOC Prompt

```
Update this Map of Content (MOC) to include the following new notes:
[LIST OF NEW NOTES]

Current MOC content:
[PASTE CURRENT MOC]

Make sure to:
1. Add each note in the appropriate section
2. Create new sections if needed
3. Update the "Recent Additions" section
```

## Remember

When using these prompts with Claude:
1. Be specific about what you need
2. Provide sufficient context
3. Mention any relevant existing knowledge 
4. Include special considerations or constraints
5. Adapt the prompts as your system evolves

These prompts are designed to help you maintain a consistent approach to using Claude with your second-brain system.

## Reference
These prompts are based on the original system requirements documented in [[Second-brain-master-prompt]] and have been enhanced based on system refinements tracked in the [[changelog]].
