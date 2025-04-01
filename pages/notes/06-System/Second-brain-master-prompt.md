---
title: "Second Brain Master Prompt"
date_created: 2025-04-01
date_modified: 2025-04-01
tags:
  - SecondBrain
  - System
  - Documentation
  - Prompt
---

# Second Brain Master Prompt

This document preserves the original instructions and vision for the second-brain system. Reference this document when working with Claude to ensure consistency with the original system design.

## Original Instructions

I'm a Claude user for quite some time - maybe a year.

Now I want to extend its usage to power my second-brain efforts. My main goal is to have a knowledge base that can be used to be prepared from mythical 80% everytime there's a new project kickoff or initiative. It should a) consider the knowledge I have already gathered and most importantly b) reflect my previous learnings

I store my notes in Obsidian vault that I version also on Github. I have some parts of my knowledge base on Google Drive. Google Drive should serve only as a source for possible new knowledge to my second brain but it is not a place where to look for data. The data powering second brain is only in Obsidian.

I imagine my second-brain process to have two key phases and each of them is split into several steps. First phase is raw data processing, second phase is reshuffling and proper integration into existing knowledge base.

# Processing
Consists of 6 steps
1. RAW - gather raw data from various formats. Currently I can envision these formats:
	- Notes exported from obsidian as a PDF
	- Paper notes from books that are photos of handwritten notes that need transcription before further processing
	- Digital notes - either in a Google drive or in Obsidian directly
		- It would be nice to have a one "dump" file where I just drop whatever I have on my mind in Obsidian and then the processing can handle it as needed
	- Recorded audio notes from a podcast or something
	- Image - most probabaly of hand-written notes from a workshop or something
- each of those formats should have pretty minimal template that you can use for storing those records so that they are the same or at least similar

Events from which I expect to get data from:
	- Book - usually hand-written notes
	- Podcast - usually digital notes or audio recording or its transcript
	- Youtube - most probably digital notes
	- Workshop or an interview - schedule of the event, transcription or and or debrief notes
	- Lecture - notes - digital or on paper

Source of data will be described - or Claude should ask for better description if needed - so that you know what you're working with

2. Linearize
	- I expect then to linearize notes once you understood them into one large file
		- 
3. Restructure
	- Give my notes logical structure so that they are cohesive and can read well as a standalone record if needed

4. Chunk
	- Chunk data into meaningful thematical chunks (can be a one bullet-point, can be a large paragraph - really depends on the context and content) - I suggest heavily consulting existing content of my knowledge base before this splitting so that you know what is already there and what might be enriched with what

5. Integrate
	- Persist my data in two ways a] persist RAW nuggets from step nr. 1 (RAW) - I want to be able to retrieve original data with no additional processing in case I need to restructure in future, b] enrich parts of my knowledge base with previously broken down chunks thematically so that my knowledge base graph and neuron-like structure grows organically and systematically

6. Store
	- yeah basically store Raw data and enriched data in Obsidian

# Reshuffling
Every once in a while I might want to "rebalance" or "reshuffle" my knowledge base. To split big chunks into smaller, maybe join some small nodes together as the amount of knowledge increases. Somehow I imagine this operation something like what resharper can help us achieve when refactoring large C# codebase. I expect you to first go through the whole knowledge base to identify which nodes would benefit from such operation and then prioritize where it would really make sense. 

I imagine this phase in 2 steps
1. Reconciliation - that's basically that rebalancing I described in # Reshuffling. The key is to have a balanced knowledge graph ideally where no nodes are long as a week and that does not have tons of tiny small notes as well

2. Template re-thinking
Do existing templates for storing RAW data have relevant categories and sections? If not, feel free to suggest alternative structures.

# Other features
1. Let's have a special folder in Obsidian for random braindumps
2. Document the process rigorously somewhere in my knowledge base so that I can easily point to it any time I need to process something and tell me how to "call" the processing the easiest way - something similar to as if I was to call a programming function
3. Be sure to separate process for data processing and for reshuffling
4. Goal - maximize the amount of use-cases and situations when I can have 80% prepared thanks to my second brain knowledge - typically when preparing a workshop, conducting research, compiling insights or personas
5. We're going to test out the process on some old notes I have not processed yet
6. Be sure to include solid tagging mechanism - and really think about it deeply how to structure it well - I can imagine the tagging mechanism is the proper connective tissue between individual nodes
7. Be sure to use Obsidian's `[[notation]]` for connecting nodes together
8. I'm giving you to illustrations that might support what is my goal

# Topics to cover
- Design
- Productivity 
- Product management
- Software
- Cooking and fermentation
- Biking

# Initial feedback and refinements

- Don't use hierarchical tag structure with prefixes; let tags grow organically
- Don't use `[[notation]]` in frontmatter, only plain text
- For meeting/workshop templates, include strong reflective elements
- For note granularity, notes shouldn't be longer than A4
- Workshop templates shouldn't store participant information
- Related notes should be moved from frontmatter to a dedicated "Related Notes" section with proper Obsidian links

## Usage Instructions

When working with Claude on second-brain tasks, refer to this document to ensure adherence to the original vision. This document should be referenced in all system documentation to maintain consistency across the knowledge management system.

For specific implementation details, see:
- [[second-brain-guide]]
- [[second-brain-workflow]]
- [[claude-prompts]]
- [[changelog]]

