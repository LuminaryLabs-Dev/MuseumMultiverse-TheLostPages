import * as THREE from 'three';
import './portalLanding.css';
import { pages } from '../../data/pages.js';
import { withBasePath } from '../routes/basePath.js';

const railControlPoints = [
  new THREE.Vector3(-0.85, 3.15, -1.2),
  new THREE.Vector3(1.45, 1.25, 0.2),
  new THREE.Vector3(-1.45, -1.25, 0.2),
  new THREE.Vector3(0.85, -3.15, -1.2)
];

const CARD_SOFTNESS = 0.78;
const CARD_SIDE_PUSH = 1.38;
const CARD_DEPTH_PUSH = 1.84;
const CAMERA_DISTANCE = 4.28;
const textureCache = new Map();

const PAGE_VERTEX_SHADER = `
  uniform float centeredness;
  uniform float away;
  uniform float side;
  uniform float scrollVelocity;
  uniform float time;
  varying vec2 vUv;
  varying float vEdge;
  varying float vCurl;

  void main() {
    vUv = uv;
    float edge = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
    vEdge = edge;
    float curlEdge = side >= 0.0 ? uv.x : 1.0 - uv.x;
    float curl = pow(curlEdge, 2.15) * (0.012 + away * 0.10 + scrollVelocity * 0.035);
    float settleWave = sin(uv.y * 10.0 + time * 5.0) * scrollVelocity * 0.004;
    vec3 transformed = position;
    transformed.z += curl + settleWave;
    transformed.x += (uv.y - 0.5) * side * away * 0.038;
    vCurl = curl;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

const PAGE_FRAGMENT_SHADER = `
  precision mediump float;
  uniform sampler2D cardTexture;
  uniform vec3 accentColor;
  uniform vec3 glowColor;
  uniform float centeredness;
  uniform float hovered;
  uniform float time;
  varying vec2 vUv;
  varying float vEdge;
  varying float vCurl;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec4 tex = texture2D(cardTexture, vUv);
    float fiber = hash(vec2(vUv.x * 210.0, vUv.y * 34.0 + floor(time * 0.5))) * 0.035;
    float pulp = sin(vUv.x * 155.0 + vUv.y * 17.0) * 0.010;
    float edgeShade = smoothstep(0.0, 0.075, vEdge);
    float edgeDark = mix(0.58, 1.0, edgeShade);
    float glossBand = smoothstep(0.78, 0.18, abs(vUv.x + vUv.y * 0.36 - 0.82)) * 0.10;
    float brightness = mix(0.50, 1.02, centeredness) + hovered * 0.10;
    vec3 color = tex.rgb * edgeDark * brightness;
    color += accentColor * (glossBand + vCurl * 0.18);
    color += glowColor * hovered * 0.055;
    color += fiber + pulp;
    color = pow(max(color, vec3(0.0)), vec3(0.96));
    gl_FragColor = vec4(color, 1.0);
  }
