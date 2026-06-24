# Eight Pages QR Structure

Lost Pages is planned as an eight page printed AR companion.

Each page should have one QR target. Each target should resolve to a static route in the deployed Pages build.

## Page Plan

Page 01: cover and entry portal.
Page 02: artifact page.
Page 03: character or exhibit page.
Page 04: museum map or path page.
Page 05: lore fragment page.
Page 06: interactive object page.
Page 07: hidden or unlock page.
Page 08: back page and final portal.

## Route Families

- `/launcher/` opens the phone-friendly launcher.
- `/book/` opens the full book view.
- `/print/` opens the print review view.
- `/ar/<slug>/` opens a QR-launched AR route.
- `/debug/ar/<slug>/` opens a desktop debug route.

## Static Export Requirement

GitHub Pages needs a static `index.html` at each direct route that a phone may open.

The build exports route copies for launcher, book, print, AR slugs, and debug AR slugs.

## Page Mapping Rule

The source of truth for AR route slugs is the experience registry.

When an experience is added, removed, or renamed, update the page plan and re-check QR targets.
