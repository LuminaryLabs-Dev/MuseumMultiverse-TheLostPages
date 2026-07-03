const DEFAULT_S_CURVE_POINTS = [
  { t: -2.8, x: -1.6, y: 1.1, z: -1.55, rotationX: -0.02, rotationY: 0.72, rotationZ: -0.11, scale: 0.88 },
  { t: -1.4, x: 1.25, y: 0.52, z: -1.0, rotationX: -0.015, rotationY: -0.54, rotationZ: 0.08, scale: 0.98 },
  { t: 0, x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0, scale: 1.24 },
  { t: 1.4, x: -1.25, y: -0.52, z: -1.0, rotationX: -0.015, rotationY: 0.54, rotationZ: -0.08, scale: 0.98 },
  { t: 2.8, x: 1.6, y: -1.1, z: -1.55, rotationX: -0.02, rotationY: -0.72, rotationZ: 0.11, scale: 0.88 }
];

const DEFAULT_CONFIG = {
  path: 's-curve',
  points: DEFAULT_S_CURVE_POINTS,
  softness: 0.72,
  sidePush: 1.55,
  depthPush: 1.45,
  settleStrength: 0.026,
  smoothStrength: 0.09,
  visibleDistance: 2.8,
  scrollScale: 0.0032,
  settlePauseFrames: 16,
  activeScale: 1.24,
  inactiveScaleDrop: 0.3
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function signOrZero(value) {
  return value === 0 ? 0 : Math.sign(value);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function ease(value) {
  return value * value * (3 - 2 * value);
}

function sortedPoints(points) {
  return [...points].sort((a, b) => Number(a.t ?? 0) - Number(b.t ?? 0));
}

function samplePoint(points, distance) {
  if (!points.length) return null;
  if (distance <= points[0].t) return points[0];
  const last = points[points.length - 1];
  if (distance >= last.t) return last;

  for (let index = 0; index < points.length - 1; index += 1) {
    const a = points[index];
    const b = points[index + 1];
    if (distance < a.t || distance > b.t) continue;
    const span = b.t - a.t || 1;
    const amount = ease((distance - a.t) / span);
    return {
      t: distance,
      x: lerp(a.x, b.x, amount),
      y: lerp(a.y, b.y, amount),
      z: lerp(a.z, b.z, amount),
      rotationX: lerp(a.rotationX ?? 0, b.rotationX ?? 0, amount),
      rotationY: lerp(a.rotationY ?? 0, b.rotationY ?? 0, amount),
      rotationZ: lerp(a.rotationZ ?? 0, b.rotationZ ?? 0, amount),
      scale: lerp(a.scale ?? 1, b.scale ?? 1, amount)
    };
  }

  return last;
}

export function createPageRailMovementService({ pageCount = 0, rail = {} } = {}) {
  const config = { ...DEFAULT_CONFIG, ...rail };
  const points = sortedPoints(config.points ?? []);
  const state = {
    pageCount: Math.max(0, Number(pageCount) || 0),
    activeIndex: 0,
    targetIndex: 0,
    smoothIndex: 0,
    settlePauseFramesRemaining: 0,
    frame: 0
  };

  function maxIndex() {
    return Math.max(0, state.pageCount - 1);
  }

  function clampIndex(value) {
    return clamp(Number(value) || 0, 0, maxIndex());
  }

  function touchInput() {
    state.settlePauseFramesRemaining = Math.max(0, Number(config.settlePauseFrames) || 0);
  }

  function focus(index) {
    state.targetIndex = clampIndex(index);
    state.activeIndex = Math.round(state.targetIndex);
    touchInput();
    return snapshot();
  }

  function scroll(delta) {
    state.targetIndex = clampIndex(state.targetIndex + Number(delta || 0) * config.scrollScale);
    state.activeIndex = Math.round(state.targetIndex);
    touchInput();
    return snapshot();
  }

  function step(direction) {
    return focus(Math.round(state.targetIndex + signOrZero(direction)));
  }

  function next() {
    return step(1);
  }

  function previous() {
    return step(-1);
  }

  function descriptorFor(index) {
    const distance = index - state.smoothIndex;
    const focusAmount = Math.exp(-(distance * distance) / config.softness);
    const away = 1 - focusAmount;
    const side = signOrZero(distance);
    const visible = Math.abs(distance) < config.visibleDistance;
    const renderOrder = Math.round(1000 - Math.abs(distance) * 50);
    const point = config.path === 's-curve' ? samplePoint(points, distance) : null;

    return {
      index,
      distance,
      visible,
      focus: focusAmount,
      away,
      side,
      renderOrder,
      railPosition: point ? {
        x: point.x,
        y: point.y,
        z: point.z
      } : {
        x: side * away * config.sidePush,
        y: distance * 0.04,
        z: -away * config.depthPush
      },
      railRotation: point ? {
        x: point.rotationX ?? 0,
        y: point.rotationY ?? 0,
        z: point.rotationZ ?? 0
      } : {
        x: -away * 0.02,
        y: -side * away * 0.58,
        z: side * away * 0.08
      },
      railScale: point ? point.scale : config.activeScale - away * config.inactiveScaleDrop
    };
  }

  function tick() {
    if (state.settlePauseFramesRemaining > 0) {
      state.settlePauseFramesRemaining -= 1;
    } else {
      state.targetIndex = clampIndex(
        state.targetIndex + (Math.round(state.targetIndex) - state.targetIndex) * config.settleStrength
      );
    }

    state.smoothIndex = clampIndex(
      state.smoothIndex + (state.targetIndex - state.smoothIndex) * config.smoothStrength
    );
    state.activeIndex = Math.round(clampIndex(state.smoothIndex));
    state.frame += 1;
    return snapshot();
  }

  function snapshot() {
    return {
      pageCount: state.pageCount,
      activeIndex: state.activeIndex,
      targetIndex: state.targetIndex,
      smoothIndex: state.smoothIndex,
      frame: state.frame,
      rail: {
        path: config.path,
        points
      },
      cards: Array.from({ length: state.pageCount }, (_, index) => descriptorFor(index))
    };
  }

  return Object.freeze({ focus, scroll, step, next, previous, tick, snapshot });
}
