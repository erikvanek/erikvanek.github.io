#!/bin/sh
# main-guard (erik-skills backlog, installed by scripts/install-main-guard.mjs)
#
# For PR-gated repos only. Refuses a commit on the default branch, because there
# `main` only advances through a merged PR. Installed under two hook names:
#   pre-commit        every `git commit`, `--amend`, and the commit that
#                     concludes a conflicted merge
#   pre-merge-commit  a `git merge` that would create a merge commit on its own
# Detached HEAD (rebase, bisect) is allowed.
#
# POSIX sh on purpose: git runs hooks from GUI clients too (an editor, Obsidian
# Git), and their PATH may not include node. A hook that cannot start blocks
# every commit on every branch.
#
# Override, the owner's deliberate call only: `git commit --no-verify`
# (`git merge --no-verify`). Agents never use it.

branch=$(git symbolic-ref --quiet --short HEAD) || exit 0
default=$(git symbolic-ref --quiet --short refs/remotes/origin/HEAD 2>/dev/null)
default=${default#origin/}

case "$branch" in
  main|master) ;;
  *) [ -n "$default" ] && [ "$branch" = "$default" ] || exit 0 ;;
esac

verb=commit
[ "$(basename "$0")" = pre-merge-commit ] && verb=merge

cat >&2 <<EOF
main-guard: this repo is PR-gated, so '$branch' only advances through a merged PR.
  Move the work to a branch:        git switch -c <branch-name>
  Deliberate override, owner only:  git $verb --no-verify
EOF
exit 1
