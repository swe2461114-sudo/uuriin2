import { translations } from "./translations.js";

const KEY = "herder-lang";
let current = localStorage.getItem(KEY) || "mn";

export function getLang() {
  return current;
}

export function setLang(lang) {
  if (!translations[lang]) return;
  current = lang;
  localStorage.setItem(KEY, lang);
  document.documentElement.lang = lang;
  window.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
}

export function toggleLang() {
  setLang(current === "mn" ? "en" : "mn");
}

// t("overview.title") → тухайн хэл дээрх текст
export function t(path) {
  const value = path
    .split(".")
    .reduce((obj, k) => (obj ? obj[k] : undefined), translations[current]);
  return value ?? path;
}

// Өгөгдлийн талбарын (label) орчуулга: tl("Origin") → "Гарал үүсэл"; олдохгүй бол англи хэвээр
export function tl(label) {
  return translations[current].labels?.[label] ?? label;
}
