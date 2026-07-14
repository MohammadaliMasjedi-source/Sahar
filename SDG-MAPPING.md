# Sahar and the Sustainable Development Goals

*Written for Digital Public Goods Alliance review, 2026-07-14. Target descriptions below are
paraphrased in plain language from the official UN target list (source link at the bottom) — not
quoted verbatim. One honest paragraph per goal: what Sahar actually does today, and what it does
not yet do. No claim here is an impact claim — Sahar is a prototype, not yet piloted with real
children (see [`SAHAR-COVERAGE-STATUS.md`](SAHAR-COVERAGE-STATUS.md)).*

## SDG 4 — Quality Education (primary goal)

Sahar exists for **SDG 4** first. **Target 4.1** calls for all children to complete free,
equitable, quality primary and secondary education with real learning outcomes, not just
attendance — Sahar's whole reason to exist is the children this target is missing: girls in
Afghanistan locked out of secondary school since 2021, and any child anywhere with a device but no
school. **Target 4.5** calls for eliminating gender disparities and guaranteeing access for
children in vulnerable situations — Sahar addresses this directly by being free, offline, and
usable without registering anywhere a household could be identified (see
[`PRIVACY.md`](PRIVACY.md), [`DO-NO-HARM.md`](DO-NO-HARM.md)). **Target 4.6** calls for universal
literacy and numeracy — this is the concrete content that exists today: ten Tier-1 packs (literacy,
numeracy, science, critical thinking, life skills) plus four real Tier-2 packs, in Dari/Persian
(RTL), English, and German, built on a real spaced-repetition engine
([`docs/CURRICULUM-MAP.md`](docs/CURRICULUM-MAP.md)). **What Sahar does NOT yet address under
SDG 4:** only Tiers 1–2 of a planned four-tier curriculum exist; there is no secondary-level
content, no teacher/institutional certification pathway, and no measured learning-outcome data —
because there has been no pilot yet. "Serves SDG 4" here means *designed and built toward*, not
*proven to deliver*.

## SDG 5 — Gender Equality

Sahar's founding case is girls denied school specifically because they are girls. **Target 5.1**
calls for ending all forms of discrimination against women and girls — Sahar's core design choices
answer to exactly that: **plausible-deniability by design** (a secular, innocuous-looking app; no
requirement to reveal a learner's identity, sex, or reason for using it — see
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) §8), and content free of the framing that a girl
learning is unusual or wrong. **What Sahar does NOT yet address under SDG 5:** Sahar is a learning
tool, not a policy intervention — it cannot itself reopen a closed school, change a law, or protect
a girl from retaliation for being caught learning. It has not been used by, or tested with, any
real Afghan girl yet. Framing this as "serving SDG 5" is honest only in the narrow sense of
*removing one barrier* (access to safe, private, free instruction) — it is not a claim that Sahar
addresses gender discrimination more broadly.

## SDG 10 — Reduced Inequalities

**Target 10.2** calls for the social and economic inclusion of everyone regardless of status, and
**target 10.3** calls for equal opportunity regardless of circumstance of birth — Sahar contributes
to both by design: it is free forever (not a business, never ads, never sells data — see the
README's "Not-for-profit, free forever" section), runs on a borrowed or cheap phone with no data
plan required after the first load, and needs no institutional gatekeeper (no school enrollment,
no ID, no address) to start learning. This targets the specific inequality of a child who has
*none* of the usual preconditions for education — no school, no money, no safe status — rather than
improving an existing unequal system. **What Sahar does NOT yet address under SDG 10:** Sahar
assumes access to *some* device and *some* electricity; it does nothing for a child with neither.
There is no accessibility (disability) track yet, and no data on whether it actually reaches the
most excluded children versus the moderately excluded ones with an easier path to a phone.

## Bottom line

Sahar's design targets SDG 4 (primarily 4.1/4.5/4.6), SDG 5 (5.1), and SDG 10 (10.2/10.3) with real,
verifiable engineering choices — offline-first, free, private, gender-neutral in presentation. What
it has **not yet done** is prove impact against any of them with real learners. That gap is named
here on purpose, per the project's own rule: *REAL 90 > FAKE 100*.

---

**Sources:** UN SDG official target list — [Goal 4](https://sdgs.un.org/goals/goal4),
[Goal 5](https://sdgs.un.org/goals/goal5), [Goal 10](https://sdgs.un.org/goals/goal10)
(sdgs.un.org, UN Department of Economic and Social Affairs), verified 2026-07-14. Internal:
[`README.md`](README.md), [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md),
[`docs/CURRICULUM-MAP.md`](docs/CURRICULUM-MAP.md),
[`SAHAR-COVERAGE-STATUS.md`](SAHAR-COVERAGE-STATUS.md).
