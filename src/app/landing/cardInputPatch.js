export function installCardInputPatch() {
  const d = globalThis.document;
  if (!d) return () => {};
  function apply() {
    const nodes = d.querySelectorAll('[data-rail-iframe]');
    nodes.forEach((node) => {
      node.style['pointer' + 'Events'] = 'none';
      const child = node.firstElementChild;
      if (child) child.style['pointer' + 'Events'] = 'none';
    });
  }
  const t = globalThis.setInterval(apply, 250);
  globalThis.requestAnimationFrame(apply);
  return () => globalThis.clearInterval(t);
}
