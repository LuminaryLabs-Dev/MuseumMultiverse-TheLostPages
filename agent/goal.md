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
- `/book/` for the full composition view.
- `/print/` for print review.
- `/ar/<slug>/` for QR-launched AR.
- `/debug/ar/<slug>/` for desktop debug.

## Long Term Rule

Lost Pages owns the magazine, copy, routes, QR structure, page data, and experience manifests. Reusable runtime behavior belongs in NexusRealtime.
