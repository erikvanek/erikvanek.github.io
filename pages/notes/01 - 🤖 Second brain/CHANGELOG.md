# Second Brain Changelog

All notable changes to the note processing system will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

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
- **Forbidden Link Targets**: 
  - Links to `04 - 💽 RAW` folder in "Related notes"
  - Links to `99 - 📄 To process` folder in "Related notes"
  - Made-up/fictional note references

### 🛠️ Technical Details

#### Link Validation Rules
- ✅ **MUST** verify note existence before linking
- ✅ **ONLY** link to `10 - 🧠 Knowledge` subfolders:
  - `1 - 🚀 Projects`
  - `2 - 🌱 Areas`
  - `3 - 📚 Resources`
- ❌ **NEVER** link to RAW or processing folders
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
