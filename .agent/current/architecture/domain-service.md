## Proposed Domain-Service Shape

### Platformer Core

- Domain identity: provisional `n:lost-pages-platformer`
- Owns meaning: shared all-eight avatar route state, traversal state,
  completion, failure, reward events, and coordination of dependent domain
  outputs; Page 05's frame-layer meaning arrives through a versioned recipe
  extension rather than a separate core.
- Owns state: route id, recipe id, recipe schema version and revision, seed,
  authored variant id,
  completed variant ids, simulation tick, next command sequence, applied command
  ids, pending and acknowledged event ids, typed pause reasons, fixed rotation
  cursor, lane position, avatar state, auto-run state, active route revision,
  collision profile, variant-scoped lore/cosmetic discoveries, checkpoint,
  run-ready state,
  countdown state, recovery choice, checkpoint transition state, portal dwell,
  portal eligibility, per-obstacle attempt count, assistance tier, completion,
  pause reason, and failure reason.
- Inputs: normalized command envelopes with stable id, monotonic sequence, target
  tick, type, and semantic payload for enter Plan, constrained layer action,
  lock route, cancel countdown, countdown complete, Jump, retry route, adjust
  route, enter portal, checkpoint transition complete, tracking lost, tracking
  recovered, viewing zone obstructed, viewing zone re-confirmed, re-placement
  confirmed, discovery collected, replay next, select mastered variant,
  recovery request, event acknowledgment, and reset.
- Outputs: ordered semantic event envelopes with stable id, tick, sequence, type,
  acknowledgment requirement, and payload for state change, route changed,
  checkpoint reached, recovery prepared, checkpoint transition requested, run
  ready, countdown state, feedback intent, assistance changed, pause set
  changed, portal entry available, discovery unlocked, completion, and reward
  request.
- Required behavior: deterministic step, reset, semantic snapshot, version-aware
  restore, authoring/build/activation validation, and recoverable
  incompatibility output; commands apply at most once, pause reasons compose,
  and gating events persist until acknowledged.
- Forbidden ownership: DOM, Three.js, WebXR, camera, gestures, audio playback,
  model loading, renderer bindings, placement/camera poses, device capabilities,
  GPU resources, and lifecycle.

### Coordinated Dependencies

- Shared-platformer contract: all eight route recipes consume the same fixed
  simulation, semantic collision, phase-based command, checkpoint, failure,
  recovery, completion/reward, and semantic save boundaries. A route may
  select its own art, theme, renderer binding, physical anchor adapter, and
  versioned recipe extension, but cannot fork core command ids, physics,
  reward idempotency, migration authority, or host/renderer exclusions. O1
  reconciles cross-route progression, O2 supplies the pinned normalized anchor
  and uniform scale, O3 owns shared meaning and route namespaces, O4 supplies
  per-route renderer bindings, and O5 proves control transfer and route
  isolation.
- Course-recipe contract: a serializable recipe with stable ids, schema version,
  stable module instances with exact definition id/schema/revision/hash and
  semantic dependency pins, one frame-to-course root edge, explicit directed
  transform edges, validation-only constraint edges, named symmetry selections,
  bounds, collision descriptors, route topology, variant id, and dependency
  versions is authoritative. Every gameplay module is transitively reachable
  and has one transform parent; disconnected roots are dressing-only. The
  closed versioned socket matrix and pinned module definitions supply socket
  poses, roles, capabilities, contact, clearance, collider-seam, per-edge-kind
  cardinality, explicit finite junctions, symmetry, and tolerance-profile
  declarations. A definition change makes dependents stale until an explicit
  rebuild or old-to-new migration proves compatibility. GLB nodes, renderer
  code, aliases, filenames, load order, proximity, and generated presentation
  transforms never override semantic meaning. The same validation rules run
  during authoring, build or CI, and immediately before activation; any error
  blocks the applicable promotion or launch and produces the same structured
  diagnostic contract.
