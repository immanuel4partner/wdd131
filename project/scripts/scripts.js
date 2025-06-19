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

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const featuredContainer = document.querySelector(".product-grid");
  const categoryFilter = document.getElementById("categoryFilter");
  const toggleBtn = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const form = document.getElementById("quoteForm");
  const detailName = document.getElementById("product-name");

  // Category logic
  function getCategoryById(id) {
    if (id >= 1 && id <= 5) return "Industrial";
    if (id >= 6 && id <= 10) return "Papers";
    if (id >= 11 && id <= 15) return "Chemical";
    if (id >= 16 && id <= 20) return "Recycling";
    if (id >= 21 && id <= 25) return "Pest Control";
    return "Misc";
  }

  // Create product data
  const productNames = [
    "Orbis uhs Cordless Burnisher",
    "BD-50-60-C-Ep-Classic",
    "Orbis uhs-1500 Folding Handle",
    "BD-5070-R-Classic-Bp-Pack",
    "Karcher-Pressure-Washer",
    "Blue C Fold Hand Towels 1PLY X 2400",
    "BulkySoft Comfort Maxi Jumbo Toilet Paper 6 X 300M",
    "Tork T8 Smart One Toilet Rolls 6 X 200M",
    "katrin System Toilet-roll Dispenser",
    "Modular Multiflat Tissue Dispenser",
    "Rug Doctor Professional Carpet Detergent 5L",
    "Clover Phos Descaler (5L)",
    "Clover Breaker Descaler/Cleaner (5L)",
    "Clover 306 Comet Carpet Cleaner (5L)",
    "Viakal Toilet & Washroom Descaler (750ML)",
    "Eagle 943BIO, 945BIO, 947BIO Step On Biohazard Waste Containers",
    "Reliance Sharps Bin",
    "N-swipes Industrial Wipers",
    "25L Mopping System With Gear Press Wringer",
    "Durable Metal Waste Bin with Fire Extinguishing Lid 30 Litre Black",
    "Durable Sensor Waste Bin No Touch Square 12 Litre",
    "PMPBP-Ergo-Backpack-Vacuum-Blower",
    "Solo 425 Backpack Pump Sprayer - 90 PSI",
    "Harris-Bed-Bug-Killer",
    "6-Quart-Backpack-Vacuum-Pest-Control-Kit",
  ];
  

  const products = Array.from({ length: 25 }, (_, i) => {
    const id = i + 1;
    return {
      id,
        name: productNames[i],
      category: getCategoryById(id),
      specs: ["Durable", "Lightweight", "Eco-friendly"],
      image: `images/product${id}.webp`,
    };
  });

  function renderProducts(list, container) {
    container.innerHTML = list
      .map(
        (product) => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <h3><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
          <p>Category: ${product.category}</p>
          <button onclick="addToFavorites(${product.id})">Add to Favorites</button>
        </div>
      `
      )
      .join("");
  }

  // Homepage
  if (featuredContainer && !productList) {
    const featured = products.slice(0, 3);
    renderProducts(featured, featuredContainer);
  }

  // Product List Page
  if (productList) {
    renderProducts(products, productList);

    if (categoryFilter) {
      categoryFilter.addEventListener("change", () => {
        const selected = categoryFilter.value;
        const filtered =
          selected === "all"
            ? products
            : products.filter((p) =>
                p.category.toLowerCase().includes(selected.toLowerCase())
              );
        renderProducts(filtered, productList);
      });
    }
  }

  // Product Detail Page
  if (detailName) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));
    const product = products.find((p) => p.id === productId) || products[0];
    detailName.textContent = product.name;
    document.getElementById("product-description").textContent =
      "Example specs: " + product.specs.join(", ");
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-category").textContent = product.category;
  }

  // Quote Form
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const confirmation = document.getElementById("confirmation");
      if (confirmation) {
        confirmation.classList.remove("hidden");
        form.reset();
      }
    });
  }

  // Hamburger Menu

  if (window.innerWidth >= 769) {
    toggleBtn.style.display = "none"; // Hide hamburger on desktop
    menu.classList.add("hidden"); // Ensure mobile menu stays hidden
  }

  if (toggleBtn && menu) {
    toggleBtn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
      toggleBtn.innerHTML = menu.classList.contains("hidden")
        ? "&#9776;"
        : "&#10006;";
    });
  }

  // Highlight Current Page
  const links = document.querySelectorAll("nav a");
  const current = window.location.pathname.split("/").pop();

  links.forEach((link) => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
});


// Favorites functionality
function addToFavorites(productId) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Check if the product is already saved
  if (!favorites.includes(productId)) {
      favorites.push(productId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Product added to favorites!");
  } else {
      alert("Already in favorites!");
  }
}

// Load favorites on page load (Optional)
document.addEventListener("DOMContentLoaded", () => {
  const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  console.log("User's favorite products:", storedFavorites); // Debugging purposes
});


