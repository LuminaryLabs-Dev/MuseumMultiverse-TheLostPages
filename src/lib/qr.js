import QRCode from 'qrcode';

export async function renderQrCode(target, text) {
  if (!target) {
    return;
  }

  if (!text) {
    target.innerHTML = '<div class="qr qr--error">Set VITE_PUBLIC_ORIGIN to a LAN URL before printing QR codes.</div>';
    return;
  }

  target.innerHTML = '<div class="qr qr--loading">Loading QR</div>';

  const svg = await QRCode.toString(text, {
    type: 'svg',
    margin: 1,
    width: 256,
    errorCorrectionLevel: 'M',
    color: {
      dark: '#16120f',
      light: '#f8f0de'
    }
  });

  target.innerHTML = svg.replace(
    '<svg',
    '<svg class="qr qr--svg" role="img" aria-label="QR code"'
  );
}
