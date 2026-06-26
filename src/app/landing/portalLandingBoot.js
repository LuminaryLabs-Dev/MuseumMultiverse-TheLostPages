import { enhancePortalLanding } from './portalLanding.js';

export function installPortalLandingObserver() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return () => {};
  const cleanups = new WeakMap();

  function mountAll() {
    document.querySelectorAll('[data-portal-landing]').forEach((root) => {
      if (!cleanups.has(root)) cleanups.set(root, enhancePortalLanding(root));
    });
  }

  const observer = new MutationObserver(mountAll);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  mountAll();

  return () => {
    observer.disconnect();
    document.querySelectorAll('[data-portal-landing]').forEach((root) => cleanups.get(root)?.());
  };
}
