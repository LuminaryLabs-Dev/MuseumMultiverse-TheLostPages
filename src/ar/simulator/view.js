import { paintCharacterMap } from '../runtime/character-map-view.js';

function phaseStep(gameplay) {
  if (['start', 'placement', 'plan', 'replay'].includes(gameplay.phase)) return 0;
  if (['run', 'safeStop'].includes(gameplay.phase) || gameplay.mode === 'recovering') return 1;
  return 2;
}

function progressMarkup(gameplay) {
  const current = phaseStep(gameplay);
  return ['Plan', 'Run', 'Reward']
    .map((label, index) => `
      <li class="${index < current ? 'is-complete' : ''} ${index === current ? 'is-current' : ''}">
        <span>${index < current ? '✓' : index + 1}</span>${label}
      </li>
    `)
    .join('');
}

function planStage(gameplay) {
  if (gameplay.route.kind === 'living-frame') return framePlanStage(gameplay);
  const traced = Math.max(0, gameplay.acceptedPlan.length - 1);
  return `
    <div class="page-player__map" data-player-stage="plan">
      <canvas
        data-character-map-canvas
        width="660"
        height="660"
        aria-label="The Direct route through the Character Map. ${traced} of 5 route points traced."
      ></canvas>
      <div class="page-player__map-key" aria-hidden="true">
        <span><i class="is-traced"></i>Traced</span>
        <span><i class="is-next"></i>Next point</span>
        <span><i></i>Direct route</span>
      </div>
    </div>
  `;
}

function framePlanStage(gameplay) {
  const accepted = new Set(gameplay.acceptedPlan);
  const nextId = gameplay.route.nodes[gameplay.acceptedPlan.length]?.id;
  const ready = gameplay.route.nodes.every((node) => accepted.has(node.id));
  const edges = gameplay.route.nodes.map((node) => `
    <path
      d="${node.edge}"
      fill="none"
      stroke="${accepted.has(node.id) ? '#8fd5c8' : 'rgba(247,239,222,.16)'}"
      stroke-width="${accepted.has(node.id) ? 18 : 10}"
      stroke-linecap="round"
      stroke-linejoin="round"
      ${accepted.has(node.id) ? '' : 'stroke-dasharray="12 14"'}
    />
  `).join('');
  const sockets = gameplay.route.nodes.map((node) => {
    const matched = accepted.has(node.id);
    const next = nextId === node.id;
    const { x, y, width, height } = node.socket;
    return `
      <g data-frame-socket="${node.id}" data-frame-state="${matched ? 'matched' : next ? 'next' : 'waiting'}">
        <rect
          x="${x - width / 2}"
          y="${y - height / 2}"
          width="${width}"
          height="${height}"
          rx="18"
          fill="${matched ? '#2f766f' : next ? '#ffd36b' : '#211d19'}"
          stroke="${matched ? '#ccfff4' : next ? '#25160f' : 'rgba(247,239,222,.34)'}"
          stroke-width="5"
        />
        <text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" fill="${matched ? '#ffffff' : next ? '#25160f' : '#f7efde'}" font-size="22" font-weight="800">${matched ? '✓ ' : ''}${node.label}</text>
      </g>
    `;
  }).join('');

  return `
    <div class="page-player__map" data-player-stage="plan" data-frame-built="${ready}">
      <svg
        viewBox="0 0 660 660"
        role="img"
        aria-label="Living frame route. ${accepted.size} of 3 glyphs matched: Bridge, Step, and Gate."
        style="width:100%;height:100%;min-height:0;justify-self:center;border-radius:8px;background:#101716;box-shadow:0 16px 38px rgba(0,0,0,.38)"
      >
        <rect x="72" y="42" width="516" height="576" rx="34" fill="#24312e" stroke="#7ec6b8" stroke-width="18" />
        <rect x="136" y="106" width="388" height="448" rx="150" fill="#0d1211" stroke="#345a54" stroke-width="12" />
        <ellipse cx="380" cy="300" rx="95" ry="126" fill="${ready ? 'rgba(126,198,184,.28)' : 'rgba(126,198,184,.06)'}" stroke="${ready ? '#ccfff4' : 'rgba(204,255,244,.18)'}" stroke-width="8" />
        ${edges}
        ${sockets}
        <text x="380" y="305" text-anchor="middle" fill="${ready ? '#ccfff4' : 'rgba(247,239,222,.42)'}" font-size="18" font-weight="800">${ready ? 'ROUTE BUILT' : 'PORTAL CLOSED'}</text>
      </svg>
      <div class="page-player__map-key" aria-hidden="true">
        <span><i class="is-traced"></i>Matched</span>
        <span><i class="is-next"></i>Next socket</span>
        <span><i></i>Waiting</span>
      </div>
    </div>
  `;
}

