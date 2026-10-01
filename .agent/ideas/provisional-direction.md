## Provisional Working Direction

No user answer arrived for Questions 001-005, so the requested evidence-based
self-answer rule produced these revisable assumptions:

- Page 02 is the frame-placement and portal-opening tutorial.
- Page 05 is the full picture-frame platforming payoff.
- The avatar uses simple controls while physical viewpoint movement reveals
  spatial information and hidden paths.
- Most playable geometry stays behind the canvas plane; selected effects and
  small objects may cross the frame without turning the room into an unsafe
  obstacle field.
- The core loop is `inspect -> alter route -> traverse -> adapt -> complete`,
  not timing-only jumping.
- Art uses a hybrid pipeline: selected staged museum assets, custom hero
  elements, and deterministic procedural support scenery.
- The frame world provisionally depicts an impossible museum archive where
  layered shelves, nested frames, artifacts, and living paper merge.
- One modular archive kit is recomposed across all three authored variants.
- The kit contains paper/book, archive-furniture, and artifact-frame families;
  their emphasis progresses by section in that order.
- Gameplay-critical modules share a recognizable silhouette, edge treatment,
  and restrained-motion cue, with color used only as reinforcement.
- Modules connect through normalized lane anchors and stable typed sockets with
  canonical local poses, roles, compatible mate types, named finite symmetries,
  contact surfaces, clearance volumes, and semantic collider-seam rules.
- One explicit directed recipe graph connects parent-instance socket ids to
  child-instance socket ids from a declared root. Only the deterministic
  assembly solver derives child transforms; load order, proximity, GLB
  hierarchy, and renderer choice have no authority.
- Exactly one root-module socket attaches to one canonical
  `frame-course-root`; every gameplay module derives transitively from it, and
  disconnected roots remain dressing-only.
- Each gameplay module has one transform-owning parent edge. Additional braces,
  seams, or contacts are validation-only constraints that never move modules.
- Sockets declare versioned minimum and maximum occupancy by counted edge kind.
  Transform sockets default to one, while explicit junction types alone allow
  finite multi-attachment.
- A closed versioned compatibility matrix separates structural, traversal,
  hazard, interaction, discovery, and dressing-only sockets. Capability tags
  refine valid mates, and dressing never carries gameplay meaning.
- Each compatibility entry pins one canonical-unit tolerance profile. Module
  definitions may tighten it, recipes cannot loosen it, and every validation
  stage uses the same profile version.
- Every connection validates compatibility, occupancy, pose residuals, contact
  gap and penetration, clearance, collider-seam continuity, lane and depth
  bounds, and transformed subtree bounds with a precise edge-specific error.
- Invalid assembly emits one stable machine-readable diagnostic for creator and
  proof workflows. Authoring and build fail closed; activation shows
  `Content unavailable`, `Retry Content`, and `Return to Magazine` without
  partial assembly or silent repair.
- Socket symmetry uses finite named canonical transforms. A recipe edge must
  explicitly select a transform whenever several valid choices remain.
- Device tiers preserve every gameplay module and required cue while reducing
  only decoration, particles, shadows, and secondary motion.
- A versioned, serializable authored recipe is authoritative for module
  placement, typed socket connections, bounds, collision, and route topology;
  GLBs and renderer code never redefine gameplay.
- Every recipe module instance pins a stable definition id, schema version,
  immutable revision, and canonical semantic content hash. Alias resolution
  happens before validation, and a pinned dependency change marks the recipe
  stale instead of resolving `latest`.
- Semantic hashes cover pivot, bounds, sockets, collision, contact, clearance,
  capabilities, classifications, gameplay descriptors, and exact semantic
  dependencies. Renderer bindings and asset bytes keep separate hashes linked
  at activation.
- Module upgrades require pinned old-to-new migrations with socket and state
  mappings plus assembly, collision, and route proof. Breaking upgrades retain
  durable discoveries and cross-page progression through recoverable restart.
- A fail-closed comparison makes any contract or required-readability change a
  semantic revision. Placeholder and art changes remain renderer-only only
  after they preserve and re-prove every semantic field and required cue.
- Content-addressed historical definitions and promoted bindings stay retained
  while reachable from supported recipes, save schemas, migrations, or
  rollbacks. Collection requires a reachability report and durable recovery
  path.
