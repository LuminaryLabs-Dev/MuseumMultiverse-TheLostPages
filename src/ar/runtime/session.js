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
} from 'nexusrealtime';

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
      .filter(Boolean)
  ];
}

function createExperienceEngine(experience, mode = 'fallback') {
  return createEngine({
    kits: createGenericKits(experience, mode)
  });
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
      renderDescriptors: engine.world.getResource(RenderDescriptorState)
    };
  }

  function render() {
    renderer.render(getState());
  }

  renderer.mount({
    manifest: experience,
    state: getState(),
    onAction(action, dataset) {
      runtime.action(action, dataset);
    }
  });

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
      render();
      onUpdate?.(getState());
      return getState();
    },
    placeOnPlane() {
      engine.ar.placeAnchor({ anchor: { id: `${experience.slug}-anchor` } });
      engine.objectiveFlow?.action('place');
      render();
      onUpdate?.(getState());
      return getState();
    },
    action(action, payload = {}) {
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
    resetExperience() {
      engine.objectiveFlow?.reset();
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
    return launcherRuntime?.getState() ?? {
      support: engine.world.getResource(ARSupportState),
      placement: engine.world.getResource(ARPlacementState),
      experience: engine.world.getResource(ObjectiveFlowState),
      objective: engine.world.getResource(ObjectiveFlowState),
      interactions: engine.world.getResource(InteractionTargetState),
      collectibles: engine.world.getResource(CollectibleState),
      renderDescriptors: engine.world.getResource(RenderDescriptorState)
    };
  }

  function render(nextState = getState()) {
    root.innerHTML = renderExperience({ manifest: experience, state: nextState });
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
  }

  launcherRuntime = await createARLaunchRuntime({
    engine,
    root,
    manifest: experience,
    preferredModes: experience.preferredModes,
    render,
    onUpdate
  });

  return {
    engine,
    getState,
    selectedMode: launcherRuntime.selectedMode,
    async start() {
      const state = await launcherRuntime.start();
      onUpdate?.(state);
      return state;
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
    resetExperience() {
      const state = launcherRuntime.reset();
      onUpdate?.(state);
      return state;
    },
    async stop() {
      await launcherRuntime.stop();
      root.innerHTML = '';
    }
  };
}
