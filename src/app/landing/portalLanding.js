import * as THREE from 'three';
import './portalLanding.css';
import { pages } from '../../data/pages.js';
import { withBasePath } from '../routes/basePath.js';

export function renderPortalLandingMarkup() {
  return `
    <section class="portal-landing" data-portal-landing aria-label="Museum Multiverse AR launcher">
      <div class="portal-landing__scene" data-portal-scene aria-hidden="true"></div>
      <div class="portal-landing__shade" aria-hidden="true"></div>
      <div class="portal-landing__hud">
        <header class="portal-landing__mast">
          <p class="portal-landing__eyebrow">One page · Eight full 3D AR experiences</p>
          <h1>Museum Multiverse</h1>
          <p class="portal-landing__copy">Choose a portal. Each one opens a focused launch page, then starts the matching 3D AR experience.</p>
        </header>
        <aside class="portal-landing__hint"><strong>Three.js portal hub</strong><span>Tap a glowing portal or use the route buttons.</span></aside>
        <nav class="portal-landing__routes" aria-label="AR experience routes">
          ${pages.map((page) => `
            <a class="portal-landing__route" href="${withBasePath(`/ar/${page.slug}`)}" data-nav style="--accent:${page.accent};--glow:${page.glow};--deep:${page.deep}">
              <small>Page ${page.number}</small><strong>${page.title}</strong>
            </a>
          `).join('')}
        </nav>
      </div>
    </section>
  `;
}

function makeLabel(text, color) {
  const canvas = document.createElement('canvas');
  canvas.width = 384;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0,0,0,.66)';
  ctx.fillRect(0, 0, 384, 128);
  ctx.strokeStyle = color;
  ctx.lineWidth = 8;
  ctx.strokeRect(6, 6, 372, 116);
  ctx.fillStyle = '#f7efde';
  ctx.font = '900 25px Arial Black, Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text.slice(0, 26), 192, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makePortal(page, index, total) {
  const group = new THREE.Group();
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  group.position.set(Math.cos(angle) * 4.15, Math.sin(angle) * 2.25 - 0.1, 0);
  group.userData.url = withBasePath(`/ar/${page.slug}`);
  group.userData.slug = page.slug;

  const accent = new THREE.Color(page.accent || '#50d9ff');
  const glow = new THREE.Color(page.glow || '#ffffff');
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.6, 0.06, 12, 72),
    new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.95 })
  );
  const core = new THREE.Mesh(
    new THREE.CircleGeometry(0.54, 64),
    new THREE.MeshBasicMaterial({ color: glow, transparent: true, opacity: 0.26, side: THREE.DoubleSide })
  );
  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(1.18, 0.4),
    new THREE.MeshBasicMaterial({ map: makeLabel(`P${page.number} ${page.title}`, page.accent), transparent: true })
  );
  label.position.y = -0.95;
  const hit = new THREE.Mesh(
    new THREE.CircleGeometry(0.92, 32),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.001 })
  );
  hit.userData.url = group.userData.url;
  hit.userData.slug = page.slug;
  group.add(ring, core, label, hit);
  group.userData.ring = ring;
  group.userData.core = core;
  return group;
}

function panel(x, y, color) {
  const group = new THREE.Group();
  const frame = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1, 0.08), new THREE.MeshStandardMaterial({ color: 0x8c5d24, roughness: 0.58, metalness: 0.12 }));
  const art = new THREE.Mesh(new THREE.PlaneGeometry(1.18, 0.78), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.82 }));
  art.position.z = 0.055;
  group.add(frame, art);
  group.position.set(x, y, -1.3);
  group.rotation.z = x < 0 ? -0.12 : 0.12;
  return group;
}

export function enhancePortalLanding(root) {
  if (!root || typeof window === 'undefined') return () => {};
  const mount = root.querySelector('[data-portal-scene]');
  if (!mount) return () => {};

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020307, 0.055);
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 80);
  camera.position.set(0, 1.05, 8.8);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  mount.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0x6078ff, 0.72));
  const key = new THREE.PointLight(0x68e8ff, 2.2, 16);
  key.position.set(0, 1.8, 3.8);
  scene.add(key);
  const purple = new THREE.PointLight(0x7a2cff, 2, 12);
  purple.position.set(-2.4, -0.8, 2.3);
  scene.add(purple);

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 9), new THREE.MeshStandardMaterial({ color: 0x101424, roughness: 0.74 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -2;
  scene.add(floor);

  scene.add(panel(-5, 0.6, 0x173d63), panel(5, 0.55, 0x0b445f), panel(-4.4, -1.2, 0x3b174d), panel(4.4, -1.2, 0x102e1d));
  const portals = pages.map((page, index) => makePortal(page, index, pages.length));
  portals.forEach((portal) => scene.add(portal));
  const hits = portals.map((portal) => portal.children[3]);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
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

  function onMove(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    hover = raycaster.intersectObjects(hits, false)[0]?.object ?? null;
    renderer.domElement.style.cursor = hover ? 'pointer' : 'default';
  }

  function onClick() {
    if (hover?.userData?.url) window.location.href = hover.userData.url;
  }

  function animate(time = 0) {
    if (disposed) return;
    const t = time * 0.001;
    portals.forEach((portal, index) => {
      const isHover = hover?.userData?.slug === portal.userData.slug;
      const pulse = 1 + Math.sin(t * 2.1 + index) * 0.035 + (isHover ? 0.18 : 0);
      portal.scale.setScalar(pulse);
      portal.rotation.z += 0.002;
      portal.userData.ring.rotation.z -= 0.012;
      portal.userData.core.material.opacity = isHover ? 0.44 : 0.24 + Math.sin(t * 2 + index) * 0.04;
    });
    camera.position.x = Math.sin(t * 0.18) * 0.28;
    camera.lookAt(0, -0.1, 0);
    renderer.render(scene, camera);
    frame = window.requestAnimationFrame(animate);
  }

  resize();
  animate();
  window.addEventListener('resize', resize, { passive: true });
  renderer.domElement.addEventListener('pointermove', onMove, { passive: true });
  renderer.domElement.addEventListener('click', onClick);

  return () => {
    disposed = true;
    if (frame) window.cancelAnimationFrame(frame);
    window.removeEventListener('resize', resize);
    renderer.domElement.removeEventListener('pointermove', onMove);
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
