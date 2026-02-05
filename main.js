const dict = {
  sv: {
    nav_about: "Om",
    nav_cv: "CV",
    nav_tools: "Verktyg",
    nav_skills: "Kompetens",
    nav_courses: "Kurser",
    nav_cases: "Cases",
    nav_contact: "Kontakt",
    hero_title: "Growth marketing med designöga och datadrivna beslut",
    hero_body: "Jag skapar tydlig riktning, starkare budskap och bättre konvertering genom att kombinera kreativitet, strategi och mätning",
    cta_cases: "Se cases",
    cta_cv: "Ladda ner CV",
    about_title: "Om mig",
    about_body: "Driven growth marketing-student med fokus på e-handel, trivs i gränslandet mellan varumärke och performance och gillar att testa, mäta, optimera och skapa som känns rätt i uttrycket",
    cv_title: "CV",
    cv_body: "Ladda ner mitt CV som PDF",
    tools_title: "Verktyg",
    tools_cat1: "Analytics & spårning",
    tools_cat2: "Paid & performance",
    tools_item_measure: "Mätplan",
    tools_item_testing: "Testupplägg",
    tools_item_budget: "Budget & mål",
    skills_title: "Kompetens & erfarenhet",
    skills_1_title: "Strategi & growth",
    skills_1_a: "Mål, KPI och roadmap",
    skills_1_b: "Hypotesdriven testning",
    skills_1_c: "Prioritering som märks",
    skills_2_title: "Mätning & insikt",
    skills_2_a: "Eventstruktur",
    skills_2_b: "Dashboards",
    skills_2_c: "Insikter som går att agera på",
    skills_3_title: "Kreativt & UX",
    skills_3_a: "Copy, hooks och koncept",
    skills_3_b: "CRO och friktionsreducering",
    skills_3_c: "Visuellt uttryck",
    courses_title: "Relevanta kurser",
    course_1: "SEO & Content Marketing",
    course_2: "Growth Marketing (Berghs)",
    course_3: "E-handel & kundresa",
    cases_title: "Cases",
    filter_all: "Alla",
    case1_title: "SUIE: Growth setup för e-handel",
    case1_sum: "Struktur för mätning, content och CRO med tydliga KPI:er",
    case1_long: "Beskrivning: problem, approach, vad du gjorde, resultat och lärdomar, ersätt med riktig text",
    case2_title: "CRO: Check-out optimering",
    case2_sum: "Hypotesdriven förbättring för att minska friktion",
    case2_long: "Beskrivning: problem, approach, vad du gjorde, resultat och lärdomar, ersätt med riktig text",
    case3_title: "SEO: Content-struktur",
    case3_sum: "Plan och struktur för organisk tillväxt över tid",
    case3_long: "Beskrivning: problem, approach, vad du gjorde, resultat och lärdomar, ersätt med riktig text",
    contact_title: "Kontakt",
    contact_body: "Hör gärna av dig eller connecta på LinkedIn",
    contact_email: "E-post",
    contact_location: "Plats",
  },
  en: {
    nav_about: "About",
    nav_cv: "CV",
    nav_tools: "Tools",
    nav_skills: "Skills",
    nav_courses: "Courses",
    nav_cases: "Cases",
    nav_contact: "Contact",
    hero_title: "Growth marketing with a design eye and data-driven decisions",
    hero_body: "I create clearer direction, stronger messaging and better conversion by combining creativity, strategy and measurement",
    cta_cases: "View cases",
    cta_cv: "Download CV",
    about_title: "About me",
    about_body: "Driven growth marketing student focused on e-commerce, I thrive where brand and performance meet and I like to test, measure, optimize and build a strong expression",
    cv_title: "CV",
    cv_body: "Download my CV as a PDF",
    tools_title: "Tools",
    tools_cat1: "Analytics & tracking",
    tools_cat2: "Paid & performance",
    tools_item_measure: "Measurement plan",
    tools_item_testing: "Testing setup",
    tools_item_budget: "Budget & goals",
    skills_title: "Skills & experience",
    skills_1_title: "Strategy & growth",
    skills_1_a: "Goals, KPIs and roadmap",
    skills_1_b: "Hypothesis-driven testing",
    skills_1_c: "Prioritization that matters",
    skills_2_title: "Measurement & insight",
    skills_2_a: "Event tracking",
    skills_2_b: "Dashboards",
    skills_2_c: "Insights you can act on",
    skills_3_title: "Creative & UX",
    skills_3_a: "Copy, hooks and concepts",
    skills_3_b: "CRO and friction reduction",
    skills_3_c: "Visual expression",
    courses_title: "Relevant courses",
    course_1: "SEO & Content Marketing",
    course_2: "Growth Marketing (Berghs)",
    course_3: "E-commerce & customer journey",
    cases_title: "Cases",
    filter_all: "All",
    case1_title: "SUIE: Growth setup for e-commerce",
    case1_sum: "A foundation for measurement, content and CRO aligned to clear KPIs",
    case1_long: "Description: problem, approach, what you did, results and learnings, replace with real text",
    case2_title: "CRO: Checkout optimization",
    case2_sum: "Hypothesis-driven improvements to reduce friction",
    case2_long: "Description: problem, approach, what you did, results and learnings, replace with real text",
    case3_title: "SEO: Content structure",
    case3_sum: "Plan and structure for long-term organic growth",
    case3_long: "Description: problem, approach, what you did, results and learnings, replace with real text",
    contact_title: "Contact",
    contact_body: "Feel free to reach out or connect on LinkedIn",
    contact_email: "Email",
    contact_location: "Location",
  },
};

function getLangFromQuery() {
  const url = new URL(window.location.href);
  const q = url.searchParams.get("lang");
  return q === "sv" || q === "en" ? q : null;
}

function setQueryLang(lang) {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.replaceState({}, "", url.toString());
}

function setActiveLangButtons(lang) {
  document.querySelectorAll(".lang__btn").forEach((b) => {
    b.classList.toggle("is-active", b.dataset.lang === lang);
  });
}

function applyLang(lang) {
  const d = dict[lang] || dict.sv;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && d[key]) el.textContent = d[key];
  });

  // Update CV per language (rename files to match these OR change these paths)
  const svPdf = "./cv/Ava-Urden-CV-sv.pdf";
  const enPdf = "./cv/Ava-Urden-CV-en.pdf";
  const cvHref = lang === "sv" ? svPdf : enPdf;

  const a1 = document.getElementById("cvLink");
  const a2 = document.getElementById("cvLink2");
  if (a1) a1.setAttribute("href", cvHref);
  if (a2) a2.setAttribute("href", cvHref);

  setActiveLangButtons(lang);
}

function initLang() {
  const q = getLangFromQuery();
  const stored = localStorage.getItem("lang");
  const lang = q || (stored === "sv" || stored === "en" ? stored : "sv");

  localStorage.setItem("lang", lang);
  setQueryLang(lang);
  applyLang(lang);

  document.querySelectorAll(".lang__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.dataset.lang;
      localStorage.setItem("lang", next);
      setQueryLang(next);
      applyLang(next);
    });
  });
}

function initFilters() {
  const grid = document.getElementById("casesGrid");
  if (!grid) return;

  const buttons = document.querySelectorAll(".filter");
  const cards = Array.from(grid.querySelectorAll(".case"));

  function setActive(btn) {
    buttons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      setActive(btn);

      cards.forEach((card) => {
        const tags = (card.getAttribute("data-tags") || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);

        const show = filter === "all" || tags.includes(filter);
        card.style.display = show ? "" : "none";
      });
    });
  });
}

initLang();
initFilters();
