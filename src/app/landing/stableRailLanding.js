import * as THREE from 'three';
import { pages } from '../../data/pages.js';
import { withBasePath } from '../routes/basePath.js';
import './portalLanding.css';

const SOFTNESS = 0.72;
const CAMERA_Z = 4.15;
const SIDE_PUSH = 1.55;
const DEPTH_PUSH = 1.45;
const textureCache = new Map();

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function renderStableRailMarkup() {
  return `
    <section class="portal-landing" data-stable-rail aria-label="Museum Multiverse AR comic rail">
      <div class="portal-landing__scene" data-stable-rail-scene aria-hidden="true"></div>
      <div class="portal-landing__shade" aria-hidden="true"></div>
      <header class="portal-landing__title" aria-label="Museum Multiverse"><span>Museum Multiverse</span><small>The Lost Chapters</small></header>
    </section>
  `;
}

function drawWrapped(ctx, text, x, y, width, lineHeight, maxLines) {
  const words = String(text || '').split(' ');
  let line = '';
  let row = 0;
  words.forEach((word) => {
    if (row >= maxLines) return;
    const next = `${line} ${word}`.trim();
    if (ctx.measureText(next).width > width && line) {
      ctx.fillText(line, x, y + row * lineHeight);
      line = word;
      row += 1;
    } else {
      line = next;
    }
  });
  if (line && row < maxLines) ctx.fillText(line, x, y + row * lineHeight);
}

function textureFor(page) {
  if (textureCache.has(page.slug)) return textureCache.get(page.slug);
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 1088;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#08070a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const gloss = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gloss.addColorStop(0, 'rgba(255,255,255,.18)');
  gloss.addColorStop(.35, 'rgba(255,255,255,.025)');
  gloss.addColorStop(1, 'rgba(0,0,0,.5)');
  ctx.fillStyle = gloss;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,.04)';
  for (let y = 38; y < canvas.height; y += 8) ctx.fillRect(0, y, canvas.width, 1);
  ctx.strokeStyle = '#f7efde';
  ctx.lineWidth = 18;
  ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);
  ctx.lineWidth = 4;
  ctx.strokeRect(62, 62, canvas.width - 124, canvas.height - 124);
  ctx.fillStyle = '#f7efde';
  ctx.font = '900 30px Arial Black, Impact, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`PAGE ${page.number}`, 84, 110);
  ctx.textAlign = 'right';
  ctx.fillText((page.collectible || 'AR').slice(0, 26), canvas.width - 84, 110);
  ctx.textAlign = 'left';
  ctx.font = '900 96px Georgia, serif';
  drawWrapped(ctx, page.title, 84, 242, canvas.width - 168, 86, 4);
  ctx.fillStyle = page.accent || '#56dfff';
  ctx.fillRect(88, 520, canvas.width - 176, 178);
  ctx.fillStyle = 'rgba(0,0,0,.32)';
  ctx.fillRect(118, 552, canvas.width - 236, 22);
  ctx.fillRect(118, 596, canvas.width - 292, 22);
  ctx.fillRect(118, 640, canvas.width - 332, 22);
  ctx.fillStyle = '#f7efde';
  ctx.font = '800 34px Arial, sans-serif';
  drawWrapped(ctx, page.prompt || page.description, 92, 760, canvas.width - 184, 43, 3);
  ctx.fillStyle = page.glow || '#fff2bd';
  ctx.fillRect(canvas.width - 236, canvas.height - 232, 156, 150);
  ctx.strokeStyle = '#f7efde';
  ctx.lineWidth = 7;
  ctx.strokeRect(canvas.width - 236, canvas.height - 232, 156, 150);
  ctx.fillStyle = '#100b07';
  ctx.font = '900 28px Arial Black, Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('LAUNCH', canvas.width - 158, canvas.height - 150);
  ctx.fillText('AR', canvas.width - 158, canvas.height - 112);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 2;
  textureCache.set(page.slug, texture);
  return texture;
}

