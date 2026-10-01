## Content Activation and Delivery Contract

This is a provisional O1/O3/O4/O5 join consumed by the host. O3 supplies the
accepted semantic set, O4 supplies accepted presentation bytes and delivery
metadata, O5 supplies applicable proof, and O1 reconciles one immutable
activation manifest. The runtime may verify and consume it but cannot resolve,
substitute, or weaken its dependencies.

### Activation Manifest

The accepted manifest pins:

- its own schema, immutable identity, revision, and canonical hash;
- recipe id, schema, revision, hash, and selected authored variant;
- every semantic module definition and exact semantic dependency hash;
- compatibility-matrix, tolerance-profile, assembly-solver, and validator
  versions;
- migration state and restore compatibility;
- the selected approved device tier;
- every required renderer-binding and asset-byte hash;
- required proof artifact ids, revisions, hashes, and applicability verdicts.

Preflight evaluates this complete set against one coherent artifact and
capability snapshot. Any absent, stale, mismatched, unaccepted, corrupt, or
inapplicable input blocks reveal with the structured content error. Neither
`latest` resolution, renderer inspection, root-only success, nor progressive
partial activation authorizes play.

### Required Preload and Optional Streaming

- Before canvas reveal, the host loads and hash-verifies the complete current
  variant: semantic course, collision, every gameplay-critical renderer binding
  and byte set, required animations and non-audio visual cues, checkpoint and
  recovery content, and portal completion content.
- It does not preload unrelated variants, mastered picker choices, or renderer
  tiers that the selected manifest does not pin.
- Only explicit dressing-only assets with accepted neutral fallbacks may stream
  later. Their absence, arrival, or failure cannot alter layout, depth,
  occlusion of required action, silhouette or cue readability, collision,
  interaction, simulation, save state, or progression.

### Offline Integrity

- A complete locally cached manifest set activates offline after every required
  hash re-verifies.
- One missing or corrupt required byte keeps the canvas closed and preserves the
  selected variant, checkpoint, discoveries, and durable progression.
- The UI names the missing-content state, offers `Retry Content` when
  connectivity returns and `Return to Magazine`, and leaves other cached
  experiences available.
- Generic shapes, nearest cached modules, partial courses, and unpinned network
  replacements are forbidden.

### Durable Cache Lease

- Before reveal, the host atomically preflights storage and acquires a durable
  lease over every hash required by the active or resumable manifest.
- A lease survives app closure while the run remains resumable and releases
  only after completion, explicit restart or abandonment, or a proven migration
  installs a new complete lease.
- Eviction may touch only unleased content, preferring neutral optional dressing
  and then reachability-eligible least-recently-used sets. It cannot weaken the
  supported-release retention contract.
- Insufficient space fails before reveal with exact required, available, and
  reclaimable byte evidence plus retry and return actions.

### Device-Tier Selection and Replacement

- Before manifest acceptance, the host records one deterministic capability,
  accessibility, and performance snapshot and selects one approved tier.
- The manifest pins that tier for active play. The tier preserves all semantic
  modules, collision, required cues, discoveries, route state, and interaction;
  only approved presentation dressing differs.
- Sustained performance pressure cannot remove assets per frame. At a
  checkpoint, play may pause while another complete approved tier manifest is
  loaded, leased, and atomically preflighted. Replacement proceeds only with
  identical semantic state and a safe rollback path; otherwise the existing tier
  remains paused and recoverable.
- Unvalidated player tier choice and highest-tier-only behavior are invalid.

### Transactional Prepare and Commit

- Each attempt has one stable activation id and monotonic generation. Commands,
  callbacks, staged resources, lease claims, journal records, diagnostics, and
  progress events carry both.
- `Prepare` stages the exact accepted manifest away from the live scene,
  re-verifies hashes, atomically secures storage and leases, assembles
  headlessly, validates the complete course, and leaves the previous safe UI or
  committed course intact.
- Successful preparation issues a bounded-expiry token containing exact
  manifest, lease-generation, locked-placement, capability-snapshot, tier, and
  saved-semantic-state revisions plus the prepared output hash.
- `Commit` performs one compare-and-swap over that complete token. A match
  atomically installs semantic and renderer roots, transfers lease ownership,
  writes the committed journal marker, and reveals once. Duplicate commits
  return the same result.
- Any mismatch or expiry marks the generation superseded, disposes unshared
  staging, releases transaction-only leases, preserves prior committed and
  durable state, and requires a new `Prepare`. It never rebases individual
  fields into a staged course.

Cancellation:

- `Cancel Activation` is idempotent by id and generation. It stops new work,
  aborts interruptible I/O, drains in-flight steps, writes a terminal canceled
  marker, disposes only staged CPU, GPU, and scene resources, and releases only
  transaction-owned leases.
