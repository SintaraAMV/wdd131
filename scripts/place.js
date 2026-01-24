// Footer dates
const yearSpan = document.querySelector("#currentyear");
const lastModSpan = document.querySelector("#lastModified");

if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModSpan) lastModSpan.textContent = document.lastModified;

// Windchill
const tempEl = document.querySelector("#temperature");
const windEl = document.querySelector("#windspeed");
const chillEl = document.querySelector("#windchill");

const calculateWindChill = (t, v) =>
  13.12 + 0.6215 * t - 11.37 * (v ** 0.16) + 0.3965 * t * (v ** 0.16);

function setWindChill() {
  if (!tempEl || !windEl || !chillEl) return;

  const t = Number(tempEl.textContent);
  const v = Number(windEl.textContent);

  // Condiciones típicas (métricas): T <= 10°C y V > 4.8 km/h
  if (t <= 10 && v > 4.8) {
    const wc = calculateWindChill(t, v);
    chillEl.textContent = wc.toFixed(1);
  } else {
    chillEl.textContent = "N/A";
  }
}

setWindChill();
