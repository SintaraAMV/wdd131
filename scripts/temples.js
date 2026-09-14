const yearSpan = document.querySelector("#currentyear");
const lastModifiedParagraph = document.querySelector("#lastModified");
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#primary-nav");
const heading = document.querySelector("#page-heading");
const filterNote = document.querySelector("#filter-note");
const cards = document.querySelectorAll(".temple-card");
const dialog = document.querySelector("#temple-dialog");
const closeDialogButton = document.querySelector("#close-dialog");

const templeDetails = {
    cordoba: {
        name: "Córdoba Argentina Temple",
        location: "Córdoba, Argentina",
        facts: "Dedicated May 17, 2015 · 34,369 sq ft",
        description: "This temple serves members in central Argentina. White stone, gardens, and palm trees frame a quiet entrance walk."
    },
    cardston: {
        name: "Cardston Alberta Temple",
        location: "Cardston, Alberta, Canada",
        facts: "Dedicated August 26, 1923 · 88,562 sq ft",
        description: "The first temple built outside the United States. Its prairie-style stone massing and formal gardens make it one of the oldest operating temples in this album."
    },
    brussels: {
        name: "Brussels Belgium Temple",
        location: "Brussels, Belgium",
        facts: "Announced 2021 · about 25,500 sq ft · under construction",
        description: "An urban temple planned for a city-corner building. Vertical stone fins and a slim spire mark it as a newer European house of the Lord."
    },
    brasilia: {
        name: "Brasília Brazil Temple",
        location: "Brasília, Brazil",
        facts: "Dedicated September 17, 2023 · 25,000 sq ft",
        description: "Lighted arches and reflecting pools face the capital's planned landscape. It is one of the newest dedicated temples in South America."
    },
    bogota: {
        name: "Bogotá Colombia Temple",
        location: "Bogotá, Colombia",
        facts: "Dedicated April 24, 1999 · 53,500 sq ft",
        description: "A hillside temple with a colonnade and a single Moroni spire. It was the first temple in Colombia."
    },
    bern: {
        name: "Bern Switzerland Temple",
        location: "Münchenbuchsee, Switzerland",
        facts: "Dedicated September 11, 1955 · 35,546 sq ft",
        description: "The first temple in Europe. A tall center spire rises above circular flower beds that have become a landmark of the grounds."
    },
    auckland: {
        name: "Auckland New Zealand Temple",
        location: "Auckland, New Zealand",
        facts: "Dedicated April 13, 2025 · 45,456 sq ft",
        description: "The second temple in New Zealand. It stands on a green hillside with a long approach drive and a single modern tower."
    },
    asuncion: {
        name: "Asunción Paraguay Temple",
        location: "Asunción, Paraguay",
        facts: "Dedicated May 19, 2002 · 11,906 sq ft",
        description: "A smaller temple with a centered entrance and modest gardens. It was the first temple in Paraguay."
    },
    adelaide: {
        name: "Adelaide Australia Temple",
        location: "Marden, South Australia",
        facts: "Dedicated June 15, 2000 · 10,700 sq ft",
        description: "One of the compact temples dedicated around the year 2000. Cypress trees and a single tower sit on a quiet suburban lot."
    }
};

const filterLabels = {
    old: "Old Temples",
    new: "New Temples",
    large: "Large Temples",
    small: "Small Temples"
};

const filterNotes = {
    old: "Showing temples dedicated before 2000.",
    new: "Showing temples dedicated in 2000 or later.",
    large: "Showing temples 40,000 square feet or larger.",
    small: "Showing temples under 30,000 square feet."
};

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if (lastModifiedParagraph) {
    lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
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

function matchesFilter(card, filter) {
    const year = Number(card.dataset.year);
    const area = Number(card.dataset.area);

    if (filter === "old") {
        return year < 2000;
    }
    if (filter === "new") {
        return year >= 2000;
    }
    if (filter === "large") {
        return area >= 40000;
    }
    if (filter === "small") {
        return area < 30000;
    }
    return true;
}

function applyFilter(filter) {
    cards.forEach((card) => {
        card.classList.toggle("hidden", !matchesFilter(card, filter));
    });

    document.querySelectorAll("#primary-nav [data-filter]").forEach((link) => {
        link.classList.toggle("active", link.dataset.filter === filter);
    });

    if (heading) {
        heading.textContent = filterLabels[filter] || "Home";
    }
    if (filterNote) {
        filterNote.textContent = filterNotes[filter] || "Select a temple to read its details. Use Old, New, Large, or Small to filter the album.";
    }
}

document.querySelectorAll("#primary-nav [data-filter]").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        applyFilter(link.dataset.filter);
        if (navigation) {
            navigation.classList.remove("open");
        }
        if (menuButton) {
            menuButton.textContent = "☰";
            menuButton.setAttribute("aria-expanded", "false");
        }
    });
});

function openTemple(card) {
    const detail = templeDetails[card.dataset.id];
    if (!detail || !dialog) {
        return;
    }

    const image = card.querySelector("img");
    const dialogImage = document.querySelector("#dialog-image");
    dialogImage.src = image.src;
    dialogImage.alt = image.alt;
    document.querySelector("#dialog-title").textContent = detail.name;
    document.querySelector("#dialog-location").textContent = detail.location;
    document.querySelector("#dialog-facts").textContent = detail.facts;
    document.querySelector("#dialog-description").textContent = detail.description;
    dialog.showModal();
}

cards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.addEventListener("click", () => openTemple(card));
    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openTemple(card);
        }
    });
});

if (closeDialogButton && dialog) {
    closeDialogButton.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
}

const hash = window.location.hash.replace("#", "");
if (["old", "new", "large", "small"].includes(hash)) {
    applyFilter(hash);
}
