import './museumMockScene.css';
import { withBasePath } from '../app/routes/basePath.js';

function escapeText(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));
}

export function renderMuseumMockScene(experience) {
  const title = escapeText(experience.title);
  return `
    <main class="museum-mock" data-museum-mock>
      <header class="museum-mock__header">
        <div>
          <span class="museum-mock__eyebrow">Lost Pages · Mock Scene</span>
          <h1>${title}</h1>
          <p>Walk through the greybox museum and approach the center frame.</p>
        </div>
        <a class="museum-mock__back" href="${withBasePath(`/?page=page${experience.number}`)}">Back to page</a>
      </header>
      <section class="museum-mock__stage" aria-label="Museum mock scene">
        <div class="museum-mock__room">
          <div class="museum-mock__ceiling"></div>
          <div class="museum-mock__wall museum-mock__wall--back"></div>
          <div class="museum-mock__wall museum-mock__wall--left"></div>
          <div class="museum-mock__wall museum-mock__wall--right"></div>
          <div class="museum-mock__frame museum-mock__frame--left"><span>01</span></div>
          <div class="museum-mock__frame museum-mock__frame--center"><img src="${withBasePath('/assets/comic-pages/page01-museum-entry-v1.png')}" alt="Page 01 museum artwork" /></div>
          <div class="museum-mock__frame museum-mock__frame--right"><span>03</span></div>
          <div class="museum-mock__plinth museum-mock__plinth--left"></div>
          <div class="museum-mock__plinth museum-mock__plinth--right"></div>
          <div class="museum-mock__player" data-museum-player aria-label="Visitor character"><span></span></div>
          <div class="museum-mock__exit" data-museum-exit>EXIT</div>
        </div>
      </section>
      <footer class="museum-mock__controls">
        <span>Move with WASD or arrow keys.</span>
        <strong data-museum-status>Walk to the center frame.</strong>
      </footer>
    </main>
  `;
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

function installMuseumMockController() {
  const root = document.querySelector('[data-museum-mock]');
  if (!root) return;
  const player = root.querySelector('[data-museum-player]');
  const status = root.querySelector('[data-museum-status]');
  const pressed = new Set();
  let x = 50;
  let y = 78;
  let lastFrame = performance.now();

  const onKeyDown = (event) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(event.key)) {
      pressed.add(event.key.toLowerCase());
      event.preventDefault();
    }
  };
  const onKeyUp = (event) => pressed.delete(event.key.toLowerCase());

  function frame(now) {
    const delta = Math.min(0.05, (now - lastFrame) / 1000);
    lastFrame = now;
    const left = pressed.has('a') || pressed.has('arrowleft');
    const right = pressed.has('d') || pressed.has('arrowright');
    const up = pressed.has('w') || pressed.has('arrowup');
    const down = pressed.has('s') || pressed.has('arrowdown');
    const moving = left || right || up || down;
    if (left) x -= 24 * delta;
    if (right) x += 24 * delta;
    if (up) y -= 18 * delta;
    if (down) y += 18 * delta;
    x = clamp(x, 16, 84);
    y = clamp(y, 57, 88);
    player.style.setProperty('--player-x', `${x}%`);
    player.style.setProperty('--player-y', `${y}%`);
    player.classList.toggle('is-walking', moving);
    const nearFrame = Math.abs(x - 50) < 10 && y < 70;
    const reachedExit = y > 84 && x > 42 && x < 58;
    status.textContent = reachedExit ? 'Museum route complete.' : nearFrame ? 'Artwork reached. Look around, then find the exit.' : moving ? 'Walking through the museum.' : 'Walk to the center frame.';
    requestAnimationFrame(frame);
  }

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  requestAnimationFrame(frame);
}

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', installMuseumMockController, { once: true });
  if (document.readyState !== 'loading') installMuseumMockController();
}
