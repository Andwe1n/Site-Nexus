// members.js — member hover/click logic and popup placement
import { $all, on } from './utils.js';

export function initMembers(){
  const members = $all('.membru');
  const popup = document.getElementById('popup');
  const popupNume = document.getElementById('popup-nume');
  const popupRol = document.getElementById('popup-rol');
  const popupDescriere = document.getElementById('popup-descriere');
  const closeBtn = document.querySelector('.close');

  members.forEach(m => {
    on(m, 'click', () => {
      if (!popup) return;
      popupNume.textContent = m.dataset.nume || '';
      popupRol.textContent = m.dataset.rol || '';
      popupDescriere.textContent = m.dataset.descriere || '';
      popup.classList.add('active');
    });
  });

  if (closeBtn) on(closeBtn, 'click', () => popup?.classList.remove('active'));
  if (popup) on(popup, 'click', (e) => { if (e.target === popup) popup.classList.remove('active'); });
}