function placementStage(gameplay) {
  const label = gameplay.view.placementLabel.split('\n').join('<br>');
  return `
    <div class="page-player__placement" data-player-stage="placement">
      <div class="page-player__wall">
        <div class="page-player__folded-map"><span>${label}</span></div>
        <i class="page-player__anchor page-player__anchor--one"></i>
        <i class="page-player__anchor page-player__anchor--two"></i>
        <i class="page-player__anchor page-player__anchor--three"></i>
        <i class="page-player__anchor page-player__anchor--four"></i>
      </div>
      <p><strong>Wall found</strong><span>Stable simulated anchor · no camera required</span></p>
    </div>
  `;
}

function runnerStage(gameplay) {
  const runner = gameplay.runner;
  const recovering = gameplay.mode === 'recovering';
  const misses = gameplay.missesByBeat[runner.route.hazardId] ?? 0;
  const builtRoute = gameplay.route.kind === 'living-frame';
  return `
    <div class="page-player__runner ${recovering ? 'is-recovering' : ''}" data-player-stage="runner" data-built-route="${builtRoute}">
      <div class="runner-hud">
        <span data-runner-status>${recovering ? 'Rewinding' : runner.status === 'final-stop' ? `At the ${gameplay.view.goalLabel.toLowerCase()}` : runner.status === 'safe-stop' ? 'Safe at checkpoint' : 'Auto-running'}</span>
        <span>${builtRoute ? 'Built frame 3/3 · ' : ''}Misses <strong>${misses}</strong></span>
      </div>
      <div class="runner-scene" aria-label="${gameplay.view.runnerAria}">
        <div class="runner-sky"><i></i><i></i><i></i></div>
        <div class="runner-route runner-route--back"></div>
        <div class="runner-route runner-route--fill" data-runner-fill></div>
        <div class="runner-checkpoint"><i></i><span>${gameplay.view.checkpointLabel}</span></div>
        <div class="runner-hazard"><i></i><span>${gameplay.view.hazardLabel}</span></div>
        <div class="runner-goal"><i>${gameplay.view.goalSymbol}</i><span>${gameplay.view.goalLabel}</span></div>
        <div class="runner-jr" data-runner-jr><i></i><span>JR</span></div>
      </div>
      <div class="runner-timeline">
        <span>Start</span><span data-runner-progress>${Math.round(runner.progress * 100)}%</span><span>${gameplay.view.goalLabel}</span>
      </div>
    </div>
  `;
}

function rewardStage(gameplay) {
  const receipt = gameplay.completion.receipt;
  return `
    <div class="page-player__reward" data-player-stage="reward">
      <div class="reward-fragment" aria-hidden="true"><i></i><i></i><i></i></div>
      <div>
        <span>Page ${gameplay.pageNumber} complete</span>
        <h2>${gameplay.reward.label}</h2>
        <p><strong>Saved</strong> · Journey slot ${receipt?.slot ?? gameplay.reward.slot} of 8</p>
        <small>Receipt ${receipt?.rewardId ?? gameplay.reward.id}</small>
      </div>
    </div>
  `;
}

function statusStage(gameplay) {
  if (gameplay.phase === 'placement') return placementStage(gameplay);
  if (['plan', 'replay'].includes(gameplay.phase)) return planStage(gameplay);
  if (gameplay.phase === 'reward') return rewardStage(gameplay);
  if (gameplay.phase === 'complete') {
    return `
      <div class="page-player__save-error" data-player-stage="save">
        <span aria-hidden="true">!</span>
        <h2>Finish held safely</h2>
        <p>The reward stays hidden until its receipt is saved.</p>
      </div>
    `;
  }
  return runnerStage(gameplay);
}

