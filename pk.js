/* =========================================
   PK PORTFOLIO - pk.js
   Full neon interactive JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== CUSTOM CURSOR ===== */
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
  });

  // Smooth cursor ring follow
  function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor expand on hover
  document.querySelectorAll('a, button, .filter-btn, .portfolio-card, .skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.width = '60px';
      cursorRing.style.height = '60px';
      cursor.style.transform += ' scale(0.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.width = '36px';
      cursorRing.style.height = '36px';
    });
  });


  /* ===== NEON PARTICLES ===== */
  const particlesContainer = document.getElementById('particles');
  const PARTICLE_COUNT = 25;
  const colors = ['#ff2a6d', '#05d9e8', '#9b5de5', '#f9f002'];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    createParticle();
  }

  function createParticle() {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${color};
      box-shadow: 0 0 ${size * 3}px ${color};
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    particlesContainer.appendChild(p);
  }


  /* ===== MOBILE MENU ===== */
  const mobileMenuBtn = document.getElementById('mobile-menu');
  const navMenu = document.getElementById('nav-menu');

  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    });
  });


  /* ===== HEADER SCROLL EFFECT ===== */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });


  /* ===== ACTIVE NAV LINK ON SCROLL ===== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observerNav.observe(s));


  /* ===== TYPED TEXT EFFECT ===== */
  const phrases = [
    'UI/UX Designer',
    'Frontend Developer',
    'Creative Coder',
    'Problem Solver',
    'Neon Enthusiast'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedEl = document.getElementById('typed-text');

  function typeEffect() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIndex--);
    } else {
      typedEl.textContent = current.substring(0, charIndex++);
    }

    let delay = isDeleting ? 60 : 100;
    if (!isDeleting && charIndex === current.length + 1) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === -1) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      charIndex = 0;
      delay = 400;
    }
    setTimeout(typeEffect, delay);
  }
  typeEffect();


  /* ===== COUNTER ANIMATION ===== */
  function animateCounter(el, target, suffix = '+') {
    let count = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count + suffix;
      if (count >= target) clearInterval(timer);
    }, 50);
  }

  let countersStarted = false;
  const heroSection = document.getElementById('home');
  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      setTimeout(() => animateCounter(document.getElementById('counter-exp'), 2), 800);
      setTimeout(() => animateCounter(document.getElementById('counter-proj'), 15), 1000);
      setTimeout(() => animateCounter(document.getElementById('counter-clients'), 10), 1200);
    }
  }, { threshold: 0.3 });
  counterObserver.observe(heroSection);


  /* ===== SKILL BAR ANIMATION ===== */
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.width + '%';
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(fill => skillObserver.observe(fill));


  /* ===== FADE-IN ON SCROLL ===== */
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => fadeObserver.observe(el));


  /* ===== PORTFOLIO FILTER ===== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      portfolioCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => {
          card.style.display = match ? 'block' : 'none';
          if (match) {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          }
        }, 200);
        card.style.transition = 'opacity 0.3s, transform 0.3s';
      });
    });
  });


  /* ===== CONTACT FORM ===== */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      showStatus('error', '⚠ Please fill in all required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus('error', '⚠ Please enter a valid email address.');
      return;
    }

    // Simulate sending
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

    setTimeout(() => {
      showStatus('success', '✓ Message sent! I\'ll get back to you within 24 hours.');
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    }, 1800);
  });

  function showStatus(type, msg) {
    formStatus.className = 'form-status ' + type;
    formStatus.textContent = msg;
    setTimeout(() => {
      formStatus.className = 'form-status';
    }, 5000);
  }

  // Input focus neon glow
  document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
    input.addEventListener('focus', () => {
      input.style.borderColor = 'var(--neon-cyan)';
      input.style.boxShadow = '0 0 15px rgba(5,217,232,0.25)';
    });
    input.addEventListener('blur', () => {
      input.style.borderColor = '';
      input.style.boxShadow = '';
    });
  });


  /* ===== SCROLL TO TOP ===== */
  const scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ===== SMOOTH ANCHOR LINKS ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ===== NEON CLICK RIPPLE ===== */
  document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: fixed;
      left: ${e.clientX - 10}px;
      top: ${e.clientY - 10}px;
      width: 20px; height: 20px;
      border-radius: 50%;
      border: 2px solid var(--neon-cyan);
      pointer-events: none;
      z-index: 9997;
      animation: rippleOut 0.6s ease-out forwards;
    `;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });

  // Inject ripple keyframes once
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleOut {
      from { transform: scale(1); opacity: 0.8; }
      to   { transform: scale(3); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

});
