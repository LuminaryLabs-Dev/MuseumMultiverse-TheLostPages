import './focusCoverSplash.css';

const SHOW_MS = 1000;
const FADE_MS = 360;

function makeSplash() {
  const el = document.createElement('div');
  el.className = 'focus-cover-splash';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `
    <div class="focus-cover-splash__cover">
      <div class="focus-cover-splash__title"><span>Museum</span><span>Multiverse</span></div>
      <div class="focus-cover-splash__subtitle">The Lost Chapters</div>
      <div class="focus-cover-splash__frames"><span></span><span></span><span></span></div>
      <div class="focus-cover-splash__hero"></div>
    </div>
  `;
  document.body.appendChild(el);
  return el;
}

export function installFocusCoverSplash() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return () => {};

  const splash = makeSplash();
  let showTimer = 0;
  let fadeTimer = 0;
  let wasAway = false;

  function fadeOut() {
    window.clearTimeout(fadeTimer);
    splash.dataset.visible = 'false';
    fadeTimer = window.setTimeout(() => splash.removeAttribute('data-visible'), FADE_MS);
  }

  function show() {
    window.clearTimeout(showTimer);
    window.clearTimeout(fadeTimer);
    splash.dataset.visible = 'true';
    showTimer = window.setTimeout(fadeOut, SHOW_MS);
  }

  function markAway() {
    wasAway = true;
  }

  function maybeShow() {
    if (!wasAway || document.visibilityState === 'hidden') return;
    wasAway = false;
    show();
  }

  function onVisibility() {
    if (document.visibilityState === 'hidden') markAway();
    else maybeShow();
  }

  window.addEventListener('blur', markAway);
  window.addEventListener('focus', maybeShow);
  document.addEventListener('visibilitychange', onVisibility);
  window.requestAnimationFrame(show);

  return () => {
    window.clearTimeout(showTimer);
    window.clearTimeout(fadeTimer);
    window.removeEventListener('blur', markAway);
    window.removeEventListener('focus', maybeShow);
    document.removeEventListener('visibilitychange', onVisibility);
    splash.remove();
  };
}
