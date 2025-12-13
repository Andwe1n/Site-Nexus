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
if (scrollBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) scrollBtn.style.display = "block";
    else scrollBtn.style.display = "none";
  });

  scrollBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}

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
  window.location.href = `materii/${materie}.html`;
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
  const progress = document.getElementById('progress-bar');
  if (progress) progress.style.width = scrolled + '%';
});

// Particule animate simple
function createParticles() {
  const hero = document.querySelector('.hero');
  for(let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
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
  const particleCount = 50;
  
  // Creează particulele
  for(let i = 0; i < particleCount; i++) {
    createParticle(particleContainer);
  }
  
  // Adaugă particule noi continuu pentru efect perpetuu
  setInterval(() => {
    if (document.querySelectorAll('.particle').length < particleCount) {
      createParticle(particleContainer);
    }
  }, 3000);
}

// Funcție pentru o singură particulă
function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  // Poziție aleatoare pe orizontală
  const startX = Math.random() * 100;
  
  // Mărime aleatoare
  const size = Math.random() * 4 + 2; // între 2px și 6px
  
  // Durată aleatoare de animație
  const duration = Math.random() * 10 + 15; // între 15s și 25s
  
  // Delay aleatoriu
  const delay = Math.random() * 5;
  
  // Opacitate aleatoare
  const opacity = Math.random() * 0.5 + 0.3; // între 0.3 și 0.8
  
  // Mișcare laterală aleatoare
  const drift = (Math.random() - 0.5) * 200; // -100px la +100px
  
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

// CSS pentru animații - ADAUGĂ ASTA ÎN style.css
const style = document.createElement('style');
style.textContent = `
  @keyframes floatUp {
    0% {
      transform: translateY(0) translateX(0) scale(1);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    50% {
      transform: translateY(-50vh) translateX(calc(var(--drift) * 0.5)) scale(1.2);
      opacity: 0.8;
    }
    90% {
      opacity: 0.5;
    }
    100% {
      transform: translateY(-100vh) translateX(var(--drift)) scale(0.5);
      opacity: 0;
    }
  }
  
  /* Efect de blur ușor pentru particule (optional) */
  .particle {
    filter: blur(0.5px);
  }
  
  /* Particule mai mari la hover (optional) */
  .content:hover ~ #particle-container .particle,
  .hero:hover ~ #particle-container .particle {
    animation-duration: 10s !important;
  }
`;
document.head.appendChild(style);