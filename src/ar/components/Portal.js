export function buildPortalMarkup(manifest) {
  return `
    <div class="ar-portal">
      <div class="ar-portal__ring" style="border-color:${manifest.accent};box-shadow:0 0 18px ${manifest.glow}66;"></div>
      <div class="ar-portal__core" style="background:${manifest.glow};"></div>
    </div>
  `;
}
