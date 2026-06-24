# NexusRealtime Dependencies

Lost Pages uses NexusRealtime for reusable runtime behavior.

## Lost Pages Should Own

- magazine copy
- route slugs
- page data
- QR targets
- AR experience manifests
- Museum Multiverse content
- print and book presentation

## NexusRealtime Should Own

- reusable runtime systems
- AR and XR runtime patterns
- generic session behavior
- reusable input and rendering patterns
- shared runtime abstractions

## Boundary Rule

Lost Pages should configure reusable systems. It should not duplicate them.

If a feature feels reusable across projects, review whether it belongs in NexusRealtime instead of Lost Pages.

## Practical Check

Before adding runtime-like code, ask:

- Is this specific to Lost Pages content?
- Is this a general runtime capability?
- Would another Museum Multiverse app need the same behavior?
