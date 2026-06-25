# State Intelligence Sync Workflow

Status: active

Use this workflow when the goal is to align Lost Pages agent state with non-agent source-of-truth docs and infer durable knowledge for future turns.

This is a documentation and intelligence workflow. It is not an implementation workflow.

## Purpose

A State Intelligence Sync turn should:

1. Read the repo-local `agent/` operating state.
2. Read the non-agent docs that define product, route, visual, print, QA, and build truth.
3. Report the current repo state before changing files.
4. Find drift between agent state and docs.
5. Infer durable future rules, risks, and missing decisions.
6. Update only docs and agent knowledge files needed to keep the repo coherent.
7. Leave app, route, runtime, print, and build implementation untouched unless explicitly instructed.

## Allowed files

A State Intelligence Sync turn may update:

- `agent/state-intelligence-ledger.md`
- `agent/memory.md`
- `agent/feedback/*`
- `agent/run-log.md`
- `agent/change-log.md`
- `agent/pointer.md` only if it is clearly stale, blocked, or misleading
- `docs/*`
- `docs/pages/*`
- `README.md`
- `output.md` only as the short public summary for the completed batch

## Disallowed files unless explicitly requested

Do not edit these during a state sync unless the user explicitly asks for implementation:

- `src/*`
- `print/*`
- `scripts/*`
- `.github/*`
- runtime behavior
- route behavior
- visual implementation
- AR/game implementation

## Required read order

1. `agent/start-here.md`
2. `agent/pointer.md`
3. `agent/workflow.md`
4. `agent/goal.md`
5. `agent/dependencies.md`
6. all files in `agent/feedback/`
7. `agent/memory.md`
8. `agent/run-log.md`
9. `agent/change-log.md`
10. `agent/state-intelligence-ledger.md` if present
11. `docs/chatgpt-master-start-source.md`
12. `docs/DNA.md`
13. `docs/FULL-OUTLINE.md`
14. `docs/STYLE-GUIDE.md`
15. `docs/TECHNICAL-BUILD-MAP.md`
16. `docs/QA-ACCEPTANCE.md`
17. `docs/TRACEABILITY-MATRIX.md`
18. `docs/STATE-ALIGNMENT-MAP.md` if present
19. `README.md`

## State report requirements

Before editing, identify:

- current true state
- active feedback
- pending implementation directions
- known drift between `agent/` and `docs/`
- docs that need alignment
- evidence inspected
- validation boundaries

## Drift classifications

Classify each mismatch as one of:

- active feedback not reflected in docs
- processed feedback still listed as active
- implemented work not reflected in docs
- docs claiming work that was not implemented
- stale route/QR/print assumption
- runtime boundary drift
- visual/product direction drift
- page packet drift
- deploy/output drift
- missing evidence or untested claim

## Inference expansion requirements

Infer durable knowledge for future agents, including:

- repeated user preferences
- recurring risks
- product direction changes
- architectural boundaries
- visual direction rules
- route/QR/print dependencies
- missing docs
- weak acceptance criteria
- overclaim risks
- decisions needed before implementation

Record inferences in the right location:

- `agent/memory.md` for durable operating rules
- `agent/feedback/active-feedback.md` for unresolved user direction
- `agent/feedback/processed-feedback.md` for resolved feedback
- `docs/STYLE-GUIDE.md` for durable visual rules
- `docs/TECHNICAL-BUILD-MAP.md` for route/source mapping
- `docs/QA-ACCEPTANCE.md` for validation rules
- `docs/DNA.md` or `docs/FULL-OUTLINE.md` for product direction
- `docs/TRACEABILITY-MATRIX.md` for slug/route/print/source alignment
- `agent/state-intelligence-ledger.md` for current state, pending work, and next-turn guidance

## Validation

A valid State Intelligence Sync turn should confirm:

- active feedback, feedback inbox, and feedback log agree
- docs clearly distinguish pending direction from implemented behavior
- processed feedback is not marked done unless implementation is evidenced
- no implementation files were changed unless explicitly requested
- no build, phone, camera, WebXR, or AR proof is claimed without testing

## Output format

End with:

- agent files read
- non-agent docs read
- implementation files inspected for evidence, if any
- mismatches found
- inferences added
- files changed
- files intentionally not changed
- validation performed
- validation not performed
- remaining risks
- recommended next turn
