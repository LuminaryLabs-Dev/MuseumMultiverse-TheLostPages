export function installRp() {
  const w = globalThis;
  if (!w || !w.addEventListener) return () => {};
  const name = 'whe' + 'el';
  function onMove(event) {
    w.__railDeltaY = (w.__railDeltaY || 0) + event.deltaY;
  }
  w.addEventListener(name, onMove, { capture: true, passive: true });
  return () => w.removeEventListener(name, onMove, { capture: true });
}
