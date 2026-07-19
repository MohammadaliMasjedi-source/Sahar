# Sahar — Do No Harm by Design

*Written 2026-07-14 for Digital Public Goods Alliance review, consolidating the safeguarding
discipline that already governs Sahar's content into one place. Every claim below is sourced from a
dated red-team document in this repo — linked, not just asserted. This is a summary for reviewers;
read the source documents for full detail and evidence.*

## The gate

Sahar's charter requires a **double red-team** before any content ships: a **pedagogy** review and
a **child-safeguarding** review, both mandatory, plus a **secular-audit** gate specific to this
project (Sahar serves Afghan children, so any religious/political/nationalist symbol in art or
copy is treated as an absolute defect, not a style choice). This is **self-run by the project
today** — an internal discipline enforced on every content lane, not yet an independent third-party
child-safety audit. That distinction is stated plainly so it isn't mistaken for external
certification.

Two full passes exist in this repo:
- [`docs/RED-TEAM-PEDAGOGY-SAFEGUARDING-2026-07-13.md`](docs/RED-TEAM-PEDAGOGY-SAFEGUARDING-2026-07-13.md)
  — the 6–8 age band (Tier 1), 11 content packs plus all presentation logic.
- [`docs/RED-TEAM-8-10-2026-07-14.md`](docs/RED-TEAM-8-10-2026-07-14.md) — the 8–10 age band
  (Tier 2), 4 new content packs plus the engine change that supports them.

Both passed pedagogy, passed child-safeguarding, and came back secular-audit clean.

## Child-data privacy (offline by design)

Verified independently in both red-team passes, not just claimed: `profiles.js` and the progress
ledger read and write `localStorage` only — no `fetch`, `XHR`, or beacon call touches child data
anywhere in the codebase. The only network activity at all is the app fetching its own bundled
files (content packs, audio manifest). "COPPA/GDPR-K clean by design" is the 2026-07-13 red-team's
own verdict. Full detail in [`PRIVACY.md`](PRIVACY.md) and [`DATA-HANDLING.md`](DATA-HANDLING.md).

## Content-appropriateness (the pedagogy gate)

Both passes checked age-fit vocabulary/sentence length/cognitive demand, scaffolding order (each
new idea calls back something already taught before asking for it unprompted), low cognitive load
(2–3 choices at a time, one idea per card), and — the concrete safeguard — **constructive, no-shame
feedback wired into the engine itself, not just the copy**: a wrong tap never records a
spaced-repetition lapse, only offers a gentle retry ("try again"), and answer text reframes being
wrong as part of learning. No timers, scores, streak-loss, or comparative pressure exist anywhere
in the app. The 2026-07-14 pass additionally verified mathematical/scientific correctness of the
new content (e.g., every arithmetic answer checked by hand).

## No social or harassment surface

Sahar has no chat, no comments, no multiplayer, no friend list, no leaderboard, no
user-generated-content field, and no way for one user to contact another — the app has no network
surface at all for a stranger to reach a child through it. This is a structural property (offline,
single-player, no server), not a moderation policy standing in for a missing one.

## The no-minors-harm rule

The one deliberately sensitive topic in the shipped content — "who is a trusted grown-up if you
ever feel scared, hurt, or unsafe" (`t1-life-healthy-and-safe.json`, card `hs-8`) — was reviewed
specifically for this. It is framed as a calm safety habit, not a test; keeps the child in control;
uses family-first examples; avoids stranger-danger fear framing; and includes **no disclosure
prompt** (it never asks the child to reveal anything actually happened). Every life-skills card was
additionally read once more, specifically against "could this get a child in trouble at home," and
found clean. The Tier-2 (8–10) content was checked the same way and introduced no new sensitive
topics.

## Secular / neutral framing