`;

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

function iframePath(page) {
  return withBasePath(`/ar/${page.slug}/?embed=1`);
}

export function renderPortalLandingMarkup() {
  return `
    <section class="portal-landing" data-portal-landing aria-label="Museum Multiverse AR experience launcher">
      <div class="portal-landing__scene" data-portal-scene aria-hidden="true"></div>
      <div class="portal-landing__iframe-layer" data-iframe-layer>
        ${pages.map((page, index) => `
          <article class="portal-landing__iframe-card" data-rail-iframe="${index}" aria-label="Page ${page.number}: ${page.title}">
            <iframe title="${page.title}" src="${iframePath(page)}" loading="lazy"></iframe>
          </article>
        `).join('')}
      </div>
      <div class="portal-landing__shade" aria-hidden="true"></div>
      <header class="portal-landing__title" aria-label="Museum Multiverse">
        <span>Museum Multiverse</span>
        <small>The Lost Chapters</small>
      </header>
    </section>
  `;
}

function drawWrapped(ctx, text, x, y, width, lineHeight, maxLines = 4) {
  const words = text.split(' ');
  let line = '';
  let lineCount = 0;
  words.forEach((word) => {
    if (lineCount >= maxLines) return;
    const test = `${line} ${word}`.trim();
    if (ctx.measureText(test).width > width && line) {
      ctx.fillText(line, x, y + lineCount * lineHeight);
      line = word;
      lineCount += 1;
    } else {
      line = test;
    }
  });
  if (line && lineCount < maxLines) ctx.fillText(line, x, y + lineCount * lineHeight);
}

function seededNoise(seed, index) {
  let value = 0;
  for (let i = 0; i < seed.length; i += 1) value += seed.charCodeAt(i) * (i + 1);
  return ((Math.sin(value + index * 91.7) * 43758.5453) % 1 + 1) % 1;
}

function makeCardTexture(page) {
  if (textureCache.has(page.slug)) return textureCache.get(page.slug);

  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 1088;
  const ctx = canvas.getContext('2d');
  const accent = page.accent || '#56dfff';
  const glow = page.glow || '#fff2bd';

  ctx.fillStyle = '#f7e7ba';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(30, 18, 10, 0.07)';
  for (let y = 44; y < canvas.height; y += 34) ctx.fillRect(58, y, canvas.width - 116, 2);
  ctx.fillStyle = 'rgba(30, 18, 10, 0.035)';
  for (let x = 0; x < canvas.width; x += 18) ctx.fillRect(x, 0, 1, canvas.height);
  for (let i = 0; i < 160; i += 1) {
    const x = seededNoise(page.slug, i) * canvas.width;
    const y = seededNoise(page.slug, i + 1000) * canvas.height;
    const a = 0.025 + seededNoise(page.slug, i + 2000) * 0.045;
    ctx.fillStyle = `rgba(30,18,10,${a})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  ctx.fillStyle = 'rgba(255,255,255,0.26)';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(canvas.width, 0);
  ctx.lineTo(canvas.width * 0.72, canvas.height);
  ctx.lineTo(canvas.width * 0.42, canvas.height);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#17110d';
  ctx.lineWidth = 18;
  ctx.strokeRect(22, 22, canvas.width - 44, canvas.height - 44);
  ctx.lineWidth = 4;
  ctx.strokeRect(58, 58, canvas.width - 116, canvas.height - 116);
  ctx.fillStyle = '#17110d';
  ctx.font = '900 30px Arial Black, Impact, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`PAGE ${page.number}`, 82, 112);
  ctx.textAlign = 'right';
  ctx.fillText((page.collectible || 'AR FRAGMENT').slice(0, 26), canvas.width - 82, 112);
  ctx.textAlign = 'left';
  ctx.font = '900 98px Georgia, serif';
  drawWrapped(ctx, page.title, 84, 240, canvas.width - 168, 88, 4);
  ctx.fillStyle = accent;
  ctx.fillRect(84, 522, canvas.width - 168, 180);
  ctx.strokeStyle = '#17110d';
  ctx.lineWidth = 10;
  ctx.strokeRect(84, 522, canvas.width - 168, 180);
  ctx.fillStyle = 'rgba(0,0,0,0.23)';
  ctx.fillRect(116, 556, canvas.width - 232, 20);
  ctx.fillRect(116, 600, canvas.width - 292, 20);
  ctx.fillRect(116, 644, canvas.width - 334, 20);
  ctx.fillStyle = '#17110d';
  ctx.font = '900 34px Arial, sans-serif';
  drawWrapped(ctx, page.prompt || page.description || 'Open the AR experience.', 92, 788, canvas.width - 184, 42, 3);
  ctx.fillStyle = glow;
  ctx.strokeStyle = '#17110d';
  ctx.lineWidth = 7;
  ctx.fillRect(canvas.width - 230, canvas.height - 232, 150, 150);
  ctx.strokeRect(canvas.width - 230, canvas.height - 232, 150, 150);
  ctx.fillStyle = '#17110d';
  ctx.font = '900 28px Arial Black, Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('LAUNCH', canvas.width - 155, canvas.height - 150);
  ctx.fillText('AR', canvas.width - 155, canvas.height - 112);
  ctx.fillStyle = '#17110d';
  ctx.font = '900 24px Arial Black, Impact, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('MUSEUM MULTIVERSE', 84, canvas.height - 108);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 2;
  textureCache.set(page.slug, texture);
  return texture;
}

function makePageMaterial(page) {
  return new THREE.ShaderMaterial({
    uniforms: {
      cardTexture: { value: makeCardTexture(page) },
      accentColor: { value: new THREE.Color(page.accent || '#56dfff') },
      glowColor: { value: new THREE.Color(page.glow || '#fff2bd') },
      centeredness: { value: 0 },
      away: { value: 1 },
      side: { value: 0 },
      hovered: { value: 0 },
      scrollVelocity: { value: 0 },
      time: { value: 0 }
    },
    vertexShader: PAGE_VERTEX_SHADER,
    fragmentShader: PAGE_FRAGMENT_SHADER,
    transparent: false,
    depthWrite: true,
    depthTest: true
  });
}

