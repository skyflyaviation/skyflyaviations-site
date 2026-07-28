/* ============================================
   SkyFly Aviations — AeroLifeLine
   Main JavaScript File
   ============================================ */

// ========== DOCUMENT READY ==========
document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initNavbar();
  initCounterAnimation();
  initBackToTop();
  initAOS();
  initNavScrollSpy();
  initContactForm();
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

  // Fallback: hide after max 3 seconds if load event already fired
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
    
    // Add shadow on scroll
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Auto-close mobile menu on link click
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
      const duration = 2000; // ms
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

  // Trigger when visible
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
  updateActiveLink(); // Initial call
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

    // Reset previous state
    statusDiv.style.display = 'none';
    statusDiv.className = 'form-status';
    [nameInput, emailInput, messageInput].forEach(el => {
      el.classList.remove('is-invalid');
    });

    // Frontend validation
    let isValid = true;

    if (!nameInput.value || nameInput.value.trim().length < 2) {
      nameInput.classList.add('is-invalid');
      isValid = false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value || !emailRegex.test(emailInput.value)) {
      emailInput.classList.add('is-invalid');
      isValid = false;
    }

    if (!messageInput.value || messageInput.value.trim().length < 10) {
      messageInput.classList.add('is-invalid');
      isValid = false;
    }

    if (!isValid) return;

    // Show loading state
    var originalBtnHtml = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitBtn.disabled = true;

    try {
      var response = await fetch('/api/contact', {
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

      var data = await response.json();

      if (response.ok && data.success) {
        // Success
        statusDiv.className = 'form-status form-status-success';
        statusDiv.textContent = 'Thank you for contacting SkyFly Aviations. We will get back to you shortly.';
        statusDiv.style.display = 'block';
        form.reset();
      } else {
        // Server returned error
        statusDiv.className = 'form-status form-status-error';
        statusDiv.textContent = data.error || 'Unable to send your message. Please try again.';
        statusDiv.style.display = 'block';
      }
    } catch (error) {
      // Network or other error
      statusDiv.className = 'form-status form-status-error';
      statusDiv.textContent = 'Unable to send your message. Please try again.';
      statusDiv.style.display = 'block';
    } finally {
      // Restore button
      submitBtn.innerHTML = originalBtnHtml;
      submitBtn.disabled = false;
    }
  });
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