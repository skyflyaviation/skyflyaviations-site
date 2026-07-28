/* ============================================
   SkyFly Aviations — AeroLifeLine
   Premium Animations with GSAP & IntersectionObserver
   ============================================ */

// ========== REDUCED MOTION CHECK ==========
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = window.matchMedia('(max-width: 767.98px)').matches;

// ========== DOCUMENT READY ==========
document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initNavbar();
  initCounterAnimation();
  initBackToTop();
  initAOS();
  initNavScrollSpy();
  initContactForm();
  initIntersectionObserverAnimations();
  initAccessibilityEnhancements();
  
  if (!prefersReducedMotion && !isMobile) {
    initWatermarkAnimation();
    initHeroEntrance();
    initCardTilt();
    initMagneticButtons();
    initParallaxImages();
    initTimelineScroll();
    initRoadmapScroll();
    initSectionTransitions();
  }
});

// ========== LOADING SCREEN ==========
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (!loadingScreen) return;
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('loaded');
    }, 1200);
  });

  setTimeout(() => {
    if (!loadingScreen.classList.contains('loaded')) {
      loadingScreen.classList.add('loaded');
    }
  }, 3000);
}

// ========== NAVBAR ==========
function initNavbar() {
  const navbar = document.getElementById('mainNav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide/show on scroll direction
    if (currentScroll > lastScroll && currentScroll > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  });

  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('navMenu');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

// ========== COUNTER ANIMATION ==========
function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  let animationStarted = false;

  function animateCounters() {
    if (animationStarted) return;
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const step = Math.ceil(target / (duration / 16));
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          return;
        }
        counter.textContent = current;
        requestAnimationFrame(updateCounter);
      };

      updateCounter();
    });

    animationStarted = true;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats-grid');
  if (heroStats) {
    observer.observe(heroStats);
  }
}

// ========== BACK TO TOP ==========
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========== AOS INIT ==========
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  }
}

// ========== NAV SCROLL SPY ==========
function initNavScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  if (!sections.length || !navLinks.length) return;

  function updateActiveLink() {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
}

// ========== WATERMARK ANIMATION ==========
function initWatermarkAnimation() {
  const watermark = document.querySelector('.watermark-logo');
  if (!watermark || typeof gsap === 'undefined') return;

  // Slow floating rotation animation (GPU accelerated)
  gsap.to(watermark, {
    rotation: 360,
    duration: 120,
    repeat: -1,
    ease: 'none'
  });

  gsap.to(watermark, {
    y: -30,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });

  // Parallax on scroll
  gsap.to(watermark, {
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1
    },
    y: 200,
    rotation: 720,
    opacity: 0.02,
    filter: 'blur(25px)',
    ease: 'none'
  });
}

// ========== HERO ENTRANCE ==========
function initHeroEntrance() {
  if (typeof gsap === 'undefined') return;

  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo('.hero-badge', 
    { opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' },
    { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.8 }
  )
  .fromTo('.hero-title',
    { opacity: 0, y: 50, scale: 0.95, filter: 'blur(8px)' },
    { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1 },
    '-=0.4'
  )
  .fromTo('.hero-subtitle',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8 },
    '-=0.6'
  )
  .fromTo('.hero-description',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8 },
    '-=0.5'
  )
  .fromTo('.hero-buttons',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6 },
    '-=0.4'
  )
  .fromTo('.hero-stat-card',
    { opacity: 0, y: 40, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
    '-=0.3'
  );
}

