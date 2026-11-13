// Өгөгдлөөс тухайн талбарын давтагдахгүй утгуудыг гаргана (орчуулгын толь бэлдэхэд).
// Ажиллуулах: node src/tools/searchUniqueField.mjs group
import fs from "fs";

const field = process.argv[2] || "group";
const file = new URL("./breeds.en.json", import.meta.url);
const data = JSON.parse(fs.readFileSync(file, "utf-8"));

// "general.Origin" гэх мэт зам, эсвэл дээд түвшний талбар
function getValue(item, pathStr) {
  return pathStr.split(".").reduce((o, k) => (o ? o[k] : undefined), item);
}

const unique = new Set();
for (const item of data) {
  const v = getValue(item, field);
  (Array.isArray(v) ? v : [v]).filter((x) => typeof x === "string").forEach((x) => unique.add(x));
}
console.log(`Field "${field}": ${unique.size} unique values`);
[...unique].sort().forEach((v) => console.log(" -", v));
