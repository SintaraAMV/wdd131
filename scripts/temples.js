const yearSpan = document.querySelector("#currentyear");
const lastModifiedParagraph = document.querySelector("#lastModified");
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#primary-nav");

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if (lastModifiedParagraph) {
    lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
}

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");
        menuButton.textContent = isOpen ? "✕" : "☰";
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
}
