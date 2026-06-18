// ============================================================
// JIT License Pool — Blog Release Gate
// ============================================================
// Edit SCHEDULE to control when each article goes live.
// Format: 'slug': 'YYYY-MM-DD'  (goes live at 12:00 UTC on that date)
// Add ?preview to any URL to bypass the gate during review.
// ============================================================

const SCHEDULE = {
  // The Salesforce License Waste Series
  'article-01':           '2026-06-16',
  'article-02':           '2026-06-18',
  'article-03':           '2026-06-20',
  'article-04':           '2026-06-22',
  'article-05':           '2026-06-24',

  // Off the Trailhead — Salesforce Hot Takes
  'ot-01-pricing':        '2026-06-15',
  'ot-02-data-readiness': '2026-06-18',
  'ot-03-job-market':     '2026-06-21',
  'ot-04-midmarket':      '2026-06-24',
  'ot-05-hype-gap':       '2026-06-26',
  'ot-06-tco':            '2026-06-28',
  'ot-07-certifications': '2026-06-30',
  'ot-08-switching-myth': '2026-07-02',
};

const PREVIEW_MODE = new URLSearchParams(window.location.search).has('preview');

function isReleased(dateStr) {
  if (!dateStr) return true;
  if (PREVIEW_MODE) return true;
  return Date.now() >= new Date(dateStr + 'T12:00:00Z').getTime();
}

function friendlyDate(dateStr) {
  return new Date(dateStr + 'T12:00:00Z').toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ============================================================
// BLOG INDEX — read SCHEDULE via card href slug, hide unreleased
// ============================================================
document.querySelectorAll('.blog-grid').forEach(grid => {
  let hiddenCount = 0;
  grid.querySelectorAll('a.blog-card[href]').forEach(card => {
    const slug = card.getAttribute('href').replace(/\.html$/, '').replace(/^.*\//, '');
    const date = SCHEDULE[slug] || card.dataset.release;
    if (date && !isReleased(date)) {
      card.classList.add('card--unreleased');
      hiddenCount++;
    }
  });
  if (hiddenCount > 0 && !PREVIEW_MODE) {
    const notice = document.createElement('p');
    notice.className = 'upcoming-notice';
    notice.textContent = `+ ${hiddenCount} more article${hiddenCount !== 1 ? 's' : ''} coming soon`;
    grid.after(notice);
  }
});

// ============================================================
// ARTICLE PAGE — read SCHEDULE via page slug, gate if unreleased
// ============================================================
const pageSlug = window.location.pathname.split('/').pop().replace(/\.html$/, '');
const scheduleDate = SCHEDULE[pageSlug];
// Fall back to the meta tag in case the page isn't in the schedule yet
const metaDate = (document.querySelector('meta[name="release-date"]') || {}).content;
const releaseDate = scheduleDate || metaDate;

if (releaseDate && !isReleased(releaseDate)) {
  const main = document.querySelector('main');
  const cta  = document.querySelector('.article-cta');
  if (main) {
    main.innerHTML = `
      <div class="gate-wrap">
        <div class="gate-card">
          <div class="gate-eyebrow">Coming Soon</div>
          <h2>This article isn't live yet.</h2>
          <p>It publishes on<br><strong>${friendlyDate(releaseDate)}</strong>.</p>
          <p class="gate-sub">Bookmark the blog to be notified when it drops.</p>
          <a href="index.html" class="btn btn-primary">&#8592; Back to Blog</a>
        </div>
      </div>`;
  }
  if (cta) cta.style.display = 'none';
}
