import { enhanceStableRail } from './stableRailLanding.js';

const seen = new WeakSet();

function scanStableRail() {
  if (typeof document === 'undefined') return;
  document.querySelectorAll('[data-stable-rail]').forEach((root) => {
    if (seen.has(root)) return;
    seen.add(root);
    enhanceStableRail(root);
  });
}

export function installStableRailAutoBoot() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return () => {};
  const timer = window.setInterval(scanStableRail, 250);
  window.requestAnimationFrame(scanStableRail);
  return () => window.clearInterval(timer);
}
