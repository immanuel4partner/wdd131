document.addEventListener("DOMContentLoaded", () => {
    // Insert current year and last modified date into the footer
    const currentYear = new Date().getFullYear();
    const lastModifiedDate = document.lastModified;
    const footer = document.querySelector("footer");

    if (footer) {
        const paragraphs = footer.querySelectorAll("p");
        if (paragraphs.length > 0) {
            paragraphs[0].textContent = `© ${currentYear} | NJIBIE Immanuel | Nigeria`;
        }
        if (paragraphs.length > 1) {
            paragraphs[1].textContent = `Last Modified: ${lastModifiedDate}`;
        }
    }

    // Populate the product dropdown
    const products = [
        { id: "fc-1888", name: "Flux Capacitor", averagerating: 4.5 },
        { id: "fc-2050", name: "Power Laces", averagerating: 4.7 },
        { id: "fs-1987", name: "Time Circuits", averagerating: 3.5 },
        { id: "ac-2000", name: "Low Voltage Reactor", averagerating: 3.9 },
        { id: "jj-1969", name: "Warp Equalizer", averagerating: 5.0 }
    ];

    const productSelect = document.getElementById("product");
    if (productSelect) {
        products.forEach(product => {
            const option = document.createElement("option");
            option.value = product.id;
            option.textContent = product.name;
            productSelect.appendChild(option);
        });
    }

    // Handle form submission and save to localStorage
    const quoteForm = document.getElementById("quoteForm");
    if (quoteForm) {
        quoteForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent form reload

            const formData = new FormData(quoteForm);
            const formObject = {};

            formData.forEach((value, key) => {
                if (formObject[key]) {
                    formObject[key] = [].concat(formObject[key], value);
                } else {
                    formObject[key] = value;
                }
            });

            localStorage.setItem("quoteFormData", JSON.stringify(formObject));
            alert("Form data saved!");
        });
    }

    // Review page logic
    if (window.location.pathname.includes("review.html")) {
        let reviewCount = parseInt(localStorage.getItem("reviewCount")) || 0;
        reviewCount++;
        localStorage.setItem("reviewCount", reviewCount);

        const counterDisplay = document.createElement("p");
        counterDisplay.textContent = `You have submitted ${reviewCount} review${reviewCount !== 1 ? "s" : ""}.`;
        document.body.appendChild(counterDisplay);
    }
});
  