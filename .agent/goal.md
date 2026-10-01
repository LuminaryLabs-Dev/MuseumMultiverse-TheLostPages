# Current Goal: Picture-Frame Platforming Direction

Status: discovery

## Intent

Determine how Lost Pages should reinterpret Museum Multiverse's final
picture-frame platforming level as an AR experience, then turn the decisions
into a complete application and skill architecture.

## Current Constraints

- Do not implement yet.
- Ask one numbered multiple-choice question per output.
- Change the working idea whenever a user answer changes the direction.
- Preserve earlier Lost Pages intentions while organizing current thinking in
  `.agent/`.
- Keep verified current behavior separate from proposed behavior.

## Preserved Deliverable Intentions

The eventual design outline must cover:

- the role of all eight Lost Pages experiences;
- placeholder-image replacement and art/content requirements;
- four to five orchestration skills;
- roughly ten to twenty atomic and middle-layer skills;
- explicit per-skill triggers, authority, typed inputs/outputs, write scopes,
  evidence, fixtures, and escalation contracts;
- a hash-bound discovery freeze and explicit implementation-authority boundary;
- a durable-memory and evidence-bound reusable-learning boundary;
- an indexed, bounded `.agent/` information architecture that preserves every
  question, decision, evidence record, authority state, and user intention;
- picture-frame authoring and placement;
- domain-service ownership and boundaries;
- 3D coordinate frames, orientation, anchoring, scale, contact, and scene
  placement;
- target audience, accessibility, difficulty, and assistance behavior;
- an AR-native opening that guides the player from camera permission through
  surface understanding, placement confirmation, and world reveal;
- gameplay, interaction, feedback, progression, validation, and human-view
  proof.

## Discovery Completion Criteria

Discovery is ready for synthesis only when the interview has resolved:

1. which page or pages own picture-frame platforming;
2. how closely it continues the Museum Multiverse finale;
3. the target audience, accessibility defaults, embodiment, camera, and
   controls;
4. the frame's physical placement and spatial depth model;
5. the core platforming and strategy loop;
6. success, failure, replay, reward, and cross-page progression;
7. visual identity and replacement-asset direction;
8. the domain-service and renderer boundary;
9. the required skill hierarchy and validation gates.
10. the package and handoff contracts that keep orchestrators, middle skills,
    atoms, and proof authority separate.
11. the approval boundary that prevents provisional discovery from authorizing
    implementation or separately gated external actions.
12. the separation between discovery records, execution evidence, durable repo
    memory, and versioned skill learning.
13. the canonical-current, ledger-sharding, indexing, deduplication, and legacy
    migration rules for keeping `.agent/` usable without losing provenance.
14. the first-seconds guidance contract and the boundary between required
    launch controls, contextual physical cues, and optional interface detail.

Implementation remains separately gated by an explicit user request.
