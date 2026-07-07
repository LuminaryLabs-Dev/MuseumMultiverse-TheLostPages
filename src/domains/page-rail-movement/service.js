const DEFAULT_ANIMATION = {
  id: 'single-page-enchanted-book-turn',
  description: 'A single hero page floats at rest. Scroll expands into a larger-radius book turn where the outgoing page slides outward, flips, and recedes behind the incoming page.',
  path: 'enchanted-book-turn',
  radius: 2.35,
  preScrollRadius: 1.28,
  radiusStep: 0.22,
  horizontalReveal: 1.18,
  incomingOffset: 0.42,
  incomingDepth: 0.78,
  rearDepth: 2.55,
  depthStep: 0.34,
  turnLift: 0.2,
  mouseTwist: 0.11,
  mouseLift: 0.045,
  bobAmplitude: 0.055,
  bobSpeed: 0.048,
  hoverTilt: 0.028,
  pageTurnAmount: 1.18,
  incomingTurn: 0.42,
  activeScale: 1.32,
  rearScaleDrop: 0.22,
  edgeGlowBase: 0.22,
  edgeGlowFocus: 0.58
};

const DEFAULT_CONFIG = {
  animation: DEFAULT_ANIMATION,
  path: 'enchanted-book-turn',
  softness: 0.58,
  settleStrength: 0.035,
  smoothStrength: 0.105,
  visibleDistance: 1.08,
  scrollScale: 0.0032,
  settlePauseFrames: 16,
  activeScale: 1.32,
  inactiveScaleDrop: 0.22
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

function pageTurnProgress(smoothIndex, direction) {
  if (direction === 0) return 0;
  const lower = Math.floor(smoothIndex);
  const fraction = clamp(smoothIndex - lower, 0, 1);
  return direction > 0 ? fraction : 1 - fraction;
}

function midpointFlash(progress, moving) {
  if (!moving) return 0;
  const center = 0.52;
  const width = 0.13;
  const shaped = Math.exp(-Math.pow((progress - center) / width, 2));
  return shaped * smoothstep(0.1, 0.28, progress) * (1 - smoothstep(0.78, 0.96, progress));
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
  moving,
  direction,
  hasInteracted,
  flashIntensity
}) {
  const absDistance = Math.abs(distance);
  const progressAway = clamp(absDistance, 0, 1);
  const isOutgoing = moving && direction !== 0 && distance * direction < -0.001;
  const isIncoming = moving && direction !== 0 && distance * direction > 0.001;
  const bob = Math.sin(frame * animation.bobSpeed + index * 0.82) * animation.bobAmplitude;
  const radius = hasInteracted ? animation.radius : animation.preScrollRadius;

  let x = mouse.x * animation.mouseTwist;
  let y = bob + mouse.y * animation.mouseLift;
  let z = 0;
  let rotationX = Math.sin(frame * animation.bobSpeed * 0.72 + index) * animation.hoverTilt + mouse.y * 0.015;
  let rotationY = mouse.x * 0.045;
  let rotationZ = mouse.x * -0.018;
  let scale = animation.activeScale - away * 0.08;
  let opacity = visible ? 1 : 0;
  let glowIntensity = animation.edgeGlowBase + focus * animation.edgeGlowFocus;
  let shineIntensity = 0.08 + focus * 0.18;
  let shadowIntensity = 0.16 + focus * 0.28;
  let computedRenderOrder = renderOrder;

  if (moving && visible) {
    if (isOutgoing) {
      const t = easeOutCubic(progressAway);
      const arc = Math.sin(t * Math.PI * 0.5);
      x = direction * (animation.horizontalReveal + arc * radius * 0.42);
      y = bob * 0.4 + Math.sin(t * Math.PI) * animation.turnLift;
      z = -animation.rearDepth * t - animation.depthStep * progressAway;
      rotationX = -0.08 * Math.sin(t * Math.PI) + mouse.y * 0.012;
      rotationY = direction * (0.08 + animation.pageTurnAmount * t);
      rotationZ = direction * (-0.12 * t);
      scale = animation.activeScale - animation.rearScaleDrop * t;
      opacity = 1 - 0.28 * smoothstep(0.62, 1, t);
      glowIntensity = 0.34 + flashIntensity * 0.56 + (1 - t) * 0.3;
      shineIntensity = 0.12 + flashIntensity * 0.32 + (1 - t) * 0.12;
      shadowIntensity = 0.2 + (1 - t) * 0.2;
      computedRenderOrder = Math.round(1010 - t * 180);
    } else if (isIncoming) {
      const t = easeOutCubic(1 - progressAway);
      x = -direction * animation.incomingOffset * (1 - t);
      y = bob + Math.sin(t * Math.PI) * animation.turnLift * 0.24;
      z = -animation.incomingDepth * (1 - t);
      rotationX = animation.hoverTilt * (1 - t) + mouse.y * 0.012;
      rotationY = -direction * animation.incomingTurn * (1 - t);
      rotationZ = direction * 0.04 * (1 - t);
      scale = animation.activeScale - 0.1 * (1 - t);
      opacity = 0.32 + t * 0.68;
      glowIntensity = animation.edgeGlowBase + t * animation.edgeGlowFocus + flashIntensity * 0.5;
      shineIntensity = 0.08 + t * 0.18 + flashIntensity * 0.28;
      shadowIntensity = 0.1 + t * 0.28;
      computedRenderOrder = Math.round(940 + t * 120);
    } else if (index === activeIndex) {
      glowIntensity += flashIntensity * 0.42;
      shineIntensity += flashIntensity * 0.2;
    }
  }

  if (!visible) {
    x = side * radius;
    y = 0;
    z = -animation.rearDepth - absDistance * animation.radiusStep;
    rotationX = 0;
    rotationY = side * animation.incomingTurn;
    rotationZ = 0;
    scale = animation.activeScale - animation.rearScaleDrop;
  }

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
    flashIntensity,
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
    const amount = Number(delta || 0) * config.scrollScale;
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
    const progress = pageTurnProgress(state.smoothIndex, direction || state.lastDirection);
    const flashIntensity = midpointFlash(progress, moving && Math.abs(delta) > 0.006);
    return {
      moving,
      direction,
      progress,
      flashIntensity
    };
  }

  function descriptorFor(index, motion = movementState()) {
    const distance = index - state.smoothIndex;
    const focus = Math.exp(-(distance * distance) / config.softness);
    const away = 1 - focus;
    const side = signOrZero(distance);
    const activeIndex = Math.round(clampIndex(state.smoothIndex));
    const visible = motion.moving
      ? Math.abs(distance) <= config.visibleDistance
      : index === activeIndex;
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