// ========== 3D CARD TILT ==========
function initCardTilt() {
  const cards = document.querySelectorAll('.glass-card, .problem-card, .solution-card, .tech-card, .why-card');
  if (!cards.length) return;

  cards.forEach(card => {
    card.classList.add('tilt-card');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -8;
      const rotateY = (x - centerX) / centerX * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      
      // Dynamic glow follow
      const glowX = (x / rect.width) * 100;
      const glowY = (y / rect.height) * 100;
      card.style.setProperty('--glow-x', `${glowX}%`);
      card.style.setProperty('--glow-y', `${glowY}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });
}

// ========== MAGNETIC BUTTONS ==========
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.hero-btn, .hero-btn-outline, .nav-cta, .contact-form .btn-primary');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.classList.add('magnetic-btn');

    // Magnetic effect
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    // Ripple effect on click
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('btn-ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ========== INTERSECTION OBSERVER SCROLL ANIMATIONS (Premium) ==========
function initIntersectionObserverAnimations() {
  if (prefersReducedMotion) return;

  // Create a single IntersectionObserver for all scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: [0, 0.1, 0.25]
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-visible');
        // Stagger animation for cards
        const cards = entry.target.querySelectorAll('.glass-card, .problem-card, .solution-card, .tech-card, .why-card, .timeline-content, .roadmap-content, .hero-stat-card, .vision-icon-item');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('scroll-visible');
          }, index * 80);
        });
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });

  // Also observe hero stats
  const heroStats = document.querySelector('.hero-stats-grid');
  if (heroStats) observer.observe(heroStats);
}

// ========== PARALLAX IMAGES ==========
function initParallaxImages() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const images = document.querySelectorAll('.about-product-logo, .solution-logo, .vision-visual img, .about-image-wrapper img');
  
  images.forEach(img => {
    if (!img) return;
    gsap.fromTo(img,
      { scale: 1.1 },
      { 
        scale: 1,
        scrollTrigger: {
          trigger: img.closest('.section') || img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        ease: 'none'
      }
    );
  });
}

// ========== TIMELINE SCROLL ==========
function initTimelineScroll() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach((item, index) => {
    const marker = item.querySelector('.timeline-marker');
    const content = item.querySelector('.timeline-content');
    
    if (!marker || !content) return;

    gsap.fromTo(marker,
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.5,
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          end: 'top 50%',
          scrub: 1
        }
      }
    );

    gsap.fromTo(content,
      { x: 30, opacity: 0, filter: 'blur(4px)' },
      { 
        x: 0, 
        opacity: 1, 
        filter: 'blur(0px)', 
        duration: 0.6,
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          end: 'top 50%',
          scrub: 1
        }
      }
    );
  });
}

// ========== ROADMAP SCROLL ==========
function initRoadmapScroll() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const roadmapItems = document.querySelectorAll('.roadmap-item');
  
  roadmapItems.forEach((item, index) => {
    gsap.fromTo(item,
      { x: -20, opacity: 0, filter: 'blur(3px)' },
      { 
        x: 0, 
        opacity: 1, 
        filter: 'blur(0px)', 
        duration: 0.6,
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          end: 'top 55%',
          scrub: 1.2
        }
      }
    );
  });
}

// ========== SECTION TRANSITIONS ==========
function initSectionTransitions() {
  if (typeof gsap === 'undefined') return;

  // Smooth reveal between sections
  const sections = document.querySelectorAll('.section');
  sections.forEach((section, index) => {
    if (index === 0) return; // Skip first section (hero)

    gsap.fromTo(section,
      { opacity: 0.98 },
      { 
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1
        }
      }
    );
  });
}

// ========== CONTACT FORM ==========
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('formName');
  const emailInput = document.getElementById('formEmail');
  const orgInput = document.getElementById('formOrganization');
  const interestSelect = document.getElementById('formInterestedIn');
  const messageInput = document.getElementById('formMessage');
  const submitBtn = document.getElementById('formSubmitBtn');
  const statusDiv = document.getElementById('formStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    statusDiv.style.display = 'none';
    statusDiv.className = 'form-status';
    [nameInput, emailInput, messageInput].forEach(el => {
      el.classList.remove('is-invalid');
    });

    let isValid = true;

    if (!nameInput.value || nameInput.value.trim().length < 2) {
      nameInput.classList.add('is-invalid');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value || !emailRegex.test(emailInput.value)) {
      emailInput.classList.add('is-invalid');
      isValid = false;
    }

    if (!messageInput.value || messageInput.value.trim().length < 10) {
      messageInput.classList.add('is-invalid');
      isValid = false;
    }

    if (!isValid) return;

    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitBtn.disabled = true;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          organization: orgInput.value.trim(),
          interestedIn: interestSelect.value || '',
          message: messageInput.value.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        statusDiv.className = 'form-status form-status-success';
        statusDiv.textContent = 'Thank you for contacting SkyFly Aviations. We will get back to you shortly.';
        statusDiv.style.display = 'block';
        form.reset();
        
        // Animate success
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(statusDiv, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
        }
      } else {
        statusDiv.className = 'form-status form-status-error';
        statusDiv.textContent = data.error || 'Unable to send your message. Please try again.';
        statusDiv.style.display = 'block';
      }
    } catch (error) {
      statusDiv.className = 'form-status form-status-error';
      statusDiv.textContent = 'Unable to send your message. Please try again.';
      statusDiv.style.display = 'block';
    } finally {
      submitBtn.innerHTML = originalBtnHtml;
      submitBtn.disabled = false;
    }
  });
}

// ========== ACCESSIBILITY ENHANCEMENTS ==========
function initAccessibilityEnhancements() {
  // Keyboard navigation for cards
  document.querySelectorAll('.glass-card, .problem-card, .solution-card, .tech-card, .why-card, .vision-icon-item').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Focus trap for mobile menu
  const navbarCollapse = document.getElementById('navMenu');
  if (navbarCollapse) {
    navbarCollapse.addEventListener('shown.bs.collapse', () => {
      const focusable = navbarCollapse.querySelectorAll('a, button');
      if (focusable.length) focusable[0].focus();
    });
  }

  // Skip link for keyboard users
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.cssText = `
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--gradient-blue);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    z-index: 10000;
    font-weight: 600;
    text-decoration: none;
  `;
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '10px';
  });
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-100%';
  });

  // Add main content ID if not exists
  const hero = document.getElementById('hero');
  if (hero && !hero.id.includes('main')) {
    hero.id = 'main-content';
  }

  // Announce loading completion to screen readers
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    const observer = new MutationObserver(() => {
      if (loadingScreen.classList.contains('loaded')) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.style.cssText = 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;';
        announcement.textContent = 'Page loaded successfully';
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
        observer.disconnect();
      }
    });
    observer.observe(loadingScreen, { attributes: true, attributeFilter: ['class'] });
  }

  // Improve form accessibility
  const form = document.getElementById('contactForm');
  if (form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (!label) {
        input.setAttribute('aria-label', input.placeholder || input.getAttribute('aria-label') || '');
      }
    });
  }
}

// ========== SMOOTH SCROLL (fallback) ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});