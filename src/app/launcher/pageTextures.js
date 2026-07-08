import * as THREE from 'three';
import QRCode from 'qrcode';
import { getPageUrl } from '../../data/pages.js';

const WIDTH = 1024;
const HEIGHT = 1440;

const COMIC_PLACEHOLDER_IMAGES = {
  '01': 'data:image/jpeg;base64,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',
  '02': 'data:image/jpeg;base64,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',
  '03': 'data:image/jpeg;base64,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'
};

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 4) {
  const words = String(text ?? '').split(/\s+/).filter(Boolean);
  let line = '';
  let lines = 0;
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      y += lineHeight;
      lines += 1;
      line = word;
      if (lines >= maxLines) return y;
    } else {
      line = next;
    }
  }
  if (line && lines < maxLines) ctx.fillText(line, x, y);
  return y + lineHeight;
}

function drawQr(ctx, url, x, y, size) {
  const qr = QRCode.create(url, { errorCorrectionLevel: 'M', margin: 1 });
  const cells = qr.modules.size;
  const cell = size / cells;
  ctx.fillStyle = '#fff';
  ctx.fillRect(x, y, size, size);
  ctx.strokeStyle = '#1f1a14';
  ctx.lineWidth = 6;
  ctx.strokeRect(x, y, size, size);
  ctx.fillStyle = '#111';
  for (let row = 0; row < cells; row += 1) {
    for (let col = 0; col < cells; col += 1) {
      if (qr.modules.get(row, col)) ctx.fillRect(x + col * cell, y + row * cell, Math.ceil(cell), Math.ceil(cell));
    }
  }
}

function prepareTexture(canvas, side) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  if (side === 'left') {
    texture.center.set(0.5, 0.5);
    texture.rotation = Math.PI;
  }
  texture.needsUpdate = true;
  return texture;
}

function drawComicImage(ctx, image, url) {
  ctx.fillStyle = '#f4ead0';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  const scale = Math.min(WIDTH / image.width, HEIGHT / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const x = (WIDTH - drawWidth) / 2;
  const y = (HEIGHT - drawHeight) / 2;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(image, x, y, drawWidth, drawHeight);
  const qrSize = 230;
  drawQr(ctx, url, WIDTH / 2 - qrSize / 2, HEIGHT / 2 - qrSize / 2, qrSize);
}

function drawNotebookPage(ctx, page, origin) {
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  gradient.addColorStop(0, '#fff8df');
  gradient.addColorStop(1, '#e7cf9b');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.strokeStyle = 'rgba(96, 55, 26, 0.34)';
  ctx.lineWidth = 18;
  ctx.strokeRect(20, 20, WIDTH - 40, HEIGHT - 40);
  ctx.fillStyle = '#2a2119';
  ctx.textBaseline = 'top';
  ctx.font = '700 42px Courier New, monospace';
  ctx.fillText(page?.number ?? 'GO', 110, 112);
  ctx.font = '700 62px Georgia, serif';
  drawWrappedText(ctx, page?.title ?? 'Lost Pages', 110, 190, WIDTH - 220, 70, 3);
  ctx.font = '500 32px Courier New, monospace';
  ctx.fillStyle = '#4b3a2b';
  drawWrappedText(ctx, page?.description ?? 'Scan the page to open the exhibit.', 110, 480, WIDTH - 220, 44, 5);
  if (page?.slug) drawQr(ctx, getPageUrl(page, origin), 110, 1040, 240);
}

function pageToCanvas(page, origin, side = 'left') {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');
  const texture = prepareTexture(canvas, side);
  const url = page?.slug ? getPageUrl(page, origin) : origin;
  const comicSrc = COMIC_PLACEHOLDER_IMAGES[page?.number];

  if (comicSrc) {
    ctx.fillStyle = '#f4ead0';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    const image = new Image();
    image.onload = () => {
      drawComicImage(ctx, image, url);
      texture.needsUpdate = true;
    };
    image.src = comicSrc;
  } else {
    drawNotebookPage(ctx, page, origin);
  }

  return texture;
}

function createTurnTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');
  drawNotebookPage(ctx, { number: '', title: '', description: '' }, '');
  return prepareTexture(canvas, 'right');
}

export function createBookSpreads(experiences, origin) {
  const cover = {
    number: 'GO',
    title: 'Museum Multiverse: Lost Pages',
    description: 'A field notebook of QR-launched AR exhibits.',
    qrTitle: 'Open Page 01',
    slug: experiences[0]?.slug,
    accent: '#405f77'
  };
  const guide = {
    number: 'KEY',
    title: 'Lost Pages Index',
    description: experiences.map((experience) => `${experience.number} ${experience.title}`).join(' / '),
    prompt: 'Each spread shows two pages. Tap or scroll to turn.',
    qrTitle: 'Open Book',
    slug: experiences[0]?.slug,
    accent: '#7b5932'
  };

  const spreads = [[cover, guide]];
  for (let i = 0; i < experiences.length; i += 2) spreads.push([experiences[i], experiences[i + 1] ?? guide]);

  return spreads.map(([left, right]) => ({
    left,
    right,
    leftTexture: pageToCanvas(left, origin, 'left'),
    rightTexture: pageToCanvas(right, origin, 'right'),
    turnTexture: createTurnTexture()
  }));
}
