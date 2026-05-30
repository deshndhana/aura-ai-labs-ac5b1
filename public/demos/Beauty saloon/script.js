/* ============================================================
   LUMIÈRE BEAUTY SALON - Main JavaScript
   ============================================================ */

'use strict';

// ============================================================
// LOADER
// ============================================================
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.querySelector('.loader');
    if (loader) loader.classList.add('hidden');
  }, 1600);
});

// ============================================================
// NAV: scroll behavior + hamburger
// ============================================================
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.nav__hamburger');
const navLinks = document.querySelector('.nav__links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav?.classList.add('scrolled');
  } else {
    nav?.classList.remove('scrolled');
  }
  toggleBackToTop();
});

// Set nav as scrolled on page load for inner pages
if (window.scrollY > 50 || document.body.dataset.page !== 'home') {
  nav?.classList.add('scrolled');
}

hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = navLinks?.classList.contains('open') ? 'rotate(45deg) translate(4.5px, 4.5px)' : '';
  spans[1].style.opacity = navLinks?.classList.contains('open') ? '0' : '';
  spans[2].style.transform = navLinks?.classList.contains('open') ? 'rotate(-45deg) translate(4.5px, -4.5px)' : '';
});

// Close nav on link click
navLinks?.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Active nav link
const setActiveNav = () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
};
setActiveNav();

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================================================
// BACK TO TOP
// ============================================================
const backToTop = document.querySelector('.back-to-top');

const toggleBackToTop = () => {
  if (window.scrollY > 500) {
    backToTop?.classList.add('visible');
  } else {
    backToTop?.classList.remove('visible');
  }
};

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// GALLERY LIGHTBOX
// ============================================================
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox__img');
const lightboxClose = document.querySelector('.lightbox__close');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (img && lightbox && lightboxImg) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox?.classList.remove('active');
  document.body.style.overflow = '';
}

// ============================================================
// BOOKING FORM VALIDATION
// ============================================================
const bookingForm = document.getElementById('booking-form');

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm(bookingForm)) {
      showSuccess(bookingForm, 'booking-success');
      bookingForm.reset();
    }
  });
}

// ============================================================
// CONTACT FORM VALIDATION
// ============================================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm(contactForm)) {
      showSuccess(contactForm, 'contact-success');
      contactForm.reset();
    }
  });
}

// ============================================================
// FORM VALIDATION HELPERS
// ============================================================
function validateForm(form) {
  let valid = true;
  clearErrors(form);

  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      showError(field, 'This field is required.');
      valid = false;
    }
  });

  // Email validation
  form.querySelectorAll('input[type="email"]').forEach(field => {
    if (field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      showError(field, 'Please enter a valid email address.');
      valid = false;
    }
  });

  // Phone validation
  form.querySelectorAll('input[type="tel"]').forEach(field => {
    if (field.value && !/^[\d\s\+\-\(\)]{7,}$/.test(field.value)) {
      showError(field, 'Please enter a valid phone number.');
      valid = false;
    }
  });

  return valid;
}

function showError(field, message) {
  field.style.borderColor = '#e07070';
  const err = document.createElement('span');
  err.className = 'form-error';
  err.textContent = message;
  field.parentNode.appendChild(err);
}

function clearErrors(form) {
  form.querySelectorAll('.form-error').forEach(e => e.remove());
  form.querySelectorAll('input, textarea, select').forEach(f => {
    f.style.borderColor = '';
  });
}

function showSuccess(form, successId) {
  const success = document.getElementById(successId);
  if (success) {
    success.style.display = 'block';
    success.style.animation = 'fadeInUp 0.4s ease';
    setTimeout(() => {
      success.style.display = 'none';
    }, 5000);
  }
}

// ============================================================
// SMOOTH ANCHOR LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================================
// DATE PICKER - min date = today
// ============================================================
const dateInput = document.getElementById('appointment-date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

// ============================================================
// COUNTER ANIMATION (About page stats)
// ============================================================
const counters = document.querySelectorAll('[data-count]');

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const duration = 1500;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target + (el.dataset.suffix || '');
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current) + (el.dataset.suffix || '');
        }
      }, 16);

      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => countObserver.observe(c));

// ============================================================
// MARQUEE: duplicate items for seamless loop
// ============================================================
const marqueeTrack = document.querySelector('.intro-strip__track');
if (marqueeTrack) {
  const clone = marqueeTrack.cloneNode(true);
  marqueeTrack.parentNode.appendChild(clone);
}

// ============================================================
// INNER PAGE: force nav scrolled state
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page !== 'home') {
    nav?.classList.add('scrolled');
  }
});
