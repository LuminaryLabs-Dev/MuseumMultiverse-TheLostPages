export function renderBookMarkup() {
  return `
    <section class="book-stage" aria-label="Lost Pages composition notebook">
      <div class="book-stage__scene" data-book-scene></div>
    </section>
  `;
}

export async function renderBookQrCodes() {
  return true;
}

export const renderPrintMarkup = renderBookMarkup;
export const renderPrintQrCodes = renderBookQrCodes;
