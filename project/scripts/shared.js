const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#primary-nav");
const yearSpan = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = `Last Modification: ${document.lastModified}`;
}

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");
        menuButton.textContent = isOpen ? "✕" : "☰";
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });
}
