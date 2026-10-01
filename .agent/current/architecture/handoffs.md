## Orchestration Handoff Protocol

This is a proposed build-workflow contract, not an implemented runtime or agent
system.

### Coordination Model

- O1 owns a directed acyclic graph of artifact versions, prerequisite edges,
  specialist owners, consumers, acceptance gates, and explicit join gates.
- Each graph node has one write owner. Consumers may accept, reject, or block a
  packet but may not edit its artifact.
- O5 adjudicates evidence required by a gate. O1 reconciles only the current
  accepted versions and cannot waive an O5 failure.
- A correction publishes a new immutable artifact version and links back to the
  rejected packet; it never rewrites historical evidence.
- After two unsuccessful revisions of the same rejected handoff, or immediately
  on a cross-owner contract conflict, dependent nodes freeze and O1 receives an
  escalation packet. O1 may reconcile ownership or intent but may not weaken
  required O5 evidence.

### Required Handoff Packet

Each packet provisionally declares:

- packet schema version, packet id, artifact type, stable logical artifact id,
  immutable monotonic revision, and canonical content hash;
- producer id, intended consumer ids, and the producer's declared write scope;
- prerequisite artifact ids, exact versions, hashes, and acceptance states;
- typed outputs plus the acceptance criteria they claim to satisfy;
- evidence references, proof surface, unresolved risks, and known limitations;
- producer result plus references to separate immutable consumer acceptance or
  rejection records;
- correction or supersession linkage when applicable.

Packet publication is immutable. A changed field produces a new packet and
artifact version.

### Candidate Concrete Encoding

Batch 056 provisionally selects the following encoding while leaving direct
user override open. It is a proposed build-workflow contract, not a directory
or system created by this discovery pass.

- Keep discovery in `.agent/`. If separately authorized, place the executable
  control ledger at `.orchestration/v1/`.
- Store schemas in `schemas/`, immutable graph snapshots in `graphs/`, and one
  handoff revision in
  `handoffs/<owner>/<artifact-type>/<logical-slug>/rNNNNNN/`.
- Separate the producer's immutable `packet.json` from immutable consumer
  acceptance or rejection records so no consumer mutates a producer packet.
- Store typed evidence metadata under `evidence/<surface>/`, risk records under
  `risks/`, gate manifests and results under
  `gates/<gate-slug>/rNNNNNN/`, and escalation revisions under
  `escalations/<escalation-slug>/rNNNNNN/`.
- Permit only `indexes/current.json` to move. Publish its replacement
  atomically after every referenced immutable record exists and hashes
  correctly. History remains append-only.
- Keep small canonical records in Git. Large raw proof may live in a durable
  artifact store, but its record must carry a retrievable immutable location,
  exact byte hash, retention state, and availability verdict. A missing or
  expired required blob fails its gate.

Use `urn:lost-pages:<kind>:<owner>:<kebab-slug>` as the stable logical-id
namespace, `rNNNNNN` as a six-digit never-reused monotonic revision, and
`sha256:<64-lowercase-hex>` as the complete content identity. Filenames use the
owner, type, and slug rather than the colon-bearing URN.

Canonical records use UTF-8 RFC 8785 JSON Canonicalization Scheme output,
prefixed before hashing with `lost-pages/v1/<record-kind>\n`, then hashed with
SHA-256. The record's self-hash field is excluded; every referenced payload is
hashed over its exact bytes. Set-valued arrays sort by canonical id while
ordered arrays retain semantic order. Hashed semantic measurements use
declared integer canonical units or ticks. Duplicate keys, unknown schema
fields, non-finite numbers, absolute paths, `..`, symlink escape, and absent
required payloads fail validation.

Every evidence record provisionally includes:

- schema, evidence id, immutable record hash, and producing owner;
- exact subject artifact id, revision, hash, and prerequisite hashes;
- proof surface: static, simulator, browser, phone, physical AR, or human view;
- method, tool and tool version, build, environment, device, and calibration;
- UTC capture time, result, raw-evidence location and byte hash;
- limitations, criterion ids, and O5 applicability verdict with reason.

Risk records use `R0` none, `R1` low, `R2` moderate, `R3` high, and `R4`
critical. Each names a category, likelihood, impact, owner, mitigation, status,
expiry, and evidence. Unknown or unclassified severity is at least `R3`.
`R3/R4` always fail a gate. `R2` may pass only when that exact manifest names
the allowance, owner, mitigation, expiry, and ceiling; a final physical or
release gate may set a stricter ceiling. Expired mitigation reopens the risk.

