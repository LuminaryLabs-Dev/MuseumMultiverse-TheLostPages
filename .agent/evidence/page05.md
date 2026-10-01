## Page 05: Tiny Platformer Diorama

Source: `src/experiences/tiny-platformer-diorama/level.js`

- Preferred anchor: `center-floor`
- Desktop camera: `tabletop`
- Authored duration: `300` seconds
- Authored placement scale: `0.72`
- Authored hazard count: `3`
- Existing objects: runner, three hazards, goal gate
- Existing loop: place diorama, jump through hazards, enter gate
- The current NexusEngine `micro-platformer` kit initializes avatar, hazard,
  jump, failure, and goal fields, but its `jump` and `enter` methods only
  forward actions to generic interaction targets; inspected source does not
  update those platformer fields or simulate locomotion, Jump arcs, collision,
  misses, checkpoints, recovery, or assistance.
- Page 05's current objective counts three generic `jump` target completions
  under one authored 850-millisecond interaction constraint. No current source
  proves a first-Jump lesson, safe rehearsal gap, deterministic approach cue,
  catch-and-repeat behavior, or a handoff from teaching to normal failure
  counting.
- The inspected Page 05 recipe contains no picture-frame object,
  canvas-to-world fold reveal, or section-driven frame accent state.
- The inspected Page 05 level is one static authored object list. It defines no
  course variants, variant selection or saved rotation, manipulable picture
  layers, optional discoveries, lore/cosmetic unlocks, or section-specific
  hazard families.
- It also defines no stable picture-layer ids, constrained tracks, named snap
  states, enumerated combination matrix, connectivity or hazard mapping,
  discovery tradeoff, lock-validity rule, invalid-state diagnostic, or
  exhaustive state proof.
- A bounded repository file scan found the generic simulator session and view
  modules but no test/spec files or Page 05 recipe-bound reachability
  certificate artifacts. Their absence leaves combination coverage, baseline
  and assisted paths, optional discoveries, soft-lock rejection, and
  snapshot/restore equivalence unproven.
- Its three hazards are generic `spike`, `saw`, and `gap` visual shapes with
  one shared `jump` action. No inspected catalog gives them or any paper,
  machinery, or artifact-magic hazard stable semantic ids, collision/timing
  contracts, telegraphs, non-color cues, reduced-motion or silent equivalents,
  assistance/recovery variants, concurrency limits, renderer bindings, or
  budgets.
- No Page 05 recipe or progress field binds lore or cosmetics to a variant,
  section, layer-state combination, alternate route, stable discovery id,
  non-spoiler cue, assisted equivalent, immediate persistence event,
  reachability proof, missed-item status, contextual replay hint, or mastered
  variant picker.
- No inspected Page 05 copy, recipe, or progress record defines three lore
  record titles, their order or relationship, author or speaker identity,
  narrative viewpoint or tone, spoiler-safe summaries, readable body lengths,
  narration duration, matching transcripts or captions, large-text or
  read-aloud behavior, timed-dismissal policy, or a spoiler-safe connection to
  Page 08.
- No inspected magazine or progress surface defines versioned lore-record ids,
  a stable three-slot story order, missing-record placeholders, ordinal
  announcements, immediate access to later found records, or rules preventing
  hidden, reordered, or automatically granted lore.
- No inspected Page 05 or replay surface defines player-invoked `Where`, `How`,
  or `Show route` hint stages, per-stage accessibility equivalents, explicit
  reveal acknowledgments, non-escalation rules, or invariants keeping hint use
  separate from rewards, assistance, completion, rotation, and proof.
- No inspected Page 05 recipe, renderer binding, or copy defines named cosmetic
  assets, fixed variant-to-cosmetic mappings, JR-pose versus frame-embellishment
  ownership, earned replay or magazine presentation, or non-color labels.
- No inspected Page 05 host, renderer, or persistence path defines safe-boundary
  cosmetic preview, variant-bound default activation, an `Appearance` foldout,
  individual visibility controls, `Use canonical look`, or a renderer-only
  preference separated from gameplay recipes and semantic snapshots.
- No inspected Page 05 domain or host path emits an optional-discovery event,
  persists one at pickup, presents a nonblocking named cue, defers a full
  readable reveal to a safe checkpoint, or exposes a `New discovery` foldout
  while preserving the required hero action.