- Saves reference recipe id, schema version, variant id, and semantic run state.
  Migration is explicit, and incompatible runs recover without losing durable
  discoveries or cross-page progression.
- Platformer snapshots contain semantic state only. Placement, WebXR, camera,
  rendering, and device capability remain host-owned records.
- Recipes validate during authoring, build or CI, and runtime activation, with
  no silent repair.
- Runtime activation requires approved renderer bindings for every semantic
  module and required cue in the selected device tier; missing bindings produce
  a precise recoverable error, never a placeholder.
- One immutable accepted activation manifest pins the selected recipe and
  variant plus every semantic, assembly, compatibility, tolerance, solver,
  validator, migration, proof, device-tier, renderer-binding, and asset
  dependency. Its complete set preflights atomically before reveal.
- The entire current variant's semantic course, collision, required renderer
  content, animations, cues, checkpoints, recovery, and portal preload and
  hash-verify. Only neutral dressing may stream afterward.
- A complete verified cached set can activate offline. Missing or corrupt
  required bytes keep the canvas closed, preserve the selected run, and expose
  `Retry Content` plus `Return to Magazine` without substitution.
- A durable local content lease protects every hash needed by an active or
  resumable run. Eviction affects only unleased dressing and
  reachability-eligible least-recently-used sets after atomic storage preflight.
- Capability, accessibility, and performance evidence deterministically select
  one approved tier before activation. It stays pinned during active play and
  can change only at a checkpoint through another complete preflight that
  preserves identical semantics, collision, cues, and state.
- A stable activation id owns an idempotent two-phase transaction. `Prepare`
  verifies, leases, and assembles headlessly; `Commit` rechecks the exact
  snapshot and reveals the complete course atomically or rolls staging back.
- Prepared state carries a bounded-expiry token over manifest, lease,
  placement, capability, tier, and save revisions. Commit compare-and-swaps all
  of them; drift supersedes preparation and triggers a clean new one.
- Canceling preparation stops and drains work, disposes only staging, releases
  transaction-only leases, keeps verified cache bytes and prior state, and
  rejects every late callback.
- A durable write-ahead journal distinguishes fully committed activation from
  interrupted preparation after restart. Ambiguous or corrupt evidence fails
  closed rather than revealing.
- While preparing, the canvas stays closed behind real manifest-derived phases
  and determinate progress with reduced-motion and accessible updates.
  `Return to Magazine` is the only action; technical ids are disclosed, and
  `Retry Content` appears only after typed failure.
- `Retry Content` starts a new coherent activation generation. It may reuse
  only bytes that reverify and staged outputs whose exact prerequisite hashes
  remain unchanged; failed and transitive stages are invalidated.
- Within one valid generation, automatic retry applies only to typed,
  idempotent transient transport work, at most three times inside fifteen
  seconds with capped backoff and jitter. Offline and hidden time pauses the
  budget; integrity, schema, storage, permission, and drift failures terminate.
- One single-flight coordinator coalesces exact duplicate requests. A distinct
  newer intent supersedes and drains the older generation while the prior
  committed course remains safe; only one generation can become commit-ready.
- Terminal activation failures expose a privacy-safe typed diagnostic in plain
  language with one correct hero recovery action. A support reference and
  technical detail remain under a foldout, and durable state is preserved.
- A hash mismatch quarantines the exact binding and invalidates dependent
  staging. One fresh approved fetch may run in a new generation; another
  mismatch opens a scoped cooldown circuit breaker without deleting unrelated
  verified content or progress.
- Each preparation phase declares a byte, item, or worker heartbeat and
  activity-based stall budget. Offline, hidden, and suspended time pauses the
  clock; true foreground stalls cancel and drain without revealing staging.
- Background entry journals and parks the generation, forbids hidden commit,
  disposes volatile staging, and retains verified work plus transaction leases
  for a bounded grace period. Foreground resume requires the exact authority
  snapshot to revalidate.
- Offline is a visible nonterminal pause with return available. Reconnect probes
  the approved origin and revalidates source revision, range identity,
  generation, manifest, and prerequisites before continuing verified chunks.
- One storage arbiter reconciles actual, reserved, reclaimable, and staging
  bytes after unexpected quota pressure. It evicts only unleased eligible
  content or cancels safely with exact `Make Space` evidence while preserving
  durable state.
