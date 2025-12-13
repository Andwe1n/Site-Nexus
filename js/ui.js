// ui.js — theme toggle, scroll helpers, modals, and page interactions
import { $, $all, on, setGlobal } from './utils.js';

export function initUI() {
  initThemeToggle();
  initScrollHelpers();
  initLogoParallax();
  initScrollReveal();
  initLoginModal();
  initCookiePopup();
  initKeyboardShortcuts();
  initPageLoader();
  exposeGlobalHelpers();
}

function exposeGlobalHelpers() {
  setGlobal('scrollToSection', (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });

  setGlobal('openMaterie', (materie) => {
    alert(
      `Ai selectat materia: ${materie.toUpperCase()}!\nAceastă funcționalitate va deschide o pagină dedicată în versiunea completă.`
    );
  });
}

function initThemeToggle() {
  const themeSwitch = document.querySelector('.input__check');
  if (!themeSwitch) return;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    themeSwitch.checked = true;
  } else {
    document.body.classList.remove('light');
    themeSwitch.checked = false;
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

function initScrollHelpers() {
  const scrollBtn = $('#scrollTopBtn');
  const header = document.querySelector('header');
  const progressBar = $('#progress-bar');
  let lastScroll = 0;

  const handleScroll = () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollBtn) scrollBtn.style.display = currentScroll > 300 ? 'block' : 'none';

    if (header) {
      if (currentScroll > lastScroll && currentScroll > 100) header.classList.add('hidden');
      else header.classList.remove('hidden');
      lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    }

    if (progressBar) {
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height ? (currentScroll / height) * 100 : 0;
      progressBar.style.width = `${scrolled}%`;
    }
  };

  on(window, 'scroll', handleScroll);
  if (scrollBtn) on(scrollBtn, 'click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  handleScroll();
}

function initLogoParallax() {
  const logoBg = document.querySelector('.logo-bg');
  if (!logoBg) return;

  let targetX = 0; let targetY = 0; let currentX = 0; let currentY = 0;
  document.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 100;
    targetY = (e.clientY / window.innerHeight - 0.5) * 100;
  });

  const animate = () => {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    logoBg.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))`;
    requestAnimationFrame(animate);
  };
  animate();
}

function initScrollReveal() {
  const reveals = $all('.reveal');
  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }
}

function initLoginModal() {
  const loginBtn = $('#login-btn');
  const loginContainer = $('#login-container');
  const loginClose = document.querySelector('.login-close');
  const loginForm = $('#login-form');

  if (loginBtn && loginContainer) on(loginBtn, 'click', () => (loginContainer.style.display = 'flex'));
  if (loginClose && loginContainer) on(loginClose, 'click', () => (loginContainer.style.display = 'none'));
  if (loginContainer) on(window, 'click', (e) => { if (e.target === loginContainer) loginContainer.style.display = 'none'; });
  if (loginForm) on(loginForm, 'submit', (e) => {
    e.preventDefault();
    alert('Autentificare reușită! (aceasta este o funcționalitate demonstrativă)');
    if (loginContainer) loginContainer.style.display = 'none';
  });
}

function initCookiePopup() {
  const cookiePopup = $('#cookie-popup');
  const acceptBtn = $('#accept-cookies');
  const declineBtn = $('#decline-cookies');

  if (cookiePopup) setTimeout(() => { cookiePopup.style.display = 'flex'; }, 3000);
  if (acceptBtn) on(acceptBtn, 'click', () => { if (cookiePopup) cookiePopup.style.display = 'none'; });
  if (declineBtn) on(declineBtn, 'click', () => { if (cookiePopup) cookiePopup.style.display = 'none'; });
}

function initKeyboardShortcuts() {
  on(document, 'keydown', (e) => {
    if (e.key !== 'Escape') return;
    const popup = document.getElementById('popup');
    const cookiePopup = $('#cookie-popup');
    const loginContainer = $('#login-container');

    if (popup) popup.classList.remove('active');
    if (cookiePopup) cookiePopup.style.display = 'none';
    if (loginContainer) loginContainer.style.display = 'none';
  });
}

function initPageLoader() {
  on(window, 'load', () => {
    const loader = $('#page-loader');
    if (loader) {
      setTimeout(() => loader.classList.add('hidden'), 1000);
    }
  });
}
