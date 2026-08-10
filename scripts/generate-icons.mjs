import fs from "fs";
import path from "path";
import sharp from "sharp";

const BRAND_NAVY = { r: 29, g: 50, b: 68, alpha: 1 }; // #1d3244
const BRAND_NAVY_HEX = "#1d3244";
/** White mark — needs opaque dark ground for light browser chrome. */
const srcPng = path.resolve("ICON", "ICON-PNG-white.png");
const outDir = path.resolve("public", "icons");
const faviconSvgPath = path.resolve("public", "favicon.svg");

/**
 * Center white mark on opaque navy with safe padding.
 * Used for all favicon / touch / PWA sizes (white is invisible on light tabs).
 */
async function navyPaddedIcon(size, padFraction) {
  const pad = Math.round(size * padFraction);
  const inner = Math.max(1, size - pad * 2);
  const mark = await sharp(srcPng)
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BRAND_NAVY,
    },
  })
    .composite([{ input: mark, gravity: "centre" }])
    .png()
    .toBuffer();
}

async function writeFaviconSvg() {
  // Embed a crisp white-on-navy PNG so the SVG favicon stays visible everywhere.
  const png = await navyPaddedIcon(128, 0.12);
  const b64 = png.toString("base64");
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128" role="img" aria-label="Cleaning Winter Haven">
  <rect width="128" height="128" rx="24" fill="${BRAND_NAVY_HEX}"/>
  <image width="128" height="128" href="data:image/png;base64,${b64}" xlink:href="data:image/png;base64,${b64}"/>
</svg>
`;
  await fs.promises.writeFile(faviconSvgPath, svg);
  console.log("Generated public/favicon.svg (white mark on navy)");
}

async function main() {
  if (!fs.existsSync(srcPng)) {
    console.error(`Source PNG not found at ${srcPng}`);
    process.exit(1);
  }

  await fs.promises.mkdir(outDir, { recursive: true });

  // Small tab icons also need navy — pure white mark vanishes on white chrome.
  const tabTargets = [
    { file: "favicon-16x16.png", size: 16, pad: 0.1 },
    { file: "favicon-32x32.png", size: 32, pad: 0.1 },
    { file: "favicon-48x48.png", size: 48, pad: 0.1 },
  ];

  for (const t of tabTargets) {
    const buf = await navyPaddedIcon(t.size, t.pad);
    await fs.promises.writeFile(path.join(outDir, t.file), buf);
    console.log(`Generated ${t.file}`);
  }

  const navyTargets = [
    { file: "apple-touch-icon.png", size: 180, pad: 0.11 },
    { file: "android-chrome-192x192.png", size: 192, pad: 0.11 },
    { file: "android-chrome-512x512.png", size: 512, pad: 0.11 },
    { file: "android-chrome-512x512-maskable.png", size: 512, pad: 0.2 },
  ];

  for (const t of navyTargets) {
    const buf = await navyPaddedIcon(t.size, t.pad);
    await fs.promises.writeFile(path.join(outDir, t.file), buf);
    console.log(`Generated ${t.file}`);
  }

  await writeFaviconSvg();
  console.log("Done. Icons are in /public/icons");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
