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

const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");
hamButton.setAttribute("aria-expanded", "false");
hamButton.setAttribute("aria-label", "Toggle menu");

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");

    const expanded = hamButton.classList.contains("open");
    hamButton.setAttribute("aria-expanded", expanded.toString());
});


const temples = [
    {
        templeName: "Alabang Philippines Temple",
        location: "Muntinlupa, Metro Manila",
        dedicated: "2020, June, 4",
        area: 114205,
        imageUrl: "images/filtered-temples1.webp",
    },
    {
        templeName: "Manti Utah temple",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "images/filtered-temples2.webp",
    },
    {
        templeName: "Payson Utah temple",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "images/filtered-temples3.webp",
    },
    {
        templeName: "Yigo Guam temple",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "images/filtered-temples4.webp",
    },
    {
        templeName: "Washington D.C. Temple",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "images/filtered-temples5.webp",
    },
    {
        templeName: "Lima Peru Los Olivos Temple",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "images/filtered-temples6.webp",
    },
    {
        templeName: "Mexico City Mexico temple",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "images/filtered-temples7.webp",
    },

    // Add more temple objects here...
    {
        templeName: "Salt Lake City Utah temple",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 106000,
        imageUrl: "images/filtered-temples8.webp",
    },
    {
        templeName: "Provo City Center Utah temple",
        location: "Provo, Utah, United States",
        dedicated: "2016, March, 20",
        area: 70000,
        imageUrl: "images/filtered-temples9.webp",
    },
    {
        templeName: "Anchorage Alaska temple",
        location: "Anchorage, Alaska, United States",
        dedicated: "2010, May, 2",
        area: 10000,
        imageUrl: "images/filtered-temples10.webp",
    },
];

const cardsContainer = document.querySelector("#temple-cards");

// Utility to extract year from dedication date string
function getYear(dedicatedStr) {
    return parseInt(dedicatedStr.split(",")[0]);
}

// Function to create the HTML string for a temple card (using map returns an array of HTML strings)
function createTempleCards(templeArray) {
    // Use map to transform each temple object into an HTML string for the card
    return templeArray
        .map(
            (temple) => `
    <section class="temple-card">
      <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy" />
      <h3>${temple.templeName}</h3>
      <p>Location: ${temple.location}</p>
      <p>Dedicated: ${temple.dedicated}</p>
      <p>Area: ${temple.area.toLocaleString()} sq ft</p>
    </section>
  `
        )
        .join(""); // join all HTML strings into one big string
}

// Function to display temples by inserting HTML into container
function displayTemples(templeArray) {
    cardsContainer.innerHTML = createTempleCards(templeArray);
}

// Show all temples initially
displayTemples(temples);

// FILTERS USING FILTER METHOD

// Old temples: built before 1900
function filterOld() {
    return temples.filter((temple) => getYear(temple.dedicated) < 1900);
}

// New temples: built after 2000
function filterNew() {
    return temples.filter((temple) => getYear(temple.dedicated) > 2000);
}

// Large temples: area > 90000 sq ft
function filterLarge() {
    return temples.filter((temple) => temple.area > 90000);
}

// Small temples: area < 10000 sq ft
function filterSmall() {
    return temples.filter((temple) => temple.area < 10000);
}

// BONUS: Using reduce to find the total area of all temples displayed
function totalArea(templeArray) {
    return templeArray.reduce((sum, temple) => sum + temple.area, 0);
}

// EVENT LISTENERS

document.querySelector("#home").addEventListener("click", (e) => {
    e.preventDefault();
    displayTemples(temples);
});

document.querySelector("#old").addEventListener("click", (e) => {
    e.preventDefault();
    displayTemples(filterOld());
});

document.querySelector("#new").addEventListener("click", (e) => {
    e.preventDefault();
    displayTemples(filterNew());
});

document.querySelector("#large").addEventListener("click", (e) => {
    e.preventDefault();
    displayTemples(filterLarge());
});

document.querySelector("#small").addEventListener("click", (e) => {
    e.preventDefault();
    displayTemples(filterSmall());
});