# Sample translation-task template

*Copy this into an issue (to propose/log a translation task) or a PR description (once you've done
the work). Structure only — the bracketed examples below are illustrative, not real strings to
translate.*

---

## Translation task

**Target language:** `[e.g. fa, en, de, or a new language like Pashto/ps]`

**If `fa`: Dari or Iran-Persian?** `[state explicitly — see ../PROTOCOLS-AND-STANDARDS.md §2; the
two are not interchangeable in this project]`

**Scope:** `[e.g. "UI chrome only (button labels, menu items)" or "a full lesson pack:
content/t2-example-pack.json" — this determines whether the gate applies, see below]`

**Files touched:** `[list the exact file path(s), e.g. content/t1-example.json, or the STRINGS
dictionary location for UI chrome]`

## Translator declaration

- **Name/handle:** `[your name or handle]`
- **Fluency:** `[native / fluent + reviewed by a named native speaker]`
- **If reviewed by a native speaker, who:** `[name/handle, or "not yet — flagging as open" if this
  is a proposal rather than a finished translation]`

## Definition of Done checklist (from `../DOD-BY-TASK-TYPE.md` §2)

- [ ] Every string in the target file has a real translation — no empty/placeholder text left where
      real content should be.
- [ ] Translator fluency declared above.
- [ ] For RTL languages (fa, ps): rendering checked in-browser with the language active — screenshot
      attached.
- [ ] For `fa`: Dari-vs-Iran-Persian stated above, matching the pack/surface's declared audience.
- [ ] Meets `../PROTOCOLS-AND-STANDARDS.md` §2 in full, including the logical-CSS-property check for
      any layout this translation affects.

## Is this learner-facing content, or pure UI chrome?

`[Learner-facing content (a card, a lesson) / Pure UI chrome (labels, menus, no educational
content)]`

- If **learner-facing content**: this needs the full 3-reviewer gate (`../REVIEWER-GATE.md`) before
  it can ship — this PR/issue merges or stays open as DRAFT until that's recorded.
- If **pure UI chrome**: still needs a native-speaker naturalness pass before merge, but not the
  full gate.

## Screenshot (RTL languages only)

`[attach: before/after, or just after if this is a new language, showing the UI with the target
language active — confirms no broken mirroring]`
