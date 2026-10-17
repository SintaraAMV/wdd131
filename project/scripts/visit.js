const storageKey = "templePathsVisits";
const form = document.querySelector("#visit-form");
const plans = document.querySelector("#plans");
const visitDate = document.querySelector("#visitDate");
const templeSelect = document.querySelector("#temple");

if (visitDate) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");
    visitDate.min = `${tomorrow.getFullYear()}-${month}-${day}`;
}

const requestedTemple = new URLSearchParams(window.location.search).get("temple");
if (requestedTemple && templeSelect) {
    templeSelect.value = requestedTemple;
}

function readVisits() {
    const saved = localStorage.getItem(storageKey);
    if (!saved) {
        return [];
    }
    return JSON.parse(saved);
}

function writeVisits(visits) {
    localStorage.setItem(storageKey, JSON.stringify(visits));
}

function renderVisits() {
    const visits = readVisits();
    if (visits.length === 0) {
        plans.innerHTML = `<p>No visits saved yet.</p>`;
        return;
    }
    plans.innerHTML = visits.map((visit, index) => {
        const note = visit.notes ? visit.notes : "No notes";
        return `<article class="visit">
            <div>
                <h3>${visit.temple}</h3>
                <p>Date: ${visit.date}</p>
                <p>${note}</p>
            </div>
            <button class="remove" type="button" data-index="${index}">Remove</button>
        </article>`;
    }).join("");
}

function saveVisit(event) {
    event.preventDefault();
    const temple = document.querySelector("#temple").value;
    const date = document.querySelector("#visitDate").value;
    const notes = document.querySelector("#notes").value.trim();
    if (!temple || !date) {
        return;
    }
    const visits = readVisits();
    visits.push({ temple, date, notes });
    writeVisits(visits);
    form.reset();
    renderVisits();
}

form.addEventListener("submit", saveVisit);

plans.addEventListener("click", (event) => {
    if (!event.target.classList.contains("remove")) {
        return;
    }
    const index = Number(event.target.dataset.index);
    const visits = readVisits().filter((visit, visitIndex) => visitIndex !== index);
    writeVisits(visits);
    renderVisits();
});

renderVisits();
