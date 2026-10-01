## Current Spatial-Transform State

Sources: `src/ar/runtime/placement.js`, `src/ar/runtime/session.js`,
`src/ar/simulator/session.js`, `src/domains/ar-simulator/service.js`,
`package.json`, Page 02 and Page 05 `level.js`, and a bounded spatial-term
source search.

- Page 02 and Page 05 author free `x`, `y`, and `z` object values plus one
  scalar placement hint.
- The current shell projects those values into clamped 2D CSS positions; it
  does not expose a physical 3D frame transform.
- The current session passes opaque plane and anchor ids into NexusEngine and
  does not retain a serialized wall basis, frame-local pose, asset adapter, or
  contact descriptor in Lost Pages state.
- No inspected source defines canonical handedness or units, a canvas-center
  semantic origin, native-to-canonical asset transforms, a wall-to-frame
  transform hierarchy, uniform scale propagation, or separate backing and
  canvas planes.
- No inspected source stores a gravity-derived quaternion, persisted
  player-facing normal sign, full-hull planarity samples, or calibrated surface
  residuals.
- No inspected frame binding declares a versioned canvas-to-backing depth,
  semantic backing plane, canonical-bounds check, 2D support hull, stable
  centroid/vertex/edge/grid samples, uniform-root sample transforms, or
  persisted binding/sample identities; current mesh bounds therefore do not
  prove full-frame wall contact.
- No inspected source defines a calibration-and-binding-bound tolerance
  profile, per-sample penetration or gap limits, RMS residual, local-normal
  deviation, plane-polygon boundary margin, retained-outlier rule, or
  sample-specific rejection diagnostic.
- No inspected source pins a basis-to-quaternion conversion, resolves the
  equivalent `q`/`-q` sign near 180 degrees, canonicalizes negative zero,
  separates serialization rounding from computation, rejects degenerate
  orientation values, or limits previous-pose sign continuity to rendering.
- No inspected source records a same-generation gravity/plane stability window,
  gravity magnitude or direction spread, plane confidence, normal/offset drift,
  a gravity-relative verticality test, measurement summary/source identities,
  or named rescan diagnostics for an unstable proposal.
- The current `Tap to place` flow does not expose bounded wall-local adjustment,
  `Reset proposal`, per-criterion placement diagnostics, or an atomic
  `Confirm Frame` gate.
- The current runtime places one slug-derived anchor id but a bounded source
  search found no anchor-pose tracking listener or same-anchor recovery state.
  No inspected source defines explicit versus limited/missing loss thresholds,
  pause latency, foreground-only timeout, stable reacquisition window,
  generation/identity fencing, axis-specific translation and rotation gates,
  contact/zone/obstruction revalidation, frozen-pose easing, Resume/Re-place
  focus and copy, or physical-device false-resume and post-pause-tick evidence.
- No inspected source maps pointer rays to canonical wall-local `X/Y`, anchors
  a pinch to a stable wall-local centroid, excludes twist/normal motion,
  snapshots and versions adjustment candidates, separates render smoothing
  from semantic values, rolls back cancellation/tracking loss, or supplies
  equivalent focusable nudge and scale commands.
- No inspected source defines an ordered placement-diagnostic catalog, stable
  criterion codes and typed statuses, observed-versus-required values,
  sample/region attribution, dependency revisions, remediation commands,
  highest-priority hero messaging, or an accessible detailed checklist bound
  to the same candidate as `Confirm Frame`.
- The current AR simulator builds one fixed seeded Page 01 room with one back
  wall normal and anchor, then exposes only detect, place, snapshot, and reset.
  No inspected test or simulator source supplies Page 05 calibration/binding
  matrices, boundary-pair cases, invalid structures, contact/obstruction
  geometry, temporal tracking traces, input-equivalence traces, or expected
  diagnostic, transform, sample, command, and canonical-hash assertions.
- A bounded physical/device evidence search found only a phone-handoff image
  and the repo instruction not to treat simulator output as physical AR proof.
  No inspected artifact records a supported-device matrix, real wall/contact
  measurements, floor/zone/obstruction trials, tracking-loss recovery, seated
  or one-handed human sessions, exact-build evidence binding, or a physical-AR
  promotion verdict.
- Existing page-pivot and paper-mesh helpers are route-specific renderer code;
  they do not prove the proposed picture-frame spatial contract.

