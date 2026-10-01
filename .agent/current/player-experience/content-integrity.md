## Content and Restore Integrity

- Every course run binds to a stable recipe id, schema version, and authored
  variant id.
- Every recipe module instance also pins a stable semantic definition id,
  schema version, immutable revision, canonical hash, and dependency hashes.
  Names and aliases cannot resolve to `latest` during restore.
- Semantic hashes cover all canonical gameplay and readability fields.
  Renderer bindings and asset bytes keep separate per-tier hashes and are linked
  to the semantic pins before reveal.
- Saved runs contain semantic platformer state only. Placement, WebXR, camera,
  renderer, and device-capability records remain host-owned.
- Restore migrates known recipe and module changes only through pinned
  old-to-new records with socket and semantic-state mappings plus assembly,
  collision, and route proof. If retained original content or a valid migration
  is unavailable, the experience preserves durable discoveries and cross-page
  progression, explains that the run cannot resume, and offers `Restart Run` as
  hero with `Return to Magazine` secondary.
- Placeholder and art updates remain renderer-only only after a fail-closed
  comparison proves unchanged canonical geometry, gameplay, required cues, and
  readability. Otherwise they create a new semantic module revision.
- Supported historical definitions and promoted bindings remain available
  while referenced by released recipes, save schemas, migrations, or rollbacks.
  They are removed only after proven unreachable with a durable recovery path.
- One immutable accepted activation manifest binds the selected recipe and
  variant to every semantic, assembly, compatibility, tolerance, migration,
  validator, proof, device-tier, renderer-binding, and asset dependency.
  Preflight evaluates the exact set atomically before reveal.
- Every attempt receives a stable activation id and generation. `Prepare`
  verifies and assembles the exact manifest away from the live scene, then
  returns a short-lived token over the prerequisite revisions and prepared
  output hash. `Commit` compare-and-swaps those exact revisions and atomically
  reveals the staged course or leaves the prior committed experience intact.
  Drift, expiry, or mismatch supersedes the attempt and requires another
  prepare.
- `Return to Magazine` cancels the active generation idempotently, drains its
  owned work, disposes staging, preserves verified cache bytes and the prior
  committed course, and rejects late callbacks. A write-ahead journal restores
  only committed generations after refresh or crash, aborts merely prepared
  ones, and reports ambiguous recovery as a typed content failure.
- While preparation runs, the canvas remains closed and the loading surface
  names `Checking space`, `Downloading`, `Verifying`, `Assembling`, or
  `Final recheck` with real byte/item progress. Reduced-motion and accessible
  status equivalents are mandatory. `Return to Magazine` is the sole hero
  action, `Loading details` is a foldout, and `Retry Content` appears only for a
  terminal typed failure.
- `Retry Content` creates a new activation generation from the latest coherent
  manifest, placement, capability, tier, lease, and save snapshot. Only
  reverified content-addressed bytes and staged outputs with unchanged exact
  prerequisite hashes may be reused; failed and dependent stages rerun.
- Automatic recovery inside one generation is limited to typed idempotent
  transient transport work: three attempts within fifteen foreground-online
  seconds with capped backoff and jitter. Offline or hidden time pauses the
  budget. Integrity, schema, storage, permission, and prerequisite drift fail
  immediately.
- One single-flight coordinator coalesces an exact duplicate request. A
  distinct newer player intent cancels and drains the older generation before
  preparing, leaves the prior committed experience safe, and becomes the only
  possible commit candidate.
- A terminal failure presents plain language and one matching hero action:
  `Retry Content`, `Make Space`, `Review Access`, `Re-place Frame`, or
  `Return to Magazine`. The run remains preserved, return stays available, and
  a privacy-safe support reference plus technical detail stays in a foldout.
- A content hash mismatch quarantines the exact binding and invalidates
  dependent staging. One fresh approved fetch may run in a new generation; a
  repeated mismatch opens a scoped cooldown circuit breaker while other
  verified experiences, placement, saves, discoveries, rewards, and progress
  remain intact.
- Each preparation phase emits a measurable progress heartbeat and has an
  activity-based stall budget. Offline, hidden, and suspended time pauses the
  clock. A true foreground stall safely drains the generation and shows a typed
  recovery without revealing partial content.
