/* ============================================================
   GEMIGEDARA HELA RASA — Main JavaScript
   ============================================================ */

/* ============================================================
   1. PAGE LOADER
   ============================================================ */
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 1200);
  document.body.style.overflow = 'hidden';
});


/* ============================================================
   2. AOS — ANIMATE ON SCROLL
   ============================================================ */
AOS.init({
  duration: 800,
  easing: 'ease-out-quad',
  once: true,
  offset: 60,
});


/* ============================================================
   3. STICKY NAVBAR — transparent → solid on scroll
   ============================================================ */
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });


/* ============================================================
   4. MOBILE NAVIGATION TOGGLE
   ============================================================ */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Create overlay element for mobile nav backdrop
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

function openNav() {
  navLinks.classList.add('open');
  overlay.classList.add('open');
  navToggle.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeNav() {
  navLinks.classList.remove('open');
  overlay.classList.remove('open');
  navToggle.classList.remove('open');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  if (navLinks.classList.contains('open')) closeNav();
  else openNav();
});

overlay.addEventListener('click', closeNav);

// Close nav when a link is clicked
document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', closeNav);
});


/* ============================================================
   5. SMOOTH SCROLL & ACTIVE NAV LINK
   ============================================================ */
// Highlight active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinkEls.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });


/* ============================================================
   6. MENU CATEGORY TABS
   ============================================================ */
const tabBtns = document.querySelectorAll('.tab-btn');
const menuGrids = document.querySelectorAll('.menu-grid');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.cat;

    // Update active button
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show matching grid, hide others
    menuGrids.forEach(grid => {
      if (grid.id === `cat-${cat}`) {
        grid.classList.add('active');
        // Re-trigger AOS for newly shown items
        AOS.refresh();
      } else {
        grid.classList.remove('active');
      }
    });
  });
});


/* ============================================================
   7. GALLERY LIGHTBOX
   ============================================================ */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentGalleryIndex = 0;

// Build array of high-res image URLs from data-src attributes
const galleryImages = Array.from(galleryItems).map(item => item.dataset.src);

function openLightbox(index) {
  currentGalleryIndex = index;
  lightboxImg.src = galleryImages[index];
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  // Clear src after animation
  setTimeout(() => { lightboxImg.src = ''; }, 300);
}

function showPrev() {
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.style.opacity = '0';
  setTimeout(() => {
    lightboxImg.src = galleryImages[currentGalleryIndex];
    lightboxImg.style.opacity = '1';
  }, 150);
}

function showNext() {
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
  lightboxImg.style.opacity = '0';
  setTimeout(() => {
    lightboxImg.src = galleryImages[currentGalleryIndex];
    lightboxImg.style.opacity = '1';
  }, 150);
}

// Add click listeners to gallery items
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => openLightbox(index));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

// Close on backdrop click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});

// Add smooth transition style for lightbox image
lightboxImg.style.transition = 'opacity 0.15s ease';


/* ============================================================
   8. CONTACT FORM — WhatsApp redirect on submit
   CHANGE WHATSAPP NUMBER BELOW
   ============================================================ */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('formName').value.trim();
  const phone = document.getElementById('formPhone').value.trim();
  const message = document.getElementById('formMessage').value.trim();

  if (!name || !phone || !message) {
    formStatus.textContent = 'Please fill in all fields.';
    formStatus.className = 'form-status error';
    return;
  }

  // Compose WhatsApp message
  const waMessage = encodeURIComponent(
    `Hello! My name is ${name}.\nPhone: ${phone}\nMessage: ${message}`
  );

  // CHANGE WHATSAPP NUMBER HERE (digits only, with country code, no +)
  const waNumber = '94771234567';
  const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

  formStatus.textContent = '✅ Redirecting to WhatsApp...';
  formStatus.className = 'form-status success';

  setTimeout(() => {
    window.open(waUrl, '_blank');
    contactForm.reset();
    formStatus.textContent = '';
  }, 800);
});


/* ============================================================
   9. BACK TO TOP BUTTON
   ============================================================ */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ============================================================
   10. FLOATING PARTICLES in Hero Section
   ============================================================ */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const emojis = ['🌶', '🌿', '🍛', '🥥', '✨', '⭐'];
  const count = 18;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    p.textContent = emoji;

    // Random positions & animation properties
    const left = Math.random() * 100;
    const size = 0.8 + Math.random() * 1.2;
    const duration = 8 + Math.random() * 12;
    const delay = -Math.random() * duration;
    const opacity = 0.08 + Math.random() * 0.15;

    p.style.cssText = `
      position: absolute;
      left: ${left}%;
      bottom: -50px;
      font-size: ${size}rem;
      opacity: ${opacity};
      animation: floatParticle ${duration}s ${delay}s linear infinite;
      pointer-events: none;
      user-select: none;
    `;

    container.appendChild(p);
  }

  // Inject keyframes for particles if not already done
  if (!document.getElementById('particle-style')) {
    const style = document.createElement('style');
    style.id = 'particle-style';
    style.textContent = `
      @keyframes floatParticle {
        0%   { transform: translateY(0) rotate(0deg); opacity: var(--op, 0.1); }
        50%  { transform: translateY(-50vh) rotate(180deg); }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

createParticles();


/* ============================================================
   11. IMAGE LOADING — Add graceful fade-in for all images
   ============================================================ */
document.querySelectorAll('img').forEach(img => {
  img.style.transition = 'opacity 0.4s ease';
  if (!img.complete) {
    img.style.opacity = '0';
    img.addEventListener('load', () => { img.style.opacity = '1'; });
    img.addEventListener('error', () => {
      // Fallback: show a gradient placeholder on image error
      img.style.opacity = '0.4';
      img.style.background = 'linear-gradient(135deg, #C7511F22, #2E7D3222)';
    });
  }
});


/* ============================================================
   12. MENU CARD — "Order" button ripple effect
   ============================================================ */
document.querySelectorAll('.btn-order').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    ripple.style.cssText = `
      position: absolute;
      width: 0; height: 0;
      background: rgba(255,255,255,0.4);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: ripple 0.5s ease-out forwards;
      left: ${e.clientX - rect.left}px;
      top: ${e.clientY - rect.top}px;
      pointer-events: none;
    `;

    if (!document.getElementById('ripple-style')) {
      const s = document.createElement('style');
      s.id = 'ripple-style';
      s.textContent = `
        @keyframes ripple {
          to { width: 120px; height: 120px; opacity: 0; }
        }
        .btn-order { position: relative; overflow: hidden; }
      `;
      document.head.appendChild(s);
    }

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* ============================================================
   END OF SCRIPT
   ============================================================ */
