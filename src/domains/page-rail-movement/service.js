const DEFAULT_ANIMATION = {
  id: 'top-down-mouse-spiral',
  description: 'A vertical spiral of pages. Pages descend from the top, rotate around the rail axis, and mouse movement twists the spiral.',
  path: 'spiral',
  radius: 1.05,
  radiusStep: 0.045,
  verticalSpacing: 0.52,
  depthPush: 1.18,
  depthStep: 0.11,
  zOrbit: 0.24,
  rotationStep: 0.92,
  mouseTwist: 0.48,
  mouseLift: 0.12,
  pageTurnAmount: 0.82
};

const DEFAULT_CONFIG = {
  animation: DEFAULT_ANIMATION,
  path: 'spiral',
  softness: 0.72,
  settleStrength: 0.026,
  smoothStrength: 0.09,
  visibleDistance: 4.2,
  scrollScale: 0.0032,
  settlePauseFrames: 16,
  activeScale: 1.24,
  inactiveScaleDrop: 0.24
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function signOrZero(value) {
  return value === 0 ? 0 : Math.sign(value);
}

function createSpiralDescriptor({ index, distance, focus, away, side, renderOrder, visible, animation, mouse }) {
  const angle = -distance * animation.rotationStep + mouse.x * animation.mouseTwist;
  const orbit = Math.sin(angle);
  const radius = animation.radius + Math.abs(distance) * animation.radiusStep;
  const x = orbit * radius;
  const y = -distance * animation.verticalSpacing + mouse.y * animation.mouseLift;
  const z = -away * animation.depthPush - Math.abs(distance) * animation.depthStep + Math.cos(angle) * animation.zOrbit;

  return {
    index,
    distance,
    visible,
    focus,
    away,
    side,
    renderOrder,
    railPosition: { x, y, z },
    railRotation: {
      x: -away * 0.025 + mouse.y * 0.035,
      y: orbit * animation.pageTurnAmount,
      z: orbit * -0.12 + side * away * 0.035
    },
    railScale: 1.24 - away * 0.24
  };
}

export function createPageRailMovementService({ pageCount = 0, rail = {} } = {}) {
  const config = { ...DEFAULT_CONFIG, ...rail };
  const animation = { ...DEFAULT_ANIMATION, ...(config.animation ?? {}) };
  const state = {
    pageCount: Math.max(0, Number(pageCount) || 0),
    activeIndex: 0,
    targetIndex: 0,
    smoothIndex: 0,
    settlePauseFramesRemaining: 0,
    frame: 0,
    mouse: { x: 0, y: 0 }
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

  function pointer(x = 0, y = 0) {
    state.mouse.x = clamp(Number(x) || 0, -1, 1);
    state.mouse.y = clamp(Number(y) || 0, -1, 1);
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
    const focus = Math.exp(-(distance * distance) / config.softness);
    const away = 1 - focus;
    const side = signOrZero(distance);
    const visible = Math.abs(distance) < config.visibleDistance;
    const renderOrder = Math.round(1000 - Math.abs(distance) * 50);

    return createSpiralDescriptor({
      index,
      distance,
      focus,
      away,
      side,
      renderOrder,
      visible,
      animation,
      mouse: state.mouse
    });
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
      mouse: { ...state.mouse },
      rail: {
        path: config.path,
        animation
      },
      cards: Array.from({ length: state.pageCount }, (_, index) => descriptorFor(index))
    };
  }

  return Object.freeze({ focus, scroll, pointer, step, next, previous, tick, snapshot });
}
