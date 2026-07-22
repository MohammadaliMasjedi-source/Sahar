# Contributing to Sahar

*Sahar — سحر — is a free, offline-first education app for children denied school: literacy,
numeracy, science, and critical thinking in Dari (RTL), English, and German. It's not a business —
free forever, no ads, no tracking. Read [`README.md`](README.md) for the full picture and
[`DO-NO-HARM.md`](DO-NO-HARM.md) for the safeguarding discipline that governs everything below.
This document is the front door for anyone who wants to help: what to do, how it's checked, and
what happens after.*

## The one rule that overrides everything else

**Sahar serves real children, most of them in unsafe or precarious situations. Nothing that a
child could read, hear, or see ships without three named human reviewers signing off first** — a
native-fa editor, a child-safety/safeguarding adviser, and a secular/regional-context reviewer.
This is not a formality; it's the reason `packs/teen-critical-thinking/` — a fully-written,
arithmetically-correct pack — still sits as an unshipped DRAFT today. See
[`contribute/REVIEWER-GATE.md`](contribute/REVIEWER-GATE.md) for the full rule, and that pack's own
`RED-TEAM.md` for what the gate looks like in practice. This applies to every contributor, human or
AI-assisted — no exception, ever, for content touching health, puberty, or sexual topics, which is
authored by qualified humans only, from the first word.

You do **not** need to be one of the three reviewers to contribute. Most contributions — code,
translation of UI chrome, documentation, funding leads, a first content draft — don't need the
gate at all, or only need it before the content ships, not before you can start.

## What Sahar is (short version)

An offline PWA — static files, a service worker, JSON content packs, a spaced-repetition (Leitner
box) engine, three UI languages. See `docs/ARCHITECTURE.md` for the real architecture and
`docs/CONTENT-MODEL.md` for the content schema.

## Ways to contribute

| Type | Examples | Definition of Done | Needs the gate? |
|---|---|---|---|
| **Code** | engine/app fixes, new features, tests | [`contribute/DOD-BY-TASK-TYPE.md`](contribute/DOD-BY-TASK-TYPE.md) §1 | Only if it adds learner-facing text |
| **Translation** | fixing `fa`/`en`/`de`, adding a language | §2 | For lesson content, yes; for UI chrome, native-fa pass only |
| **Content-pack authoring** | filling an [age-band module skeleton](contribute/modules/), a new lesson pack | §3 | **Always, full gate** |
| **Art / icons / audio** | an SVG icon, a mascot pose, draft audio | §4 | For symbolic/spoken content, yes |
| **Documentation** | fixing docs, improving this scaffold | §5 | No |
| **Funding / outreach** | a lead, an outreach draft | §6 | No |

Full detail for each: [`contribute/DOD-BY-TASK-TYPE.md`](contribute/DOD-BY-TASK-TYPE.md).

**If you want to write a lesson**, start at
[`contribute/modules/README.md`](contribute/modules/README.md) — five empty age-band skeletons
(8-10, 10-12, 12-14, 14-16, 16-18), each with UN/UNICEF-aligned objective headers and every content
slot marked `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]` until the gate clears.

## Step by step

1. **Fork** the repo, or branch directly if you have write access.
2. **Read the relevant doc first** — `docs/ARCHITECTURE.md` for code, `docs/CONTENT-MODEL.md` for
   content, `contribute/modules/README.md` for a new lesson. Don't guess the shape; it's written
   down.
3. **Make your change.**
4. **Run the checks:**
   ```
   npm test
   ```
   (runs `test/core.test.js`, `test/bootstrap.test.js`, `test/content-validator.test.js`,
   `test/profiles.test.js` — must exit 0). Standalone packs like
   `packs/teen-critical-thinking/` have their own `node <pack>/validate.js`.
5. **Check your task type's Definition of Done** —
   [`contribute/DOD-BY-TASK-TYPE.md`](contribute/DOD-BY-TASK-TYPE.md).
6. **Open a pull request.** Say what changed, why, and which checks prove it.
7. **See what happens next** — [`contribute/REVIEW-PATH.md`](contribute/REVIEW-PATH.md): automated
   checks → maintainer triage → (content only) the 3-reviewer gate → merge → (content only) a
   maintainer wires it into `content/packs.manifest.json` and it goes live.

A stranger who has never touched this repo before should be able to follow steps 1–6 above, for
any of the six contribution types, and land a mergeable PR.

## License

Dual-licensed on purpose: **code → [MIT](LICENSE)**, **original content → [CC-BY-SA
4.0](LICENSE-CONTENT.md)**. Anything you contribute is licensed under the matching terms — see
[`LICENSE-NOTE.md`](LICENSE-NOTE.md). Third-party sources you draw on keep their own license,
recorded per pack (`docs/OSS-REUSE.md`).

## Be the reviewer Sahar needs

The single biggest bottleneck right now is not code — it's the three human reviewer roles. If
you're a native Dari or Iran-Persian speaker, a child-safeguarding professional, or someone with
Afghanistan/Iran cultural-context expertise, that's the highest-leverage way to help. See
[`contribute/REVIEWER-GATE.md`](contribute/REVIEWER-GATE.md)'s "Who these people are" section.

## Questions

Open an issue, or see [`handbook/00-OVERVIEW.md`](handbook/00-OVERVIEW.md) for a four-layer
explanation of the whole project (child-simple through architect-level).

---

*For the children who were told to stop. Learn to live, live to learn.*
