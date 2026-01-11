# Skills

Custom Claude skills for personal workflows.

## Updating a skill

1. Edit files in the skill folder (e.g., `remarkable-notes/`)
2. Commit changes:
   ```bash
   git add pages/skills/
   git commit -m "skill-name: description of change"
   ```

## Deploying to Claude.ai

1. Package the skill:
   ```bash
   cd pages/skills
   zip -r remarkable-notes.skill remarkable-notes/
   ```
2. Go to [Settings > Capabilities](https://claude.ai/settings/capabilities)
3. Scroll to **Skills** section
4. Click **Upload skill** and select the `.skill` file
5. If replacing an existing skill, it will be overwritten

## Available skills

| Skill | Trigger | Description |
|-------|---------|-------------|
| remarkable-notes | "process remarkable notes" | Transcribe reMarkable handwritten PDFs to Obsidian |