function advancedControls(gameplay) {
  const controls = [];
  const initialPlanCount = gameplay.route.kind === 'character-map' ? 1 : 0;
  if (gameplay.phase === 'plan' && gameplay.acceptedPlan.length > initialPlanCount) {
    controls.push(`<button type="button" data-player-command="${gameplay.player.undoCommand}">Undo last step</button>`);
  }
  if (['plan', 'run', 'safeStop'].includes(gameplay.phase) && !gameplay.mode) {
    controls.push('<button type="button" data-player-command="session.pause">Pause</button>');
  }
  if (gameplay.helpAvailable) {
    controls.push('<button type="button" data-player-command="assistance.enable">Show Help</button>');
  }
  if (gameplay.phase === 'reward') {
    controls.push(`<button type="button" data-player-command="replay.prepare">${gameplay.player.replayLabel}</button>`);
  }
  if (gameplay.placementValid && gameplay.phase !== 'complete' && gameplay.mode !== 'recovering') {
    controls.push('<button type="button" data-player-command="route.reset">Reset Route</button>');
  }
  if (!controls.length) return '';
  return `
    <details class="page-player__more">
      <summary>More</summary>
      <div>${controls.join('')}</div>
    </details>
  `;
}

function heroMarkup(gameplay) {
  const hero = gameplay.hero;
  const target = hero.targetId ? ` data-player-target="${hero.targetId}"` : '';
  const command = hero.command ? ` data-player-command="${hero.command}"` : '';
  return `
    <button
      class="page-player__hero page-player__hero--${hero.id}"
      type="button"
      data-player-hero
      ${command}${target}${hero.disabled ? ' disabled' : ''}
    >
      <span>${hero.label}</span>
      ${hero.id === 'jump' ? '<kbd>Space</kbd>' : '<i aria-hidden="true">→</i>'}
    </button>
  `;
}

function shellMarkup(experience, state) {
  const gameplay = state.gameplay;
  const feedback = state.lastResult?.accepted === false
    ? state.lastResult.message
    : gameplay.feedback.message;
  return `
    <main
      class="page-player"
      style="--accent:${experience.accent};--glow:${experience.glow}"
      data-gameplay-phase="${gameplay.phase}"
      data-gameplay-mode="${gameplay.mode ?? 'active'}"
    >
      <header class="page-player__header">
        <div><span>Lost Pages · Player Simulator</span><strong>${gameplay.pageNumber} · ${gameplay.title}</strong></div>
        <span class="page-player__proof">Direct test route</span>
      </header>

      <section class="page-player__layout">
        <div class="page-player__play">
          <div class="page-player__objective">
            <span>${gameplay.objective.eyebrow}</span>
            <h1>${gameplay.objective.text}</h1>
            <p class="page-player__feedback" data-player-feedback aria-live="polite">${feedback}</p>
          </div>
          <div class="page-player__stage">
            ${statusStage(gameplay)}
          </div>
        </div>

        <aside class="page-player__actions" aria-label="Current action">
          <ol class="page-player__progress" aria-label="Plan, Run, Reward progress">
            ${progressMarkup(gameplay)}
          </ol>
          ${heroMarkup(gameplay)}
          <p class="page-player__hint">
            ${gameplay.phase === 'run' ? 'JR moves on their own. Jump is your only control.' : 'One clear action advances the current step.'}
          </p>
          ${advancedControls(gameplay)}
        </aside>
      </section>
    </main>
  `;
}

