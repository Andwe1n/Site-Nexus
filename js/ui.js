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

export function showModal(modalEl) { if (!modalEl) return; modalEl.classList.add('active'); }
export function hideModal(modalEl) { if (!modalEl) return; modalEl.classList.remove('active'); }
