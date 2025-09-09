// Footer year
document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

// Data Layer helper
window.pushDL = function(eventName, params = {}){
  window.dataLayer = window.dataLayer || [];
  const payload = { event: eventName, event_time: Date.now(), ...params };
  window.dataLayer.push(payload);
};

// Custom page view (use as GTM Custom Event if you like)
pushDL('dl_page_view', {
  page_title: document.title,
  page_path: location.pathname + location.hash
});

// Click tracking via data attributes
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-track="click"]');
  if (!el) return;
  const eventName = el.getAttribute('data-event') || 'ui_click';
  const label = el.getAttribute('data-label') || el.textContent.trim();
  const href = el.getAttribute('href') || null;
  pushDL(eventName, { label, href });
});

// Reveal + section views
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

// Outbound links
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
