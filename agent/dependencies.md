# Lost Pages Dependencies

Status: active

## Current Dependency State

Lost Pages imports NexusEngine for reusable runtime behavior. `package.json` and `package-lock.json` are pinned to commit `55b7f33f6d008b2e3b120e370f09b96ed73105e9`.

## Target Dependency

New reusable mechanics use the NexusEngine Domain Service Kit contract and install APIs under `engine.n.*`.

## Lost Pages Owns

- magazine copy
- page data
- QR behavior
- print routes
- web routes
- AR experience manifests
- Museum Multiverse content and tone
- deploy chat output

## NexusEngine Owns

- reusable runtime systems
- AR and XR runtime concepts
- simulation behavior
- device behavior
- reusable input and session patterns
- domain ownership, deterministic state, reset, snapshots, dependency tokens, validation, and `engine.n.*` service APIs

## Boundary Rule

Do not copy reusable runtime logic into Lost Pages when it belongs in NexusEngine or the NexusEngine ProtoKit path.

Lost Pages should configure reusable behavior. It should not become the runtime package.

Reusable domain services must remain renderer and host independent. Three.js, DOM, canvas, GPU, WebXR, storage providers, and platform lifecycle code belong behind explicit adapters.

The implemented Page 01 boundary contains only three new local DSK owners: Lost
Pages Gameplay, Auto Runner, and Journey Progress. Page 01 consumes all three
with passing headless and player proof. They remain local promotion candidates
until another page proves reuse; no external repository write is authorized.

A-Frame is not a dependency target. Reopen it only in Pass 9 if direct-device
evidence shows the installed NexusEngine/Three.js host cannot satisfy the
declared wall/table/floor placement and recovery contract.

## Review Rule

When a change touches runtime architecture, decide whether the behavior belongs in Lost Pages content/composition, a NexusEngine Domain Service Kit, a ProtoKit, or a host/renderer adapter.