Write scopes declare normalized case-sensitive repo-relative path prefixes and
artifact-id prefixes, with read or write mode. Globs, repository-root scope,
absolute paths, `..`, unresolved symlinks, and protected control paths are
invalid. Two writes overlap when either normalized prefix is equal to or an
ancestor of the other; such nodes cannot run concurrently. Reads may overlap,
and consumer verdicts go only into the consumer's acceptance namespace.

Each gate manifest pins its schema and policy versions, one graph-snapshot
hash, exact packet and consumer-verdict hashes, criterion ids, required proof
surfaces, applicable O5 evidence ids and hashes, and maximum unresolved risk.
Its immutable result records every evaluated fact and fail reason. Missing,
mismatched, stale, unavailable, rejected, inapplicable, or over-ceiling input
fails closed.

After two rejected revisions, or immediately for a write-scope, ownership,
`R4`, or cross-owner contract conflict, dependents freeze and O1 receives an
immutable escalation revision. It contains the triggering records and revision
trail, facts, affected and frozen nodes, unresolved decision, safe options,
recommendation, required authority, proof impact, and exit criteria. O1
resolves through a new record; it cannot edit a specialist artifact, rewrite
history, lower a gate, or convert an O5 failure into a pass.

### Artifact Lifecycle and Identity

- The active lifecycle is `draft` to `ready` to `accepted`.
- `rejected` records a failed consumer criterion and permits a new producer
  revision.
- `blocked` records a named external prerequisite that currently prevents
  evaluation.
- `stale` records transitive invalidation after a prerequisite revision or hash
  changes.
- `superseded` retains a historical revision that a newer revision replaces.
- Only one current `accepted` revision of a logical artifact may satisfy
  dependencies. Producers may publish `ready`; consumers alone record
  `accepted` or `rejected`.
- Artifact revisions never repeat or mutate. Packet-schema version changes are
  independent of artifact revisions.

### Acceptance and Invalidation

- The consumer validates packet shape, exact prerequisites, and its own input
  contract before beginning dependent work.
- A rejection identifies the failed criterion, owning producer, evidence gap,
  and required correction without editing the source artifact.
- Any prerequisite version or content-hash change marks every transitive
  dependent stale.
- Stale and superseded packets remain readable as history but are ineligible
  for execution, promotion, proof, join gates, or O1 reconciliation until their
  replacements pass again.

### Safe Parallelism

- A node may start only when every required prerequisite is accepted.
- Ready nodes may run concurrently only when their declared write scopes are
  disjoint.
- Concurrent nodes exchange immutable packets rather than shared mutable
  artifacts.
- A join gate opens only when one declarative manifest evaluates atomically
  against one graph snapshot and all named inputs are accepted, current, and
  hash-matched.
- Asset provenance preflight, generic spatial analysis, domain-contract
  drafting, and proof-plan preparation may overlap when their packet scopes are
  disjoint. Placement-specific integration, course promotion, final renderer
  binding, and end-to-end proof remain dependency-gated.

### Evidence Binding and Join Evaluation

- Each evidence record is immutable and names its exact subject artifact and
  prerequisite hashes.
- It declares proof method, proof surface, environment or device, timestamp,
  result, raw evidence location, known limitations, and O5 applicability
  verdict.
- Evidence from simulator, browser, public phone, and physical AR remains
  separately typed; existence does not imply applicability to another gate.
- A join manifest pins exact artifact revisions and hashes, required acceptance
  criteria, applicable evidence ids, and the maximum permitted unresolved-risk
  severity.
- Gate evaluation uses one coherent graph snapshot. Missing, mismatched, stale,
  rejected, blocked, inapplicable, or over-risk inputs fail closed.
- The manifest result is itself a versioned packet so O1 can reconcile the
  exact set that O5 evaluated.

### Provisional Artifact Flow

1. O1 publishes the journey brief and acceptance matrix.
2. O4 may preflight candidate provenance and geometry while O2 defines the
   generic placement envelope and O3 drafts renderer-independent contracts.
3. O2 publishes the accepted locked frame-local spatial descriptor against a
   current candidate or declared custom fallback.
4. O3 publishes the authoritative course and domain descriptors against the
   accepted journey and spatial versions.
5. O4 publishes final renderer bindings and art-integration evidence against
   the accepted spatial and domain versions.
6. O5 incrementally evaluates eligible packets, then publishes the complete
   proof packet only after the required join set is current.
7. O1 reconciles the accepted proof packet and all current dependencies into
   the journey result.

