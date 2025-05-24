// Get the current year
const currentYear = new Date().getFullYear();

// Insert current year into the first <p> in the footer
const footer = document.querySelector("footer");
const firstPara = footer.querySelector("p");
firstPara.textContent = `© ${currentYear} | Immanuel Njibie | Nigeria`;

// Get the last modified date of the document
const lastModifiedDate = document.lastModified;

// Insert last modified date into the second <p> in the footer
const secondPara = footer.querySelectorAll("p")[1];
secondPara.textContent = `Last Modified: ${lastModifiedDate}`;

function calculateWindChill(tempF, speedMph) {
    return 35.74 + (0.6215 * tempF) - (35.75 * Math.pow(speedMph, 0.16)) + (0.4275 * tempF * Math.pow(speedMph, 0.16));
}

// Static values for temperature and wind speed (matching displayed values)
const staticTemperature = 30; // °F
const staticWindSpeed = 10;   // mph

function displayWindChill() {
    const windChillElement = document.getElementById("wind-chill");
    let windChillText = "N/A";
    if (staticTemperature <= 50 && staticWindSpeed > 3) {
        const windChill = calculateWindChill(staticTemperature, staticWindSpeed);
        windChillText = `${ windChill.toFixed(2) } °F`;
    }
    if (windChillElement) {
        windChillElement.textContent = `${ windChillText }`;
    }
}

window.addEventListener("DOMContentLoaded", displayWindChill);