- Backgrounding journals and parks preparation, forbids hidden commit, disposes
  volatile staging, and retains verified work plus transaction leases only for
  a bounded grace period. Returning resumes the generation only after every
  pinned prerequisite and journal record revalidates; otherwise preparation
  restarts coherently.
- Offline preparation becomes `Waiting for connection`, pauses clocks, keeps
  return available, and retains verified chunks. Reconnect probes the approved
  origin and revalidates source revision, range identity, generation, manifest,
  and prerequisites before progress resumes.
- Unexpected quota pressure pauses before a write. One storage arbiter protects
  every active or resumable lease, evicts only eligible unleased content, and
  continues only after another atomic reservation; otherwise it preserves
  durable state and shows `Make Space` with exact required and reclaimable
  amounts.
- Across tabs or installed windows, one origin-scoped writer lease, heartbeat,
  and fencing epoch owns activation mutation. Other windows can observe exact
  shared progress. `Continue Here` requests safe handoff, while stale-owner
  takeover reconciles the journal before advancing the epoch.
- Every active course pins one runtime build, shell version, manifest schema,
  and catalog root. A complete policy-supported build may finish its run;
  updates stage separately and take control only at the magazine after current
  transactions, migrations, restore, and complete content preflight pass.
- Only a signed monotonic release policy from a pinned trust root may revoke
  exact artifacts. A nonexpired verified policy supports offline play. Expired
  required freshness shows `Connect to verify`; revocation blocks only affected
  content and preserves saves, placement, rewards, discoveries, and unrelated
  experiences.
- A last-known-good policy-allowed release and original save remain immutable
  while the new build, content, and copy-on-write migration validate under
  separate ids. One active pointer changes only after complete restore;
  otherwise staging disappears and the prior safe release remains.
- Compatible updates adopt at the magazine with an accessible `Updated` notice
  and release-details foldout. `Review Update` is the sole hero only when
  migration needs a choice, `Later` appears only while supported, and signed
  critical revocation uses state-preserving `Update and Return`.
- A deployed build is not automatically approved. Its exact provenance-bound
  bytes must pass schema, deterministic simulation, migration and rollback,
  browser human-view, public phone, lifecycle recovery, performance, and O5
  gates before signed promotion into the release policy.
- Detailed diagnostics stay on the device by default. Only separately
  consented, schema-allowlisted coarse build, typed failure, approved tier, and
  bucketed timing fields may leave without persistent identity; camera,
  microphone, room, location, gesture, save, discovery, URL, and raw-log data
  are excluded. `Share Diagnostics` previews every field, purpose, destination,
  retention limit, and deletion path.
- Diagnostic consent defaults off and is separate from camera access and play.
  It covers one reviewed package or bounded session, decline preserves the full
  experience, withdrawal deletes unsent data, and shared-device reset expires
  the prior visitor's choice.
- Predeclared aggregate health thresholds may pause further adoption of a new
  build and create O5 review evidence, but cannot interrupt a current run or
  bypass signed release policy for rollback or revocation.
- After three bounded startup failures before a healthy marker, a minimal
  recovery screen opens without AR or candidate code. It preserves saves and
  verified cache and offers only a policy-supported prior version,
  state-preserving `Update and Return`, optional previewed diagnostics, and an
  advanced confirmed reset.
- Local diagnostics live in a byte-and-age-bounded ring. Submitted packages
  carry a purpose retention limit and receipt, primary and backup copies expire
  on declared schedules, deletion works by receipt, and no diagnostic deletion
  changes saves, rewards, discoveries, placement, or cached experiences.
- `Share Diagnostics` assembles the exact preview locally, encrypts it to a
  pinned first-party key, sends only to a signed-policy endpoint with replay
  protection, and returns a signed receipt containing the retention deadline
  and deletion token. A failed package remains local only for its bounded retry
  or deletion window.
- Submitted packages are visible only to trained support assigned to the exact
  case under purpose-bound expiring access. Records stay encrypted at rest,
  every read/export/deletion is audited, bulk and unrelated reuse are forbidden,
  and exceptional access requires dual approval plus an alert.
- A diagnostic schema change shows a readable diff. Prior consent remains valid
  only for a strictly narrower compatible schema with unchanged purpose,
  destination, retention, and deletion; every expansion asks again, and old
  receipts continue to support deletion throughout their support window.
