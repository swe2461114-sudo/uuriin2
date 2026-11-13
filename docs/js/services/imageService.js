import { DATA_MODE, LOCAL_IMAGES_URL, API_IMAGES_URL } from "../config.js";

let imageCache = null;

// images.json: { "CT-02": ["img/animals/CT-02_001.svg", ...] }
async function getImageMap() {
  if (imageCache) return imageCache;
  const url = DATA_MODE === "api" ? API_IMAGES_URL : LOCAL_IMAGES_URL;
  try {
    const response = await fetch(url);
    imageCache = response.ok ? await response.json() : {};
  } catch {
    imageCache = {};
  }
  return imageCache;
}

export async function getImagesByCode(code) {
  const map = await getImageMap();
  return map[code] || [];
}

export async function getImageCounts() {
  const map = await getImageMap();
  return Object.fromEntries(Object.entries(map).map(([k, v]) => [k, v.length]));
}
