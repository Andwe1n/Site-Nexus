// ui.js — theme toggle, modal helpers, mobile menu
import { $ } from './utils.js';

export function initUI() {
  initThemeToggle();
  initMobileMenu();
}

function initThemeToggle() {
  const themeSwitch = document.querySelector('.input__check');
  if (!themeSwitch) return;
  
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    themeSwitch.checked = true;
  }
  
  themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
      document.body.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  });
}

function initMobileMenu() {
  const hamburger = document.getElementById('hamburgerBtn');
  const nav = document.getElementById('navMenu');
  const overlay = document.getElementById('menuOverlay');
  const navLinks = document.querySelectorAll('nav a');

  if (!hamburger || !nav) return;

  // Toggle menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  });

  // Close on overlay click
  overlay.addEventListener('click', () => {
    closeMenu();
  });

  // Close on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  function closeMenu() {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      closeMenu();
    }
  });
}

export function showModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add('active');
}

export function hideModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove('active');
}