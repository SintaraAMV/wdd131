const currentYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");
const temperatureElement = document.getElementById("temperature");
const windSpeedElement = document.getElementById("windSpeed");
const windChillElement = document.getElementById("windchill");

const temperature = 10;
const windSpeed = 12;

const calculateWindChill = (temp, speed) =>
  13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

if (temperatureElement) {
  temperatureElement.textContent = `${temperature} °C`;
}

if (windSpeedElement) {
  windSpeedElement.textContent = `${windSpeed} km/h`;
}

if (windChillElement) {
  if (temperature <= 10 && windSpeed > 4.8) {
    windChillElement.textContent = `${calculateWindChill(temperature, windSpeed).toFixed(1)} °C`;
  } else {
    windChillElement.textContent = "N/A";
  }
}