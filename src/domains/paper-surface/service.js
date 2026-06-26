import { enhancePaperSurface } from '../../app/launcher/paperSurface.js';

export function createPaperSurfaceService({ quality = 'adaptive' } = {}) {
  const state = {
    quality,
    mounted: false,
    fallback: false,
    lastMountSelector: null
  };
  let cleanup = null;

  function mount(root) {
    dispose();
    const target = root?.querySelector?.('[data-paper-viewport]');
    state.lastMountSelector = target ? '[data-paper-viewport]' : null;
    cleanup = enhancePaperSurface(root);
    state.mounted = Boolean(target);
    state.fallback = Boolean(target?.hasAttribute?.('data-paper-fallback'));
    return snapshot();
  }

  function dispose() {
    cleanup?.();
    cleanup = null;
    state.mounted = false;
    return snapshot();
  }

  function snapshot() {
    return { ...state };
  }

  return Object.freeze({ mount, dispose, snapshot });
}
