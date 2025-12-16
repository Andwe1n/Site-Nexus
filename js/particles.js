// particles.js — advanced synchronized particle system with configuration

// Configuration options - easy to adjust
const PARTICLE_CONFIG = {
  count: 30,           // Total number of regular particles
  starCount: 5,        // Number of special "star" particles
  minSize: 2,          // Minimum particle size (px)
  maxSize: 6,          // Maximum particle size (px)
  minDuration: 8,      // Minimum animation duration (seconds)
  maxDuration: 13,     // Maximum animation duration (seconds)
  maxDrift: 100,       // Maximum horizontal drift (px)
  minOpacity: 0.3,     // Minimum particle opacity
  maxOpacity: 0.8,     // Maximum particle opacity
  colors: {
    primary: 'rgba(192, 132, 252, 0.8)',
    secondary: 'rgba(139, 92, 246, 0.6)',
    star: 'rgba(255, 255, 255, 1)'
  }
};

export function initParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Clear any existing particles
  const existingParticles = hero.querySelectorAll('.particle');
  existingParticles.forEach(p => p.remove());

  // Create regular particles
  createRegularParticles(hero);
  
  // Create star particles
  createStarParticles(hero);
}

function createRegularParticles(container) {
  const { count, minSize, maxSize, minDuration, maxDuration, maxDrift, minOpacity, maxOpacity } = PARTICLE_CONFIG;
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Calculate properties with some grouping for better synchronization
    const group = Math.floor(i / 6); // Group particles in sets of 6
    const baseDelay = group * 0.8; // Stagger groups
    const randomDelay = Math.random() * 0.5; // Small random variation within group
    
    const size = Math.random() * (maxSize - minSize) + minSize;
    const startX = Math.random() * 100;
    const drift = (Math.random() - 0.5) * maxDrift;
    const duration = Math.random() * (maxDuration - minDuration) + minDuration;
    const delay = baseDelay + randomDelay;
    const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity;
    
    particle.style.cssText = `
      left: ${startX}%;
      width: ${size}px;
      height: ${size}px;
      --drift: ${drift}px;
      animation: floatUp ${duration}s ${delay}s infinite ease-in-out;
      opacity: 0;
    `;
    
    container.appendChild(particle);
  }
}

function createStarParticles(container) {
  const { starCount, maxDrift } = PARTICLE_CONFIG;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'particle star-particle';
    
    const size = Math.random() * 3 + 4; // 4-7px
    const startX = Math.random() * 100;
    const drift = (Math.random() - 0.5) * (maxDrift * 0.8);
    const duration = Math.random() * 4 + 10; // 10-14 seconds
    const delay = i * 2; // Evenly spaced delays for stars
    
    star.style.cssText = `
      left: ${startX}%;
      width: ${size}px;
      height: ${size}px;
      --drift: ${drift}px;
      animation: floatUp ${duration}s ${delay}s infinite ease-in-out, pulse 2s infinite ease-in-out;
      opacity: 0;
      background: radial-gradient(circle, ${PARTICLE_CONFIG.colors.star} 0%, ${PARTICLE_CONFIG.colors.primary} 70%);
      box-shadow: 0 0 10px ${PARTICLE_CONFIG.colors.primary};
    `;
    
    container.appendChild(star);
  }
}

// Optional: Reinitialize particles on window resize for better responsiveness
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    initParticles();
  }, 500);
});

// Export config for easy adjustments
export { PARTICLE_CONFIG };