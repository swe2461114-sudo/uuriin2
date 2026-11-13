import { t } from "../i18n/i18n.js";
import { escapeHtml } from "../fn/format.js";

// Бүлгээр жагсаасан үүлдрүүд, checkbox-оор сонгож хайна
export function renderSearchGroupList(groups, selectedCodes = []) {
  return `
    <p class="menu-label">📋 ${t("search.groups")}</p>
    <ul class="menu-list">
      ${groups.map((g) => `
        <li>
          <a class="app-toggle-sublist" href="#" role="button"><span>${escapeHtml(g.groupName)} (${g.items.length})</span></a>
          <ul class="app-sublist is-hidden">
            ${g.items.map((i) => `
              <li><label class="app-sublist-item">
                <input type="checkbox" name="breedcode" value="${escapeHtml(i.code)}" ${selectedCodes.includes(i.code) ? "checked" : ""}>
                <span>${escapeHtml(i.name)}</span>
              </label></li>`).join("")}
          </ul>
        </li>`).join("")}
    </ul>
  `;
}