- Its objects use free `x`, `y`, and `z` transforms. The inspected source
  defines no shared front/middle/back lane slots, automatic lane-transition
  descriptors, exact inner-width-normalized lane centers, lane bands, stable
  lane-id serialization, pre-transition cues, occlusion cutaways, normalized
  rear/front depth envelopes, front-content allowlist, or overflow diagnostic.
- No inspected recipe or domain schema defines stable `ramp`, `bridge`, or
  `portal` transition-edge identities, legal from/to lanes, entry/exit sockets,
  semantic paths, collision seams, directionality, safe portal endpoints,
  single-active-edge behavior, reset/snapshot semantics, clearance, or
  renderer bindings.
- No inspected source emits an edge-id-bound pre-cue with fixed simulation-tick
  lead, persists its cue and entry ticks, supplies non-color/reduced-motion/
  silent equivalents, rejects overlapping or occluded cues, or prevents
  renderer presentation from advancing or delaying the semantic edge.
- No inspected source marks foreground objects as cutaway-eligible, projects
  opaque masks against required targets, defines entry/exit overlap thresholds
  or time hysteresis, caps simultaneous blockers, supplies a reduced-motion
  cutaway, recomputes after view changes, or proves cutaways across approved
  cameras without semantic side effects.
- No inspected renderer catalog defines allowed front-plane effect types,
  stable descriptors and bindings, positive-Z bounds, count/lifetime budgets,
  device-tier removal, reduced-effects/static equivalents, critical-mask
  exclusion, or precise rejection for undeclared and over-budget content.
- The recipe defines no reusable archive module catalog, typed connection
  sockets, module pivot/bounds/clearance contract, critical-versus-dressing
  visual classification, or gameplay-invariant device dressing tiers.
- Current copy calls the avatar a `miniature explorer` but does not name them.
- Page 02 copy names JR, and the paper-page builder contains a drawn JR, but no
  current evidence proves that Page 05 uses a modeled or animated JR avatar.
- All eight experience folders define separate `level.js` data and pass through
  the shared kit factory in `src/ar/runtime/session.js`, but they currently
  request different mechanic kits; only Page 05 requests `micro-platformer`.
- No inspected source defines one all-eight platformer domain, shared
  platformer renderer/save/reward/recovery schema, or a host-adapter boundary
  that lets Page 05 specialize frame placement and 3D orientation without
  forking gameplay meaning.
- Current recipes name wall-like anchors (`north-wall` or `wall`) and
  `center-floor`, and the shared session exposes generic placement state, but no
  inspected cross-experience descriptor normalizes meter scale, origin,
  quaternion, gravity, support/contact planes, safe zone, capabilities, anchor
  revision, activation pinning, or drift revalidation.
- Each route currently supplies one numeric `placementScale` (from `0.72` to
  `0.90`) through its tuning file, but no inspected source defines canonical
  gameplay units, a calibrated scale interval, one uniform-root propagation
  across visuals and semantic collision, scale pinning, normalized gameplay
  invariants, or a no-qualified-scale fallback.
- Current level recipes use different action labels such as `align`, `restore`,
  `sort`, `catch`, `pulse`, `jump`, `enter`, `light`, and `unlock`. No inspected
  source defines one all-eight phase-based command vocabulary, consistent hero
  layout, contextual-action contract, first-screen/foldout boundary, equivalent
  touch/keyboard/switch/gamepad mapping, focus and announcement parity, or
  hidden-gesture prohibition.
- The eight recipes currently combine distinct mechanic kits, but those
  mechanics are peers in the generic runtime rather than versioned extensions
  of a shared platformer. No inspected contract limits each route to one
  dominant signature, supplies a teaching and accessible fallback, or proves
  that an extension preserves shared physics, commands, saves, completion,
  placement ownership, and renderer ownership.
- Current objectives establish a clear legacy sequence—maze, glyph alignment,
  moving sketches, word restoration, jumping, artifact sorting, light reveal,
  and fragment sockets—but no inspected recipe maps those story actions into
  shared-platformer route, platform, lane, hazard, checkpoint, or portal
  extensions.
