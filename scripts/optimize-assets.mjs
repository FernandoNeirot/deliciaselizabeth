import { readdir, readFile, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ASSETS_DIR = path.resolve("public/assets");
const MAX_SIZE_BYTES = 50 * 1024;
const MAX_LONGEST_SIDE_PX = 1200;
const LOGO_MAX_SIDE_PX = 320;
const MIN_QUALITY = 25;
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function getMaxSide(fileName) {
  return fileName.startsWith("logo") ? LOGO_MAX_SIDE_PX : MAX_LONGEST_SIDE_PX;
}

async function resizeBuffer(imageBuffer, maxSide) {
  const meta = await sharp(imageBuffer).metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  const needsResize = width > maxSide || height > maxSide;

  if (!needsResize) {
    return sharp(imageBuffer).rotate().toBuffer();
  }

  return sharp(imageBuffer)
    .rotate()
    .resize(maxSide, maxSide, { fit: "inside", withoutEnlargement: true })
    .toBuffer();
}

async function optimizeImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const baseName = path.basename(inputPath, ext);
  const outputPath = path.join(ASSETS_DIR, `${baseName}.webp`);
  const maxSide = getMaxSide(baseName);

  const imageBuffer = await readFile(inputPath);
  const resizedBuffer = await resizeBuffer(imageBuffer, maxSide);

  let quality = 60;
  let optimizedBuffer;

  for (;;) {
    optimizedBuffer = await sharp(resizedBuffer).webp({ quality }).toBuffer();
    if (optimizedBuffer.length <= MAX_SIZE_BYTES || quality <= MIN_QUALITY) break;
    quality = Math.max(MIN_QUALITY, quality - 10);
  }

  await writeFile(outputPath, optimizedBuffer);

  if (inputPath !== outputPath) {
    await unlink(inputPath);
  }

  return {
    input: path.basename(inputPath),
    output: path.basename(outputPath),
    sizeKb: (optimizedBuffer.length / 1024).toFixed(1),
    quality,
  };
}

async function main() {
  const entries = await readdir(ASSETS_DIR, { withFileTypes: true });
  const imageFiles = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort();

  if (imageFiles.length === 0) {
    console.log("No images found in public/assets");
    return;
  }

  console.log(`Optimizing ${imageFiles.length} images...\n`);

  const results = [];

  for (const fileName of imageFiles) {
    const inputPath = path.join(ASSETS_DIR, fileName);
    const result = await optimizeImage(inputPath);
    results.push(result);
    console.log(`${result.input} -> ${result.output} (${result.sizeKb} KB, q${result.quality})`);
  }

  const overLimit = results.filter((r) => Number(r.sizeKb) > 50);
  if (overLimit.length > 0) {
    console.warn("\nWarning: some files still exceed 50 KB:");
    overLimit.forEach((r) => console.warn(`  ${r.output}: ${r.sizeKb} KB`));
    process.exitCode = 1;
  } else {
    console.log("\nAll images optimized to WebP under 50 KB.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
