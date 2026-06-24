# Museum Multiverse: Lost Pages

An AR companion magazine for Museum Multiverse.

## What is in the repo

- `src/` contains the browser app, page data, and shared QR rendering.
- `print/magazine-pages/` contains the copy source for each printed page.
- `/ar/:slug` routes launch the page-specific immersive AR experience.
- `/debug/ar/:slug` and `/ar/:slug?debug=1` keep the desktop debug surface.
- `/book` renders the full composition-book reference page.

## Run locally

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 4176
```

## Build

```bash
npm run build
```

## Notes

- QR codes must point at a LAN/public HTTPS origin. Set `VITE_PUBLIC_ORIGIN=https://<public-host>` before printing; localhost QR codes intentionally render an error.
- Normal QR scans show one `Start AR` gate, then full-screen AR. Debug controls stay out of the QR path.
- Device-specific AR mode selection lives in `NexusRealtime`; Lost Pages owns copy, routes, QR, and experience manifests.
