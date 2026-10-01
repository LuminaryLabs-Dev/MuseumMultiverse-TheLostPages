## Current Module-Assembly State

Sources: `src/experiences/tiny-platformer-diorama/level.js`,
`src/experiences/shared/buildings.js`, and a bounded `src/` search for module,
socket, connection, graph, symmetry, and solver terms.

- Page 05 declares one flat static object list with free local `x`, `y`, and
  `z` values; it does not assemble reusable course modules.
- The shared rectangular-room helper returns a generic empty `connections`
  array. No inspected consumer gives it course-assembly semantics.
- The Page 08 `socket-*` anchors represent reward sockets in a circular room,
  not typed spatial joints between platformer modules.
- No inspected source defines stable module-instance socket ids, canonical
  socket poses, a compatibility matrix, socket roles or capability tags,
  contact and clearance descriptors, collider-seam rules, or finite symmetry
  transforms.
- No inspected source defines an explicit rooted course connection graph,
  deterministic child-transform solver, connection occupancy, cycle and
  ambiguity rejection, transformed-subtree validation, or edge-specific
  diagnostics.
- No inspected source defines a canonical `frame-course-root`, separates
  transform-owning edges from validation-only constraints, declares finite
  per-edge-kind socket cardinality, or restricts multi-attachment to junction
  types.
- No inspected source pins canonical-unit connection-tolerance profiles across
  authoring, build, and activation or emits structured assembly diagnostics
  with recipe, module, edge, socket, rule, measured, allowed, owner, causal, and
  remediation fields.

## Current Module-Definition Lifecycle State

Sources: Page 05 `level.js`, `src/ar/runtime/placement.js`,
`src/ar/runtime/session.js`, and a bounded source search for version, revision,
hash, migration, binding, activation-manifest, and retention terms.

- Page 05 inlines archetype, transform, visual, and interaction data in its
  static object list. It has no reusable module-definition registry.
- Its recipe objects pin no module schema version, immutable revision, semantic
  content hash, dependency hashes, or pre-validation alias resolution.
- Current runtime code calls the mutable experience descriptor a `manifest`,
  but it is not an immutable activation manifest and does not bind exact recipe,
  module, compatibility, tolerance, validator, device-tier, renderer-binding,
  asset, migration, or proof hashes.
- No inspected source separates canonical semantic-module hashing from
  renderer-binding and asset-byte hashing.
- No inspected source defines module-specific old-to-new migration artifacts,
  field-level semantic-versus-renderer change classification, or compatibility
  proof for saved runs.
- No inspected source retains content-addressed historical module revisions by
  supported recipe/save/migration/rollback reachability or proves when they may
  be collected.

## Current Content-Activation State

Sources: `src/ar/runtime/session.js`, `src/ar/runtime/placement.js`, Page 05
`level.js`, launcher loading code, and a bounded search for service-worker,
CacheStorage, offline, manifest-preflight, content-lease, and device-tier terms.

- The AR runtime passes the current mutable experience and inline recipe
  directly to rendering. It does not consume an immutable accepted activation
  manifest or atomically verify an exact dependency set.
- No inspected source preloads and hash-verifies a complete Page 05 variant
  before reveal or classifies later loads as neutral dressing-only.
- The launcher has ordinary asynchronous image and GLTF loading, but no
  course-content integrity manifest, required-versus-optional preload ledger,
  or no-partial-activation gate.
- No inspected source defines service-worker or CacheStorage-backed offline
  course activation, required-byte corruption handling, `Retry Content` based
  on a missing-hash set, or isolation that keeps the rest of the magazine
  usable.
- Existing in-memory texture and geometry caches define no durable manifest
  lease, storage preflight, eviction order, or resumable-run protection.
- No inspected source declares approved renderer device tiers, captures a
  capability/accessibility/performance tier-selection snapshot, pins a tier for
  Run, or performs a checkpoint-only atomic tier switch.
- No inspected source defines stable activation ids or generations, headless
  `Prepare`, atomic `Commit`, rollback to a prior committed course, or a
  compare-and-swap guard over manifest, lease, placement, capability, tier, and
  save revisions.
- Existing component-level disposal is not an activation-scoped idempotent
  cancellation protocol and does not prove drain, terminal late-callback
  rejection, or transaction-only lease release.
- No inspected source persists a write-ahead activation journal or reconciles
  committed, prepared, canceled, expired, corrupt, or ambiguous transactions on
  startup.
- The current QR loading label and gameplay objective counters are not
  manifest-derived course-preparation phases, determinate byte/item progress,
  accessible live updates, or a loading-details disclosure.
- No inspected loader defines activation-specific typed retry eligibility,
  bounded attempts, capped backoff and jitter, offline or hidden-page pausing,
  corrupt-byte quarantine, or a terminal handoff from automatic recovery to
  player-triggered `Retry Content`.
- `src/main.js` holds one mutable `activeRuntime` and invokes its asynchronous
  stop without awaiting it before route setup continues. No inspected source
  defines single-flight activation arbitration, exact-request coalescing,
  generation supersession fencing, or a one-eligible-commit invariant; actual
  overlap behavior has not been runtime-validated.
- `src/ar/runtime/ui-state.js` maps only unsupported, complete, and current
  experience-step states. No inspected player surface consumes a typed
  activation diagnostic, distinguishes recovery actions by failure class,
  preserves a privacy-safe support reference, or places technical detail behind
  a foldout.
- Current texture loads do not verify content hashes, and the launcher GLTF
  error callback substitutes a fallback notebook without an integrity
  distinction. No inspected source quarantines mismatched bytes, invalidates
  dependent staging, or opens a binding-scoped circuit breaker while preserving
  unrelated verified content and durable state.
