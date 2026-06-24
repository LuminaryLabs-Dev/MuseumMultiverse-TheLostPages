# Dependency Review Workflow

Status: active

Use this workflow when a change touches NexusRealtime or reusable systems.

## Steps

1. Read `agent/dependencies.md`.
2. Decide whether the behavior belongs to Lost Pages or NexusRealtime.
3. Keep Lost Pages focused on content, routes, page data, and manifests.
4. Keep reusable behavior in NexusRealtime.
5. Record any durable boundary decision in `agent/memory.md`.
6. Update `output.md` with a short result.

## Acceptance

The change keeps product content separate from reusable runtime code.
