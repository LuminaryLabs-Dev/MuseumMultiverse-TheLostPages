import {
  ARPlacementState,
  ARSupportState,
  CollectibleState,
  InteractionTargetState,
  ObjectiveFlowState,
  RenderDescriptorState,
  createARLaunchRuntime,
  createARKit,
  createARRenderer,
  createCollectibleKit,
  createEngine,
  createGreyboxBuildingKit,
  createInteractionTargetKit,
  createLockAndSocketKit,
  createMicroPlatformerKit,
  createMovingTargetKit,
  createObjectiveFlowKit,
  createRenderDescriptorKit,
  createRevealLightKit,
  createSortingKit,
  createSurfacePlacementKit,
  createSymbolAlignmentKit,
  detectARSupport
} from 'nexusengine';
import { createCharacterMapExperienceKits } from '../../kits/characterMapExperienceKit.js';
import { paintCharacterMap } from './character-map-view.js';

const kitFactories = {
  collectible: (level) => createCollectibleKit({ rewardDataset: level.rewardDataset }),
  'interaction-target': (level) => createInteractionTargetKit({ sceneRecipe: level.sceneRecipe }),
  'lock-and-socket': (level) => createLockAndSocketKit({ sceneRecipe: level.sceneRecipe }),
  'micro-platformer': (level) => createMicroPlatformerKit({ sceneRecipe: level.sceneRecipe }),
  'moving-target': (level) => createMovingTargetKit({ sceneRecipe: level.sceneRecipe }),
  'objective-flow': (level) => createObjectiveFlowKit({ objectiveDataset: level.objectiveDataset }),
  'reveal-light': (level) => createRevealLightKit({ sceneRecipe: level.sceneRecipe }),
  sorting: (level) => createSortingKit({ sceneRecipe: level.sceneRecipe, interactionDataset: level.interactionDataset }),
  'surface-placement': (level) => createSurfacePlacementKit({ placement: level.sceneRecipe?.placement }),
  'symbol-alignment': (level) => createSymbolAlignmentKit({ sceneRecipe: level.sceneRecipe, interactionDataset: level.interactionDataset })
};

function createGenericKits(experience, mode) {
  const level = experience.level ?? {};
  const requested = new Set(level.kits ?? []);
  const characterMapKits = requested.has('character-map-experience')
    ? createCharacterMapExperienceKits(level.characterMap)
    : [];
  requested.delete('character-map-experience');

  return [
    createARKit({ mode }),
    createGreyboxBuildingKit({ buildingDataset: level.buildingDataset }),
    createRenderDescriptorKit({
      buildingDataset: level.buildingDataset,
      sceneRecipe: level.sceneRecipe,
      visualDataset: level.visualDataset
    }),
    ...Array.from(requested)
      .map((id) => kitFactories[id]?.(level))
      .filter(Boolean),
    ...characterMapKits
  ];
}

function createExperienceEngine(experience, mode = 'fallback') {
  return createEngine({
    kits: createGenericKits(experience, mode)
  });
}

export function solveCharacterMap(engine) {
  const state = engine.n?.characterMap?.snapshot?.();
  if (!state || state.goal.completed) return state;
  engine.n.characterMap.completeUnfold();
  const directions = {
    up: [0, -1],
    right: [1, 0],
    down: [0, 1],
    left: [-1, 0]
  };
  const cells = new Map(state.map.cells.map((cell) => [`${cell.x}:${cell.y}`, cell]));
  const queue = [{ position: state.map.start, path: [] }];
  const visited = new Set([`${state.map.start.x}:${state.map.start.y}`]);
  while (queue.length) {
    const current = queue.shift();
    if (current.position.x === state.map.goal.x && current.position.y === state.map.goal.y) {
      current.path.forEach((direction) => engine.n.characterMap.handleSwipe(direction));
      return engine.n.characterMap.snapshot();
    }
    const cell = cells.get(`${current.position.x}:${current.position.y}`);
    for (const direction of cell.openings) {
      const [dx, dy] = directions[direction];
      const position = { x: current.position.x + dx, y: current.position.y + dy };
      const id = `${position.x}:${position.y}`;
      if (visited.has(id)) continue;
      visited.add(id);
      queue.push({ position, path: [...current.path, direction] });
    }
  }
  return engine.n.characterMap.snapshot();
}

