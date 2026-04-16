const currentYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");
const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("primaryNav");
const placesGrid = document.getElementById("placesGrid");
const filterButtons = document.querySelectorAll(".filter-button");
const tripForm = document.getElementById("tripForm");
const planOutput = document.getElementById("planOutput");

const places = [
  {
    name: "Costa Verde",
    category: "coastal",
    district: "Miraflores",
    description: "A long coastal area with ocean views, parks, and access to the Pacific shoreline.",
    image: "images/larcomar.webp"
  },
  {
    name: "Plaza Mayor",
    category: "historic",
    district: "Historic Center",
    description: "A central public square surrounded by important civic and religious buildings.",
    image: "images/plaza-mayor-lima.webp"
  },
  {
    name: "Huaca Pucllana",
    category: "culture",
    district: "Miraflores",
    description: "An archaeological site that shows a different historical layer of Lima beyond the colonial center.",
    image: "images/huaca-pucllana.webp"
  },
  {
    name: "Larcomar",
    category: "coastal",
    district: "Miraflores",
    description: "A modern seaside commercial and leisure area with great cliffside views.",
    image: "images/larcomar.webp"
  }
];

function setFooterDates() {
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
  }
}

function setupMenu() {
  if (!menuButton || !navigation) return;

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

function displayPlaces(filteredPlaces) {
  if (!placesGrid) return;

  placesGrid.innerHTML = filteredPlaces
    .map(
      (place) => `
        <article class="place-card">
          <img
            src="${place.image}"
            alt="${place.name} in Lima, Peru"
            width="960"
            height="640"
            loading="lazy"
          >
          <h2>${place.name}</h2>
          <p class="place-meta"><strong>Category:</strong> ${place.category} | <strong>District:</strong> ${place.district}</p>
          <p>${place.description}</p>
          <button class="button save-favorite" type="button" data-place="${place.name}">Save Favorite</button>
        </article>
      `
    )
    .join("");

  const favoriteButtons = document.querySelectorAll(".save-favorite");

  favoriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const placeName = button.dataset.place;
      localStorage.setItem("favoritePlace", placeName);
      button.textContent = `Saved: ${placeName}`;
    });
  });
}

function setupFilters() {
  if (!placesGrid || !filterButtons.length) return;

  displayPlaces(places);

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      if (filter === "all") {
        displayPlaces(places);
      } else {
        const filtered = places.filter((place) => place.category === filter);
        displayPlaces(filtered);
      }
    });
  });
}

function renderSavedPlan() {
  if (!planOutput) return;

  const savedPlan = JSON.parse(localStorage.getItem("tripPlan"));

  if (!savedPlan) {
    planOutput.innerHTML = "<p>No saved plan yet.</p>";
    return;
  }

  planOutput.innerHTML = `
    <ul>
      <li><strong>Name:</strong> ${savedPlan.name}</li>
      <li><strong>Length of stay:</strong> ${savedPlan.days}</li>
      <li><strong>Interests:</strong> ${savedPlan.interests.length ? savedPlan.interests.join(", ") : "None selected"}</li>
      <li><strong>Notes:</strong> ${savedPlan.notes || "No notes"}</li>
    </ul>
  `;
}

function setupTripForm() {
  if (!tripForm) return;

  renderSavedPlan();

  tripForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("travelerName").value.trim();
    const days = document.getElementById("days").value;
    const interests = Array.from(
      document.querySelectorAll('input[name="interest"]:checked')
    ).map((checkbox) => checkbox.value);
    const notes = document.getElementById("notes").value.trim();

    const tripPlan = {
      name,
      days,
      interests,
      notes
    };

    localStorage.setItem("tripPlan", JSON.stringify(tripPlan));
    renderSavedPlan();
    tripForm.reset();
  });
}

setFooterDates();
setupMenu();
setupFilters();
setupTripForm();