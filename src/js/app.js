import { renderNavbar, initNavbar, setActiveLink } from "./components/navbar.js";
import { initRouter } from "./router.js";
import { routes } from "./routes.js";
import { t, getLang } from "./i18n/i18n.js";

const navbarRoot = document.getElementById("navbar");
const footerRoot = document.getElementById("footer");

function mountShell() {
  navbarRoot.innerHTML = renderNavbar();
  initNavbar();
  footerRoot.textContent = t("footer");
  document.title = t("meta.title");
  document.documentElement.lang = getLang();
}

mountShell();
const router = initRouter(routes);

window.addEventListener("hashchange", setActiveLink);
window.addEventListener("langchange", () => {
  mountShell();
  router.refresh();
});
