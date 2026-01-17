// ui.js — theme toggle, modal helpers, mobile menu (iPhone & Android compatible)
import { $ } from './utils.js';

export function initUI() {
  initThemeToggle();
  initMobileMenu();
  initMemberPopups();
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

  if (!hamburger || !nav) {
    console.log('Hamburger or nav not found');
    return;
  }

  // Toggle menu
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close on overlay click
  if (overlay) {
    overlay.addEventListener('click', () => {
      closeMenu();
    });
  }

  // Close on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      closeMenu();
    }
  });

  // Prevent scroll when menu is open
  function toggleMenu() {
    const isActive = nav.classList.contains('active');
    
    if (isActive) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    hamburger.classList.add('active');
    nav.classList.add('active');
    if (overlay) overlay.classList.add('active');
    
    // Prevent body scroll
    document.body.classList.add('menu-open');
    
    // iOS specific - prevent background scroll
    if (isIOS()) {
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    
    // Restore body scroll
    document.body.classList.remove('menu-open');
    
    // iOS specific - restore scroll position
    if (isIOS()) {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    } else {
      document.body.style.overflow = '';
    }
  }

  // Detect iOS
  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  // Fix viewport height on mobile (especially iPhone)
  function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  setVH();
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);
}

// Touch-friendly member popups for mobile
function initMemberPopups() {
  const members = document.querySelectorAll('.membru');
  
  // Only for touch devices
  if (!('ontouchstart' in window)) return;

  members.forEach(member => {
    let tapTimer;
    let isPopupOpen = false;

    // Handle tap to show popup
    member.addEventListener('touchstart', (e) => {
      // Prevent default to avoid ghost clicks
      if (e.target.closest('.hover-popup')) return;
      
      tapTimer = setTimeout(() => {
        if (!isPopupOpen) {
          // Close all other popups
          document.querySelectorAll('.membru.show-popup').forEach(m => {
            m.classList.remove('show-popup');
          });
          
          member.classList.add('show-popup');
          isPopupOpen = true;
        }
      }, 200);
    });

    member.addEventListener('touchend', () => {
      clearTimeout(tapTimer);
    });

    member.addEventListener('touchmove', () => {
      clearTimeout(tapTimer);
    });
  });

  // Close popup when tapping outside
  document.addEventListener('touchstart', (e) => {
    if (!e.target.closest('.membru')) {
      document.querySelectorAll('.membru.show-popup').forEach(m => {
        m.classList.remove('show-popup');
      });
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