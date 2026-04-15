// ===== Elite CLS Main JavaScript =====

document.addEventListener('DOMContentLoaded', function () {
  // Body loaded fade-in
  document.body.classList.add('loaded');

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true,
      offset: 50
    });
  }

  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ===== Sticky Navigation =====
  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 80) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    });
  }

  // ===== Mobile Menu Toggle =====
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuClose = document.getElementById('menu-close');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (menuClose && mobileMenu) {
    menuClose.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Close mobile menu on link click
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== Active Nav Link =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('text-gold');
    }
  });

  // ===== Animated Counters =====
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-counter'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 2000;
          const startTime = performance.now();

          function updateCounter(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current.toLocaleString() + suffix;
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target.toLocaleString() + suffix;
            }
          }

          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }

  // ===== Testimonial Carousel =====
  const track = document.getElementById('testimonial-track');
  const dots = document.querySelectorAll('[data-slide]');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    if (!track) return;
    const slides = track.children;
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    currentSlide = index;
    track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';

    dots.forEach(function (dot, i) {
      dot.classList.toggle('bg-gold', i === currentSlide);
      dot.classList.toggle('bg-white/40', i !== currentSlide);
    });
  }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      goToSlide(parseInt(dot.getAttribute('data-slide'), 10));
      resetAutoSlide();
    });
  });

  function resetAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(function () {
      goToSlide(currentSlide + 1);
    }, 5000);
  }

  if (track && track.children.length > 0) {
    resetAutoSlide();
  }

  // ===== Contact Form Validation =====
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;
      const fields = contactForm.querySelectorAll('[required]');

      fields.forEach(function (field) {
        const errorEl = field.parentElement.querySelector('.field-error');
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('border-red-500');
          if (errorEl) errorEl.classList.remove('hidden');
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          valid = false;
          field.classList.add('border-red-500');
          if (errorEl) {
            errorEl.textContent = 'Please enter a valid email address';
            errorEl.classList.remove('hidden');
          }
        } else {
          field.classList.remove('border-red-500');
          if (errorEl) errorEl.classList.add('hidden');
        }
      });

      if (valid) {
        const successMsg = document.getElementById('form-success');
        if (successMsg) {
          contactForm.style.display = 'none';
          successMsg.classList.remove('hidden');
        }
      }
    });

    // Clear errors on input
    contactForm.querySelectorAll('[required]').forEach(function (field) {
      field.addEventListener('input', function () {
        field.classList.remove('border-red-500');
        const errorEl = field.parentElement.querySelector('.field-error');
        if (errorEl) errorEl.classList.add('hidden');
      });
    });
  }

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
