# Lost Pages Final Product Goal

Status: canonical final target

This document defines what the finished eight-page product must do. It is a
target specification, not a claim about current implementation. Use
`CURRENT-STATE.md` for current proof and the Pass 4 goal matrix for execution.

## Product Promise

A player opens any Lost Page, understands one immediate action, shapes or
reveals a short museum route, guides JR through it with one-button platforming,
receives a durable page reward, and sees that reward advance the final portal.

The final product is an eight-page printed companion with public routes, but
routine development and gameplay proof use direct simulator/debug URLs rather
than physical QR scanning.

## Final Decisions

- Pages 01-07 may be completed in any order. Narrative order is recommended,
  not enforced.
- Page 08 may be visited at any time, but its finale begins only after the
  seven earlier reward receipts exist.
- Page 08 never requires its own unearned reward. Its completion creates slot
  eight and the Final Portal Key.
- Every route uses the same simple `Plan -> Run -> Reward` grammar.
- JR auto-runs on a readable authored path. The player does not steer with a
  joystick or free-roam.
- During motion, `Jump` is the only normal hero control.
- At a safe stop, one page-specific contextual action replaces `Jump`; the two
  are never required simultaneously.
- Page 02 teaches living-frame route construction. Page 05 is the fullest
  spiritual successor to Museum Multiverse's living-picture-frame finale.
  Page 08 remixes only a small mastered subset.
- A missed jump causes a short checkpoint rewind, never a route-ending game
  over.
- Invalid puzzle/context input does not mutate accepted state and gives one
  plain-language reason.
- The prior 100-300-object idea is a world-density guideline, not a completion
  gate. No page passes because of object count.
- `/book/` remains a hidden compatibility alias to the shared reader. It is not
  a primary navigation destination or separate product.
- A-Frame is optional. If introduced later, it is an app-owned spatial host or
  renderer adapter; it never owns gameplay rules.

## Shared Player Flow

```text
direct route or printed-page link
  -> minimal start gate
  -> simulated or physical placement confirmation
  -> page premise plus one next action
  -> Plan: one obvious page-specific interaction
  -> Start Run
  -> auto-run with one large Jump control
  -> checkpoint-safe contextual beats
  -> explicit final action
  -> completion receipt and page reward
  -> Continue Journey or Replay
```

Placement is a host concern. In the simulator it is one deterministic confirm
step; in AR it is one guided wall, tabletop, or floor/pedestal confirmation.
The gameplay state after confirmation is identical.

## Controls and First-Screen UX

### Hero controls

Only the action needed now appears in the main action area:

- `Start`
- `Confirm Placement`
- the current page-specific action
- `Start Run`
- `Jump`
- the current completion action
- `Continue Journey`, `Replay`, or a matching recovery action

Hero controls use a minimum 44-by-44 CSS-pixel target, visible focus, a text
label, and non-color state feedback.

### Advanced controls

These remain in a disclosure or debug surface:

- route reset;
- all-progress reset with confirmation;
- seed and scenario selection;
- state, digest, timing, metrics, and kit graph;
- motion, contrast, audio, captions, and assistance settings;
- lore, collection details, and mastery records.

Reset is never a visual peer to the current hero action.

## Shared Gameplay Contract

- The route has three to five readable beats and at least one checkpoint.
- The next safe landing, hazard, or interaction target has a shape and text or
  symbol cue; color and glow are never the only cue.
- Input acknowledgment begins within 100 ms and communicates acceptance or
  rejection within 250 ms on the reference test surface.
- A missed jump returns the player to the latest checkpoint within two seconds.
- Accepted plan state survives failure, pause, restore, and replay.
- After three repeated misses at one beat, `Show Help` becomes available. Help
  may widen timing or expose the safe path but never blocks the reward.
- Completion persists before its celebration begins.
- Replaying never duplicates or removes a reward receipt.
- Route reset preserves earned journey rewards. All-progress reset is advanced,
  explicit, and confirmed.
- Normal play is untimed. Local hazard timing pauses with the route.

## Duration and Difficulty

| Page | First-clear target | Mastery replay | Difficulty |
|---:|---|---|---|
| 01 | 3-4 minutes | 2-3 minutes | Intro: route choice and one generous Jump lesson |
| 02 | 3-4 minutes | 2-3 minutes | Intro: obvious glyph matching and short frame run |
| 03 | 3-5 minutes | 2-3 minutes | Easy: predictable moving-platform timing |
| 04 | 4-5 minutes | 2-3 minutes | Easy: one unambiguous word at each checkpoint |
| 05 | 5-7 minutes | 3-5 minutes | Moderate: full picture-frame transformation run |
| 06 | 4-5 minutes | 2-3 minutes | Easy: four obvious artifact-to-lane matches |
| 07 | 4-5 minutes | 2-3 minutes | Moderate: reveal timing with soft heat recovery |
| 08 | 5-7 minutes | 3-5 minutes | Moderate synthesis with no new control |

