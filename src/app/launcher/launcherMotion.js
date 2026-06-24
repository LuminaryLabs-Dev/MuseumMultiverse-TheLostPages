export function enhanceLauncherMotion(root) {
  if (!root || typeof window === 'undefined') {
    return () => {};
  }

  const stage = root.querySelector('[data-comic-stage]');
  const cards = Array.from(root.querySelectorAll('[data-comic-card]'));
  const spreads = Array.from(root.querySelectorAll('[data-comic-spread]'));
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if (!stage || reducedMotion) {
    return () => {};
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
    const mx = Math.max(0, Math.min(1, pointerX));
    const my = Math.max(0, Math.min(1, pointerY));
    stage.style.setProperty('--mx', mx.toFixed(3));
    stage.style.setProperty('--my', my.toFixed(3));

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = ((pointerX * window.innerWidth) - cx) / Math.max(rect.width, 1);
      const dy = ((pointerY * window.innerHeight) - cy) / Math.max(rect.height, 1);
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
  applyPointer();

  return () => {
    if (frame) {
      window.cancelAnimationFrame(frame);
    }
    observer.disconnect();
    window.removeEventListener('pointermove', setPointer);
    window.removeEventListener('scroll', applyPointer);
    cards.forEach((card) => {
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    });
  };
}
