import { renderPageLayout } from "../layouts/pageLayout.js";
import { t } from "../i18n/i18n.js";

const items = [
  { key: "nso", url: "https://www.nso.mn" },
  { key: "fao", url: "https://www.fao.org/mongolia" },
  { key: "mofa", url: "https://mofa.gov.mn" },
];

export function renderResourcesPage() {
  const app = document.getElementById("app");
  app.innerHTML = renderPageLayout({
    id: "resources",
    title: t("resources.title"),
    subtitle: t("resources.subtitle"),
    content: `<div class="grid grid-3">${items
      .map(
        (i) => `<div class="card">
          <h3>${t("resources." + i.key)}</h3>
          <p class="muted">${t("resources." + i.key + "Desc")}</p>
          <a class="btn btn-primary" href="${i.url}" target="_blank" rel="noopener">${t("resources.open")} ↗</a>
        </div>`
      )
      .join("")}</div>`,
  });
}
