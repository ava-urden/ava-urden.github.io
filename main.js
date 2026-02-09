/**
 * ÖVERSÄTTNINGAR
 */
const dict = {
  sv: {
    nav_cases: "Cases",
    nav_skills: "Färdigheter",
    nav_contact: "Kontakt",
    
    // Hero
    hero_title: "Ava Urdén",
    hero_body: "Som person är jag driven och målinriktad med ett kreativt tänk och stort intresse för design, men trivs lika mycket med data, mätning och analys. Jag förstår vad som driver resultat och omsätter insikter till kreativa leveranser med strategisk grund.",
    cta_cases: "Se cases",
    cta_cv: "Ladda ner CV",
    
    // Cases Sektion
    cases_title: "Utvalda cases",
    
    // Filter
    filter_all: "Alla",
    filter_strategy: "Strategi",
    filter_data: "Data",
    filter_creative: "Kreativt",

    // Case Cards
    case1_title: "Under Your Skin",
    case1_sum: "Optimering av kundresan.",
    case2_title: "Ny visuell identitet",
    case2_sum: "Konceptutveckling.",
    case3_title: "SEO: Content-struktur",
    case3_sum: "Datadriven tillväxt.",
    case4_title: "E-handel: CRO",
    case4_sum: "A/B-testning och analys.",
    case5_title: "Giftguide för Cay Collective",
    case5_sum: "Tillväxtstrategi.",
    case6_title: "Brand Book",
    case6_sum: "Digital riktlinje.",

    // Skills
    skills_main_title: "Färdigheter & verktyg",
    
    cat1_title: "Content & Storytelling",
    cat1_desc: "Bygger varumärke och engagemang med content anpassat efter kanal.",
    cat1_list: `<li>Copy, hooks och content för sociala medier</li><li>Contentplanering och publiceringsplan</li><li>Tonalitet och riktlinjer</li><li>Produktion av foto och video</li>`,
    
    cat2_title: "Strategi & Koncept",
    cat2_desc: "Tar idéer till tydlig struktur som går att genomföra.",
    cat2_list: `<li>Konceptutveckling för kampanjer</li><li>Briefs: målgrupp, budskap och KPI</li><li>Presentationer och pitchdecks</li><li>Kundkommunikation (CRM)</li>`,
    
    cat3_title: "Tillväxt & Data",
    cat3_desc: "Datadrivet arbete som driver trafik och konvertering.",
    cat3_list: `<li>Performance marketing setup</li><li>GA4 analys och funnel-tracking</li><li>CRO: hypotes och A/B-test</li><li>SEO och teknisk mätplan</li>`,
    
    // Footer
    contact_title: "Kontakt",
    footer_text: "Nyfiken på att veta mer eller diskutera ett projekt? Hör av dig så tar vi en kaffe!",
    contact_mobile: "Mobil"
  },
  
  en: {
    nav_cases: "Cases",
    nav_skills: "Skills",
    nav_contact: "Contact",
    
    // Hero
    hero_title: "Ava Urdén",
    hero_body: "I thrive at the intersection of design and data. With a creative drive to develop and improve, I take ideas from concept to execution, always grounded in strategy and focused on results.",
    cta_cases: "View cases",
    cta_cv: "Download CV",
    
    // Cases Section
    cases_title: "Selected cases",

    // Filter
    filter_all: "All",
    filter_strategy: "Strategy",
    filter_data: "Data",
    filter_creative: "Creative",

    // Case Cards
    case1_title: "Under Your Skin",
    case1_sum: "Customer journey optimization.",
    case2_title: "Visual Identity",
    case2_sum: "Concept development.",
    case3_title: "SEO: Content Structure",
    case3_sum: "Data-driven growth.",
    case4_title: "E-commerce: CRO",
    case4_sum: "A/B testing and analysis.",
    case5_title: "Social Media",
    case5_sum: "Growth strategy.",
    case6_title: "Brand Book",
    case6_sum: "Digital guidelines.",

    // Skills
    skills_main_title: "Skills & Tools",
    
    cat1_title: "Content & Storytelling",
    cat1_desc: "Building brand and engagement tailored to the channel.",
    cat1_list: `<li>Copy, hooks, and social content</li><li>Content planning and publishing</li><li>Tone of voice and guidelines</li><li>Photo and video production</li>`,
    
    cat2_title: "Strategy & Concept",
    cat2_desc: "Turning ideas into actionable structures.",
    cat2_list: `<li>Campaign concept development</li><li>Briefs: audience, message, and KPIs</li><li>Presentations and pitch decks</li><li>Customer communication (CRM)</li>`,
    
    cat3_title: "Growth & Data",
    cat3_desc: "Data-driven work driving traffic and conversion.",
    cat3_list: `<li>Performance marketing setup</li><li>GA4 analysis and tracking</li><li>CRO: hypothesis and A/B testing</li><li>SEO and technical measurement</li>`,
    
    // Footer
    contact_title: "Contact",
    footer_text: "Curious to know more or discuss a project? Get in touch and let's have a coffee!",
    contact_mobile: "Mobile"
  }
};

/**
 * FUNKTION: Byt språk
 */
function applyLang(lang) {
  const d = dict[lang] || dict.sv; // Fallback till svenska
  
  // 1. Byt text på alla enkla element
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (d[key]) el.textContent = d[key];
  });

  // 2. Byt innehåll i listorna (HTML)
  const list1 = document.getElementById("list1");
  const list2 = document.getElementById("list2");
  const list3 = document.getElementById("list3");
  
  if (list1 && d.cat1_list) list1.innerHTML = d.cat1_list;
  if (list2 && d.cat2_list) list2.innerHTML = d.cat2_list;
  if (list3 && d.cat3_list) list3.innerHTML = d.cat3_list;

  // 3. Uppdatera CV-länkar (för både header och footer)
  const cvLinks = document.querySelectorAll("a[href*='ava-urden-cv']");
  cvLinks.forEach(link => {
    if (lang === "en") {
        link.setAttribute("href", "./cv/ava-urden-cv-en.pdf");
    } else {
        link.setAttribute("href", "./cv/ava-urden-cv-sv.pdf");
    }
  });

  // 4. Hantera aktiv klass på språkknappar
  document.querySelectorAll(".lang__btn").forEach((btn) => {
    if (btn.dataset.lang === lang) {
      btn.classList.add("is-active");
    } else {
      btn.classList.remove("is-active");
    }
  });

  // 5. Spara valet
  localStorage.setItem("lang", lang);
}

/**
 * FUNKTION: Filter för cases
 */
function initFilters() {
  const grid = document.getElementById("casesGrid");
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".case");

  // Om vi är på en undersida som saknar grid, avbryt funktionen
  if (!grid || buttons.length === 0) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Byt aktiv knapp
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const filterValue = btn.getAttribute("data-filter");

      cards.forEach((card) => {
        // Hämta taggar från kortet
        const tags = (card.getAttribute("data-tags") || "").split(",").map(t => t.trim());
        
        // Visa eller dölj
        if (filterValue === "all" || tags.includes(filterValue)) {
          card.style.display = "block"; // Eller "flex" beroende på din CSS
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/**
 * INITIERING (Körs när sidan laddat klart)
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Sätt språk
  const storedLang = localStorage.getItem("lang") || "sv";
  applyLang(storedLang);

  // 2. Aktivera språkknappar
  document.querySelectorAll(".lang__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      applyLang(btn.dataset.lang);
    });
  });

  // 3. Aktivera filter
  initFilters();
});