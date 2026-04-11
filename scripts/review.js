const currentYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");
const reviewCountElement = document.getElementById("reviewCount");
const reviewSummary = document.getElementById("reviewSummary");

const products = [
  {
    id: "fc-1888",
    name: "flux capacitor"
  },
  {
    id: "fc-2050",
    name: "power laces"
  },
  {
    id: "fs-1987",
    name: "time circuits"
  },
  {
    id: "ac-2000",
    name: "low voltage reactor"
  },
  {
    id: "jj-1969",
    name: "warp equalizer"
  }
];

function capitalizeWords(text) {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

function setFooterDates() {
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
  }
}

function getProductNameById(id) {
  const product = products.find((item) => item.id === id);
  return product ? capitalizeWords(product.name) : "N/A";
}

function updateReviewCount() {
  const pendingReview = sessionStorage.getItem("pendingReview");
  const currentCount = Number(localStorage.getItem("reviewCount")) || 0;

  if (pendingReview === "true") {
    const newCount = currentCount + 1;
    localStorage.setItem("reviewCount", String(newCount));
    sessionStorage.removeItem("pendingReview");
    return newCount;
  }

  return currentCount;
}

function renderSummary() {
  const params = new URLSearchParams(window.location.search);
  const features = params.getAll("features");

  const summaryData = [
    ["Product", getProductNameById(params.get("productName"))],
    ["Overall Rating", `${params.get("overallRating") || "N/A"} star(s)`],
    ["Date of Installation", params.get("installDate") || "N/A"],
    ["Useful Features", features.length ? features.join(", ") : "None selected"],
    ["Written Review", params.get("writtenReview") || "No written review"],
    ["User Name", params.get("userName") || "Anonymous"]
  ];

  summaryData.forEach(([label, value]) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${label}:</strong> ${value}`;
    reviewSummary.appendChild(item);
  });
}

setFooterDates();

if (reviewCountElement) {
  reviewCountElement.textContent = updateReviewCount();
}

renderSummary();