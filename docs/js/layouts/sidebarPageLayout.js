import { renderPageLayout } from "./pageLayout.js";

// Зүүн талдаа sidebar-тай дахин ашиглагдах layout
export function renderSidebarPageLayout({ sidebarContent = "", mainContent = "", pageId = "", pageTitle = "", pageSubtitle = "" }) {
  const renderedMain = renderPageLayout({ id: pageId, title: pageTitle, subtitle: pageSubtitle, content: mainContent });

  return `
    <div class="app-mobile-sidebar">
      <button id="openSidebar" class="btn btn-light" type="button" aria-label="Open sidebar">☰ Menu</button>
    </div>
    <div id="sidebarOverlay" class="app-sidebar-overlay"></div>

    <div class="app-shell" id="searchRoot">
      <aside id="docsSidebar" class="app-sidebar">
        <div class="app-sidebar-mobile-head">
          <button id="closeSidebar" class="btn btn-light" type="button" aria-label="Close sidebar">✕</button>
        </div>
        <nav class="menu">${sidebarContent}</nav>
      </aside>
      <div class="app-main-content">${renderedMain}</div>
    </div>
  `;
}
