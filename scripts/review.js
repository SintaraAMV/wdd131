const KEY = "wdd131_review_count";

function incrementReviewCount() {
  const current = Number(localStorage.getItem(KEY) || "0");
  const next = current + 1;
  localStorage.setItem(KEY, String(next));

  const span = document.getElementById("reviewCount");
  if (span) span.textContent = String(next);
}

document.addEventListener("DOMContentLoaded", incrementReviewCount);
