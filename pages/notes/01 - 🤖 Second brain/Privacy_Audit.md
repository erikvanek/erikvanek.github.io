# Second Brain Privacy Audit

This document provides tools and procedures for ensuring that private content in your second brain remains truly private.

## What to Check For

In this second brain setup:
- Content in `10 - 🧠 Knowledge/1 - 🚀 Projects` is **private**
- Content in `10 - 🧠 Knowledge/4 - 🏛️ Archives` is **private**
- All other content is **public**

## Privacy Violations to Watch For

1. **Direct Obsidian Links**: Public notes containing `[[links]]` to private content
2. **Backlinks**: Public notes referenced by private notes, creating a trace
3. **Related Notes**: Public notes listing related notes that are private
4. **Content Mentions**: Public notes mentioning filenames or content from private notes
5. **Graph Connections**: Unexpected connections visible in the Obsidian graph view

## Manual Audit Process

### 1. Link Audit

Check your public notes for any direct links to private content:

- In Obsidian, search for: `[[10 - 🧠 Knowledge/1 - 🚀 Projects`
- In Obsidian, search for: `[[10 - 🧠 Knowledge/4 - 🏛️ Archives`

### 2. Backlink Audit

From within each private module, check if any notes have backlinks from public notes:

1. Open a note in a private module
2. Check the backlinks panel
3. Verify that all backlinks come from other private notes

### 3. Graph View Audit

Use Obsidian's graph view to visually inspect connections:

1. Open graph view (Ctrl/Cmd + G)
2. Use the filters to highlight private module folders
3. Look for connections between private (highlighted) and public (non-highlighted) nodes

### 4. Command Line Audit

You can run these commands from a terminal to search for potential leaks:

```bash
# From the repository root
# Search for direct links to private content
grep -r "\[\[10 - 🧠 Knowledge/1 - 🚀 Projects" --include="*.md" . | grep -v "10 - 🧠 Knowledge/1 - 🚀 Projects\|10 - 🧠 Knowledge/4 - 🏛️ Archives\|Privacy_Audit\|Privacy_and_Git_Workflow"

# Search for direct links to archives
grep -r "\[\[10 - 🧠 Knowledge/4 - 🏛️ Archives" --include="*.md" . | grep -v "10 - 🧠 Knowledge/1 - 🚀 Projects\|10 - 🧠 Knowledge/4 - 🏛️ Archives\|Privacy_Audit\|Privacy_and_Git_Workflow"

# Search for mentions of private paths
grep -r "10 - 🧠 Knowledge/1 - 🚀 Projects" --include="*.md" . | grep -v "\[\[\|10 - 🧠 Knowledge/1 - 🚀 Projects\|10 - 🧠 Knowledge/4 - 🏛️ Archives\|Privacy_Audit\|Privacy_and_Git_Workflow"

grep -r "10 - 🧠 Knowledge/4 - 🏛️ Archives" --include="*.md" . | grep -v "\[\[\|10 - 🧠 Knowledge/1 - 🚀 Projects\|10 - 🧠 Knowledge/4 - 🏛️ Archives\|Privacy_Audit\|Privacy_and_Git_Workflow"
```

## Automated Privacy Check

You can create a simple privacy check script (place in the root of your repository):

```bash
#!/bin/bash
# privacy_check.sh
# Run this script to check for potential privacy leaks

echo "Running Second Brain Privacy Check..."
echo "======================================"

echo "1. Checking for direct links to private Projects..."
grep -r "\[\[10 - 🧠 Knowledge/1 - 🚀 Projects" --include="*.md" . | grep -v "10 - 🧠 Knowledge/1 - 🚀 Projects\|10 - 🧠 Knowledge/4 - 🏛️ Archives\|Privacy_Audit\|Privacy_and_Git_Workflow"

echo "2. Checking for direct links to private Archives..."
grep -r "\[\[10 - 🧠 Knowledge/4 - 🏛️ Archives" --include="*.md" . | grep -v "10 - 🧠 Knowledge/1 - 🚀 Projects\|10 - 🧠 Knowledge/4 - 🏛️ Archives\|Privacy_Audit\|Privacy_and_Git_Workflow"

echo "3. Checking for mentions of private Projects path..."
grep -r "10 - 🧠 Knowledge/1 - 🚀 Projects" --include="*.md" . | grep -v "\[\[\|10 - 🧠 Knowledge/1 - 🚀 Projects\|10 - 🧠 Knowledge/4 - 🏛️ Archives\|Privacy_Audit\|Privacy_and_Git_Workflow"

echo "4. Checking for mentions of private Archives path..."
grep -r "10 - 🧠 Knowledge/4 - 🏛️ Archives" --include="*.md" . | grep -v "\[\[\|10 - 🧠 Knowledge/1 - 🚀 Projects\|10 - 🧠 Knowledge/4 - 🏛️ Archives\|Privacy_Audit\|Privacy_and_Git_Workflow"

echo "======================================"
echo "Privacy check complete!"
echo "If no results appear above each section header, no privacy issues were found."
echo "If any results appear, review those files for potential privacy violations."
```

## Pre-Commit Hook

For advanced users, consider adding a pre-commit hook to prevent accidentally committing references to private content:

```bash
#!/bin/bash
# .git/hooks/pre-commit
# Make executable with: chmod +x .git/hooks/pre-commit

echo "Checking for privacy violations before commit..."

# Check for references to private projects
if git diff --cached --name-only | xargs grep -l "10 - 🧠 Knowledge/1 - 🚀 Projects" | grep -v "10 - 🧠 Knowledge/1 - 🚀 Projects\|10 - 🧠 Knowledge/4 - 🏛️ Archives\|Privacy_Audit\|Privacy_and_Git_Workflow"; then
  echo "Error: Potential privacy leak detected (references to private Projects)."
  echo "Please fix the issues above before committing."
  exit 1
fi

# Check for references to private archives
if git diff --cached --name-only | xargs grep -l "10 - 🧠 Knowledge/4 - 🏛️ Archives" | grep -v "10 - 🧠 Knowledge/1 - 🚀 Projects\|10 - 🧠 Knowledge/4 - 🏛️ Archives\|Privacy_Audit\|Privacy_and_Git_Workflow"; then
  echo "Error: Potential privacy leak detected (references to private Archives)."
  echo "Please fix the issues above before committing."
  exit 1
fi

echo "No privacy violations detected. Proceeding with commit."
exit 0
```

## What to Do If You Find a Privacy Violation

If you discover references to private content in your public notes:

1. **Don't panic** - identifying the issue is the first step to resolving it
2. **Don't commit** - if you haven't committed the violation yet, don't push it to GitHub
3. **Remove the reference** - edit the note to remove the link or mention
4. **Consider obfuscation** - if you need to reference something similar, use a more generic term
5. **Audit thoroughly** - check all possible ways the connection might be exposed
6. **Verify fix** - run the checks again to confirm the issue is resolved

Remember: If you've already pushed a privacy violation to GitHub, removing it in a new commit won't remove it from the Git history. You may need to rewrite history using more advanced Git commands if sensitive information was exposed.
