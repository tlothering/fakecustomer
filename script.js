/**
 * Khanya Power Solutions — script.js
 *
 * Responsibilities:
 *  1. Build the mailto: link for every "Get a Free Quote" / "Contact Us" CTA
 *  2. Wire all .js-quote-btn elements to that mailto link
 *  3. Sticky nav scroll behaviour
 *  4. Mobile hamburger menu toggle
 *  5. On-scroll reveal animations (IntersectionObserver)
 *  6. Footer year
 */

(function () {
  'use strict';

  /* ============================================================
     1. MAILTO BUILDER
     Recipient, subject and body are assembled here so that
     encodeURIComponent handles every special character and
     line-break (%0D%0A) correctly — no raw unencoded mailto
     string is ever hard-coded.
  ============================================================ */
  const MAIL_TO  = 'timothy@fy26.fakecustomer.co.za';
  const MAIL_SUBJECT = 'Power backup for our business \u2014 info please';

  // Body — line breaks are represented as \r\n before encoding.
  // [Bracketed] items are placeholders the visitor edits in their own email client.
  const MAIL_BODY = [
    'Hi Timothy,',
    '',
    'I run [your business name], a [type of business] in [area]. The recent load-shedding has been hurting us \u2014 [e.g. lost stock / lost bookings / downtime] \u2014 and our current generator is noisy and expensive to run.',
    '',
    'I\u2019d like to understand what a solar and battery backup system would cost, and whether it makes financial sense for us.',
    '',
    'A few details to get started:',
    '- Monthly electricity bill: R[amount]',
    '- Generator fuel spend in a bad month: R[amount]',
    '- Must-stay-on equipment: [e.g. fridges/freezers, WiFi, lights, geysers]',
    '- Roof type: [tile / IBR sheeting]',
    '- Preference: [buy outright / financing options]',
    '',
    'Please could you put together a proposal with the recommended system, the expected monthly saving and payback period, and financing options.',
    '',
    'Thanks,',
    '[Your name]',
    '[Phone number]',
  ].join('\r\n');

  /**
   * Build the fully-encoded mailto: href.
   * @returns {string} e.g. "mailto:timothy@…?subject=…&body=…"
   */
  function buildMailtoHref() {
    return (
      'mailto:' +
      encodeURIComponent(MAIL_TO) +
      '?subject=' + encodeURIComponent(MAIL_SUBJECT) +
      '&body='    + encodeURIComponent(MAIL_BODY)
    );
  }

  /* ============================================================
     2. WIRE CTA BUTTONS
     Every element with class "js-quote-btn" gets the
     pre-populated mailto: href. This covers nav, hero, sections,
     footer and the contact band.
  ============================================================ */
  function wireQuoteButtons() {
    var href = buildMailtoHref();
    var buttons = document.querySelectorAll('.js-quote-btn');

    buttons.forEach(function (btn) {
      btn.setAttribute('href', href);
      // Ensure screen-readers announce the destination correctly.
      if (!btn.getAttribute('aria-label')) {
        btn.setAttribute('aria-label', 'Get a free quote — opens your email client');
      }
    });
  }

  /* ============================================================
     3. STICKY NAV — add .scrolled class after user scrolls
  ============================================================ */
  function initStickyNav() {
    var header = document.querySelector('.nav-header');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ============================================================
     4. MOBILE HAMBURGER MENU
  ============================================================ */
  function initHamburger() {
    var btn  = document.getElementById('hamburger');
    var menu = document.getElementById('nav-menu');
    if (!btn || !menu) return;

    function closeMenu() {
      btn.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      document.removeEventListener('keydown', onKeyDown);
    }

    function openMenu() {
      btn.setAttribute('aria-expanded', 'true');
      menu.classList.add('is-open');
      document.addEventListener('keydown', onKeyDown);
    }

    function onKeyDown(e) {
      if (e.key === 'Escape') closeMenu();
    }

    btn.addEventListener('click', function () {
      var isExpanded = btn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close the menu when the visitor taps any nav link
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close when tapping outside the menu
    document.addEventListener('click', function (e) {
      if (
        menu.classList.contains('is-open') &&
        !menu.contains(e.target) &&
        !btn.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }

  /* ============================================================
     5. ON-SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     Elements with class "reveal" start invisible (via CSS) and
     gain "in-view" once they enter the viewport.
  ============================================================ */
  function initRevealAnimations() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: just show everything immediately
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('in-view');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Once revealed, stop observing this element
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ============================================================
     6. FOOTER YEAR
  ============================================================ */
  function setFooterYear() {
    var el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ============================================================
     7. SMOOTH SCROLL for anchor links (polyfill for browsers
        that don't support CSS scroll-behavior)
  ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ============================================================
     INIT — run after DOM is ready
  ============================================================ */
  function init() {
    wireQuoteButtons();
    initStickyNav();
    initHamburger();
    initRevealAnimations();
    setFooterYear();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
