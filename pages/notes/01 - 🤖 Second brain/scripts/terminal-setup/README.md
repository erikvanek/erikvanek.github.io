# Terminal setup

Versioned copies of personal terminal/Claude Code config. The live files are symlinks pointing here, so edits in place are the same edits tracked by git - no manual sync step.

## `statusline-command.sh`
Claude Code custom statusline: account chip, model, current folder name, git branch + open PR, context/cost/rate-limit bars.

Live at: `~/.claude/statusline-command.sh` (symlink), wired up via `~/.claude/settings.json`'s `statusLine` key.

## `iterm2-claude-code-profile.json`
iTerm2 Dynamic Profile named "Claude Code": SF Mono 14pt (matches the size actually used day-to-day), and `Custom Directory: Recycle` so new tabs/windows inherit the previous session's working directory instead of always opening at home.

Live at: `~/Library/Application Support/iTerm2/DynamicProfiles/claude-code.json` (symlink). iTerm2 hot-reloads this file - no restart needed after edits. Since it's a Dynamic Profile, its fields aren't editable from iTerm2's own Settings UI - edit this file instead (or "Other Actions → Copy Profile" in iTerm2 for a one-off editable fork). Set as your default profile via Settings → Profiles → this profile → gear icon → "Set as Default".
