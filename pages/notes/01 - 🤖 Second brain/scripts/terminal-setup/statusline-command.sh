#!/bin/bash
input=$(cat)

# ─── helpers ──────────────────────────────────────────────────────────────
make_bar() {
  local pct="$1" width="${2:-8}"
  local filled empty bar i
  filled=$(( pct * width / 100 ))
  [ "$filled" -gt "$width" ] && filled=$width
  empty=$(( width - filled ))
  bar=""
  i=0; while [ $i -lt $filled ]; do bar="${bar}█"; i=$(( i + 1 )); done
  i=0; while [ $i -lt $empty ]; do bar="${bar}░"; i=$(( i + 1 )); done
  printf "%s" "$bar"
}

tok_k() {
  local tok="$1"
  [ -z "$tok" ] || [ "$tok" = "null" ] || [ "$tok" = "0" ] && printf "0k" && return
  printf "%dk" "$(( tok / 1000 ))"
}

# ─── ANSI ─────────────────────────────────────────────────────────────────
RST="\033[0m"
WHITE="\033[97m"
BG_ORANGE="\033[48;5;208m"
BG_GREEN="\033[48;5;28m"
BG_RED="\033[48;5;160m"

# ─── 1. Account chip (leftmost) ───────────────────────────────────────────
tenant_str=""
email=$(jq -r '.oauthAccount.emailAddress // empty' ~/.claude.json 2>/dev/null)
if [ -n "$email" ]; then
  after_at="${email#*@}"
  tenant="${after_at%%.*}"
  if [ "$tenant" = "gmail" ]; then
    tenant_str="${WHITE}${BG_ORANGE} erikvanek ${RST}"
  elif [ "$tenant" = "datamole" ] || [ "$tenant" = "dtml" ]; then
    tenant_str="${WHITE}${BG_GREEN} datamole ${RST}"
  else
    tenant_str=" ${tenant} "
  fi
fi

# ─── 2. Model ─────────────────────────────────────────────────────────────
model=$(printf "%s" "$input" | jq -r '.model.display_name // "Claude"')

# ─── 3. Git branch + open PR (cached 5 min) ──────────────────────────────
cwd=$(printf "%s" "$input" | jq -r '.cwd // "."')
pwd_str="${cwd##*/}"
branch=$(git -C "$cwd" branch --show-current 2>/dev/null)

git_str=""
if [ -n "$branch" ]; then
  safe_branch=$(printf "%s" "$branch" | tr '/' '_' | tr -cd '[:alnum:]_-')
  cache_file="/tmp/.statusline_pr_${safe_branch}"
  cache_fresh=0
  if [ -f "$cache_file" ]; then
    cache_mtime=$(stat -f %m "$cache_file" 2>/dev/null || echo 0)
    now=$(date +%s)
    [ $(( now - cache_mtime )) -lt 300 ] && cache_fresh=1
  fi
  if [ "$cache_fresh" = "1" ]; then
    pr_num=$(cat "$cache_file" 2>/dev/null)
  else
    pr_num=$(cd "$cwd" 2>/dev/null && gh pr view --json number 2>/dev/null | jq -r '.number // empty' 2>/dev/null)
    printf "%s" "$pr_num" > "$cache_file"
  fi
  if [ -n "$pr_num" ]; then
    git_str="${branch} #${pr_num}"
  else
    git_str="$branch"
  fi
fi

# ─── 4. Context bar ───────────────────────────────────────────────────────
ctx_total_in=$(printf "%s" "$input" | jq -r '.context_window.total_input_tokens // 0')
ctx_size=$(printf "%s" "$input" | jq -r '.context_window.context_window_size // 0')
ctx_pct=$(printf "%s" "$input" | jq -r '.context_window.used_percentage // empty')

ctx_str=""
ctx_pct_int=""
if [ -n "$ctx_pct" ] && [ "$ctx_pct" != "null" ]; then
  ctx_pct_int=$(printf "%.0f" "$ctx_pct")
  ctx_bar=$(make_bar "$ctx_pct_int" 8)
  ctx_str="${ctx_pct_int}% ${ctx_bar} ctx $(tok_k "$ctx_total_in")"
fi

# ─── 4b. Compact-before-/model warning (no hook can intercept /model, so warn here) ──
# Why tokens, not %: switching models invalidates the prompt cache (it is model-specific),
# so the new model re-reads the ENTIRE current context UNCACHED — at 1.0x input instead of
# the 0.1x cache-read rate (~10x markup on the re-read), plus a fresh cache write. There is
# NO long-context pricing cliff (Opus 4.x bills the full 1M window at a flat $5/MTok), so the
# switch cost scales purely with ABSOLUTE context tokens — a %-of-window line means nothing.
# 200k ≈ the classic standard context size (the figure the pricing page references for fast
# mode); a switch-triggered re-read at that size is ~$1 of input + noticeable latency. Tune freely.
# Refs: pricing "Long context pricing" (= standard rate) + "Prompt caching" (read = 0.1x base).
CTX_WARN_TOKENS=200000
warn_str=""
case "$ctx_total_in" in
  ''|*[!0-9]*) ;;  # missing / non-numeric → no badge
  *) [ "$ctx_total_in" -ge "$CTX_WARN_TOKENS" ] && warn_str="${WHITE}${BG_RED} ⚠ COMPACT before /model ${RST}" ;;
esac

# ─── 5. Session cost ($) ──────────────────────────────────────────────────
cost_str=""
cost_usd=$(printf "%s" "$input" | jq -r '.cost.total_cost_usd // empty')
if [ -n "$cost_usd" ] && [ "$cost_usd" != "null" ]; then
  cost_str=$(printf "\$%.2f sess" "$cost_usd")
fi

# ─── 6. 5-hour session bar ────────────────────────────────────────────────
sess_str=""
sess_pct=$(printf "%s" "$input" | jq -r '.rate_limits.five_hour.used_percentage // empty')
if [ -n "$sess_pct" ] && [ "$sess_pct" != "null" ]; then
  sess_pct_int=$(printf "%.0f" "$sess_pct")
  sess_bar=$(make_bar "$sess_pct_int" 8)
  sess_str="${sess_pct_int}% ${sess_bar} 5h"
fi

# ─── 7. Weekly bar (7-day rate limit, mirrors /usage) ─────────────────────
wk_str=""
wk_pct=$(printf "%s" "$input" | jq -r '.rate_limits.seven_day.used_percentage // empty')
if [ -n "$wk_pct" ] && [ "$wk_pct" != "null" ]; then
  wk_pct_int=$(printf "%.0f" "$wk_pct")
  wk_bar=$(make_bar "$wk_pct_int" 8)
  wk_str="${wk_pct_int}% ${wk_bar} wk"
fi

# ─── 8. Compose ───────────────────────────────────────────────────────────
left_out=""
right_out=""

add_left() {
  [ -n "$1" ] || return
  [ -n "$left_out" ] && left_out="${left_out}  "
  left_out="${left_out}${1}"
}
add_right() {
  [ -n "$1" ] || return
  [ -n "$right_out" ] && right_out="${right_out}  |  "
  right_out="${right_out}${1}"
}

add_left "$tenant_str"
add_left "$model"
add_left "$pwd_str"
add_left "$git_str"
add_left "$warn_str"

add_right "$ctx_str"
add_right "$cost_str"
add_right "$sess_str"
add_right "$wk_str"

if [ -n "$left_out" ] && [ -n "$right_out" ]; then
  printf "%b    %b" "$left_out" "$right_out"
elif [ -n "$left_out" ]; then
  printf "%b" "$left_out"
else
  printf "%b" "$right_out"
fi