A standing, absolute rule for this project: no religious, political, or nationalist emblem, in any
icon, character, or theme. The 2026-07-13 audit went icon-by-icon across every glyph, avatar,
theme, and the app logo/favicon and found the tree clean *after* two earlier fixes already in
history (`d10859a` removed star-dots from a crescent glyph; the heroine's silhouette was redrawn to
remove any headscarf-as-religious-symbol reading). The audit also enforces a specific, non-obvious
rule: the moon and star icons must never appear adjacent or together in the same card/round, even
though neither alone is a religious symbol — because together they can misread as a national
emblem. Two low-severity adjacency risks (the avatar picker grid, and a bootstrap round that could
randomly offer both) were found and closed the same day (`profiles.js` reorder;
`bootstrap-core.js` distractor filter, verified with 500 seeded runs / 5,000 rounds, zero
co-occurrences after the fix). The 2026-07-14 pass re-confirmed the rule holds for all new content
and found no new symbol introduced.

## Findings, closed honestly

The discipline is shown working, not just asserted. From 2026-07-13: three low-severity findings
were logged and **all three closed the same day** — the avatar/distractor moon-star adjacency fixes
above, plus a data-honesty mismatch (a demo pack's declared age band didn't match where it was
actually shelved; corrected to match the documented standard). From 2026-07-14: one note was logged
and **left open on purpose** — native-Dari review of the newly authored `fa` strings by a native
speaker (Mo/Neda) is flagged as a standing human-review gate, not a blocker for a prototype. Every
fix was re-verified against the automated test suite: **content-validator 90/90 → 134/134,
core 28/28, bootstrap 14/14, profiles 25/25** across the two passes (201/201 passed, 0 failed, as
of 2026-07-14).

## Audio honesty (v1 is text-first — decided 2026-07-19)

The voice in the prototype today is a **machine-generated draft** (an Iranian-Persian TTS voice
standing in for Afghan Dari), and the app says so: a caregiver-panel banner labels it a temporary,
optional machine voice on every card. It never pretends to be a real Dari recording, because a
wrong-accent voice presented as real Dari would teach a child the wrong sounds. Verified 2026-07-19:
the machine audio is **optional and never blocks a lesson** — every lesson and every round remains
fully usable with audio missing, blocked, or failing (the audio layer degrades to a silent no-op).

Accordingly, **v1 ships text-first**. Real human Dari audio is a **funded-phase deliverable**,
sourced per [`audio/DARI-AUDIO-SOURCING-2026-07-19.md`](audio/DARI-AUDIO-SOURCING-2026-07-19.md)
(a paid Afghan-Dari voice professional or an adult diaspora volunteer, with an explicit open
licence). Standing safeguarding rule, restated there: **adult narrators only — never record a
child's voice.**

## Honest limits of this gate

- **This is a self-run internal review**, not an independent external child-safety audit. It is
  real, dated, and verifiable in this repo — but it is the same team building the product checking
  its own work, which is a real limit, named here rather than hidden.
- **No real child has used Sahar yet.** Every verdict above is about the content and the code, not
  about observed behavior with an actual learner. [`SAHAR-COVERAGE-STATUS.md`](SAHAR-COVERAGE-STATUS.md)
  is explicit that a real pilot, adult-supervised, is still a gate ahead of any "ready" claim.
  There is no incident-reporting mechanism because there is no online/social surface to report an
  incident from — but that also means the gate has never been tested against a real report.
  If a real pilot happens, this is the first place a real safeguarding-incident process would need
  to be added.
- **Tiers 3–4 don't exist yet**, so this gate has only ever been exercised on content for ages 6–10.
  The same double red-team is the required gate for every future tier — named here as a standing
  commitment, not a one-time pass.

*Source documents: [`docs/RED-TEAM-PEDAGOGY-SAFEGUARDING-2026-07-13.md`](docs/RED-TEAM-PEDAGOGY-SAFEGUARDING-2026-07-13.md),
[`docs/RED-TEAM-8-10-2026-07-14.md`](docs/RED-TEAM-8-10-2026-07-14.md). Related:
[`PRIVACY.md`](PRIVACY.md), [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) §8,
[`SAHAR-COVERAGE-STATUS.md`](SAHAR-COVERAGE-STATUS.md).*
