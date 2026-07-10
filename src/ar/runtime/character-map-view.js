export function renderCharacterMap(state, { debug = false } = {}) {
  if (!state || state.wall.status === 'searching') {
    return '<div class="character-map-search">Find a wall</div>';
  }

  if (state.wall.status === 'detected') {
    return '<div class="character-map-search">Wall found</div>';
  }

  const unfolded = state.unfold.status === 'unfolded';
  return `
    <div class="character-map ${unfolded ? 'is-unfolded' : 'is-unfolding'}" data-character-map>
      <div class="character-map__paper">
        <canvas class="character-map__canvas" data-character-map-canvas width="660" height="660" aria-label="Maze map"></canvas>
      </div>
      ${unfolded ? `
        <div class="character-map__controls" aria-label="Move character">
          <button data-${debug ? 'ar-action="swipe" data-direction' : 'map-swipe'}="up" aria-label="Move up">&#8593;</button>
          <button data-${debug ? 'ar-action="swipe" data-direction' : 'map-swipe'}="left" aria-label="Move left">&#8592;</button>
          <button data-${debug ? 'ar-action="swipe" data-direction' : 'map-swipe'}="down" aria-label="Move down">&#8595;</button>
          <button data-${debug ? 'ar-action="swipe" data-direction' : 'map-swipe'}="right" aria-label="Move right">&#8594;</button>
        </div>
      ` : ''}
    </div>
  `;
}

export function paintCharacterMap(root, state) {
  const canvas = root?.querySelector?.('[data-character-map-canvas]');
  if (!canvas || !state?.map) return;
  const context = canvas.getContext('2d');
  if (!context) return;

  const { rows, columns, cells, goal } = state.map;
  const margin = 42;
  const width = canvas.width - margin * 2;
  const height = canvas.height - margin * 2;
  const cellWidth = width / columns;
  const cellHeight = height / rows;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#e5c783';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = 'rgba(72, 42, 20, 0.12)';
  context.lineWidth = 1;
  for (let y = 18; y < canvas.height; y += 17) {
    context.beginPath();
    context.moveTo(0, y);
    context.bezierCurveTo(180, y + 4, 440, y - 5, canvas.width, y + 2);
    context.stroke();
  }

  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.strokeStyle = '#4b2b1b';
  context.lineWidth = 8;
  for (const cell of cells) {
    const x = margin + cell.x * cellWidth;
    const y = margin + cell.y * cellHeight;
    if (!cell.openings.includes('up')) line(context, x, y, x + cellWidth, y);
    if (!cell.openings.includes('left')) line(context, x, y, x, y + cellHeight);
    if (cell.y === rows - 1) line(context, x, y + cellHeight, x + cellWidth, y + cellHeight);
    if (cell.x === columns - 1) line(context, x + cellWidth, y, x + cellWidth, y + cellHeight);
  }

  const goalX = margin + (goal.x + 0.5) * cellWidth;
  const goalY = margin + (goal.y + 0.5) * cellHeight;
  context.fillStyle = '#b7342b';
  context.shadowColor = '#ffd36b';
  context.shadowBlur = 20;
  context.beginPath();
  context.arc(goalX, goalY, Math.min(cellWidth, cellHeight) * 0.24, 0, Math.PI * 2);
  context.fill();
  context.shadowBlur = 0;

  const position = state.character.position;
  const characterX = margin + (position.x + 0.5) * cellWidth;
  const characterY = margin + (position.y + 0.5) * cellHeight;
  context.fillStyle = state.goal.completed ? '#f5d66f' : '#193b52';
  context.strokeStyle = '#fff2c3';
  context.lineWidth = 5;
  context.beginPath();
  context.arc(characterX, characterY, Math.min(cellWidth, cellHeight) * 0.3, 0, Math.PI * 2);
  context.fill();
  context.stroke();
  context.fillStyle = '#fff2c3';
  context.beginPath();
  context.arc(characterX - 7, characterY - 4, 3, 0, Math.PI * 2);
  context.arc(characterX + 7, characterY - 4, 3, 0, Math.PI * 2);
  context.fill();
}

function line(context, x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}
