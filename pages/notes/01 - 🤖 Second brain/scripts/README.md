# Second Brain Scripts

This folder contains automation scripts for maintaining and validating the second brain system.

## 🔄 Script Reuse Policy
- **Always check this folder first** before creating new scripts for similar operations
- Extend existing scripts rather than duplicating functionality
- Document new scripts and their usage in this README
- Update CHANGELOG.md when adding or modifying scripts

## 📜 Available Scripts

### `validate_notes.py`
**Purpose**: Validates note integrity and identifies issues in the knowledge base

**Usage**:
```bash
cd scripts/
python validate_notes.py "../../.." [options]
```

**Options**:
- `--check-summaries`: Also check for missing AI-assisted summaries

**What it checks**:
- ✅ Broken links in "Related notes" sections
- ✅ Links to forbidden directories (RAW, To process)
- ✅ Non-existent note references
- ✅ Notes missing AI summaries (when >1500 chars)

**Output**:
- Lists invalid links with file locations and error types
- Reports notes needing AI summaries with character counts
- Summary statistics of validation results

**When to use**:
- Before processing inbox notes
- After processing to verify quality
- Weekly maintenance checks
- When troubleshooting link issues

---

## 🆕 Adding New Scripts

When creating new scripts:

1. **Check for existing solutions** in this folder first
2. **Follow naming convention**: `action_target.py` (e.g., `cleanup_dump.py`)
3. **Include docstring** with purpose and usage
4. **Update this README** with script documentation
5. **Log changes** in CHANGELOG.md
6. **Make scripts reusable** with command-line arguments when applicable

### Script Template:
```python
#!/usr/bin/env python3
"""
Script Name - Brief Description
Longer description of what the script does and when to use it.
"""

import argparse

def main():
    parser = argparse.ArgumentParser(description='Script description')
    parser.add_argument('notes_dir', help='Path to notes directory')
    # Add other arguments as needed
    
    args = parser.parse_args()
    
    # Script logic here

if __name__ == "__main__":
    main()
```

## 🧹 Maintenance Schedule

**Weekly**:
- Run `validate_notes.py --check-summaries`
- Review CHANGELOG.md for recent changes

**Monthly**:
- Audit scripts for optimization opportunities
- Clean up old/unused scripts
- Update documentation