- Activation contract: O1 reconciles one immutable manifest from accepted O2
  placement, O3 semantic, O4 renderer/delivery, and O5 proof artifacts. It pins
  the current variant, complete semantic and required presentation set,
  compatibility, tolerance, solver, validator, migration, selected tier, and
  proof identities. Every attempt has a stable activation id and generation.
  `Prepare` preflights and assembles the exact set away from the live scene,
  then returns a bounded token over its prerequisite revisions and prepared
  output hash. `Commit` compare-and-swaps those exact revisions and atomically
  installs the renderer root, leases, journal state, and reveal; mismatch,
  expiry, or failure leaves the prior experience intact and requires another
  prepare. One single-flight coordinator coalesces exact duplicate requests,
  supersedes distinct older generations through cancel-and-drain, and permits
  only one commit candidate. The host cannot resolve `latest`, substitute, or
  activate a partial graph on any mismatch.
- Delivery contract: the host hash-verifies the complete current variant before
  reveal, streams only neutral dressing, supports exact cached offline
  activation, acquires a durable lease for active or resumable manifest hashes,
  and evicts only unleased optional or eligible historical sets. Capability,
  accessibility, and performance evidence select one approved tier. A tier
  change is checkpoint-only and requires another complete manifest with
  identical semantic state and rollback. Cancellation is idempotent per
  activation generation: it drains owned work, rejects late callbacks, disposes
  staging, and preserves verified bytes and the prior committed course. A
  write-ahead journal restores committed generations, aborts merely prepared
  ones, and fails closed on ambiguity. During prepare, the canvas stays closed
  while real byte/item progress names the current phase; `Return to Magazine`
  remains the sole hero action and typed terminal failures expose
  `Retry Content`. Automatic recovery is bounded to typed transient transport
  work. Player retry starts a new coherent generation. Integrity mismatch
  quarantines its exact binding, invalidates dependent staging, and may open a
  scoped circuit breaker without damaging unrelated content or progress.
  Phase watchdogs, background parking, verified reconnect, centralized
  lease-safe quota recovery, and origin-scoped writer fencing preserve this
  contract across mobile and multi-window lifecycle changes. Runtime build,
  shell, manifest schema, catalog root, signed release policy, staged migration,
  rollback pointer, and exact-candidate promotion keep deployment updates from
  mixing with an active course.
- Diagnostic operations contract: the host captures only a fail-closed local
  allowlist and excludes identity, sensor, spatial, precise-location, gesture,
  save, discovery, URL, and raw-log fields. Optional export requires separate
  just-in-time package/session consent and an exact preview; decline preserves
  play, while withdrawal and shared-device reset delete unsent records.
  Build-bound aggregate health thresholds may freeze further adoption and
  create O5 evidence but never authorize rollback. Boot-attempt and healthy
  markers detect three bounded pre-healthy failures and enter a minimal pinned
  recovery shell. Byte/age/purpose limits, receipts, backup expiry,
  thresholded aggregates, and deletion audits remain isolated from gameplay
  state. On-device canonical packaging, pinned endpoint/key encryption,
  nonce/expiry/idempotency, signed receipts, deletion tokens, and failed-send
  TTL bind delivery to the preview. Case-scoped purpose-bound expiring support
  grants, at-rest encryption, immutable access audit, controlled break-glass,
  and reuse prohibitions bind server handling. Build- and policy-bound schema
  hashes fail closed on unknown fields and renew consent for every broader
  field, purpose, destination, or retention change. Essential pre-consent local
  capture remains transparent and bounded; expanded debugging is temporary and
  separately consented. Signed incident policy scopes disable, quarantine,
  rotation, receipt notice/deletion, and security plus O5 reapproval without
  changing gameplay state.
- Simulation contract: the host supplies explicit fixed-step monotonic ticks;
  the domain advances only when its typed pause-reason set is empty. Recipe
  primitives own JR, platform, hazard, and portal collision. Normalized commands
  carry stable ids, monotonic sequences, and target ticks and apply at most once.
  Ordered output events carry stable ids, tick/sequence metadata, semantic
  payloads, and an acknowledgment flag. Hosts deduplicate every event and return
  explicit acknowledgment commands for gating presentation handshakes.
