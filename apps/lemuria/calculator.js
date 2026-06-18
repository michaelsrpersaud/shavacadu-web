/**
 * calculator.js — LicensePool Marketing Site
 *
 * Savings calculator, nav scroll effects, hero counter animation,
 * scroll-reveal, and contact form handling.
 */

/* ═══════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function fmt(n) {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2).replace(/\.?0+$/, '') + 'M';
  if (n >= 1_000)     return '$' + Math.round(n).toLocaleString('en-US');
  return '$' + Math.round(n).toLocaleString('en-US');
}

function fmtRaw(n) {
  return Math.round(n).toLocaleString('en-US');
}

/* ═══════════════════════════════════════════════════════
   NAVBAR — transparent → solid on scroll
═══════════════════════════════════════════════════════ */
const navbar = $('#navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ═══════════════════════════════════════════════════════
   MOBILE NAV
═══════════════════════════════════════════════════════ */
const burger   = $('#navBurger');
const navMobile = $('#navMobile');

burger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

// Close on link click
$$('.nav-mobile a').forEach(a => {
  a.addEventListener('click', () => navMobile.classList.remove('open'));
});

/* ═══════════════════════════════════════════════════════
   HERO COUNTER ANIMATION
═══════════════════════════════════════════════════════ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '%';
  const duration = 1800;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Trigger when hero stats come into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      $$('[data-target]').forEach(animateCounter);
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = $('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Add reveal class to key sections
document.addEventListener('DOMContentLoaded', () => {
  [
    '.step-card', '.trust-item', '.price-card',
    '.exception-callout', '.problem-text', '.section-header'
  ].forEach(sel => {
    $$(sel).forEach((el, i) => {
      el.classList.add('reveal', `reveal-delay-${(i % 4) + 1}`);
      revealObserver.observe(el);
    });
  });
});

/* ═══════════════════════════════════════════════════════
   SAVINGS CALCULATOR
═══════════════════════════════════════════════════════ */

/** Salesforce plans — price per user/month */
const SF_PLANS = {
  '25':  { label: 'Starter',       price: 25  },
  '80':  { label: 'Professional',  price: 80  },
  '165': { label: 'Enterprise',    price: 165 },
  '330': { label: 'Unlimited',     price: 330 },
};

/** JIT LP tiers — platform fee based on pool-managed seat count */
const JIT_TIERS = [
  { maxSeats: 50,       label: 'Business',    platform: 150, varPct: 0.12 },
  { maxSeats: 500,      label: 'Enterprise',  platform: 400, varPct: 0.15 },
  { maxSeats: Infinity, label: 'Enterprise+', platform: 800, varPct: 0.15 },
];

function getJITTier(poolManagedSeats) {
  return JIT_TIERS.find(t => poolManagedSeats <= t.maxSeats) || JIT_TIERS[JIT_TIERS.length - 1];
}

/** Monthly JIT LP fee: platform + varPct × SF cost × pool-managed seats */
function getLPFee(poolManagedSeats, sfPricePmo) {
  const tier = getJITTier(poolManagedSeats);
  return tier.platform + tier.varPct * sfPricePmo * poolManagedSeats;
}

/* ── DOM refs ── */
const slider          = $('#licenseSlider');
const sliderFill      = $('#sliderFill');
const licenseCountLbl = $('#licenseCountLabel');
const fixedPctInput   = $('#fixedPct');
const fixedCountLbl   = $('#fixedCountLabel');
const fixedLicTxt     = $('#fixedLicensesText');
const flexLicTxt      = $('#flexLicensesText');
const tierBadge       = $('#tierBadge');

// Results
const annualSavings     = $('#annualSavings');
const monthlySavingsSub = $('#monthlySavingsSub');
const currentMonthly    = $('#currentMonthlyCost');
const currentNote       = $('#currentLicenseNote');
const optimizedMonthly  = $('#optimizedMonthlyCost');
const optimizedNote     = $('#optimizedLicenseNote');
const lpFee             = $('#lpMonthlyFee');
const lpFeeNote         = $('#lpFeeNote');
const monthlyNet        = $('#monthlyNetSaved');
const roiNote           = $('#roiNote');

// Visual bar
const lvTotal   = $('#lvTotal');
const lvFixed   = $('#lvFixed');
const lvActive  = $('#lvActive');
const lvSaved   = $('#lvSaved');
const legFixed  = $('#legFixed');
const legActive = $('#legActive');
const legSaved  = $('#legSaved');

/** Main calculation + render */
function recalculate() {
  // Inputs
  const totalLicenses = parseInt(slider.value, 10);
  const fixedPct      = Math.max(0, Math.min(99, parseInt(fixedPctInput.value, 10) || 0));
  const sfPriceKey    = $('input[name="sfPlan"]:checked')?.value || '165';
  const sfPricePmo    = SF_PLANS[sfPriceKey]?.price || 165;

  // Derived counts
  // Fixed licenses: always-on, never touched by the pool
  const fixedCount  = Math.round(totalLicenses * fixedPct / 100);
  // Pool-managed licenses: the flexible group JIT LP optimises
  const poolManaged = totalLicenses - fixedCount;

  // 25% reclaim rate (65% avg utilisation + 10% spike buffer = 75% retained)
  const reducedFlex    = Math.ceil(poolManaged * 0.75);   // seats still needed after reclaim
  const savedLicenses  = poolManaged - reducedFlex;       // seats reclaimed
  const optimizedTotal = fixedCount + reducedFlex;        // total seats paid for after

  // Salesforce costs
  const currentMonthlyCost   = totalLicenses  * sfPricePmo;
  const optimizedMonthlyCost = optimizedTotal * sfPricePmo;
  const sfMonthlySaving      = currentMonthlyCost - optimizedMonthlyCost;

  // JIT LP fee: platform (based on pool size) + variable % × SF cost × pool-managed seats
  const jitTier    = getJITTier(poolManaged);
  const lpMonthly  = getLPFee(poolManaged, sfPricePmo);
  const lpResolved = lpMonthly;
  const netMonthly = sfMonthlySaving - lpResolved;
  const netAnnual  = netMonthly * 12;
  const roi        = lpResolved > 0 ? Math.round((sfMonthlySaving / lpResolved - 1) * 100) : 0;

  /* ── Slider fill ── */
  const pct = ((totalLicenses - 1) / (1000 - 1)) * 100;
  sliderFill.style.width = pct + '%';

  /* ── Label updates ── */
  licenseCountLbl.textContent = `${fmtRaw(totalLicenses)} license${totalLicenses !== 1 ? 's' : ''}`;
  fixedCountLbl.textContent   = `${fmtRaw(fixedCount)} fixed license${fixedCount !== 1 ? 's' : ''}`;
  fixedPctInput.value         = fixedPct;
  fixedLicTxt.textContent = `${fmtRaw(fixedCount)} fixed licenses (always on)`;
  flexLicTxt.textContent  = `${fmtRaw(poolManaged)} pool-managed licenses (25% reclaim applied)`;
  tierBadge.textContent = jitTier.label + ' Tier';

  /* ── Results ── */
  const isPositive = netMonthly > 0;

  annualSavings.textContent     = fmt(Math.max(0, netAnnual));
  annualSavings.style.color     = isPositive ? 'var(--green)' : '#F39C12';
  monthlySavingsSub.textContent = (isPositive ? '' : 'Break-even at ') + fmt(Math.max(0, netMonthly)) + ' / month';

  currentMonthly.textContent    = fmt(currentMonthlyCost);
  currentNote.textContent       = `${fmtRaw(totalLicenses)} licenses × $${sfPricePmo}/mo`;

  const savedPct = totalLicenses > 0 ? Math.round(savedLicenses / totalLicenses * 100) : 0;
  optimizedMonthly.textContent = fmt(optimizedMonthlyCost);
  optimizedNote.textContent    = `${fmtRaw(optimizedTotal)} licenses (${savedPct}% removed)`;

  lpFee.textContent     = fmt(lpResolved);
  lpFeeNote.textContent = `${jitTier.label} tier · platform + ${Math.round(jitTier.varPct * 100)}% variable`;

  monthlyNet.textContent        = isPositive ? fmt(netMonthly) : '$0';
  roiNote.textContent           = isPositive ? `${roi}× return on LicensePool fee` : 'Increase flexible % or license count';

  /* ── Visual bar ── */
  if (totalLicenses > 0) {
    const fixedW  = (fixedCount  / totalLicenses * 100).toFixed(1);
    const activeW = (reducedFlex / totalLicenses * 100).toFixed(1);
    const savedW  = (savedLicenses / totalLicenses * 100).toFixed(1);

    lvFixed.style.width  = fixedW  + '%';
    lvActive.style.width = activeW + '%';
    lvSaved.style.width  = savedW  + '%';

    lvTotal.textContent  = `${fmtRaw(totalLicenses)} total`;
    legFixed.textContent = fmtRaw(fixedCount);
    legActive.textContent = fmtRaw(reducedFlex);
    legSaved.textContent = fmtRaw(savedLicenses);
  }
}

/* ── Event bindings ── */
if (slider) {
  slider.addEventListener('input', recalculate);
  fixedPctInput.addEventListener('input', () => {
    let v = parseInt(fixedPctInput.value, 10);
    if (isNaN(v)) v = 0;
    fixedPctInput.value = Math.max(0, Math.min(99, v));
    recalculate();
  });
  $$('input[name="sfPlan"]').forEach(r => r.addEventListener('change', recalculate));

  // Init
  recalculate();
}

/* ═══════════════════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════════════════ */
const contactForm = $('#contactForm');

function showError(inputId, errorId, msg) {
  const input = $('#' + inputId);
  const err   = $('#' + errorId);
  if (input) input.classList.add('has-error');
  if (err)   err.textContent = msg;
  return false;
}

function clearError(inputId, errorId) {
  const input = $('#' + inputId);
  const err   = $('#' + errorId);
  if (input) input.classList.remove('has-error');
  if (err)   err.textContent = '';
}

if (contactForm) {
  // Clear errors on input
  [['contactName', 'nameError'], ['contactEmail', 'emailError'], ['contactCompany', 'companyError']].forEach(([id, errId]) => {
    const el = $('#' + id);
    if (el) el.addEventListener('input', () => clearError(id, errId));
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = $('#contactName')?.value.trim();
    const email   = $('#contactEmail')?.value.trim();
    const company = $('#contactCompany')?.value.trim();
    const btn     = $('#submitBtn');

    // Reset
    ['nameError', 'emailError', 'companyError'].forEach(id => {
      const el = $('#' + id); if (el) el.textContent = '';
    });
    ['contactName', 'contactEmail', 'contactCompany'].forEach(id => {
      const el = $('#' + id); if (el) el.classList.remove('has-error');
    });

    let valid = true;
    if (!name)    valid = showError('contactName',    'nameError',    'Please enter your name.');
    if (!email)   valid = showError('contactEmail',   'emailError',   'Please enter your work email.');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                  valid = showError('contactEmail',   'emailError',   'Please enter a valid email address.');
    if (!company) valid = showError('contactCompany', 'companyError', 'Please enter your company name.');

    if (!valid) return;

    // Loading state
    btn.textContent = 'Sending…';
    btn.disabled = true;

    const cfToken = document.querySelector('[name="cf-turnstile-response"]')?.value || '';
    const SUPERADMIN_API = 'http://127.0.0.1:3000'; // production: change to your domain

    try {
      const res = await fetch(`${SUPERADMIN_API}/api/public/contact`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          licenses: $('#contactLicenses')?.value || '',
          message:  $('#contactMessage')?.value  || '',
          cfToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Show inline error
        btn.textContent = 'Send Message';
        btn.disabled = false;
        const errEl = $('#companyError'); // reuse a visible error slot
        if (errEl) { errEl.textContent = data.error || 'Something went wrong. Please try again.'; }
        return;
      }
    } catch (err) {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      const errEl = $('#companyError');
      if (errEl) { errEl.textContent = 'Could not reach server. Please email us directly.'; }
      return;
    }

    // Show success
    contactForm.querySelector('.btn').style.display = 'none';
    const success = $('#formSuccess');
    if (success) success.style.display = 'flex';
  });
}

/* ═══════════════════════════════════════════════════════
   SMOOTH SCROLL for anchor links
═══════════════════════════════════════════════════════ */
$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = navbar?.offsetHeight || 80;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH - 20;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
