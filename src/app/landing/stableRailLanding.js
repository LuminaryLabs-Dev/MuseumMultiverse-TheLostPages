import * as THREE from 'three';
import { pages } from '../../data/pages.js';
import { createLostPageService } from '../../domains/lost-page/service.js';
import { createPageRailMovementService } from '../../domains/page-rail-movement/service.js';
import './portalLanding.css';

const CAMERA_Y = 0.42;
const CAMERA_Z = 4.15;
const CAMERA_LOOK_X = -0.24;
const CAMERA_LOOK_Y = 0.16;

export function renderStableRailMarkup() {
  return `
    <section class="portal-landing" data-stable-rail aria-label="Museum Multiverse AR comic rail">
      <div class="portal-landing__scene" data-stable-rail-scene aria-hidden="true"></div>
      <div class="portal-landing__turn-flash" data-stable-rail-flash aria-hidden="true"></div>
      <div class="portal-landing__shade" aria-hidden="true"></div>
      <header class="portal-landing__title" aria-label="Museum Multiverse"><span>Museum Multiverse</span><small>The Lost Chapters</small></header>
    </section>
  `;
}

function createFallbackLostPageService() {
  return createLostPageService({
    pages,
    paper: {
      skin: 'lost-pages-stable-rail'
    }
  });
}

function openCardUrl(url) {
  if (url) window.location.assign(url);
}

