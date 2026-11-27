# T-SAHAR-06: practice scheduling fix

Repeating an already-reviewed pack used to advance Leitner boxes and rewrite due dates. The fallback now marks non-due cards as practice-only. The scheduler preserves their state and the answer handler advances the practice session without writing learning progress. Genuinely due reviews retain the existing behavior.

Verification on 2026-11-27:
- Before implementation: core suite 30 passed, 3 failed. Both answer paths changed the future card, and the real answer handler wrote progress.
- After implementation: npm test exits 0: 33 core, 14 bootstrap, 134 content, 25 profiles, 36 teen-pack checks (242 total).
- No lesson text, schema version or interval changes. No browser/phone usability claim.
- Task remains in review until independent review and merge. No self-merge.

Reproduce: npm test. The regression tests are in test/core.test.js, including the real answer handler executed with storage and view boundaries isolated.

The current public tree has no .mc directory; this note records the next action instead of recreating removed private project metadata. Next: independent reviewer checks behavior and merges if accepted.
