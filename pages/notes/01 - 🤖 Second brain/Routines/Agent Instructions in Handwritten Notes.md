# ✍️ Agent Instructions in Handwritten Notes

Convention for leaving instructions to a processing agent inside handwritten notes (reMarkable exports, paper photos). Shared by the book-notes and deep-dive-notes skills so both parse it identically.

An instruction is a direction to the agent, not note content. It is never transcribed into the note.

## Opening an instruction

A line opens an instruction if, after ignoring leading whitespace and an optional bullet marker (`-`, `–`, `•`, `*`), its first character is `@` and text follows.

```
@ summary in English          ← opens an instruction
- @ skip this page            ← opens an instruction (bullet, then @)
- email me@example.com        ← NOT an instruction (@ is mid-line)
```

The handwritten `@` is usually a spiral (a circle with a tail). If a symbol at line start could be `@`, `a`, `0`, or `©`, treat it as an opener only when the text after it reads as a direction to the agent; otherwise ask.

## Closing an instruction

An instruction may wrap over several lines. It closes at the first of:

1. a bare `@` (nothing after it, optionally with a bullet), on its own line or at the end of the last line of the instruction
2. a new opening `@` (implicitly closes the previous one, mentioned in the agent's report)
3. if no closer is present: a bullet marker, a heading, or a clear vertical gap

If a closer is present, everything between opener and closer is the instruction, whatever line breaks, bullets or gaps it contains. If the end is unclear, the agent asks. A bare `@` with no instruction open is ambiguous: the agent asks, it does not guess.

## Scope

Whatever the instruction states ("from this page onwards", "this page only", "chapter 3") wins. If it states nothing, it applies from where it appears to the end of the document.

## Handling

1. Do not transcribe the instruction text into the note.
2. Apply it on top of the skill's defaults. It overrides them.
3. Typed chat instructions override handwritten ones when they conflict.
4. Content before an instruction that refers to "previous" or "earlier" material is a distinct source. Keep it separable instead of blending it silently.
5. Before writing the note, report each instruction verbatim, where it was read as ending, and how it will be applied. Wait for correction if anything was ambiguous or illegible.

## Optional shortcuts

| Shortcut | Meaning                                                |
| -------- | ------------------------------------------------------ |
| `@skip`  | don't transcribe this page or block                    |
| `@sum`   | direction for the summary (language, focus, length)    |
| `@link`  | add these wiki-links under Related notes               |
| `@noq`   | don't append quotes from this block to the quotes file |
| `@tag`   | force these tags                                       |

Anything else after `@` is free-form.

## Example

Real test page, transcribed from a reMarkable photo:

```
@ note for an agent processing this set of notes - previous page of notes
is compiled ~6 months ago and I decided to re-read the book from scratch
so that I build notes from scratch - so while processing this file - try
to somehow 'merge' notes from previous page with those from this page onwards
@
```

## Open questions

- When a note says "merge" with earlier notes, is the earlier version in the same PDF (before the marker) or an existing note in the vault? The agent should search the vault by title and ask if it finds more than one.
- What "merge" means by default (fold into one structure and drop duplicates, or keep the old notes as a labelled section) is not yet decided. State it in the instruction until it is.
- Known weak spot: the same character opens and closes, so a missed closer makes an instruction swallow note content until the next fallback boundary. The echo-back report is the safety net. If it fails often, tighten the fallback.

## Skill wiring

Each processing skill adds this step after transcription:

```markdown
### 1b. Extract Agent Instructions

Follow `../shared/agent-instructions.md`. Detect lines starting with `@`, or with
a bullet followed by `@`. Remove them from the transcription, apply them to the
steps below, and report what you found and how you'll apply it before saving.
```

The skills sync from the claude.ai account, not from this repo. The shared file and the step have to be pasted into the skills there; this note is the source of truth for the convention.

## Related notes

- [[Book Notes Extraction]]
- [[Inbox processing]]
