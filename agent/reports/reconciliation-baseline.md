# Reconciliation baseline — 2026-09-22

Remote HEAD and main verified at `a0cc7c38038e7a2e1c16cd9f426bc11ca63cc5e0`.

Preservation: local tar archive `lost-pages-before-reconciliation-20260922.tar.gz` outside the repository. Archive listing verified (578 entries). Includes existing working files; excludes Git database, installed dependencies, build output, browser caches and environment files. Environment files remain in place. No original deleted.

## Execution status

- Phase 0: repository baseline and preservation completed; Unity/Nexus source asset resolution pending.
- Phases 1–2: reconciliation in progress. Historical claims must be dated; existing local work remains preserved.
- Phase 3: control contract clarification pending: latest joystick + Jump, non-AR Page 01, pause-menu UI versus attached auto-run/context-action specification.
- Phase 4: independent clock, input cancellation and GPU lifetime defects repaired; eight complete gameplay loops remain pending.
- Phases 5–17: pending. No new character conversion, final artwork, final games, PDF acceptance or device AR proof claimed.
- Phase 18: Drive root and existing Intent & Handoff tracker verified by connector. No writes yet.
- Phase 19: no release yet; source main push is authorized. Website publication remains gated by release acceptance.

## Findings

1. Existing shared 3D runtime uses proximity completion without saved receipts. All eight scenes loading is not eight games complete.
2. Original 250 ms smoke advance discarded 200 ms. New clock proof checks elapsed time and frame-rate independence.
3. Existing 30-second video is first 30 seconds of an 86.166-second recording; later-scene coverage claim withdrawn.
4. The first isolated build failed: tracked `src/main.js` imports `createPage02SimulatorRuntime`, absent from the tracked simulator. The existing local Page 01/02 simulator, view, styles, kit/service dependencies and proof scripts are now included in the reconciliation candidate. The second isolated build and both page proofs passed.
5. README describes joystick direction; older final-product docs prescribe auto-run. Resolve before replacing gameplay.
6. Vite builds locally with bundle-size and Node built-in externalization warnings; these remain open.

## Validation completed in this pass

- Isolated staged-source install using `npm ci --ignore-scripts`: passed.
- `proof:clock`: passed with 30/60/144 fps and irregular time partitions; 250 ms means 15 fixed ticks.
- Isolated `proof:page01` and `proof:page02`: passed. These validate existing simulator prototypes, not the separate 3D game runtime.
- Isolated `build:luminary`: passed; 23 routes, 50 release files. Temporary validation commit `7965c3366fbbd00739af497c8cdb789de3c0b8ee`, sourceDirty=false. Not a public deployment receipt.
- Browser pause menu: observed Resume focus, reverse-Tab wrap to Return to Page, and Escape resume; screenshot inspected.
- Eight-route smoke: PASS on all eight routes, asserting 15 ticks and 0.775 units of movement per 250 ms, then unchanged state after a paused 1000 ms advance. A hot-reload-contaminated earlier run was rejected. This is not eight-game completion proof.

## Delivery boundary

This is the first implementation batch, not completion of the 20-phase plan.
The simulator dependency closure is being preserved so GitHub can build the
same source locally tested. It does not choose auto-run as the final controls.
No Unity assets, Drive records or Website deployment have been changed.

## Source inventory during reconciliation

Includes new clock/evidence files created in this pass. Existing changes must not be bulk-staged without review.

