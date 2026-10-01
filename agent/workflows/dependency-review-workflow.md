# Dependency Review Workflow

Status: active

Use this workflow when a change touches NexusEngine contracts or reusable
systems.

## Steps

1. Read `agent/dependencies.md`.
2. Decide whether the behavior belongs to Lost Pages, a NexusEngine Domain
   Service Kit, a ProtoKit, or an explicit host/renderer adapter.
3. Keep Lost Pages focused on content, routes, page data, and manifests.
4. Keep reusable deterministic domain behavior in NexusEngine; keep Three.js,
   DOM, canvas, camera, WebXR, storage, and lifecycle integration in adapters.
5. Record any durable boundary decision in `agent/memory.md`.
6. Update `output.md` with a short result.

## Acceptance

The change keeps product content separate from reusable runtime code.
