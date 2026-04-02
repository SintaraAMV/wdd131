const currentYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");
const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("primaryNav");
const pageTitle = document.getElementById("pageTitle");
const templeCards = document.getElementById("templeCards");
const navLinks = document.querySelectorAll(".navigation a");

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-lds-728818-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253000,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-temple/400x250/salt-lake-temple-37762.jpg"
  },
  {
    templeName: "Rome Italy Temple",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-2241167.jpg"
  },
  {
    templeName: "Cebu City Philippines Temple",
    location: "Cebu City, Philippines",
    dedicated: "2010, June, 13",
    area: 29156,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/cebu-city-philippines/400x250/cebu-philippines-temple-lds-852837-wallpaper.jpg"
  }
];

const getTempleYear = (temple) => Number(temple.dedicated.split(",")[0]);

const filterDefinitions = {
  home: {
    title: "Home",
    items: temples
  },
  old: {
    title: "Old Temples",
    items: temples.filter((temple) => getTempleYear(temple) < 1900)
  },
  new: {
    title: "New Temples",
    items: temples.filter((temple) => getTempleYear(temple) > 2000)
  },
  large: {
    title: "Large Temples",
    items: temples.filter((temple) => temple.area > 90000)
  },
  small: {
    title: "Small Temples",
    items: temples.filter((temple) => temple.area < 10000)
  }
};

const displayTemples = (templeList) => {
  templeCards.innerHTML = "";

  templeList.forEach((temple) => {
    const card = document.createElement("article");
    card.className = "temple-card";

    card.innerHTML = `
      <h2>${temple.templeName}</h2>
      <div class="temple-meta">
        <p><span class="label">Location:</span> ${temple.location}</p>
        <p><span class="label">Dedicated:</span> ${temple.dedicated}</p>
        <p><span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft</p>
      </div>
      <img
        src="${temple.imageUrl}"
        alt="${temple.templeName}"
        loading="lazy"
        width="400"
        height="250"
      >
    `;

    templeCards.appendChild(card);
  });
};

const setActiveLink = (filterKey) => {
  navLinks.forEach((link) => {
    const isActive = link.dataset.filter === filterKey;
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const renderFilter = (filterKey) => {
  const selectedFilter = filterDefinitions[filterKey] || filterDefinitions.home;
  pageTitle.textContent = selectedFilter.title;
  displayTemples(selectedFilter.items);
  setActiveLink(filterKey);
};

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.textContent = isOpen ? "✕" : "☰";
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    renderFilter(link.dataset.filter);

    if (navigation && navigation.classList.contains("open")) {
      navigation.classList.remove("open");
      menuButton.textContent = "☰";
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    }
  });
});

renderFilter("home");