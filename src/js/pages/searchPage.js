import { renderSidebarPageLayout } from "../layouts/sidebarPageLayout.js";
import { renderNotification } from "../layouts/notificationLayout.js";
import { renderSearchName } from "../components/searchNameSidebar.js";
import { renderSearchSettings } from "../components/searchSettingsSidebar.js";
import { renderSearchGroupList } from "../components/searchGroupListSidebar.js";
import { renderImageModal, bindImageModalEvents } from "../components/imageModal.js";
import { bindSidebar, bindMenuListToggle } from "../fn/sidebarEvents.js";
import { initSearch, searchState } from "../fn/searchEvents.js";
import { getBreeds, buildGroups } from "../services/breedService.js";
import { t, getLang } from "../i18n/i18n.js";

export async function renderSearchPage() {
  const app = document.getElementById("app");
  app.innerHTML = `<section class="section"><div class="container">${renderNotification(t("search.loading"))}</div></section>`;

  try {
    const breeds = await getBreeds();
    const groups = buildGroups(breeds, getLang());

    app.innerHTML =
      renderSidebarPageLayout({
        pageId: "search",
        pageTitle: t("search.title"),
        pageSubtitle: `${t("search.loaded")}: ${breeds.length}`,
        sidebarContent:
          renderSearchName(searchState.keyword) +
          renderSearchSettings(searchState.sections) +
          renderSearchGroupList(groups, searchState.codes),
        mainContent: `<div id="searchResult"></div>`,
      }) + renderImageModal();

    bindSidebar();
    bindMenuListToggle();
    bindImageModalEvents();
    initSearch(breeds);
  } catch (error) {
    console.error(error);
    app.innerHTML = `<section class="section"><div class="container">${renderNotification(t("search.failed"), "danger")}</div></section>`;
  }
}
