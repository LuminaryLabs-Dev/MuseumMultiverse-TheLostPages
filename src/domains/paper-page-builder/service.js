import * as THREE from 'three';
import QRCode from 'qrcode';
import { createPagePivotService } from '../page-pivot/service.js';
import { createPlaneMeshCreatorService } from '../plane-mesh-creator/service.js';
import sleepingGalleryReference from './sleeping-gallery-reference.png';

const SLEEPING_GALLERY_REFERENCE_SIZE = { width: 1023, height: 1537 };
const SLEEPING_GALLERY_QR_CENTER = { x: 510.5, y: 744 };

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

function drawQr(ctx, url, x, y, size) {
  if (!url) {
    ctx.fillStyle = '#14100d';
    ctx.font = '900 34px Arial Black, Impact, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SET PUBLIC', x + size / 2, y + size / 2 - 18);
    ctx.fillText('ORIGIN', x + size / 2, y + size / 2 + 28);
    return;
  }

  const qr = QRCode.create(url, { errorCorrectionLevel: 'M', margin: 1 });
  const cells = qr.modules.size;
  const cell = size / cells;

  ctx.fillStyle = '#f8f0de';
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = '#14100d';

  for (let row = 0; row < cells; row += 1) {
    for (let col = 0; col < cells; col += 1) {
      if (qr.modules.get(row, col)) {
        ctx.fillRect(x + col * cell, y + row * cell, Math.ceil(cell), Math.ceil(cell));
      }
    }
  }
}

function shortText(text, maxWords = 12) {
  const words = String(text || '').trim().split(/\s+/).filter(Boolean);
  if (!words.length) return '';
  if (words.length <= maxWords) return words.join(' ');
  return `${words.slice(0, maxWords).join(' ')}...`;
}

function createSleepingGalleryReferenceTexture() {
  const texture = new THREE.TextureLoader().load(sleepingGalleryReference);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.anisotropy = 4;
  return texture;
}

function createSleepingGalleryQrTexture(page) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawQr(ctx, page.qrTarget || page.routeUrl || page.routeHref, 64, 64, 384);
  texture.needsUpdate = true;
  return texture;
}

function overlayPositionFor(origin, faceWidth, faceHeight, overlaySize) {
  const u = SLEEPING_GALLERY_QR_CENTER.x / SLEEPING_GALLERY_REFERENCE_SIZE.width;
  const v = 1 - SLEEPING_GALLERY_QR_CENTER.y / SLEEPING_GALLERY_REFERENCE_SIZE.height;
  if (origin === 'bottom-left') {
    return {
      x: u * faceWidth - overlaySize / 2,
      y: v * faceHeight - overlaySize / 2
    };
  }
  return {
    x: (u - 0.5) * faceWidth,
    y: (v - 0.5) * faceHeight
  };
}

function drawPanelFrame(ctx, x, y, w, h, fill, stroke = '#17110d') {
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 8;
  ctx.strokeRect(x, y, w, h);
  ctx.strokeStyle = 'rgba(255,255,255,0.16)';
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 8, y + 8, Math.max(0, w - 16), Math.max(0, h - 16));
}

function drawCaptionStrip(ctx, text, x, y, w, h, fontSize, ink = '#17110d') {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.14)';
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = ink;
  ctx.font = `800 ${fontSize}px Arial, sans-serif`;
  ctx.textAlign = 'left';
  drawWrapped(ctx, text, x + 18, y + Math.round(h * 0.56), w - 36, Math.round(fontSize * 1.12), 3);
}

function drawKidFigure(ctx, x, y, scale, ink, accent) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = '#3a2a22';
  ctx.beginPath();
  ctx.arc(0, -62, 34, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = ink;
  ctx.fillRect(-14, -16, 28, 76);
  ctx.fillRect(-34, 0, 20, 60);
  ctx.fillRect(14, 0, 20, 60);
  ctx.fillStyle = accent;
  ctx.fillRect(-6, 12, 12, 34);
  ctx.fillRect(-34, 58, 20, 14);
  ctx.fillRect(14, 58, 20, 14);
  ctx.restore();
}

