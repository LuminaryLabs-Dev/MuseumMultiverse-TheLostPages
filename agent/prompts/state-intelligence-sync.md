# Lost Pages State Intelligence Sync

Status: active reusable prompt
Trigger phrase: `Run the Lost Pages State Intelligence Sync turn.`

## Goal

Run one Lost Pages State Alignment and Inference Expansion turn.

Do not implement product, route, runtime, print, visual, or game behavior unless the user explicitly asks for implementation.

## First, report the repo

Read:

1. `goal.md`
2. `docs/CURRENT-STATE.md`
3. `docs/DOCUMENTATION-MAP.md`
4. `agent/start-here.md`
5. `agent/pointer.md`
6. `agent/workflow.md`
7. `agent/dependencies.md`
8. all files in `agent/feedback/`
9. `memory.md`
10. `agent/memory.md`
11. `agent/run-log.md`
12. `agent/change-log.md`
13. `agent/state-intelligence-ledger.md` if present
14. key active non-agent docs under `docs/`
15. implementation files only if needed as evidence

Then report:

- current true state
- active feedback
- pending implementation directions
- known drift between `agent/` and `docs/`
- docs that need alignment
- implementation files not touched
- validation boundaries

## Then update only documentation and intelligence files

Allowed files:

- `agent/state-intelligence-ledger.md`
- `agent/memory.md`
- `agent/feedback/*`
- `agent/run-log.md`
- `agent/change-log.md`
- `docs/*`
- `docs/pages/*`
- `README.md`
- `output.md` as the short public summary for the completed batch

Do not edit these unless the user explicitly asks for implementation:

- `src/*`
- `print/*`
- `scripts/*`
- `.github/*`

## Infer durable knowledge

Look for:

- repeated user preferences
- recurring risks
- missing docs
- stale docs
- overclaim risks
- next implementation turns
- needed user decisions
- route/QR/print dependencies
- runtime boundary issues
- visual direction rules

## Validation

Confirm:

- updated docs do not contradict active feedback
- processed feedback is not marked done unless implemented
- docs clearly distinguish pending direction from implemented behavior
- no source/runtime files were changed unless explicitly requested
- no build, phone, camera, WebXR, or AR testing is claimed unless actually performed

## Required final response

End with:

- agent files read
- docs read
- drift found
- inferences added
- files changed
- files intentionally not changed
- validation performed
- validation not performed
- remaining risks
- recommended next turn
