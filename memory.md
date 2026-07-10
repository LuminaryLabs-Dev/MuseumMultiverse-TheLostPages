# Museum Multiverse: Lost Pages

Purpose: a browser-first companion launcher for Museum Multiverse with eight QR-launched AR demo modules.

Architecture:
- Vite SPA with a simple QR launcher, optional book view, and route-based AR demo pages.
- Shared experience registry in `src/ar/registry/experiences.js`.
- Shared runtime helpers in `src/ar/runtime/` import the pinned NexusEngine package. The dependency and lockfile target NexusEngine commit `55b7f33f6d008b2e3b120e370f09b96ed73105e9`.
- Page 01 is the Character Map: a wall-first canvas maze composed from six local NexusEngine Domain Service Kits. The DSKs own deterministic maze, character, unfold, goal, reset, and snapshot state; the runtime adapter owns camera, placement signals, gestures, and canvas drawing.
- Page 01 has a camera-free `/sim/ar/sleeping-gallery/` route backed by a separate `n:ar-simulator` DSK. The simulator generates a small procedural room, classified wall, and map anchor without pretending to be physical-device AR proof.
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
- Keep reusable gameplay/runtime systems in NexusEngine Domain Service Kits or the NexusEngine ProtoKit path; Lost Pages owns product copy, routing, QR, launcher UI, print UI, authored descriptors, and eight experience compositions.
- Do not add or restore NexusRealtime dependencies, imports, or compatibility wrappers.
- Each experience targets 100-300+ deterministic authored or generated world objects without requiring every object to be active or expensive at once.
- Domain state and rules must stay renderer-independent. Three.js, DOM, canvas, WebXR, GPU, and platform lifecycle work belong in explicit host or renderer adapters.
- Use NexusSimulator `ar-simtime` for headless AR validation and authored 5-minute content checks; keep simulator orchestration outside this app repo.
- Static export includes the Page 01 simulator route so reviewers can test the wall-map loop without camera permissions.
- Do not put direct DOM event handlers, WebXR calls, camera code, or local progression systems in individual experience folders.
- Keep the app dependency-light and static-host friendly.
- QR targets must use a LAN/public `VITE_PUBLIC_ORIGIN`; do not generate printable localhost QR codes.
- Prefer HTTPS public origins for QR targets so phone camera/WebXR permissions can work.
- Production static deployment targets `https://luminarylabs.dev/apps/lost-pages/`; build with `npm run build:luminary` and deploy generated output to `Website/apps/lost-pages` with `npm run deploy:luminary`.
- Use a parchment/ink/brass visual palette with distinct per-page accent colors.
- Imported MM_GDoC art lives under `public/assets/mmgdoc/`; keep web copies optimized and treat converted models as reusable staged assets, not a new metadata source of truth.
- The focus cover splash now uses a local PNG cover asset in `src/app/splash/` instead of the remote CDN payload path.
- The current cover art source shows JR with an afro and Black appearance.
- The focus cover splash now centers the art as an image element and uses redundant reveal triggers so it reliably hands off to the page view.
- The portal landing page curve was narrowed so the floating pages stay centered in the reveal view.
- The stable rail page pivot now uses centered visual offsets so the floating pages sit in the frame instead of pinning to the bottom-left corner.
- The stable rail camera now looks slightly left so the active page lands in the screen center like the splash.
- The main rail uses one continuous card-stack model: the front page flies right/forward, three upcoming pages stay visibly stacked behind it, wheel/touch input is bounded continuous progress, and delayed settling only aligns the stack after input stops.
- The outgoing rail card now flies right and forward, with explicit depth separation from the incoming stack. During motion no more than three cards remain render-visible.
- The first comic page now uses a centered four-panel layout with a reserved QR space in the middle and story copy about a shy kid finding expression in the museum.
- The first comic page now uses the generated sleeping-gallery reference PNG directly as the page art, with the existing QR rendered as a centered overlay plane.
- Aha, I found the smoking gun: the canvas-composited image drew correctly offscreen, but the visible Three.js page stayed gray; splitting base art and QR into separate textures fixed the render.
- The sleeping-gallery QR overlay is now mapped from the generated PNG's actual middle burst-circle coordinates instead of the card's generic center.
- Page two now uses a high-resolution posterized four-panel comic renderer with a black stage, masthead, halftone color blocks, bordered panels, caption boxes, and a center burst QR generated from the existing placeholder route.
- Prefer additive changes; do not introduce a second source of truth for experience metadata.
