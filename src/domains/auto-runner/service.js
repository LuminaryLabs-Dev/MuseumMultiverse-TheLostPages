const DEFAULT_ROUTE = Object.freeze({
  id: 'route',
  lengthTicks: 240,
  lengthUnits: 10,
  checkpointTick: 42,
  checkpointId: 'crease-approach',
  hazardTick: 105,
  hazardId: 'crease-lesson',
  jumpDurationTicks: 54,
  jumpHeight: 1.2,
  clearance: 0.38,
  recoveryTicks: 60,
  bufferTicks: 9,
  coyoteTicks: 6
});

function copy(value) {
  return value == null ? value : structuredClone(value);
}

function normalizeRoute(route = {}) {
  const next = { ...DEFAULT_ROUTE, ...copy(route) };
  next.lengthTicks = Math.max(2, Math.round(Number(next.lengthTicks)));
  next.lengthUnits = Math.max(1, Number(next.lengthUnits));
  next.checkpointTick = Math.max(0, Math.min(next.lengthTicks - 1, Math.round(Number(next.checkpointTick))));
  next.checkpointId = typeof next.checkpointId === 'string' && next.checkpointId ? next.checkpointId : DEFAULT_ROUTE.checkpointId;
  next.hazardTick = Math.max(next.checkpointTick + 1, Math.min(next.lengthTicks - 1, Math.round(Number(next.hazardTick))));
  next.hazardId = typeof next.hazardId === 'string' && next.hazardId ? next.hazardId : DEFAULT_ROUTE.hazardId;
  next.jumpDurationTicks = Math.max(2, Math.round(Number(next.jumpDurationTicks)));
  next.jumpHeight = Math.max(0.1, Number(next.jumpHeight));
  next.clearance = Math.max(0.05, Number(next.clearance));
  next.recoveryTicks = Math.max(1, Math.round(Number(next.recoveryTicks)));
  next.bufferTicks = Math.max(0, Math.round(Number(next.bufferTicks)));
  next.coyoteTicks = Math.max(0, Math.round(Number(next.coyoteTicks)));
  return Object.freeze(next);
}

function createInitialState(route) {
  return {
    status: 'idle',
    tick: 0,
    position: { x: 0, y: 0, z: 0 },
    grounded: true,
    velocityY: 0,
    jumpStartTick: null,
    bufferedJumpTick: null,
    lastGroundedTick: 0,
    checkpointReached: false,
    failures: 0,
    jumps: 0,
    recoveryTicksRemaining: 0,
    pausedFrom: null,
    assisted: false,
    route
  };
}

function result(state, accepted, reason, events = []) {
  return { accepted, reason, events: copy(events), state: copy(state) };
}

function positionAt(route, tick) {
  return route.lengthUnits * Math.min(1, Math.max(0, tick / route.lengthTicks));
}

function jumpSample(route, tick, jumpStartTick, assisted) {
  if (jumpStartTick == null) return { active: false, y: 0, velocityY: 0 };
  const duration = route.jumpDurationTicks + (assisted ? 12 : 0);
  const elapsed = tick - jumpStartTick;
  if (elapsed < 0 || elapsed >= duration) return { active: false, y: 0, velocityY: 0 };
  const progress = elapsed / duration;
  const y = Math.sin(Math.PI * progress) * route.jumpHeight;
  const velocityY = Math.cos(Math.PI * progress) * route.jumpHeight * Math.PI / duration;
  return { active: true, y, velocityY };
}

