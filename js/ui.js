// ui.js — theme toggle, scroll effects, loader, parallax helpers
import { $, $all } from './utils.js';

export function initUI() {
  setupThemeToggle();
  initScrollProgress();
  initScrollToTop();
  initReveal();
  initHeaderFade();
  initPageLoader();
  initParallaxLogo();
}

function setupThemeToggle() {
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

function initScrollProgress() {
  const bar = $('#progress-bar');
  if (!bar) return;
  const handler = () => {
    const scrollTop = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height ? (scrollTop / height) * 100 : 0;
    bar.style.width = `${scrolled}%`;
  };
  window.addEventListener('scroll', handler, { passive: true });
  handler();
}

function initScrollToTop() {
  const btn = $('#scrollTopBtn');
  if (!btn) return;
  const toggle = () => {
    btn.style.display = window.scrollY > 260 ? 'block' : 'none';
  };
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initReveal() {
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

function initHeaderFade() {
  const header = document.querySelector('header');
  if (!header) return;
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.pageYOffset || document.documentElement.scrollTop;
    if (current > lastScroll && current > 120) header.classList.add('hidden');
    else header.classList.remove('hidden');
    lastScroll = current <= 0 ? 0 : current;
  }, { passive: true });
}

function initPageLoader() {
  const loader = $('#page-loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 600);
  });
}

function initParallaxLogo() {
  const logoBg = $('.logo-bg');
  if (!logoBg) return;
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
  const animate = () => {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    logoBg.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))`;
    requestAnimationFrame(animate);
  };
  document.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 60;
    targetY = (e.clientY / window.innerHeight - 0.5) * 60;
  });
  animate();
}

export function showModal(modalEl) { if (!modalEl) return; modalEl.classList.add('active'); }
export function hideModal(modalEl) { if (!modalEl) return; modalEl.classList.remove('active'); }
