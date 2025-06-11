// Get the current year
const currentYear = new Date().getFullYear();

// Insert current year into the first <p> in the footer
const footer = document.querySelector("footer");
const firstPara = footer.querySelector("p");
firstPara.textContent = `© ${currentYear} | NJIBIE Immanuel | Nigeria`;

// Get the last modified date of the document
const lastModifiedDate = document.lastModified;

// Insert last modified date into the second <p> in the footer
const secondPara = footer.querySelectorAll("p")[1];
secondPara.textContent = `Last Modified: ${lastModifiedDate}`;


// Product array
const products = [
    { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
    { id: "fc-2050", name: "power laces", averagerating: 4.7 },
    { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
    { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
    { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

// Populate the dropdown
document.addEventListener("DOMContentLoaded", () => {
    const productSelect = document.getElementById("product");

    if (productSelect) {
        products.forEach(product => {
            const option = document.createElement("option");
            option.value = product.id;
            option.textContent = product.name;
            productSelect.appendChild(option);
        });
    }

    // Update review counter
    if (window.location.href.includes("review.html")) {
        let reviewCount = localStorage.getItem("reviewCount") || 0;
        reviewCount = parseInt(reviewCount) + 1;
        localStorage.setItem("reviewCount", reviewCount);

        // Display the counter (assuming there's an element to show it)
        const counterDisplay = document.createElement("p");
        counterDisplay.textContent = `You have submitted ${reviewCount} reviews.`;
        document.body.appendChild(counterDisplay);
    }
});
