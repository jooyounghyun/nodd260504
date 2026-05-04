import './components/navbar.js';
import './components/hero.js';
import './components/marquee.js';
import './components/how-it-works.js';
import './components/why-us.js';
import './components/creators.js';
import './components/pricing.js';
import './components/reviews.js';
import './components/cta.js';
import './components/footer.js';
import './components/modal.js';

// Global Logic
document.addEventListener('DOMContentLoaded', () => {
  // Custom Cursor
  const cur = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  (function tick() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    if (cur && ring) {
      cur.style.left = `${mx - 6}px`;
      cur.style.top = `${my - 6}px`;
      ring.style.left = `${rx - 20}px`;
      ring.style.top = `${ry - 20}px`;
    }
    requestAnimationFrame(tick);
  })();

  // Scroll Behavior for Navbar
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.toggleAttribute('scrolled', window.scrollY > 60);
    }
  });

  // Reveal Animations on Scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  // Observe elements with .reveal class
  const observeReveals = () => {
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  };
  
  // Custom event for components to notify when they are ready
  window.addEventListener('nodd-component-ready', observeReveals);
  observeReveals();

  // Global Scroll Function
  window.smoothTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Global Modal Control
  window.openModal = (type) => {
    const modal = document.getElementById('modal');
    if (modal) modal.open(type);
  };

  window.closeModal = () => {
    const modal = document.getElementById('modal');
    if (modal) modal.close();
  };
});
