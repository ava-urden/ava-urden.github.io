const i18n = {
  sv: {
    subtitle: "Growth Marketing student, Berghs School of Communication",
    card_cv: "Ladda ner mitt CV",
    card_portfolio: "Min portfolio",
    card_contact: "Mina kontaktuppgifter",

    back_home: "← Tillbaka",

    cv_title: "CV – Ava Urdén",
    cv_heading: "Mitt CV",
    cv_intro: "Här kan du läsa mitt CV direkt på sidan eller ladda ner som PDF.",
    download_pdf: "Ladda ner PDF",
    pdf_fallback_text: "Din webbläsare kan inte visa PDF:en här.",
    open_pdf: "Öppna PDF",

    portfolio_title: "Portfolio – Ava Urdén",
    portfolio_heading: "Min portfolio",
    portfolio_intro: "Här kan du samla case, projekt, roller och resultat.",
    coming_soon: "Kommer snart",
    portfolio_placeholder: "Lägg in dina projekt som kort, med bild, kort beskrivning och länk.",

    contact_title: "Kontakt – Ava Urdén",
    contact_heading: "Mina kontaktuppgifter",
    contact_intro: "Lägg in dina länkar här (mail, LinkedIn, osv).",
  },

  en: {
    subtitle: "Growth Marketing student, Berghs School of Communication",
    card_cv: "Download my CV",
    card_portfolio: "My portfolio",
    card_contact: "My contact details",

    back_home: "← Back",

    cv_title: "CV – Ava Urdén",
    cv_heading: "My CV",
    cv_intro: "You can read my CV on this page or download it as a PDF.",
    download_pdf: "Download PDF",
    pdf_fallback_text: "Your browser can’t display the PDF here.",
    open_pdf: "Open PDF",

    portfolio_title: "Portfolio – Ava Urdén",
    portfolio_heading: "My portfolio",
    portfolio_intro: "Collect your cases, projects, roles, and results.",
    coming_soon: "Coming soon",
    portfolio_placeholder: "Add your projects as cards with an image, short description, and link.",

    contact_title: "Contact – Ava Urdén",
    contact_heading: "My contact details",
    contact_intro: "Add your links here (email, LinkedIn, etc.).",
  }
};

// Dina PDF:er (exakt som i din mapp)
const CV_PDF = {
  sv: "CV/Ava-Urdén-CV-sv.pdf",
  en: "CV/Ava-Urdén-CV-en.pdf"
};

function getInitialLang() {
  const saved = localStorage.getItem("lang");
  if (saved === "sv" || saved === "en") return saved;

  const browser = (navigator.language || "").toLowerCase();
  return browser.startsWith("sv") ? "sv" : "en";
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  // title om den har data-i18n
  const titleEl = document.querySelector("title[data-i18n]");
  if (titleEl) {
    const key = titleEl.getAttribute("data-i18n");
    if (i18n[lang][key]) titleEl.textContent = i18n[lang][key];
  }

  // text
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = i18n[lang][key];
    if (value) el.textContent = value;
  });

  // CV-sidan: byt PDF baserat på språk
  const pdfViewer = document.getElementById("pdfViewer");
  const downloadLink = document.getElementById("downloadLink");
  const openPdfLink = document.getElementById("openPdfLink");

  if (pdfViewer) pdfViewer.setAttribute("data", CV_PDF[lang]);
  if (downloadLink) downloadLink.setAttribute("href", CV_PDF[lang]);
  if (openPdfLink) openPdfLink.setAttribute("href", CV_PDF[lang]);

  localStorage.setItem("lang", lang);
}

(function init() {
  const lang = getInitialLang();
  applyLanguage(lang);

  const toggle = document.getElementById("langToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = localStorage.getItem("lang") || lang;
      const next = current === "sv" ? "en" : "sv";
      applyLanguage(next);
    });
  }
})();
