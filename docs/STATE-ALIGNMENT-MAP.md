# Lost Pages State Alignment Map

Status: active supporting doc

## Purpose

This map explains which files must be checked when agent state changes and how to keep Lost Pages documentation, feedback, and implementation assumptions aligned.

Use this document during a State Intelligence Sync turn.

## Agent state files

```text
agent/start-here.md
agent/pointer.md
agent/workflow.md
agent/goal.md
agent/dependencies.md
agent/feedback/active-feedback.md
agent/feedback/feedback-inbox.md
agent/feedback/feedback-rules.md
agent/feedback/feedback-log.md
agent/feedback/processed-feedback.md
agent/memory.md
agent/run-log.md
agent/change-log.md
agent/state-intelligence-ledger.md
```

## Product docs to align

```text
docs/chatgpt-master-start-source.md
docs/project-overview.md
docs/DNA.md
docs/FULL-OUTLINE.md
docs/PITCH-DECK.md
docs/supporting-content/README.md
README.md
```

## Visual docs to align

```text
docs/STYLE-GUIDE.md
docs/DNA.md
docs/FULL-OUTLINE.md
agent/feedback/active-feedback.md
agent/state-intelligence-ledger.md
```

## Route docs to align

```text
docs/TECHNICAL-BUILD-MAP.md
docs/TRACEABILITY-MATRIX.md
docs/chatgpt-master-start-source.md
README.md
agent/goal.md
agent/pointer.md
```

## Feedback docs to align

```text
agent/feedback/active-feedback.md
agent/feedback/feedback-inbox.md
agent/feedback/feedback-rules.md
agent/feedback/feedback-log.md
agent/feedback/processed-feedback.md
agent/memory.md
agent/state-intelligence-ledger.md
```

## Implementation evidence files

Only inspect these when evidence is needed. Do not edit them during a State Intelligence Sync unless explicitly asked.

```text
src/app/routes/router.js
src/app/launcher/renderLauncher.js
src/app/launcher/renderPrint.js
src/app/launcher/bookScene.js
src/app/launcher/pageTextures.js
src/ar/registry/experiences.js
src/experiences/shared/rewards.js
scripts/export-static-routes.mjs
.github/workflows/deploy-lost-pages.yml
print/magazine-pages/
```

## What can be changed in a sync turn

- agent docs and memory
- feedback inbox/log/rules/active/processed files
- state intelligence ledger
- non-agent docs under `docs/`
- README
- output summary

## What must wait for implementation

- source changes under `src/`
- print source changes under `print/`
- build/export/deploy script changes
- route behavior changes
- app navigation changes
- visual implementation changes
- AR/game/runtime changes

## State sync validation checklist

A State Intelligence Sync is valid when:

- active feedback is mirrored in inbox/log or intentionally marked as not mirrored with a reason
- docs distinguish pending direction from implemented behavior
- processed feedback is not marked done unless implementation, rejection, or supersession is evidenced
- route docs describe current implementation and pending direction separately
- source files are not changed unless implementation was explicitly requested
- build, device, phone, camera, WebXR, and AR claims are not made without testing

## Current high-priority alignment topic

Active feedback currently prefers a print-first presentation model:

```text
/print/ = primary non-AR review/presentation surface
/book/ = current route, pending demotion/removal/redirect/legacy decision
```

Do not remove or redirect `/book/` during a sync turn. That is implementation work.
