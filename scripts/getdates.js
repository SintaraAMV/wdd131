const year = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}