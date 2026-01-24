// Footer dates
const yearSpan = document.querySelector("#currentyear");
const lastModSpan = document.querySelector("#lastModified");

yearSpan.textContent = new Date().getFullYear();
lastModSpan.textContent = document.lastModified;

// Wind chill (metric)
const temp = parseFloat(document.querySelector("#temperature").textContent);
const speed = parseFloat(document.querySelector("#windspeed").textContent);
const windchillEl = document.querySelector("#windchill");

// Function must return ONE line
function calculateWindChill(t, v) {
  return 13.12 + 0.6215 * t - 11.37 * (v ** 0.16) + 0.3965 * t * (v ** 0.16);
}

// Only call if conditions are met (metric common rule)
if (temp <= 10 && speed > 4.8) {
  const wc = calculateWindChill(temp, speed);
  windchillEl.textContent = `${wc.toFixed(1)}`;
} else {
  windchillEl.textContent = "N/A";
}
