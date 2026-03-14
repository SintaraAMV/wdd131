const yearSpan = document.getElementById("currentyear");
const lastModifiedParagraph = document.getElementById("lastModified");

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (lastModifiedParagraph) {
  lastModifiedParagraph.textContent = `Last Modified: ${document.lastModified}`;
}