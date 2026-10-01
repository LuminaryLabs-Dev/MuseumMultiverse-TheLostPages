### All-Eight Shared Platformer Contract

- One reusable Lost Pages platformer domain and renderer contract owns shared
  traversal, fixed Jump, semantic collision, checkpoints, failure, recovery,
  completion, rewards, commands, and save meaning across all eight routes.
  Every route pins its own recipe, art, theme, presentation binding, and host
  anchor adapter. Page 02 teaches frame interaction; Page 05 composes the full
  layered picture-frame specialization. WebXR, placement, 3D orientation,
  renderer objects, and device state never enter the shared gameplay domain.
- Each host adapter validates physical placement and emits one immutable
  normalized meter-scale descriptor containing origin, right/up/forward
  quaternion, gravity reference, support and contact planes, safe viewing zone,
  capabilities, anchor identity, and revision. Activation pins the descriptor.
  Page 05 maps canvas center and behind-frame depth while other routes map their
  appropriate wall, tabletop, or floor origin. Tracking drift pauses and
  revalidates the host descriptor instead of mutating gameplay coordinates.
- Recipes author in one canonical gameplay coordinate system. The host accepts
  exactly one uniform root scale inside each recipe's calibrated physical,
  readability, and safety interval and propagates it through visuals, semantic
  collision, anchors, sockets, and cues. Normalized Jump, hazard, route, and
  timing truth does not change. Scale is pinned for activation; no qualifying
  scale routes to re-placement or an authored fallback, never nonuniform fit.
- A stable phase-based command vocabulary covers placement, `Start Run`, fixed
  `Jump`, one recipe-labeled contextual action, pause/return, and matched
  retry/recovery. Only current hero controls appear on the first screen;
  optional inspection, replay, release, and technical actions use foldouts.
  Touch, keyboard, switch, and supported gamepad inputs map to the same command
  ids with focus and announcement parity. Recipes cannot require hidden
  gestures.
- One versioned semantic save envelope pins route, recipe, schema, and revision
  ids; namespaces route checkpoint, completion, assistance, and discovery
  state; and maintains an idempotent shared completion/reward ledger. Atomic
  integrity records and copy-on-write migrations isolate corrupt or
  incompatible route state. Route restart and confirmed all-progress reset are
  distinct. WebXR poses, room/camera data, DOM, renderer objects, caches, and
  diagnostics are excluded.
- Every route declares exactly one dominant versioned signature capability over
  the shared platformer. It is taught in a bounded safe phase, includes an
  accessible equivalent and authored fallback, and cannot change shared
  traversal, Jump, checkpoints, failure, commands, saves, completion, rewards,
  host placement, or renderer authority. Page 05 owns the layered
  picture-frame route transformation.
- Legacy story actions become platformer semantics: Page 01 branching maze
  routes, Page 02 glyph-driven frame paths, Page 03 moving sketch platforms and
  optional catches, Page 04 word-rebuilt paths, Page 05 layered picture routes,
  Page 06 artifact-sorted lanes, Page 07 light-revealed paths and hazards, and
  Page 08 fragment-powered sockets and portal.
- The route order is a cumulative bounded curriculum. Each rule is taught
  safely before testing; Page 05 combines only taught fundamentals, Page 08
  combines a declared small mastered subset, assistance remains route-local,
  and optional discoveries never gate progress.
- Standard routes target four-to-six-minute first clears; Page 05 and Page 08
  target seven to nine. Short taught sections write atomic resumable
  checkpoints with no more than about ninety seconds of active play between
  them. Global play is untimed; local hazard timers pause with simulation;
  return/resume and shorter reward-equivalent mastery replays are required.
- A signature is closed declarative data. Its versioned schema may express only
  route-graph changes, platform/hazard transitions, contextual-command meaning,
  checkpoint-local semantic state, and feedback intents through allowlisted
  domain commands. Authoring, CI, and activation prove deterministic replay,
  reachability, accessible fallback, migration, and resource budgets.
  Arbitrary code, network, DOM, WebXR, renderer, shared physics, global save,
  completion, reward, and undeclared-dependency authority is forbidden.

### All-Eight Visual Binding Contract

- One shared visual bible and explicit renderer-binding schema governs
  canonical JR scale and rig, gameplay-critical silhouettes, edge and motion
  language, interaction cues, materials, lighting, accessibility equivalents,
  and device-tier budgets. Semantic module ids—not filenames or mesh
  hierarchy—select approved bindings.
- Critical avatars, platforms, hazards, contextual objects, goals, and hero
  landmarks require custom or explicitly approved art. Provenance-cleared
  staged and deterministic procedural assets may enter only as gated support or
  dressing. Placeholders are debug-only; a missing production binding blocks
  activation with recoverable retry/return actions.
