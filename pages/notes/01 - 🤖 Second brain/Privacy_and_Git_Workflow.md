# Privacy and Git Workflow Guide

This document outlines the privacy rules and git workflow for maintaining a second brain with both public and private content.

## Privacy Structure

This second brain uses git submodules to manage private content while exposing public content through GitHub:

```
Second Brain Repository
├── Public Content (GitHub public repo)
└── Private Content (Git submodules)
    ├── Projects module (10 - 🧠 Knowledge/1 - 🚀 Projects)
    └── Archives module (10 - 🧠 Knowledge/4 - 🏛️ Archives)
```

## Privacy Rules for Content Creation

### 1. Never Reference Private Content from Public Notes

The most important rule is to **never reference private content from public notes**:

- **No direct links**: Never use Obsidian `[[links]]` in public notes that point to content in private modules
- **No backlinks**: Don't create content in public notes that would create backlinks from private content
- **No mentions**: Don't mention filenames or paths from private modules in public notes
- **No related notes**: Don't list private notes as related to public notes

### 2. Permitted Cross-References

- **Private → Public**: You may freely reference public content from private notes
- **Private → Private**: You may reference private content from other private notes
- **Public → Public**: You may reference public content from other public notes

### 3. Cross-Module Content Management

When moving or creating content:

- **Before linking**: Always verify whether the target note is in a public or private module
- **Moving content**: When moving content between public and private modules, update all references
- **New content**: Decide whether new content belongs in public or private modules before creating links

### 4. How to Check Privacy Status

Before creating links, check if the target is in a private module:
- Content in `10 - 🧠 Knowledge/1 - 🚀 Projects` is private
- Content in `10 - 🧠 Knowledge/4 - 🏛️ Archives` is private
- All other content is public

## Git Workflow

### Initial Setup on a New Machine

```bash
# Clone the main repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Initialize and update all submodules
git submodule update --init --recursive

# Create your .env.private file (do not commit this)
echo "PROJECTS_PATH=/path/to/projects/submodule" > .env.private
echo "ARCHIVES_PATH=/path/to/archives/submodule" >> .env.private
```

### Daily Workflow

#### 1. Start of Session: Sync Everything

```bash
# Pull latest changes in the main repo
git pull

# Update all submodules to their latest state
git submodule update --init --recursive
```

#### 2. Working with Public Content

```bash
# Make your changes to public files

# Stage, commit, and push changes
git add path/to/changed/files
git commit -m "Add notes on XYZ topic"
git push
```

#### 3. Working with Private Content (Projects)

```bash
# 1. Navigate to the projects submodule
cd "10 - 🧠 Knowledge/1 - 🚀 Projects"

# 2. Make your changes to private project files

# 3. Commit and push changes in the submodule
git add .
git commit -m "Add private project notes on XYZ"
git push

# 4. Return to the main repository
cd ../../../

# 5. Update the reference to the submodule
git add "10 - 🧠 Knowledge/1 - 🚀 Projects"
git commit -m "Update projects submodule reference"
git push
```

#### 4. Working with Private Content (Archives)

```bash
# 1. Navigate to the archives submodule
cd "10 - 🧠 Knowledge/4 - 🏛️ Archives"

# 2. Make your changes to private archive files

# 3. Commit and push changes in the submodule
git add .
git commit -m "Update archive content for XYZ"
git push

# 4. Return to the main repository
cd ../../../

# 5. Update the reference to the submodule
git add "10 - 🧠 Knowledge/4 - 🏛️ Archives"
git commit -m "Update archives submodule reference"
git push
```

### Troubleshooting

#### Detached HEAD in Submodule

If you see a "detached HEAD" state in a submodule:

```bash
# Navigate to the submodule
cd "10 - 🧠 Knowledge/1 - 🚀 Projects"  # or appropriate path

# Check out the main branch (or your default branch)
git checkout main

# Pull latest changes
git pull
```

#### Submodule Out of Sync

```bash
# From the main repository root
git submodule update --remote --merge
```

## Quick Reference Commands

- **Pull everything:** `git pull && git submodule update --init --recursive`
- **Check submodule status:** `git submodule status`
- **Update submodules to latest remote versions:** `git submodule update --remote`

## Privacy Audit Process

Periodically run this privacy audit to ensure you haven't accidentally created references to private content:

1. Manually inspect your public content for any mentions of private module content
2. In Obsidian, check graph view and filter to see if there are unexpected connections
3. Use search tools to check for any accidental references:
   ```bash
   # From the repo root, search for any references to private paths
   grep -r "\[\[10 - 🧠 Knowledge/1 - 🚀 Projects" --include="*.md" .
   grep -r "\[\[10 - 🧠 Knowledge/4 - 🏛️ Archives" --include="*.md" .
   ```

Remember to always commit changes to the submodule repositories first, then update the references in the main repository.
