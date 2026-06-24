import { getPageUrl } from '../../data/pages.js';
import { withBasePath } from '../../app/routes/basePath.js';
import { buildFrameMarkup } from '../components/Frame.js';
import { buildPortalMarkup } from '../components/Portal.js';
import { buildReticleMarkup } from '../components/Reticle.js';

export function renderDebugExperienceShell(experience, origin) {
  return `
    <section class="experience-shell" style="--accent:${experience.accent};--deep:${experience.deep};--glow:${experience.glow}">
      <header class="experience-shell__mast">
        <div class="folio">${experience.number}</div>
        <div class="sheet__eyebrow">Lost Page Debug</div>
        <h1>${experience.title}</h1>
        <p class="sheet__description">${experience.description}</p>
        <p class="sheet__pitch">${experience.pitch}</p>
      </header>

      <section class="experience-shell__hud">
        <div class="scan-card">
          <div class="scan-card__label">${experience.qrTitle}</div>
          <div class="qr-slot" data-qr></div>
          <p class="scan-card__note">Debug preview keeps the old webpage controls for desktop testing.</p>
        </div>

        <div class="artifact-card">
          <div class="artifact-card__topline">Collectible</div>
          <div class="artifact-card__title">${experience.collectible}</div>
          <div class="artifact-card__prompt">${experience.prompt}</div>
          <div class="artifact-card__url">${getPageUrl(experience, origin)}</div>
        </div>
      </section>

      <section class="experience-shell__viewer">
        <div class="viewer-card">
          <div class="viewer-card__bar">
            ${buildFrameMarkup(experience)}
            <div class="viewer-card__controls">
              <button class="button-link" data-runtime-action="surface">Find Surface</button>
              <button class="button-link" data-runtime-action="place">Place</button>
              <button class="button-link button-link--ghost" data-runtime-action="reset">Reset</button>
            </div>
          </div>
          <div class="viewer-card__stage">
            ${buildReticleMarkup(experience)}
            <div class="viewer-card__scene" data-runtime-root></div>
            <div class="viewer-card__portal">${buildPortalMarkup(experience)}</div>
          </div>
          <div class="viewer-card__status" data-runtime-status></div>
        </div>
      </section>

      <footer class="sheet__footer">
        <a class="button-link" href="${withBasePath('/book')}" data-nav>Open book</a>
        <a class="button-link button-link--ghost" href="${withBasePath('/')}" data-nav>Back to cover</a>
      </footer>
    </section>
  `;
}