- One origin-scoped writer lease, heartbeat, and monotonic fencing epoch owns
  shared journal, cache, reservation, lease, and commit mutation across
  windows. Other windows observe or coalesce exact work; handoff and stale-owner
  takeover reconcile before a higher epoch mutates.
- Every activation pins one runtime build id, shell version, manifest schema,
  and catalog root. Updates stage separately and adopt only at the magazine
  after active transactions, migration, restore, and complete preflight pass;
  a signed critical revocation routes to state-preserving update recovery.
- Only a signed monotonic release policy from a pinned trust root can revoke
  exact build, manifest, migration, or binding hashes. It defines effective
  time, expiry, compatibility, migration, and offline freshness while
  preserving unrelated content and durable state.
- A last-known-good policy-allowed release and original save remain immutable.
  New release content and copy-on-write migration validate under separate ids,
  then one active pointer swaps atomically or staged work is discarded.
- Compatible noncritical updates adopt at the magazine with an accessible
  notice and details. `Review Update` appears only for choice-bearing migration,
  `Later` only while supported, and signed critical revocation uses
  state-preserving `Update and Return`.
- CI produces an immutable candidate, not release authority. Exact build, shell,
  catalog, dependency, and provenance hashes must pass schema, deterministic
  simulation, migration/rollback, human-view, phone, lifecycle, performance,
  and O5 gates before signed atomic promotion.
- Detailed diagnostics stay local by default. Only separately consented,
  schema-allowlisted coarse health fields without persistent identity may leave
  the device; sensors, spatial records, precise location, gestures, saves,
  discoveries, URLs, and raw logs are excluded, and sharing previews the exact
  package.
- Diagnostic consent defaults off, remains separate from camera access and
  play, is scoped to one package or bounded session, preserves full play on
  decline, supports withdrawal, and expires on shared-device reset.
- Build-bound aggregate health thresholds with sample, coverage, window, and
  confidence rules may freeze further adoption and create O5 evidence, but
  rollback and revocation still require signed release policy.
- Three consecutive bounded pre-healthy startup failures enter a minimal pinned
  recovery shell that preserves saves and verified cache and offers only
  policy-supported restore or state-preserving update.
- Diagnostic records use a field-, byte-, age-, and purpose-bounded lifecycle
  with withdrawal/reset cleanup, receipt-based submitted deletion, backup
  expiry, thresholded non-reidentifiable aggregates, and no coupling to
  gameplay state.
- Support packages are assembled and hashed locally, encrypted to a pinned
  first-party key, delivered only to a signed-policy endpoint with replay
  protection, acknowledged by a signed retention/deletion receipt, and retained
  after failed send only for a bounded local TTL.
- Support access is trained, case-scoped, purpose-bound, expiring, encrypted at
  rest, and fully audited. Bulk browsing and unrelated reuse are forbidden;
  exceptional access requires dual approval and alerting.
- Diagnostic schemas are versioned, canonically hashed, build- and
  policy-bound, and fail closed on unknown fields. Prior consent survives only
  a strictly narrower compatible schema; any expansion requires a new preview
  and just-in-time choice.
- Pre-consent local capture is limited to a transparent bounded ring of exact
  build, boot/healthy, typed failure, approved tier, and bucketed timing fields.
  Expanded local debugging requires temporary consent, prohibited fields remain
  excluded, and export is a separate choice.
- A confirmed diagnostic compromise uses signed policy to quarantine and rotate
  only affected endpoints, keys, schemas, and package windows, offers
  receipt-scoped status/deletion/guardian notice, preserves gameplay state, and
  resumes only after security and O5 reapproval.
- All eight routes share one reusable platformer domain and renderer contract
  for controls, collision, saves, rewards, and recovery while retaining
  per-route recipes, art, themes, and host adapters. Page 02 teaches frame
  interaction and Page 05 specializes the full picture-frame experience.
- Each host adapter emits one validated immutable meter-scale anchor descriptor
  with origin, right/up/forward quaternion, gravity, support/contact planes,
  safe zone, capabilities, identity, and revision. Activation pins it; drift
  pauses and revalidates outside gameplay.
- Routes author against canonical gameplay coordinates. One uniform root scale
  inside each recipe's calibrated physical/readability/safety range propagates
  through visuals, semantic collision, anchors, sockets, and cues while
  normalized simulation remains unchanged.