- Current tuning labels Page 01 `intro`, Page 08 `finale`, and the middle routes
  by isolated mechanic, while every route declares `300` seconds. No inspected
  curriculum defines safe introduction, cumulative combination, mastery,
  assistance transfer, Page 05's combination ceiling, Page 08's finale subset,
  or nonblocking optional content across the eight-page order.
- No inspected route recipe declares taught section lengths, checkpoint
  cadence, an active-play maximum between resumable writes, placement/loading/
  recovery exclusion from timing, global-versus-local timer semantics, shorter
  mastery replay, or return/resume and reward invariants.
- The shared session currently maps hard-coded kit ids to imported executable
  factories. No inspected closed signature-extension schema, declarative
  capability allowlist, route-local state boundary, cross-stage validator,
  deterministic extension replay, migration/resource budget, or explicit
  prohibition prevents a future route extension from becoming an arbitrary
  gameplay or host fork.
- Across the eight `level.js` recipes, most scene objects are represented by
  generic `visual.shape`, `color`, and `glow` fields such as `frame`, `glyph`,
  `scribble`, `word`, `avatar`, `spike`, `quadrant`, `canvas`, and
  `portal-ring`. The fallback and immersive shells turn those descriptors into
  styled DOM objects and labels, while the shared session always installs
  generic greybox-building and render-descriptor kits. No inspected source
  defines an all-eight visual bible, JR rig/scale rule, distinct route
  material/prop families, custom critical-asset catalog, provenance-gated
  dressing boundary, debug-only placeholder policy, or production
  missing-binding failure contract.
- The eight current palettes already progress through sepia/tan, teal, peach,
  crimson, olive, cold blue, violet, and gold accents that correspond loosely
  to the map, breathing frame, sketchbook, warning, diorama, sorting, canvas,
  and portal stories. No inspected art-direction data defines shared JR,
  silhouette, cue, material-scale, or lighting continuity; route-specific prop
  families; a deliberate evolving visual arc; or a Page 08 rule for recombining
  motifs from the prior seven.
- Page 02 currently declares teal `#7ec6b8/#ccfff4`, Page 05 olive
  `#b3d46a/#ebffc5`, and Page 08 gold `#f0c96a/#fff1c0`, but no inspected
  route or shared visual contract pins linear shading, tone mapping or
  exposure, frame-local light ratios, an emissive cap, room-ambient smoothing
  and clamps, a neutral fallback, critical-shape or text contrast, non-color
  hazard treatment, or semantic-scene shadow tiers.
- Current route effects are isolated descriptors such as the `900 ms` Page 01
  map unfold, `1200 ms` Page 02 ring expansion, `420 ms` Page 05 jump bounce,
  and `1400 ms` Page 08 portal expansion. No inspected source defines the
  proposed checkpoint fold timeline, durable-save-before-presentation gate,
  composable pause, prepared binding swap, transition-time I/O prohibition,
  reduced-motion crossfade/title/acknowledgment, or effect resource budget.
- Current avatar identity is inconsistent across route data: Page 01 declares a
  generic `map-character`, Page 02's copy explicitly names JR, and Page 05
  declares a generic `avatar` while calling it a `miniature explorer`. No
  inspected all-eight binding defines one canonical JR silhouette, rig, action
  set, scale, collision meaning, route-material treatment, accessory boundary,
  or cross-route recognition and accessibility proof.
- No inspected JR binding pins a sole-rooted cutout hierarchy, frame-relative
  height, visual thickness, viewer-facing joint limit, independent grounded and
  airborne collision dimensions, uniform-root-only scaling, rig/action/
  material/collider hashes, route recolor or accessory limits, or fail-closed
  canonical and reduced-motion action completeness.
- No inspected source defines canonical JR clip lengths, semantic-tick phase
  binding, comic-pose holds, blend limits, root-motion prohibition,
  animation-callback authority, reduced-motion pose equivalents,
  distance/angle/seated readability samples, or clip/pose/transition/fallback
  hashes for the chosen nine actions.
- A bounded source search found no `Lock Route`, `Back to Plan`, or countdown
  implementation. No inspected source therefore defines a candidate-pinned
  `120`-tick countdown phase, focus-preserving hero-control replacement,
  one-shot numeric announcements, deterministic cancel/start ordering,
  non-destructive Plan restoration, interruption disarm, armed-timer restore
  policy, reduced-motion parity, or cross-input/replay proof.
