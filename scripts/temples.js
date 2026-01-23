// temples.js
const menuButton = document.querySelector("#menuButton");
const nav = document.querySelector("#primaryNav");
const pageTitle = document.querySelector("#pageTitle");

function setMenuState(isOpen) {
  nav.classList.toggle("open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "✕" : "☰";
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

menuButton.addEventListener("click", () => {
  const isOpen = !nav.classList.contains("open");
  setMenuState(isOpen);
});

// Opcional útil: cambia el H1 según query string (?filter=old, etc.)
const params = new URLSearchParams(window.location.search);
const filter = params.get("filter");

if (filter) {
  const map = { old: "Old", new: "New", large: "Large", small: "Small" };
  pageTitle.textContent = map[filter] ?? "Home";
} else {
  pageTitle.textContent = "Home";
}

// Seguridad: si pasa a desktop con el menú abierto, ciérrelo
window.addEventListener("resize", () => {
  if (window.innerWidth >= 800) setMenuState(false);
});
const dialog = document.querySelector("#imgDialog");
const dialogImg = document.querySelector("#dialogImg");
const dialogCaption = document.querySelector("#dialogCaption");
const closeBtn = document.querySelector(".dialog-close");

document.querySelectorAll(".gallery figure img").forEach(img => {
  img.style.cursor = "zoom-in";
  img.addEventListener("click", () => {
    dialogImg.src = img.src;
    dialogImg.alt = img.alt;
    dialogCaption.textContent = img.closest("figure")?.querySelector("figcaption")?.textContent ?? "";
    dialog.showModal();
    closeBtn.focus();
  });
});

closeBtn.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close(); // click fuera
});
