## Candidate Skill-Package Contract

Batch 057 provisionally selects one versioned dual interface for all
twenty-five skills while leaving direct user override open:

```text
<skill-name>/
  SKILL.md
  contract.json
  schemas/
  fixtures/
  examples/       # only when needed
  references/     # only when needed
  scripts/        # only when needed and audited
```

- `SKILL.md` declares positive and negative triggers, purpose, primary owner,
  explicit authority and non-goals, ordered workflow, stop conditions, and
  escalation path in concise operator-facing language.
- `contract.json` pins stable skill id and version, layer, owner, prerequisite
  skill and artifact ids, typed input and output schema references, allowed
  tools and side effects, normalized read/write scopes, idempotency, retry and
  timeout rules, required evidence and acceptance criteria, and correction
  target.
- `schemas/` defines every typed boundary. `fixtures/` includes valid, exact
  boundary, invalid, stale, and permission-denied records. Optional content is
  admitted only when directly required by the skill.
- One content-hashed catalog pins every package, dependency, contract, schema,
  fixture set, and allowed invocation edge. Missing, stale, undeclared,
  permission-expanding, or overlapping contracts fail before work begins.
- Orchestrators may brief, schedule, freeze, join, reconcile, and escalate.
  They may not perform an atom's operation or write a specialist artifact.
- A middle skill may compose only declared atoms owned by its orchestrator and
  emits one bounded typed result. Cross-owner needs become immutable handoffs.
- An atom performs one operation, owns one primary artifact type, invokes no
  peers, and writes no cross-owner state. It is deterministic and idempotent
  whenever its operation permits.
- O5 writes only evidence, applicability, gate-result, and correction-verdict
  records. It never repairs another owner's artifact.
- Any authority, input, output, tool, side-effect, scope, or dependency
  expansion requires a new package version and invalidates affected gates.

This package layout is a discovery proposal only. No skill files, schemas,
fixtures, catalog, or scripts are created by this document.

### Candidate Suite Distribution Boundary

Batch 057 provisionally makes a future repo-owned `skills/lost-pages/` suite
authoritative for only the eight new packages—O1-O4 and M5/A8/A9/A10—while
leaving direct user override open.

```text
skills/lost-pages/
  suite.json
  skill-suite.lock.json
  packages/        # the eight Lost Pages-owned packages
  profiles/        # narrowing adapters for pinned external skills
```

- `suite.json` pins the suite release, complete package catalog, allowed
  invocation graph, required contract versions, and resulting suite hash.
- `skill-suite.lock.json` pins all seventeen external dependencies—the sixteen
  reused lower skills and existing O5—by stable id, exact version, source,
  complete content hash, compatible input/output contract, and applicability.
- A profile may narrow an external skill's accepted inputs, outputs, tools,
  scopes, or gates. It may not edit, widen, rename, copy, or claim ownership of
  that dependency.
- An unavailable, hash-mismatched, or contract-incompatible dependency blocks
  only its affected graph nodes until its owner publishes a compatible version
  or the architecture changes explicitly.
- A separately authorized packaging step would build one immutable installable
  artifact from the repo-owned suite and lock, verify the installed hash, and
  retain the repository as source of truth.
- A package, dependency, profile, invocation-edge, contract, or hash change
  creates a new suite version and makes every affected handoff and gate stale.
- `.agent/` remains discovery documentation and never becomes an executable
  package or installation source.

No suite directory, lock, profile, artifact, or installation is created by
this discovery proposal.

### Candidate Future Build Sequence

Batch 057 provisionally selects the following first separately authorized
implementation sequence while leaving direct user override open:

1. Freeze one explicitly approved discovery snapshot. Audit and lock all
   seventeen external skill dependencies and resolve incompatible contracts
   without changing application source.
2. Create only the suite/catalog, eight new package contracts, schemas,
   fixtures, and orchestration ledger. Dry-run every five-owner handoff,
   rejection, staleness, join, and escalation path on synthetic records.
3. Build one end-to-end walking skeleton: Page 02 guided wall-frame teaching,
   one complete Page 05 `The Folded Stacks` variant, and a non-playable Page 08
   progression fixture. The slice includes canonical JR, accepted frame or
   custom fallback, production bindings, Plan/Run, checkpoint, failure,
   assistance, recovery, portal, reward, migration edge, and magazine return
   with no production placeholder.
