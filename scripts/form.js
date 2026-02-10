// W05 Product Review Form - populate products select

const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

function populateProductSelect() {
  const select = document.querySelector("#productName");
  if (!select) return;

  // Keep the first placeholder option; append the rest.
  products.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.id;          // rubric-aligned: id as value
    opt.textContent = p.name;  // name as display
    select.appendChild(opt);
  });
}

document.addEventListener("DOMContentLoaded", populateProductSelect);
