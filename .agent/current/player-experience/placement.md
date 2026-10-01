## Entry and Placement

1. The normal phone route presents only the required AR launch gate.
2. The system scans for a surface within 5 degrees of vertical and proposes an
   upright frame pose.
3. If no reliable floor reference exists, placement pauses and guides the
   player through a floor scan before continuing.
4. The proposal starts near placement-device height, clamps the frame center to
   1.20-1.50 meters above a detected floor, and allows adjustment before lock.
5. The wall version targets a provisional gallery-centerpiece width of
   1.0-1.5 meters, adapting only within authored readability and safety bounds.
6. The complete outer bounds retain clear wall equal to 15% of the
   corresponding frame dimension on every side.
7. Standard wall play displays a 1.5-meter-wide by 1.0-meter-deep proposed
   viewing zone. The host checks it with environment sensing when available,
   but explicit player confirmation is always required.
8. Placement options expose a `Seated placement` preset with a lower frame
   proposal and stationary zone; the game and progression remain identical.
9. The player adjusts and locks the pose, then receives a 1.5-2.5 meter
   gallery-viewing guide.
10. The flat canvas folds into layered paper architecture and settles as the
    first playable lane. Reduced motion crossfades to the same final state with
    a static description.
11. Optional inspection remains supported through 30 degrees off-axis; beyond
   that range the host prompts recentering.
12. If no pose qualifies or a bounded floor scan fails, the experience offers a
   clearly labeled tabletop
   fallback using the same deterministic game and progression.
13. Simulator, desktop, tabletop, and physical wall AR results remain separately
   labeled.

Placement adjustment and lock:

- The proposed frame remains gravity-upright and flush to the accepted wall.
- The player may drag it only across the wall plane and pinch one uniform scale
  within the currently valid height, fit, and readability range.
- Depth and rotation are not player controls. The frame never bends to an
  uneven wall.
- Every adjustment updates visible fit, margin, viewing-zone, and contact
  feedback immediately.
- `Confirm Frame` becomes the placement hero control only when all required
  criteria pass and the player confirms both frame and viewing zone.
- A failed criterion names the issue and gives one relevant rescan, adjustment,
  another-wall, or tabletop route.
- `Reset proposal` is a contextual secondary action under placement details;
  calibration metrics and forced states remain debug-only.

These dimensions are provisional acceptance targets, not current runtime
behavior or proven physical thresholds. Exact zone pose, stationary-zone size,
scan timeout, obstruction boundary, control reach, seated reach, sensing
capabilities, and device-specific stability remain unresolved and require
physical-device evidence.

Viewing-zone safety:

1. If the host detects or the player reports an obstruction after lock, freeze
   JR, hazards, timers, effects, and input immediately.
2. Preserve the exact deterministic state, highlight the affected zone, and
   require player re-confirmation before resuming.
3. Never claim continuous obstruction monitoring on a device that lacks the
   required environment-sensing capability.

Tracking-loss behavior:

1. Pause JR, hazards, timers, effects, and input when the wall anchor is lost.
2. Keep the last stable frame descriptor and attempt bounded same-anchor
   recovery for up to five seconds while `Re-place Frame` remains available.
3. Accept a recovered pose only when translation is within 3% of frame width
   and rotation is within 3 degrees of the stored pose.
4. Ease the frame back to the stored pose while gameplay remains frozen, then
   resume the exact deterministic state.
5. If recovery fails, return to guided placement with the checkpoint,
   discoveries, attempt count, and assistance state preserved.
6. Never silently relabel a tracking failure as successful tabletop or physical
   wall proof.

Exact tracking recovery remains open: typed pause on explicit invalidity or
three limited/missing samples over `100 ms`; a foreground-only `5000 ms`
same-generation budget; `500 ms` stable reacquisition; `0.03W` in-plane,
`5 mm` normal, and `3°` axis/quaternion drift gates; full contact, zone, and
obstruction revalidation; a frozen `400 ms` zero-overshoot smoothstep followed
by explicit `Resume`; checkpoint-preserving Re-place on mismatch; and ten
cycles on each of six physical devices; invisible continued play; immediate
re-placement on one sample; or broad silent clamping.