function makeCard(page, index, total) {
  const group = new THREE.Group();
  const t = total <= 1 ? 0 : index / (total - 1);
  const position = curvePoint(t);
  const tangent = curveTangent(t);
  group.position.copy(position);
  group.rotation.z = -tangent.x * 0.18;
  group.userData.index = index;
  group.userData.slug = page.slug;
  group.userData.url = withBasePath(`/ar/${page.slug}`);
  group.userData.basePosition = position;
  group.userData.baseRotationZ = -tangent.x * 0.18;
  const sideEdge = new THREE.Mesh(
    new THREE.BoxGeometry(2.08, 2.86, 0.12),
    new THREE.MeshStandardMaterial({ color: 0x3b2817, roughness: 0.62, metalness: 0.06 })
  );
  sideEdge.position.z = -0.08;
  group.add(sideEdge);
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(2.36, 3.05),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.28, depthWrite: false })
  );
  shadow.position.set(0.16, -0.18, -0.19);
  group.add(shadow);
  const card = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 2.65, 18, 24), makePageMaterial(page));
  card.position.z = 0.02;
  group.add(card);
  const gloss = new THREE.Mesh(
    new THREE.PlaneGeometry(1.9, 2.65),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08, depthWrite: false })
  );
  gloss.position.z = 0.04;
  group.add(gloss);
  const hit = new THREE.Mesh(
    new THREE.PlaneGeometry(2.18, 2.96),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.001, depthWrite: false })
  );
  hit.position.z = 0.09;
  hit.userData.index = index;
  hit.userData.url = group.userData.url;
  hit.userData.slug = page.slug;
  group.add(hit);
  group.userData.hit = hit;
  group.userData.card = card;
  group.userData.gloss = gloss;
  group.userData.shadow = shadow;
  group.userData.sideEdge = sideEdge;
  return group;
}

function makeRailLine() {
  const points = [];
  for (let i = 0; i <= 80; i += 1) points.push(curvePoint(i / 80));
  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color: 0x5bdcff, transparent: true, opacity: 0.08 })
  );
}

function softmaxFocus(cards, index) {
  const focus = new THREE.Vector3();
  let sum = 0;
  cards.forEach((card, i) => {
    const d = i - index;
    const weight = Math.exp(-(d * d) / CARD_SOFTNESS);
    focus.addScaledVector(card.userData.basePosition, weight);
    sum += weight;
  });
  return sum ? focus.multiplyScalar(1 / sum) : new THREE.Vector3();
}

function projectToScreen(vector, camera, width, height) {
  const projected = vector.clone().project(camera);
  return {
    x: (projected.x * 0.5 + 0.5) * width,
    y: (-projected.y * 0.5 + 0.5) * height
  };
}

