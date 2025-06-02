# Second Brain Changelog

All notable changes to the note processing system will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [2025-06-01] - PKM Enhancement Initiative

### ✨ Added
- **PKM Improvements Backlog**: Systematic improvement plan based on best practices research
- **Three Implementation Guides**: Detailed step-by-step improvements for design practice
- **Project Knowledge Maps**: Pre-project routine linking past insights to current challenges
- **Learning Loops Enhancement**: System to convert project insights into professional growth
- **Discovery Triggers System**: Structured serendipity for cross-domain innovation

### 📝 Changed
- **Weekly Review Integration**: Added PKM improvement progress tracking
- **Weekly Planning Integration**: Added time blocks for improvement implementation
- **Project Workflow Enhancement**: Integration points with existing project planning

### 🛠️ Technical Details

#### Implementation Strategy
- **Phase 1 (Weeks 1-4)**: Project Knowledge Maps - immediate impact, low effort
- **Phase 2 (Weeks 5-8)**: Learning Loops - medium effort, long-term growth
- **Phase 3 (Weeks 9-12)**: Discovery Triggers - experimental, creativity enhancement

#### Integration Points
- **Builds on**: Existing [[Process reflection]] and project planning workflows
- **Enhances**: [[Weekly review]], [[Weekly planning]], [[Newsletter Digest Agent]]
- **Creates**: New knowledge-to-action bridges for design practice

#### Success Metrics
- **Short-term**: Faster project startup, systematic insight capture
- **Medium-term**: Improved project quality, regular thought leadership content
- **Long-term**: Industry recognition, client attraction through expertise

### 🚀 Usage

#### Quick Start
```
Start with [[PKM Improvement 1 - Project Knowledge Maps]]
→ Create template in Templates folder
→ Apply to next new project
→ Refine based on experience
```

#### Progress Tracking
- Monthly: Review [[PKM Improvements Backlog]] progress
- Quarterly: Evaluate overall impact and plan next improvements
- Semi-annually: Conduct full PKM system assessment

## [2025-06-01] - Note Processing System Overhaul

### 🔧 Fixed
- **Invalid "Related Notes" Links**: System was generating links to non-existent notes or forbidden folders
- **Missing AI Summaries**: Updated notes exceeding 1500 characters weren't getting AI-assisted reviews

### ✨ Added
- **Link Validation System**: Strict verification that "Related notes" only link to existing files in valid knowledge folders
- **AI Summary Auto-Generation**: Automatic summary creation/updates when notes exceed character threshold
- **Validation Script**: `scripts/validate_notes.py` for checking note integrity
- **Scripts Folder**: Centralized location for reusable automation scripts

### 📝 Changed
- **Inbox Processing Rules**: Updated `Routines/Inbox processing.md` with new validation requirements
- **Core Processes**: Added critical rules to `Processes.md` for link validation and AI summaries
- **Link Creation Policy**: Quality over quantity - fewer real links preferred over fictional ones

### 🚫 Removed
- **Forbidden Link Targets in "Related notes" section**: 
  - Links to `04 - 💽 RAW` folder in "Related notes"
  - Links to `99 - 📄 To process` folder in "Related notes"
  - Made-up/fictional note references

### 🔧 **CORRECTIONS - Processing Mistakes Fixed**

#### Issues Identified:
1. **Over-restrictive RAW linking**: Incorrectly removed ALL RAW references, should only restrict "Related notes" section
2. **Insufficient connections**: Created notes with fewer than 5 related notes

#### Fixes Applied:
- **RAW References Policy**: 
  - ❌ **WRONG**: No RAW links anywhere in notes
  - ✅ **CORRECT**: RAW links OK in note content, just not in "Related notes" section
- **Related Notes Requirement**:
  - ❌ **WRONG**: "Quality over quantity" - allowing fewer than 5 links
  - ✅ **CORRECT**: Must always include exactly 5 related notes

### 🛠️ Technical Details

#### Link Validation Rules
- ✅ **MUST** verify note existence before linking
- ✅ **ONLY** link to `10 - 🧠 Knowledge` subfolders in "Related notes":
  - `1 - 🚀 Projects`
  - `2 - 🌱 Areas`
  - `3 - 📚 Resources`
- ✅ **RAW references allowed** in note content (just not "Related notes")
- ✅ **Always exactly 5 connections** in "Related notes" section
- ❌ **NEVER** create fictional links

#### AI Summary Logic
- **New Notes**: Generate summary if >1500 characters
- **Updated Notes**: 
  - Generate summary if updated note >1500 chars AND no existing summary
  - Update existing summary if content added to note with summary
  - Same formatting: 2 paragraphs, 5-7 sentences max

### 🚀 Usage

#### Run Validation Script
```bash
cd "01 - 🤖 Second brain/scripts"
python validate_notes.py "../../.." --check-summaries
```

#### Validation Output
- **Link Issues**: Broken links, forbidden directories, non-existent references
- **Missing Summaries**: Notes >1500 chars without AI summaries
- **Character Counts**: Detailed reporting for review candidates

---

## Future Changelog Format

### Categories to Use:
- **✨ Added** - New features
- **📝 Changed** - Changes in existing functionality  
- **🔧 Fixed** - Bug fixes
- **🚫 Removed** - Removed features
- **🛠️ Technical** - Behind-the-scenes improvements
- **📚 Documentation** - Documentation changes

### Script Reuse Policy:
- All automation scripts stored in `scripts/` folder
- Reuse existing scripts for similar operations before creating new ones
- Document script usage in changelog entries
