const countElement = document.querySelector("#reviewCount");
const stored = Number(window.localStorage.getItem("reviewCount")) || 0;
const updated = stored + 1;

window.localStorage.setItem("reviewCount", updated);

if (countElement) {
    countElement.textContent = updated;
}

const yearSpan = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = `Last Modification: ${document.lastModified}`;
}
