# Launcher Cleanup Plan

Status: active

## Problem

The previous launcher looked too much like a heavy PDF-style page viewer. It used dense decoration, tall single-page cards, and a lot of visual furniture before the user could understand the eight AR routes.

## Cleanup Direction

- Replace the dense page viewer with clean comic-book spreads.
- Make each card easier to scan.
- Keep page number, title, short copy, mission, AR action, and QR code.
- Keep Book view and Print view as secondary actions.
- Add light reactive animation through JavaScript and CSS variables.
- Respect reduced-motion preferences.

## Implementation Notes

- `renderLauncher.js` owns the simplified spread markup.
- `cleanLauncher.css` owns the new comic-book visual system.
- `launcherMotion.js` owns pointer tilt, light position, and visible-spread animation.
- `main.js` wires launcher cleanup so motion listeners do not survive route changes.

## Validation Goal

The launcher should load at `/launcher/`, look less overdone, and feel more like a modern comic-book index for eight AR pages.
