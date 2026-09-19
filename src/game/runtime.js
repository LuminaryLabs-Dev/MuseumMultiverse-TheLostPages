import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { withBasePath } from '../app/routes/basePath.js';
import { getGameScene } from './scenes.js';
import './game.css';

const WORLD_LIMIT = 4.4;

function hexColor(value) {
  return new THREE.Color(value || '#d9b777');
}

function addBox(scene, size, position, material) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.set(...position);
  scene.add(mesh);
  return mesh;
}

function makeMaterial(color, roughness = 0.72) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.08 });
}

function buildRoom(scene) {
  const floor = makeMaterial('#3b332b');
  const wall = makeMaterial('#222a28');
  const trim = makeMaterial('#876b45', 0.54);
  addBox(scene, [10, 0.18, 10], [0, -0.1, 0], floor);
  addBox(scene, [10, 4.2, 0.18], [0, 2, -5], wall);
  addBox(scene, [0.18, 4.2, 10], [-5, 2, 0], wall);
  addBox(scene, [0.18, 4.2, 10], [5, 2, 0], wall);
  addBox(scene, [10, 0.12, 10], [0, 4.15, 0], trim);
}

function addExhibit(scene, config, position, imageUrl) {
  const group = new THREE.Group();
  group.position.set(position[0], 1.5, position[1]);
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(1.65, 2.3, 0.16),
    makeMaterial('#936f42', 0.48)
  );
  group.add(frame);
  const artMaterial = new THREE.MeshStandardMaterial({ color: hexColor(config.accent), roughness: 0.65 });
  const art = new THREE.Mesh(
    new THREE.PlaneGeometry(1.35, 1.98),
    artMaterial
  );
  art.position.z = 0.1;
  group.add(art);
  if (imageUrl) {
    new THREE.TextureLoader().load(imageUrl, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;
      artMaterial.map = texture;
      artMaterial.needsUpdate = true;
    });
  }
  const light = new THREE.PointLight(hexColor(config.accent), 1.3, 3.2);
  light.position.set(0, 0.4, 0.8);
  group.add(light);
  group.userData.goal = true;
  group.userData.imageUrl = imageUrl;
  scene.add(group);
  return group;
}

function makePlayer() {
  const player = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.62, 4, 8), makeMaterial('#b64337'));
  body.position.y = 0.55;
  player.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 8), makeMaterial('#d9905f'));
  head.position.y = 1.14;
  player.add(head);
  player.userData.velocity = new THREE.Vector3();
  player.userData.moving = false;
  return player;
}

function pageAsset(sceneId) {
  return withBasePath(getGameScene(sceneId).asset ?? '/assets/mmgdoc/textures/gallery-abstract-pics-1024.png');
}

export function renderGameShell(sceneId) {
  const config = getGameScene(sceneId);
  return `
    <main class="game-shell" data-game-shell data-scene-id="${config.id}" style="--game-accent:${config.accent}">
      <div class="game-shell__viewport" data-game-viewport></div>
      <button class="game-shell__pause-button" type="button" data-game-pause aria-label="Pause">Ⅱ</button>
      <div class="game-shell__pause" data-game-pause-menu hidden>
        <div class="game-shell__pause-card" role="dialog" aria-modal="true" aria-label="Pause menu">
          <button type="button" data-game-resume>Resume</button>
          <button type="button" data-game-restart>Restart</button>
          <a href="${withBasePath(`/?page=${sceneId === 'hub' ? 'page01' : sceneId}`)}">Return to Page</a>
        </div>
      </div>
      <div class="game-shell__complete" data-game-complete hidden>
        <span class="game-shell__complete-fragment" aria-hidden="true"></span>
      </div>
    </main>
  `;
}

