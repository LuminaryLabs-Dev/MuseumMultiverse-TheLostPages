import * as THREE from 'three';
import { pages } from '../../data/pages.js';
import { createLostPageService } from '../../domains/lost-page/service.js';
import { createPageRailMovementService } from '../../domains/page-rail-movement/service.js';
import './portalLanding.css';

const CAMERA_Y = 0.42;
const CAMERA_Z = 4.15;
const CAMERA_LOOK_Y = 0.16;

export function renderStableRailMarkup() {
  return `
    <section class="portal-landing" data-stable-rail aria-label="Museum Multiverse AR comic rail">
      <div class="portal-landing__scene" data-stable-rail-scene aria-hidden="true"></div>
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

export function enhanceStableRail(root, options = {}) {
  const mount = root?.querySelector('[data-stable-rail-scene]');
  if (!mount || typeof window === 'undefined') return () => {};

  const lostPages = options.composition?.n?.lostPages ?? createFallbackLostPageService();
  const paperPageBuilder = options.composition?.n?.paperPageBuilder ?? lostPages.paperPageBuilder ?? lostPages.paperRenderer ?? options.composition?.n?.paperRenderer;
  const paperSkinnedMesh = lostPages.paperSkinnedMesh ?? options.composition?.n?.paperSkinnedMesh;
  const railPages = lostPages.getPages();
  const pageRail = options.composition?.n?.pageRail ?? createPageRailMovementService({ pageCount: railPages.length });

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020307, 0.055);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 80);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.4));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  mount.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0x8a8fff, 0.84));
  const light = new THREE.PointLight(0x9defff, 1.8, 16);
  light.position.set(0, 1.4, 4.2);
  scene.add(light);

  const cards = paperPageBuilder.loadPages(railPages);
  cards.forEach((card) => scene.add(card));
  const hits = cards.map((card) => card.userData.hit);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let hover = null;
  let frame = 0;
  let disposed = false;
  let startY = 0;

  function resize() {
    const w = Math.max(1, mount.clientWidth || window.innerWidth || 1);
    const h = Math.max(1, mount.clientHeight || window.innerHeight || 1);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }

  function wheel(event) {
    event.preventDefault();
    pageRail.scroll(event.deltaY);
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
  }

  function touchEnd(event) {
    const dy = startY - (event.changedTouches?.[0]?.clientY ?? startY);
    if (Math.abs(dy) > 36) pageRail.step(Math.sign(dy));
  }

  function animate() {
    if (disposed) return;
    const railState = pageRail.tick();
    lostPages.focus(railState.activeIndex);
    camera.position.lerp(new THREE.Vector3(0, CAMERA_Y, CAMERA_Z), 0.04);
    camera.lookAt(0, CAMERA_LOOK_Y, 0);
    cards.forEach((card, index) => {
      paperSkinnedMesh.applyCardSkin(card, {
        ...railState.cards[index],
        smoothIndex: railState.smoothIndex,
        hovered: hover === card.userData.hit
      });
    });
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
    renderer.domElement.removeEventListener('touchend', touchEnd);
    scene.traverse((object) => {
      object.geometry?.dispose?.();
      object.material?.map?.dispose?.();
      object.material?.dispose?.();
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
