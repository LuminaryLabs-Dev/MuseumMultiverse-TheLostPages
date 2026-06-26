import { getPageBySlug } from '../../data/pages.js';
import { stripBasePath } from '../routes/basePath.js';
import { renderCardPage } from './cardPage.js';

function renderEmbeddedCard() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('embed') !== 'rail-card') return;
  const root = document.querySelector('#app');
  const path = stripBasePath(window.location.pathname).split('/').filter(Boolean);
  const page = path[0] === 'ar' ? getPageBySlug(path[1]) : null;
  if (!root || !page || root.querySelector('.rail-card-page')) return;
  renderCardPage(root, page);
}

export function installEmbeddedCardBoot() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return () => {};
  const timer = window.setInterval(renderEmbeddedCard, 100);
  window.requestAnimationFrame(renderEmbeddedCard);
  return () => window.clearInterval(timer);
}
