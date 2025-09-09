// Year in footer
document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

// ---- dataLayer helper ----
window.pushDL = function(eventName, params = {}){
  window.dataLayer = window.dataLayer || [];
  const payload = { event: eventName, event_time: Date.now(), ...params };
  window.dataLayer.push(payload);
};

// Custom page view (for GTM)
pushDL('dl_page_view', { page_title: document.title, page_path: location.pathname + location.hash });

// Click tracking (data attributes)
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-track="click"]');
  if (!el) return;
  const eventName = el.getAttribute('data-event') || 'ui_click';
  const label = el.getAttribute('data-label') || el.textContent.trim();
  const href = el.getAttribute('href') || null;
  pushDL(eventName, { label, href });
});

// Reveal-on-scroll + section views
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.6){
      const id = entry.target.getAttribute('data-section-id') || entry.target.id;
      pushDL('section_view', { section_id: id });
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: [0, 0.6, 1] });
document.querySelectorAll('[data-observe="section"]').forEach(s => observer.observe(s));
document.querySelectorAll('.reveal').forEach(s => observer.observe(s));

// Outbound link tracking
document.querySelectorAll('a[target="_blank"]').forEach(a => {
  a.addEventListener('click', () => pushDL('outbound_link', { href: a.href }));
});

// Mobile menu toggle
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('site-nav');
if (toggle && nav){
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    pushDL('menu_toggle', { open });
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (nav.classList.contains('is-open')){
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }));
}

// Tabs: Cases / Toolbox / Performance / Future1 / Future2
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');
const workSection = document.getElementById('work');
function activateTab(name){
  // tabs & panels
  tabs.forEach(t => {
    const isActive = t.dataset.tab === name;
    t.classList.toggle('is-active', isActive);
    t.setAttribute('aria-selected', String(isActive));
  });
  panels.forEach(p => p.classList.toggle('is-active', p.id === `panel-${name}`));

  // background switching on Work section
  workSection.classList.remove('work--toolbox-bg', 'work--performance-bg');
  if (name === 'toolbox') workSection.classList.add('work--toolbox-bg');
  if (name === 'perf') workSection.classList.add('work--performance-bg');

  // init chart on first open of Toolbox
  if (name === 'toolbox' && !window._chartInit) {
    const ctx = document.getElementById('skillsChart');
    if (ctx && window.Chart) {
      new Chart(ctx, {
        type: 'bar',
        data: { labels: ['GA4','GTM','Scraping','Query Params','Chart.js','GitHub'],
          datasets:[{ label:'Confidence (0–10)', data:[7,8,5,6,7,8] }] },
        options:{ responsive:true, plugins:{legend:{display:false}}, scales:{ y:{ suggestedMin:0, suggestedMax:10 } } }
      });
      window._chartInit = true;
      pushDL('chart_render', { chart_id: 'skillsChart' });
    }
  }

  pushDL('work_tab_change', { tab: name });
}
tabs.forEach(t => t.addEventListener('click', () => activateTab(t.dataset.tab)));
activateTab('cases'); // default
