/* ---------- datos ---------- */
// 7 templos originales (copiados del PDF del curso ↓↓↓  – NO los cambies)
const temples = [
  {
    templeName: "Aba Nigeria Temple",
    location: "Aba, Nigeria",
    dedicated: "2005-08-07",
    area: 11500,
    imageUrl: "https://churchofjesuschrist.org/imgs/cf0910dfae1f11ed8636eeeeac1e28a1"
  },
  {
    templeName: "Bern Switzerland Temple",
    location: "Bern, Switzerland",
    dedicated: "1955-09-11",
    area: 35500,
    imageUrl: "https://churchofjesuschrist.org/imgs/e43bbc0cfe9911eab671eeeeac1e6505"
  },
  {
    templeName: "Cebu City Philippines Temple",
    location: "Cebu City, Philippines",
    dedicated: "2010-06-13",
    area: 29661,
    imageUrl: "https://churchofjesuschrist.org/imgs/b1e5d464e49811ecb5a2eeeeac1a6cbf"
  },
  {
    templeName: "Cordoba Argentina Temple",
    location: "Córdoba, Argentina",
    dedicated: "2015-05-17",
    area: 34185,
    imageUrl: "images/cordoba_argentina_temple_1.jpeg"
  },
  {
    templeName: "Cardston Alberta Temple",
    location: "Cardston, Alberta, Canada",
    dedicated: "1923-08-26",
    area: 88562,
    imageUrl: "images/cardston_alberta_temple_2.jpeg"
  },
  {
    templeName: "Brussels Belgium Temple",
    location: "Brussels, Belgium",
    dedicated: "2024-09-15",   
    area: 92000,              
    imageUrl: "images/brussels_belgium_temple_3.jpeg"
  },
  {
    templeName: "Bogotá Colombia Temple",
    location: "Bogotá, Colombia",
    dedicated: "1999-04-24",
    area: 53500,
    imageUrl: "https://churchofjesuschrist.org/imgs/9eea58473d1b11ed8007eeeeac1f3cca"
  },
  {
    templeName: "Adelaide Australia Temple",
    location: "Adelaide, Australia",
    dedicated: "2000-06-15",
    area: 10694,
    imageUrl: "images/adelaide_australia_temple_9.jpeg"
  },
  {
    templeName: "Auckland New Zealand Temple",
    location: "Auckland, New Zealand",
    dedicated: "2024-11-17",  
    area: 38000,
    imageUrl: "images/auckland_new_zealand_temple_7.jpeg"
  },
  {
    templeName: "Asunción Paraguay Temple",
    location: "Asunción, Paraguay",
    dedicated: "2002-05-19",
    area: 34700,
    imageUrl: "images/asuncion_paraguay_temple_8.jpg"
  }
];

/* ---------- utilidades ---------- */
const year = dateStr => Number(String(dateStr).slice(0, 4));
const byId  = sel => document.getElementById(sel);

/* ---------- render ---------- */
const container = byId("temples");

function createCard(t) {
  const art  = document.createElement("article");
  art.className = "temple-card";

  art.innerHTML = `
    <h3>${t.templeName}</h3>
    <p><span class="label">Location:</span> ${t.location}</p>
    <p><span class="label">Dedicated:</span> ${t.dedicated}</p>
    <p><span class="label">Area:</span> ${t.area.toLocaleString()} sq ft</p>
    <img src="${t.imageUrl}"
         alt="${t.templeName}"
         loading="lazy" decoding="async">
  `;
  return art;
}

function render(arr) {
  container.innerHTML = "";
  arr.forEach(t => container.appendChild(createCard(t)));
}

/* ---------- filtros ---------- */
const filters = {
  home : ()      => true,
  old  : t       => year(t.dedicated) < 1900,
  new  : t       => year(t.dedicated) > 2000,
  large: t       => t.area > 90000,
  small: t       => t.area < 10000
};

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const fn = filters[btn.dataset.filter] || filters.home;
    render(temples.filter(fn));
  });
});


byId("currentyear").textContent  = new Date().getFullYear();
byId("lastModified").textContent = document.lastModified;

/* ---------- arranque ---------- */
render(temples);