- Placement contract: consumes O2's locked frame descriptor; host supplies
  physical wall observations, tests the provisional 1.0-1.5 meter target, and
  owns floor-reference scanning, visible standard/seated viewing zones,
  capability-aware obstruction evidence, player confirmation, and same-anchor
  recovery. A detected or reported obstruction pauses the platformer until
  re-confirmation. Tracking recovery tries for up to five seconds with
  `Re-place Frame` available, accepts provisional 3%-and-3-degree drift, and
  eases to the stored pose before resuming. The platformer consumes pause/resume
  lifecycle inputs without owning WebXR sensing.
- Picture-layer route contract: A8 and A9 own deterministic lane and transform
  meaning. The selected authored variant exposes one adjustable layer in
  Section 2 and no more than two in Section 3. Sections expose one, two, and
  three playable lanes respectively by enabling equally spaced front, middle,
  and back slots shared by every variant, all within 20% of the inner frame
  width behind the canvas. Authored ramps, bridges, and portals transition JR
  between lanes automatically during Run and emit a pre-transition cue
  descriptor. Valid transforms may alter platform
  connectivity, hazard behavior, and optional discovery access, but never
  gravity, time, camera ownership, or player ability.
- Modular-kit contract: one accepted kit supplies typed paper/book,
  archive-furniture, and artifact-frame modules to all variants. O2 validates
  normalized lane anchors, the canonical frame-course root, stable socket
  poses, the closed compatibility matrix, single-parent transform edges,
  validation-only constraints, per-edge-kind occupancy, finite junctions,
  selected named symmetries, pinned tolerance profiles, deterministic child
  transforms, contact, bounds, collision seams, clearance, transformed
  subtrees, and depth. O3 owns exact semantic identities, hashes, dependencies,
  and migrations plus the resulting gameplay topology. O4 owns separately
  hashed per-tier renderer bindings and asset bytes without transform authority.
  O5 fail-closes semantic-versus-renderer change classification and proof.
  Supported historical content remains content-addressed until release-graph
  reachability permits collection. Section emphasis follows paper, archive
  furniture, then artifact frames without preventing deliberate cross-section
  reuse.
- Course-variant contract: three complete authored variants share the same
  teaching arc, completion condition, assistance rules, story milestones,
  approved asset library, and required reward while varying routes, layer
  puzzles, hazards, and discovery placements. A fixed unseen-first rotation
  advances only after portal completion. Failure and abandonment retain the
  current variant. After all three completions, Replay follows the fixed cycle
  and an advanced picker may select any mastered variant.
- Avatar contract: JR uses one sole-rooted twelve-node cutout at `H=0.135` of
  the locked opening, with `0.025H` visual thickness, bounded visual-only yaw,
  and independent sole-anchored grounded and airborne rounded bodies. One
  semantic-event/tick table owns nine fixed-duration action meanings; the
  renderer supplies bounded hashed clips, comic holds, and static reduced-motion
  poses without root, collider, or gameplay-callback authority.
- Checkpoint contract: A10 owns preserved discoveries plus deterministic,
  bounded timing-window and route adaptation from attempt history. It advances
  acknowledged tiers after two, four, and six failures at the same obstacle.
  Section completion pauses gameplay until the host acknowledges the bounded
  checkpoint transformation.
- Discovery contract: optional discoveries unlock lore and cosmetics only.
  Each variant owns one stable lore id and one stable cosmetic id. Discoveries
  persist idempotently across failure, abandonment, replay, and restore and
  never alter collision, Jump, assistance, completion, course rotation, or
  cross-page reward eligibility.
- Portal contract: the domain exposes eligibility only after JR's grounded
  collision center remains in the authored portal zone for 300 milliseconds;
  the host then presents `Enter Portal`, and only that explicit input completes.
- Progression contract: M5 provisionally lights seven sockets from Pages 01-07,
  unlocks Page 08, then grants the final key and lights socket eight on
  completion. It must migrate the current eight-before-entry source and saved
  state before any promotion.
