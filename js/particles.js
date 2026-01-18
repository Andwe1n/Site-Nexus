// particles.js — Mobile-optimized particle system

// Configuration - MULT MAI REDUS PENTRU MOBILE
const PARTICLE_CONFIG = {
  desktop: {
    count: 25,           // Desktop: 25 particule
    starCount: 4,
    minSize: 2,
    maxSize: 6,
    minDuration: 8,
    maxDuration: 13,
    maxDrift: 100,
    minOpacity: 0.3,
    maxOpacity: 0.8
  },
  mobile: {
    count: 0,            // Mobile: 0 particule (OPRITE COMPLET)
    starCount: 0,
    minSize: 3,
    maxSize: 5,
    minDuration: 12,
    maxDuration: 15,
    maxDrift: 50,
    minOpacity: 0.4,
    maxOpacity: 0.6
  },
  colors: {
    primary: 'rgba(192, 132, 252, 0.6)',    // Opacitate redusă
    secondary: 'rgba(139, 92, 246, 0.4)',
    star: 'rgba(255, 255, 255, 0.8)'
  }
};

// Detectare dispozitiv
function isMobile() {
  return window.innerWidth <= 768 || 
         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Detectare low-end device
function isLowEndDevice() {
  // Check pentru dispozitive slabe
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const slowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory < 4; // Mai puțin de 4GB RAM
  const oldDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4; // Mai puțin de 4 cores
  
  return slowConnection || lowMemory || oldDevice;
}

export function initParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Clear existing particles
  const existingParticles = hero.querySelectorAll('.particle');
  existingParticles.forEach(p => p.remove());

  // STOP complet pe mobile sau low-end devices
  if (isMobile() || isLowEndDevice()) {
    console.log('🚫 Particles disabled on mobile/low-end device for better performance');
    return; // Exit early - NU crea particule deloc
  }

  // Verifică preferința user pentru reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    console.log('🚫 Particles disabled - user prefers reduced motion');
    return;
  }

  // Selectează config bazat pe device
  const config = isMobile() ? PARTICLE_CONFIG.mobile : PARTICLE_CONFIG.desktop;
  
  // Create particles doar pe desktop
  createRegularParticles(hero, config);
  createStarParticles(hero, config);
  
  console.log(`✨ Created ${config.count + config.starCount} particles (desktop mode)`);
}

function createRegularParticles(container, config) {
  const { count, minSize, maxSize, minDuration, maxDuration, maxDrift, minOpacity, maxOpacity } = config;
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Calculate properties
    const group = Math.floor(i / 6);
    const baseDelay = group * 0.8;
    const randomDelay = Math.random() * 0.5;
    
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
      will-change: transform, opacity;
    `;
    
    container.appendChild(particle);
  }
}

function createStarParticles(container, config) {
  const { starCount, maxDrift } = config;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'particle star-particle';
    
    const size = Math.random() * 3 + 4;
    const startX = Math.random() * 100;
    const drift = (Math.random() - 0.5) * (maxDrift * 0.8);
    const duration = Math.random() * 4 + 10;
    const delay = i * 2;
    
    star.style.cssText = `
      left: ${startX}%;
      width: ${size}px;
      height: ${size}px;
      --drift: ${drift}px;
      animation: floatUp ${duration}s ${delay}s infinite ease-in-out, pulse 2s infinite ease-in-out;
      opacity: 0;
      background: radial-gradient(circle, ${PARTICLE_CONFIG.colors.star} 0%, ${PARTICLE_CONFIG.colors.primary} 70%);
      box-shadow: 0 0 10px ${PARTICLE_CONFIG.colors.primary};
      will-change: transform, opacity;
    `;
    
    container.appendChild(star);
  }
}

// Monitor resize și reinițializează doar dacă trecem de la mobile la desktop
let wasMobile = isMobile();
let resizeTimeout;

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const nowMobile = isMobile();
    
    // Doar dacă status-ul s-a schimbat (mobile <-> desktop)
    if (wasMobile !== nowMobile) {
      console.log(`📱 Device changed: ${nowMobile ? 'mobile' : 'desktop'}`);
      initParticles();
      wasMobile = nowMobile;
    }
  }, 500);
});

// Performance monitoring (optional - pentru debugging)
if (window.performance && window.performance.memory) {
  setInterval(() => {
    const memory = window.performance.memory;
    const usedMB = (memory.usedJSHeapSize / 1048576).toFixed(2);
    const totalMB = (memory.totalJSHeapSize / 1048576).toFixed(2);
    
    if (usedMB / totalMB > 1.0) {
      console.warn('⚠️ High memory usage detected. Consider reducing particles.');
    }
  }, 10000); // Check every 10 seconds
}

// Export config pentru debugging
export { PARTICLE_CONFIG, isMobile, isLowEndDevice };