export async function createLostPagesRuntime({ root, experience, renderExperience, onUpdate }) {
  const support = await detectARSupport();
  const engine = createExperienceEngine(experience, support.supported ? 'immersive-ar' : 'fallback');

  engine.world.setResource(ARSupportState, {
    checked: true,
    supported: support.supported,
    reason: support.reason
  });

  const renderer = createARRenderer({
    root,
    mode: support.supported ? 'immersive-ar' : 'fallback',
    renderExperience
  });

  function getState() {
    return {
      support,
      placement: engine.world.getResource(ARPlacementState),
      experience: engine.world.getResource(ObjectiveFlowState),
      objective: engine.world.getResource(ObjectiveFlowState),
      interactions: engine.world.getResource(InteractionTargetState),
      collectibles: engine.world.getResource(CollectibleState),
      renderDescriptors: engine.world.getResource(RenderDescriptorState),
      characterMap: engine.n?.characterMap?.snapshot?.()
    };
  }

  function render() {
    renderer.render(getState());
    paintCharacterMap(root, getState().characterMap);
  }

  renderer.mount({
    manifest: experience,
    state: getState(),
    onAction(action, dataset) {
      runtime.action(action, dataset);
    }
  });
  paintCharacterMap(root, getState().characterMap);

  const runtime = {
    engine,
    renderer,
    support,
    getState,
    startSession() {
      if (support.supported) {
        engine.ar.startSession({ mode: 'immersive-ar' });
      } else {
        engine.ar.failSession({ reason: support.reason });
      }
      render();
      onUpdate?.(getState());
      return getState();
    },
    findSurface() {
      engine.ar.detectPlane({ plane: { id: `${experience.slug}-surface`, mode: 'fallback' } });
      engine.n?.characterMap?.detectWall?.({ id: `${experience.slug}-wall`, mode: 'debug' });
      render();
      onUpdate?.(getState());
      return getState();
    },
    placeOnPlane() {
      engine.ar.placeAnchor({ anchor: { id: `${experience.slug}-anchor` } });
      engine.objectiveFlow?.action('place');
      engine.n?.characterMap?.placeMap?.({ id: `${experience.slug}-anchor`, mode: 'debug' });
      render();
      if (engine.n?.characterMap) {
        globalThis.setTimeout(() => {
          engine.n.characterMap.completeUnfold();
          render();
          onUpdate?.(getState());
        }, Number(experience.level?.characterMap?.unfold?.durationMs ?? 900));
      }
      onUpdate?.(getState());
      return getState();
    },
    action(action, payload = {}) {
      if (action === 'solve-maze' && payload.simulated && engine.n?.characterMap) {
        const solved = solveCharacterMap(engine);
        if (solved?.goal.completed) engine.objectiveFlow?.action('solve-maze');
        render();
        onUpdate?.(getState());
        return getState();
      }
      if (action === 'swipe') {
        engine.n?.characterMap?.completeUnfold?.();
        engine.n?.characterMap?.handleSwipe?.(payload.direction);
        if (engine.n?.characterMap?.snapshot?.().goal.completed) {
          engine.objectiveFlow?.action('solve-maze');
        }
        render();
        onUpdate?.(getState());
        return getState();
      }
      engine.ar.tapObject({ action, payload });
      if (engine.interactionTargets) {
        engine.interactionTargets.input(action, payload);
      } else {
        engine.objectiveFlow?.action(action, payload);
      }
      render();
      onUpdate?.(getState());
      return getState();
    },
    solveMaze() {
      const solved = solveCharacterMap(engine);
      if (solved?.goal.completed) engine.objectiveFlow?.action('solve-maze');
      render();
      onUpdate?.(getState());
      return getState();
    },
    resetExperience() {
      engine.objectiveFlow?.reset();
      engine.n?.characterMap?.reset?.();
      render();
      onUpdate?.(getState());
      return getState();
    },
    completeExperience() {
      engine.objectiveFlow?.complete();
      render();
      onUpdate?.(getState());
      return getState();
    }
  };

  return runtime;
}

