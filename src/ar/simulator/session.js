import { createEngine } from 'nexusengine';
import { createLocalStoragePort } from '../../app/adapters/storagePort.js';
import { createFrameThatBreathesGameplayDefinition } from '../../experiences/frame-that-breathes/gameplay.js';
import { createSleepingGalleryGameplayDefinition } from '../../experiences/sleeping-gallery/gameplay.js';
import { createArSimulatorKit } from '../../kits/arSimulatorKit.js';
import { createAutoRunnerKit } from '../../kits/autoRunnerKit.js';
import { createCharacterMapExperienceKits } from '../../kits/characterMapExperienceKit.js';
import { createJourneyProgressKit } from '../../kits/journeyProgressKit.js';
import { createLostPagesGameplayKit } from '../../kits/lostPagesGameplayKit.js';

function createLostPageSimulatorRuntime(experience, {
  storagePort,
  sessionId,
  seed,
  experienceKits = [],
  gameplayRequires = [],
  pageFactory
} = {}) {
  const engine = createEngine({
    kits: [
      createArSimulatorKit({ seed, width: 6, depth: 7, height: 3.4 }),
      ...experienceKits,
      createAutoRunnerKit(),
      createJourneyProgressKit({ storage: storagePort ?? createLocalStoragePort() }),
      createLostPagesGameplayKit({
        sessionId,
        pageFactory,
        requires: gameplayRequires
      })
    ]
  });

  const listeners = new Set();
  const cleanups = new Set();
  let commandSequence = 0;
  let lastResult = null;
  let frameId = null;
  let previousFrame = null;
  let accumulatedMs = 0;

  function snapshot() {
    return {
      simulator: engine.n.arSimulator.snapshot(),
      characterMap: engine.n.characterMap?.snapshot?.() ?? null,
      gameplay: engine.n.lostPagesGameplay.snapshot(),
      lastResult: lastResult ? structuredClone(lastResult) : null
    };
  }

  function emit(update) {
    const current = snapshot();
    listeners.forEach((listener) => listener(current, update));
    return current;
  }

  function envelope(name, targetId, value, source) {
    const gameplay = engine.n.lostPagesGameplay.snapshot();
    commandSequence += 1;
    return {
      commandId: `${sessionId}:${commandSequence}`,
      sessionId,
      pageId: gameplay.pageId,
      name,
      targetId,
      value,
      expectedRevision: gameplay.revision,
      issuedAtTick: gameplay.runner.tick,
      source
    };
  }

  function dispatch(name, { targetId, value, source = 'simulator' } = {}) {
    lastResult = engine.n.lostPagesGameplay.dispatch(envelope(name, targetId, value, source));
    if (lastResult.accepted && name === 'placement.confirm') {
      const simulator = engine.n.arSimulator.detectWall();
      engine.n.characterMap?.detectWall?.(simulator.room.wall);
      const placed = engine.n.arSimulator.placeMap();
      if (placed.mapPlaced) engine.n.characterMap?.placeMap?.(placed.room.anchor);
      engine.n.characterMap?.completeUnfold?.();
    }
    return emit({ type: 'command', name, result: lastResult });
  }

  function tick(count = 1) {
    const result = engine.n.lostPagesGameplay.tick(count);
    if (result.events.length) lastResult = result;
    return emit({ type: 'tick', result });
  }

  function frame(time) {
    if (previousFrame == null) previousFrame = time;
    const elapsed = Math.min(100, Math.max(0, time - previousFrame));
    previousFrame = time;
    const gameplay = engine.n.lostPagesGameplay.snapshot();
    if (gameplay.phase === 'run' || gameplay.mode === 'recovering') {
      accumulatedMs += elapsed;
      const stepMs = 1000 / 60;
      const steps = Math.min(6, Math.floor(accumulatedMs / stepMs));
      if (steps > 0) {
        accumulatedMs -= steps * stepMs;
        tick(steps);
      }
    } else {
      accumulatedMs = 0;
    }
    frameId = globalThis.requestAnimationFrame(frame);
  }

  function start() {
    if (frameId != null || typeof globalThis.requestAnimationFrame !== 'function') return;
    previousFrame = null;
    frameId = globalThis.requestAnimationFrame(frame);
  }

  function stop() {
    if (frameId != null && typeof globalThis.cancelAnimationFrame === 'function') {
      globalThis.cancelAnimationFrame(frameId);
    }
    frameId = null;
    previousFrame = null;
    listeners.clear();
    cleanups.forEach((cleanup) => cleanup());
    cleanups.clear();
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function registerCleanup(cleanup) {
    cleanups.add(cleanup);
    return () => cleanups.delete(cleanup);
  }

  function loadSnapshot(next) {
    const loaded = engine.n.lostPagesGameplay.loadSnapshot(next.gameplay ?? next);
    const loadedSequence = loaded.appliedCommandIds.reduce((highest, commandId) => {
      const suffix = Number(String(commandId).split(':').pop());
      return Number.isInteger(suffix) ? Math.max(highest, suffix) : highest;
    }, commandSequence);
    commandSequence = loadedSequence;
    lastResult = null;
    return emit({ type: 'snapshot.loaded' });
  }

  const runtime = Object.freeze({
    engine,
    snapshot,
    dispatch,
    tick,
    start,
    stop,
    subscribe,
    registerCleanup,
    loadSnapshot
  });

  dispatch('session.start');
  return runtime;
}

export function createPage01SimulatorRuntime(experience, { storagePort } = {}) {
  return createLostPageSimulatorRuntime(experience, {
    storagePort,
    sessionId: 'page-01-simulator-session',
    seed: 101,
    experienceKits: createCharacterMapExperienceKits(experience.level.characterMap),
    gameplayRequires: ['n:canvas-maze-map'],
    pageFactory: ({ engine }) => createSleepingGalleryGameplayDefinition(engine.n.canvasMazeMap.snapshot())
  });
}

export function createPage02SimulatorRuntime(experience, { storagePort } = {}) {
  return createLostPageSimulatorRuntime(experience, {
    storagePort,
    sessionId: 'page-02-simulator-session',
    seed: 202,
    pageFactory: () => createFrameThatBreathesGameplayDefinition()
  });
}