```text
 M .agent/evidence/2026-09-19-video-smoke-proof.md
 M .gitignore
 M README.md
 M agent/change-log.md
 M agent/dependencies.md
 M agent/feedback/active-feedback.md
 M agent/goal.md
 M agent/memory.md
 M agent/pointer.md
 M agent/prompts/000-index.md
 M agent/prompts/007-eight-page-structure-plan.md
 M agent/prompts/008-nexusrealtime-integration-audit.md
 M agent/prompts/autonomous-bounded-turn.md
 M agent/prompts/state-intelligence-sync.md
 M agent/run-log.md
 M agent/start-here.md
 M agent/state-intelligence-ledger.md
 M agent/workflow.md
 M agent/workflows/000-index.md
 M agent/workflows/dependency-review-workflow.md
 M agent/workflows/feedback-ingest-workflow.md
 M agent/workflows/prototype-workflow.md
 M agent/workflows/state-intelligence-sync-workflow.md
 M docs/AGENT-BUILD-MANUAL.md
 M docs/DNA.md
 M docs/EXPERIENCE-MODEL.md
 M docs/FULL-OUTLINE.md
 M docs/GAME-MODEL.md
 M docs/PAGE-DOC-STANDARD.md
 M docs/PITCH-DECK.md
 M docs/QA-ACCEPTANCE.md
 M docs/README.md
 M docs/STATE-ALIGNMENT-MAP.md
 M docs/STYLE-GUIDE.md
 M docs/TECHNICAL-BUILD-MAP.md
 M docs/agent-operating-model.md
 M docs/chatgpt-master-start-source.md
 M docs/eight-pages-qr-structure.md
 M docs/pages/Page01-SleepingGallery/README.md
 M docs/pages/Page02-FrameThatBreathes/README.md
 M docs/pages/Page03-LostChildsSketchbook/README.md
 M docs/pages/Page04-CuratorsWarning/README.md
 M docs/pages/Page05-TinyPlatformerDiorama/README.md
 M docs/pages/Page06-InBetweenExhibit/README.md
 M docs/pages/Page07-MonsterBehindCanvas/README.md
 M docs/pages/Page08-SecretPortalRoom/README.md
 M docs/pages/README.md
 M docs/project-overview.md
 M docs/repository-map.md
 M docs/supporting-content/README.md
 M memory.md
 M package.json
 M scripts/export-static-routes.mjs
 M scripts/smoke-game.sh
 M src/ar/simulator/session.js
 M src/ar/simulator/view.js
 M src/game/runtime.js
 M src/styles.css
?? .agent/README.md
?? .agent/architecture/provisional-skill-graph.md
?? .agent/archive/architecture-batch-recap.md
?? .agent/archive/legacy-agent-map.md
?? .agent/archive/migration-manifest.md
?? .agent/archive/override-reminders.md
?? .agent/archive/pre-cleanup-record-shape.md
?? .agent/current/architecture.md
?? .agent/current/architecture/activation.md
?? .agent/current/architecture/assembly.md
?? .agent/current/architecture/domain-service.md
?? .agent/current/architecture/guidance.md
?? .agent/current/architecture/handoffs.md
?? .agent/current/architecture/lower-skills.md
?? .agent/current/architecture/memory-records.md
?? .agent/current/architecture/orchestrators.md
?? .agent/current/architecture/overview.md
?? .agent/current/architecture/packages.md
?? .agent/current/architecture/performance.md
?? .agent/current/architecture/release-operations.md
?? .agent/current/architecture/shared-platformer.md
?? .agent/current/architecture/spatial.md
?? .agent/current/architecture/validation.md
?? .agent/current/brief.md
?? .agent/current/frontier.md
?? .agent/current/index.md
?? .agent/current/player-experience/architecture-proof.md
?? .agent/current/player-experience/content-integrity.md
?? .agent/current/player-experience/finale-completion.md
?? .agent/current/player-experience/index.md
?? .agent/current/player-experience/placement.md
?? .agent/current/player-experience/play.md
?? .agent/current/player-experience/sections-feedback.md
?? .agent/current/player-experience/spatial-visual.md
?? .agent/current/player-experience/variants.md
?? .agent/decisions/current-brief-gameplay.md
?? .agent/decisions/current-brief.md
?? .agent/decisions/index.md
?? .agent/decisions/ledger/b001-020.md
?? .agent/decisions/ledger/b021-040.md
?? .agent/decisions/ledger/b041-058.md
?? .agent/decisions/ledger/b059.md
?? .agent/decisions/ledger/b060.md
?? .agent/decisions/ledger/b061.md
?? .agent/decisions/ledger/b062.md
?? .agent/decisions/ledger/b063.md
?? .agent/decisions/ledger/b064.md
?? .agent/decisions/ledger/b065.md
?? .agent/decisions/ledger/b066.md
?? .agent/decisions/ledger/b067.md
?? .agent/decisions/ledger/b068.md
?? .agent/decisions/ledger/b069.md
?? .agent/decisions/ledger/b070.md
?? .agent/decisions/ledger/b071.md
?? .agent/decisions/ledger/b072.md
?? .agent/decisions/ledger/b073.md
?? .agent/decisions/ledger/b074.md
?? .agent/decisions/ledger/b075.md
?? .agent/decisions/ledger/b076.md
?? .agent/decisions/ledger/b077.md
?? .agent/decisions/ledger/b078.md
?? .agent/decisions/ledger/b079.md
?? .agent/decisions/ledger/b080.md
?? .agent/decisions/ledger/b081.md
?? .agent/decisions/ledger/b082.md
?? .agent/decisions/ledger/b083.md
?? .agent/decisions/ledger/b084.md
?? .agent/decisions/ledger/b085.md
?? .agent/decisions/picture-frame-platformer.md
?? .agent/design/provisional-player-experience.md
?? .agent/evidence/app-state.md
?? .agent/evidence/assets-provenance.md
?? .agent/evidence/boundary.md
?? .agent/evidence/content-runtime.md
?? .agent/evidence/current-app-state.md
?? .agent/evidence/index.md
?? .agent/evidence/interaction-feedback.md
?? .agent/evidence/orchestration.md
?? .agent/evidence/page05.md
?? .agent/evidence/page08-progression.md
?? .agent/evidence/spatial.md
?? .agent/goal.md
?? .agent/ideas/current.md
?? .agent/ideas/evidence-and-intentions.md
?? .agent/ideas/index.md
?? .agent/ideas/open-batch-frontier.md
?? .agent/ideas/open.md
?? .agent/ideas/picture-frame-platformer.md
?? .agent/ideas/provisional-direction-visual-gameplay.md
?? .agent/ideas/provisional-direction.md
?? .agent/questions/archive/q001-100.md
?? .agent/questions/archive/q101-200.md
?? .agent/questions/archive/q201-285.md
?? .agent/questions/archive/q286-290.md
?? .agent/questions/archive/q291-295.md
?? .agent/questions/archive/q296-300.md
?? .agent/questions/archive/q301-305.md
?? .agent/questions/archive/q306-310.md
?? .agent/questions/archive/q311-315.md
?? .agent/questions/archive/q316-320.md
?? .agent/questions/archive/q321-325.md
?? .agent/questions/archive/q326-330.md
?? .agent/questions/archive/q331-335.md
?? .agent/questions/archive/q336-340.md
?? .agent/questions/archive/q341-345.md
?? .agent/questions/archive/q346-350.md
?? .agent/questions/archive/q351-355.md
?? .agent/questions/archive/q356-360.md
?? .agent/questions/archive/q361-365.md
?? .agent/questions/archive/q366-370.md
?? .agent/questions/archive/q371-375.md
?? .agent/questions/archive/q376-380.md
?? .agent/questions/archive/q381-385.md
?? .agent/questions/archive/q386-390.md
?? .agent/questions/archive/q391-395.md
?? .agent/questions/archive/q396-400.md
?? .agent/questions/archive/q401-405.md
?? .agent/questions/archive/q406-410.md
?? .agent/questions/archive/q411-415.md
?? .agent/questions/archive/q416-420.md
?? .agent/questions/archive/q421-425.md
?? .agent/questions/current.md
?? .agent/questions/index.md
?? .agent/questions/picture-frame-platformer.md
?? CHANGELOG.md
?? agent/archive/goal-2026-07-10.md
?? agent/prompts/009-final-product-goal.md
?? agent/prompts/010-goal-matrix.md
?? agent/prompts/011-simple-gameplay-contract.md
?? agent/prompts/012-architecture-skill-map.md
?? agent/prompts/013-page01-player-slice.md
?? agent/prompts/014-page02-player-slice.md
?? agent/prompts/015-page03-player-slice.md
?? agent/reports/2026-08-08-final-product-goal-simulation.md
?? agent/reports/2026-08-08-page01-player-slice-proof.md
?? agent/reports/2026-08-08-page02-player-slice-proof.md
?? agent/reports/2026-08-08-simple-gameplay-contract-simulation.md
?? agent/reports/2026-08-08-simulator-player-baseline.md
?? agent/reports/evidence/2026-08-08-page01-desktop-reward.png
?? agent/reports/evidence/2026-08-08-page01-final-desktop-reward.png
?? agent/reports/evidence/2026-08-08-page01-final-mobile-reward.png
?? agent/reports/evidence/2026-08-08-page01-mobile-placement.png
?? agent/reports/evidence/2026-08-08-page01-mobile-plan.png
?? agent/reports/evidence/2026-08-08-page01-mobile-recovery.png
?? agent/reports/evidence/2026-08-08-page01-mobile-reward.png
?? agent/reports/evidence/2026-08-08-page01-simulator-complete.png
?? agent/reports/evidence/2026-08-08-page02-desktop-reward.png
?? agent/reports/evidence/2026-08-08-page02-mobile-frame-built.png
?? agent/reports/evidence/2026-08-08-page02-mobile-frame-empty.png
?? agent/reports/evidence/2026-08-08-page02-mobile-header.png
?? agent/reports/evidence/2026-08-08-page02-mobile-placement.png
?? agent/reports/evidence/2026-08-08-page02-mobile-recovered.png
?? agent/reports/evidence/2026-08-08-page02-mobile-reward.png
?? agent/workflows/twelve-pass-program.md
?? docs/ARCHITECTURE-SKILL-MAP.md
?? docs/CURRENT-STATE.md
?? docs/DOCUMENTATION-MAP.md
?? docs/FINAL-PRODUCT-GOAL.md
?? docs/GOAL-MATRIX.md
?? docs/SIMPLE-GAMEPLAY-CONTRACT.md
?? docs/SIMULATOR-PLAYER-PROOF.md
?? goal.md
?? output/playwright/invalid-numbered-route.png
?? output/playwright/invalid-route-recovery.png
?? output/playwright/lost-pages-30s-walkthrough-v2.webm
?? output/playwright/nav-test.webm
?? output/playwright/numbered-route-page08.png
?? output/playwright/test.webm
?? scripts/prove-game-clock.mjs
?? scripts/prove-page01-player-slice.mjs
?? scripts/prove-page02-player-slice.mjs
?? src/app/adapters/storagePort.js
?? src/domains/auto-runner/service.js
?? src/domains/journey-progress/service.js
?? src/domains/lost-pages-gameplay/service.js
?? src/experiences/frame-that-breathes/gameplay.js
?? src/experiences/sleeping-gallery/gameplay.js
?? src/game/clock.js
?? src/kits/autoRunnerKit.js
?? src/kits/journeyProgressKit.js
?? src/kits/lostPagesGameplayKit.js
```
