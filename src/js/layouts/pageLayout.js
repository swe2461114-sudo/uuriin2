// Бүх page-д дахин ашиглагдах ерөнхий skeleton
export function renderPageLayout({
  id = "",
  title = "",
  subtitle = "",
  content = "",
  sectionClass = "section",
  containerClass = "container",
}) {
  return `
    <section ${id ? `id="${id}"` : ""} class="${sectionClass}">
      <div class="${containerClass}">
        ${title ? `<h1 class="page-title">${title}</h1>` : ""}
        ${subtitle ? `<p class="page-subtitle">${subtitle}</p>` : ""}
        ${content}
      </div>
    </section>
  `;
}
