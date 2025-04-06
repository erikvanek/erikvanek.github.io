---
title: "Second Brain System Guide"
date_created: 2025-04-01
date_modified: 2025-04-01
tags:
  - SecondBrain
  - System
  - Documentation
---

# Second Brain System Guide

## Overview & Goals

This document outlines the comprehensive second-brain knowledge management system implemented in Obsidian. The system has been designed to help you:

- Be prepared with 80% of the knowledge you need when starting new projects or initiatives
- Leverage your previously gathered knowledge effectively
- Learn from your past experiences and incorporate those learnings systematically
- Create a neuron-like knowledge structure that grows organically

## Core Domains
The knowledge base covers several key domains:
- Design
- Productivity
- Product Management
- Software
- Cooking and Fermentation
- Biking
- Other emerging topics

## Folder Structure

```
📂 Second-Brain/
│
├── 📂 00-Inbox/                       # Capture zone for raw inputs
│   ├── 📂 Audio/                      # Audio recordings awaiting processing
│   ├── 📂 Images/                     # Photos of handwritten notes, diagrams, etc.
│   ├── 📂 BrainDump/                  # Quick thoughts and ideas
│   └── 📂 Imported/                   # Content imported from other sources
│
├── 📂 01-Processing/                  # Temporary workspace for in-progress notes
│   ├── 📂 Linearized/                 # Step 2 outputs
│   ├── 📂 Restructured/               # Step 3 outputs
│   ├── 📂 Chunked/                    # Step 4 outputs
│   └── 📄 processing-log.md           # Track what's being processed
│
├── 📂 02-RAW/                         # Archive of original unprocessed materials
│   ├── 📂 Books/
│   ├── 📂 Podcasts/
│   ├── 📂 Workshops/
│   ├── 📂 Lectures/
│   └── 📂 Other/
│
├── 📂 03-Knowledge/                   # Your organized knowledge base
│   ├── 📂 Design/
│   ├── 📂 ProductManagement/
│   ├── 📂 Research/
│   ├── 📂 Productivity/
│   ├── 📂 Learning/
│   └── 📂 [Other domains]
│
├── 📂 04-Projects/                    # Project-specific knowledge
│   ├── 📂 Active/
│   └── 📂 Archived/
│
├── 📂 05-Templates/                   # Templates for different note types
│
└── 📂 06-System/                      # Second-brain documentation and tools
    ├── 📄 processing-guide.md         # Documentation of your process
    ├── 📄 tagging-system.md           # Tag taxonomy and guidelines
    ├── 📄 claude-prompts.md           # Collection of standardized Claude prompts
    └── 📄 maintenance-log.md          # Record of reshuffling activities
```

## Processing Workflow

The second-brain process follows two main phases, as you originally outlined. Each phase has been refined through experience and feedback (see [[Changelog]] for details):

### 1. Processing (for new information)

1. **RAW** - Capture raw data from various formats:
   - Notes exported from Obsidian as PDF
   - Paper notes from books (photos of handwritten notes)
   - Digital notes (from Google Drive or directly in Obsidian)
   - Recorded audio notes (from podcasts or other sources)
   - Images (usually handwritten notes from workshops)
   - Each format has a minimal template for consistent capture

2. **Linearize** - Convert non-linear content to a logical sequence:
   - Transcribe audio/images
   - Order scattered thoughts
   - Create clear narrative flow from various inputs
   - Compile into one large file for further processing

3. **Restructure** - Organize into a cohesive document:
   - Apply logical structure
   - Add headings and sections
   - Ensure completeness
   - Create a standalone record that reads well

4. **Chunk** - Break into meaningful thematic sections:
   - Identify distinct concepts
   - Create meaningful divisions (can be a single bullet point or larger paragraph)
   - Consult existing knowledge base to understand integration points
   - Prepare for proper integration

5. **Integrate** - Connect with existing knowledge:
   - Persist raw data in 02-RAW (for future restructuring if needed)
   - Place processed content in 03-Knowledge
   - Create bidirectional links with `[[notation]]`
   - Update relevant MOCs (Maps of Content)
   - Enrich parts of the knowledge base thematically

6. **Store** - Finalize placement in knowledge base:
   - Apply consistent frontmatter
   - Add appropriate tags in frontmatter
   - Ensure proper linking
   - Check for and handle references to empty files
   - Identify any empty files created during processing for cleanup

