import { enhancePortalLanding } from './portalLanding.js';

const seen = new WeakSet();

function scanPortalScenes() {
  if (typeof document === 'undefined') return;
  document.querySelectorAll('[data-portal-landing]').forEach((root) => {
    if (seen.has(root)) return;
    seen.add(root);
    enhancePortalLanding(root);
  });
}

window.setInterval(scanPortalScenes, 250);
window.requestAnimationFrame(scanPortalScenes);
