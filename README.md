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

## Deploy

This repo now deploys from `main` with GitHub Actions.

Workflow file:

```text
.github/workflows/deploy-lost-pages.yml
```

The workflow:

1. Installs Node dependencies with `npm ci`.
2. Sets the Vite GitHub Pages base path for this repo.
3. Builds the site into `dist/`.
4. Uploads the GitHub Pages artifact.
5. Deploys to GitHub Pages.
6. Sends a Discord webhook message with the live link, commit summary, and changed files.

Before expecting deploy notifications, add this Actions secret:

```text
DISCORD_WEBHOOK_URL
```

GitHub path:

```text
Settings → Secrets and variables → Actions → New repository secret
```

Also set Pages to use Actions:

```text
Settings → Pages → Build and deployment → Source → GitHub Actions
```

## Notes

- QR codes must point at a LAN/public HTTPS origin. Set `VITE_PUBLIC_ORIGIN=https://<public-host>` before printing; localhost QR codes intentionally render an error.
- Normal QR scans show one `Start AR` gate, then full-screen AR. Debug controls stay out of the QR path.
- Device-specific AR mode selection lives in `NexusRealtime`; Lost Pages owns copy, routes, QR, and experience manifests.
- The GitHub Pages workflow sets `VITE_PUBLIC_ORIGIN` to the repo Pages URL during deploy.
