const dict = {
  sv: {
    nav_cases: "Cases",
    nav_skills: "Färdigheter & Verktyg",
    nav_contact: "Kontakt",
    hero_title: "Ava Urdén",
    hero_body: "Jag trivs i skärningspunkten mellan design och data. Med ett kreativt driv att utveckla och förbättra tar jag idéer från tanke till färdig leverans, alltid med en strategisk grund och fokus på resultat.",
    cta_cases: "Se cases",
    cta_cv: "Ladda ner CV",
    cases_title: "Utvalda cases",
    filter_all: "Alla",
    // Case 1-3
    case1_title: "Optimering av kundresan",
    case1_sum: "Optimering av hela kundresan och analys av data.",
    case2_title: "Ny visuell identitet & koncept",
    case2_sum: "Konceptutveckling och varumärkesstrategi",
    case3_title: "SEO: Content-struktur & Koncept",
    case3_sum: "Datadriven tillväxt genom Experternas boktips",
    // Case 4-6 (Nya)
    case4_title: "Datadriven E-handel",
    case4_sum: "A/B-testning och hypotesdriven design för ökad försäljning.",
    case5_title: "Social Media: Tillväxtstrategi",
    case5_sum: "Organisk räckvidd och community building på Instagram.",
    case6_title: "Brand Book: Digital riktlinje",
    case6_sum: "Skapandet av en skalbar visuell identitet för webb.",
    // Skills
    skills_main_title: "Färdigheter & verktyg",
    skills_intro: "Jag gillar att ta en idé hela vägen från tanke till färdigt. Här är mina främsta färdigheter.",
    cat1_title: "1. Content & Storytelling",
    cat1_desc: "Bygger varumärke och engagemang med content anpassat efter kanal.",
    cat1_list: `<li>Copy, hooks och content för sociala medier</li><li>Contentplanering och publiceringsplan</li><li>Tonalitet och riktlinjer</li><li>Produktion av foto och video</li>`,
    cat2_title: "2. Strategi & Koncept",
    cat2_desc: "Tar idéer till tydlig struktur som går att genomföra.",
    cat2_list: `<li>Konceptutveckling för kampanjer</li><li>Briefs: målgrupp, budskap och KPI</li><li>Presentationer och pitchdecks</li><li>Kundkommunikation (CRM)</li>`,
    cat3_title: "3. Tillväxt & Data",
    cat3_desc: "Datadrivet arbete som driver trafik och konvertering.",
    cat3_list: `<li>Performance marketing setup</li><li>GA4 analys och funnel-tracking</li><li>CRO: hypotes och A/B-test</li><li>SEO och teknisk mätplan</li>`,
    tools_label: "Verktyg:",
    contact_title: "Kontakt"
  },
  en: {
    nav_cases: "Cases",
    nav_skills: "Skills & Tools",
    nav_contact: "Contact",
    hero_title: "Ava Urdén",
    hero_body: "I thrive at the intersection of design and data. With a creative drive to develop and improve, I take ideas from concept to execution, always grounded in strategy and focused on results.",
    cta_cases: "View cases",
    cta_cv: "Download CV",
    cases_title: "Selected cases",
    filter_all: "All",
    // Case 1-3
    case1_title: "SUIE: Growth setup",
    case1_sum: "Structure for tracking, content, and CRO.",
    case2_title: "Visual identity & branding",
    case2_sum: "Hypothesis-driven improvements to reduce friction.",
    case3_title: "SEO: Content structure",
    case3_sum: "Plan and structure for organic growth.",
    // Case 4-6 (Nya - Engelska översättning)
    case4_title: "E-commerce: CRO & Conversion",
    case4_sum: "A/B testing and hypothesis-driven design to boost sales.",
    case5_title: "Social Media: Growth Strategy",
    case5_sum: "Organic reach and community building on Instagram.",
    case6_title: "Brand Book: Digital Guidelines",
    case6_sum: "Creating a scalable visual identity for the web.",
    // Skills
    skills_main_title: "Skills & tools",
    skills_intro: "I like taking an idea all the way from thought to finish. Here are my core skills.",
    cat1_title: "1. Content & Storytelling",
    cat1_desc: "Building brand and engagement with content tailored to the channel.",
    cat1_list: `<li>Copy, hooks, and social content</li><li>Content planning and publishing cadence</li><li>Tone of voice and guidelines</li><li>Photo and video production</li>`,
    cat2_title: "2. Strategy & Concept",
    cat2_desc: "Turning ideas into clear, actionable structures.",
    cat2_list: `<li>Campaign concept development</li><li>Briefs: audience, message, and KPIs</li><li>Presentations and pitch decks</li><li>Customer communication (CRM)</li>`,
    cat3_title: "3. Growth & Data",
    cat3_desc: "Data-driven work that drives traffic and conversion.",
    cat3_list: `<li>Performance marketing setup</li><li>GA4 analysis and funnel tracking</li><li>CRO: hypothesis and A/B testing</li><li>SEO and technical measurement</li>`,
    tools_label: "Tools:",
    contact_title: "Contact"
  }
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

function applyLang(lang) {
  const d = dict[lang] || dict.sv;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && d[key]) el.textContent = d[key];
  });

  const list1 = document.getElementById("list1");
  const list2 = document.getElementById("list2");
  const list3 = document.getElementById("list3");
  if (list1 && d.cat1_list) list1.innerHTML = d.cat1_list;
  if (list2 && d.cat2_list) list2.innerHTML = d.cat2_list;
  if (list3 && d.cat3_list) list3.innerHTML = d.cat3_list;

  const cvLink = document.getElementById("cvLink");
  if (cvLink) {
    cvLink.setAttribute("href", lang === "sv" ? "./cv/ava-urden-cv-sv.pdf" : "./cv/ava-urden-cv-en.pdf");
  }

  document.querySelectorAll(".lang__btn").forEach((b) => {
    b.classList.toggle("is-active", b.dataset.lang === lang);
  });
  
  localStorage.setItem("lang", lang);
  setQueryLang(lang);
}

function initLang() {
  const q = getLangFromQuery();
  const stored = localStorage.getItem("lang");
  const lang = q || (stored === "sv" || stored === "en" ? stored : "sv");
  applyLang(lang);
  document.querySelectorAll(".lang__btn").forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
  });
}

function initFilters() {
  const grid = document.getElementById("casesGrid");
  if (!grid) return;
  const buttons = document.querySelectorAll(".filter");
  const cards = Array.from(grid.querySelectorAll(".case"));

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter = btn.dataset.filter;
      cards.forEach((card) => {
        const tags = (card.getAttribute("data-tags") || "").split(",").map(t => t.trim());
        const show = filter === "all" || tags.includes(filter);
        card.style.display = show ? "" : "none";
      });
    });
  });
}

initLang();
initFilters();