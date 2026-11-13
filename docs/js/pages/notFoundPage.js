import { renderPageLayout } from "../layouts/pageLayout.js";
import { t } from "../i18n/i18n.js";

export function renderNotFoundPage() {
  document.getElementById("app").innerHTML = renderPageLayout({
    id: "notFound",
    title: t("notFound.title"),
    content: `<p class="center">${t("notFound.text")}</p>`,
  });
}
