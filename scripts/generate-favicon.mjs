import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import toIco from "to-ico";

const LOGO_PATH = path.resolve("public/assets/logo.webp");
const APP_DIR = path.resolve("src/app");
const PUBLIC_DIR = path.resolve("public");
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

async function logoOnWhite(size) {
  return sharp(LOGO_PATH)
    .resize(size, size, {
      fit: "contain",
      background: WHITE,
    })
    .flatten({ background: WHITE })
    .png()
    .toBuffer();
}

async function generateFavicons() {
  const sizes = [
    { name: "icon.png", size: 32 },
    { name: "apple-icon.png", size: 180 },
  ];

  for (const { name, size } of sizes) {
    const buffer = await logoOnWhite(size);
    await writeFile(path.join(APP_DIR, name), buffer);
    console.log(`Created src/app/${name} (${size}x${size}, fondo blanco)`);
  }

  const faviconSizes = [16, 32, 48];
  const faviconBuffers = await Promise.all(faviconSizes.map((size) => logoOnWhite(size)));
  const faviconBuffer = await toIco(faviconBuffers);
  await writeFile(path.join(APP_DIR, "favicon.ico"), faviconBuffer);
  console.log("Created src/app/favicon.ico (fondo blanco)");
}

async function generateOgImage() {
  const width = 1200;
  const height = 630;
  const logo = await sharp(LOGO_PATH)
    .resize(520, 420, {
      fit: "inside",
      background: WHITE,
    })
    .flatten({ background: WHITE })
    .png()
    .toBuffer();

  const ogBuffer = await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: WHITE,
    },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toBuffer();

  await mkdir(PUBLIC_DIR, { recursive: true });
  await writeFile(path.join(PUBLIC_DIR, "og-image.png"), ogBuffer);
  console.log(`Created public/og-image.png (${width}x${height}, fondo blanco)`);
}

async function main() {
  await generateFavicons();
  await generateOgImage();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
