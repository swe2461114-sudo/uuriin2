import { renderNotification } from "../layouts/notificationLayout.js";
import { renderBreedTables } from "../components/breedTables.js";
import { DEFAULT_SECTIONS } from "../components/searchSettingsSidebar.js";
import { findByKeyword, findByCodes } from "../services/breedService.js";
import { getImageCounts } from "../services/imageService.js";
import { DEFAULT_ITEM_COUNT } from "../config.js";
import { t } from "../i18n/i18n.js";

// Хэл солигдож page дахин зурагдсан ч сонголт хадгалагдахын тулд модуль түвшинд хадгална
export const searchState = { keyword: "", codes: [], sections: [...DEFAULT_SECTIONS] };

let data = [];

const resultEl = () => document.getElementById("searchResult");
const selectedValues = (name) => [...document.querySelectorAll(`input[name="${name}"]:checked`)].map((i) => i.value);

async function renderResults() {
  const imageCounts = await getImageCounts();
  let items;

  if (searchState.codes.length) {
    items = findByCodes(data, searchState.codes);
  } else if (searchState.keyword) {
    items = findByKeyword(data, searchState.keyword);
    if (!items.length) {
      resultEl().innerHTML = renderNotification(t("search.noResult"), "warning");
      return;
    }
  } else {
    items = data.slice(0, DEFAULT_ITEM_COUNT); // анхны байдалд эхний хэдэн үүлдрийг харуулна
  }

  const info = `<p class="muted">${items.length} ${t("search.found")}</p>`;
  resultEl().innerHTML = info + renderBreedTables(items, searchState.sections, imageCounts);
}

function handleTextSearch() {
  const keyword = document.getElementById("searchTxt").value.trim();
  document.querySelectorAll('input[name="breedcode"]').forEach((c) => (c.checked = false));
  searchState.codes = [];
  searchState.keyword = keyword;

  if (!keyword) {
    resultEl().innerHTML = renderNotification(t("search.enterName"), "warning");
    return;
  }
  renderResults();
}

function handleCodeSearch() {
  document.getElementById("searchTxt").value = "";
  searchState.keyword = "";
  searchState.codes = selectedValues("breedcode");
  renderResults();
}

function handleSectionChange() {
  searchState.sections = selectedValues("section");
  renderResults();
}

export function initSearch(breeds) {
  data = breeds;
  const root = document.getElementById("searchRoot");

  document.getElementById("searchBtn").addEventListener("click", handleTextSearch);
  document.getElementById("searchTxt").addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); handleTextSearch(); }
  });

  root.addEventListener("change", (e) => {
    if (e.target.matches('input[name="breedcode"]')) handleCodeSearch();
    if (e.target.matches('input[name="section"]')) handleSectionChange();
  });

  renderResults();
}