- Page 01 route contract: one accepted compact authored graph owns the
  character-map preview and the first shared platforming course. Stable nodes
  become landings, checkpoints, discoveries, or the goal; selected edges
  become platform spans; typed fold descriptors move that same topology into
  bounded frame-local depth. Every planning input emits revision-bound
  `map.step(fromNodeId,toNodeId)` intent, and invalid or stale intent cannot
  mutate the route. One semantic undo remains available until `Lock Route`.
  The equally completable `Direct` and `Explore` branches differ only by one
  fold, checkpoint, and optional non-gating discovery. The accepted graph,
  transforms, collision, accessible ordered route, Run, snapshot, and replay
  share stable ids and one hash. The first real Jump uses a first-clear-only
  catch-and-repeat path; normal failure and assistance rules begin after that
  demonstrated success.
- Page 02 glyph-route contract: stable `Bridge`, `Step`, and `Gate` glyphs own
  allowlisted changes to named edges in one authored route graph. Distinct
  silhouettes, labels, non-color cues, semantic ids, and accessible
  descriptions preserve their meaning through Page 08 reuse. Every manipulation
  stays on a bounded frame-local cradle-to-socket guide and emits revision-bound
  `glyph.align` intent across drag, selection, keyboard/D-pad, switch, and
  ordered text. Invalid or stale placement leaves accepted state unchanged.
  Each accepted state updates the semantic graph and accessible Plan preview
  before its bounded fold is presented; only a traversable graph may lock.
  Run, collision, checkpoint retry, snapshot, and replay use that pinned graph.
  After traversal, the shared grounded portal dwell exposes explicit entry;
  completion and reward persist before presentation.
- Page 03 moving-sketch contract: fixed-tick `Glide`, `Lift`, and `Loop`
  definitions own stable curves, endpoints, durations, dwells, and phases for
  three semantic moving platforms. Pause and restore retain exact phase;
  renderer interpolation has no collision authority. Visible and accessible
  arrival cues expose the same semantic schedule. Contextual catches during a
  safe interval persist non-gating margin impressions while leaving platform
  geometry, required progress, failure, and assistance unchanged. A normalized
  tabletop host is primary; any floor or low-pedestal fallback must prove
  semantic equivalence. The final static landing atomically checkpoints and
  pauses motion before explicit reveal, completion, and reward persistence.
- Page 04 warning-route contract: four stable word and slot ids submit
  revision-bound `word.restore` intent against one authored sentence and route
  graph. Accepted intent atomically restores text and its named edge; invalid,
  stale, repeated, or out-of-order intent cannot mutate state. `FOLLOW`,
  `VOICES`, `SEALED`, and `WING` own a lead bridge, fixed-tick multimodal echo
  steps, a safe-checkpoint gate release, and a final rising span. Fonts and
  renderer layout never own collision. An untimed pause-aware seal cadence
  exposes progress, misses preserve prior words at the latest checkpoint, and
  eligible final reading persists completion plus `red-seal-warning` before
  presentation resolves the pulse.
- Page 06 artifact-lane contract: water, forest, stone, and star submit
  revision-bound `artifact.route` intent to compatible stable quadrant sockets
  in one graph. Accepted intent persists placement and activates the named
  tide-ferry, stepped-bridge, checkpoint-span, or final-bridge edge; invalid,
  stale, repeated, or mismatched intent cannot mutate state. Equivalent
  board-local controls share one route ghost and freeze after
  `Stabilize Route`. A normalized tabletop host is primary; any floor or
  low-pedestal fallback must prove semantic equivalence. JR traverses the
  locked graph before final checkpoint, motion pause, explicit seal, completion,
  and `portal-stabilizer-fragment` persistence.
