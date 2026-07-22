# The mandatory 3-reviewer gate

*This file is the single source of truth for Sahar's content gate. Every module skeleton under
[`modules/`](modules/) links back here instead of restating the rule, so the rule only has to be
kept correct in one place. It formalizes the discipline already proven in
[`../DO-NO-HARM.md`](../DO-NO-HARM.md) and demonstrated in practice by
[`../packs/teen-critical-thinking/RED-TEAM.md`](../packs/teen-critical-thinking/RED-TEAM.md) — the
one time Sahar drafted teen content and ran it through this exact process.*

## The rule, stated once, absolutely

**No content that a child or teenager could ever read, hear, or see leaves DRAFT status without
three named human reviewers signing off, in this repo, in writing.** Not two. Not "an AI checked
it." Not "it looks fine." Three humans, every time, no exceptions — including for content that
looks harmless, including for a single sentence, including for a re-edit of already-approved
content if the edit changes meaning.

This applies to every content type Sahar ships: lesson cards, exercises, answer keys, example
sentences, audio scripts, teacher/caregiver notes, icons or art with any symbolic content, and any
UI copy a learner would read. It does **not** apply to pure engineering (code, tests, tooling,
build scripts) that contains no learner-facing text — see
[`DOD-BY-TASK-TYPE.md`](../contribute/DOD-BY-TASK-TYPE.md) for that boundary.

## The three roles

### 1. Native-fa editor
Reads and edits every `fa` string for naturalness and age/register fit. **"fa" is not one
language here** — Sahar serves both Afghan Dari (the Tier-1/Tier-2 shipped content) and, for the
teen-facing packs, Iran-Persian (see `packs/teen-critical-thinking/README.md`'s
`localizationNote` precedent). The reviewer must match the variant to the pack's declared
audience, and the pack must declare which variant it is written in before this review can even
start. An automated pass — including anything an AI assistant writes — **cannot** satisfy this
role. Concrete precedent: the calque bundle found in `packs/teen-critical-thinking/RED-TEAM.md`
(SHOULD-FIX section) is exactly the kind of error only a native reader catches.

### 2. Child-safety / safeguarding adviser
Confirms nothing in the content could get a child in trouble at home or with the state, contains
no disclosure prompt (nothing that asks a child to reveal something happened to them), uses no
shame or comparative-pressure framing, and is developmentally appropriate for the stated age band.
For anything touching the body, health, puberty, or relationships, this reviewer's sign-off is
non-negotiable and cannot be skipped or fast-tracked — see the HARD RULE in every module skeleton.

### 3. Secular / regional-context reviewer
Screens for religious, political, or nationalist symbols or framing — an absolute defect under
`DO-NO-HARM.md`, not a style note. Matched to the pack's audience: Afghanistan-context for
Dari/Afghan-girls content, Iran-context for Iran-Persian teen content. Concrete precedent: the
moon-and-star adjacency rule and the "توسل به مرجع" / "با منی یا دشمنِ منی" findings in the two
red-team documents already in this repo are exactly this reviewer's job.

## What "signed off" means

A gate pass is recorded as a dated markdown file (or a clearly labeled section in the pack's own
`RED-TEAM.md`, following the `packs/teen-critical-thinking/` precedent), stating:

```
## Gate sign-off — <pack id / module id>

- [ ] Native-fa editor:        <name>, <date>, <one line: what was checked/changed>
- [ ] Child-safety adviser:    <name>, <date>, <one line>
- [ ] Secular/context reviewer:<name>, <date>, <one line>

Verdict: PASS / PASS WITH FIXES (list them) / NO — do not ship
```

All three boxes must be checked, by three **different** named people, before a maintainer may:
- add the pack to `content/packs.manifest.json`,
- reference it from `sw.js`'s precache list, or
- link it from any age-band shelf in the live app.

Until then the content stays exactly where a draft belongs: in its own folder, clearly labeled
DRAFT, outside every manifest — the same place `packs/teen-critical-thinking/` and
`docs/drafts/*.json` sit today. "Held out of the shelf" is not optional politeness; it is the
gate.

## A change resets the gate

Per the standing house rule (*whoever applies a fix may never certify their own fix*), any edit to
already-signed-off content — even a typo fix — voids the previous sign-off for the changed part.
A fresh review is required for what changed; it does not need to be all three reviewers again from
scratch if the edit is narrow and one reviewer's domain (e.g., a pure wording fix only touches the
native-fa editor's domain) — but that judgment call itself must be made and stated by a human, not
assumed.

## Who these people are (not yet filled in)

This scaffold defines the **role**, not the **person**. Recruiting the three actual reviewers —
ideally a native Dari speaker, a native Iran-Persian speaker (may be two different people), a
child-safeguarding professional, and someone with Afghanistan/Iran cultural-context expertise — is
a standing open task. See [`../CONTRIBUTING.md`](../CONTRIBUTING.md) if you are, or know, one of
these people.
