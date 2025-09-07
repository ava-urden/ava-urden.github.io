// När sidan laddas, logga att helper.js fungerar
console.log("helper.js är laddad ✅");

// Hämta knappen
const button = document.getElementById("cvButton");

// Lägg till en klick-händelse
button.addEventListener("click", function() {
  // Skicka event till dataLayer
  window.dataLayer.push({
    event: "download_cv",
    file: "ava-urden-cv.pdf",
    page: "01a-datalayer"
  });

  console.log("Event skickat till dataLayer:", {
    event: "download_cv",
    file: "ava-urden-cv.pdf",
    page: "01a-datalayer"
  });
});
