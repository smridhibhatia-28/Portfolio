/* ============================================
   Hero Orbs Parallax
   ============================================ */
(function () {
  'use strict';
  const orb1 = document.querySelector('.orb1');
  const orb2 = document.querySelector('.orb2');
  const orb3 = document.querySelector('.orb3');
  if (!orb1 || !orb2 || !orb3) return;

  const STRENGTH = { orb1: 0.018, orb2: 0.012, orb3: 0.022 };
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let pos1 = { x: 0, y: 0 }, pos2 = { x: 0, y: 0 }, pos3 = { x: 0, y: 0 };

  const lerp = (current, target, ease) => current + (target - current) * ease;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - window.innerWidth / 2;
    mouseY = e.clientY - window.innerHeight / 2;
  });

  function animate() {
    pos1.x = lerp(pos1.x, mouseX * STRENGTH.orb1, 0.05);
    pos1.y = lerp(pos1.y, mouseY * STRENGTH.orb1, 0.05);
    pos2.x = lerp(pos2.x, -mouseX * STRENGTH.orb2, 0.04);
    pos2.y = lerp(pos2.y, -mouseY * STRENGTH.orb2, 0.04);
    pos3.x = lerp(pos3.x, mouseX * STRENGTH.orb3, 0.06);
    pos3.y = lerp(pos3.y, mouseY * STRENGTH.orb3, 0.06);

    orb1.style.transform = `translate(${pos1.x}px, ${pos1.y}px)`;
    orb2.style.transform = `translate(${pos2.x}px, ${pos2.y}px)`;
    orb3.style.transform = `translate(${pos3.x}px, ${pos3.y}px)`;
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ============================================
   Scroll Reveal
   ============================================ */
(function () {
  'use strict';
  const STAGGER_MS = 80;
  const THRESHOLD = 0.07;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: THRESHOLD });

  document.querySelectorAll('.reveal').forEach((el, index) => {
    el.style.transitionDelay = (index % 4) * STAGGER_MS + 'ms';
    observer.observe(el);
  });
})();

/* ============================================
   Nav Glow & Active Link
   ============================================ */
(function () {
  'use strict';
  const nav = document.getElementById('main-nav');
  const navLinks = nav ? nav.querySelectorAll('a') : [];
  const sectionIds = ['projects', 'skills', 'education', 'certifications', 'contact'];

  function handleNavGlow() {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }

  function highlightActiveLink() {
    let currentId = '';
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) currentId = id;
    });
    navLinks.forEach((link) => {
      if (link.getAttribute('href') === '#' + currentId) link.classList.add('active');
      else link.classList.remove('active');
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleNavGlow();
        highlightActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  });
  handleNavGlow();
  highlightActiveLink();
})();