export function enhancePortalLanding(root) {
  if (!root || typeof window === 'undefined') return () => {};
  const mount = root.querySelector('[data-portal-scene]');
  if (!mount) return () => {};
  const iframeCards = Array.from(root.querySelectorAll('[data-rail-iframe]'));
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020307, 0.052);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 80);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.45));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.sortObjects = true;
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
  let touchStartY = 0;
  let scrollVelocity = 0;
  let lastWheelTime = 0;
  let width = 1;
  let height = 1;

  function resize() {
    width = Math.max(1, mount.clientWidth || window.innerWidth || 1);
    height = Math.max(1, mount.clientHeight || window.innerHeight || 1);
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

  function launchActive() {
    const page = pages[Math.round(clamp(smoothIndex, 0, pages.length - 1))];
    if (page) window.location.href = withBasePath(`/ar/${page.slug}`);
  }

  function onWheel(event) {
    event.preventDefault();
    lastWheelTime = performance.now();
    scrollVelocity = clamp(Math.abs(event.deltaY) / 420, 0, 1);
    jumpTo(targetIndex + event.deltaY * 0.0032);
  }

  function onKey(event) {
    if (event.key === 'ArrowDown' || event.key === 'PageDown') jumpTo(Math.ceil(targetIndex + 1));
    if (event.key === 'ArrowUp' || event.key === 'PageUp') jumpTo(Math.floor(targetIndex - 1));
    if (event.key === 'Home') jumpTo(0);
    if (event.key === 'End') jumpTo(pages.length - 1);
    if (event.key === 'Enter' || event.key === ' ') launchActive();
  }

  function onTouchStart(event) {
    touchStartY = event.touches?.[0]?.clientY ?? 0;
  }

  function onTouchEnd(event) {
    const endY = event.changedTouches?.[0]?.clientY ?? touchStartY;
    const delta = touchStartY - endY;
    scrollVelocity = clamp(Math.abs(delta) / 280, 0, 1);
    lastWheelTime = performance.now();
    if (Math.abs(delta) > 36) jumpTo(Math.round(targetIndex + Math.sign(delta)));
  }

  function onClick() {
    if (hover?.userData?.url) window.location.href = hover.userData.url;
  }

  function updateIframeCard(element, index, screen, centeredness, away, side, visible) {
    if (!element) return;
    element.style.visibility = visible ? 'visible' : 'hidden';
    element.style.opacity = visible ? String(0.18 + centeredness * 0.82) : '0';
    element.style.zIndex = String(Math.round(900 - Math.abs(index - smoothIndex) * 60));
    element.style.pointerEvents = centeredness > 0.82 ? 'auto' : 'none';
    const scale = 0.62 + centeredness * 0.44;
    const rotateY = -side * away * 18;
    const rotateZ = side * away * 3.5;
    element.style.transform = `translate(-50%, -50%) translate3d(${screen.x}px, ${screen.y}px, 0) scale(${scale}) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
  }

  function animate(time = 0) {
    if (disposed) return;
    const t = time * 0.001;
    const idle = performance.now() - lastWheelTime > 260;
    if (idle) targetIndex += (Math.round(targetIndex) - targetIndex) * 0.024;
    scrollVelocity *= 0.9;
    smoothIndex += (targetIndex - smoothIndex) * 0.085;
    const focus = softmaxFocus(cards, smoothIndex);
    const cameraTarget = new THREE.Vector3(focus.x * 0.035, focus.y * 0.035, CAMERA_DISTANCE);
    camera.position.lerp(cameraTarget, 0.045);
    camera.lookAt(0, 0, 0);

    cards.forEach((card, index) => {
      const d = index - smoothIndex;
      const centeredness = Math.exp(-(d * d) / CARD_SOFTNESS);
      const away = 1 - centeredness;
      const side = d === 0 ? 0 : Math.sign(d);
      const visible = Math.abs(d) < 2.65;
      card.visible = visible;
      const iframeCard = iframeCards[index];
      if (!visible) {
        updateIframeCard(iframeCard, index, { x: -9999, y: -9999 }, centeredness, away, side, false);
        return;
      }
      const base = card.userData.basePosition;
      card.position.set(
        base.x + side * away * CARD_SIDE_PUSH + Math.sin(t + index) * 0.01,
        base.y + d * 0.075 + Math.cos(t * 0.7 + index) * 0.012,
        base.z - away * CARD_DEPTH_PUSH
      );
      const scale = 1.2 - away * 0.34;
      card.scale.setScalar(scale);
      card.rotation.x = -away * 0.04;
      card.rotation.y = -side * away * 0.42;
      card.rotation.z = card.userData.baseRotationZ + side * away * 0.08;
      card.renderOrder = Math.round(1000 - Math.abs(d) * 30);
      card.traverse((object) => {
        object.renderOrder = card.renderOrder;
      });
      const isHover = hover?.userData?.slug === card.userData.slug ? 1 : 0;
      const material = card.userData.card.material;
      material.uniforms.centeredness.value = centeredness;
      material.uniforms.away.value = away;
      material.uniforms.side.value = side;
      material.uniforms.hovered.value = isHover;
      material.uniforms.scrollVelocity.value = scrollVelocity;
      material.uniforms.time.value = t;
      card.userData.gloss.material.opacity = 0.035 + centeredness * 0.09 + isHover * 0.04;
      card.userData.shadow.material.opacity = 0.1 + centeredness * 0.22;
      card.userData.shadow.position.set(side * -0.18, -0.22, -0.19 - away * 0.15);
      card.userData.sideEdge.material.color.setHSL(0.08, 0.38, 0.12 + centeredness * 0.05);
      const screen = projectToScreen(card.position, camera, width, height);
      updateIframeCard(iframeCard, index, screen, centeredness, away, side, visible);
    });

    renderer.render(scene, camera);
    frame = window.requestAnimationFrame(animate);
  }

  resize();
  camera.position.set(0, 0.08, CAMERA_DISTANCE);
  animate();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('keydown', onKey);
  renderer.domElement.addEventListener('pointermove', updatePointer, { passive: true });
  renderer.domElement.addEventListener('wheel', onWheel, { passive: false });
  renderer.domElement.addEventListener('click', onClick);
  renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: true });
  renderer.domElement.addEventListener('touchend', onTouchEnd, { passive: true });

  return () => {
    disposed = true;
    if (frame) window.cancelAnimationFrame(frame);
    window.removeEventListener('resize', resize);
    window.removeEventListener('keydown', onKey);
    renderer.domElement.removeEventListener('pointermove', updatePointer);
    renderer.domElement.removeEventListener('wheel', onWheel);
    renderer.domElement.removeEventListener('click', onClick);
    renderer.domElement.removeEventListener('touchstart', onTouchStart);
    renderer.domElement.removeEventListener('touchend', onTouchEnd);
    scene.traverse((object) => {
      object.geometry?.dispose?.();
      object.material?.map?.dispose?.();
      object.material?.uniforms?.cardTexture?.value?.dispose?.();
      object.material?.dispose?.();
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
