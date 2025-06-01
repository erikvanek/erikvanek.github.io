# Updated Note Processing System

## Changes Made

### 1. Fixed "Related Notes" Link Validation
**Problem**: The system was sometimes generating links to non-existent notes or linking to forbidden folders (RAW, "To process").

**Solution**: Added strict validation requirements:
- ✅ Only link to notes that actually exist in `10 - 🧠 Knowledge` folders
- ❌ Never link to `04 - 💽 RAW` folder 
- ❌ Never link to `99 - 📄 To process` folder
- ❌ Never create fictional/made-up links
- ✅ Search knowledge base first before creating any links
- ✅ Better to have fewer real links than fake ones

### 2. AI-Assisted Summary for Updated Notes
**Problem**: When content was added to existing notes and they exceeded 1500 characters, no AI summary was generated.

**Solution**: Added logic for updated notes:
- ✅ Check total character count after adding content to existing notes
- ✅ Generate AI summary if note exceeds 1500 chars and doesn't have one
- ✅ Update existing AI summary if new content was added to a note that already has one
- ✅ Same formatting and length requirements as new notes

## Files Updated

1. **`Inbox processing.md`** - Updated with new validation rules and AI summary logic
2. **`Processes.md`** - Added critical rules for link validation and AI summaries
3. **`validate_notes.py`** - New validation script to check note integrity

## How to Use the Validation Script

The validation script helps you find and fix issues in your notes:

### Basic Usage
```bash
cd "/Users/erik/dev/erikvanek.github.io/pages/notes/01 - 🤖 Second brain"
python validate_notes.py "../.."
```

### Check for Missing AI Summaries Too
```bash
python validate_notes.py "../.." --check-summaries
```

### What the Script Checks

✅ **Link Validation**:
- Finds broken links in "Related notes" sections
- Identifies links to forbidden directories
- Reports non-existent note references

✅ **AI Summary Check** (with `--check-summaries`):
- Finds notes longer than 1500 characters without AI summaries
- Reports character count for each

### Example Output
```
Building knowledge base index...
Found 127 notes in knowledge base

Validating links in 324 notes...

=== VALIDATION RESULTS ===
Total files checked: 324
Invalid links found: 3

🚨 INVALID LINKS:
  📄 10 - 🧠 Knowledge/3 - 📚 Resources/Design/Innovation.md
     🔗 Link: [[99 - 📄 To process/Product discovery]]
     ❌ Issue: Links to forbidden directory (RAW or To process)

📝 NOTES NEEDING AI SUMMARIES (5):
  📄 10 - 🧠 Knowledge/3 - 📚 Resources/Design/Behavioral design.md (1847 chars)
```

## Usage Instructions for AI Processing

When processing inbox notes, the AI assistant will now:

1. **Search knowledge base** before creating "Related notes" links
2. **Verify all links exist** in valid folders only
3. **Check character count** after updating any note
4. **Generate/update AI summary** if the note exceeds 1500 characters
5. **Never create fake links** - better to have fewer real connections

## Recommended Workflow

1. **Before processing**: Run validation script to check current state
2. **Process inbox notes** using updated rules
3. **After processing**: Run validation script again to verify everything is correct
4. **Regular maintenance**: Run script weekly to catch any issues

This ensures your second brain maintains high-quality, accurate connections between notes.