function paintDirectRoute(root, gameplay) {
  const canvas = root.querySelector('[data-character-map-canvas]');
  if (!canvas) return;
  const context = canvas.getContext('2d');
  if (!context) return;
  const { rows, columns, fullPath, nodes } = gameplay.route;
  const accepted = new Set(gameplay.acceptedPlan);
  const margin = 42;
  const cellWidth = (canvas.width - margin * 2) / columns;
  const cellHeight = (canvas.height - margin * 2) / rows;
  const point = (position) => ({
    x: margin + (position.x + 0.5) * cellWidth,
    y: margin + (position.y + 0.5) * cellHeight
  });
  const acceptedNode = [...nodes].reverse().find((node) => accepted.has(node.id));
  const acceptedPathIndex = acceptedNode?.pathIndex ?? 0;

  function strokePath(path, color, width, dash = []) {
    if (path.length < 2) return;
    context.save();
    context.strokeStyle = color;
    context.lineWidth = width;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.setLineDash(dash);
    context.beginPath();
    path.forEach((position, index) => {
      const next = point(position);
      if (index === 0) context.moveTo(next.x, next.y);
      else context.lineTo(next.x, next.y);
    });
    context.stroke();
    context.restore();
  }

  strokePath(fullPath, 'rgba(255, 244, 196, 0.86)', 14, [9, 12]);
  strokePath(fullPath.slice(0, acceptedPathIndex + 1), '#2f766f', 16);

  nodes.forEach((node, index) => {
    const next = point(node);
    const isAccepted = accepted.has(node.id);
    const isNext = !isAccepted && nodes[gameplay.acceptedPlan.length]?.id === node.id;
    context.save();
    context.fillStyle = isAccepted ? '#2f766f' : isNext ? '#ffd36b' : '#f7efde';
    context.strokeStyle = '#25160f';
    context.lineWidth = isNext ? 6 : 4;
    context.beginPath();
    context.arc(next.x, next.y, isNext ? 18 : 14, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.fillStyle = isAccepted ? '#fff' : '#25160f';
    context.font = '700 18px Space Grotesk, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(index === nodes.length - 1 ? '♥' : String(index + 1), next.x, next.y + 1);
    context.restore();
  });
}

function updateRunner(root, gameplay) {
  const runner = gameplay.runner;
  const progress = Math.max(0, Math.min(100, runner.progress * 100));
  const jr = root.querySelector('[data-runner-jr]');
  const fill = root.querySelector('[data-runner-fill]');
  const progressLabel = root.querySelector('[data-runner-progress]');
  if (jr) {
    jr.style.setProperty('--runner-x', `${7 + progress * 0.86}%`);
    jr.style.setProperty('--runner-y', `${Math.max(0, runner.position.y) * -48}px`);
  }
  if (fill) fill.style.width = `${progress * 0.86}%`;
  if (progressLabel) progressLabel.textContent = `${Math.round(progress)}%`;
}

export function renderArSimulator(root, experience, runtime) {
  let lastViewKey = '';

  function render(state = runtime.snapshot(), { focusHero = false } = {}) {
    root.innerHTML = shellMarkup(experience, state);
    if (state.characterMap) paintCharacterMap(root, state.characterMap);
    paintDirectRoute(root, state.gameplay);
    updateRunner(root, state.gameplay);
    lastViewKey = `${state.gameplay.phase}:${state.gameplay.mode}:${state.gameplay.hero.id}`;
    if (focusHero) root.querySelector('[data-player-hero]:not([disabled])')?.focus({ preventScroll: true });
  }

  function onClick(event) {
    const button = event.target.closest('[data-player-command]');
    if (!button || !root.contains(button)) return;
    runtime.dispatch(button.getAttribute('data-player-command'), {
      targetId: button.getAttribute('data-player-target') || undefined,
      source: event.detail === 0 ? 'keyboard' : 'pointer'
    });
  }

  function onKeyDown(event) {
    if (event.code !== 'Space' || event.repeat) return;
    const gameplay = runtime.snapshot().gameplay;
    if (gameplay.hero.command !== 'jump.press') return;
    if (event.target?.closest?.('[data-player-command="jump.press"]')) return;
    event.preventDefault();
    runtime.dispatch('jump.press', { source: 'keyboard' });
  }

  root.addEventListener('click', onClick);
  globalThis.addEventListener?.('keydown', onKeyDown);
  const unsubscribe = runtime.subscribe((state, update) => {
    const viewKey = `${state.gameplay.phase}:${state.gameplay.mode}:${state.gameplay.hero.id}`;
    const semanticEvent = update?.result?.events?.length > 0;
    if (update?.type === 'command' || viewKey !== lastViewKey || semanticEvent) {
      render(state, { focusHero: update?.type === 'command' || viewKey !== lastViewKey });
    } else {
      updateRunner(root, state.gameplay);
    }
  });

  runtime.registerCleanup?.(() => {
    unsubscribe();
    root.removeEventListener('click', onClick);
    globalThis.removeEventListener?.('keydown', onKeyDown);
  });

  render();
  runtime.start();
}
