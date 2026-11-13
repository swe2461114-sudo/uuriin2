import { t } from "../i18n/i18n.js";
import { escapeHtml } from "../fn/format.js";

// Хүснэгтэд харуулах хэсгүүдийг сонгох checkbox-ууд
export const sectionGroups = [
  { groupKey: "mainInfo", items: [
    { value: "general", checked: true },
    { value: "biology", checked: true },
    { value: "usage", checked: true },
  ]},
  { groupKey: "extraInfo", items: [
    { value: "adaptation", checked: false },
    { value: "notes", checked: false },
    { value: "images", checked: false },
  ]},
];

export const DEFAULT_SECTIONS = sectionGroups[0].items.filter((i) => i.checked).map((i) => i.value);

function renderGroup(group, selected) {
  return `
    <li>
      <a class="app-toggle-sublist" href="#" role="button"><span>${t("settings." + group.groupKey)}</span></a>
      <ul class="app-sublist">
        ${group.items.map((item) => `
          <li><label class="app-sublist-item">
            <input type="checkbox" name="section" value="${escapeHtml(item.value)}" ${selected.includes(item.value) ? "checked" : ""}>
            <span>${t("sections." + item.value)}</span>
          </label></li>`).join("")}
      </ul>
    </li>`;
}

export function renderSearchSettings(selected = DEFAULT_SECTIONS) {
  return `
    <p class="menu-label">🛠 ${t("search.settings")}</p>
    <ul class="menu-list">${sectionGroups.map((g) => renderGroup(g, selected)).join("")}</ul>
  `;
}
