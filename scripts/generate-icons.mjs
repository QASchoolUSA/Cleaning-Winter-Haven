import fs from "fs";
import path from "path";
import sharp from "sharp";

const srcSvg = path.resolve("public", "favicon.svg");
const outDir = path.resolve("public", "icons");

async function main() {
  if (!fs.existsSync(srcSvg)) {
    console.error("Source SVG not found at public/favicon.svg");
    process.exit(1);
  }

  await fs.promises.mkdir(outDir, { recursive: true });

  const targets = [
    { file: "favicon-16x16.png", size: 16 },
    { file: "favicon-32x32.png", size: 32 },
    { file: "favicon-48x48.png", size: 48 },
    { file: "apple-touch-icon.png", size: 180 },
    { file: "android-chrome-192x192.png", size: 192 },
    { file: "android-chrome-512x512.png", size: 512 },
  ];

  for (const t of targets) {
    const outPath = path.join(outDir, t.file);
    await sharp(srcSvg)
      .resize(t.size, t.size, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(outPath);
    console.log(`Generated ${t.file}`);
  }

  console.log("Done. Icons are in /public/icons");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
