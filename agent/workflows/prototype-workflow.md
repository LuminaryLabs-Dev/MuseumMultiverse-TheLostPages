# Prototype Workflow

Status: active

Use this workflow for small prototype passes.

## Rules

- Keep the prototype bounded.
- Build a small proof before a broad rewrite.
- Use NexusEngine Domain Service Kits or ProtoKits for reusable deterministic
  behavior; keep host/render work in explicit app adapters.
- Add new proof surfaces without removing stable routes or behavior.
- Use the simulator for rules and Playwright for player-visible acceptance.
- Record what was proven.
- Record what was not proven.
- Promote a prototype only after route, build, or visual evidence.

## Flow

Idea to small route or isolated page.

Small route to browser proof.

Browser proof to short output.md summary.

Detailed notes to agent reports when needed.

Pointer update after the run.
