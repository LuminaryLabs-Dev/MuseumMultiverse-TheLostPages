export function buildReticleMarkup(manifest) {
  return `
    <div class="ar-reticle" style="border-color:${manifest.glow};box-shadow:0 0 18px ${manifest.glow}66;"></div>
  `;
}
