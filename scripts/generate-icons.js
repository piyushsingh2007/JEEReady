import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const iconsDir = path.resolve('public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Clean, minimal Exam Edge geometric vector logo
// Deep slate background with razor-sharp geometric monogram (E with forward edge chevron)
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="112" fill="#0f172a" />
  <g transform="translate(136, 136)">
    <!-- Vertical stem -->
    <path d="M 28 24 H 68 V 216 H 28 Z" fill="#f8fafc" />
    <!-- Top arm with angled edge -->
    <path d="M 68 24 H 196 L 224 60 H 68 Z" fill="#f8fafc" />
    <!-- Middle arm - sharp forward edge arrow -->
    <path d="M 68 106 H 164 L 192 120 L 164 134 H 68 Z" fill="#38bdf8" />
    <!-- Bottom arm with angled edge -->
    <path d="M 68 180 H 224 L 196 216 H 68 Z" fill="#f8fafc" />
  </g>
</svg>`;

// Safe-zone friendly maskable version for Android PWA
const svgMaskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#0f172a" />
  <g transform="translate(156, 156) scale(0.85)">
    <path d="M 28 24 H 68 V 216 H 28 Z" fill="#f8fafc" />
    <path d="M 68 24 H 196 L 224 60 H 68 Z" fill="#f8fafc" />
    <path d="M 68 106 H 164 L 192 120 L 164 134 H 68 Z" fill="#38bdf8" />
    <path d="M 68 180 H 224 L 196 216 H 68 Z" fill="#f8fafc" />
  </g>
</svg>`;

async function generate() {
  fs.writeFileSync('public/favicon.svg', svgContent);
  fs.writeFileSync('public/icons/icon.svg', svgContent);

  const svgBuffer = Buffer.from(svgContent);
  const maskableBuffer = Buffer.from(svgMaskable);

  await sharp(svgBuffer).resize(192, 192).png().toFile('public/icons/icon-192.png');
  await sharp(svgBuffer).resize(512, 512).png().toFile('public/icons/icon-512.png');
  await sharp(svgBuffer).resize(180, 180).png().toFile('public/icons/apple-touch-icon.png');
  await sharp(maskableBuffer).resize(512, 512).png().toFile('public/icons/icon-maskable-512.png');
  await sharp(svgBuffer).resize(64, 64).png().toFile('public/favicon.png');

  console.log('Successfully generated Exam Edge minimal icons.');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
