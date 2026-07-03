const DEFAULT_CONFIG = {
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

export function createPageRailMovementService({ pageCount = 0, rail = {} } = {}) {
  const config = { ...DEFAULT_CONFIG, ...rail };
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

    return {
      index,
      distance,
      visible,
      focus: focusAmount,
      away,
      side,
      renderOrder,
      railPosition: {
        x: side * away * config.sidePush,
        y: distance * 0.04,
        z: -away * config.depthPush
      },
      railRotation: {
        x: -away * 0.02,
        y: -side * away * 0.58,
        z: side * away * 0.08
      },
      railScale: config.activeScale - away * config.inactiveScaleDrop
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
      cards: Array.from({ length: state.pageCount }, (_, index) => descriptorFor(index))
    };
  }

  return Object.freeze({ focus, scroll, step, next, previous, tick, snapshot });
}
