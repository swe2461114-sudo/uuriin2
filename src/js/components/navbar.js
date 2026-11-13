import { t, toggleLang } from "../i18n/i18n.js";

const links = [
  { href: "#/overview", icon: "🏠", key: "overview" },
  { href: "#/search", icon: "🔍", key: "search" },
  { href: "#/calculation", icon: "🧮", key: "calculation" },
  { href: "#/resources", icon: "📚", key: "resources" },
  { href: "#/contact", icon: "✉️", key: "contact" },
];

export function renderNavbar() {
  return `
    <header class="app-navbar">
      <nav class="container nav-inner" aria-label="main navigation">
        <a class="brand" href="#/overview">
          <span class="brand-logo">🐑</span>
          <span><b>${t("nav.brandSpan")}</b> ${t("nav.brand")}</span>
        </a>

        <button class="burger" id="burger" aria-label="menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>

        <div class="nav-menu" id="navMenu">
          ${links
            .map(
              (l) => `<a class="nav-link" data-href="${l.href}" href="${l.href}">
                <span>${l.icon}</span> ${t("nav." + l.key)}</a>`
            )
            .join("")}
          <button class="lang-btn" id="langBtn">🌐 ${t("nav.language")}</button>
        </div>
      </nav>
    </header>
  `;
}

export function setActiveLink() {
  const hash = window.location.hash || "#/overview";
  document.querySelectorAll(".nav-link").forEach((a) => {
    a.classList.toggle("is-active", a.dataset.href === hash);
  });
}

export function initNavbar() {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("navMenu");
  const langBtn = document.getElementById("langBtn");

  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
  });
  menu.addEventListener("click", (e) => {
    if (e.target.closest(".nav-link")) menu.classList.remove("is-open");
  });
  langBtn.addEventListener("click", toggleLang);
  setActiveLink();
}
