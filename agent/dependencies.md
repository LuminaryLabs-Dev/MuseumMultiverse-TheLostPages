# Lost Pages Dependencies

Status: active

## Main Dependency

Lost Pages uses NexusRealtime for reusable runtime behavior.

## Lost Pages Owns

- magazine copy
- page data
- QR behavior
- print routes
- web routes
- AR experience manifests
- Museum Multiverse content and tone
- deploy chat output

## NexusRealtime Owns

- reusable runtime systems
- AR and XR runtime concepts
- simulation behavior
- device behavior
- reusable input and session patterns

## Boundary Rule

Do not copy reusable runtime logic into Lost Pages when it belongs in NexusRealtime.

Lost Pages should configure reusable behavior. It should not become the runtime package.

## Review Rule

When a change touches runtime architecture, decide whether the behavior belongs in Lost Pages content/config or in NexusRealtime reusable code.