### 2. Reshuffling (periodic maintenance)

1. **Reconciliation** - Rebalance knowledge structure:
   - Split large notes into smaller ones
   - Combine related small notes
   - Maintain optimal note size (not longer than ~A4)
   - Identify nodes that would benefit from restructuring
   - Prioritize areas that need rebalancing

2. **Template Revision** - Update structural elements:
   - Review and improve templates
   - Assess if RAW data templates have relevant categories
   - Suggest alternative structures if needed
   - Refine tagging approach
   - Enhance information architecture

## Expected Data Sources

The system is designed to process information from various events:
- Books (usually handwritten notes)
- Podcasts (digital notes, audio recordings, or transcripts)
- YouTube videos (digital notes)
- Workshops or interviews (schedules, transcriptions, debrief notes)
- Lectures (digital or paper notes)

## Templates

Templates are stored in the 05-Templates folder and include formats for:
- Book notes
- Meeting/workshop notes (with enhanced reflection sections)
- Research notes
- BrainDump quick capture
- Project notes
- MOC (Map of Content) notes
- Knowledge notes

## Tagging Approach

The tagging system uses simple, descriptive tags without hierarchies, growing organically as the knowledge base expands. Tags are stored in the frontmatter of notes.

Tags should:
- Be meaningful and focused on content retrieval
- Grow naturally from your content rather than following a rigid hierarchy
- Help connect related concepts across different domains

## Obsidian-Specific Features
- Use `[[notation]]` for connecting nodes (but not in frontmatter)
- Leverage Maps of Content (MOCs) as entry points to knowledge domains
- Store tags in frontmatter
- Maintain a special folder for random braindumps

## Claude Processing

To process notes with Claude:

1. Use one of these standardized command formats (detailed in [[KB_Protocol]]):
```
# Full Processing Command
Process this according to my KB Protocol:
[PASTE RAW CONTENT]

Type: [BOOK/PODCAST/WORKSHOP/VIDEO/BRAINDUMP/OTHER]
Context: [ANY ADDITIONAL CONTEXT]
```

```
# Quick Reference Command
KB Protocol: Process this [TYPE] note for my second brain:
[PASTE RAW CONTENT]
```

2. Claude will:
   - Analyze the content
   - Linearize if needed
   - Restructure into logical sections
   - Chunk content appropriately
   - Suggest integration points
   - Format for Obsidian with proper syntax
   - Move "related" items from frontmatter to a dedicated "Related Notes" section with proper Obsidian links

## Maintenance Practices

- Regular inbox processing (daily/weekly)
- Periodic review of knowledge structure (monthly/quarterly)
- Template and system updates as needed
- Ongoing refinement of tagging approach
- Cleanup of empty referenced files (command provided below)

## Cleanup Commands

### Finding and Removing Empty Files

After processing notes, you may end up with empty files that were referenced but not properly filled. Use this command in your terminal to find and remove all empty files in your notes directory:

```bash
# Find all empty markdown files in the notes directory
find /Users/erik/dev/erikvanek.github.io/pages/notes -name "*.md" -size 0 -type f -exec echo {} \;

# To remove them (uncomment when ready):
# find /Users/erik/dev/erikvanek.github.io/pages/notes -name "*.md" -size 0 -type f -delete
```

Always review the list of files before removing them by running the echo command first.

## Desired Outcomes

The ultimate goal of this system is to:
- Maximize the amount of use-cases where you have 80% prepared knowledge
- Particularly valuable when preparing workshops, conducting research, compiling insights, or developing personas
- Create a balanced knowledge graph with appropriately sized nodes
- Build a connective tissue between nodes through a solid tagging mechanism
- Separate raw data from processed insights while maintaining access to both

Remember: This is a living system that will evolve as your knowledge and needs change. Regular use and refinement will make it increasingly valuable over time.

## Reference
For the complete original vision and requirements of this system, see the [[Master_Prompt]].

For standardized processing instructions and all Claude prompts, see the [[KB_Protocol]].

For pending improvements and tasks, see the [[01 - 🤖 Second brain/Obsolete approach/Backlog]].

For a record of all modifications and improvements to the system, see the [[Changelog]].
