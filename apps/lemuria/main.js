// LemurIA marketing site — light progressive enhancement only.

// Current year in the footer.
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Scroll-reveal: fade sections in as they enter the viewport.
const revealTargets = document.querySelectorAll(
  '.journey-card, .pillar, .feature, .section-title, .section-lead, .cta-inner'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  revealTargets.forEach((el) => io.observe(el));
} else {
  // No IntersectionObserver — just show everything.
  revealTargets.forEach((el) => el.classList.add('in'));
}
