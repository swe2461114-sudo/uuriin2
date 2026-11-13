// Hash router: URL-ийн # хэсэг өөрчлөгдөхөд тохирох page функцийг ажиллуулна.
export function initRouter(routes) {
  function renderRoute() {
    const hash = window.location.hash || "#/overview";
    const page = routes[hash] || routes["#/404"];
    if (page) page();
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", renderRoute);
  if (document.readyState === "complete") renderRoute();
  else window.addEventListener("load", renderRoute);

  // Хэл солигдоход одоогийн хуудсыг дахин зурахад ашиглана
  return { refresh: renderRoute };
}
