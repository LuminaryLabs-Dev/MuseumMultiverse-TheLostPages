import './styles.css';

import { createRealtimeGame } from 'nexusrealtime';
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
import { enhanceLauncherMotion } from './app/launcher/launcherMotion.js';
import { createRouteQrKit } from './kits/routeQrKit.js';
import { createBookletReaderKit } from './kits/bookletReaderKit.js';
import { createComicPanelSequenceKit } from './kits/panelSequenceKit.js';
import { createPaperSurfaceKit } from './kits/paperSurfaceKit.js';

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
  surfaceGame?.n?.paperSurface?.dispose?.();
  surfaceGame = null;
}

function createLostPagesSurfaceGame(root) {
  return createRealtimeGame({
    root,
    kits: [
      createRouteQrKit({ pages, origin }),
      createPaperSurfaceKit({ quality: 'adaptive' }),
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
      if (action === 'reset') activeRuntime.resetExperience();
      renderRuntimeStatus(activeRuntime);
    });
  });
}

async function renderImmersiveRoute(experience) {
  setTitle(`${experience.number} - ${experience.title}`);
  app.innerHTML = renderImmersiveGate(experience, {});

  activeRuntime = await createLostPagesImmersiveRuntime({
    root: app,
    experience,
    renderExperience: renderImmersiveExperience
  });

  app.innerHTML = renderImmersiveGate(experience, activeRuntime.getState());
  app.querySelector('[data-start-ar]')?.addEventListener('click', async () => {
    await activeRuntime.start();
  }, { once: true });
}

async function renderBookletSurface() {
  setTitle(`${cover.title} - Booklet`);
  app.innerHTML = renderPrintMarkup(origin);
  surfaceGame = createLostPagesSurfaceGame(app);
  surfaceGame.n.paperSurface.mount(app);
  await renderPrintQrCodes(app, origin);
  launcherCleanup = enhanceLauncherMotion(app, { composition: surfaceGame });
}

async function render() {
  cleanupCurrentSurface();
  const route = routeFromLocation();

  if (route.type === 'experience-debug' && route.experience) {
    await renderDebugExperience(route.experience);
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
