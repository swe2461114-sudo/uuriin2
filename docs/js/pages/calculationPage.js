import { renderPageLayout } from "../layouts/pageLayout.js";
import { t, getLang } from "../i18n/i18n.js";
import { getAllLivestock, calculateHerd } from "../services/livestockService.js";

const DEFAULT_COUNTS = { camel: 10, horse: 30, cattle: 20, sheep: 300, goat: 200 };
const DEFAULT_PARAMS = { pastureHa: 1, hayKg: 1.5, days: 120 };
const fmt = (n, d = 1) => Number(n.toFixed(d)).toLocaleString("en-US");

export function renderCalculationPage() {
  const app = document.getElementById("app");
  const lang = getLang();
  const animals = getAllLivestock();

  const herdInputs = animals
    .map(
      (a) => `<label class="field">
        <span>${a.icon} ${a.name[lang]} <small class="muted">×${a.unit}</small></span>
        <input class="input" type="number" min="0" data-count="${a.id}" value="${DEFAULT_COUNTS[a.id]}" />
      </label>`
    )
    .join("");

  app.innerHTML = renderPageLayout({
    id: "calculation",
    title: t("calc.title"),
    subtitle: t("calc.subtitle"),
    content: `
      <div class="grid grid-2">
        <div class="card">
          <h2>${t("calc.herd")}</h2>${herdInputs}
          <h2>${t("calc.params")}</h2>
          <label class="field"><span>${t("calc.pasture")}</span>
            <input class="input" type="number" min="0" step="0.1" data-param="pastureHa" value="${DEFAULT_PARAMS.pastureHa}" /></label>
          <label class="field"><span>${t("calc.hay")}</span>
            <input class="input" type="number" min="0" step="0.1" data-param="hayKg" value="${DEFAULT_PARAMS.hayKg}" /></label>
          <label class="field"><span>${t("calc.days")}</span>
            <input class="input" type="number" min="0" data-param="days" value="${DEFAULT_PARAMS.days}" /></label>
          <p class="muted note">ℹ️ ${t("calc.note")}</p>
          <button class="btn btn-light" id="resetBtn">↺ ${t("calc.reset")}</button>
        </div>
        <div class="card" id="calcResult"></div>
      </div>`,
  });

  const inputs = app.querySelectorAll("input[data-count], input[data-param]");

  function update() {
    const counts = {}, params = {};
    inputs.forEach((i) => {
      if (i.dataset.count) counts[i.dataset.count] = i.value;
      else params[i.dataset.param] = i.value;
    });
    const r = calculateHerd(counts, params);

    const bars = r.rows
      .map((row, i) => {
        const a = animals[i];
        const pct = r.totalUnits ? (row.units / r.totalUnits) * 100 : 0;
        return `<div class="bar-row">
          <span class="bar-label">${a.icon} ${a.name[lang]}</span>
          <div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div>
          <span class="bar-val">${fmt(pct, 0)}%</span></div>`;
      })
      .join("");

    document.getElementById("calcResult").innerHTML = `
      <h2>${t("calc.results")}</h2>
      <div class="kpis">
        <div class="kpi"><p>${t("calc.totalHeads")}</p><b>${fmt(r.totalHeads, 0)}</b></div>
        <div class="kpi kpi-main"><p>${t("calc.totalUnits")}</p><b>${fmt(r.totalUnits)}</b></div>
        <div class="kpi"><p>${t("calc.totalPasture")}</p><b>${fmt(r.pastureHa)}</b></div>
        <div class="kpi"><p>${t("calc.totalHay")}</p><b>${fmt(r.hayTonnes)}</b></div>
      </div>
      <h3>${t("calc.share")}</h3>${bars}`;
  }

  inputs.forEach((i) => i.addEventListener("input", update));
  document.getElementById("resetBtn").addEventListener("click", renderCalculationPage);
  update();
}
