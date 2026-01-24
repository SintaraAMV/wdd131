// Footer: current year and last modified
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// Static weather values must match what is shown in the HTML
const temperatureC = Number(document.querySelector("#temperature").textContent);
const windSpeedKmh = Number(document.querySelector("#windspeed").textContent);

// Windchill calculation (Metric)
// Requirement: one line return, named calculateWindChill
function calculateWindChill(tempC, speedKmh) {
  return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(speedKmh, 0.16) + 0.3965 * tempC * Math.pow(speedKmh, 0.16);
}

// Do NOT call calculateWindChill unless conditions are met:
// Temp <= 10°C and wind speed > 4.8 km/h, else display "N/A"
const windChillEl = document.querySelector("#windchill");

if (temperatureC <= 10 && windSpeedKmh > 4.8) {
  const wc = calculateWindChill(temperatureC, windSpeedKmh);
  windChillEl.textContent = wc.toFixed(1);
} else {
  windChillEl.textContent = "N/A";
}