function addEdgeGlow(card, page) {
  if (!card?.userData?.face || card.userData.edgeGlow) return;
  const faceDescriptor = card.userData.face.geometry?.userData?.planeMeshCreator ?? {};
  const width = Number(faceDescriptor.width) || 1.95;
  const height = Number(faceDescriptor.height) || 2.72;
  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(width, 0, 0),
    new THREE.Vector3(width, height, 0),
    new THREE.Vector3(0, height, 0),
    new THREE.Vector3(0, 0, 0)
  ]);
  const edgeGlow = new THREE.Line(
    geometry,
    new THREE.LineBasicMaterial({
      color: page?.glow || 0xfff2bd,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
  );
  edgeGlow.position.copy(card.userData.face.position);
  edgeGlow.position.z += 0.055;
  card.userData.visual?.add(edgeGlow);
  card.userData.edgeGlow = edgeGlow;
}

function upgradeLowResolutionComicTexture(card) {
  const face = card?.userData?.face;
  const material = face?.material;
  const texture = material?.map;
  const image = texture?.image;

  if (!face || !material || !texture || !image || card.userData.hiResComicTexture) return;

  const applyUpgrade = () => {
    const sourceWidth = image.naturalWidth || image.videoWidth || image.width || 0;
    const sourceHeight = image.naturalHeight || image.videoHeight || image.height || 0;
    if (!sourceWidth || !sourceHeight || sourceWidth >= 720) return;

    const targetWidth = 768;
    const targetHeight = Math.round(targetWidth * (sourceHeight / sourceWidth));
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.filter = 'contrast(1.13) saturate(1.08)';
    ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
    ctx.filter = 'none';

    const upgradedTexture = new THREE.CanvasTexture(canvas);
    upgradedTexture.colorSpace = THREE.SRGBColorSpace;
    upgradedTexture.minFilter = THREE.LinearFilter;
    upgradedTexture.magFilter = THREE.LinearFilter;
    upgradedTexture.generateMipmaps = false;
    upgradedTexture.anisotropy = 8;
    material.map = upgradedTexture;
    material.needsUpdate = true;
    card.userData.hiResComicTexture = upgradedTexture;
  };

  if (image.complete || image.width || image.naturalWidth) {
    applyUpgrade();
  } else if (typeof image.addEventListener === 'function') {
    image.addEventListener('load', applyUpgrade, { once: true });
  }
}

export function enhanceStableRail(root, options = {}) {
  const mount = root?.querySelector('[data-stable-rail-scene]');
  const flashLayer = root?.querySelector('[data-stable-rail-flash]');
  if (!mount || typeof window === 'undefined') return () => {};

  const lostPages = options.composition?.n?.lostPages ?? createFallbackLostPageService();
  const paperPageBuilder = options.composition?.n?.paperPageBuilder ?? lostPages.paperPageBuilder ?? lostPages.paperRenderer ?? options.composition?.n?.paperRenderer;
  const paperSkinnedMesh = lostPages.paperSkinnedMesh ?? options.composition?.n?.paperSkinnedMesh;
  const railPages = lostPages.getPages();
  const pageRail = options.composition?.n?.pageRail ?? createPageRailMovementService({ pageCount: railPages.length });

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020307, 0.052);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 80);
  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  mount.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0x8a8fff, 0.74));
  const light = new THREE.PointLight(0x9defff, 1.65, 16);
  light.position.set(0, 1.4, 4.2);
  scene.add(light);

  const flashLight = new THREE.PointLight(0xfff1b8, 0, 9);
  flashLight.position.set(0.8, 0.72, 2.45);
  scene.add(flashLight);

  const cards = paperPageBuilder.loadPages(railPages);
  let disposed = false;
  const textureUpgradeTimers = [];
  const scheduledTextureUpgrades = new Set();
  cards.forEach((card, index) => {
    addEdgeGlow(card, railPages[index]);
    scene.add(card);
  });

  function scheduleTextureUpgrade(index) {
    const card = cards[index];
    if (!card || scheduledTextureUpgrades.has(index) || card.userData.hiResComicTexture) return;
    scheduledTextureUpgrades.add(index);
    const runUpgrade = () => {
      if (!disposed) upgradeLowResolutionComicTexture(card);
    };
    if (typeof window.requestIdleCallback === 'function') {
      textureUpgradeTimers.push({ type: 'idle', id: window.requestIdleCallback(runUpgrade, { timeout: 900 }) });
    } else {
      textureUpgradeTimers.push({ type: 'timeout', id: window.setTimeout(runUpgrade, 180) });
    }
  }

  scheduleTextureUpgrade(0);
  scheduleTextureUpgrade(1);
  const hits = cards.map((card) => card.userData.hit);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let hover = null;
  let frame = 0;
  let startY = 0;
  let lastTouchY = 0;
  let targetCameraY = CAMERA_Y;
  let targetCameraZ = CAMERA_Z;
  const cameraTarget = new THREE.Vector3(0, CAMERA_Y, CAMERA_Z);
  let lastFocusedIndex = -1;
  let lastFrameAt = performance.now();
  let telemetryStartedAt = lastFrameAt;
  let telemetryWarmed = false;
  let renderedFrames = 0;
  let droppedFrames = 0;
  let activeFrameTimeMs = 0;

  function resize() {
    const w = Math.max(1, mount.clientWidth || window.innerWidth || 1);
    const h = Math.max(1, mount.clientHeight || window.innerHeight || 1);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    const compact = w < 680;
    targetCameraY = compact ? 0.34 : CAMERA_Y;
    targetCameraZ = compact ? 5.9 : CAMERA_Z;
  }

  function wheel(event) {
    event.preventDefault();
    const modeScale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
    pageRail.scroll(event.deltaY * modeScale);
  }

  function key(event) {
    if (event.key === 'ArrowDown' || event.key === 'PageDown') pageRail.next();
    if (event.key === 'ArrowUp' || event.key === 'PageUp') pageRail.previous();
    if (event.key === 'Enter' || event.key === ' ') {
      openCardUrl(cards[pageRail.snapshot().activeIndex]?.userData?.url);
    }
  }

  function move(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    pageRail.pointer?.(pointer.x, pointer.y);
    raycaster.setFromCamera(pointer, camera);
    hover = raycaster.intersectObjects(hits, false)[0]?.object ?? null;
    renderer.domElement.style.cursor = hover ? 'pointer' : 'default';
  }

  function click() {
    openCardUrl(hover?.userData?.url);
  }

  function touchStart(event) {
    startY = event.touches?.[0]?.clientY ?? 0;
    lastTouchY = startY;
  }

  function touchMove(event) {
    const nextY = event.touches?.[0]?.clientY ?? lastTouchY;
    const delta = lastTouchY - nextY;
    lastTouchY = nextY;
    if (Math.abs(delta) > 0.5) pageRail.scroll(delta * 1.25);
  }

  function touchEnd(event) {
    const dy = startY - (event.changedTouches?.[0]?.clientY ?? startY);
    if (Math.abs(dy) < 8) return;
    lastTouchY = 0;
  }

  function animate() {
    if (disposed) return;
    const frameAt = performance.now();
    const frameDelta = frameAt - lastFrameAt;
    if (renderedFrames > 0 && frameDelta <= 250) {
      activeFrameTimeMs += frameDelta;
      if (frameDelta > 25) droppedFrames += Math.max(0, Math.round(frameDelta / (1000 / 60)) - 1);
    }
    lastFrameAt = frameAt;
    renderedFrames += 1;
    if (!telemetryWarmed && renderedFrames >= 120) {
      telemetryWarmed = true;
      telemetryStartedAt = frameAt;
      renderedFrames = 1;
      droppedFrames = 0;
      activeFrameTimeMs = 0;
    }
    const railState = pageRail.tick();
    const flash = Math.max(0, Math.min(1, railState.turn?.flashIntensity ?? 0));
    if (railState.activeIndex !== lastFocusedIndex) {
      lostPages.focus(railState.activeIndex);
      lastFocusedIndex = railState.activeIndex;
      scheduleTextureUpgrade(railState.activeIndex);
      scheduleTextureUpgrade(railState.activeIndex + 1);
    }
    cameraTarget.set(0, targetCameraY, targetCameraZ);
    camera.position.lerp(cameraTarget, 0.04);
    camera.lookAt(CAMERA_LOOK_X, CAMERA_LOOK_Y, 0);
    light.intensity = 1.65 + flash * 0.55;
    flashLight.intensity = flash * 3.2;
    if (flashLayer) {
      flashLayer.style.opacity = String(Math.min(0.34, flash * 0.32));
    }
    cards.forEach((card, index) => {
      paperSkinnedMesh.applyCardSkin(card, {
        ...railState.cards[index],
        smoothIndex: railState.smoothIndex,
        hovered: hover === card.userData.hit
      });
    });
    const visibleCards = railState.cards.filter((card) => card.visible);
    const outgoingCards = visibleCards.filter((card) => card.outgoing);
    const stackedCards = visibleCards.filter((card) => !card.outgoing);
    const frontStackZ = stackedCards.length
      ? Math.max(...stackedCards.map((card) => card.railPosition.z))
      : 0;
    const elapsedSeconds = Math.max(0.001, activeFrameTimeMs / 1000);
    const measuredFps = activeFrameTimeMs >= 250
      ? Math.round(Math.max(0, renderedFrames - 1) / elapsedSeconds)
      : 0;
    globalThis.__NEXUS_TEST_STATE__ = {
      ...(globalThis.__NEXUS_TEST_STATE__ ?? {}),
      frame: renderedFrames,
      rail: {
        activeIndex: railState.activeIndex,
        smoothIndex: railState.smoothIndex,
        visibleCount: visibleCards.length,
        renderVisibleCount: visibleCards.filter((card) => card.opacity > 0.01).length,
        outgoingCount: outgoingCards.length,
        outgoingClear: outgoingCards.every((card) => card.railPosition.x > 0 && card.railPosition.z - frontStackZ >= 0.12),
        cards: railState.cards
      },
      recording: {
        ...(globalThis.__NEXUS_TEST_STATE__?.recording ?? {}),
        smoothness: {
          renderedFrames,
          measuredFps,
          droppedFrames
        }
      }
    };
    renderer.render(scene, camera);
    frame = window.requestAnimationFrame(animate);
  }

  resize();
  camera.position.set(0, CAMERA_Y, CAMERA_Z);
  animate();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('keydown', key);
  window.addEventListener('wheel', wheel, { passive: false });
  renderer.domElement.addEventListener('pointermove', move, { passive: true });
  renderer.domElement.addEventListener('click', click);
  renderer.domElement.addEventListener('touchstart', touchStart, { passive: true });
  renderer.domElement.addEventListener('touchmove', touchMove, { passive: true });
  renderer.domElement.addEventListener('touchend', touchEnd, { passive: true });

  return () => {
    disposed = true;
    if (frame) window.cancelAnimationFrame(frame);
    window.removeEventListener('resize', resize);
    window.removeEventListener('keydown', key);
    window.removeEventListener('wheel', wheel);
    renderer.domElement.removeEventListener('pointermove', move);
    renderer.domElement.removeEventListener('click', click);
    renderer.domElement.removeEventListener('touchstart', touchStart);
    renderer.domElement.removeEventListener('touchmove', touchMove);
    renderer.domElement.removeEventListener('touchend', touchEnd);
    textureUpgradeTimers.forEach((timer) => {
      if (timer.type === 'idle') window.cancelIdleCallback?.(timer.id);
      else window.clearTimeout(timer.id);
    });
    scene.traverse((object) => {
      object.geometry?.dispose?.();
      object.material?.map?.dispose?.();
      object.material?.dispose?.();
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
