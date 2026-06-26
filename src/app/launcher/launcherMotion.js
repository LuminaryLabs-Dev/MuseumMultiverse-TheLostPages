import './cleanLauncher.css';

function deckRoleFor(distance) {
  if (distance === 0) return 'active';
  if (distance === 1) return 'next-1';
  if (distance === 2) return 'next-2';
  return 'off';
}

function enhanceBookletControls(root, composition) {
  const stage = root.querySelector('[data-booklet-reader]');
  const reader = composition?.n?.bookletReader;
  const panels = composition?.n?.comicPanel;
  if (!stage || !reader || !panels) return () => {};

  const pages = Array.from(root.querySelectorAll('[data-booklet-page]'));
  const progress = root.querySelector('[data-booklet-progress]');
  const openButton = root.querySelector('[data-booklet-open]');
  const revealButton = root.querySelector('[data-booklet-reveal]');
  const nextButton = root.querySelector('[data-booklet-next]');
  const prevButton = root.querySelector('[data-booklet-prev]');
  let flipTimer = 0;

  function renderPanelState(page) {
    if (!page) return;
    const slug = page.getAttribute('data-page-slug');
    const state = panels.snapshot(slug);
    page.querySelectorAll('[data-booklet-panel]').forEach((panel) => {
      const index = Number(panel.getAttribute('data-panel-index') || 0);
      panel.toggleAttribute('data-revealed', index < state.revealedCount);
    });
    if (revealButton) revealButton.disabled = state.complete;
  }

  function renderBookletState() {
    const state = reader.snapshot();
    stage.toggleAttribute('data-open', state.isOpen);
    pages.forEach((page, index) => {
      const distance = index - state.activePageIndex;
      const role = deckRoleFor(distance);
      const visible = role !== 'off';
      page.hidden = !visible;
      page.dataset.deck = role;
      page.toggleAttribute('data-active', role === 'active');
      if (role === 'active') renderPanelState(page);
    });
    if (progress) {
      progress.textContent = `Page ${String(state.activePageIndex + 1).padStart(2, '0')} of ${String(state.pageCount).padStart(2, '0')}`;
    }
    if (prevButton) prevButton.disabled = !state.canGoPrevious;
    if (nextButton) nextButton.disabled = !state.canGoNext;
  }

  function pulseFlip(direction, action) {
    window.clearTimeout(flipTimer);
    stage.dataset.flip = direction;
    stage.dataset.shuffle = 'true';
    action();
    renderBookletState();
    flipTimer = window.setTimeout(() => {
      delete stage.dataset.flip;
      delete stage.dataset.shuffle;
    }, 460);
  }

  function openBooklet() {
    pulseFlip('cover', () => reader.open());
  }

  function revealNext() {
    const page = pages[reader.snapshot().activePageIndex];
    const slug = page?.getAttribute('data-page-slug');
    if (!slug) return;
    const state = panels.revealNext(slug);
    if (state.complete) {
      composition.n.progress?.markPageRead?.(slug);
      composition.n.progress?.claimFragment?.(slug);
    }
    renderBookletState();
  }

  function nextPage() {
    if (!reader.snapshot().canGoNext) return;
    pulseFlip('forward', () => {
      const state = reader.nextPage();
      const slug = pages[state.activePageIndex]?.getAttribute('data-page-slug');
      if (slug) panels.resetPage(slug);
    });
  }

  function previousPage() {
    if (!reader.snapshot().canGoPrevious) return;
    pulseFlip('backward', () => reader.previousPage());
  }

  openButton?.addEventListener('click', openBooklet);
  revealButton?.addEventListener('click', revealNext);
  nextButton?.addEventListener('click', nextPage);
  prevButton?.addEventListener('click', previousPage);
  renderBookletState();

  return () => {
    window.clearTimeout(flipTimer);
    openButton?.removeEventListener('click', openBooklet);
    revealButton?.removeEventListener('click', revealNext);
    nextButton?.removeEventListener('click', nextPage);
    prevButton?.removeEventListener('click', previousPage);
  };
}

export function enhanceLauncherMotion(root, options = {}) {
  if (!root || typeof window === 'undefined') {
    return () => {};
  }

  const stage = root.querySelector('[data-comic-stage]');
  const cards = Array.from(root.querySelectorAll('[data-comic-card]'));
  const spreads = Array.from(root.querySelectorAll('[data-comic-spread]'));
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const cleanupBooklet = enhanceBookletControls(root, options.composition);

  if (!stage || reducedMotion) {
    return () => cleanupBooklet();
  }

  let frame = 0;
  let pointerX = 0.5;
  let pointerY = 0.5;

  function setPointer(event) {
    const rect = stage.getBoundingClientRect();
    pointerX = rect.width ? (event.clientX - rect.left) / rect.width : 0.5;
    pointerY = rect.height ? (event.clientY - rect.top) / rect.height : 0.5;

    if (!frame) {
      frame = window.requestAnimationFrame(applyPointer);
    }
  }

  function applyPointer() {
    frame = 0;
    const clampedX = Math.max(0, Math.min(1, pointerX));
    const clampedY = Math.max(0, Math.min(1, pointerY));
    const viewportX = clampedX * window.innerWidth;
    const viewportY = clampedY * window.innerHeight;

    cards.forEach((card) => {
      if (card.hidden) return;
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (viewportX - cx) / Math.max(rect.width, 1);
      const dy = (viewportY - cy) / Math.max(rect.height, 1);
      card.style.setProperty('--tilt-x', Math.max(-1, Math.min(1, -dy)).toFixed(3));
      card.style.setProperty('--tilt-y', Math.max(-1, Math.min(1, dx)).toFixed(3));
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.toggleAttribute('data-visible', entry.isIntersecting);
    });
  }, { rootMargin: '-12% 0px -12% 0px', threshold: 0.22 });

  spreads.forEach((spread) => observer.observe(spread));
  window.addEventListener('pointermove', setPointer, { passive: true });
  window.addEventListener('scroll', applyPointer, { passive: true });
  window.addEventListener('resize', applyPointer, { passive: true });
  applyPointer();

  return () => {
    cleanupBooklet();
    if (frame) {
      window.cancelAnimationFrame(frame);
    }
    observer.disconnect();
    window.removeEventListener('pointermove', setPointer);
    window.removeEventListener('scroll', applyPointer);
    window.removeEventListener('resize', applyPointer);
    cards.forEach((card) => {
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    });
  };
}
