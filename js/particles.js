// particles.js — site-wide particle system (moved from main script)
import { $, $all } from './utils.js';

export function initParticles() {
  injectParticleStyles();
  createHeroParticles();
  createFullSiteParticles();
  attachHoverBursts();
}

function createHeroParticles() {
  const hero = $('.hero');
  if (!hero) return;
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    hero.appendChild(particle);
  }
}

function createFullSiteParticles() {
  if (document.getElementById('particle-container')) return;

  const particleContainer = document.createElement('div');
  particleContainer.id = 'particle-container';
  particleContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  `;

  document.body.insertBefore(particleContainer, document.body.firstChild);

  const particleCount = 50;
  for (let i = 0; i < particleCount; i++) {
    createParticle(particleContainer);
  }

  setInterval(() => {
    if (document.querySelectorAll('.particle').length < particleCount) {
      createParticle(particleContainer);
    }
  }, 3000);
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';

  const startX = Math.random() * 100;
  const size = Math.random() * 4 + 2;
  const duration = Math.random() * 10 + 15;
  const delay = Math.random() * 5;
  const opacity = Math.random() * 0.5 + 0.3;
  const drift = (Math.random() - 0.5) * 200;

  particle.style.cssText = `
    position: absolute;
    left: ${startX}%;
    bottom: -10px;
    width: ${size}px;
    height: ${size}px;
    background: radial-gradient(circle, rgba(192, 132, 252, ${opacity}), rgba(139, 92, 246, ${opacity * 0.5}));
    border-radius: 50%;
    animation: floatUp ${duration}s ease-in-out ${delay}s infinite;
    box-shadow: 0 0 ${size * 2}px rgba(192, 132, 252, 0.5);
    --drift: ${drift}px;
  `;

  container.appendChild(particle);

  setTimeout(() => particle.remove(), (duration + delay) * 1000);
}

function attachHoverBursts() {
  const sections = $all('.content, .hero');
  sections.forEach((section) => {
    section.addEventListener('mouseenter', () => {
      const container = document.getElementById('particle-container');
      if (!container) return;
      for (let i = 0; i < 5; i++) {
        setTimeout(() => createParticle(container), i * 100);
      }
    });
  });
}

function injectParticleStyles() {
  if (document.getElementById('particle-style')) return;
  const style = document.createElement('style');
  style.id = 'particle-style';
  style.textContent = `
    @keyframes floatUp {
      0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
      10% { opacity: 1; }
      50% { transform: translateY(-50vh) translateX(calc(var(--drift) * 0.5)) scale(1.2); opacity: 0.8; }
      90% { opacity: 0.5; }
      100% { transform: translateY(-100vh) translateX(var(--drift)) scale(0.5); opacity: 0; }
    }
    .particle { filter: blur(0.5px); }
    .content:hover ~ #particle-container .particle,
    .hero:hover ~ #particle-container .particle { animation-duration: 10s !important; }
  `;
  document.head.appendChild(style);
}
