import * as THREE from 'three';
import { createPagePivotService } from '../page-pivot/service.js';
import { createPlaneMeshCreatorService } from '../plane-mesh-creator/service.js';

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

export function createPaperPageBuilderService({
  textureWidth = 1536,
  textureHeight = 2176,
  faceWidth = 1.95,
  faceHeight = 2.72,
  cardWidth = 2.42,
  cardHeight = 3.14,
  segmentsX = 10,
  segmentsY = 10,
  origin = 'bottom-left',
  planeMeshCreator = null,
  pagePivot = null
} = {}) {
  const textureCache = new Map();
  const localPlaneMeshCreator = planeMeshCreator ?? createPlaneMeshCreatorService();
  const localPagePivot = pagePivot ?? createPagePivotService({ anchor: origin, pivot: 'center' });
  const ownsPlaneMeshCreator = !planeMeshCreator;
  const state = {
    textureWidth,
    textureHeight,
    origin,
    createdTextures: 0,
    createdCards: 0,
    loaded: false,
    loadedPageCount: 0
  };
  let loadedCards = [];

  function plane(options) {
    return localPlaneMeshCreator.getPlane({ origin, ...options });
  }

  function textureFor(page) {
    const key = page.slug ?? page.id ?? String(page.number ?? textureCache.size);
    if (textureCache.has(key)) return textureCache.get(key);

    const canvas = document.createElement('canvas');
    canvas.width = textureWidth;
    canvas.height = textureHeight;
    const ctx = canvas.getContext('2d');
    const accent = page.accent || '#56dfff';
    const deep = page.deep || '#111827';
    const glow = page.glow || '#fff2bd';

    ctx.fillStyle = '#f4ead7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = deep;
    ctx.fillRect(0, 0, canvas.width, 210);
    ctx.fillStyle = accent;
    ctx.fillRect(0, 210, canvas.width, 34);
    ctx.fillStyle = 'rgba(0,0,0,.08)';
    for (let y = 36; y < canvas.height; y += 12) ctx.fillRect(0, y, canvas.width, 1);

    ctx.strokeStyle = '#1b1714';
    ctx.lineWidth = 20;
    ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);
    ctx.lineWidth = 8;
    ctx.strokeRect(82, 282, canvas.width - 164, 682);
    ctx.strokeRect(82, 1016, canvas.width - 164, 516);
    ctx.strokeRect(82, 1588, canvas.width - 164, 430);

    ctx.fillStyle = '#f4ead7';
    ctx.font = '900 58px Arial Black, Impact, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`PAGE ${page.number}`, 84, 132);
    ctx.textAlign = 'right';
    ctx.fillText((page.collectible || 'AR RELIC').slice(0, 24), canvas.width - 84, 132);

    ctx.fillStyle = deep;
    ctx.font = '900 126px Georgia, serif';
    ctx.textAlign = 'left';
    drawWrapped(ctx, page.title, 112, 410, canvas.width - 224, 116, 4);

    ctx.fillStyle = accent;
    ctx.fillRect(126, 1084, canvas.width - 252, 310);
    ctx.fillStyle = 'rgba(255,255,255,.48)';
    ctx.fillRect(168, 1132, canvas.width - 336, 32);
    ctx.fillRect(168, 1202, canvas.width - 432, 32);
    ctx.fillRect(168, 1272, canvas.width - 520, 32);

    ctx.fillStyle = '#211913';
    ctx.font = '800 56px Arial, sans-serif';
    drawWrapped(ctx, page.prompt || page.description, 122, 1692, canvas.width - 448, 72, 3);

    ctx.fillStyle = glow;
    ctx.fillRect(canvas.width - 386, canvas.height - 376, 248, 236);
    ctx.strokeStyle = '#1b1714';
    ctx.lineWidth = 12;
    ctx.strokeRect(canvas.width - 386, canvas.height - 376, 248, 236);
    ctx.fillStyle = '#14100d';
    ctx.font = '900 50px Arial Black, Impact, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LAUNCH', canvas.width - 262, canvas.height - 250);
    ctx.fillText('AR', canvas.width - 262, canvas.height - 178);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    textureCache.set(key, texture);
    state.createdTextures = textureCache.size;
    return texture;
  }

  function createCard(page, index) {
    const group = new THREE.Group();
    group.userData.index = index;
    group.userData.slug = page.slug;
    group.userData.url = page.routeHref ?? page.route ?? `/ar/${page.slug}`;
    group.userData.origin = origin;

    const side = new THREE.Mesh(
      plane({ width: 2.12, height: 2.9, segmentsX: 1, segmentsY: 1 }),
      new THREE.MeshStandardMaterial({ color: 0x30251d, roughness: 0.68, metalness: 0.04 })
    );
    side.position.z = -0.1;

    const shadow = new THREE.Mesh(
      plane({ width: cardWidth, height: cardHeight, segmentsX: 1, segmentsY: 1 }),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.2, depthWrite: false })
    );
    shadow.position.set(0.18, -0.2, -0.22);

    const face = new THREE.Mesh(
      plane({ width: faceWidth, height: faceHeight, segmentsX, segmentsY }),
      new THREE.MeshStandardMaterial({ map: textureFor(page), roughness: 0.5, metalness: 0.01 })
    );
    face.position.z = 0.02;
    face.userData.paperGrid = { segmentsX, segmentsY, origin };

    const shine = new THREE.Mesh(
      plane({ width: faceWidth, height: faceHeight, segmentsX: 1, segmentsY: 1 }),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1, depthWrite: false })
    );
    shine.position.z = 0.045;

    const hit = new THREE.Mesh(
      plane({ width: 2.25, height: 3.05, segmentsX: 1, segmentsY: 1 }),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.001, depthWrite: false })
    );
    hit.position.z = 0.08;
    hit.userData.url = group.userData.url;
    hit.userData.slug = page.slug;
    hit.userData.index = index;

    const pivot = localPagePivot.wrap({
      children: [side, shadow, face, shine, hit],
      width: cardWidth,
      height: cardHeight,
      name: `page-${page.slug ?? index}-pivot`
    });
    group.add(pivot.pivotGroup);
    group.userData.pivot = pivot.pivotGroup;
    group.userData.visual = pivot.visualGroup;
    group.userData.pagePivot = {
      anchor: pivot.anchor,
      pivot: pivot.pivot,
      pivotOffset: pivot.pivotOffset,
      visualOffset: pivot.visualOffset
    };
    group.userData.hit = hit;
    group.userData.shine = shine;
    group.userData.shadow = shadow;
    group.userData.side = side;
    group.userData.face = face;
    state.createdCards += 1;
    return group;
  }

  function loadPages(pages = []) {
    if (state.loaded) return loadedCards;
    loadedCards = pages.map((page, index) => createCard(page, index));
    state.loaded = true;
    state.loadedPageCount = loadedCards.length;
    return loadedCards;
  }

  function getCards() {
    return loadedCards;
  }

  function dispose() {
    textureCache.forEach((texture) => texture.dispose?.());
    textureCache.clear();
    loadedCards = [];
    state.createdTextures = 0;
    state.loaded = false;
    state.loadedPageCount = 0;
    if (ownsPlaneMeshCreator) localPlaneMeshCreator.dispose?.();
    return snapshot();
  }

  function snapshot() {
    return {
      ...state,
      pagePivot: localPagePivot.snapshot?.(),
      planeMeshCreator: localPlaneMeshCreator.snapshot?.()
    };
  }

  return Object.freeze({ textureFor, createCard, loadPages, getCards, dispose, snapshot });
}
