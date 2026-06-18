// ─── LemurIA Analytics & Cookie Consent ───────────────────────────────────
//
// TO ACTIVATE:
//   Replace the GA_ID below with your real Measurement ID from Google Analytics.
//   Google Analytics → Admin → Data Streams → your stream → Measurement ID
//   It looks like: G-XXXXXXXXXX
//
// This script:
//   1. Checks stored consent on every page load.
//   2. If already accepted  → loads GA immediately, no banner.
//   3. If already declined  → does nothing, no banner.
//   4. If no decision yet   → injects the consent banner.
//
// GDPR / App Store compliance: GA is never loaded before explicit acceptance.
// ────────────────────────────────────────────────────────────────────────────

const GA_ID       = 'G-9VG9S9RL0W';   // ← replace this
const CONSENT_KEY = 'lemuria_cookie_consent';  // localStorage key

// ── Consent helpers ──────────────────────────────────────────────────────────

function getConsent() {
  try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
}

function saveConsent(value) {
  try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
}

// ── GA loader ────────────────────────────────────────────────────────────────

function loadGA() {
  if (window._gaLoaded || GA_ID === 'G-9VG9S9RL0W') return;
  window._gaLoaded = true;

  const s = document.createElement('script');
  s.src   = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  s.async = true;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
}

// ── Banner styles (injected once) ────────────────────────────────────────────

const BANNER_CSS = `
  #lm-cookie-banner {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    z-index: 9999;
    background: #0D0D14;
    border-top: 1px solid rgba(255,255,255,0.10);
    padding: 18px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
    font-size: 14px;
    color: #a9a7b4;
    box-shadow: 0 -8px 32px rgba(0,0,0,0.40);
    animation: lm-slide-up 0.3s ease;
  }
  @keyframes lm-slide-up {
    from { transform: translateY(100%); opacity: 0; }
    to   { transform: translateY(0);   opacity: 1; }
  }
  #lm-cookie-banner p {
    margin: 0;
    flex: 1 1 280px;
    line-height: 1.5;
  }
  #lm-cookie-banner a {
    color: #EF9F27;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  #lm-cookie-banner a:hover { color: #fff; }
  .lm-cookie-actions {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
  }
  .lm-btn {
    padding: 9px 20px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: opacity 0.15s;
    white-space: nowrap;
  }
  .lm-btn:hover { opacity: 0.85; }
  .lm-btn-accept {
    background: #EF9F27;
    color: #0D0D14;
  }
  .lm-btn-decline {
    background: transparent;
    color: #a9a7b4;
    border: 1px solid rgba(255,255,255,0.18) !important;
  }
  @media (max-width: 560px) {
    #lm-cookie-banner { flex-direction: column; align-items: flex-start; }
    .lm-cookie-actions { width: 100%; }
    .lm-btn { flex: 1; text-align: center; }
  }
`;

// ── Banner HTML ───────────────────────────────────────────────────────────────

function buildBanner() {
  const banner = document.createElement('div');
  banner.id = 'lm-cookie-banner';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML = `
    <p>
      We use cookies and Google Analytics to understand how people find LemurIA.
      No personal data is collected from the free app without your consent.
      <a href="privacy.html">Privacy policy</a>
    </p>
    <div class="lm-cookie-actions">
      <button class="lm-btn lm-btn-decline" id="lm-decline">Decline</button>
      <button class="lm-btn lm-btn-accept" id="lm-accept">Accept analytics</button>
    </div>
  `;
  return banner;
}

function injectBanner() {
  const style = document.createElement('style');
  style.textContent = BANNER_CSS;
  document.head.appendChild(style);

  const banner = buildBanner();
  document.body.appendChild(banner);

  document.getElementById('lm-accept').addEventListener('click', function () {
    saveConsent('accepted');
    banner.remove();
    loadGA();
  });

  document.getElementById('lm-decline').addEventListener('click', function () {
    saveConsent('declined');
    banner.remove();
  });
}

// ── Entry point ───────────────────────────────────────────────────────────────

(function init() {
  const consent = getConsent();

  if (consent === 'accepted') {
    loadGA();
    return;
  }

  if (consent === 'declined') {
    return;
  }

  // No decision yet — show banner after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectBanner);
  } else {
    injectBanner();
  }
}());
