# What happens after you contribute

*The path from "I made a change" to "it's part of Sahar" — so a stranger can pick a part, do it,
and know exactly what happens next instead of wondering into a void.*

## The short version

```
Fork/branch → make the change → run the checks → open a PR
   → automated checks run → maintainer triage
   → [learner-facing content only] 3-reviewer gate → sign-off recorded
   → merge → [content only] added to a manifest by a maintainer → it's live
```

Everything up to "merge" is normal open-source. The one Sahar-specific step is the gate, and it
only applies to content a child could read/hear/see (see
[`DOD-BY-TASK-TYPE.md`](DOD-BY-TASK-TYPE.md) for exactly which task types it covers).

## Step by step

### 1. Automated checks (every PR, no exceptions)
- `npm test` must exit 0 (core, bootstrap, content-validator, profiles suites).
- If you touched a standalone pack with its own validator (like
  `packs/teen-critical-thinking/validate.js`), that must also pass.
- These checks exist to catch shape/schema/i18n-parity problems mechanically, so the three human
  reviewers spend their time on judgment calls, not typos.

### 2. Maintainer triage
A maintainer reads the PR for fit: does it belong in this project, does it follow
`docs/ARCHITECTURE.md` and `docs/CONTENT-MODEL.md`, is the license story clean
(`docs/OSS-REUSE.md`). This is a fast pass, not the safety review — a maintainer approving triage
is not the same as the content being cleared to ship.

### 3. The gate (learner-facing content only)
If the PR adds or edits anything a child could read/hear/see, it **cannot merge into a shippable
location** until [`REVIEWER-GATE.md`](REVIEWER-GATE.md)'s three sign-offs are recorded in the repo.
Two ways this plays out, both already precedented in this repo:

- **Merge as DRAFT.** The PR merges, but the content lives outside
  `content/packs.manifest.json` and `sw.js`'s precache, clearly labeled DRAFT — exactly like
  `packs/teen-critical-thinking/` and `docs/drafts/*.json` sit today. This is usually the right
  call: it lets the work land and be improved on in the open while the three reviewers do their
  job asynchronously.
- **Hold the PR open** until the gate clears, if the maintainer prefers not to merge draft content
  at all. Either way, nothing reaches `content/packs.manifest.json`, `sw.js`, or any live shelf in
  the app without the gate.

### 4. Going live
Once all three reviewers have signed off (recorded per the template in `REVIEWER-GATE.md`), a
maintainer:
- adds the pack to `content/packs.manifest.json` under the correct age band,
- confirms `sw.js` precaches it,
- re-runs `npm test` to confirm the now-live content still validates,
- updates `SAHAR-COVERAGE-STATUS.md`'s honest tally.

Only after this is content "in Sahar" in the sense a real child could see it.

### 5. If the gate finds a problem
Not a failure — this is the gate working. Precedent:
`packs/teen-critical-thinking/RED-TEAM.md` logged 3 blockers and 8 should-fix items and the pack
correctly did **not** ship; the punch-list stayed attached to the pack so the next contributor
(or reviewer) knows exactly what's left. Do the same: leave the findings in the pack's own
`RED-TEAM.md` file, keep the pack in DRAFT, and let the next PR address the punch-list.

## A change resets the gate

Editing already-gated, live content is still a PR, still runs the automated checks, and — per the
standing rule that whoever applies a fix may never certify their own fix — still needs the
relevant reviewer(s) to re-sign for what changed before the edit reaches learners again. See
`REVIEWER-GATE.md`'s "A change resets the gate" section.

## Who merges

Currently: the project maintainer (Mohammadali Masjedi / repo owner). As trusted contributors
emerge, this can grow — that decision belongs to the maintainer, not to this document.
