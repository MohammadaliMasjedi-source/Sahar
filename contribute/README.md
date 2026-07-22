# `contribute/` — folder map

Start at [`../CONTRIBUTING.md`](../CONTRIBUTING.md) — that's the front door. This folder holds the
detail behind it:

| File | What it's for |
|---|---|
| [`INTERACTIVE-GUIDE.md`](INTERACTIVE-GUIDE.md) | Start here if you'd rather follow a guided, choose-your-contribution-type walkthrough than jump straight to a checklist. |
| [`DOD-BY-TASK-TYPE.md`](DOD-BY-TASK-TYPE.md) | Definition of Done, broken out by the kind of contribution — nine types: code, translation, content-pack authoring, art, audio, docs, funding/outreach, accessibility, testing. |
| [`PROTOCOLS-AND-STANDARDS.md`](PROTOCOLS-AND-STANDARDS.md) | The seven checkable contribution standards: offline-first, i18n + RTL, accessibility (WCAG AA), child-safety-by-design, licensing/attribution, data-minimization/privacy, performance budgets. |
| [`DEVICE-SUPPORT-MATRIX.md`](DEVICE-SUPPORT-MATRIX.md) | The device/target matrix Sahar is built for — low-end Android, feature phones (named out of scope, honestly), offline, shared/multi-child devices, screen-reader/accessibility — and the support standard per tier. |
| [`REVIEW-PATH.md`](REVIEW-PATH.md) | What happens after you open a PR — automated checks, triage, the gate, going live. |
| [`REVIEWER-GATE.md`](REVIEWER-GATE.md) | The single source of truth for Sahar's mandatory 3-reviewer gate (native-fa editor + child-safety adviser + secular/regional reviewer). Every other document links here instead of restating the rule. |
| [`modules/`](modules/) | Five empty age-band module skeletons (8-10, 10-12, 12-14, 14-16, 16-18) — learning-objective headers only, every content slot flagged `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`. The starting point for anyone proposing new lesson content. |
| [`SAMPLE-TEMPLATES/`](SAMPLE-TEMPLATES/) | Best-practice contribution templates — a sample PR description, a module fill-request marked needs-reviewers, a translation task, an accessibility check. Templates and structure only, zero child content. |

Nothing in this folder is loaded by the app. It's a contribution surface, not runtime code.
