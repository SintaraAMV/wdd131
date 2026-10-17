const templeDetails = {
    "Córdoba Argentina": {
        image: "../images/cordoba-argentina.webp",
        location: "Córdoba, Argentina",
        dedicated: "2015, May 17",
        area: "34,369 sq ft",
        description: "A modern temple in the city of Córdoba. It serves members across central Argentina and is a common stop for travelers already in the country."
    },
    "Cardston Alberta": {
        image: "../images/cardston-alberta.webp",
        location: "Cardston, Alberta, Canada",
        dedicated: "1923, August 26",
        area: "88,562 sq ft",
        description: "One of the oldest operating temples. The stone building in Cardston, Alberta, was dedicated in 1923 and is a historic stop in western Canada."
    },
    "Brussels Belgium": {
        image: "../images/brussels-belgium.webp",
        location: "Brussels, Belgium",
        dedicated: "1994, September 19",
        area: "28,000 sq ft",
        description: "The Brussels Belgium Temple serves members in Belgium and nearby countries. It is a compact European temple in the Brussels area."
    },
    "Brasília Brazil": {
        image: "../images/brasilia-brazil.webp",
        location: "Brasília, Brazil",
        dedicated: "2023, September 17",
        area: "25,000 sq ft",
        description: "A newer temple in Brazil's capital. Brasília is a useful base for a visit because the city is well connected by air."
    },
    "Bogotá Colombia": {
        image: "../images/bogota-colombia.webp",
        location: "Bogotá, Colombia",
        dedicated: "1999, April 24",
        area: "53,500 sq ft",
        description: "The Bogotá Colombia Temple sits in the capital and serves members across Colombia. Plan extra travel time in the city."
    },
    "Bern Switzerland": {
        image: "../images/bern-switzerland.webp",
        location: "Münchenbuchsee, Switzerland",
        dedicated: "1955, September 11",
        area: "35,546 sq ft",
        description: "Dedicated in 1955, the Bern Switzerland Temple was the first temple in Europe. It is in Münchenbuchsee, near Bern."
    },
    "Auckland New Zealand": {
        image: "../images/auckland-new-zealand.webp",
        location: "Auckland, New Zealand",
        dedicated: "2025, April 13",
        area: "45,000 sq ft",
        description: "A Pacific temple in Auckland. It is a practical stop for members traveling through New Zealand or the South Pacific."
    },
    "Asunción Paraguay": {
        image: "../images/asuncion-paraguay.webp",
        location: "Asunción, Paraguay",
        dedicated: "2002, May 19",
        area: "11,906 sq ft",
        description: "The Asunción Paraguay Temple serves members in Paraguay. The city is the usual base for a visit."
    },
    "Adelaide Australia": {
        image: "../images/adelaide-australia.webp",
        location: "Marden, Australia",
        dedicated: "2000, June 15",
        area: "10,700 sq ft",
        description: "The Adelaide Australia Temple is in Marden, near Adelaide. It is a smaller temple and a good stop in southern Australia."
    }
};

const detailDialog = document.querySelector("#temple-dialog");
const detailImage = document.querySelector("#detail-image");
const detailTitle = document.querySelector("#detail-title");
const detailBody = document.querySelector("#detail-body");
const detailPlan = document.querySelector("#detail-plan");

function openTemple(name) {
    const temple = templeDetails[name];
    if (!temple || !detailDialog) {
        return;
    }
    detailImage.src = temple.image;
    detailImage.alt = `${name} Temple`;
    detailTitle.textContent = name;
    detailBody.innerHTML = `<p>${temple.location}</p>
        <p>Dedicated: ${temple.dedicated}</p>
        <p>Area: ${temple.area}</p>
        <p>${temple.description}</p>`;
    detailPlan.href = `visit.html?temple=${encodeURIComponent(name)}`;
    detailDialog.showModal();
}

document.addEventListener("click", (event) => {
    const card = event.target.closest(".temple-card");
    if (card && card.dataset.name) {
        openTemple(card.dataset.name);
    }
    if (event.target.id === "close-dialog") {
        detailDialog.close();
    }
});

document.addEventListener("keydown", (event) => {
    const card = event.target.closest(".temple-card");
    if (card && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        openTemple(card.dataset.name);
    }
});