- Before sharing, the app keeps only a visible bounded essential ring of build,
  boot health, typed failure, approved tier, and bucketed timing. Expanded local
  debugging requires temporary consent, never admits prohibited fields, and
  does not imply export permission.
- If diagnostic trust is compromised, signed policy disables only affected
  submission paths, rotates trust, and offers receipt-scoped status, deletion,
  and guardian-facing notice. Saves and play remain intact, and sending resumes
  only after security and O5 approval.
- The complete current variant—including semantic course, collision, required
  art and animations, visual cues, checkpoints, recovery, and portal—loads and
  hash-verifies before the canvas opens. Only neutral dressing may stream later.
- A fully cached exact set plays offline. Missing or corrupt required content
  keeps the canvas closed, preserves the run, and shows `Retry Content` plus
  `Return to Magazine`; other cached experiences remain available.
- Every active or resumable manifest hash has a durable cache lease. Storage is
  preflighted before reveal, and eviction can affect only unleased optional or
  eligible least-recently-used content.
- Capability, accessibility, and performance evidence selects one approved
  device tier before activation. It remains pinned during active play; a tier
  switch happens only from a checkpoint through another complete preflight with
  identical semantics, required cues, and state.
- Authoring, build or CI, and runtime activation each validate recipe topology,
  sockets, bounds, collision, dependencies, and schema compatibility.
- Before the canvas reveal, every semantic module and required cue must resolve
  to an approved renderer binding for the selected device tier.
- Missing bindings never produce generic placeholders or omitted gameplay. The
  loading state names a recoverable content problem and offers `Retry Content`
  as hero with `Return to Magazine` secondary.

