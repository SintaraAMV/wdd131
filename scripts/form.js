const currentYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");
const productSelect = document.getElementById("productName");
const reviewForm = document.querySelector(".review-form");

const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

function capitalizeWords(text) {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

function populateProducts() {
  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = capitalizeWords(product.name);
    productSelect.appendChild(option);
  });
}

function setFooterDates() {
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
  }
}

populateProducts();
setFooterDates();

if (reviewForm) {
  reviewForm.addEventListener("submit", () => {
    sessionStorage.setItem("pendingReview", "true");
  });
}