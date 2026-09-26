const temperatureC = 9;
const windKmh = 18;

function calculateWindChill(temperature, windSpeed) {
    return 13.12 + 0.6215 * temperature - 11.37 * windSpeed ** 0.16 + 0.3965 * temperature * windSpeed ** 0.16;
}

const yearSpan = document.querySelector("#currentyear");
const lastModifiedParagraph = document.querySelector("#lastModified");
const windChillOutput = document.querySelector("#windchill");

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if (lastModifiedParagraph) {
    lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
}

if (windChillOutput) {
    if (temperatureC <= 10 && windKmh > 4.8) {
        windChillOutput.textContent = `${calculateWindChill(temperatureC, windKmh).toFixed(1)} °C`;
    } else {
        windChillOutput.textContent = "N/A";
    }
}
