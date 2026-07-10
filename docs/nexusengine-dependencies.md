# NexusEngine Dependencies

Lost Pages uses a commit-pinned NexusEngine package for reusable runtime behavior and Domain Service Kit contracts.

## Lost Pages Owns

- magazine copy, route slugs, page data, and QR targets
- AR experience manifests and Museum Multiverse content
- print, book, DOM, canvas, Three.js, camera, and WebXR presentation adapters

## NexusEngine Owns

- reusable runtime and simulation systems
- AR and XR session and device patterns
- DSK identity, dependencies, deterministic state, reset, snapshots, and `engine.n.*` APIs

## Boundary Rule

Lost Pages configures reusable systems and composes page-specific experiences. Reusable domain rules belong in NexusEngine Kits or ProtoKits; browser and renderer behavior stays in explicit Lost Pages adapters.

Before adding runtime-like code, determine whether it is page content, reusable domain logic, or a host/renderer adapter.
