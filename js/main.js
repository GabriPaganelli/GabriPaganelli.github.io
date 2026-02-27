/* ===================================================================
   MAIN.JS — Gabriele Paganelli Personal Site
=================================================================== */

(function () {
  'use strict';

  // === Navbar scroll effect ===
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // === Mobile hamburger menu ===
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close on mobile link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // === Scroll Spy — active nav link ===
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navAnchors = document.querySelectorAll(
    '.nav-links a[href^="#"], .nav-mobile a[href^="#"]'
  );

  function updateActiveNav() {
    if (!sections.length) return;

    const scrollY = window.scrollY;
    let current = sections[0].id;

    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop - 80) {
        current = sec.id;
      }
    });

    navAnchors.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${current}`);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // === Project Accordion ===
  document.querySelectorAll('.project-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.project-card');
      if (!card) return;
      const isOpen = card.classList.contains('open');

      // Close all open cards
      document.querySelectorAll('.project-card.open').forEach(c => {
        if (c !== card) {
          c.classList.remove('open');
          c.querySelector('.project-header')?.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle this card
      card.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', (!isOpen).toString());
    });
  });

  // === Intersection Observer — fade-in animations ===
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

})();

// === PDF.js rendering (project pages only) ===
(function () {
  if (typeof pdfjsLib === 'undefined') return;

  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  async function renderPDF(url, canvas) {
    try {
      const pdf = await pdfjsLib.getDocument(url).promise;
      const page = await pdf.getPage(1);
      const container = canvas.parentElement;
      const containerWidth = container.offsetWidth || 600;
      const dpr = window.devicePixelRatio || 1;
      const naturalVp = page.getViewport({ scale: 1 });
      const scale = (containerWidth / naturalVp.width) * dpr;
      const viewport = page.getViewport({ scale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width  = containerWidth + 'px';
      canvas.style.height = Math.round(viewport.height / dpr) + 'px';
      await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
      canvas.setAttribute('data-rendered', '');
    } catch (err) {
      console.warn('PDF render failed:', url, err);
    }
  }

  document.querySelectorAll('canvas[data-pdf-src]').forEach(canvas => {
    renderPDF(canvas.dataset.pdfSrc, canvas);
  });
})();
