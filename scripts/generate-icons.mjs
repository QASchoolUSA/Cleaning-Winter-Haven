import fs from "fs";
import path from "path";
import sharp from "sharp";

const BRAND_NAVY = { r: 29, g: 50, b: 68, alpha: 1 }; // #1d3244
const srcPng = path.resolve("ICON", "ICON-PNG-color.png");
const outDir = path.resolve("public", "icons");

/** Resize mark with transparent background and slight inset. */
async function transparentFavicon(size) {
  const inset = Math.max(1, Math.round(size * 0.06));
  const inner = size - inset * 2;
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
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: mark, gravity: "centre" }])
    .png()
    .toBuffer();
}

/**
 * Center mark on opaque navy with safe padding (fraction of canvas).
 * Used for Apple touch, Android chrome, and maskable PWA icons.
 */
async function navyPaddedIcon(size, padFraction) {
  const pad = Math.round(size * padFraction);
  const inner = size - pad * 2;
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

async function main() {
  if (!fs.existsSync(srcPng)) {
    console.error(`Source PNG not found at ${srcPng}`);
    process.exit(1);
  }

  await fs.promises.mkdir(outDir, { recursive: true });

  const transparentTargets = [
    { file: "favicon-16x16.png", size: 16 },
    { file: "favicon-32x32.png", size: 32 },
    { file: "favicon-48x48.png", size: 48 },
  ];

  for (const t of transparentTargets) {
    const buf = await transparentFavicon(t.size);
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

  console.log("Done. Icons are in /public/icons");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
