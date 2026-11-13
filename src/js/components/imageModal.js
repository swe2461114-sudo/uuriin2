import { getImagesByCode } from "../services/imageService.js";
import { t } from "../i18n/i18n.js";

let images = [];
let index = 0;
let zoom = 1, tx = 0, ty = 0;
let dragging = false, sx = 0, sy = 0;
let bound = false;

export function renderImageModal() {
  return `
    <div id="imageModal" class="modal">
      <div class="modal-bg" id="modalBg"></div>
      <div class="modal-card">
        <header class="modal-head">
          <p id="modalImgTitle" class="modal-title"></p>
          <button class="btn btn-light" id="fullscreenBtn" type="button" aria-label="Fullscreen">⛶</button>
          <button class="btn btn-light" id="closeImgModalBtn" type="button" aria-label="Close">✕</button>
        </header>
        <section class="modal-body">
          <div class="modal-stage"><img id="slideshowImage" draggable="false" src="" alt="" /></div>
          <div class="modal-nav">
            <button class="btn btn-primary" id="prevImageBtn" type="button">←</button>
            <span id="imageCounter" class="muted"></span>
            <button class="btn btn-primary" id="nextImageBtn" type="button">→</button>
          </div>
          <p class="muted center">${t("search.zoomHint")}</p>
        </section>
      </div>
    </div>`;
}

const imgEl = () => document.getElementById("slideshowImage");
const modalEl = () => document.getElementById("imageModal");

function applyTransform() {
  const el = imgEl();
  if (!el) return;
  el.style.transform = `translate(${tx}px, ${ty}px) scale(${zoom})`;
  el.style.cursor = zoom > 1 ? "grab" : "zoom-in";
}
function resetZoom() { zoom = 1; tx = 0; ty = 0; applyTransform(); }

function showCurrent() {
  const el = imgEl();
  if (!el || !images.length) return;
  el.src = images[index];
  document.getElementById("imageCounter").textContent = `${index + 1} / ${images.length}`;
  resetZoom();
}

async function openImages(code, name) {
  images = await getImagesByCode(code);
  if (!images.length) return;
  index = 0;
  document.getElementById("modalImgTitle").textContent = `${name} (${code})`;
  modalEl().classList.add("is-active");
  document.body.style.overflow = "hidden";
  showCurrent();
}

function closeModal() {
  modalEl()?.classList.remove("is-active");
  document.body.style.overflow = "";
  if (document.fullscreenElement) document.exitFullscreen();
}

const next = () => { index = (index + 1) % images.length; showCurrent(); };
const prev = () => { index = (index - 1 + images.length) % images.length; showCurrent(); };

export function bindImageModalEvents() {
  if (bound) return; // document дээрх listener-ыг нэг л удаа холбоно
  bound = true;

  document.addEventListener("click", (e) => {
    const open = e.target.closest(".open-image-btn");
    if (open) return openImages(open.dataset.code, open.dataset.name);
    if (e.target.closest("#closeImgModalBtn") || e.target.closest("#modalBg")) return closeModal();
    if (e.target.closest("#prevImageBtn")) return prev();
    if (e.target.closest("#nextImageBtn")) return next();
    if (e.target.closest("#fullscreenBtn")) {
      const card = document.querySelector("#imageModal .modal-card");
      document.fullscreenElement ? document.exitFullscreen() : card?.requestFullscreen?.();
    }
  });

  // mouse wheel-ээр zoom
  document.addEventListener("wheel", (e) => {
    if (!e.target.closest("#slideshowImage")) return;
    e.preventDefault();
    zoom = Math.min(5, Math.max(1, zoom + (e.deltaY < 0 ? 0.25 : -0.25)));
    if (zoom === 1) { tx = 0; ty = 0; }
    applyTransform();
  }, { passive: false });

  // drag хийж зөөх
  document.addEventListener("mousedown", (e) => {
    if (!e.target.closest("#slideshowImage") || zoom <= 1) return;
    e.preventDefault();
    dragging = true; sx = e.clientX - tx; sy = e.clientY - ty;
    imgEl().style.cursor = "grabbing";
  });
  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    tx = e.clientX - sx; ty = e.clientY - sy;
    applyTransform();
  });
  document.addEventListener("mouseup", () => { dragging = false; applyTransform(); });

  // клавиатур: ESC хаах, ← → солих
  document.addEventListener("keydown", (e) => {
    if (!modalEl()?.classList.contains("is-active")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
}