- Shared phase-based commands cover placement, start, fixed Jump, one
  recipe-labeled contextual action, pause/return, and matched recovery. Hero
  controls remain on the first screen, optional controls use foldouts, and
  supported input methods preserve focus and announcement parity.
- A versioned semantic save envelope namespaces route state, journals
  idempotent completion/reward events, migrates atomically copy-on-write,
  isolates route failures, separates route/all reset, and excludes WebXR,
  room, camera, DOM, renderer, cache, and diagnostic state.
- Each route adds one dominant versioned signature mechanic over the same
  traversal, Jump, checkpoint, failure, reward, command, save, placement, and
  renderer boundaries. It is taught in a bounded phase and provides an
  accessible equivalent and authored fallback.
- Existing route purposes become platformer extensions: branching maze routes,
  glyph-driven frame paths, moving sketch platforms and optional catches,
  word-rebuilt paths, layered picture routes, artifact-sorted lanes,
  light-revealed paths and hazards, then fragment-powered sockets and portal.
- The learning curve accumulates from route choice through frame planning,
  moving platforms, reconstruction, Page 05's bounded layered centerpiece,
  sorting, light-revealed information, and a Page 08 finale using a declared
  small subset of mastered rules.
- Standard first clears target four to six minutes; Page 05 and Page 08 target
  seven to nine. Short taught sections write atomic checkpoints no more than
  about ninety seconds of active play apart, global play stays untimed, and
  shorter mastery replays preserve rewards.
- Signature extensions use closed versioned schemas and allowlisted domain
  commands for route graphs, platform/hazard transitions, contextual meaning,
  checkpoint-local state, and feedback intents. Multi-stage validation blocks
  arbitrary code, host access, shared physics/save/completion/reward authority,
  and undeclared dependencies.
- One all-eight visual bible and explicit renderer-binding schema governs
  critical silhouettes, cues, materials, lighting, accessibility, device tiers,
  and a canonical JR rig. Critical art is custom or explicitly approved;
  provenance-cleared staged and procedural assets remain gated support or
  dressing; placeholders are debug-only; incomplete production bindings fail
  recoverably.
- Safe platforms use one continuous high-contrast top lip and double edge, with
  stable non-color marks for static, moving, and temporary or revealable types
  over renderer-independent semantic collision.
- Hazards forbid the safe edge and use broken contours, inward triangular cuts,
  crosshatch, and deterministic dormant, warning, and active meanings over
  renderer-independent semantic volumes.
- Interactables use shared brackets, dotted touch texture, semantic symbols and
  labels, valid previews, accepted notches, and typed non-mutating rejection
  across every equivalent input.
- Portals use one nested frame-and-aperture grammar with labeled incomplete
  locks, explicit entry, domain-accepted transition, and persisted revisit
  marks while physical or decorative crossing remains non-authoritative.
- Lighting separates neutral readability, bounded route-landmark light, and
  domain-triggered state light; accessibility and lower tiers preserve every
  critical non-light meaning while decoration degrades first.
- Rewards keep unique route-authored silhouettes, materials, symbols, and
  labels on one shared three-stitch folio tab with a persisted receipt notch;
  revisit is a noninteractive owned imprint.
- Checkpoints use stitched bookmarks with stable identities and
  receipt-gated save and restore states.
- Gameplay alone owns critical affordances; quiet mask-safe nonsemantic
  dressing is optional and degrades before any required cue.
- Materials separate semantic ink, route substrate, and optional mask-safe
  patina into bounded validated layers.
- Motion is static-first: gameplay paths remain deterministic, focal
  acknowledgments bounded, ambience subordinate, reduced-motion forms
  equivalent, and animation never advances domain state.
- Page 01 uses one original shallow dark-wood and brass archival map cabinet
  whose layered sepia paper folds the accepted graph into the course.
- `Direct` uses bold ink, circular nodes, and broad creases; `Explore` uses
  paired stitching, diamond nodes, an extra fold, bookmark, and margin curl
  over the same safe gameplay grammar.
- Both routes converge on a stitched heart-compass aperture with explicit
  entry and a separate receipt-gated Gallery Key Fragment.
- Bounded latched-door, flat-map, accepted-fold, bookmark, map-heart, and
  receipt forms express Page 01's landmark state without owning it.
