export function buildFrameMarkup(manifest) {
  return `
    <div class="ar-frame">
      <div class="ar-frame__title">${manifest.title}</div>
      <div class="ar-frame__subtitle">${manifest.qrTitle}</div>
    </div>
  `;
}
