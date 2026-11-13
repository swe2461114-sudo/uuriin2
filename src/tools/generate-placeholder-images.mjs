// Жишиг SVG зураг үүсгэнэ (бодит зураг оруулах хүртэл). Нэршил: CODE_001.svg
import fs from "fs";

const breeds = JSON.parse(fs.readFileSync(new URL("../data/breeds.json", import.meta.url), "utf-8"));
const outDir = new URL("../img/animals/", import.meta.url);
fs.mkdirSync(outDir, { recursive: true });

const colors = { Camels: "#e0b45a", Horses: "#a9794e", Cattle: "#6f9d6b", Sheep: "#8fb4d9", Goats: "#c99a8a", Reindeer: "#8d86c4" };
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

for (const b of breeds) {
  const c = colors[b.group.en] || "#999";
  const card1 = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c}"/><stop offset="1" stop-color="#1f4e8c"/></linearGradient></defs>
<rect width="800" height="520" fill="url(#g)"/>
<text x="400" y="290" font-size="220" text-anchor="middle">${b.icon}</text>
<text x="400" y="400" font-size="40" fill="#fff" text-anchor="middle" font-family="Arial" font-weight="700">${esc(b.name.en)}</text>
<text x="400" y="450" font-size="28" fill="#fff" text-anchor="middle" font-family="Arial">${esc(b.name.mn)}</text>
</svg>`;
  const unit = b.biology["Sheep unit coefficient"] ?? "-";
  const prods = b.usage["Main products"].map((p) => p.en).join(", ");
  const card2 = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520">
<rect width="800" height="520" fill="#f6f3ec"/><rect x="30" y="30" width="740" height="460" rx="24" fill="#fff" stroke="${c}" stroke-width="6"/>
<text x="70" y="110" font-size="50" font-family="Arial" font-weight="700" fill="#163a69">${b.icon} ${esc(b.code)}</text>
<text x="70" y="180" font-size="34" font-family="Arial" fill="#25303b">${esc(b.name.en)}</text>
<text x="70" y="270" font-size="30" font-family="Arial" fill="#6b7684">Sheep unit: ${unit}</text>
<text x="70" y="330" font-size="30" font-family="Arial" fill="#6b7684">Gestation: ${b.biology["Gestation (months, approx.)"]} months</text>
<text x="70" y="390" font-size="30" font-family="Arial" fill="#6b7684">Products: ${esc(prods)}</text>
<text x="70" y="455" font-size="22" font-family="Arial" fill="#999">Illustrative placeholder image</text>
</svg>`;
  fs.writeFileSync(new URL(`${b.code}_001.svg`, outDir), card1);
  fs.writeFileSync(new URL(`${b.code}_002.svg`, outDir), card2);
}
console.log(`Generated ${breeds.length * 2} placeholder images`);