function drawMuseumHall(ctx, x, y, w, h, ink, accent, glow) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = ink;
  ctx.lineWidth = 8;
  ctx.strokeRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(17, 17, 18, 0.08)';
  for (let i = 0; i < 4; i += 1) {
    ctx.fillRect(26, 30 + i * 36, w - 52, 6);
  }
  ctx.strokeStyle = 'rgba(23, 17, 13, 0.72)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.56, Math.min(w, h) * 0.25, Math.PI, 0);
  ctx.stroke();
  ctx.fillStyle = accent;
  ctx.fillRect(w * 0.22, h * 0.56, w * 0.56, 14);
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.18, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawColorBurst(ctx, x, y, w, h, accent, glow) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 10;
  const cx = w * 0.56;
  const cy = h * 0.44;
  for (let i = 0; i < 12; i += 1) {
    const angle = (Math.PI * 2 * i) / 12;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * w * 0.32, cy + Math.sin(angle) * h * 0.32);
    ctx.stroke();
  }
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cx, cy, Math.min(w, h) * 0.14, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawComicPage(ctx, page, canvas) {
  const pageMarginY = Math.round(canvas.height * 0.032);
  const pageHeight = canvas.height - pageMarginY * 2;
  const pageWidth = Math.round(pageHeight * (1023 / 1538));
  const pageX = Math.round((canvas.width - pageWidth) / 2);
  const pageY = pageMarginY;
  const innerPad = Math.round(pageWidth * 0.032);
  const titleBandH = Math.round(pageHeight * 0.16);
  const qrSize = Math.round(Math.min(pageWidth, pageHeight) * 0.24);
  const qrX = Math.round(pageX + (pageWidth - qrSize) / 2);
  const qrY = Math.round(pageY + (pageHeight - qrSize) / 2);
  const leftX = pageX + innerPad;
  const rightX = qrX + qrSize + innerPad;
  const topY = pageY + titleBandH + innerPad;
  const bottomY = qrY + qrSize + innerPad;
  const leftW = Math.max(1, qrX - innerPad - leftX);
  const rightW = Math.max(1, pageX + pageWidth - innerPad - rightX);
  const topH = Math.max(1, qrY - innerPad - topY);
  const bottomH = Math.max(1, pageY + pageHeight - innerPad - bottomY);
  const opening = page.slug === 'sleeping-gallery';
  const ink = '#17110d';
  const paper = opening ? '#f5ead7' : '#f7e8bd';
  const muted = opening ? '#d8d1c3' : '#e0cfa5';
  const muted2 = opening ? '#cfc7ba' : '#d9be85';
  const lift = opening ? '#e8d9bd' : page.accent || '#56dfff';
  const glow = opening ? page.glow || '#ecd2a0' : page.glow || '#fff2bd';
  const accent = page.accent || '#56dfff';
  const panelCopy = [
    shortText(page.description || page.pitch || page.title, 11),
    shortText(page.pitch || page.description || page.prompt, 11),
    shortText(page.prompt || page.collectible || page.qrTitle, 10),
    shortText(page.completeText || page.collectible || page.qrTitle, 10)
  ];

  ctx.fillStyle = '#050508';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,0.04)';
  ctx.fillRect(pageX - 18, pageY - 18, pageWidth + 36, pageHeight + 36);
  ctx.fillStyle = paper;
  ctx.fillRect(pageX, pageY, pageWidth, pageHeight);

  ctx.fillStyle = 'rgba(23, 17, 13, 0.04)';
  for (let i = 0; i < 180; i += 1) {
    const px = pageX + ((i * 83) % pageWidth);
    const py = pageY + ((i * 47) % pageHeight);
    const size = 0.9 + (i % 5) * 0.2;
    ctx.fillRect(px, py, size, size);
  }

  ctx.strokeStyle = ink;
  ctx.lineWidth = 18;
  ctx.strokeRect(pageX + 10, pageY + 10, pageWidth - 20, pageHeight - 20);
  ctx.lineWidth = 4;
  ctx.strokeRect(pageX + 46, pageY + 46, pageWidth - 92, pageHeight - 92);

  ctx.fillStyle = ink;
  ctx.font = '900 30px Arial Black, Impact, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`PAGE ${page.number}`, pageX + innerPad + 6, pageY + 88);
  ctx.textAlign = 'center';
  ctx.font = '900 40px Georgia, serif';
  ctx.fillText(page.title, pageX + Math.round(pageWidth / 2), pageY + 136);
  ctx.textAlign = 'right';
  ctx.font = '900 30px Arial Black, Impact, sans-serif';
  ctx.fillText(page.collectible || 'AR FRAGMENT', pageX + pageWidth - innerPad - 6, pageY + 88);

  drawPanelFrame(ctx, leftX, topY, leftW, topH, opening ? muted : 'rgba(245, 233, 214, 0.86)');
  drawPanelFrame(ctx, rightX, topY, rightW, topH, opening ? muted2 : 'rgba(240, 220, 176, 0.88)');
  drawPanelFrame(ctx, leftX, bottomY, leftW, bottomH, opening ? '#ebdcc0' : 'rgba(240, 214, 145, 0.92)');
  drawPanelFrame(ctx, rightX, bottomY, rightW, bottomH, opening ? accent : lift);

  const captionH = Math.max(72, Math.round(pageHeight * 0.062));
  drawCaptionStrip(ctx, panelCopy[0], leftX, topY + topH - captionH, leftW, captionH, 20, ink);
  drawCaptionStrip(ctx, panelCopy[1], rightX, topY + topH - captionH, rightW, captionH, 20, ink);
  drawCaptionStrip(ctx, panelCopy[2], leftX, bottomY + bottomH - captionH, leftW, captionH, 20, ink);
  drawCaptionStrip(ctx, panelCopy[3], rightX, bottomY + bottomH - captionH, rightW, captionH, 20, ink);

  drawMuseumHall(ctx, leftX + 24, topY + 24, Math.max(120, leftW - 48), Math.max(120, topH - captionH - 54), ink, opening ? '#9b8d7c' : accent, glow);
  drawMuseumHall(ctx, rightX + 24, topY + 24, Math.max(120, rightW - 48), Math.max(120, topH - captionH - 54), ink, opening ? '#b4aa9a' : glow, accent);
  drawKidFigure(ctx, leftX + leftW * 0.42, bottomY + bottomH * 0.58, Math.max(0.8, Math.min(leftW, bottomH) / 290), ink, accent);
  drawColorBurst(ctx, rightX + 24, bottomY + 24, Math.max(120, rightW - 48), Math.max(120, bottomH - captionH - 54), accent, glow);

  ctx.fillStyle = '#fcf5e6';
  ctx.fillRect(qrX, qrY, qrSize, qrSize);
  ctx.strokeStyle = ink;
  ctx.lineWidth = 10;
  ctx.strokeRect(qrX, qrY, qrSize, qrSize);
  ctx.setLineDash([12, 10]);
  ctx.lineWidth = 3;
  ctx.strokeRect(qrX + 16, qrY + 16, qrSize - 32, qrSize - 32);
  ctx.setLineDash([]);
  ctx.fillStyle = 'rgba(23,17,13,0.82)';
  ctx.font = '900 44px Arial Black, Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('QR SPACE', qrX + qrSize / 2, qrY + qrSize / 2 - 6);
  ctx.font = '700 24px Arial, sans-serif';
  ctx.fillText('SCAN LATER', qrX + qrSize / 2, qrY + qrSize / 2 + 30);
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

    if (page.slug === 'sleeping-gallery') {
      const texture = createSleepingGalleryReferenceTexture();
      textureCache.set(key, texture);
      state.createdTextures = textureCache.size;
      return texture;
    }

    const canvas = document.createElement('canvas');
    canvas.width = textureWidth;
    canvas.height = textureHeight;
    const ctx = canvas.getContext('2d');
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.anisotropy = 4;
    drawComicPage(ctx, page, canvas);
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
      page.slug === 'sleeping-gallery'
        ? new THREE.MeshBasicMaterial({ map: textureFor(page), transparent: true })
        : new THREE.MeshStandardMaterial({ map: textureFor(page), roughness: 0.5, metalness: 0.01 })
    );
    face.position.z = 0.02;
    face.userData.paperGrid = { segmentsX, segmentsY, origin };

    const qrOverlaySize = page.slug === 'sleeping-gallery' ? faceWidth * 0.26 : 0;
    const qrOverlayPosition = qrOverlaySize ? overlayPositionFor(origin, faceWidth, faceHeight, qrOverlaySize) : null;
    const qrOverlay = qrOverlaySize ? new THREE.Mesh(
      plane({ width: qrOverlaySize, height: qrOverlaySize, segmentsX: 1, segmentsY: 1 }),
      new THREE.MeshBasicMaterial({
        map: createSleepingGalleryQrTexture(page),
        transparent: true,
        depthWrite: false
      })
    ) : null;
    if (qrOverlay) {
      qrOverlay.position.set(qrOverlayPosition.x, qrOverlayPosition.y, 0.066);
    }

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
      children: [side, shadow, face, shine, ...(qrOverlay ? [qrOverlay] : []), hit],
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
    group.userData.qrOverlay = qrOverlay;
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
