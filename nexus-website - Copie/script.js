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

