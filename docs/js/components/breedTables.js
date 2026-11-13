import { t, tl, getLang } from "../i18n/i18n.js";
import { escapeHtml, formatValue } from "../fn/format.js";

function renderSectionTable(sectionKey, data, lang) {
  const rows = Object.entries(data[sectionKey] || {})
    .map(([label, value]) => `<tr><th>${escapeHtml(tl(label))}</th><td>${escapeHtml(formatValue(value, lang))}</td></tr>`)
    .join("");
  return `
    <div class="table-block">
      <h4>${t("sections." + sectionKey)}</h4>
      <table class="data-table"><tbody>${rows}</tbody></table>
    </div>`;
}

// Нэг үүлдрийн карт: гарчиг + сонгосон хэсгүүдийн хүснэгт
function renderBreedCard(breed, sections, imageCounts, lang) {
  const showImages = sections.includes("images");
  const imgCount = imageCounts[breed.code] || 0;
  const tableSections = sections.filter((s) => s !== "images");

  return `
    <article class="card breed-card">
      <header class="breed-head">
        <div class="breed-title">
          <span class="animal-icon">${breed.icon}</span>
          <div>
            <h3>${escapeHtml(breed.name[lang])}</h3>
            <p class="muted">${escapeHtml(breed.code)} · <span class="tag">${escapeHtml(breed.group[lang])}</span></p>
          </div>
        </div>
        ${showImages && imgCount ? `
          <button class="btn btn-accent open-image-btn" type="button"
            data-code="${escapeHtml(breed.code)}" data-name="${escapeHtml(breed.name[lang])}">
            🖼 ${t("search.images")} (${imgCount})
          </button>` : ""}
      </header>
      <div class="table-grid">
        ${tableSections.map((s) => renderSectionTable(s, breed, lang)).join("")}
      </div>
    </article>`;
}

export function renderBreedTables(items, sections, imageCounts = {}) {
  const lang = getLang();
  return items.map((b) => renderBreedCard(b, sections, imageCounts, lang)).join("");
}
