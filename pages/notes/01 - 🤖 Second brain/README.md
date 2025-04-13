# Second Brain Workflow Guide

This document provides instructions for managing your Second Brain repository with private submodules.

> **Important:** For detailed privacy guidelines and content separation rules, see [[Privacy_and_Git_Workflow]]

## Repository Structure

This Second Brain uses Git submodules to keep certain content private while maintaining a unified folder structure locally. The configuration is stored in `.env.private` (not tracked in the public repository).

```
Second Brain Repository
├── public content
└── private content (managed as submodules)
    ├── PROJECTS_SUBMODULE (private - 10 - 🧠 Knowledge/1 - 🚀 Projects)
    └── ARCHIVES_SUBMODULE (private - 10 - 🧠 Knowledge/4 - 🏛️ Archives)
```

> **Note:** Make sure to add `.env.private` to your `.gitignore` file to prevent exposing private repository information.

## Initial Setup

If you're setting this up on a new machine:

```bash
# Clone the main repository
git clone https://github.com/erikvanek/erikvanek.github.io.git
cd erikvanek.github.io

# Initialize and update all submodules
git submodule update --init --recursive
```

## Daily Workflow

### 1. Pulling Latest Changes

Always start your work session by pulling the latest changes:

```bash
# Navigate to your main repository
cd /Users/erik/dev/erikvanek.github.io

# Pull changes in the main repository
git pull

# Update all submodules to their latest commits
git submodule update --init --recursive
```

### 2. Adding New Knowledge

When adding new knowledge to your Second Brain:

#### For public content:

```bash
# Edit your files normally
# Then commit and push as usual
git add <files_or_folders>
git commit -m "Add new notes about XYZ"
git push
```

#### For private content (in a submodule):

```bash
# 1. Navigate to the appropriate submodule
cd "$(grep PROJECTS_PATH .env.private | cut -d= -f2)"  # For projects
# OR
cd "$(grep ARCHIVES_PATH .env.private | cut -d= -f2)"  # For archives

# 2. Make your changes

# 3. Commit and push changes in the submodule
git add .
git commit -m "Add new private notes about XYZ"
git push

# 4. Return to the main repository
cd /Users/erik/dev/erikvanek.github.io

# 5. Update the reference to the submodule
git add "$(grep PROJECTS_PATH .env.private | cut -d= -f2)"  # Adjust as needed
git commit -m "Update private submodule reference"
git push
```

### 3. Working with Submodule Content

Remember that each submodule is an independent Git repository:

- Changes must be committed in the submodule first
- Then committed in the main repository to update the reference
- Each has its own history and branches

## Troubleshooting

### Detached HEAD in Submodule

If you find yourself in a "detached HEAD" state in a submodule:

```bash
# Navigate to the submodule
cd "$(grep PROJECTS_PATH .env.private | cut -d= -f2)"

# Check out the main branch
git checkout main

# Pull latest changes
git pull
```

### Submodule Out of Sync

If the submodule reference is out of sync:

```bash
# From the main repository
git submodule update --remote --merge
```

## Quick Reference

- **Pull everything:** `git pull && git submodule update --init --recursive`
- **Check submodule status:** `git submodule status`
- **Update submodule to latest remote version:** `git submodule update --remote`

Remember to always commit changes to the submodule repository first, then update the reference in the main repository.
