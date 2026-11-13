import { renderPageLayout } from "../layouts/pageLayout.js";
import { t } from "../i18n/i18n.js";

export function renderContactPage() {
  const app = document.getElementById("app");
  app.innerHTML = renderPageLayout({
    id: "contact",
    title: t("contact.title"),
    subtitle: t("contact.subtitle"),
    containerClass: "container narrow",
    content: `
      <form id="contactForm" class="card" novalidate>
        <label class="field"><span>${t("contact.name")}</span><input class="input" name="name" /><small class="error" data-err="name"></small></label>
        <label class="field"><span>${t("contact.email")}</span><input class="input" name="email" type="email" /><small class="error" data-err="email"></small></label>
        <label class="field"><span>${t("contact.message")}</span><textarea class="input" name="message" rows="4"></textarea><small class="error" data-err="message"></small></label>
        <button class="btn btn-primary" type="submit">${t("contact.send")}</button>
        <p id="thanks" class="success"></p>
      </form>`,
  });

  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(form);
    const errors = {
      name: f.get("name").trim() ? "" : t("contact.errName"),
      email: /^\S+@\S+\.\S+$/.test(f.get("email")) ? "" : t("contact.errEmail"),
      message: f.get("message").trim().length >= 10 ? "" : t("contact.errMsg"),
    };
    Object.entries(errors).forEach(([k, v]) => {
      form.querySelector(`[data-err="${k}"]`).textContent = v;
    });
    const ok = Object.values(errors).every((v) => !v);
    document.getElementById("thanks").textContent = ok ? t("contact.thanks") : "";
    if (ok) form.reset();
  });
}
