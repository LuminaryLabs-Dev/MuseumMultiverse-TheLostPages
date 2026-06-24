export function renderExperienceStage({ manifest, state }) {
  const objective = state.objective ?? state.experience ?? state;
  const step = objective.steps?.[objective.currentStepIndex] ?? objective.steps?.[0];
  const label = objective.completed ? 'Complete' : (step?.label ?? 'Complete');
  const instruction = objective.completed ? manifest.completeText : (step?.instruction ?? manifest.completeText);
  const progress = step ? `${step.progress}/${step.target}` : '0/0';
  const descriptors = state.renderDescriptors ?? {
    building: manifest.level?.buildingDataset,
    scene: manifest.level?.sceneRecipe,
    objects: manifest.level?.sceneRecipe?.objects ?? [],
    palette: manifest.level?.visualDataset?.palette ?? {}
  };
  const room = descriptors.rooms?.[0] ?? descriptors.building?.rooms?.[0];
  const objects = descriptors.objects ?? [];

  return `
    <div class="stage-stage" style="--accent:${manifest.accent};--deep:${manifest.deep};--glow:${manifest.glow}" data-status="${objective.status}">
      <div class="stage-stage__room" style="--floor:${room?.floor?.color ?? '#333'};--walls:${room?.walls?.color ?? '#555'}">
        <div class="stage-stage__back-wall"></div>
        <div class="stage-stage__floor"></div>
        <div class="stage-stage__objects">
          ${objects.map((object, index) => renderDescriptorObject(object, index, step)).join('')}
        </div>
      </div>
      <div class="stage-stage__label">${objective.status}</div>
      <div class="stage-stage__step">
        <strong>${label}</strong>
        <span>${instruction}</span>
        <small>${progress}</small>
      </div>
    </div>
  `;
}

function renderDescriptorObject(object, index, step) {
  const action = object.interaction?.action ?? step?.requiredAction ?? 'tap';
  const transform = object.transform ?? {};
  const x = Math.max(8, Math.min(92, 50 + Number(transform.x ?? 0) * 18));
  const y = Math.max(10, Math.min(88, 52 - Number(transform.y ?? 0) * 18 + Number(transform.z ?? 0) * 9));
  const isActive = action === step?.requiredAction;

  return `
    <button
      class="stage-object stage-object--${object.visual?.shape ?? object.archetype ?? 'object'} ${isActive ? 'is-active' : ''}"
      data-ar-action="${action}"
      data-target-id="${object.id}"
      style="--x:${x}%;--y:${y}%;--color:${object.visual?.color ?? 'var(--accent)'};--object-glow:${object.visual?.glow ?? 'var(--glow)'};--delay:${index * 55}ms"
      aria-label="${object.id}"
    >
      <span>${object.visual?.shape ?? object.group ?? object.id}</span>
    </button>
  `;
}
