export function installRailSupport() {
  if (typeof document === 'undefined') return () => {};
  function apply() {
    const cards = document.getElementsByClassName('portal-landing__iframe-card');
    return cards.length;
  }
  window.requestAnimationFrame(apply);
  return () => {};
}