- The journey forms one evolving impossible-museum arc: sepia folded maps and
  sleeping cabinets; teal gilt and glyph machinery; charcoal sketchbook paper;
  crimson curator placards and redaction wood; olive nested frames and living
  archive paper; cold-blue liminal cases and sorting rails; violet torn canvas
  and shadow relics; then a gold portal that recombines approved motifs from
  the previous seven. Shared critical-cue rules remain unchanged.
- JR keeps one recognizable silhouette, hybrid 2.5D rig, semantic action set,
  scale interval, collision meaning, and accessibility contract. Route
  renderers may add only bounded non-gameplay materials and removable
  accessories; they cannot change proportions, timing, actions, or collision.
- Production locks the visual bible, JR binding, semantic renderer schema, and
  asset gates before proving a Page 02 frame-tutorial plus Page 05
  picture-frame slice. Remaining route families complete in narrative order,
  and Page 08 synthesis follows last. Each route promotes only after critical
  binding completeness and the required proof ladder pass.
- Each route centers one custom mechanic-linked hero landmark: folding
  character map, breathing glyph frame, living sketchbook, reconstructed
  curator warning, impossible layered frame, liminal sorting cabinet, monster
  canvas, and final socket portal. Modular platforms, hazards, cues, and
  dressing remain subordinate to its entry-to-completion readability.
- Each route also publishes one separately versioned gameplay-truthful key-art
  plate showing that landmark and canonical JR. One binding supplies approved
  card, 3D-book, and restored-overview crops, focal-safe bounds, stable alt
  text, provenance, fallback, device budgets, and asset hashes.
- A revisioned read-only ledger projection leaves the base plate unchanged and
  adds only allowlisted named-state borders, emblems, checkmarks, earned
  cosmetic slots, and non-color text. Renderer estimation, progress mutation,
  independent persistence, and silent placeholder fallback are forbidden.
- The plate is rendered from one exact approved route, semantic snapshot,
  active landmark state, canonical JR mid-action pose, physical-family
  hero-camera profile, lighting rig, renderer build, and asset set. A bounded
  paint-over retains its source and diff and must preserve critical silhouette,
  cue, spatial, and route-identity equivalence.
- Wall, tabletop, and floor/pedestal camera profiles remain within their
  validated player-view envelopes and pin metric pose, target, up axis, field
  of view, clipping, JR scale, focal-safe bounds, and approved crops. Reward,
  optional secret, and final transformation stay outside the snapshot.
- The plate remains unobstructed; a separate folio owns title, progress, QR,
  short URL, and digital launch. Release promotion requires all plate/crop
  bindings, while a later art-only failure shows a labeled accessible
  motif-line fallback, preserves valid route access, quarantines only the
  failed binding, and retries without generic, stale, or arbitrary art.

### Cross-Surface Landmark Presentation Contract

- Every landmark consumes one closed semantic presentation set: dormant,
  inviting, active, checkpoint-transformed, goal-ready, complete, and typed
  blocked/recovery. Routes bind approved visual, text, audio-intent, and
  haptic-intent descriptors with non-color, reduced-motion, silent, and
  screen-reader equivalents. Domain state remains authoritative.
- Story-native placement maps Pages 01, 02, 04, 05, and 07 to wall landmarks;
  Pages 03 and 06 to tabletop landmarks; and Page 08 to a floor or low-pedestal
  portal. Wall routes include authored tabletop fallbacks that preserve the
  same canonical gameplay and progression. Every route pins support/contact,
  depth, scale, safe-zone, and readability profiles.
- Three validated physical families—gallery wall, tabletop book/diorama, and
  floor or low-pedestal portal—own canonical targets and calibrated ranges for
  viewing, safe zone, JR/cue readability, interaction reach, depth, and
  performance. Recipes may tighten but never loosen family limits. An approved
  fallback remaps unchanged canonical simulation, collision ratios, timing,
  progress, and rewards.
- Landmark transformation occurs only at an authored safe boundary. The system
  atomically persists semantic state, adds a typed presentation pause, emits
  one stable transition event, and waits for the selected visual,
  reduced-motion, or silent-equivalent acknowledgment within a bounded
  deadline. Success clears only that pause. Failure uses an approved accessible
  static final state and typed diagnostic while preserving progress and
  rewards; unreadable failure exposes retry/return.
- A surface-family change occurs only before activation or from an atomic
  checkpoint, tracking-recovery, or explicit re-placement flow. The host closes
  the old placement, fully validates and pins the new anchor, scale family,
  renderer bindings, support/contact fit, safe zone, and readability, obtains
  player confirmation, and resumes unchanged saved semantics. Active play never
  morphs. Failed qualification retains the save and offers retry/return.

