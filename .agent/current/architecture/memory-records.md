## Shared Memory Contract

Provisional Batch 058 separates four memory and learning surfaces:

- `.agent/` owns human-readable goals, evidence, questions, provisional and
  approved decisions, synthesized design, and current architecture. Ledgers
  preserve interview history while active files stay concise.
- `.orchestration/` owns immutable run, packet, attempt, evidence, risk, gate,
  and escalation truth. A summary has no authority without exact source hashes.
- Root `memory.md` owns only concise, current, durable repo purpose,
  architecture, conventions, and verified long-lived preferences. It changes
  only after a directly approved decision or an implemented-and-verified
  lasting change, cites its owning decision or accepted artifact, and replaces
  superseded text instead of accumulating duplicates.
- Skill packages contain no mutable personal memory. Reusable learning begins
  as an immutable `lesson-candidate` with exact observation/evidence/subject
  hashes, proposed scope and owner, confidence, limitations, contradictions,
  expiry or recheck trigger, affected contracts, and privacy/rights class.

O5 adjudicates lesson evidence applicability; O1 routes the candidate to its
owner; product, authority, or preference changes require direct user approval.
Accepted learning becomes either a deduplicated `memory.md` change or a new
versioned skill, profile, fixture, or contract and makes affected gates stale.

Legacy `agent/` remains read-only until an audited item-by-item migration.
Ambient chat, transient failures, secrets, raw room or sensor data,
unconsented participant records, unsupported inference, and aggregate logs
never become durable authority. This candidate changes no current memory or
skill package.

## Discovery Information Architecture

Provisional Batch 058 uses one canonical location for every `.agent/` record
and separates compact current truth from append-only provenance:

```text
.agent/
  README.md
  goal.md
  current/
    brief.md
    architecture.md
    frontier.md
    architecture/
      overview.md
      orchestrators.md
      handoffs.md
      spatial.md
      assembly.md
      activation.md
      release-operations.md
      shared-platformer.md
      packages.md
      lower-skills.md
      domain-service.md
      validation.md
      performance.md
      memory-records.md
      guidance.md
    player-experience/
      index.md
      placement.md
      content-integrity.md
      play.md
      spatial-visual.md
      variants.md
      sections-feedback.md
      finale-completion.md
      architecture-proof.md
  questions/
    index.md
    current.md
    archive/
      q001-100.md
      q101-200.md
      q201-285.md
      q286-290.md
      q291-295.md
      q296-300.md
      q301-305.md
  decisions/
    index.md
    current-brief.md
    current-brief-gameplay.md
    ledger/
      b001-020.md
      b021-040.md
      b041-058.md
      b059.md
      b060.md
      b061.md
  evidence/
    index.md
    app-state.md
    page05.md
    content-runtime.md
    page08-progression.md
    interaction-feedback.md
    spatial.md
    assets-provenance.md
    orchestration.md
    boundary.md
  ideas/
    current.md
    provisional-direction.md
    provisional-direction-visual-gameplay.md
    evidence-and-intentions.md
    open.md
    open-batch-frontier.md
  archive/
    architecture-batch-recap.md
    legacy-agent-map.md
    migration-manifest.md
    override-reminders.md
    pre-cleanup-record-shape.md
```

Stable question and batch ids never change. `questions/index.md` and
`decisions/index.md` map id or range, current status, canonical owning path, and
content hash. Current files target at most roughly 300 lines; closed ledger
shards are immutable. A record is stored authoritatively once, and an exact
duplicate may be removed only after the canonical copy is verified and an
explicit redirect is recorded. Unresolved, directly approved, provisional,
superseded, and authority states remain visible.

Legacy `agent/` stays read-only and receives only an audited item-level map;
runtime source is outside this reorganization. Direct user override remains
open.
