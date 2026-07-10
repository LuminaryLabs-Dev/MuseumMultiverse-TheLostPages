const DIRECTIONS = [
  { name: 'up', dx: 0, dy: -1, opposite: 'down' },
  { name: 'right', dx: 1, dy: 0, opposite: 'left' },
  { name: 'down', dx: 0, dy: 1, opposite: 'up' },
  { name: 'left', dx: -1, dy: 0, opposite: 'right' }
];

function randomFactory(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function key(x, y) {
  return `${x}:${y}`;
}

function buildMaze(rows, columns, seed) {
  const random = randomFactory(seed);
  const cells = Array.from({ length: rows * columns }, (_, index) => ({
    x: index % columns,
    y: Math.floor(index / columns),
    openings: []
  }));
  const byKey = new Map(cells.map((cell) => [key(cell.x, cell.y), cell]));
  const visited = new Set([key(0, 0)]);
  const stack = [cells[0]];

  while (stack.length) {
    const current = stack[stack.length - 1];
    const options = DIRECTIONS
      .map((direction) => ({ direction, next: byKey.get(key(current.x + direction.dx, current.y + direction.dy)) }))
      .filter(({ next }) => next && !visited.has(key(next.x, next.y)));
    if (!options.length) {
      stack.pop();
      continue;
    }
    const { direction, next } = options[Math.floor(random() * options.length)];
    current.openings.push(direction.name);
    next.openings.push(direction.opposite);
    visited.add(key(next.x, next.y));
    stack.push(next);
  }

  return { rows, columns, cells, start: { x: 0, y: 0 }, goal: farthestCell(cells, columns, rows) };
}

function farthestCell(cells, columns, rows) {
  const byKey = new Map(cells.map((cell) => [key(cell.x, cell.y), cell]));
  const queue = [{ x: 0, y: 0, distance: 0 }];
  const visited = new Set([key(0, 0)]);
  let farthest = queue[0];
  while (queue.length) {
    const current = queue.shift();
    if (current.distance > farthest.distance) farthest = current;
    const cell = byKey.get(key(current.x, current.y));
    for (const direction of DIRECTIONS.filter((entry) => cell.openings.includes(entry.name))) {
      const next = { x: current.x + direction.dx, y: current.y + direction.dy, distance: current.distance + 1 };
      if (next.x < 0 || next.y < 0 || next.x >= columns || next.y >= rows || visited.has(key(next.x, next.y))) continue;
      visited.add(key(next.x, next.y));
      queue.push(next);
    }
  }
  return { x: farthest.x, y: farthest.y };
}

export function createCanvasMazeMapService({ rows = 11, columns = 11, seed = 104729 } = {}) {
  const maze = buildMaze(rows, columns, seed);
  const byKey = new Map(maze.cells.map((cell) => [key(cell.x, cell.y), cell]));

  return {
    getCollisionAt(x, y) {
      const cell = byKey.get(key(x, y));
      return cell ? { blocked: false, openings: [...cell.openings] } : { blocked: true, openings: [] };
    },
    getStart() {
      return { ...maze.start };
    },
    getGoal() {
      return { ...maze.goal };
    },
    snapshot() {
      return structuredClone({ ...maze, seed, objectCount: maze.cells.length });
    },
    reset() {
      return this.snapshot();
    }
  };
}
