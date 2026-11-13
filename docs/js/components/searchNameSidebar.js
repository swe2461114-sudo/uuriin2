import { t } from "../i18n/i18n.js";
import { escapeHtml } from "../fn/format.js";

export function renderSearchName(keyword = "") {
  return `
    <p class="menu-label">🔍 ${t("search.byName")}</p>
    <div class="search-box">
      <input id="searchTxt" class="input" type="text" value="${escapeHtml(keyword)}" placeholder="${t("search.placeholder")}" />
      <button id="searchBtn" class="btn btn-primary" type="button">${t("search.btn")}</button>
    </div>
  `;
}
