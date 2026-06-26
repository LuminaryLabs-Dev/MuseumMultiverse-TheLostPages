import { bookletPanelKinds } from '../../data/bookletPanels.js';

function buildDefaultPlans(pages = []) {
  return pages.map((page) => ({
    pageSlug: page.slug,
    panels: bookletPanelKinds.map((kind, index) => ({
      id: `${page.slug}-${kind}`,
      kind,
      index
    }))
  }));
}

export function createComicPanelService({ pages = [], plans = buildDefaultPlans(pages) } = {}) {
  const bySlug = new Map(plans.map((plan) => [plan.pageSlug, plan]));
  const revealBySlug = new Map(plans.map((plan) => [plan.pageSlug, 0]));

  function getPlan(slug) {
    return bySlug.get(slug) ?? null;
  }

  function getRevealedCount(slug) {
    const plan = getPlan(slug);
    if (!plan) return 0;
    return Math.max(0, Math.min(plan.panels.length, revealBySlug.get(slug) ?? 0));
  }

  function revealNext(slug) {
    const plan = getPlan(slug);
    if (!plan) return snapshot(slug);
    revealBySlug.set(slug, Math.min(plan.panels.length, getRevealedCount(slug) + 1));
    return snapshot(slug);
  }

  function revealTo(slug, index) {
    const plan = getPlan(slug);
    if (!plan) return snapshot(slug);
    revealBySlug.set(slug, Math.max(0, Math.min(plan.panels.length, index)));
    return snapshot(slug);
  }

  function resetPage(slug) {
    revealBySlug.set(slug, 0);
    return snapshot(slug);
  }

  function isComplete(slug) {
    const plan = getPlan(slug);
    return Boolean(plan && getRevealedCount(slug) >= plan.panels.length);
  }

  function snapshot(slug) {
    const plan = getPlan(slug);
    if (!plan) {
      return { pageSlug: slug, panels: [], revealedCount: 0, complete: false };
    }
    const revealedCount = getRevealedCount(slug);
    return {
      pageSlug: slug,
      panels: plan.panels.map((panel, index) => ({ ...panel, revealed: index < revealedCount })),
      revealedCount,
      totalPanels: plan.panels.length,
      complete: revealedCount >= plan.panels.length
    };
  }

  function snapshotAll() {
    return plans.map((plan) => snapshot(plan.pageSlug));
  }

  return Object.freeze({
    getPlan,
    getRevealedCount,
    revealNext,
    revealTo,
    resetPage,
    isComplete,
    snapshot,
    snapshotAll
  });
}
