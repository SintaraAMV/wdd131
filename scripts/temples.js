"use strict";

/* ======================================================
   This script does two things:
   1) Populates the current year and last-modified date in the footer.
   2) Toggles the mobile “hamburger” menu.
   ====================================================== */
(() => {
  // ——————————————————————————
  // 1) CURRENT YEAR & LAST MODIFIED
  // ——————————————————————————
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const modifiedElement = document.getElementById("lastModified");
  if (modifiedElement) {
    const modifiedDate = new Date(document.lastModified);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium", // e.g. “24 May 2025”
      timeStyle: "short",  // e.g. “17:36”
    }).format(modifiedDate);

    modifiedElement.textContent = `Last Modification: ${formattedDate}`;
  }

  // ——————————————————————————
  // 2) MOBILE HAMBURGER MENU
  // ——————————————————————————
  const hamburgerButton = document.getElementById("menuToggle");
  const navigationMenu = document.getElementById("siteNav");

  if (hamburgerButton && navigationMenu) {
    hamburgerButton.addEventListener("click", () => {
      // Toggle “open” class on <nav>
      const isOpen = navigationMenu.classList.toggle("open");

      // Update aria-expanded for accessibility
      hamburgerButton.setAttribute("aria-expanded", isOpen ? "true" : "false");

      // Change button icon (☰ ↔ ✕) and aria-label
      if (isOpen) {
        hamburgerButton.textContent = "✕";
        hamburgerButton.setAttribute("aria-label", "Close menu");
      } else {
        hamburgerButton.textContent = "☰";
        hamburgerButton.setAttribute("aria-label", "Open menu");
      }
    });
  }
})();
