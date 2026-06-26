import * as THREE from 'three';
import './portalLanding.css';
import { pages } from '../../data/pages.js';
import { withBasePath } from '../routes/basePath.js';

const railControlPoints = [
  new THREE.Vector3(-1.35, 4.3, -1.1),
  new THREE.Vector3(2.1, 1.45, 0.35),
  new THREE.Vector3(-2.15, -1.45, 0.2),
  new THREE.Vector3(1.15, -4.2, -1.1)
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function curvePoint(t) {
  const p0 = railControlPoints[0];
  const p1 = railControlPoints[1];
  const p2 = railControlPoints[2];
  const p3 = railControlPoints[3];
  const u = 1 - t;
  return new THREE.Vector3()
    .addScaledVector(p0, u * u * u)
    .addScaledVector(p1, 3 * u * u * t)
    .addScaledVector(p2, 3 * u * t * t)
    .addScaledVector(p3, t * t * t);
}

function curveTangent(t) {
  const p0 = railControlPoints[0];
  const p1 = railControlPoints[1];
  const p2 = railControlPoints[2];
  const p3 = railControlPoints[3];
  const u = 1 - t;
  return new THREE.Vector3()
    .addScaledVector(new THREE.Vector3().subVectors(p1, p0), 3 * u * u)
    .addScaledVector(new THREE.Vector3().subVectors(p2, p1), 6 * u * t)
    .addScaledVector(new THREE.Vector3().subVectors(p3, p2), 3 * t * t)
    .normalize();
}

export function renderPortalLandingMarkup() {
  return `
    <section class="portal-landing" data-portal-landing aria-label="Museum Multiverse AR experience launcher">
      <div class="portal-landing__scene" data-portal-scene aria-hidden="true"></div>
      <div class="portal-landing__shade" aria-hidden="true"></div>
      <div class="portal-landing__hud">
        <header class="portal-landing__mast">
          <p class="portal-landing__eyebrow">One page · Eight full 3D AR experiences</p>
          <h1>Museum Multiverse</h1>
          <p class="portal-landing__copy">A vertical Three.js rail of floating comic pages. Travel the curve, then open one page into its full 3D AR experience.</p>
        </header>
        <aside class="portal-landing__hint"><strong>Scroll the page rail.</strong><span>The camera follows a smooth softmax focus along the curve.</span></aside>
        <nav class="portal-landing__routes" aria-label="AR experience routes">
          ${pages.map((page, index) => `
            <a class="portal-landing__route" href="${withBasePath(`/ar/${page.slug}`)}" data-nav data-rail-jump="${index}" style="--accent:${page.accent};--glow:${page.glow};--deep:${page.deep}">
              <small>Page ${page.number}</small><strong>${page.title}</strong>
            </a>
          `).join('')}
        </nav>
      </div>
    </section>
  `;
}

function makeCardTexture(page) {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 900;
  const ctx = canvas.getContext('2d');
  const accent = page.accent || '#56dfff';
  const glow = page.glow || '#fff2bd';
  ctx.fillStyle = '#f6e5b7';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(27, 17, 10, 0.08)';
  for (let y = 34; y < canvas.height; y += 34) ctx.fillRect(44, y, canvas.width - 88, 2);
  ctx.fillStyle = 'rgba(255,255,255,0.28)';
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(canvas.width, 0); ctx.lineTo(canvas.width * 0.74, canvas.height); ctx.lineTo(canvas.width * 0.42, canvas.height); ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#17110d';
  ctx.lineWidth = 16;
  ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);
  ctx.lineWidth = 4;
  ctx.strokeRect(48, 48, canvas.width - 96, canvas.height - 96);
  ctx.fillStyle = '#17110d';
  ctx.font = '900 28px Arial Black, Impact, sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText(`PAGE ${page.number}`, 70, 96);
  ctx.textAlign = 'right';
  ctx.fillText(page.collectible?.slice(0, 24) || 'AR FRAGMENT', canvas.width - 70, 96);
  ctx.textAlign = 'left';
  ctx.font = '900 84px Georgia, serif';
  const titleWords = page.title.split(' ');
  let line = '';
  let y = 210;
  titleWords.forEach((word) => {
    const test = `${line} ${word}`.trim();
    if (ctx.measureText(test).width > canvas.width - 120 && line) {
      ctx.fillText(line, 70, y);
      y += 78;
      line = word;
    } else {
      line = test;
    }
  });
  if (line) ctx.fillText(line, 70, y);
  ctx.fillStyle = accent;
  ctx.fillRect(70, 470, canvas.width - 140, 164);
  ctx.strokeStyle = '#17110d';
  ctx.lineWidth = 8;
  ctx.strokeRect(70, 470, canvas.width - 140, 164);
  ctx.fillStyle = 'rgba(0,0,0,0.22)';
  ctx.fillRect(95, 498, canvas.width - 190, 18);
  ctx.fillRect(95, 536, canvas.width - 230, 18);
  ctx.fillRect(95, 574, canvas.width - 260, 18);
  ctx.fillStyle = '#17110d';
  ctx.font = '700 30px Arial, sans-serif';
  const prompt = page.prompt || page.description || 'Open the AR route.';
  const promptLines = [prompt.slice(0, 35), prompt.slice(35, 70), prompt.slice(70, 105)].filter(Boolean);
  promptLines.forEach((text, index) => ctx.fillText(text.trim(), 82, 704 + index * 38));
  ctx.fillStyle = glow;
  ctx.strokeStyle = '#17110d';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.rect(canvas.width - 190, canvas.height - 190, 118, 118);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#17110d';
  ctx.font = '900 24px Arial Black, Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('OPEN', canvas.width - 131, canvas.height - 122);
  ctx.fillText('AR', canvas.width - 131, canvas.height - 88);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 2;
  return texture;
}