- Page 01's unique reward is an incomplete brass-and-paper `Map Ward` whose
  fold-and-heart identity continues into its folio tab and Page 08 socket.
- The visual journey evolves through sepia folded maps and sleeping cabinets,
  teal gilt and glyph machinery, charcoal sketchbook paper, crimson curator
  placards and redaction wood, olive nested frames and living archive paper,
  cold-blue liminal cases and sorting rails, violet torn canvas and shadow
  relics, and a gold portal that recombines approved earlier motifs.
- JR keeps one recognizable silhouette, hybrid 2.5D rig, semantic action set,
  scale, collision, and accessibility meaning. Route renderers may add bounded
  material treatments and removable accessories without changing gameplay.
- JR's clean-room Lost Pages character sheet derives from current story traits
  and owns one stable layered-paper face, hair, contemporary outfit, and
  silhouette without inferring an unsourced prior appearance.
- One compact asymmetric field satchel and notebook or map tab remains inside
  the accessory envelope, keeps stable visual and accessible meaning, and
  never participates in collision or interaction.
- Quiet curiosity, focused resolve, and open wonder use stable whole-character
  comic poses and safe semantic route-phase ownership. JR keeps an
  ink-navy/warm-paper/rust-ochre core, stable face and hair colors,
  recipe-bound outline variants, and small route accents only.
- Art production locks the shared foundation first, proves it through Page 02
  and Page 05, completes remaining route families in narrative order, and
  builds Page 08's synthesis last. Each route passes critical-binding and proof
  gates before promotion.
- Remaining route key art uses truthful Page 01/03 map-and-sketch, Page 04/06
  word-and-artifact, and Page 07/08 shadow-to-gold semantic pairs while hiding
  rewards, final transformations, and unsupported finale claims.
- The eight plates form one modular independently readable sepia-to-gold
  journey with canonical JR travel, a restrained presentation-only motif, and
  separate ledger-derived progress overlays.
- Every plate starts from a high-resolution `32:45` portrait semantic master
  with protected focal zones and exact portrait, square, and landscape
  derivatives; an alternate camera may render only the same pinned snapshot
  when a crop cannot preserve meaning.
- Every route centers one mechanic-linked custom hero landmark: folding map,
  breathing glyph frame, living sketchbook, reconstructed curator warning,
  impossible layered frame, liminal sorting cabinet, monster canvas, or final
  socket portal. Modular platforms, hazards, cues, and dressing remain
  subordinate to its entry-to-completion readability.
- Landmarks bind to closed dormant, inviting, active, checkpoint-transformed,
  goal-ready, complete, and blocked/recovery presentation states with approved
  route descriptors and non-color, reduced-motion, silent, and screen-reader
  equivalents. Domain state remains authoritative.
- Story-native placement uses walls for Pages 01, 02, 04, 05, and 07,
  tabletops for Pages 03 and 06, and a floor or low pedestal for Page 08.
  Authored fallbacks preserve gameplay and progression through the normalized
  anchor contract.
- Gallery-wall, tabletop book/diorama, and floor/pedestal-portal scale families
  define validated physical, viewing, safe-zone, readability, reach, depth, and
  performance limits. Routes may only tighten them; fallback never changes
  canonical simulation.
- Landmark transformations persist semantic state at a safe boundary, add a
  typed pause, and resume through a bounded stable-event acknowledgment.
  Approved accessible static final states preserve progress and rewards when
  presentation fails.
- Surface-family changes occur only before activation or from an atomic
  checkpoint, recovery, or explicit re-placement flow after full new-placement
  preflight, pinning, and player confirmation. Active traversal never morphs,
  and failed qualification preserves the save.
- Fixed-step monotonic host ticks drive the platformer domain and stop while any
  blocking pause reason remains.
- Recipe-defined semantic primitives own all JR, platform, hazard, and portal
  collision; renderer meshes never define gameplay.
- Player and host inputs become stable-id, sequenced, target-tick commands that
  apply exactly once.
- A deterministic set of typed pause reasons arbitrates Plan, checkpoint,
  tracking, safety, and content pauses; resumption waits for every blocker.
- Ordered stable-id domain events carry tick and sequence metadata. Hosts
  deduplicate them and explicitly acknowledge events that gate simulation.
