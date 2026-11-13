// breeds.en.json + dictionary.mn.json → src/data/breeds.json (хоёр хэлтэй)
// Текст утга бүр { en, mn } болно. Толь дутвал алдаа гаргаж зогсоно.
import fs from "fs";

const read = (name) => JSON.parse(fs.readFileSync(new URL(name, import.meta.url), "utf-8"));
const data = read("./breeds.en.json");
const dict = read("./dictionary.mn.json");
const SKIP = new Set(["Scientific name"]); // Латин нэр орчуулагдахгүй
const missing = new Set();

function tr(text) {
  if (!dict[text]) missing.add(text);
  return { en: text, mn: dict[text] ?? text };
}

function convertValue(key, value) {
  if (SKIP.has(key) || value === null || typeof value === "number") return value;
  if (Array.isArray(value)) return value.map(tr);
  return tr(value);
}

function convertSection(section) {
  return Object.fromEntries(Object.entries(section).map(([k, v]) => [k, convertValue(k, v)]));
}

const out = data.map((item) => ({
  code: item.code,
  icon: item.icon,
  group: tr(item.group),
  name: tr(item.name),
  general: convertSection(item.general),
  biology: convertSection(item.biology),
  usage: convertSection(item.usage),
  adaptation: convertSection(item.adaptation),
  notes: convertSection(item.notes),
}));

if (missing.size) {
  console.error("Орчуулга дутуу:", [...missing]);
  process.exit(1);
}

const outFile = new URL("../data/breeds.json", import.meta.url);
fs.writeFileSync(outFile, JSON.stringify(out, null, 2), "utf-8");
console.log(`Generated breeds.json: ${out.length} records`);
