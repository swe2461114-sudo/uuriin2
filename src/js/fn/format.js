export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Өгөгдлийн утгыг сонгосон хэлээр текст болгоно:
// тоо → "5", null → "—", {en,mn} → хэлээрээ, жагсаалт → "a, b"
export function formatValue(value, lang) {
  if (value === null || value === undefined) return "—";
  if (Array.isArray(value)) return value.map((v) => formatValue(v, lang)).join(", ");
  if (typeof value === "object") return value[lang] ?? value.en ?? "—";
  return String(value);
}
