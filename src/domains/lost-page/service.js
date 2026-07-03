import { withBasePath } from '../../app/routes/basePath.js';
import { createPaperRendererService } from '../paper-renderer/service.js';
import { createPaperSkinnedMeshService } from '../paper-skinned-mesh/service.js';

function normalizePage(page, index, origin) {
  const routeHref = withBasePath(`/ar/${page.slug}`);
  return {
    id: page.slug,
    slug: page.slug,
    index,
    number: page.number,
    title: page.title,
    description: page.description,
    prompt: page.prompt,
    qrTitle: page.qrTitle,
    collectible: page.collectible,
    accent: page.accent,
    deep: page.deep,
    glow: page.glow,
    routeHref,
    origin,
    source: page
  };
}

export function createLostPageService({ pages = [], origin = '', paper = {} } = {}) {
  const paperRenderer = createPaperRendererService({
    textureWidth: paper.textureWidth,
    textureHeight: paper.textureHeight
  });
  const paperSkinnedMesh = createPaperSkinnedMeshService({
    skin: paper.skin ?? 'lost-pages-stable-rail'
  });
  const state = {
    activeIndex: 0,
    pages: pages.map((page, index) => normalizePage(page, index, origin))
  };

  function getPages() {
    return state.pages.map((page) => ({ ...page }));
  }

  function getPage(value) {
    if (typeof value === 'number') return state.pages[value] ? { ...state.pages[value] } : null;
    const page = state.pages.find((item) => item.slug === value || item.id === value);
    return page ? { ...page } : null;
  }

  function focus(index) {
    state.activeIndex = Math.max(0, Math.min(state.pages.length - 1, Math.round(Number(index) || 0)));
    return snapshot();
  }

  function next() {
    return focus(state.activeIndex + 1);
  }

  function previous() {
    return focus(state.activeIndex - 1);
  }

  function getActivePage() {
    return getPage(state.activeIndex);
  }

  function createPageCard(index) {
    const page = state.pages[index];
    if (!page) return null;
    return paperRenderer.createCard(page, index);
  }

  function snapshot() {
    return {
      activeIndex: state.activeIndex,
      pageCount: state.pages.length,
      activePage: getActivePage(),
      pages: getPages(),
      paperRenderer: paperRenderer.snapshot(),
      paperSkinnedMesh: paperSkinnedMesh.snapshot()
    };
  }

  function dispose() {
    paperRenderer.dispose?.();
  }

  return Object.freeze({
    paperRenderer,
    paperSkinnedMesh,
    getPages,
    getPage,
    getActivePage,
    createPageCard,
    focus,
    next,
    previous,
    snapshot,
    dispose
  });
}