function makeCard(page, index, total) {
  const group = new THREE.Group();
  const t = total <= 1 ? 0 : index / (total - 1);
  const position = curvePoint(t);
  const tangent = curveTangent(t);
  group.position.copy(position);
  group.rotation.z = -tangent.x * 0.24;
  group.userData.index = index;
  group.userData.slug = page.slug;
  group.userData.url = withBasePath(`/ar/${page.slug}`);
  group.userData.basePosition = position;

  const backing = new THREE.Mesh(
    new THREE.BoxGeometry(1.72, 2.34, 0.075),
    new THREE.MeshStandardMaterial({ color: 0x1b120d, roughness: 0.55, metalness: 0.06 })
  );
  backing.position.z = -0.055;
  group.add(backing);

  const card = new THREE.Mesh(
    new THREE.PlaneGeometry(1.58, 2.22, 8, 12),
    new THREE.MeshStandardMaterial({ map: makeCardTexture(page), roughness: 0.58, metalness: 0.02 })
  );
  card.position.z = 0.02;
  group.add(card);

  const gloss = new THREE.Mesh(
    new THREE.PlaneGeometry(1.58, 2.22),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08, depthWrite: false })
  );
  gloss.position.z = 0.035;
  group.add(gloss);

  const hit = new THREE.Mesh(
    new THREE.PlaneGeometry(1.85, 2.5),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.001, depthWrite: false })
  );
  hit.position.z = 0.08;
  hit.userData.index = index;
  hit.userData.url = group.userData.url;
  hit.userData.slug = page.slug;
  group.add(hit);
  group.userData.hit = hit;
  group.userData.card = card;
  return group;
}

function makeRailLine() {
  const points = [];
  for (let i = 0; i <= 80; i += 1) points.push(curvePoint(i / 80));
  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color: 0x5bdcff, transparent: true, opacity: 0.18 })
  );
}

function softmaxFocus(cards, index) {
  const focus = new THREE.Vector3();
  let sum = 0;
  cards.forEach((card, i) => {
    const d = i - index;
    const weight = Math.exp(-(d * d) / 0.9);
    focus.addScaledVector(card.userData.basePosition, weight);
    sum += weight;
  });
  return sum ? focus.multiplyScalar(1 / sum) : new THREE.Vector3();
}

