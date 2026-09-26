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
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Cardston Alberta",
        location: "Cardston, Alberta, Canada",
        dedicated: "1923, August, 26",
        area: 88562,
        imageUrl: "images/cardston-alberta.webp"
    },
    {
        templeName: "Bern Switzerland",
        location: "Münchenbuchsee, Switzerland",
        dedicated: "1955, September, 11",
        area: 35546,
        imageUrl: "images/bern-switzerland.webp"
    },
    {
        templeName: "Córdoba Argentina",
        location: "Córdoba, Argentina",
        dedicated: "2015, May, 17",
        area: 34369,
        imageUrl: "images/cordoba-argentina.webp"
    }
];

const album = document.querySelector("#album");
const heading = document.querySelector("#page-heading");
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#primary-nav");
const yearSpan = document.querySelector("#currentyear");
const lastModifiedParagraph = document.querySelector("#lastModified");

const filterLabels = {
    home: "Home",
    old: "Old Temples",
    new: "New Temples",
    large: "Large Temples",
    small: "Small Temples"
};

function dedicatedYear(temple) {
    return Number(temple.dedicated.slice(0, 4));
}

function matchesFilter(temple, filter) {
    const year = dedicatedYear(temple);

    if (filter === "old") {
        return year < 1900;
    }
    if (filter === "new") {
        return year > 2000;
    }
    if (filter === "large") {
        return temple.area > 90000;
    }
    if (filter === "small") {
        return temple.area < 10000;
    }
    return true;
}

function createTempleCard(temple) {
    return `<figure>
        <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" width="400" height="250" loading="lazy">
        <figcaption>
            <h2>${temple.templeName}</h2>
            <p>Location: ${temple.location}</p>
            <p>Dedicated: ${temple.dedicated}</p>
            <p>Area: ${temple.area.toLocaleString()} sq ft</p>
        </figcaption>
    </figure>`;
}

function displayTemples(filter = "home") {
    const list = temples.filter((temple) => matchesFilter(temple, filter));
    album.innerHTML = list.map(createTempleCard).join("");
    heading.textContent = filterLabels[filter] || "Home";

    document.querySelectorAll("#primary-nav [data-filter]").forEach((link) => {
        link.classList.toggle("active", link.dataset.filter === filter);
    });
}

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

document.querySelectorAll("#primary-nav [data-filter]").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        displayTemples(link.dataset.filter);
        if (navigation) {
            navigation.classList.remove("open");
        }
        if (menuButton) {
            menuButton.textContent = "☰";
            menuButton.setAttribute("aria-expanded", "false");
        }
    });
});

const startingFilter = window.location.hash.replace("#", "");
displayTemples(["home", "old", "new", "large", "small"].includes(startingFilter) ? startingFilter : "home");
