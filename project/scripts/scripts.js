document.addEventListener("DOMContentLoaded", () => {
  const currentYear = new Date().getFullYear();
  const footer = document.querySelector("footer");
  const yearSpan = footer.querySelector("#currentyear");
  const lastModified = footer.querySelector("#lastModified");

  if (yearSpan) yearSpan.textContent = currentYear;
  if (lastModified) lastModified.textContent = `Last Modified: ${document.lastModified}`;

  const productList = document.getElementById("product-list");
  const featuredContainer = document.querySelector(".product-grid");
  const categoryFilter = document.getElementById("categoryFilter");
  const toggleBtn = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const form = document.getElementById("quoteForm");
  const detailName = document.getElementById("product-name");

  const getCategoryById = (id) => {
    if (id <= 5) return "Industrial";
    if (id <= 10) return "Papers";
    if (id <= 15) return "Chemical";
    if (id <= 20) return "Recycling";
    if (id <= 25) return "Pest Control";
    return "Misc";
  };

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
    "6-Quart-Backpack-Vacuum-Pest-Control-Kit"
  ];

  const products = productNames.map((name, index) => ({
    id: index + 1,
    name,
    category: getCategoryById(index + 1),
    specs: ["Durable", "Lightweight", "Eco-friendly"],
    image: `images/product${index + 1}.webp`
  }));

  const renderProducts = (list, container) => {
    container.innerHTML = list
      .map(
        (p) => `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}" loading="lazy"
             onerror="this.onerror=null; this.src='images/placeholder.webp'; console.warn('Missing image:', '${p.image}')">
        <h3><a href="product-detail.html?id=${p.id}">${p.name}</a></h3>
        <p>Category: ${p.category}</p>
        <button onclick="addToFavorites(${p.id})">Add to Favorites</button>
      </div>`
      )
      .join("");
  };

  if (featuredContainer && !productList) {
    renderProducts(products.slice(0, 3), featuredContainer);
  }

  if (productList) {
    renderProducts(products, productList);
    categoryFilter?.addEventListener("change", () => {
      const selected = categoryFilter.value.toLowerCase();
      const filtered =
        selected === "all"
          ? products
          : products.filter((p) =>
            p.category.toLowerCase().includes(selected)
          );
      renderProducts(filtered, productList);
    });
  }

  if (detailName) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get("id"));
    const product = products.find((p) => p.id === id);

    if (product) {
      detailName.textContent = product.name;
      const img = document.getElementById("product-image");
      img.src = product.image;
      img.alt = product.name;
      img.onerror = () => {
        img.src = "images/placeholder.webp";
        console.warn("Missing detail image:", product.image);
      };
      document.getElementById("product-category").textContent =
        product.category;
      document.getElementById("product-specs").textContent =
        product.specs.join(", ");
    } else {
      detailName.textContent = "Product not found.";
    }
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const confirmation = document.getElementById("confirmation");
      confirmation?.classList.remove("hidden");
      form.reset();
    });
  }

  toggleBtn?.addEventListener("click", () => {
    menu?.classList.toggle("hidden");
    toggleBtn.innerHTML = menu?.classList.contains("hidden") ? "&#9776;" : "&#10006;";
  });

  const links = document.querySelectorAll("nav a");
  const current = window.location.pathname.split("/").pop();
  links.forEach((link) => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });

  const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  console.log("User's favorite products:", storedFavorites);
});

function addToFavorites(id) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Product added to favorites!");
  } else {
    alert("Already in favorites!");
  }
}