- Page 08 finale contract: M5 binds stable Page 01-07 route ids and approved
  multimodal motifs to sockets one through seven, reserves socket eight for the
  final key, and supplies ledger-authoritative motif state to a presentation-
  only central portal. Before `7 of 7`, the host shows exact accessible
  completed/missing progress, one `Continue Journey` hero, and a disclosed
  `Missing Pages` list while the domain forbids play. At readiness, all seven
  motifs are already installed; one acknowledged accessible awakening ends at
  `Start Finale` and never grants rewards. The route recombines shared
  traversal with Page 02 glyph gates, Page 05 layered-route transformation,
  and Page 07 light reveals in separate phases with stable controls and
  fallbacks. Completion atomically persists Page 08, final key, socket eight,
  and mastery before one canonical accessible restored-magazine epilogue;
  optional discoveries affect acknowledgments only, return is the hero, replay
  is disclosed, and all progress is preserved. The host places one
  floor/low-pedestal socket hub around an original upright impossible-museum
  frame whose bounded 2.5D course keeps the player in a stationary safe zone.
  The fixed anchor faces the confirmed viewing zone and uses one acknowledged
  accessible transition into a head-on course view. Each atomic phase
  checkpoint returns briefly to the same hub for a motif pulse and
  `Continue Finale` before exact resume. The untimed non-combat narrative has
  JR repair an unstable archive while stabilizing already-earned motif
  channels. The frame integrates the gold canvas portal and socket pedestal
  and abstracts seven approved motifs without loading prior landmarks or using
  unsourced replica art. Final entry reuses the 300-millisecond grounded-center
  test and contextual `Enter Restored Portal`, with completion, key, and socket
  persistence preceding presentation. Completed revisits restore a calm
  eight-socket mastered hub with `Replay Finale` and disclosed memories. Full
  replay starts at Phase 1; mastered phase practice is non-completing and
  non-rewarding. Each phase owns one immediately persisted non-gating
  `Restored Margin` with lore/cosmetic payoff. Explicit accessibility/input
  preferences persist globally, while adaptive history remains
  route/phase/obstacle-local and Page 08 owns its own disclosed two/four/six
  ladder.
- Renderer host: consumes descriptors, event intent, and explicit
  fixed-versus-viewer-facing policy; never decides gameplay truth. Device pose
  may improve presentation but cannot become an undeclared required action.
  It presents the two-second numeric countdown and `Back to Plan`, removes
  authored camera and frame movement for reduced motion, and renders the brief
  failure pose plus ink mark without changing recovery truth.
  It also owns the impossible-archive scene, teal/olive/gold materials, authored
  frame-local key and rim lights, clamped optional room ambience with a neutral
  fallback, and the 1.5-second paper-fold transition or reduced-motion
  crossfade/static-title equivalent. It presents one impossible assembled hero
  frame, folds its canvas into the first lane after placement lock, keeps its
  outer silhouette stable during traversal, and limits frame reactions to
  reveal, phase changes, checkpoints, portal readiness, and completion. Its
  fixed structure shifts accents from teal to olive to gold with non-color
  state cues. It combines readable transition geometry with a brief
  light-and-paper cue. It temporarily folds or fades foreground
  paper only when it overlaps JR or the next required hazard or landing.
  Non-collidable, non-interactive effects, flexible paper elements, and brief
  small milestone artifacts may cross no more than 10% of the inner frame width
  in front of the canvas; required collision and interaction never cross.
  Asset and course validation reject any rear/front overflow with an
  object-specific diagnostic rather than modifying transforms. It renders the
  section-specific
  living-paper, archive-machinery, and artifact-magic hazards plus lore and
  cosmetic unlocks without granting gameplay power. Critical modules retain a
  shared silhouette, edge, and required-motion-equivalent language. Declared
  device tiers may reduce only dressing, particles, shadows, and secondary
  motion; gameplay geometry, collision, cues, discoveries, and route state stay
  identical. Before activation it resolves every semantic module and required
  cue through the approved renderer-binding manifest for the selected tier.
  Any missing binding produces a precise recoverable content error and prevents
  the canvas reveal; it never substitutes, omits, or infers content.
  It deduplicates stable event ids, executes optional presentation, and
  acknowledges only completed gating events. Renderer animation time and frame
  rate never advance semantic time or report gameplay collision.
  Audio and haptic playback are optional host capabilities; visual parity is
  mandatory.
- Navigation host: persists the reward, completed variant ids, rotation cursor,
  variant-scoped discoveries, and cosmetic unlocks; presents reward/socket
  feedback; returns to the magazine; advances Replay; and exposes the mastered
  picker under `Replay details` without changing progression truth. Run saves
  reference recipe id, schema version, variant id, and semantic state.
  Migration is explicit; incompatibility preserves durable discoveries and
  progression while offering restart or return. Reward, discovery, and
  completion event ids are persisted before acknowledgment so delivery retries
  remain idempotent.
