// ============================================================
// JIT License Pool — Google Tag Configuration
// ============================================================
// 1. Go to analytics.google.com → Admin → Data Streams → your stream
// 2. Copy your Measurement ID (format: G-XXXXXXXXXX)
// 3. Replace the placeholder below — that's the only change needed
//    across the entire site.
// ============================================================

const GA_MEASUREMENT_ID = 'G-9VG9S9RL0W';

// Dynamically inject the Google Tag loader script
(function () {
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(s);
})();

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', GA_MEASUREMENT_ID);
