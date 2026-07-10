import './styles.css';

import { createRealtimeGame } from 'nexusengine';
import { cover, pages, getPageUrl } from './data/pages.js';
import { createLostPagesImmersiveRuntime, createLostPagesRuntime } from './ar/runtime/session.js';
import { renderExperienceStage } from './ar/runtime/placement.js';
import { getSurfaceLabel } from './ar/runtime/plane-detection.js';
import { getRuntimeUiState } from './ar/runtime/ui-state.js';
import { renderQrCode } from './lib/qr.js';
import { renderLauncherMarkup, renderLauncherQrCodes } from './app/launcher/renderLauncher.js';
import { renderBookMarkup, renderBookQrCodes, renderPrintMarkup, renderPrintQrCodes } from './app/launcher/renderPrint.js';
import { routeFromLocation } from './app/routes/router.js';
import { withBasePath } from './app/routes/basePath.js';
import { resolvePublicOrigin } from './lib/origin.js';
import { renderDebugExperienceShell } from './ar/runtime/debug-shell.js';
import { renderImmersiveExperience, renderImmersiveGate } from './ar/runtime/immersive-shell.js';
import { enhanceBookScene } from './app/launcher/bookScene.js';
import { enhanceStableRail } from './app/landing/stableRailLanding.js';
import { createRouteQrKit } from './kits/routeQrKit.js';
import { createPlaneMeshCreatorKit } from './kits/planeMeshCreatorKit.js';
import { createPagePivotKit } from './kits/pagePivotKit.js';
import { createPaperPageBuilderKit } from './kits/paperPageBuilderKit.js';
import { createLostPageKit } from './kits/lostPageKit.js';
import { createPageRailMovementKit } from './kits/pageRailMovementKit.js';
import { createBookletReaderKit } from './kits/bookletReaderKit.js';
import { createComicPanelSequenceKit } from './kits/panelSequenceKit.js';
import { createPage01SimulatorRuntime } from './ar/simulator/session.js';
import { renderArSimulator } from './ar/simulator/view.js';

const app = document.querySelector('#app');
const origin = resolvePublicOrigin();
let activeRuntime = null;
let bookCleanup = null;
let launcherCleanup = null;
let surfaceGame = null;

function cleanupCurrentSurface() {
  activeRuntime?.renderer?.dispose?.();
  activeRuntime?.stop?.();
  activeRuntime = null;
  bookCleanup?.();
  bookCleanup = null;
  launcherCleanup?.();
  launcherCleanup = null;
  surfaceGame?.n?.lostPages?.dispose?.();
  surfaceGame = null;
}

function createLostPagesSurfaceGame(root) {
  return createRealtimeGame({
    root,
    kits: [
      createRouteQrKit({ pages, origin }),
      createPlaneMeshCreatorKit(),
      createPagePivotKit({ anchor: 'bottom-left', pivot: 'center' }),
      createPaperPageBuilderKit({ segmentsX: 10, segmentsY: 10 }),
      createLostPageKit({
        pages,
        origin,
        paper: {
          skin: 'lost-pages-stable-rail',
          segmentsX: 10,
          segmentsY: 10
        }
      }),
      createPageRailMovementKit({ pageCount: pages.length }),
      createBookletReaderKit({ pageCount: pages.length }),
      createComicPanelSequenceKit({ pages })
    ]
  });
}

function installStaticAssetVariables() {
  const assets = {
    '--mmgdoc-rect-frame': '/assets/mmgdoc/textures/ao-large-long-rect-frame.png',
    '--mmgdoc-gallery-abstract': '/assets/mmgdoc/textures/gallery-abstract-pics-1024.png',
    '--mmgdoc-menu-frame': '/assets/mmgdoc/textures/menu-room-frame.png'
  };

  Object.entries(assets).forEach(([name, path]) => {
    document.documentElement.style.setProperty(name, `url("${withBasePath(path)}")`);
  });
}

