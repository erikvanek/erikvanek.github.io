# Skills

Custom Claude skills for personal workflows.

## Structure

```
skills/
├── shared/                    # Shared resources
│   └── formatting-rules.md   # Common formatting conventions
├── deep-dive-notes/          # Multi-source research notes
│   └── SKILL.md
└── book-notes/               # Single-source book notes
    └── SKILL.md
```

## Updating a skill

1. Edit files in the skill folder (e.g., `deep-dive-notes/`)
2. Commit changes:
   ```bash
   git add pages/skills/
   git commit -m "skill-name: description of change"
   ```

## Deploying to Claude.ai

1. Package the skill:
   ```bash
   cd pages/skills
   zip -r skill-name.skill skill-name/
   ```
2. Go to [Settings > Capabilities](https://claude.ai/settings/capabilities)
3. Scroll to **Skills** section
4. Click **Upload skill** and select the `.skill` file
5. If replacing an existing skill, it will be overwritten

## Available skills

| Skill | Trigger | Input | Description |
|-------|---------|-------|-------------|
| deep-dive-notes | "process deep dive notes" | PDF or images | Transcribe multi-source research notes to Obsidian |
| book-notes | "process book notes" | PDF or images | Transcribe single-source book notes to Obsidian |

## Shared Resources

Both skills reference `shared/formatting-rules.md` for consistent transcription conventions.

## What we will build next
- processing inbox in my second brain
- agent for processing my second brain and getting it to a better shape than it is now
- templates for book & deep dive notes
- weekly report what are the new things I learned recently (summary of important and bold items, ...)
- skills from processing my own experience from workshops/research/prototyping/...