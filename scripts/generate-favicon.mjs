import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import toIco from "to-ico";

const LOGO_PATH = path.resolve("public/assets/logo.webp");
const APP_DIR = path.resolve("src/app");

async function generateFavicons() {
  const sizes = [
    { name: "icon.png", size: 32 },
    { name: "apple-icon.png", size: 180 },
  ];

  for (const { name, size } of sizes) {
    const buffer = await sharp(LOGO_PATH)
      .resize(size, size, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    await writeFile(path.join(APP_DIR, name), buffer);
    console.log(`Created src/app/${name} (${size}x${size})`);
  }

  const faviconSizes = [16, 32, 48];
  const faviconBuffers = await Promise.all(
    faviconSizes.map((size) =>
      sharp(LOGO_PATH)
        .resize(size, size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toBuffer(),
    ),
  );

  const faviconBuffer = await toIco(faviconBuffers);
  await writeFile(path.join(APP_DIR, "favicon.ico"), faviconBuffer);
  console.log("Created src/app/favicon.ico");
}

generateFavicons().catch((error) => {
  console.error(error);
  process.exit(1);
});
