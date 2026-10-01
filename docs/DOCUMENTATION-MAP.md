# Lost Pages Documentation Map

Status: canonical authority map

This map assigns one owner to each documentation concern. Lower-priority files
may add detail, but they must not contradict their owner.

## Authority by Topic

| Topic | Canonical authority | Supporting or historical sources |
|---|---|---|
| Active mission and pass status | `goal.md` | `agent/goal.md` is a compatibility pointer. |
| Current implementation truth | `docs/CURRENT-STATE.md` plus live source/proof | Reports provide dated evidence. |
| Product and architecture history | `CHANGELOG.md` plus Git | `agent/run-log.md` and `agent/change-log.md` retain operational detail. |
| Durable repository conventions | `memory.md` | `agent/memory.md` contains only operating rules. |
| Active execution pointer | `agent/pointer.md` | `agent/workflow.md` defines the loop. |
| Dependency and ownership boundary | `agent/dependencies.md` | `docs/nexusengine-dependencies.md` explains it for readers. |
| Active feedback | `agent/feedback/active-feedback.md` | Inbox and log preserve intake/history. |
| Page slugs and runtime manifests | `src/ar/registry/experiences.js` | `docs/TRACEABILITY-MATRIX.md` is a human-readable mirror. |
| Print copy | `print/magazine-pages/` | Runtime copy must be checked for drift. |
| Page implementation status | `docs/CURRENT-STATE.md` | `docs/pages/*` describe design intent, not proof. |
| Final product and page specifications | `docs/FINAL-PRODUCT-GOAL.md` | Existing page docs provide design detail and implementation paths. |
| Shared gameplay state and interaction semantics | `docs/SIMPLE-GAMEPLAY-CONTRACT.md` | Page docs define only their closed verbs and authored beats. |
| Product architecture, DSK ownership, adapters, placement frame, budgets, and skill routing | `docs/ARCHITECTURE-SKILL-MAP.md` | Technical build map points to files but does not redefine ownership. |
| Execution gaps, dependencies, and status | `docs/GOAL-MATRIX.md` | Pass status summary remains in root `goal.md`. |
| Acceptance and proof language | `docs/QA-ACCEPTANCE.md` | Goal-matrix rows will name exact evidence. |
| Gameplay validation strategy | `docs/SIMULATOR-PLAYER-PROOF.md` | Simulator reports and Playwright artifacts provide dated evidence. |
| Provisional picture-frame discovery | `.agent/` archive | It has no implementation authority. |

## Read Order

For product or implementation work:

1. `goal.md`
2. `docs/CURRENT-STATE.md`
3. `agent/pointer.md`
4. `agent/feedback/active-feedback.md`
5. `memory.md`
6. the relevant source, page, architecture, and QA files

For history:

1. `CHANGELOG.md`
2. Git history
3. `agent/run-log.md`
4. `agent/change-log.md`
5. dated reports
6. `.agent/` provisional discovery ledgers

## Document Classes

### Canonical current documents

- `goal.md`
- `memory.md`
- `CHANGELOG.md`
- `docs/CURRENT-STATE.md`
- `docs/DOCUMENTATION-MAP.md`
- `docs/FINAL-PRODUCT-GOAL.md`
- `docs/SIMPLE-GAMEPLAY-CONTRACT.md`
- `docs/ARCHITECTURE-SKILL-MAP.md`
- `docs/GOAL-MATRIX.md`
- `agent/pointer.md`
- `agent/workflow.md`
- `agent/dependencies.md`
- `agent/feedback/active-feedback.md`

### Active supporting specifications

- `docs/DNA.md`
- `docs/EXPERIENCE-MODEL.md`
- `docs/GAME-MODEL.md`
- `docs/STYLE-GUIDE.md`
- `docs/ASSET-PIPELINE.md`
- `docs/QA-ACCEPTANCE.md`
- `docs/SIMULATOR-PLAYER-PROOF.md`
- `docs/TRACEABILITY-MATRIX.md`
- `docs/nexusengine-dependencies.md`
- `docs/pages/*`

These files describe intended design or acceptance structure. They are not
evidence that a feature exists.

### Historical orientation and operating records

- `docs/chatgpt-master-start-source.md`
- the pre-2026-08-08 body of `agent/state-intelligence-ledger.md`
- superseded prompts and workflows under `agent/`
- closed `.agent/` question and decision ledgers

Historical records remain readable for provenance but must link forward to the
canonical current documents.

## Reconciliation Rules

- Source and fresh proof outrank prose about current behavior.
- `goal.md` outranks older plans about what should be built next.
- `docs/CURRENT-STATE.md` outranks older state snapshots.
- Git and `CHANGELOG.md` own history; memory should not duplicate a run log.
- Page docs may describe intended design only when they label implementation
  status separately.
- `.agent/` preserves the picture-frame interview but no longer drives a
  repeated-question loop.
- When a current authority changes, update this map and its direct index links
  in the same batch.
