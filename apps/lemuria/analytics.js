// ─── LemurIA Cookie Consent + GA Consent Mode v2 ─────────────────────────
//
// The GA script tag itself lives statically in <head> of every page
// (required for Google's tag detection). This file manages consent state
// and calls gtag('consent', 'update', ...) to grant or deny data collection.
//
// Behaviour:
//   First visit        → show banner; GA script present but analytics_storage=denied
//   Accept             → update consent to granted; GA starts collecting
//   Decline            → consent stays denied; GA script present but collects nothing
//   Return visit       → read localStorage; silently grant or deny; no banner
// ─────────────────────────────────────────────────────────────────────────────

const CONSENT_KEY = 'lemuria_cookie_consent';

function getConsent() {
  try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
}

function saveConsent(value) {
  try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
}

function grantAnalytics() {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
  }
}

// ── Banner styles ─────────────────────────────────────────────────────────────

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
    grantAnalytics();
  });

  document.getElementById('lm-decline').addEventListener('click', function () {
    saveConsent('declined');
    banner.remove();
    // analytics_storage stays 'denied' — nothing to update
  });
}

// ── Entry point ───────────────────────────────────────────────────────────────

(function init() {
  const consent = getConsent();

  if (consent === 'accepted') {
    grantAnalytics();
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
