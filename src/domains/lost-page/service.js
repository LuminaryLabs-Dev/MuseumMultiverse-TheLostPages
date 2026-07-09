import { withBasePath } from '../../app/routes/basePath.js';
import { createPaperPageBuilderService } from '../paper-page-builder/service.js';
import { createPaperSkinnedMeshService } from '../paper-skinned-mesh/service.js';

function normalizePage(page, index, origin) {
  const routeHref = withBasePath(`/ar/${page.slug}`);
  const cleanOrigin = String(origin || '').replace(/\/+$/, '');
  const qrTarget = cleanOrigin ? `${cleanOrigin}/ar/${page.slug}/` : routeHref;
  return {
    id: page.slug,
    slug: page.slug,
    index,
    number: page.number,
    title: page.title,
    description: page.description,
    pitch: page.pitch,
    panels: page.panels,
    prompt: page.prompt,
    qrTitle: page.qrTitle,
    collectible: page.collectible,
    completeText: page.completeText,
    accent: page.accent,
    deep: page.deep,
    glow: page.glow,
    qrBurst: page.qrBurst,
    routeHref,
    qrTarget,
    origin,
    source: page
  };
}

export function createLostPageService({ pages = [], origin = '', paper = {}, planeMeshCreator = null } = {}) {
  const paperPageBuilder = createPaperPageBuilderService({
    textureWidth: paper.textureWidth,
    textureHeight: paper.textureHeight,
    segmentsX: paper.segmentsX ?? 10,
    segmentsY: paper.segmentsY ?? 10,
    planeMeshCreator
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

  function loadPageCards() {
    return paperPageBuilder.loadPages(state.pages);
  }

  function createPageCard(index) {
    const page = state.pages[index];
    if (!page) return null;
    return paperPageBuilder.createCard(page, index);
  }

  function snapshot() {
    return {
      activeIndex: state.activeIndex,
      pageCount: state.pages.length,
      activePage: getActivePage(),
      pages: getPages(),
      paperPageBuilder: paperPageBuilder.snapshot(),
      paperRenderer: paperPageBuilder.snapshot(),
      paperSkinnedMesh: paperSkinnedMesh.snapshot()
    };
  }

  function dispose() {
    paperPageBuilder.dispose?.();
  }

  return Object.freeze({
    paperPageBuilder,
    paperRenderer: paperPageBuilder,
    paperSkinnedMesh,
    getPages,
    getPage,
    getActivePage,
    loadPageCards,
    createPageCard,
    focus,
    next,
    previous,
    snapshot,
    dispose
  });
}