No required checkpoint should erase more than 60 seconds of first-clear
progress.

## Eight Page Contracts

### Page 01 — The Character Map

- Role: teach the shared route, checkpoint, Jump, recovery, and reward grammar.
- Surface target: wall; equivalent tabletop simulator/fallback.
- Plan action: swipe or select adjacent map nodes to trace one short route to
  the maze heart, then `Lock Route`.
- First clear: the Direct route is highlighted and generous. Explore becomes
  an optional replay choice after the first clear.
- Run: JR auto-runs the folded map route; one oversized paper crease teaches
  the real shared Jump with a catch-and-repeat landing.
- Final action: `Claim Fragment`.
- Reward: `gallery-key-fragment` / Gallery Key Fragment.
- Semantic simulator actions: `map.step`, `map.undo`, `map.lock`,
  `run.start`, `jump.press`, `reward.claim`, `route.reset`.
- Failure/recovery: invalid steps keep the graph unchanged; a missed lesson
  jump returns to its short approach.
- Playwright player goal: choose the highlighted route, complete one visible
  Jump lesson, and see the Gallery Key Fragment completion panel.

### Page 02 — The Frame That Breathes

- Role: teach that one page interaction constructs the route JR will traverse.
- Surface target: wall; equivalent tabletop simulator/fallback.
- Plan action: place clearly shaped `Bridge`, `Step`, and `Gate` glyphs into
  their matching frame sockets, then `Lock Route`.
- Run: JR auto-runs the actual glyph-built bridge and one short landing pattern.
- Final action: `Enter Portal` after JR is grounded at its center.
- Reward: `breathing-frame-mark` / Canvas Whisper.
- Semantic simulator actions: `glyph.place`, `glyph.remove`, `route.lock`,
  `run.start`, `jump.press`, `portal.enter`, `route.reset`.
- Failure/recovery: wrong socket rejects without changing the graph; a missed
  landing returns to the last frame checkpoint.
- Playwright player goal: match three distinct glyphs, see the route change
  after each match, run it with Jump, and explicitly enter the opened frame.

### Page 03 — The Lost Child's Sketchbook

- Role: teach predictable moving platforms without adding a new required
  manipulation mode.
- Surface target: tabletop; equivalent floor/low-pedestal fallback.
- Plan action: `Start Run`; graphite paths and dwell ghosts preview movement.
- Run: JR jumps across `Glide`, `Lift`, and `Loop` sketch-creature platforms.
  Landing safely records their impressions automatically; catching is not a
  separate required control.
- Final action: `Reveal Memory` at the static final landing.
- Reward: `memory-sketch-fragment` / Memory Sketch.
- Semantic simulator actions: `run.start`, `jump.press`, `memory.reveal`,
  `route.reset`.
- Failure/recovery: creature phase is restored exactly at the checkpoint; a
  miss returns to the last safe saddle.
- Playwright player goal: read the movement cues, cross all three predictable
  platforms with Jump, and reveal a clearly completed memory.

### Page 04 — The Curator's Warning

- Role: show that restoring story text creates traversable museum structure.
- Surface target: wall; equivalent tabletop simulator/fallback.
- Context action: at four safe checkpoints place the only matching word—
  `FOLLOW`, `VOICES`, `SEALED`, then `WING`—into its labeled gap.
- Run: each accepted word creates the next bridge, echo steps, gate, or rising
  span. JR auto-runs between safe word stops.
- Final action: `Read Warning` with visible and accessible text; no timer or
  reading-speed check.
- Reward: `red-seal-warning` / Red Seal Note.
- Semantic simulator actions: `word.restore`, `run.resume`, `jump.press`,
  `warning.read`, `route.reset`.
- Failure/recovery: wrong, repeated, stale, or out-of-order words do not mutate
  state; missed jumps preserve all restored words.
- Playwright player goal: restore four obvious words, see each become the next
  route segment, reach the read perch, and receive the Red Seal Note.

### Page 05 — Tiny Platformer Diorama

- Role: deliver the hero living-picture-frame platforming experience.
- Surface target: wall; equivalent tabletop simulator/fallback.
- Landmark: the Conservator's Impossible Portal, a stable head-on frame with
  shallow layered paper depth.
- Context action: at three safe planning bays shift one labeled picture layer
  into its valid route position. Only one layer is actionable at a time.
- Run: JR auto-runs three short sections using the shared Jump. Sections
  introduce a folding-page jump, a stitched bridge recovery, and a final
  layered-frame route; no free movement or camera control is required.
