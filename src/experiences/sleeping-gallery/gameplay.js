const DIRECTIONS = {
  up: [0, -1],
  right: [1, 0],
  down: [0, 1],
  left: [-1, 0]
};

function key(position) {
  return `${position.x}:${position.y}`;
}

function findPath(map) {
  const cells = new Map(map.cells.map((cell) => [key(cell), cell]));
  const queue = [{ position: map.start, path: [{ ...map.start }] }];
  const visited = new Set([key(map.start)]);
  while (queue.length) {
    const current = queue.shift();
    if (key(current.position) === key(map.goal)) return current.path;
    const cell = cells.get(key(current.position));
    for (const direction of cell?.openings ?? []) {
      const [dx, dy] = DIRECTIONS[direction];
      const position = { x: current.position.x + dx, y: current.position.y + dy };
      if (visited.has(key(position))) continue;
      visited.add(key(position));
      queue.push({ position, path: [...current.path, position] });
    }
  }
  throw new Error('Sleeping Gallery maze has no path to its heart.');
}

function directNodes(path, targetCount = 5) {
  const nodes = [];
  for (let index = 0; index <= targetCount; index += 1) {
    const pathIndex = Math.round((path.length - 1) * (index / targetCount));
    const position = path[pathIndex];
    nodes.push({
      id: index === 0 ? 'direct-start' : index === targetCount ? 'direct-heart' : `direct-${index}`,
      label: index === 0 ? 'Start' : index === targetCount ? 'Heart' : `Point ${index}`,
      order: index,
      pathIndex,
      x: position.x,
      y: position.y
    });
  }
  return nodes;
}

export function createSleepingGalleryGameplayDefinition(map) {
  const path = findPath(map);
  const nodes = directNodes(path);
  const nodeIds = nodes.map((node) => node.id);
  const route = {
    id: 'sleeping-gallery-direct-route',
    rows: map.rows,
    columns: map.columns,
    fullPath: path,
    nodes
  };

  function initialPlan() {
    return [nodeIds[0]];
  }

  function nextNode(acceptedPlan) {
    return nodes[acceptedPlan.length] ?? null;
  }

  function step(acceptedPlan, targetId) {
    const next = nextNode(acceptedPlan);
    if (!nodes.some((node) => node.id === targetId)) return { ok: false, reason: 'invalid_target' };
    if (acceptedPlan.includes(targetId)) return { ok: false, reason: 'already_applied' };
    if (!next || next.id !== targetId) return { ok: false, reason: 'invalid_order' };
    return { ok: true, acceptedPlan: [...acceptedPlan, targetId], node: next };
  }

  function undo(acceptedPlan) {
    if (acceptedPlan.length <= 1) return { ok: false, reason: 'not_eligible' };
    return { ok: true, acceptedPlan: acceptedPlan.slice(0, -1) };
  }

  function isReady(acceptedPlan) {
    return acceptedPlan.length === nodeIds.length
      && acceptedPlan.every((id, index) => id === nodeIds[index]);
  }

  return Object.freeze({
    pageId: 'sleeping-gallery',
    pageNumber: '01',
    title: 'The Character Map',
    reward: Object.freeze({ id: 'gallery-key-fragment', label: 'Gallery Key Fragment', slot: 1 }),
    route: Object.freeze({ ...structuredClone(route), kind: 'character-map' }),
    runnerRoute: Object.freeze({
      id: 'sleeping-gallery-platform-route',
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
    }),
    player: Object.freeze({
      readyMessage: 'The Character Map is ready.',
      startObjective: 'Begin the first Lost Page.',
      placementObjective: 'Confirm the Character Map on the gallery wall.',
      placementReadyMessage: 'Choose the stable wall-map placement.',
      placementConfirmedMessage: 'Map placed. Trace the glowing Direct route.',
      planCommand: 'map.step',
      undoCommand: 'map.undo',
      planInstruction: 'Trace the highlighted Direct route',
      planTotal: 5,
      planUnit: 'points',
      planReadyObjective: 'The Direct route reaches the heart. Lock it.',
      planReadyMessage: 'The Direct route reaches the heart. Lock it.',
      planAcceptedEvent: 'route.node-accepted',
      planUndoneEvent: 'route.node-undone',
      planAcceptedMessage: ' connected.',
      planUndoMessage: 'Last route point removed.',
      planTargetPrefix: 'Trace',
      planFinalTargetId: 'direct-heart',
      planFinalTargetLabel: 'Trace to Heart',
      lockLabel: 'Lock Route',
      routeResetMessage: 'Route cleared. Trace the Direct path again.',
      replayStartMessage: 'Replay ready. Trace the Direct route.',
      runObjective: 'JR runs automatically. Jump the golden crease.',
      runStartedMessage: 'Route locked. JR is running—Jump at the golden crease.',
      runResumeMessage: 'JR is running again. Jump the crease.',
      checkpointObjective: 'JR is safe at the crease approach. Resume when ready.',
      checkpointMessage: 'Checkpoint: crease approach.',
      hazardClearedMessage: 'Crease cleared!',
      missMessage: 'Missed the crease. Rewinding to the checkpoint…',
      recoveryObjective: 'Rewinding JR to the crease approach…',
      recoveryMessage: 'Back at the crease approach. Resume when ready.',
      assistanceMessage: 'Help on: the crease timing is wider.',
      finalCommand: 'reward.claim',
      finalLabel: 'Claim Fragment',
      finalObjective: 'JR reached the heart. Claim the fragment.',
      finalMessage: 'JR reached the heart. Claim the Gallery Key Fragment.',
      finalCheckpointId: 'heart-landing',
      finalBeatId: 'heart',
      rewardObjective: 'Gallery Key Fragment · Journey slot 1 of 8',
      rewardSavedMessage: 'Gallery Key Fragment saved in journey slot 1.',
      continueLabel: 'Continue Journey',
      nextPageId: 'frame-that-breathes',
      continueMessage: 'Page 02 is the next Lost Page.',
      replayLabel: 'Replay Page 01',
      replayPreparedMessage: 'Saved reward preserved. Ready a fresh attempt.',
      saveNoun: 'Gallery Key Fragment',
      rejections: Object.freeze({})
    }),
    view: Object.freeze({
      placementLabel: 'THE\nCHARACTER\nMAP',
      checkpointLabel: 'Checkpoint',
      hazardLabel: 'Jump',
      goalLabel: 'Heart',
      goalSymbol: '♥',
      runnerAria: 'JR auto-runs from left to right toward the heart. Jump the golden crease.'
    }),
    initialPlan,
    nextNode,
    step,
    undo,
    isReady
  });
}
