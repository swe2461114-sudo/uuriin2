// Mobile дээр sidebar-ыг нээх/хаах
export function bindSidebar() {
  const openBtn = document.getElementById("openSidebar");
  const closeBtn = document.getElementById("closeSidebar");
  const sidebar = document.getElementById("docsSidebar");
  const overlay = document.getElementById("sidebarOverlay");

  const open = () => {
    sidebar?.classList.add("is-open");
    overlay?.classList.add("is-active");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    sidebar?.classList.remove("is-open");
    overlay?.classList.remove("is-active");
    document.body.style.overflow = "";
  };

  openBtn?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  overlay?.addEventListener("click", close);
  document.addEventListener("keydown", (e) => e.key === "Escape" && close());
  window.addEventListener("resize", () => window.innerWidth > 768 && close());
}

// Sidebar дээрх дэд жагсаалтыг эвхэх/дэлгэх
export function bindMenuListToggle() {
  document.querySelectorAll(".app-toggle-sublist").forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      const li = toggle.closest("li");
      li?.querySelector(".app-sublist")?.classList.toggle("is-hidden");
      li?.classList.toggle("is-active");
    });
  });
}