export async function createLostPagesImmersiveRuntime({ root, experience, renderExperience, onUpdate }) {
  const engine = createExperienceEngine(experience, 'immersive');
  let launcherRuntime = null;

  function getState() {
    const state = launcherRuntime?.getState() ?? {
      support: engine.world.getResource(ARSupportState),
      placement: engine.world.getResource(ARPlacementState),
      experience: engine.world.getResource(ObjectiveFlowState),
      objective: engine.world.getResource(ObjectiveFlowState),
      interactions: engine.world.getResource(InteractionTargetState),
      collectibles: engine.world.getResource(CollectibleState),
      renderDescriptors: engine.world.getResource(RenderDescriptorState)
    };
    return { ...state, characterMap: engine.n?.characterMap?.snapshot?.() };
  }

  function render(nextState = getState()) {
    const augmentedState = { ...nextState, characterMap: engine.n?.characterMap?.snapshot?.() };
    root.innerHTML = renderExperience({ manifest: experience, state: augmentedState });
    paintCharacterMap(root, augmentedState.characterMap);
    root.querySelectorAll('[data-ar-action]').forEach((target) => {
      target.addEventListener('click', () => {
        const action = target.getAttribute('data-ar-action');
        launcherRuntime?.action(action, target.dataset);
      });
    });
    root.querySelectorAll('[data-ar-place]').forEach((target) => {
      target.addEventListener('click', () => {
        launcherRuntime?.place();
      });
    });
    root.querySelectorAll('[data-map-swipe]').forEach((target) => {
      target.addEventListener('click', () => runtime.handleSwipe(target.getAttribute('data-map-swipe')));
    });
    const gestureTarget = root.querySelector('[data-character-map]');
    if (gestureTarget) {
      let start = null;
      gestureTarget.addEventListener('pointerdown', (event) => {
        start = { x: event.clientX, y: event.clientY };
      });
      gestureTarget.addEventListener('pointerup', (event) => {
        if (!start) return;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        start = null;
        if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
        runtime.handleSwipe(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
      });
    }
  }

  launcherRuntime = await createARLaunchRuntime({
    engine,
    root,
    manifest: experience,
    preferredModes: experience.preferredModes,
    render(nextState) {
      render({ ...nextState, characterMap: engine.n?.characterMap?.snapshot?.() });
    },
    onUpdate
  });

  return {
    engine,
    getState,
    selectedMode: launcherRuntime.selectedMode,
    async start() {
      const state = await launcherRuntime.start();
      if (engine.n?.characterMap && state.placement?.status === 'surface-found') {
        engine.n.characterMap.detectWall(state.placement?.plane);
        launcherRuntime.place();
      }
      if (engine.n?.characterMap && launcherRuntime.getState().placement?.status === 'placed') {
        const placedState = launcherRuntime.getState();
        engine.n.characterMap.detectWall(placedState.placement?.plane);
        engine.n.characterMap.placeMap(placedState.placement?.anchor);
        render(placedState);
        globalThis.setTimeout(() => {
          engine.n.characterMap.completeUnfold();
          render(getState());
          onUpdate?.(getState());
        }, Number(experience.level?.characterMap?.unfold?.durationMs ?? 900));
      }
      onUpdate?.(state);
      return getState();
    },
    place() {
      const state = launcherRuntime.place();
      onUpdate?.(state);
      return state;
    },
    action(action, payload = {}) {
      const state = launcherRuntime.action(action, payload);
      onUpdate?.(state);
      return state;
    },
    handleSwipe(direction) {
      engine.n?.characterMap?.handleSwipe?.(direction);
      if (engine.n?.characterMap?.snapshot?.().goal.completed) {
        engine.objectiveFlow?.action('solve-maze');
      }
      render(getState());
      const state = getState();
      onUpdate?.(state);
      return state;
    },
    resetExperience() {
      const state = launcherRuntime.reset();
      engine.n?.characterMap?.reset?.();
      render(state);
      onUpdate?.(state);
      return state;
    },
    async stop() {
      await launcherRuntime.stop();
      root.innerHTML = '';
    }
  };
}