Exact identity formats, serialization and hash algorithms, migration schema,
reachability authority, support window, phase heartbeats and stall watchdogs,
exact retryable codes and backoff curve, quarantine record and cooldown,
background grace, reconnect and range rules, storage thresholds, writer-lease
timing and fallback, trust-root and release-policy format, update notice copy,
production-diagnostics privacy and consent, secure support-package manifest,
pinned endpoint and encryption key, replay protection, signed receipt,
deletion-token behavior, failed-send TTL, case-scoped support access,
purpose-bound expiring grants, at-rest encryption, access/export/deletion
audit, break-glass behavior, bulk-reuse prohibition, diagnostic schema
version/hash and build binding, human-readable change preview, compatibility
rules for narrower schemas, renewed consent for broader fields or purposes,
legacy receipt/deletion support, exact essential pre-consent local fields,
visible local storage/deletion controls, temporary expanded-debug consent,
prohibited-field enforcement in every mode, export-consent separation, exact
diagnostic-incident disable and quarantine scope, endpoint/key rotation,
receipt-scoped status/deletion/guardian notice, incident evidence and
reapproval, gameplay-state isolation, retention and aggregate-health
thresholds, consent copy, support-reference format, player error copy, tier
signals, focus restoration, and whether all eight routes share one platformer
domain/renderer contract with per-route recipes and host anchor adapters while
Page 02 teaches and Page 05 specializes the frame experience; the exact shared
meter-scale anchor descriptor, origin/quaternion/gravity, support/contact
planes, safe zone, capabilities, identity/revision, host mapping, activation
pinning, and drift revalidation; the canonical gameplay scale, per-route
physical/readability/safety range, uniform-root propagation, normalized
simulation invariants, pinned accepted scale, and fallback when no scale
qualifies; the shared placement/start/Jump/context/pause/return/recovery
commands, first-screen hero versus foldout boundary, input-device mappings,
focus/announcement behavior, and route-specific gesture limits remain
unresolved, as do the versioned all-eight save envelope, route namespaces,
idempotent completion/reward ledger, atomic migration, route-failure isolation,
route versus all-progress reset, and exclusion of physical-host, renderer, and
diagnostic state. The exact one-signature-mechanic catalog, versioned
recipe/domain-extension boundary, teaching and accessible fallback rules, and
proof that route signatures preserve shared physics, commands, saves,
completion, host placement, and renderer ownership also remain unresolved;
Page 05 provisionally uses layered frame-route transformation. The exact
conversion of the existing maze, glyph, sketch, word, diorama, sorting,
reveal-light, and socket/portal mechanics into authoritative platformer
extensions remains unresolved. So do the exact eight-page teaching order,
safe-introduction and mastery checks, Page 05 combination ceiling, Page 08
finale subset, route-local assistance transfer, and guarantee that optional
discoveries never gate progress. First-clear and mastery-replay duration bands,
section size, maximum active play between atomic resumable checkpoints, global
untimed behavior, local-hazard timer/pause rules, return/resume, and reward
invariance remain unresolved. The exact declarative signature-extension
capabilities, closed schemas, validation ladder, accessibility fallback,
migration, resource budgets, and forbidden code/network/DOM/WebXR/renderer/
physics/save/completion/reward authority also remain unresolved.
The provisional all-eight art direction now uses one visual bible, an evolving
impossible-museum route arc, canonical JR with renderer-only route treatments,
foundation-first Page 02/Page 05 proof followed by narrative-order production
and Page 08 synthesis, and one mechanic-linked hero landmark per route. Exact
schema fields, asset inventories, route motifs, material values, JR accessory
catalog, proof-slice exit criteria, promotion records, and
entry-to-completion landmark measurements remain unresolved. The provisional
cross-surface contract now uses closed landmark states, story-native
wall/tabletop/floor placement, three validated physical scale families, bounded
safe-boundary presentation acknowledgments with accessible static fallback,
and checkpoint-safe save-preserving re-placement. Exact descriptor schemas,
numeric family ranges, per-route support/contact/depth/safe-zone/readability
profiles, transition deadlines and diagnostic codes, fallback equivalence
proof, old-host closure protocol, preflight packet, and player-confirmation copy
remain unresolved. Page 08 now provisionally binds seven stable multimodal
route motifs to sockets one through seven, reserves socket eight for the final
key, derives portal presentation from the completion ledger, exposes an
accessible locked preview until `7 of 7`, starts a ready finale only after one
optional accessible awakening and explicit `Start Finale`, recombines Page 02
glyph gates, Page 05 layered routes, and Page 07 light reveals in separate
phases, and persists one canonical restored-magazine ending before accessible
epilogue presentation. Exact descriptor schemas, materials and cue assets,
loading limits, state transitions, announcements, focus, timing, phase
recipes, fallback parameters, save receipts, epilogue choreography, return
target, and replay scope remain unresolved. The physical relationship between
the floor/pedestal socket room, central frame, contained course, stationary
safe zone, and camera is now provisional: one low-pedestal hub surrounds an
original upright impossible-museum frame; the fixed anchor faces the confirmed
viewing zone and transitions accessibly to a head-on course; every mastery
checkpoint returns briefly to the same hub; and JR repairs an unstable archive
through untimed non-combat play. The frame's gold canvas portal and stable
multimodal border abstract the seven approved motifs without loading prior
landmarks or copying unsourced art. Exact hub/frame geometry, physical profiles,
safe-zone and view values, transition and acknowledgment timing, checkpoint
presentation, narrative copy, mesh and binding inventory, performance budget,
provenance, and clean-room evidence remain unresolved. So does the exact final
portal interaction and its checkpoint, completion acknowledgment, key/socket
persistence, focus, interruption, and no-physical-entry behavior. Completed
revisits, replay scope, discoveries, and assistance now provisionally use a
calm mastered hub with eight lit sockets and disclosed memory scenes, complete
canonical three-phase replay plus non-completing phase practice, one
immediately persisted non-gating `Restored Margin` per phase, globally
persistent explicit preferences, and route/phase/obstacle-local adaptive tiers
with a Page 08 two/four/six ladder. Exact portal geometry, command/receipt and
mastered-save schemas, replay/practice envelopes, completion suppression,
discovery ids and bindings, assistance preference/namespace schemas, focus,
interruption, migration, and proof values remain unresolved. The magazine's
permanent post-finale presentation also remains open between a restored
interactive edition, unchanged launcher, locked credits, or automatic
`New Journey+` reset. The `Explore Restored Pages` destination remains open
between a read-only progress-aware eight-page overview with last-visited focus
and contextual revisit; direct Page 08 launch; automatic last-route resume; or
the unchanged first spread, including history, focus, detail, selection, and
launch-confirmation behavior.

