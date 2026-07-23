# AGENTS.md — Sahar

Read this first if you are an AI coding agent (Claude Code, OpenAI Codex, or any other) or a
human landing on this repo. Fleet-wide protocol: `../Pantheon/docs/AGENTS-FLEET-PROTOCOL.md`.
Company/personal routing rules: `../Pantheon/docs/ROUTING-POLICY.md`.

## What this project is
سحر Sahar — a free, offline-first education app for children denied school (literacy, numeracy,
science, critical thinking; Dari/EN/DE; spaced repetition). A working prototype and its
foundation (curriculum, architecture, open-source plan), not a finished product yet. v1 ships
text-first; real human Dari audio is a funded-phase deliverable.

## Classification
**PUBLIC — Digital Public Good.** `private: false`, MIT `LICENSE` for code (`LICENSE-CONTENT.md`
for content). External human contributors are welcome via a normal PR, still subject to the
AI-verification rule (Iron Rule 1, `../Pantheon/docs/ROUTING-POLICY.md`).

**Code and content are NOT the same gate.** Code/infra changes (engine, bootstrap, tooling) are
ordinary PUBLIC work — build it, test it, PR it. **Any CONTENT change** — a lesson, a curriculum
item, anything a child would read or hear — additionally needs the **do-no-harm review**: a
native-Farsi/Dari editor + a child-safety adviser + a secular/Iran-context reviewer, before it
ships. This is a hard gate, not a suggestion. Read `DO-NO-HARM.md` first; the two existing passes
(`docs/RED-TEAM-PEDAGOGY-SAFEGUARDING-2026-07-13.md`, `docs/RED-TEAM-8-10-2026-07-14.md`) are the
template for the next one. Never flip Sahar's visibility to Mo-only — it breaks the DPG status.

## Where the real state lives
1. `.mc/project.json` — canon: phase, priority, `nextAction`.
2. `.mc/INBOX.md` — task queue.
3. `SAHAR-COVERAGE-STATUS.md` — what's actually built vs. claimed, tier by tier.
4. `README.md`, plus `DO-NO-HARM.md` for anything content-facing.

## Definition of Done
- [ ] `npm test` passes — pure Node, no dependencies (`test/core.test.js`, `bootstrap.test.js`,
  `content-validator.test.js`, `profiles.test.js`).
- [ ] Content changes only: the do-no-harm review above is actually done, and named in the commit.
- [ ] No secrets committed.
- [ ] `.mc/project.json` `nextAction` updated; the matching `.mc/INBOX.md` item ticked.
- [ ] Real commit message. `git pull --rebase --autostash` before push. No `--no-verify`, no
  force-push to `main`.

## If blocked
Note it under `## Blocked` in `.mc/INBOX.md` — especially anything that would need a content
review you can't perform yourself (no native Dari speaker in the loop, etc).
