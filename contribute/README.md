# `contribute/` — folder map

Start at [`../CONTRIBUTING.md`](../CONTRIBUTING.md) — that's the front door. This folder holds the
detail behind it:

| File | What it's for |
|---|---|
| [`DOD-BY-TASK-TYPE.md`](DOD-BY-TASK-TYPE.md) | Definition of Done, broken out by the kind of contribution (code, translation, content-pack authoring, art/audio, docs, funding/outreach). |
| [`REVIEW-PATH.md`](REVIEW-PATH.md) | What happens after you open a PR — automated checks, triage, the gate, going live. |
| [`REVIEWER-GATE.md`](REVIEWER-GATE.md) | The single source of truth for Sahar's mandatory 3-reviewer gate (native-fa editor + child-safety adviser + secular/regional reviewer). Every other document links here instead of restating the rule. |
| [`modules/`](modules/) | Five empty age-band module skeletons (8-10, 10-12, 12-14, 14-16, 16-18) — learning-objective headers only, every content slot flagged `[NEEDS 3 HUMAN REVIEWERS — do not fill without them]`. The starting point for anyone proposing new lesson content. |

Nothing in this folder is loaded by the app. It's a contribution surface, not runtime code.
