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
secondPara.textContent = `LastModified: ${lastModifiedDate}`;