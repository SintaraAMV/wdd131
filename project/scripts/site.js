(function () {
  const yearEl = document.querySelector("#currentyear");
  const modEl = document.querySelector("#lastmodified");

  if (yearEl) yearEl.textContent = `${new Date().getFullYear()}`;
  if (modEl) modEl.textContent = `${document.lastModified}`;

  const links = document.querySelectorAll(".nav a");
  const path = window.location.pathname.split("/").pop() || "index.html";

  links.forEach((a) => {
    const href = a.getAttribute("href") ?? "";
    const isCurrent = href.endsWith(path);
    if (isCurrent) a.setAttribute("aria-current", "page");
  });

  // Badge global de completados (si existe en el layout)
  const badge = document.querySelector("[data-completed-badge]");
  if (badge) {
    const raw = localStorage.getItem("wdd131GuideState");
    const state = raw ? JSON.parse(raw) : { completedIds: [], favorites: [] };
    badge.textContent = `${state.completedIds?.length ?? 0}`;
  }
})();
