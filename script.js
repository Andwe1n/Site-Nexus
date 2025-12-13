/* ==========================
   GENERAL FUNCTIONS / UI
   ========================== */

/* Scroll lin la secțiune */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/* Scroll to top button */
const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) scrollBtn.style.display = "block";
  else scrollBtn.style.display = "none";
});
if (scrollBtn)
  scrollBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

/* ==========================
    LOGO BACKGROUND PARALLAX
   ========================== */

const logoBg = document.querySelector(".logo-bg");
let targetX = 0,
  targetY = 0,
  currentX = 0,
  currentY = 0;
document.addEventListener("mousemove", (e) => {
  targetX = (e.clientX / window.innerWidth - 0.5) * 100;
  targetY = (e.clientY / window.innerHeight - 0.5) * 100;
});
function animate() {
  currentX += (targetX - currentX) * 0.08;
  currentY += (targetY - currentY) * 0.08;
  if (logoBg)
    logoBg.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))`;
  requestAnimationFrame(animate);
}
animate();

// --- POP-UP MEMBRU ---
const membri = document.querySelectorAll(".membru");
const popup = document.getElementById("popup");
const popupNume = document.getElementById("popup-nume");
const popupRol = document.getElementById("popup-rol");
const popupDescriere = document.getElementById("popup-descriere");
const closeBtn = document.querySelector(".close");

membri.forEach((m) => {
  m.addEventListener("click", () => {
    popupNume.textContent = m.dataset.nume;
    popupRol.textContent = m.dataset.rol;
    popupDescriere.textContent = m.dataset.descriere;
    popup.classList.add("active");
  });
});


window.addEventListener("click", (e) => {
  if (e.target === popup) popup.classList.remove("active");
});

/* ==========================
   SCROLL REVEAL (IntersectionObserver)
   ========================== */
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((el) => observer.observe(el));
} else {
  // fallback: make elements visible
  reveals.forEach((el) => el.classList.add("visible"));
}

/* ==========================
   THEME TOGGLE (light/dark) - salvat în localStorage
   ========================== */
const themeSwitch = document.querySelector(".input__check");
if (themeSwitch) {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeSwitch.checked = true;
  } else {
    document.body.classList.remove("light");
    themeSwitch.checked = false;
  }

  themeSwitch.addEventListener("change", () => {
    if (themeSwitch.checked) {
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  });
}

/* ==========================
   LOGIN MODAL (demo)
   ========================== */
const loginBtn = document.getElementById("login-btn");
const loginContainer = document.getElementById("login-container");
const loginClose = document.querySelector(".login-close");
const loginForm = document.getElementById("login-form");
if (loginBtn && loginContainer) {
  loginBtn.addEventListener(
    "click",
    () => (loginContainer.style.display = "flex")
  );
}
if (loginClose && loginContainer) {
  loginClose.addEventListener(
    "click",
    () => (loginContainer.style.display = "none")
  );
}
if (loginContainer) {
  window.addEventListener("click", (e) => {
    if (e.target === loginContainer) loginContainer.style.display = "none";
  });
}
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(
      "Autentificare reușită! (aceasta este o funcționalitate demonstrativă)"
    );
    if (loginContainer) loginContainer.style.display = "none";
  });
}

/* ==========================
   MATERII (demo)
   ========================== */
function openMaterie(materie) {
  alert(
    `Ai selectat materia: ${materie.toUpperCase()}!\nAceastă funcționalitate va deschide o pagină dedicată în versiunea completă.`
  );
}

/* ==========================
   COOKIE POPUP (apare la 3s la fiecare refresh)
   ========================== */
const cookiePopup = document.getElementById("cookie-popup");
const acceptBtn = document.getElementById("accept-cookies");
const declineBtn = document.getElementById("decline-cookies");

setTimeout(() => {
  if (cookiePopup) cookiePopup.style.display = "flex";
}, 3000);

if (acceptBtn)
  acceptBtn.addEventListener("click", () => {
    if (cookiePopup) cookiePopup.style.display = "none";
  });
if (declineBtn)
  declineBtn.addEventListener("click", () => {
    if (cookiePopup) cookiePopup.style.display = "none";
  });

/* ==========================
   Small safety: ensure popup close by ESC key
   ========================== */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (popup) popup.style.display = "none";
    if (cookiePopup) cookiePopup.style.display = "none";
    if (loginContainer) loginContainer.style.display = "none";
  }
});
/* ==========================
   FADE OUT HEADER LA SCROLL
   ========================== */
let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScroll && currentScroll > 100) {
    // Scroll în jos → ascunde headerul
    header.classList.add("hidden");
  } else {
    // Scroll în sus → afișează headerul
    header.classList.remove("hidden");
  }

  lastScroll = currentScroll <= 0 ? 0 : currentScroll;
});

window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById('progress-bar').style.width = scrolled + '%';
});

// Particule animate simple (erou)
function styleParticle(particle, options = {}) {
  const {
    sizeRange = [3, 7],
    durationRange = [14, 22],
    delayRange = [0, 6],
    opacityRange = [0.35, 0.75],
    driftRange = 180,
    startBottom = '-12vh',
  } = options;

  const size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
  const duration = Math.random() * (durationRange[1] - durationRange[0]) + durationRange[0];
  const delay = Math.random() * (delayRange[1] - delayRange[0]) + delayRange[0];
  const opacity = Math.random() * (opacityRange[1] - opacityRange[0]) + opacityRange[0];
  const drift = (Math.random() - 0.5) * driftRange;
  const hue = 250 + Math.random() * 40;

  particle.style.setProperty('--size', `${size}px`);
  particle.style.setProperty('--duration', `${duration}s`);
  particle.style.setProperty('--delay', `${delay}s`);
  particle.style.setProperty('--opacity', opacity.toFixed(2));
  particle.style.setProperty('--drift', `${drift.toFixed(2)}px`);
  particle.style.setProperty('--hue', hue.toFixed(0));
  particle.style.left = Math.random() * 100 + '%';
  particle.style.bottom = startBottom;

  return { duration, delay };
}

function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  for(let i = 0; i < 18; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    styleParticle(particle, {
      sizeRange: [3, 6.5],
      durationRange: [10, 18],
      delayRange: [0, 4.5],
      driftRange: 140,
      startBottom: '-6vh',
    });
    hero.appendChild(particle);
  }
}

createParticles();

// Counter animat
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const animateCounter = (counter) => {
  const target = +counter.getAttribute('data-target');
  const increment = target / speed;
  
  const updateCount = () => {
    const count = +counter.innerText;
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 10);
    } else {
      counter.innerText = target + '+';
    }
  };
  updateCount();
};

// Trigger când secțiunea devine vizibilă
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      counters.forEach(counter => animateCounter(counter));
      statsObserver.unobserve(entry.target);
    }
  });
});

const statsSection = document.getElementById('statistics');
if (statsSection) statsObserver.observe(statsSection);

window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1000);
});

// ============================================
// PARTICULE ANIMATE PE TOT SITE-UL
// ============================================

// Funcție pentru crearea particulelor
function createFullSiteParticles() {
  // Cream un container pentru particule fix pe tot ecranul
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
  
  // Adaugă containerul la începutul body-ului
  document.body.insertBefore(particleContainer, document.body.firstChild);

  // Număr de particule (poți ajusta)
  const particleCount = 36;

  // Creează particulele
  for(let i = 0; i < particleCount; i++) {
    createParticle(particleContainer);
  }

  // Adaugă particule noi continuu pentru efect perpetuu
  setInterval(() => {
    if (particleContainer.querySelectorAll('.particle').length < particleCount) {
      createParticle(particleContainer);
    }
  }, 3200);
}

// Funcție pentru o singură particulă
function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';

  const { duration, delay } = styleParticle(particle, {
    sizeRange: [3.5, 7.5],
    durationRange: [15, 24],
    delayRange: [0, 6],
    opacityRange: [0.32, 0.72],
    driftRange: 220,
    startBottom: '-14vh',
  });

  container.appendChild(particle);

  // Șterge particula după ce termină animația pentru a nu supraîncărca DOM-ul
  setTimeout(() => {
    particle.remove();
  }, (duration + delay) * 1000);
}

// Pornește particulele când pagina se încarcă
window.addEventListener('load', () => {
  createFullSiteParticles();
});

// OPTIONAL: Adaugă particule la hover pe secțiuni importante
const sections = document.querySelectorAll('.content, .hero');
sections.forEach(section => {
  section.addEventListener('mouseenter', () => {
    // Burst de particule la hover
    const container = document.getElementById('particle-container');
    if (container) {
      for(let i = 0; i < 5; i++) {
        setTimeout(() => createParticle(container), i * 100);
      }
    }
  });
});
