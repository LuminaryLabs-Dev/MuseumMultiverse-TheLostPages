import './focusCoverSplash.css';

const SHOW_MS = 3200;
const FADE_MS = 360;
const BASE_PATH = import.meta.env.BASE_URL || '/';
const COVER_PAYLOAD_URL = `${BASE_PATH.replace(/\/$/, '/') }lost-pages-cover-upscaled.b64`;
const RAW_COVER_PAYLOAD_URL = 'https://raw.githubusercontent.com/LuminaryLabs-Dev/MuseumMultiverse-TheLostPages/main/lost-pages-cover-upscaled.jpg';

let coverPromise;

function makeDataImage(payload) {
  const cleanPayload = String(payload || '').replace(/\s+/g, '');
  return cleanPayload.startsWith('/9j/') ? `url('data:image/jpeg;base64,${cleanPayload}')` : '';
}

function fetchCoverPayload(url) {
  return fetch(url, { cache: 'force-cache' }).then((response) => (response.ok ? response.text() : ''));
}

function getCoverImage() {
  if (!coverPromise) {
    coverPromise = fetchCoverPayload(COVER_PAYLOAD_URL)
      .then(makeDataImage)
      .then((backgroundImage) => backgroundImage || fetchCoverPayload(RAW_COVER_PAYLOAD_URL).then(makeDataImage))
      .catch(() => '');
  }

  return coverPromise;
}

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
  const cover = splash.querySelector('.focus-cover-splash__cover');
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

  function loadThenShow() {
    getCoverImage().then((backgroundImage) => {
      if (backgroundImage && cover && cover.isConnected) {
        cover.style.backgroundImage = backgroundImage;
      }
      show();
    });
  }

  function markAway() {
    wasAway = true;
  }

  function maybeShow() {
    if (!wasAway || document.visibilityState === 'hidden') return;
    wasAway = false;
    loadThenShow();
  }

  function onVisibility() {
    if (document.visibilityState === 'hidden') markAway();
    else maybeShow();
  }

  window.addEventListener('blur', markAway);
  window.addEventListener('focus', maybeShow);
  document.addEventListener('visibilitychange', onVisibility);
  window.requestAnimationFrame(loadThenShow);

  return () => {
    window.clearTimeout(showTimer);
    window.clearTimeout(fadeTimer);
    window.removeEventListener('blur', markAway);
    window.removeEventListener('focus', maybeShow);
    document.removeEventListener('visibilitychange', onVisibility);
    splash.remove();
  };
}