function makeCard(page, index) {
  const group = new THREE.Group();
  group.userData.index = index;
  group.userData.url = withBasePath(`/ar/${page.slug}`);
  const side = new THREE.Mesh(new THREE.BoxGeometry(2.12, 2.9, 0.16), new THREE.MeshStandardMaterial({ color: 0x30251d, roughness: .68, metalness: .04 }));
  side.position.z = -0.1;
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(2.42, 3.14), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: .2, depthWrite: false }));
  shadow.position.set(.18, -.2, -.22);
  const face = new THREE.Mesh(new THREE.PlaneGeometry(1.95, 2.72, 12, 16), new THREE.MeshStandardMaterial({ map: textureFor(page), roughness: .48, metalness: .02 }));
  face.position.z = .02;
  const shine = new THREE.Mesh(new THREE.PlaneGeometry(1.95, 2.72), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .1, depthWrite: false }));
  shine.position.z = .045;
  const hit = new THREE.Mesh(new THREE.PlaneGeometry(2.25, 3.05), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .001, depthWrite: false }));
  hit.position.z = .08;
  hit.userData.url = group.userData.url;
  group.add(side, shadow, face, shine, hit);
  group.userData.hit = hit;
  group.userData.shine = shine;
  group.userData.shadow = shadow;
  group.userData.side = side;
  return group;
}

export function enhanceStableRail(root) {
  const mount = root?.querySelector('[data-stable-rail-scene]');
  if (!mount || typeof window === 'undefined') return () => {};
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020307, 0.055);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 80);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.4));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  mount.appendChild(renderer.domElement);
  scene.add(new THREE.AmbientLight(0x8a8fff, .84));
  const light = new THREE.PointLight(0x9defff, 1.8, 16);
  light.position.set(0, 1.4, 4.2);
  scene.add(light);
  const cards = pages.map((page, index) => makeCard(page, index));
  cards.forEach((card) => scene.add(card));
  const hits = cards.map((card) => card.userData.hit);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let target = 0;
  let smooth = 0;
  let hover = null;
  let frame = 0;
  let disposed = false;
  let startY = 0;
  let lastInput = 0;
  function resize() {
    const w = Math.max(1, mount.clientWidth || window.innerWidth || 1);
    const h = Math.max(1, mount.clientHeight || window.innerHeight || 1);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  function jump(value) { target = clamp(value, 0, pages.length - 1); }
  function wheel(event) { event.preventDefault(); lastInput = performance.now(); jump(target + event.deltaY * .0032); }
  function key(event) {
    if (event.key === 'ArrowDown' || event.key === 'PageDown') jump(Math.ceil(target + 1));
    if (event.key === 'ArrowUp' || event.key === 'PageUp') jump(Math.floor(target - 1));
    if (event.key === 'Enter' || event.key === ' ') window.location.href = cards[Math.round(clamp(smooth, 0, pages.length - 1))].userData.url;
  }
  function move(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    hover = raycaster.intersectObjects(hits, false)[0]?.object ?? null;
    renderer.domElement.style.cursor = hover ? 'pointer' : 'default';
  }
  function click() { if (hover?.userData?.url) window.location.href = hover.userData.url; }
  function touchStart(event) { startY = event.touches?.[0]?.clientY ?? 0; }
  function touchEnd(event) { const dy = startY - (event.changedTouches?.[0]?.clientY ?? startY); if (Math.abs(dy) > 36) { lastInput = performance.now(); jump(Math.round(target + Math.sign(dy))); } }
  function animate() {
    if (disposed) return;
    if (performance.now() - lastInput > 260) target += (Math.round(target) - target) * .026;
    smooth += (target - smooth) * .09;
    camera.position.lerp(new THREE.Vector3(0, 0.02, CAMERA_Z), .04);
    camera.lookAt(0, 0, 0);
    cards.forEach((card, index) => {
      const d = index - smooth;
      const centered = Math.exp(-(d * d) / SOFTNESS);
      const away = 1 - centered;
      const side = d === 0 ? 0 : Math.sign(d);
      const visible = Math.abs(d) < 2.8;
      card.visible = visible;
      if (!visible) return;
      card.position.set(side * away * SIDE_PUSH, d * 0.04, -away * DEPTH_PUSH);
      card.scale.setScalar(1.24 - away * .3);
      card.rotation.x = -away * .02;
      card.rotation.y = -side * away * .58;
      card.rotation.z = side * away * .08;
      card.renderOrder = Math.round(1000 - Math.abs(d) * 50);
      card.traverse((object) => { object.renderOrder = card.renderOrder; });
      card.userData.shine.material.opacity = .055 + centered * .15 + (hover === card.userData.hit ? .05 : 0);
      card.userData.shadow.material.opacity = .08 + centered * .24;
      card.userData.side.material.color.setHSL(.08, .36, .12 + centered * .05);
    });
    renderer.render(scene, camera);
    frame = window.requestAnimationFrame(animate);
  }
  resize();
  camera.position.set(0, 0.05, CAMERA_Z);
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
    scene.traverse((object) => { object.geometry?.dispose?.(); object.material?.map?.dispose?.(); object.material?.dispose?.(); });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