4. Require the exact slice to pass every applicable G1-G8 gate before allowing
   any reuse claim or multi-route expansion.
5. Complete the other two Page 05 variants, then Page 01 and Pages 03, 04, 06,
   and 07 in narrative order. Each route promotes independently through
   current accepted handoffs and applicable full gates.
6. Build Page 08 last from seven accepted motifs, run copy-on-write migration
   and all-eight regression, and promote one exact catalog/release candidate.

A failed wave returns to the owning producer, retains accepted prior artifacts,
and blocks downstream work. No wave consumes provisional, rejected, stale, or
inapplicable evidence. This sequence is planning only and does not authorize
source, skill, asset, deployment, or installation changes.

### Candidate Invocation Lifecycle

Batch 057 provisionally selects one bounded ledger-driven execution model while
leaving direct user override open:

- O1 opens a run with stable run id, approved discovery, suite,
  dependency-lock, graph-snapshot and base-commit hashes, wave, requested
  authority, and acceptance matrix.
- Orchestrators publish only owned child-node plans. The control plane validates
  catalog invocation edges, accepted prerequisites, tool grants, and disjoint
  scopes before a host invokes a node. No skill invokes or spawns a peer.
- Every attempt receives only immutable input hashes, declared reads,
  normalized writes, allowed tools and side effects, idempotency key, attempt
  id, fencing epoch, deadline, heartbeat, cancellation token, and required
  result schema. Ambient chat memory and unlisted files have no authority.
- Read-only nodes consume one pinned snapshot. A write-bearing node works in an
  isolated worktree or equivalent sandbox at the pinned base, changes only its
  declared paths, and publishes one producer-owned patch or commit plus one
  typed artifact packet. It cannot absorb sibling or user-dirty work.
- Nodes run concurrently only with accepted prerequisites, disjoint write and
  artifact scopes, and available host capacity. Capacity affects scheduling,
  never product semantics.
- Success, rejection, blockage, timeout, cancellation, and crash publish
  immutable attempt records. Retry retains the logical node and idempotency key
  but gets a new attempt id and fence. Changed input creates a new node revision
  and stales older attempts.
- O5 consumes exact candidate hashes read-only and writes only evidence and
  verdicts. O1 may atomically join accepted producer refs but cannot rewrite
  them, bypass failed proof, or reconcile unresolved overlap.
- Recovery reads only durable ledger state. Missing scope, lease, heartbeat,
  result, or clean-integration proof fails closed.

This lifecycle is a design candidate only. It creates no run, worktree, agent,
skill invocation, patch, commit, or control-plane implementation.

### Candidate Design Freeze and Authority Boundary

Batch 057 provisionally requires O1 to publish one immutable
`design-freeze-candidate` before Wave 0 while leaving direct user override open.
It contains:

- stable candidate id, canonical hash, and starting commit;
- exact hashes for goal, decision, design, architecture, evidence, suite plan,
  and unresolved-question records;
- separate lists of direct user answers and provisional self-answers;
- assumptions, exclusions, missing proof, selected waves, repositories,
  normalized write scopes, allowed side-effect classes, and acceptance gates;
- a concise human-readable diff from the prior candidate.

Implementation requires an explicit user response naming and approving that
exact candidate id/hash and wave scope. Provisional self-answers remain
recommended defaults only. O1, O5, tests, green gates, prior broad requests,
and silence cannot supply user authority.

Skill or dependency installation, credential use, rights-sensitive copying or
redistribution, destructive save/data operations, physical-participant
recruitment or recording, Git push, default-branch mutation, and public
deployment remain separately and explicitly gated. A change to semantic
decisions, unresolved-question treatment, authority, repository, scope,
dependency, asset-use class, proof ceiling, or wave produces a new candidate
and requires new approval. Expected in-scope implementation commits may descend
from the approved starting commit until external overlap or drift requires a
reviewed rebase.

Every run packet carries the approved candidate hash and fails outside its
scope. This section grants no approval and creates no freeze candidate.

