# Museum Multiverse: Lost Pages

Purpose: a browser-first companion launcher for Museum Multiverse with eight QR-launched AR demo modules.

Architecture:
- Vite SPA with a simple QR launcher, optional book view, and route-based AR demo pages.
- Shared experience registry in `src/ar/registry/experiences.js`.
- Shared runtime helpers in `src/ar/runtime/` are thin adapters over the `nexusrealtime` package.
- `nexusrealtime` should be consumed from the public GitHub tag `git+https://github.com/LuminaryLabs-Dev/NexusRealtime.git#0.0.1` so cloud/static deploy builds do not require a sibling local checkout.
- Experience-specific modules live under `src/experiences/<slug>/`.
- Each experience folder is authoring-only: `copy.js`, `level.js`, `tuning.js`, and `index.js`.
- Shared QR generation in `src/lib/qr.js`.
- Route handling supports `/`, `/launcher`, `/book`, `/print`, `/ar/:slug`, and `/debug/ar/:slug`.
- `/` and `/launcher` are simple scrollable QR presentations with all 8 demos.
- `/` and `/launcher` should read like a PDF/page viewer, not a card grid: one centered 9:16 page per scroll stop, coil-backed page edge, QR visible on every page.
- `/book` is the canonical Three.js composition-notebook route; `/print` remains an alias for compatibility.
- `/ar/:slug` is the QR path and must stay immersive/camera-first with only a required Start AR permission gate before AR.
- `/debug/ar/:slug` and `/ar/:slug?debug=1` preserve the old webpage-style debug controls.
- The book page should be canvas-only: black background, GLB notebook model, two visible page textures, no DOM cards/text overlays.
- `/book` binds Lost Pages canvas textures to the GLB paper meshes with a toon shader hook and drives the GLB page-turn animation through its `Scene` animation clip.
- `/book` keeps `spreadIndex` separate from page-turn `animationTime`; each wheel/click turn reuses the GLB clip from the correct start pose so spreads advance one at a time.
- `/book` page textures use side-aware safe gutters; left pages need tighter text widths because the spiral binding consumes more projected space.
- Print source copy lives under `print/magazine-pages/`.

Conventions:
- Keep copy, QR targets, and experience metadata in the shared registry.
- Keep gameplay/runtime systems in generic NexusRealtime kits; Lost Pages owns product copy, routing, QR, launcher UI, print UI, and authored level datasets.
- Do not restore `file:../NexusRealtime` for production-bound Lost Pages builds unless deliberately testing unpublished local runtime changes.
- Use NexusSimulator `ar-simtime` for headless AR validation and authored 5-minute content checks; keep simulator orchestration outside this app repo.
- Do not put direct DOM event handlers, WebXR calls, camera code, or local progression systems in individual experience folders.
- Keep the app dependency-light and static-host friendly.
- QR targets must use a LAN/public `VITE_PUBLIC_ORIGIN`; do not generate printable localhost QR codes.
- Prefer HTTPS public origins for QR targets so phone camera/WebXR permissions can work.
- Production static deployment targets `https://luminarylabs.dev/apps/lost-pages/`; build with `npm run build:luminary` and deploy generated output to `Website/apps/lost-pages` with `npm run deploy:luminary`.
- Use a parchment/ink/brass visual palette with distinct per-page accent colors.
- Imported MM_GDoC art lives under `public/assets/mmgdoc/`; keep web copies optimized and treat converted models as reusable staged assets, not a new metadata source of truth.
- Prefer additive changes; do not introduce a second source of truth for experience metadata.