function canLaunchNormalArRoute() {
  const coarsePointer = window.matchMedia?.('(any-pointer: coarse)')?.matches ?? false;
  return coarsePointer || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '');
}

function setTitle(text) {
  document.title = text;
}

function renderRuntimeStatus(runtime) {
  const state = runtime.getState();
  const ui = getRuntimeUiState(state);
  const target = app.querySelector('[data-runtime-status]');
  if (!target) return;

  target.innerHTML = `
    <div class="ar-status ar-status--${ui.status}">
      <div class="ar-status__eyebrow">${getSurfaceLabel(state)}</div>
      <div class="ar-status__message">${ui.message}</div>
    </div>
  `;
}

async function renderDebugExperience(experience) {
  setTitle(`${experience.number} - ${experience.title}`);
  app.innerHTML = renderDebugExperienceShell(experience, origin);

  const qrTarget = app.querySelector('[data-qr]');
  await renderQrCode(qrTarget, getPageUrl(experience, origin));

  activeRuntime = await createLostPagesRuntime({
    root: app.querySelector('[data-runtime-root]'),
    experience,
    renderExperience: ({ manifest, state }) => renderExperienceStage({ manifest, state }),
    onUpdate() {
      renderRuntimeStatus(activeRuntime);
    }
  });

  activeRuntime.startSession();
  renderRuntimeStatus(activeRuntime);

  app.querySelectorAll('[data-runtime-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.getAttribute('data-runtime-action');
      if (action === 'surface') activeRuntime.findSurface();
      if (action === 'place') activeRuntime.placeOnPlane();
      if (action === 'solve') activeRuntime.solveMaze?.();
      if (action === 'reset') activeRuntime.resetExperience();
      renderRuntimeStatus(activeRuntime);
    });
  });
}

async function renderImmersiveRoute(experience) {
  const canLaunch = canLaunchNormalArRoute();
  setTitle(`${experience.number} - ${experience.title}`);
  app.innerHTML = renderImmersiveGate(experience, {}, { canLaunch });

  activeRuntime = await createLostPagesImmersiveRuntime({
    root: app,
    experience,
    renderExperience: renderImmersiveExperience
  });

  app.innerHTML = renderImmersiveGate(experience, activeRuntime.getState(), { canLaunch });
  if (!canLaunch) {
    await renderQrCode(app.querySelector('[data-mobile-handoff-qr]'), getPageUrl(experience, origin));
    return;
  }

  app.querySelector('[data-start-ar]')?.addEventListener('click', async () => {
    await activeRuntime.start();
  }, { once: true });
}

function renderSimulatorRoute(experience) {
  setTitle(`Simulator - ${experience.title}`);
  if (experience.slug !== 'sleeping-gallery') {
    app.innerHTML = '<main class="character-map-search">Simulator unavailable for this page.</main>';
    return;
  }
  activeRuntime = createPage01SimulatorRuntime(experience);
  renderArSimulator(app, experience, activeRuntime);
}

async function renderBookletSurface() {
  setTitle(`${cover.title} - Booklet`);
  app.innerHTML = renderPrintMarkup(origin);
  surfaceGame = createLostPagesSurfaceGame(app);
  await renderPrintQrCodes(app, origin);
  launcherCleanup = enhanceStableRail(app, { composition: surfaceGame });
}

async function render() {
  cleanupCurrentSurface();
  const route = routeFromLocation();

  if (route.type === 'experience-debug' && route.experience) {
    await renderDebugExperience(route.experience);
    return;
  }

  if (route.type === 'experience-simulator' && route.experience) {
    renderSimulatorRoute(route.experience);
    return;
  }

  if (route.type === 'experience' && route.experience) {
    await renderImmersiveRoute(route.experience);
    return;
  }

  await renderBookletSurface();
}

window.addEventListener('popstate', render);

installStaticAssetVariables();
render();
