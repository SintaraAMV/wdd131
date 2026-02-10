// W05 Product Review Form - localStorage counter
const KEY = "wdd131_reviewCount";

function incrementAndShowCount() {
  const raw = localStorage.getItem(KEY);
  const current = Number.parseInt(raw ?? "0", 10);
  const next = Number.isFinite(current) ? current + 1 : 1;

  localStorage.setItem(KEY, String(next));

  const el = document.querySelector("#reviewCount");
  if (el) el.textContent = String(next);
}

document.addEventListener("DOMContentLoaded", incrementAndShowCount);