export function enhancePortalLanding(root) {
  if (!root || typeof window === 'undefined') return () => {};
  const mount = root.querySelector('[data-portal-scene]');
  if (!mount) return () => {};

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020307, 0.052);
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 80);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.55));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  mount.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0x6f7eff, 0.82));
  const key = new THREE.PointLight(0x70e8ff, 2.4, 16);
  key.position.set(0, 1.2, 4.2);
  scene.add(key);
  const fill = new THREE.PointLight(0x8a2cff, 2.0, 14);
  fill.position.set(-2.3, -1.1, 3.2);
  scene.add(fill);
  scene.add(makeRailLine());

  const cards = pages.map((page, index) => makeCard(page, index, pages.length));
  cards.forEach((card) => scene.add(card));
  const hits = cards.map((card) => card.userData.hit);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let targetIndex = 0;
  let smoothIndex = 0;
  let hover = null;
  let frame = 0;
  let disposed = false;

  function resize() {
    const width = Math.max(1, mount.clientWidth || window.innerWidth || 1);
    const height = Math.max(1, mount.clientHeight || window.innerHeight || 1);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  function updatePointer(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    hover = raycaster.intersectObjects(hits, false)[0]?.object ?? null;
    renderer.domElement.style.cursor = hover ? 'pointer' : 'default';
  }

  function jumpTo(index) {
    targetIndex = clamp(index, 0, pages.length - 1);
  }

  function onWheel(event) {
    event.preventDefault();
    jumpTo(targetIndex + event.deltaY * 0.0045);
  }

  function onKey(event) {
    if (event.key === 'ArrowDown' || event.key === 'PageDown') jumpTo(Math.ceil(targetIndex + 1));
    if (event.key === 'ArrowUp' || event.key === 'PageUp') jumpTo(Math.floor(targetIndex - 1));
  }

  function onClick() {
    if (hover?.userData?.url) window.location.href = hover.userData.url;
  }

  root.querySelectorAll('[data-rail-jump]').forEach((link) => {
    link.addEventListener('mouseenter', () => jumpTo(Number(link.getAttribute('data-rail-jump') || 0)));
    link.addEventListener('focus', () => jumpTo(Number(link.getAttribute('data-rail-jump') || 0)));
  });

  function animate(time = 0) {
    if (disposed) return;
    const t = time * 0.001;
    smoothIndex += (targetIndex - smoothIndex) * 0.085;
    const focus = softmaxFocus(cards, smoothIndex);
    const cameraTarget = focus.clone().add(new THREE.Vector3(0, 0.05, 5.15));
    camera.position.lerp(cameraTarget, 0.12);
    camera.lookAt(focus.x, focus.y, focus.z);

    cards.forEach((card, index) => {
      const distance = Math.abs(index - smoothIndex);
      const visible = distance < 3.2;
      card.visible = visible;
      if (!visible) return;
      const scale = 1.08 - Math.min(distance, 2.5) * 0.12;
      card.scale.setScalar(scale);
      card.position.copy(card.userData.basePosition).add(new THREE.Vector3(Math.sin(t + index) * 0.025, Math.cos(t * 0.8 + index) * 0.035, 0));
      card.lookAt(camera.position);
      card.rotateZ((index - smoothIndex) * 0.03);
      card.userData.card.material.emissive = new THREE.Color(0x111111);
      card.userData.card.material.emissiveIntensity = hover?.userData?.slug === card.userData.slug ? 0.22 : Math.max(0, 0.08 - distance * 0.02);
    });

    renderer.render(scene, camera);
    frame = window.requestAnimationFrame(animate);
  }

  resize();
  camera.position.copy(curvePoint(0)).add(new THREE.Vector3(0, 0.1, 5.2));
  animate();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('keydown', onKey);
  renderer.domElement.addEventListener('pointermove', updatePointer, { passive: true });
  renderer.domElement.addEventListener('wheel', onWheel, { passive: false });
  renderer.domElement.addEventListener('click', onClick);

  return () => {
    disposed = true;
    if (frame) window.cancelAnimationFrame(frame);
    window.removeEventListener('resize', resize);
    window.removeEventListener('keydown', onKey);
    renderer.domElement.removeEventListener('pointermove', updatePointer);
    renderer.domElement.removeEventListener('wheel', onWheel);
    renderer.domElement.removeEventListener('click', onClick);
    scene.traverse((object) => {
      object.geometry?.dispose?.();
      object.material?.map?.dispose?.();
      object.material?.dispose?.();
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