- Final action: `Enter Tiny Portal`.
- Reward: `tiny-portal-badge` / Tiny Portal Badge.
- Semantic simulator actions: `layer.shift`, `layer.undo`, `section.lock`,
  `run.start`, `run.resume`, `jump.press`, `portal.enter`, `route.reset`.
- Failure/recovery: a miss returns to the current bay checkpoint within two
  seconds and preserves accepted layer positions.
- Playwright player goal: transform one layer at each safe bay, traverse the
  resulting picture-frame route with Jump, and enter the final portal without
  needing joystick or camera knowledge.

### Page 06 — The In-Between Exhibit

- Role: make classification visibly build a route before traversal.
- Surface target: tabletop; equivalent floor/low-pedestal fallback.
- Plan action: place water, forest, stone, and star artifacts into clearly
  matching sockets, then `Stabilize Route`.
- Run: the four accepted artifacts create a tide ferry, stepped bridge, broad
  checkpoint, and final star bridge. JR auto-runs the locked route.
- Final action: `Seal Exhibit`.
- Reward: `portal-stabilizer-fragment` / Portal Stabilizer.
- Semantic simulator actions: `artifact.route`, `artifact.remove`,
  `route.stabilize`, `run.start`, `jump.press`, `exhibit.seal`, `route.reset`.
- Failure/recovery: mismatch returns the artifact with a reason and leaves the
  accepted route unchanged; missed traversal preserves all matches.
- Playwright player goal: make four obvious matches, see four route changes,
  traverse them with Jump, and seal a visibly stable exhibit.

### Page 07 — The Monster Behind the Canvas

- Role: add tension through controlled reveal without combat or tracking-based
  failure.
- Surface target: wall; equivalent tabletop simulator/fallback.
- Context action: at safe stops use `Hold Reveal` on `EYE`, `RUNE`, and `MARK`.
  Each reveals the next landing, hazard bounds, or final bridge.
- Run: JR auto-runs each accepted revealed section using Jump.
- Heat: one visible fixed-tick meter cools on release. Reaching its limit
  cancels only the unaccepted reveal and never removes accepted paths.
- Monster: presentation only; it never chases, collides, reads gaze, or owns
  timing.
- Final action: `Seal Canvas`.
- Reward: `shadow-exhibit-fragment` / Shadow Exhibit Fragment.
- Semantic simulator actions: `light.reveal.start`, `light.reveal.stop`,
  `reveal.accept`, `run.resume`, `jump.press`, `canvas.seal`, `route.reset`.
- Failure/recovery: overheat gives a short cooldown and retry; a missed jump
  preserves accepted reveals and returns to the latest safe stop.
- Playwright player goal: reveal three clearly labeled route parts without
  losing prior progress, cross them with Jump, and seal the canvas.

### Page 08 — The Secret Portal Room

- Role: show journey progress and deliver a short mastery finale using only
  already taught controls.
- Surface target: floor or low pedestal; equivalent tabletop simulator.
- Eligibility: seven receipts from Pages 01-07. Missing state lists exact pages
  and exposes `Continue Journey`; it never pretends the finale is ready.
- Hub: seven earned motifs are read-only and the eighth crown socket is visibly
  reserved for the unearned Final Portal Key.
- Run: three short phases remix glyph-built gates, layer shifts, and revealed
  paths. JR auto-runs and uses the same Jump/context alternation.
- Final action: `Enter Restored Portal`.
- Completion: persist Page 08, `final-portal-key`, slot eight, and mastery
  before the epilogue.
- Reward: `final-portal-key` / Final Portal Key. Earlier rewards are never
  consumed.
- Semantic simulator actions: `finale.check`, `finale.start`,
  `context.activate`, `run.resume`, `jump.press`, `portal.enter`,
  `epilogue.skip`, `route.reset`.
- Failure/recovery: each phase has a checkpoint; missing/corrupt receipts fail
  closed with an exact recovery path and do not alter valid progress.
- Playwright player goal: distinguish missing and ready states, complete three
  familiar phases, enter the portal, and see all eight completed slots.

## Progress and Save Contract

The final semantic save is local-first and versioned. It stores only:

- per-page checkpoint and accepted plan state;
- completion receipt and reward id;
- assistance and mastery state;
- journey schema version.

It does not store camera frames, room geometry, WebXR state, renderer objects,
cache entries, or diagnostics. Writes are idempotent and copy-on-write. One
bad page record cannot erase another page. Page 08 reads receipts for slots
one through seven, then writes slot eight only after its own completion.

## Simulator and Player Proof

Every page must pass these NexusEngine scenarios with the same domain kits used
by the runtime:

- startup and placement confirmation;
- valid first-clear path;
- invalid context action with no mutation;
- missed jump and checkpoint recovery;
- pause/restore at a checkpoint;
- completion and one reward receipt;
- replay without duplicate reward;
- route reset with journey rewards preserved;
- identical seed/input deterministic comparison.

