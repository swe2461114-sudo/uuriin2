import { renderPageLayout } from "../layouts/pageLayout.js";
import { t, getLang } from "../i18n/i18n.js";
import { getAllLivestock } from "../services/livestockService.js";

export function renderOverviewPage() {
  const app = document.getElementById("app");
  const lang = getLang();

  const chips = getAllLivestock()
    .map(
      (a) => `
      <div class="card stat">
        <div class="animal-icon">${a.icon}</div>
        <h3>${a.name[lang]}</h3>
        <p class="stat-num">${a.unit}</p>
        <p class="muted">${t("overview.unitLabel")}</p>
      </div>`
    )
    .join("");

  app.innerHTML = renderPageLayout({
    id: "overview",
    sectionClass: "section hero",
    title: t("overview.title"),
    subtitle: t("overview.subtitle"),
    content: `
      <div class="actions">
        <a class="btn btn-primary" href="#/search">🔍 ${t("overview.cta1")}</a>
        <a class="btn btn-accent" href="#/calculation">🧮 ${t("overview.cta2")}</a>
      </div>
      <div class="grid grid-5">${chips}</div>
      <h2 class="section-title">${t("overview.stepsTitle")}</h2>
      <div class="grid grid-3">
        <div class="card"><h3>${t("overview.s1t")}</h3><p class="muted">${t("overview.s1d")}</p></div>
        <div class="card"><h3>${t("overview.s2t")}</h3><p class="muted">${t("overview.s2d")}</p></div>
        <div class="card"><h3>${t("overview.s3t")}</h3><p class="muted">${t("overview.s3d")}</p></div>
      </div>`,
  });
}
