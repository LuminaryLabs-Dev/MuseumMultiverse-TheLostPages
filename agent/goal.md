# Lost Pages Long Term Goal

Status: active

## Product Goal

Lost Pages is an eight page AR companion magazine for Museum Multiverse.

Each printed page should have a QR code. Each QR code should open a public static route. Each route should launch a page-specific web, debug, or AR experience.

The repo must support:

- print-facing page composition
- QR targets that work from a phone
- static GitHub Pages deployment
- debug routes for desktop review
- AR routes for mobile launch
- short deploy chat messages
- durable agent handoff state
- state alignment and inference turns

## Eight Page Structure

Page 01: cover and entry portal.
Page 02: artifact page.
Page 03: character or exhibit page.
Page 04: museum map or path page.
Page 05: lore fragment page.
Page 06: interactive object page.
Page 07: hidden or unlock page.
Page 08: back page and final portal.

## Route Structure

Each page should map to one slug in the AR experience registry.

Expected route families:

- `/launcher/` for the phone-friendly entry screen.
- `/print/` for the primary print review / presentation surface.
- `/book/` currently exists as a composition-book/reference route, but active feedback says it is pending demotion, hiding, redirect, removal, or retention only as debug/experimental/legacy.
- `/ar/<slug>/` for QR-launched AR.
- `/debug/ar/<slug>/` for desktop debug.

Do not treat `/book/` demotion/removal as implemented until route/source changes and validation evidence exist.

## State Intelligence Goal

The repo should support a reusable State Intelligence Sync turn that reads agent state, reads non-agent docs, detects drift, infers durable future rules, and updates only docs/agent knowledge unless implementation is explicitly requested.

## Long Term Rule

Lost Pages owns the magazine, copy, routes, QR structure, page data, print presentation, and experience manifests. Reusable runtime behavior belongs in NexusRealtime.
