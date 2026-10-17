const temples = [
    {
        name: "Córdoba Argentina",
        location: "Córdoba, Argentina",
        dedicated: "2015, May 17",
        year: 2015,
        area: 34369,
        region: "americas",
        image: "../images/cordoba-argentina.webp"
    },
    {
        name: "Cardston Alberta",
        location: "Cardston, Alberta, Canada",
        dedicated: "1923, August 26",
        year: 1923,
        area: 88562,
        region: "americas",
        image: "../images/cardston-alberta.webp"
    },
    {
        name: "Brussels Belgium",
        location: "Brussels, Belgium",
        dedicated: "1994, September 19",
        year: 1994,
        area: 28000,
        region: "europe",
        image: "../images/brussels-belgium.webp"
    },
    {
        name: "Brasília Brazil",
        location: "Brasília, Brazil",
        dedicated: "2023, September 17",
        year: 2023,
        area: 25000,
        region: "americas",
        image: "../images/brasilia-brazil.webp"
    },
    {
        name: "Bogotá Colombia",
        location: "Bogotá, Colombia",
        dedicated: "1999, April 24",
        year: 1999,
        area: 53500,
        region: "americas",
        image: "../images/bogota-colombia.webp"
    },
    {
        name: "Bern Switzerland",
        location: "Münchenbuchsee, Switzerland",
        dedicated: "1955, September 11",
        year: 1955,
        area: 35546,
        region: "europe",
        image: "../images/bern-switzerland.webp"
    },
    {
        name: "Auckland New Zealand",
        location: "Auckland, New Zealand",
        dedicated: "2025, April 13",
        year: 2025,
        area: 45000,
        region: "oceania",
        image: "../images/auckland-new-zealand.webp"
    },
    {
        name: "Asunción Paraguay",
        location: "Asunción, Paraguay",
        dedicated: "2002, May 19",
        year: 2002,
        area: 11906,
        region: "americas",
        image: "../images/asuncion-paraguay.webp"
    },
    {
        name: "Adelaide Australia",
        location: "Marden, Australia",
        dedicated: "2000, June 15",
        year: 2000,
        area: 10700,
        region: "oceania",
        image: "../images/adelaide-australia.webp"
    }
];

const album = document.querySelector("#album");
const heading = document.querySelector("#album-heading");

function matchesFilter(temple, filter) {
    if (filter === "new") {
        return temple.year > 2000;
    }
    if (filter === "old") {
        return temple.year < 1950;
    }
    if (filter === "all") {
        return true;
    }
    return temple.region === filter;
}

function createCard(temple) {
    return `<figure class="temple-card">
        <img src="${temple.image}" alt="${temple.name} Temple" width="640" height="400" loading="lazy">
        <figcaption>
            <h2>${temple.name}</h2>
            <p>${temple.location}</p>
            <p>Dedicated: ${temple.dedicated}</p>
            <p>Area: ${temple.area.toLocaleString()} sq ft</p>
        </figcaption>
    </figure>`;
}

function displayTemples(filter) {
    const list = temples.filter((temple) => matchesFilter(temple, filter));
    album.innerHTML = list.map(createCard).join("");
    const labels = {
        all: "All temples",
        americas: "Temples in the Americas",
        europe: "Temples in Europe",
        oceania: "Temples in Oceania",
        new: "Temples dedicated after 2000",
        old: "Temples dedicated before 1950"
    };
    heading.textContent = labels[filter];
}

document.querySelectorAll("#filters button").forEach((button) => {
    button.addEventListener("click", () => {
        document.querySelectorAll("#filters button").forEach((item) => {
            item.classList.remove("active");
        });
        button.classList.add("active");
        displayTemples(button.dataset.filter);
    });
});

displayTemples("all");
