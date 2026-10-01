# 009 Final Product Goal

Status: active

## Goal

Complete Pass 3 by turning the desired eight-page journey into objective,
player-visible acceptance criteria before broader implementation begins.

## Required Inputs

- `goal.md`
- `docs/CURRENT-STATE.md`
- `docs/SIMULATOR-PLAYER-PROOF.md`
- `docs/DNA.md`
- `docs/FULL-OUTLINE.md`
- `docs/EXPERIENCE-MODEL.md`
- `docs/GAME-MODEL.md`
- `docs/QA-ACCEPTANCE.md`
- all eight `docs/pages/*/README.md` packets
- `agent/feedback/active-feedback.md`
- provisional `.agent/` picture-frame decisions only where they remain useful

## Decisions to Resolve

- one-sentence final player promise for the complete artifact;
- role, hero action, target duration, difficulty, failure, recovery, reward, and
  replay contract for each page;
- shared movement/platforming grammar and where picture-frame platforming is
  actually used;
- cross-page save receipts and Page 08 eligibility;
- simulator semantic actions and direct-route Playwright player goal per page;
- first-screen hero controls versus advanced/debug controls;
- supported fallback, accessibility, performance, and physical-AR host targets;
- final `/book/` compatibility behavior;
- whether object count is a density guideline or a hard requirement;
- exact release evidence and acceptable unverified host risks.

## UX Rule

Specify the desired interaction outcome before environment or final art. Every
page must make the current objective, available action, feedback, failure,
recovery, completion, and reward understandable with greybox primitives.

## Output

- one canonical final-product specification;
- one concise page contract for each of the eight pages;
- a resolved decision ledger with assumptions clearly labeled;
- measurable acceptance criteria ready to become Pass 4 matrix rows;
- no app/source implementation in this pass.

## Validation

- every criterion is observable through simulator proof, Playwright player
  proof, or a separately labeled physical-host proof;
- no criterion depends on physically scanning a QR code during iteration;
- no page requires environment polish to prove its core loop;
- current implementation is not mistaken for the final target;
- unresolved product choices are explicit rather than silently inferred.

## Completion

When these outputs are coherent across all eight pages, mark Pass 3 complete
and point to creation of the canonical goal matrix for Pass 4.
