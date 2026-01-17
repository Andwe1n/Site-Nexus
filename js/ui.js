// ui.js — theme toggle, modal helpers, simple UI initialization
import { $ } from './utils.js';

export function initUI() {
  const themeSwitch = document.querySelector('.input__check');
  if (!themeSwitch) return;
  const saved = localStorage.getItem('theme');
  if (saved === 'light') { document.body.classList.add('light'); themeSwitch.checked = true; }
  themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) { document.body.classList.add('light'); localStorage.setItem('theme','light'); }
    else { document.body.classList.remove('light'); localStorage.setItem('theme','dark'); }
  });
}

export function initMobileMenu() {
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
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}


export function showModal(modalEl) { if (!modalEl) return; modalEl.classList.add('active'); }
export function hideModal(modalEl) { if (!modalEl) return; modalEl.classList.remove('active'); }