- Page 05 currently declares three generic Jump interaction targets and one
  `850 ms` timing-window constraint, but a bounded source search found no
  gameplay failure-recovery implementation. No inspected source defines a
  typed recovery id, fixed fail/recovery ticks, checkpoint restoration,
  contact-bound ink mark or capacity policy, Retry/Adjust hierarchy, focus or
  announcement behavior, interruption normalization, or reduced-motion,
  snapshot, and replay parity for a failed Jump.
- The same legacy `850 ms` timing-window value supplies no input-buffer,
  late-edge-grace, landing-expansion, hazard-inset, attempt-counter, or tier
  semantics. No inspected source defines Page 05's two/four/six thresholds,
  prevalidated assisted route branches, per-obstacle namespaces, persistence or
  reset behavior, tier acknowledgment and focus, branch/tuning hashes, or
  invariants preventing assistance from changing rewards and discoveries.
- Page 05's current `goal-gate` is a generic collectible with an `enter`
  interaction, and its objective requires one `enter` action after the hazards.
  It declares no semantic portal socket, grounded-center zone or dimensions,
  lane/revision test, consecutive-tick dwell and reset rules, portal-ready
  latch, auto-run hold, contextual focus/announcement handoff, idempotent entry
  command, persist-before-presentation ordering, canonical portal-entry action,
  or accessible boundary/stale/duplicate proof.
- The inspected repo contains eight generic descriptor-based routes and one
  staged Page 05 frame candidate, but no authored art-replacement sequence,
  shared vertical-slice milestone, route-by-route critical-binding completion
  record, promotion exit gate, or rule that defers Page 08 motif synthesis until
  the preceding seven route families are approved.
- Current route recipes distinguish objects by group, archetype, shape, color,
  glow, transform, and interaction, while the fallback renderer adds only an
  `is-active` state for the current action. No inspected descriptor declares a
  hero-landmark role, focal hierarchy, mechanic-linked composition anchor,
  entry-to-completion visibility requirement, or proof that dressing cannot
  overpower the signature object, hazard, goal, or interaction cue.
- Page 02's frame declares one continuous `breathing-scale` effect, and the
  fallback presentation marks only the current required action as `is-active`.
  No inspected shared descriptor maps hero landmarks through dormant,
  inviting, active, checkpoint, goal-ready, complete, or blocked/recovery
  presentation states with non-color, reduced-motion, silent, screen-reader,
  deterministic-transition, and domain-authority rules.
- Current preferred anchors are story-split: Page 01 uses `wall`; Pages 02, 04,
  and 07 use `north-wall`; and Pages 03, 05, 06, and 08 use `center-floor`.
  Page 05 therefore still uses a tabletop camera and floor anchor rather than
  the proposed wall picture frame. No inspected all-eight design record assigns
  final landmark surfaces, migrates Page 05 to wall placement, distinguishes a
  floor/pedestal Page 08 profile, or defines route-specific support/contact,
  depth, scale, safe-zone, readability, and semantic-preserving fallback sets.
- Current routes expose only one raw `placementScale` each, ranging from `0.72`
  to `0.90`. Those values do not declare a gallery-wall, tabletop
  book/diorama, or floor/pedestal-portal physical-size family; canonical target
  or calibrated interval; viewing/safe-zone profile; JR/cue readability;
  interaction reach; depth/performance budget; family fallback; or proof that
  physical-family changes preserve semantic gameplay.
- A bounded application-source search found no `animationend`,
  `transitionend`, landmark-presentation acknowledgment, or presentation
  deadline path. Current landmark-like effects therefore do not prove an
  atomic semantic-save boundary, typed pause, exact-state resume, reduced-
  motion/silent completion equivalent, static accessible timeout fallback,
  progress/reward preservation, or retry/return threshold for an unreadable
  transition.
- Current app source exposes only static per-route `preferredAnchor`,
  `arScale`, and desktop-camera values; a bounded search found no `Re-place`
  command, surface-family migration, checkpoint-to-new-anchor preflight, old
  host-placement closure, new descriptor pin, player reconfirmation, or
  canonical-state resume across wall/tabletop/floor placement. Existing
  semantic persistence also excludes the checkpoint payload needed to prove
  such a handoff rather than restarting or restoring raw poses.