Every page then receives a direct-route Playwright proof at 390-by-844 and a
desktop viewport. The player goal named above passes only when the visible
objective, hero action, feedback, recovery, completion, and reward are
understandable. Three bounded add-and-review cycles are allowed per batch.

## Spatial Host Contract

### Support tiers

- **Required direct tier:** desktop and mobile browsers that can run the built
  ES-module/WebGL experience support the simulator/fallback route with pointer,
  keyboard, or touch. This tier owns complete gameplay and rewards without a
  camera.
- **Enhanced spatial tier:** a device with the accepted camera and placement
  adapter may place the identical gameplay on a qualified wall, tabletop, or
  floor/pedestal.
- **Fallback rule:** unsupported or denied camera/spatial capability offers the
  direct simulator/fallback experience. It never blocks the page reward or
  final journey.
- **Input parity:** touch is required on mobile; pointer and keyboard are
  required on direct desktop routes. Gamepad and switch support may adapt the
  same semantic commands but cannot create exclusive progression.

Exact browser versions and reference hardware are release-matrix evidence, not
gameplay authority.

- Direct routes, not physical QR scans, open host validation.
- Wall: Pages 01, 02, 04, 05, and 07.
- Tabletop: Pages 03 and 06.
- Floor/low pedestal: Page 08.
- Every host confirms scale, support, safe zone, readable view, and one stable
  anchor before activation.
- Tracking loss pauses gameplay and exposes one matching `Re-place` action.
- Re-placement preserves checkpoint, accepted plan state, completion, and
  rewards.
- The simulator/fallback uses the same canonical gameplay coordinates and
  semantic state.

Environment realism is not an acceptance criterion. Placement guidance,
readability, safe framing, pause, and recovery are acceptance criteria because
they affect the player outcome.

## Accessibility Contract

- Full keyboard and pointer operation on direct simulator/debug routes.
- One-handed touch path for all required normal controls.
- Focus order follows the current objective and returns after every rerender.
- Critical state uses text or symbol plus shape; never color, motion, spatial
  audio, or haptics alone.
- Reduced-motion mode replaces route-building and completion animation with an
  immediate labeled state change.
- Silent mode keeps captions/text and loses no timing information.
- High-contrast mode preserves safe platform, hazard, target, and reward
  identity.
- Screen-reader or ordered-list equivalents emit the same semantic commands
  for plan/context actions.
- No required microphone, gaze, reading-speed, or precision-drag gate.
- Assistance never changes reward eligibility.

## Performance and Reliability Contract

- Target 60 fps; sustained active play must remain at or above 30 fps on the
  declared reference mobile tier.
- Expensive simulation is limited to the active route slice. Dressing and
  effects degrade before interaction cues, collision, or text.
- Only one objective and one hero target are active at a time.
- No console error, unhandled rejection, blank player view, or unrecoverable
  loading state on accepted routes.
- Missing or corrupt noncritical art uses a labeled semantic fallback; missing
  critical gameplay data fails closed before play with one recovery action.
- Exact reference devices, load budgets, and scene budgets become Pass 4 matrix
  rows and Pass 6 architecture budgets.

## Art and Asset Acceptance

- Greybox primitives remain valid until the complete interaction passes.
- Final assets replace all player-visible placeholders before release.
- Safe platforms, hazards, interactables, checkpoints, and portals each have a
  stable semantic silhouette independent of lighting and effects.
- Each page has one mechanic-linked hero landmark and one distinct reward.
- Asset records include role, source, rights, revision, hash, performance tier,
  fallback, and proof status.
- Object count, environment dressing, particles, and lighting cannot repair an
  unclear objective or missing feedback state.

## Release Acceptance

Release is accepted only when:

- the production build and all direct static routes pass;
- all eight simulator scenario sets pass deterministically;
- all eight named Playwright player goals pass at mobile and desktop viewports;
- keyboard, focus, reduced-motion, high-contrast, and silent paths pass;
- page rewards persist idempotently and Page 08 correctly distinguishes fewer
  than seven, exactly seven, and completed-eight states;
- direct physical-host checks cover every intended surface family and every
  route's placement/recovery descriptor without using a QR scan as the harness;
- generated QR destinations and static route targets are structurally correct;
- no final player-visible placeholder remains;
- performance remains above the declared floor;
- the matrix contains no unlabeled unknown, unsupported claim, or unresolved
  release blocker;
- another agent can reproduce build, simulator proof, Playwright proof, save
  migration, reset, and release checks from tracked instructions.

## Pass 4 Handoff

Pass 4 converts every requirement above into rows using:

```text
Goal | Page | Final target | Current evidence | Gap | Dependency | Next action | Validation | Status
```

Current behavior that differs from this target remains a gap; it must not be
rewritten as if already complete.
