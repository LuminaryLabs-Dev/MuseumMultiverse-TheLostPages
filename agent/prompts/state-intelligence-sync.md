# Lost Pages State Intelligence Sync

Status: active reusable prompt
Trigger phrase: `Run the Lost Pages State Intelligence Sync turn.`

## Goal

Run one Lost Pages State Alignment and Inference Expansion turn.

Do not implement product, route, runtime, print, visual, or game behavior unless the user explicitly asks for implementation.

## First, report the repo

Read:

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
11. key non-agent docs under `docs/`
12. implementation files only if needed as evidence

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
