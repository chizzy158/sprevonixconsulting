/* ============================================================
   SPREVONIX — MAIN.JS
   ============================================================ */

// ── Mobile nav toggle ──
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggle.querySelectorAll('span').forEach((s, i) => {
      if (isOpen) {
        if (i === 0) s.style.transform = 'translateY(6.5px) rotate(45deg)';
        if (i === 1) s.style.opacity = '0';
        if (i === 2) s.style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        s.style.transform = '';
        s.style.opacity = '';
      }
    });
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

// ── Nav background solidify on scroll ──
const navWrap = document.querySelector('.nav-wrap');
if (navWrap) {
  window.addEventListener('scroll', () => {
    navWrap.style.borderBottomColor = window.scrollY > 20
      ? 'rgba(255,255,255,0.1)'
      : 'rgba(255,255,255,0.07)';
  }, { passive: true });
}

// ── Contact form: fake submit (replace with real backend / form service) ──
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

if (form && success) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = '#E53E3E';
        field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
      }
    });

    if (!valid) return;

    // Simulate submission
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      form.hidden = true;
      success.hidden = false;
    }, 900);
  });
}

// ── Subtle fade-in on scroll for cards ──
if ('IntersectionObserver' in window) {
  const cards = document.querySelectorAll('.service-card, .value-item, .team-card, .step');
  const style = document.createElement('style');
  style.textContent = `
    .fade-up { opacity: 0; transform: translateY(18px); transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1); }
    .fade-up.visible { opacity: 1; transform: none; }
  `;
  document.head.appendChild(style);

  cards.forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });

  cards.forEach(el => obs.observe(el));
}
