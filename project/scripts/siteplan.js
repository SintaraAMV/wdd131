document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  const last = document.getElementById("last-modified");

  if (year) year.textContent = new Date().getFullYear();
  if (last) last.textContent = document.lastModified;
});
