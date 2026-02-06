const dict = {
  sv: {
    nav_cases: "Cases",
    nav_skills: "Färdigheter & Verktyg",
    nav_cv: "CV",
    nav_contact: "Kontakt",

    cta_cases: "Se cases",
    cta_cv: "Ladda ner CV",

    cases_title: "Utvalda cases",
    filter_all: "Alla",

    case1_title: "SUIE: Growth setup för e-handel",
    case1_sum: "Struktur för mätning, content och CRO.",
    case2_title: "CRO: Check-out optimering",
    case2_sum: "Hypotesdriven förbättring för att minska friktion.",
    case3_title: "SEO: Content-struktur",
    case3_sum: "Plan och struktur för organisk tillväxt.",

    // SKILLS SEKTION SVENSKA
    skills_main_title: "Färdigheter & verktyg",
    skills_intro: "Jag gillar att ta en idé hela vägen från tanke till färdigt. Ofta jobbar jag både med det kreativa (content, form och budskap) och det analytiska (mäta, förstå och förbättra). Här är mina främsta färdigheter och verktygen jag jobbar med.",
    
    cat1_title: "1. Content & Storytelling",
    cat1_desc: "Bygger varumärke och engagemang med content anpassat efter kanal, format och mål",
    cat1_list: `
      <li>Copy, hooks och content för sociala medier (organiskt och betalt)</li>
      <li>Contentplanering: teman, format och publiceringsplan</li>
      <li>Tonalitet och riktlinjer som håller kommunikationen konsekvent</li>
      <li>Produktion och redigering av foto och video</li>
    `,

    cat2_title: "2. Strategi, koncept & kommunikation",
    cat2_desc: "Tar idéer till tydlig struktur som går att genomföra och följa upp",
    cat2_list: `
      <li>Konceptutveckling för kampanjer i content och kommunikation</li>
      <li>Briefs och plan: målgrupp, budskap, kanalval och KPI</li>
      <li>Presentationer och pitchdeck: struktur, copy och design</li>
      <li>Paketering av erbjudanden och positionering: värde, social proof, upplägg</li>
      <li>Kundkommunikation: nyhetsbrev, inbjudningar och flöden (CRM)</li>
    `,

    cat3_title: "3. Tillväxt & optimering",
    cat3_desc: "Datadrivet arbete som driver trafik, konvertering och lärande över tid",
    cat3_list: `
      <li>Performance marketing: kampanjupplägg, struktur, mål och uppföljning</li>
      <li>GA4 analys: trafik, beteende, konvertering och bortfall i flödet</li>
      <li>CRO och testarbete: hypotes → test → utvärdering → nästa steg</li>
      <li>Spårning i Google Tag Manager och mätplan</li>
      <li>SEO och innehållsstrategi för synlighet, inklusive GEO för AI-svar, samt rapportering</li>
    `,
    
    tools_label: "Verktyg:",

    cv_title: "CV",
    cv_body: "Nyfiken på detaljerna? Ladda ner hela mitt CV.",
    contact_title: "Kontakt"
  },
  en: {
    nav_cases: "Cases",
    nav_skills: "Skills & Tools",
    nav_cv: "CV",
    nav_contact: "Contact",

    cta_cases: "View cases",
    cta_cv: "Download CV",

    cases_title: "Selected Cases",
    filter_all: "All",

    case1_title: "SUIE: Growth setup for e-commerce",
    case1_sum: "Structure for tracking, content, and CRO.",
    case2_title: "CRO: Checkout optimization",
    case2_sum: "Hypothesis-driven improvements to reduce friction.",
    case3_title: "SEO: Content structure",
    case3_sum: "Plan and structure for organic growth.",

    // SKILLS SECTION ENGLISH
    skills_main_title: "Skills & Tools",
    skills_intro: "I like taking an idea all the way from thought to finished output. I often work in the overlap between creative (content, design, messaging) and analytical (measure, understand, improve). Here are my core skills and the tools I use.",
    
    cat1_title: "1. Content & Storytelling",
    cat1_desc: "Builds brand and engagement with content tailored to channel, format, and goal",
    cat1_list: `
      <li>Copy, hooks, and social content (organic and paid)</li>
      <li>Content planning: themes, formats, and publishing cadence</li>
      <li>Tone of voice and guidelines to keep communication consistent</li>
      <li>Photo and video production and editing</li>
    `,

    cat2_title: "2. Strategy, Concept & Communication",
    cat2_desc: "Turns ideas into clear structure that’s actionable and measurable",
    cat2_list: `
      <li>Campaign and concept development across content and communication</li>
      <li>Briefs and planning: audience, message, channel mix, and KPIs</li>
      <li>Presentations and pitch decks: structure, copy, and design</li>
      <li>Offer packaging and positioning: value, social proof, format</li>
      <li>Customer communication: newsletters, invites, and CRM flows</li>
    `,

    cat3_title: "3. Growth & Optimization",
    cat3_desc: "Data-driven work that increases traffic, conversion, and learning over time",
    cat3_list: `
      <li>Performance marketing: setup, structure, goals, and reporting</li>
      <li>GA4 analysis: traffic, behavior, conversion, and funnel drop-off</li>
      <li>CRO and testing: hypothesis → test → evaluation → next step</li>
      <li>Tracking via Google Tag Manager and measurement planning</li>
      <li>SEO and content strategy for visibility, including GEO for AI answers, plus reporting</li>
    `,
    
    tools_label: "Tools:",

    cv_title: "CV",
    cv_body: "Want the details? Download my full CV.",
    contact_title: "Contact"
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

  // Vanliga texter
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && d[key]) el.textContent = d[key];
  });

  // Uppdatera listorna (innerHTML eftersom det är HTML-kod)
  if (d.cat1_list) document.getElementById("list1").innerHTML = d.cat1_list;
  if (d.cat2_list) document.getElementById("list2").innerHTML = d.cat2_list;
  if (d.cat3_list) document.getElementById("list3").innerHTML = d.cat3_list;

  // Uppdatera CV-länkar
  const svPdf = "./cv/ava-urden-cv-sv.pdf";
  const enPdf = "./cv/ava-urden-cv-en.pdf";
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