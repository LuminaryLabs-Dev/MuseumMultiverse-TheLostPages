import { paintCharacterMap, renderCharacterMap } from '../runtime/character-map-view.js';

export function renderArSimulator(root, experience, runtime) {
  const state = runtime.snapshot();
  const room = state.simulator.room;
  root.innerHTML = `
    <section class="ar-simulator" style="--accent:${experience.accent};--glow:${experience.glow}" data-simulator-status="${state.simulator.status}">
      <header class="ar-simulator__header">
        <div><span>AR Simulator</span><strong>Page 01 · Procedural Room</strong></div>
        <small>seed ${room.seed} · ${room.objectCount + state.characterMap.map.objectCount} objects</small>
      </header>
      <div class="ar-simulator__viewport">
        <div class="ar-simulator__ceiling"></div>
        <div class="ar-simulator__wall ar-simulator__wall--left">${renderExhibits(room.exhibits, 'left')}</div>
        <div class="ar-simulator__wall ar-simulator__wall--back">
          ${renderCharacterMap(state.characterMap)}
        </div>
        <div class="ar-simulator__wall ar-simulator__wall--right">${renderExhibits(room.exhibits, 'right')}</div>
        <div class="ar-simulator__floor"></div>
      </div>
      <div class="ar-simulator__controls">
        ${!state.simulator.wallDetected ? '<button data-sim-action="detect">Find wall</button>' : ''}
        ${state.simulator.wallDetected && !state.simulator.mapPlaced ? '<button data-sim-action="place">Place map</button>' : ''}
        ${state.simulator.mapPlaced && !state.characterMap.goal.completed ? '<button data-sim-action="solve">Solve maze</button>' : ''}
        <button data-sim-action="reset" aria-label="Reset simulator">Reset</button>
      </div>
    </section>
  `;
  paintCharacterMap(root, state.characterMap);
  root.querySelectorAll('[data-map-swipe]').forEach((button) => {
    button.addEventListener('click', () => {
      runtime.swipe(button.getAttribute('data-map-swipe'));
      renderArSimulator(root, experience, runtime);
    });
  });
  root.querySelectorAll('[data-sim-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.getAttribute('data-sim-action');
      if (action === 'detect') runtime.detectWall();
      if (action === 'place') {
        runtime.placeMap();
        window.setTimeout(() => {
          runtime.completeUnfold();
          renderArSimulator(root, experience, runtime);
        }, Number(experience.level.characterMap.unfold.durationMs ?? 900));
      }
      if (action === 'solve') runtime.solve();
      if (action === 'reset') runtime.reset();
      renderArSimulator(root, experience, runtime);
    });
  });
}

function renderExhibits(exhibits, side) {
  return exhibits
    .filter((exhibit) => exhibit.side === side)
    .map((exhibit) => `<i style="--offset:${exhibit.offset};--tone:${exhibit.tone}%"></i>`)
    .join('');
}
