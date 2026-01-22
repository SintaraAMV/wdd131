const yearSpan = document.querySelector("#currentyear");
const lastModifiedP = document.querySelector("#lastModified");

yearSpan.textContent = new Date().getFullYear();
lastModifiedP.textContent = `Last Modified: ${document.lastModified}`;
