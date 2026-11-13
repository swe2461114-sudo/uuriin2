// src/img/animals/ хавтсыг уншиж src/data/images.json үүсгэнэ.
// Нэршил: CT-02_001.jpg → CT-02 кодтой үүлдрийн 1-р зураг
import fs from "fs";
import path from "path";

const imageDir = path.join(process.cwd(), "src", "img", "animals");
const outputFile = path.join(process.cwd(), "src", "data", "images.json");

const isImageFile = (f) => /\.(jpg|jpeg|png|webp|svg)$/i.test(f);
const extractCode = (f) => {
  const m = f.match(/^([A-Z]{2}-\d{2})_\d{3}\.(jpg|jpeg|png|webp|svg)$/i);
  return m ? m[1] : null;
};

if (!fs.existsSync(imageDir)) {
  console.error(`Image directory not found: ${imageDir}`);
  process.exit(1);
}

const files = fs.readdirSync(imageDir).filter(isImageFile);
const map = {};
for (const f of files) {
  const code = extractCode(f);
  if (!code) continue;
  (map[code] ||= []).push(`img/animals/${f}`);
}
for (const code of Object.keys(map)) {
  map[code].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(map, null, 2), "utf-8");
console.log(`Generated: ${outputFile}`);
console.log(`Codes with images: ${Object.keys(map).length}, total files: ${files.length}`);
