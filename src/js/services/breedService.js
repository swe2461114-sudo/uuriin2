import { DATA_MODE, LOCAL_BREEDS_URL, API_BREEDS_URL } from "../config.js";

let breedCache = null;

// Page нь өгөгдөл хаанаас ирж байгааг мэдэхгүй, зөвхөн getBreeds() дууддаг.
export async function getBreeds() {
  if (breedCache) return breedCache;

  const url = DATA_MODE === "api" ? API_BREEDS_URL : LOCAL_BREEDS_URL;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to load breeds data");

  breedCache = await response.json();
  return breedCache;
}

// group-ээр бүлэглэнэ: [{ groupName, items: [{ code, name }] }]
export function buildGroups(data, lang) {
  const grouped = new Map();
  for (const item of data) {
    const groupName = item.group[lang];
    if (!grouped.has(groupName)) grouped.set(groupName, []);
    grouped.get(groupName).push({ code: item.code, name: item.name[lang] });
  }
  return [...grouped.entries()].map(([groupName, items]) => ({
    groupName,
    items: items.sort((a, b) => a.name.localeCompare(b.name, lang)),
  }));
}

// Нэр (МН/EN), латин нэр, кодоор хайна
export function findByKeyword(data, keyword) {
  const q = keyword.trim().toLowerCase();
  if (!q) return [];
  return data.filter(
    (b) =>
      b.name.mn.toLowerCase().includes(q) ||
      b.name.en.toLowerCase().includes(q) ||
      b.code.toLowerCase().includes(q) ||
      String(b.general["Scientific name"]).toLowerCase().includes(q)
  );
}

export function findByCodes(data, codes) {
  return data.filter((b) => codes.includes(b.code));
}