export function createAutoRunnerService(config = {}) {
  let state = createInitialState(normalizeRoute(config.route));

  function snapshot() {
    return copy({
      ...state,
      progress: state.route.lengthTicks > 0 ? state.tick / state.route.lengthTicks : 0
    });
  }

  function reset(route = state.route) {
    state = createInitialState(normalizeRoute(route));
    return snapshot();
  }

  function start(route = state.route) {
    if (!['idle', 'safe-stop'].includes(state.status)) {
      return result(state, false, 'wrong_phase');
    }
    if (state.status === 'idle') state = createInitialState(normalizeRoute(route));
    state = { ...state, status: 'running', pausedFrom: null };
    return result(state, true, 'accepted', [{ type: 'run.started', tick: state.tick }]);
  }

  function jump() {
    if (state.status !== 'running') return result(state, false, 'wrong_phase');
    const withinCoyoteWindow = !state.grounded
      && state.jumpStartTick == null
      && state.tick - state.lastGroundedTick <= state.route.coyoteTicks;
    if (!state.grounded && !withinCoyoteWindow) {
      if (state.bufferedJumpTick != null) return result(state, false, 'already_buffered');
      state = { ...state, bufferedJumpTick: state.tick };
      return result(state, true, 'accepted', [{ type: 'jump.buffered', tick: state.tick }]);
    }
    state = {
      ...state,
      grounded: false,
      jumpStartTick: state.tick,
      bufferedJumpTick: null,
      jumps: state.jumps + 1
    };
    return result(state, true, 'accepted', [{
      type: 'jump.started',
      tick: state.tick,
      coyote: withinCoyoteWindow
    }]);
  }

  function stepOnce(events) {
    if (state.status === 'recovering') {
      const remaining = Math.max(0, state.recoveryTicksRemaining - 1);
      state = { ...state, recoveryTicksRemaining: remaining };
      if (remaining === 0) {
        state = {
          ...state,
          status: 'safe-stop',
          tick: state.route.checkpointTick,
          position: { x: positionAt(state.route, state.route.checkpointTick), y: 0, z: 0 },
          grounded: true,
          velocityY: 0,
          jumpStartTick: null,
          bufferedJumpTick: null,
          lastGroundedTick: state.route.checkpointTick
        };
        events.push({ type: 'recovery.complete', tick: state.tick });
      }
      return;
    }

    if (state.status !== 'running') return;

    const nextTick = Math.min(state.route.lengthTicks, state.tick + 1);
    const wasAirborne = !state.grounded && state.jumpStartTick != null;
    let jump = jumpSample(state.route, nextTick, state.jumpStartTick, state.assisted);
    let nextJumpStart = state.jumpStartTick;
    let bufferedJumpTick = state.bufferedJumpTick;
    let jumps = state.jumps;

    if (!jump.active && state.jumpStartTick != null) {
      nextJumpStart = null;
      if (bufferedJumpTick != null && nextTick - bufferedJumpTick <= state.route.bufferTicks) {
        nextJumpStart = nextTick;
        bufferedJumpTick = null;
        jumps += 1;
        jump = jumpSample(state.route, nextTick, nextJumpStart, state.assisted);
        events.push({ type: 'jump.started', tick: nextTick, buffered: true });
      } else if (bufferedJumpTick != null && nextTick - bufferedJumpTick > state.route.bufferTicks) {
        bufferedJumpTick = null;
      }
    }

    state = {
      ...state,
      tick: nextTick,
      position: { x: positionAt(state.route, nextTick), y: jump.y, z: 0 },
      grounded: !jump.active,
      velocityY: jump.velocityY,
      jumpStartTick: nextJumpStart,
      bufferedJumpTick,
      jumps,
      lastGroundedTick: jump.active ? state.lastGroundedTick : nextTick
    };

    if (wasAirborne && !jump.active) {
      events.push({ type: 'landed', tick: nextTick });
    }

    if (!state.checkpointReached && nextTick >= state.route.checkpointTick) {
      state = { ...state, checkpointReached: true };
      events.push({ type: 'checkpoint.reached', id: state.route.checkpointId, tick: nextTick });
    }

    if (nextTick === state.route.hazardTick) {
      const requiredClearance = state.assisted ? state.route.clearance * 0.5 : state.route.clearance;
      if (state.position.y < requiredClearance) {
        state = {
          ...state,
          status: 'recovering',
          grounded: false,
          failures: state.failures + 1,
          recoveryTicksRemaining: state.route.recoveryTicks,
          bufferedJumpTick: null
        };
        events.push({ type: 'run.missed', id: state.route.hazardId, tick: nextTick, failures: state.failures });
        return;
      }
      events.push({ type: 'hazard.cleared', id: state.route.hazardId, tick: nextTick });
    }

    if (nextTick >= state.route.lengthTicks) {
      state = {
        ...state,
        status: 'final-stop',
        grounded: true,
        velocityY: 0,
        jumpStartTick: null,
        bufferedJumpTick: null,
        position: { x: state.route.lengthUnits, y: 0, z: 0 }
      };
      events.push({ type: 'run.final-stop', tick: nextTick });
    }
  }

  function tick(count = 1) {
    const events = [];
    const steps = Math.max(0, Math.min(600, Math.round(Number(count) || 0)));
    for (let index = 0; index < steps; index += 1) stepOnce(events);
    return result(state, true, 'accepted', events);
  }

  function resume() {
    if (state.status !== 'safe-stop') return result(state, false, 'wrong_phase');
    state = { ...state, status: 'running' };
    return result(state, true, 'accepted', [{ type: 'run.resumed', tick: state.tick }]);
  }

  function pause() {
    if (!['running', 'safe-stop'].includes(state.status)) return result(state, false, 'wrong_phase');
    state = { ...state, pausedFrom: state.status, status: 'paused' };
    return result(state, true, 'accepted', [{ type: 'run.paused', tick: state.tick }]);
  }

  function resumePaused() {
    if (state.status !== 'paused' || !state.pausedFrom) return result(state, false, 'wrong_phase');
    const nextStatus = state.pausedFrom;
    state = { ...state, status: nextStatus, pausedFrom: null };
    return result(state, true, 'accepted', [{ type: 'run.pause-resumed', tick: state.tick }]);
  }

  function enableAssistance() {
    state = { ...state, assisted: true };
    return result(state, true, 'accepted', [{ type: 'assistance.enabled', beatId: state.route.hazardId }]);
  }

  function loadSnapshot(next) {
    const candidate = copy(next);
    if (!candidate || typeof candidate !== 'object' || !candidate.route) throw new TypeError('Auto Runner snapshot is invalid.');
    state = { ...candidate, route: normalizeRoute(candidate.route) };
    return snapshot();
  }

  return Object.freeze({
    start,
    jump,
    tick,
    resume,
    pause,
    resumePaused,
    enableAssistance,
    loadSnapshot,
    reset,
    snapshot
  });
}