- Current texture loading exposes no preparation heartbeat, and the launcher
  GLTF load supplies no progress callback. No inspected source defines
  phase-specific stall budgets, pauses a watchdog for offline, hidden, or
  system-suspended time, or converts a stalled owned generation into typed
  cleanup and recovery.
- The existing visibility listener only replays the decorative cover splash
  after focus returns. No inspected activation code journals background entry,
  parks owned work, prevents hidden commit, retains leases for a bounded grace
  period, or revalidates an exact generation before foreground resume.
- No inspected source listens for online or offline transitions, probes the
  approved content origin after reconnect, validates ranged-response identity,
  resumes only verified chunks, or distinguishes a captive response from valid
  manifest content.
- No inspected source uses the Storage Manager API, reserves content and staging
  bytes, handles quota exhaustion through a lease-aware arbiter, or reports
  required and reclaimable amounts. Current progress persistence writes to
  `localStorage` without a quota-recovery contract.
- No inspected source uses an origin-scoped writer lease, Web Locks,
  cross-window messaging, heartbeat, or monotonic fencing epoch to protect the
  activation journal, cache mutation, reservations, leases, or commit from
  multiple tabs or installed-app windows.
- No inspected source registers a service worker or pins a runtime build id,
  app-shell version, manifest schema, and asset-catalog root into activation.
  Existing kit version strings do not define deployment takeover, update
  staging, revocation, or a no-mixed-version run boundary.
- The package is private and exposes no application release version. No
  inspected source or public artifact defines a pinned trust root, signed
  monotonic release policy, exact revocation set, policy expiry, compatible
  migration route, or offline freshness rule.
- No inspected source retains a last-known-good application release, stages
  updates under separate ids, migrates saves copy-on-write, validates restore
  before adoption, or atomically swaps and rolls back an active release pointer.
- No inspected player surface exposes update-ready, migration-review,
  policy-supported deferral, release-detail, update-complete, or signed
  critical-revocation states, actions, announcements, and focus restoration.
- `.github/workflows/deploy-lost-pages.yml` builds and deploys every `main` push
  after `npm install`, the composition check, Vite build, static-route export,
  and `dist` existence check. It defines no immutable candidate/promotion split,
  artifact provenance or signature, migration/rollback rehearsal,
  simulator/browser/phone/AR acceptance, lifecycle-recovery matrix,
  performance gate, or O5 verdict bound to exact release bytes.
- No inspected artifact joins contract, deterministic, simulator, build,
  browser/human-view, public-phone, physical-AR, and performance verdicts
  against one exact candidate. Current deploy success therefore cannot prove
  the proposed eight-gate release standard.
- The inspected `dist/` snapshot occupies roughly `24 MiB`; its generated
  JavaScript asset is `776,146` bytes, while individual staged binary/image
  assets range up to about `7.9 MB`. Those disk sizes do not identify initial,
  critical-current-route, optional-streaming, decoded-memory, or cache classes
  and are not a supported-device performance verdict.
- The landing renderer measures frame timing locally under a variable named
  telemetry and treats deltas over `25 ms` as dropped frames, but no inspected
  source defines p95/p99 frame, command latency, startup, transferred-byte,
  decoded-memory, cache, long-task, thermal-soak, or lifecycle-cleanup gates.
  It transmits no inspected analytics or diagnostics. There is no production
  diagnostic schema, consent or preview surface, persistent-id boundary,
  sensor/save exclusion list, purpose, retention, deletion, or voluntary
  support-package flow.
- The immersive gate mentions camera permission but defines no separate,
  just-in-time diagnostic-consent flow, decline-with-full-play behavior,
  package/session scope, withdrawal, unsent-data deletion, guardian-policy
  handoff, or shared-device consent expiry.
- No inspected source or workflow defines build-bound production-health
  thresholds, minimum sample or coverage, rollout/adoption freeze, immutable
  incident evidence, O5 post-promotion adjudication, or a signed rollback path
  driven by reviewed health evidence.
- No inspected source records build-scoped boot attempts and healthy markers,
  detects repeated pre-healthy crashes, or provides an independent minimal
  recovery shell with policy-aware rollback/update, preserved state, optional
  diagnostics, and confirmed destructive reset.
- No inspected source defines a bounded diagnostic ring buffer,
  purpose-specific retention, shared-device or withdrawal deletion,
  submission receipt, server/backup expiry, aggregate anonymity threshold,
  deletion audit, or isolation between diagnostic deletion and gameplay state.
- A targeted scan found no diagnostic `fetch` or `sendBeacon`, canonical support
  package, pinned support endpoint or public key, payload encryption,
  nonce/expiry/idempotency record, signed submission receipt, deletion token,
  or failed-send package TTL in `src`, `public`, or `package.json`.
- The repo contains no support backend or inspected contract for case-scoped
  roles, purpose-bound or expiring grants, at-rest package encryption,
  read/export/deletion audit, break-glass approval and alerting, bulk-access
  prohibition, or downstream reuse limits.
- No inspected source binds a versioned diagnostic schema hash to a build or
  signed policy, rejects unknown diagnostic fields, previews schema changes,
  distinguishes narrower-compatible consent from expanded collection or
  purpose, or retains legacy package decoding and deletion-receipt support.
- No inspected source defines a minimal pre-consent local capture profile,
  transparent local diagnostic storage/deletion controls, a temporary expanded
  local-debug mode, or a mode-independent prohibited-field gate distinct from
  optional export consent.
- No inspected source or workflow defines signed diagnostic-submission disable
  authority, scoped endpoint/key/schema/package-window quarantine and rotation,
  receipt-scoped incident status or deletion, guardian-facing notice,
  diagnostic-incident evidence, gameplay-state isolation, or security and O5
  reapproval before submissions resume.

