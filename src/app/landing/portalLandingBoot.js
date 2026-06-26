import './embedCardBoot.js';
import { installCardInputPatch } from './cardInputPatch.js';
import { enhancePortalLanding } from './portalLanding.js';

let interval = 0;
const seen = new WeakSet();
let cleanupInput = null;

function isEmbedded() {
  return window.self !== window.top || new URLSearchParams(window.location.search).has('embed');
}

function scanPortalScenes() {
  if (typeof document === 'undefined') return;
  document.querySelectorAll('[data-portal-landing]').forEach((root) => {
    if (seen.has(root)) return;
    seen.add(root);
    enhancePortalLanding(root);
    cleanupInput = installCardInputPatch();
  });
}

export function installPortalLandingObserver() {
  if (typeof window === 'undefined' || typeof document === 'undefined' || isEmbedded()) return () => {};
  interval = window.setInterval(scanPortalScenes, 250);
  window.requestAnimationFrame(scanPortalScenes);
  return () => {
    window.clearInterval(interval);
    cleanupInput?.();
  };
}