- Already verified content-addressed bytes and the previous course, save,
  placement, discoveries, and progress remain.
- Every callback or commit checks the terminal generation before mutation, so a
  canceled or superseded attempt cannot reveal late.

Interrupted recovery:

- A durable write-ahead journal records activation id and generation, manifest
  hash, prior committed activation, phase, lease set, prepared token hash,
  terminal state, and commit marker.
- Startup restores only a fully committed activation whose manifest, content,
  leases, placement and semantic save still match. Prepared-without-commit work
  is aborted; orphan staging and transaction-only leases are reconciled while
  verified cache bytes and durable state remain.
- Corrupt, missing, or contradictory journal evidence fails closed with a typed
  diagnostic and retry or return path. A recorded `Prepare` is never inferred to
  mean committed.

### Player Preparation Surface

- Until commit, the canvas remains closed and no staged course subtree appears.
- The hero area shows exactly one current phase: `Checking space`,
  `Downloading`, `Verifying`, `Assembling`, or `Final recheck`.
- Byte progress covers manifest-declared transfers; item progress covers the
  finite required set. Values are monotonic within a generation and never use a
  fabricated percentage or time estimate.
- Reduced motion uses a static fill and text. Semantics expose a determinate
  progress value and throttled live phase updates without announcing every byte.
- `Return to Magazine` is the only action during preparation and invokes the
  cancellation contract. `Loading details` discloses technical ids, measured
  counts, and the latest non-sensitive diagnostic.
- `Retry Content` appears only in a typed terminal failure state, not during
  ordinary progress. Raw logs and hashes never replace the player-facing
  summary.

### Retry, Arbitration, and Integrity Failure

- `Retry Content` always creates a new activation id and generation from the
  latest coherent prerequisite snapshot. It may reuse a content-addressed byte
  only after re-verification and a staged output only when every exact
  prerequisite hash remains unchanged; failed and transitive stages are
  invalidated before another `Prepare`.
- Within one nonterminal generation, automatic retry is limited to typed,
  idempotent transient transport or chunk-read work: at most three attempts
  inside fifteen foreground-online seconds with capped exponential backoff and
  jitter. Offline or hidden time pauses the budget. Integrity, schema, storage,
  permission, and prerequisite-drift failures terminate immediately.
- One single-flight coordinator owns activation eligibility. Exact duplicate
  prerequisite snapshots coalesce. A distinct newer player intent supersedes
  the older generation through the cancellation-and-drain contract, preserves
  the prior committed course, and becomes the only possible commit candidate.
- A terminal fault carries a stable code, phase, activation id, generation,
  recoverability, safe measured evidence, and privacy-safe support reference.
  The player sees plain language and exactly one matched hero action; return
  remains available and technical detail stays under a foldout.
- An integrity mismatch atomically removes the bytes from the readable cache,
  quarantines the exact binding, and invalidates dependent staging. One fresh
  approved fetch may run in a new generation. Another mismatch opens a scoped
  cooldown circuit breaker until the manifest or source revision changes or
  explicit retry becomes eligible; unrelated cache and durable state remain.

### Mobile Lifecycle and Shared-Origin Ownership

- Every preparation phase declares a measurable byte, item, or worker heartbeat
  plus an activity-based stall budget. Offline, hidden, and
  system-suspended intervals do not consume it. A foreground stall invokes
  generation-scoped cancel-and-drain, preserves verified and durable state, and
  emits typed recovery; it never authorizes partial reveal.
- Background entry journals the generation, stops new work, parks interruptible
  I/O at verified chunk boundaries, disposes volatile staging, and retains
  verified bytes plus transaction leases for a bounded grace period. Commit is
  forbidden while hidden. Foreground resume retains the generation only after
  its exact manifest, placement, capability, tier, lease, save, token, and
  journal revalidate; otherwise a new preparation is required.
- Offline is a visible nonterminal `Waiting for connection` phase with return
  available and retry/watchdog clocks paused. Reconnect probes the approved
  origin and revalidates manifest identity, source revision, range validator,
  generation, and prerequisites before resuming verified chunks. Captive or
  wrong content is a typed failure.
- One storage arbiter owns actual, reserved, reclaimable, and staging-byte
  accounting. Unexpected quota pressure pauses before the write and may evict
  only unleased eligible dressing or historical content. Continuation requires
  another atomic reservation; otherwise the generation drains and the player
  receives exact privacy-safe `Make Space` evidence while durable state remains.
- One origin-scoped writer lease with heartbeat and monotonic fencing epoch owns
  journal, cache, reservation, lease, and commit mutation across tabs and
  installed windows. Followers may observe progress and coalesce exact work.
  Cooperative `Continue Here` handoff or stale-owner takeover reconciles the
  journal and advances the epoch before mutation, fencing every prior callback.

