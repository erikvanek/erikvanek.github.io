# Gemini Agent Context: The Second Brain (PKM)

## 1. System Philosophy: "The Garden of Knowledge"
This directory (`/notes`) is the user's **Second Brain**. It is a Personal Knowledge Management (PKM) system likely built on the "Building a Second Brain" (BASB) or Zettelkasten methodologies.

**Core Principle:** This is where *information* is transformed into *understanding*.
*   **Project Repos** contain *what* the user is working on (the "Factory").
*   **This Repo** contains *how* the user thinks, learns, and operates (the "Library" or "Laboratory").

## 2. Navigating the Mental Map
The folder structure implies a lifecycle of ideas:

### `02 - 📩 Inbox` (The Entry Point)
*   **Status:** Raw, chaotic, unprocessed.
*   **Content:** Fleeting notes, quick captures, book excerpts.
*   **Action:** Things here need to be "processed"—categorized, summarized, and moved to permanent storage.

### `04 - 💽 RAW` ( The Archive)
*   **Status:** Chronological immutable record.
*   **Content:** Daily logs, meeting notes, "stream of consciousness" dumps.
*   **Use Case:** "What did I do on March 14th?"

### `10 - 🧠 Knowledge` (The Core)
*   **Status:** Permanent, refined, crystallized.
*   **Content:**
    *   **Mental Models:** (e.g., "The Hero's Journey", "FAB Framework", "Pareto Principle").
    *   **Frameworks:** How to structure a pitch, how to conduct an interview.
    *   **Evergreen Notes:** Concepts that remain true over time.
*   **Agent Instruction:** **This is your primary lookup table for "How-To".** If the user asks "Help me write a pitch," look here first for their preferred frameworks (e.g., Aristotle's Triad, FAB).

### `99 - 📄 To process` (The Working Memory)
*   **Status:** Active, transient.
*   **Content:** Notes from recent interviews (like the Upstrix research) that are being synthesized but aren't yet filed permanently.

## 3. Key Frameworks Detected (Reference these!)
Based on recent activity, the user heavily relies on:
*   **Storytelling:** The "Hero's Journey" (Campbell) and "FAB" (Feelings, Actions, Beliefs) for pitches.
*   **Rhetoric:** Ethos/Pathos/Logos (Aristotle) for persuasion.
*   **Clarity:** Flesch Reading Ease scores for communication.

## 4. Agent Operational Rules
1.  **Read-Only Default:** Treat this repo as a reference library. Do not modify files in `10 - 🧠 Knowledge` unless explicitly instructed to "update my mental model of X".
2.  **Cross-Pollinate:** When working in a project repo (like Upstrix), check this Second Brain for relevant frameworks.
    *   *Example:* "I see you're writing a pitch in Upstrix. Should I apply the 'FAB' framework from your Second Brain?"
3.  **Respect the Path:** This directory sits outside the typical project root. Always use absolute paths or relative paths from the workspace root (e.g., `../erikvanek.github.io/pages/notes/...`).
