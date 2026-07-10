const DEFAULT_ANIMATION = {
  id: 'continuous-card-stack',
  description: 'Cards rest in one readable stack. Continuous scroll peels the front card away while the next card glides forward from the deck.',
  path: 'continuous-card-stack',
  stackX: 0.065,
  stackY: 0.05,
  stackDepth: 0.14,
  stackRotation: 0.012,
  peelX: 1.72,
  peelDepth: 1.5,
  peelLift: 0.16,
  peelRotation: 0.82,
  mouseTwist: 0.045,
  mouseLift: 0.025,
  bobAmplitude: 0.018,
  bobSpeed: 0.032,
  hoverTilt: 0.012,
  activeScale: 1.2,
  stackScaleDrop: 0.035,
  edgeGlowBase: 0.16,
  edgeGlowFocus: 0.42
};

const DEFAULT_CONFIG = {
  animation: DEFAULT_ANIMATION,
  path: 'continuous-card-stack',
  softness: 0.42,
  settleStrength: 0.022,
  smoothStrength: 0.082,
  visibleAhead: 3.15,
  visibleBehind: 1.02,
  scrollScale: 0.00155,
  maxScrollStep: 0.2,
  settlePauseFrames: 42
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function signOrZero(value) {
  return value === 0 ? 0 : Math.sign(value);
}

function easeOutCubic(value) {
  const t = clamp(value, 0, 1);
  return 1 - Math.pow(1 - t, 3);
}

function smoothstep(edge0, edge1, value) {
  const t = clamp((value - edge0) / Math.max(edge1 - edge0, 1e-5), 0, 1);
  return t * t * (3 - 2 * t);
}

function createBookTurnDescriptor({
  index,
  activeIndex,
  distance,
  focus,
  away,
  side,
  renderOrder,
  visible,
  animation,
  mouse,
  frame,
  moving
}) {
  const absDistance = Math.abs(distance);
  const peeled = distance < 0;
  const peelProgress = clamp(-distance, 0, 1);
  const stackDistance = Math.max(0, distance);
  const isOutgoing = peeled && peelProgress < 1;
  const isIncoming = !peeled && distance < 1;
  const bob = Math.sin(frame * animation.bobSpeed + index * 0.82) * animation.bobAmplitude;
  const stackRank = Math.min(stackDistance, 4);
  const peel = easeOutCubic(peelProgress);
  const x = peeled
    ? -animation.peelX * peel + mouse.x * animation.mouseTwist * (1 - peel)
    : animation.stackX * stackRank + mouse.x * animation.mouseTwist;
  const y = peeled
    ? bob * (1 - peel) + Math.sin(peel * Math.PI) * animation.peelLift
    : bob - animation.stackY * stackRank + mouse.y * animation.mouseLift;
  const z = peeled ? -animation.peelDepth * peel : -animation.stackDepth * stackRank;
  const rotationX = peeled
    ? -0.04 * Math.sin(peel * Math.PI)
    : Math.sin(frame * animation.bobSpeed * 0.72 + index) * animation.hoverTilt + mouse.y * 0.008;
  const rotationY = peeled ? -animation.peelRotation * peel : mouse.x * 0.018;
  const rotationZ = peeled ? -0.075 * peel : animation.stackRotation * stackRank;
  const scale = peeled
    ? animation.activeScale - 0.1 * peel
    : animation.activeScale - animation.stackScaleDrop * stackRank;
  const opacity = visible ? (peeled ? 1 - smoothstep(0.72, 1, peel) : 1 - stackRank * 0.055) : 0;
  const glowIntensity = animation.edgeGlowBase + focus * animation.edgeGlowFocus;
  const shineIntensity = 0.06 + focus * 0.15;
  const shadowIntensity = 0.18 + focus * 0.22 + stackRank * 0.025;
  const computedRenderOrder = peeled
    ? Math.round(1300 - peel * 80)
    : Math.round(1200 - stackRank * 35);

  return {
    index,
    distance,
    visible,
    focus,
    away,
    side,
    moving,
    outgoing: isOutgoing,
    incoming: isIncoming,
    opacity,
    glowIntensity: clamp(glowIntensity, 0, 1.35),
    shineIntensity: clamp(shineIntensity, 0, 0.72),
    shadowIntensity: clamp(shadowIntensity, 0, 0.62),
    flashIntensity: 0,
    renderOrder: computedRenderOrder,
    railPosition: { x, y, z },
    railRotation: {
      x: rotationX,
      y: rotationY,
      z: rotationZ
    },
    railScale: scale
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
    mouse: { x: 0, y: 0 },
    hasInteracted: false,
    lastDirection: 1
  };

  function maxIndex() {
    return Math.max(0, state.pageCount - 1);
  }

  function clampIndex(value) {
    return clamp(Number(value) || 0, 0, maxIndex());
  }

  function touchInput(direction = 0) {
    state.hasInteracted = true;
    if (direction !== 0) state.lastDirection = signOrZero(direction);
    state.settlePauseFramesRemaining = Math.max(0, Number(config.settlePauseFrames) || 0);
  }

  function focus(index) {
    const nextIndex = clampIndex(index);
    const direction = nextIndex - state.targetIndex;
    state.targetIndex = nextIndex;
    state.activeIndex = Math.round(state.targetIndex);
    touchInput(direction);
    return snapshot();
  }

  function scroll(delta) {
    const rawAmount = Number(delta || 0) * config.scrollScale;
    const amount = clamp(rawAmount, -config.maxScrollStep, config.maxScrollStep);
    state.targetIndex = clampIndex(state.targetIndex + amount);
    state.activeIndex = Math.round(state.targetIndex);
    touchInput(amount);
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

  function movementState() {
    const delta = state.targetIndex - state.smoothIndex;
    const moving = Math.abs(delta) > 0.006 || state.settlePauseFramesRemaining > 0;
    const direction = moving ? (signOrZero(delta) || state.lastDirection) : 0;
    const progress = state.smoothIndex - Math.floor(state.smoothIndex);
    return {
      moving,
      direction,
      progress,
      flashIntensity: 0
    };
  }

  function descriptorFor(index, motion = movementState()) {
    const distance = index - state.smoothIndex;
    const focus = Math.exp(-(distance * distance) / config.softness);
    const away = 1 - focus;
    const side = signOrZero(distance);
    const activeIndex = Math.round(clampIndex(state.smoothIndex));
    const visible = distance > -config.visibleBehind && distance <= config.visibleAhead;
    const renderOrder = Math.round(1000 - Math.abs(distance) * 50);

    return createBookTurnDescriptor({
      index,
      activeIndex,
      distance,
      focus,
      away,
      side,
      renderOrder,
      visible,
      animation,
      mouse: state.mouse,
      frame: state.frame,
      moving: motion.moving,
      direction: motion.direction,
      hasInteracted: state.hasInteracted,
      flashIntensity: motion.flashIntensity
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
    const motion = movementState();
    return {
      pageCount: state.pageCount,
      activeIndex: state.activeIndex,
      targetIndex: state.targetIndex,
      smoothIndex: state.smoothIndex,
      frame: state.frame,
      mouse: { ...state.mouse },
      turn: motion,
      rail: {
        path: config.path,
        animation
      },
      cards: Array.from({ length: state.pageCount }, (_, index) => descriptorFor(index, motion))
    };
  }

  return Object.freeze({ focus, scroll, pointer, step, next, previous, tick, snapshot });
}
