## Deterministic Module Assembly Contract

This is a provisional O2/O3 boundary, not current application behavior. O3
owns recipe topology and gameplay meaning; O2 owns canonical socket geometry,
the deterministic spatial solve, and spatial validation. O4 may bind meshes to
the accepted result but cannot create, reconnect, rotate, or repair gameplay
modules.

### Socket Descriptor

Every approved module definition gives each socket a stable id and declares:

- canonical module-local position plus a finite normalized quaternion;
- role and compatible mate types under one versioned matrix;
- capability tags plus versioned minimum and maximum occupancy by counted edge
  kind;
- a typed contact surface and clearance volume;
- semantic collider-seam requirements;
- a finite set of named canonical symmetry transforms.

Transform-owning gameplay sockets default to one occupied transform edge.
Validation-only constraint slots are counted separately. More than one
attachment is legal only on an explicit junction type with a finite declared
maximum.

Imported mesh vertices, bounding-box centers, GLB pivots, and renderer nodes are
evidence inputs only. They never become implicit sockets or correction offsets.

### Rooted Recipe Graph

- The canonical frame descriptor exposes exactly one typed
  `frame-course-root` socket. A course recipe declares one internal root module
  and one root edge connecting its typed root socket to that frame socket.
- Every gameplay module is reachable transitively from the root edge and has
  exactly one transform-owning parent edge. A disconnected root is valid only
  for a dressing-only subtree with no gameplay meaning.
- Additional brace, seam, or contact relationships use separately typed
  validation-only constraint edges. They may validate or reject the
  already-derived poses but may not move either endpoint.
- All edges use stable ids and explicit parent-instance and child-instance
  socket ids.
- Validation rejects missing instances or sockets, incompatible types, illegal
  occupancy, undeclared cycles, unresolved ambiguity, and any topology that
  cannot yield one deterministic transform for each gameplay module.
- Edge and instance ordering in serialized input cannot change the result.
- No second gameplay root, constraint edge, asset node, or renderer object may
  create transform authority.

### Closed Compatibility Taxonomy

The versioned socket matrix separates structural support, traversal and lane
transition, hazard, interaction, discovery, and dressing-only meaning.
Capability tags narrow legal mates without inventing new unregistered types.
Dressing sockets may support optional presentation, but neither they nor their
attached subtree may own required route, collision, hazard, interaction,
discovery, or progression meaning.

Every allowed matrix entry references one immutable calibrated tolerance-profile
version in canonical units, including position, angle, gap, penetration,
clearance, and collider-seam limits as applicable. A module definition may
tighten a field, never loosen it. Recipes and runtime hosts cannot override the
profile, and authoring, build or CI, and activation use the same pinned values.

### Deterministic Solve and Symmetry

- For an accepted edge, O2 composes the parent socket pose, the recipe-selected
  named symmetry transform, and the inverse child socket pose to derive the
  child module transform in canonical frame space.
- Only finite declared symmetry transforms are eligible. If several remain
  valid, the edge must name one; smallest-Euler, random, asset-pose, and visual
  tie-breakers are forbidden.
- Assembly traverses the accepted graph deterministically and records the
  descriptor versions plus the resulting canonical transforms.
- The root solve begins from the accepted `frame-course-root` pose. Each
  gameplay module is visited through its single transform-owning parent;
  validation-only constraints run after both endpoint poses exist.
- Hand-authored per-variant correction offsets and post-solve renderer movement
  invalidate the assembly artifact.

### Connection and Subtree Validation

Each edge must pass:

- matrix and capability compatibility plus role and occupancy;
- finite pose composition and calibrated position and angular residuals;
- contact-surface gap and penetration limits;
- clearance-volume exclusion;
- semantic collider-seam continuity;
- lane and rear/front depth-envelope limits;
- transformed child-subtree bounds and course-fit limits.

Failure returns one stable machine-readable diagnostic containing recipe id and
schema version; module, edge, and socket ids; failed rule; pinned
tolerance-profile version; measured and allowed values; dependency-causal path;
responsible owner; bounded remediation; and rejected assembly version.
Authoring and build gates fail. Activation exposes a concise
`Content unavailable` state with `Retry Content` and `Return to Magazine`,
while preserving the complete diagnostic for proof and support. Validation
never renders a partial course, snaps, clamps, deletes, searches for a nearby
socket, silently chooses another symmetry, or reconnects content.

### Module Definition Lifecycle

O3 owns canonical semantic module definitions; O4 owns renderer-binding and
asset-byte artifacts; O5 adjudicates equivalence and migration proof. None may
rewrite another owner's identity.

Identity and pinning:

- Every semantic module definition has a stable id, schema version, immutable
  monotonic revision, and canonical content hash.
- Each recipe instance pins all four values plus exact semantic dependency
  hashes. A human alias resolves to an exact pin before validation and never
  acts as runtime or save authority.
- Any pinned semantic change marks dependent recipes and proof stale. A recipe
  may use the new definition only through an explicit rebuild or migration;
  `latest`, filenames, and asset discovery are forbidden.

Hash boundary:

- The semantic hash covers canonical pivot, bounds, sockets, collision, contact,
  clearance, capabilities, critical-versus-dressing classification, gameplay
  descriptors, required silhouette and cue contracts, readability envelope,
  and exact semantic dependency hashes under canonical serialization.
- Each renderer binding and underlying asset byte set has a separate
  content-addressed hash by device tier. An activation record links the pinned
  semantic and presentation identities without combining their ownership.
- A mesh-only hash, manual revision label, or monolithic all-tier hash cannot
  stand in for these records.

Migration and classification:

- A migration pins exact old and new definition ids and hashes, maps stable
  socket ids and saved semantic fields, classifies every changed field, declares
  required recipe edits, and either proves assembly, collision, route, and
  restore compatibility or marks the change breaking.
- A fail-closed comparison makes any pivot, bounds, socket, collision, contact,
  clearance, capability, gameplay descriptor, required silhouette or cue, or
  readability-envelope change semantic. Uncertain differences are semantic.
- A renderer-only revision is legal only when new art bytes preserve and
  re-prove every semantic field and human-view requirement. Texture
  compression, LOD, or tier changes are not automatically semantic, but their
  renderer and performance proof becomes stale.
- A supported old run uses its retained original pins. If unavailable or
  breaking, recovery preserves durable discoveries and cross-page progression
  and offers `Restart Run` plus `Return to Magazine`; no automatic substitution
  occurs.

Retention:

- Content-addressed semantic definitions and promoted renderer bindings remain
  while reachable from any supported released recipe, save schema, migration,
  or rollback manifest.
- Collection requires one signed reachability report over a coherent release
  graph, no remaining supported reference, and a proven migration or
  recoverable restart path that preserves durable progression.
- Newest-only, fixed-count, and unpinned network replacement policies are
  invalid.

