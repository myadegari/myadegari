// One-off: rasterize the Simple Icons SVG marks to PNG so next/image can
// optimize them without loosening next.config with dangerouslyAllowSVG.
import sharp from "sharp";
import { readdir, unlink } from "node:fs/promises";
import path from "node:path";

const dir = path.resolve("public/cert-logos");
const files = await readdir(dir);
const svgs = files.filter((f) => f.endsWith(".svg"));

for (const file of svgs) {
  const src = path.join(dir, file);
  const out = path.join(dir, file.replace(/\.svg$/, ".png"));
  // 96px source renders crisp at the 24px display size (4x)
  await sharp(src, { density: 384 })
    .resize(96, 96, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(out);
  await unlink(src);
  console.log(`${file} -> ${path.basename(out)}`);
}