export function mountGame(root, sceneId) {
  const shell = root?.querySelector?.('[data-game-shell]');
  const viewport = shell?.querySelector('[data-game-viewport]');
  if (!shell || !viewport) return () => {};

  const config = getGameScene(sceneId);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#111513');
  scene.fog = new THREE.Fog('#111513', 8, 16);
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 30);
  camera.position.set(0, 3.4, 6.6);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  viewport.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight('#fff0d0', '#1a2b31', 1.6));
  const key = new THREE.DirectionalLight('#fff3d5', 2.1);
  key.position.set(-3, 6, 4);
  scene.add(key);
  buildRoom(scene);

  const center = addExhibit(scene, config, [config.goal.x, config.goal.z], pageAsset(sceneId));
  const sideA = addExhibit(scene, { accent: '#725a45' }, [-3.1, -3.25], pageAsset(sceneId));
  const sideB = addExhibit(scene, { accent: '#725a45' }, [3.1, -3.25], pageAsset(sceneId));
  sideA.scale.setScalar(0.72);
  sideB.scale.setScalar(0.72);

  const loader = new GLTFLoader();
  let loadedModel = null;
  loader.load(withBasePath('/assets/mmgdoc/models/center-frame-set.glb'), (gltf) => {
    loadedModel = gltf.scene;
    loadedModel.scale.setScalar(0.75);
    loadedModel.position.set(0, 0, -4.8);
    loadedModel.rotation.y = Math.PI;
    scene.add(loadedModel);
  }, undefined, () => {});

  const player = makePlayer();
  player.position.set(0, 0, 3.7);
  scene.add(player);
  const keys = new Set();
  let paused = false;
  let disposed = false;
  let completed = false;
  let last = performance.now();
  let frame = 0;
  let pointerIntent = null;

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      paused = !paused;
      updatePause();
      return;
    }
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(event.key.toLowerCase())) {
      keys.add(event.key.toLowerCase());
      event.preventDefault();
    }
  };
  const onKeyUp = (event) => keys.delete(event.key.toLowerCase());
  const onPointerDown = (event) => { pointerIntent = { x: event.clientX, y: event.clientY }; };
  const onPointerMove = (event) => { if (pointerIntent) pointerIntent = { ...pointerIntent, x: event.clientX, y: event.clientY }; };
  const onPointerUp = () => { pointerIntent = null; };

  function updatePause() {
    shell.querySelector('[data-game-pause-menu]').hidden = !paused;
  }
  function restart() {
    player.position.set(0, 0, 3.7);
    completed = false;
    shell.querySelector('[data-game-complete]').hidden = true;
    paused = false;
    updatePause();
  }
  function updateSize() {
    const width = viewport.clientWidth || window.innerWidth;
    const height = viewport.clientHeight || window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(1, height);
    camera.updateProjectionMatrix();
  }
  function move(delta) {
    const input = new THREE.Vector3();
    if (keys.has('a') || keys.has('arrowleft')) input.x -= 1;
    if (keys.has('d') || keys.has('arrowright')) input.x += 1;
    if (keys.has('w') || keys.has('arrowup')) input.z -= 1;
    if (keys.has('s') || keys.has('arrowdown')) input.z += 1;
    if (pointerIntent) {
      const rect = viewport.getBoundingClientRect();
      input.x += (pointerIntent.x - (rect.left + rect.width / 2)) / rect.width;
      input.z += (pointerIntent.y - (rect.top + rect.height / 2)) / rect.height;
    }
    if (input.lengthSq() > 1) input.normalize();
    const moving = input.lengthSq() > 0.001;
    player.userData.moving = moving;
    if (moving) {
      player.position.x = THREE.MathUtils.clamp(player.position.x + input.x * delta * 3.1, -WORLD_LIMIT, WORLD_LIMIT);
      player.position.z = THREE.MathUtils.clamp(player.position.z + input.z * delta * 3.1, -WORLD_LIMIT + 0.6, WORLD_LIMIT);
      player.rotation.y = Math.atan2(input.x, input.z);
    }
    const distance = Math.hypot(player.position.x - config.goal.x, player.position.z - config.goal.z);
    if (!completed && distance < 0.8) {
      completed = true;
      shell.querySelector('[data-game-complete]').hidden = false;
    }
  }
  function render(now) {
    if (disposed) return;
    const delta = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!paused) move(delta);
    const target = new THREE.Vector3(player.position.x, 1.2, player.position.z + 2.2);
    camera.position.lerp(new THREE.Vector3(player.position.x, 3.2, player.position.z + 6.2), 0.08);
    camera.lookAt(target);
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  }

  shell.querySelector('[data-game-pause]').addEventListener('click', () => { paused = !paused; updatePause(); });
  shell.querySelector('[data-game-resume]').addEventListener('click', () => { paused = false; updatePause(); });
  shell.querySelector('[data-game-restart]').addEventListener('click', restart);
  window.addEventListener('keydown', onKeyDown, { passive: false });
  window.addEventListener('keyup', onKeyUp);
  viewport.addEventListener('pointerdown', onPointerDown);
  viewport.addEventListener('pointermove', onPointerMove);
  viewport.addEventListener('pointerup', onPointerUp);
  viewport.addEventListener('pointercancel', onPointerUp);
  window.addEventListener('resize', updateSize);
  updateSize();
  frame = requestAnimationFrame(render);

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    window.removeEventListener('resize', updateSize);
    viewport.removeEventListener('pointerdown', onPointerDown);
    viewport.removeEventListener('pointermove', onPointerMove);
    viewport.removeEventListener('pointerup', onPointerUp);
    viewport.removeEventListener('pointercancel', onPointerUp);
    renderer.dispose();
    loadedModel?.traverse?.((node) => {
      node.geometry?.dispose?.();
      if (Array.isArray(node.material)) node.material.forEach((material) => material.dispose?.());
      else node.material?.dispose?.();
    });
    viewport.replaceChildren();
  };
}
