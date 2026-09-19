/* ==============================================================
   1. INSTANT PAGE INITIALIZATION & THEME SETUP
   - Huhakikisha ukurasa unafunguka papo hapo bila kuganda (zero freeze).
   ============================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initScrollReveal();
  initMobileMenu();
  initScrollSpy();
  initContactForm();
});

/* ==============================================================
   2. THEME SWITCHER (DARK / LIGHT MODE)
   ============================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme, themeIcon);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("portfolio-theme", newTheme);
      updateThemeIcon(newTheme, themeIcon);
    });
  }
}

function updateThemeIcon(theme, iconElement) {
  if (!iconElement) return;
  if (theme === "dark") {
    iconElement.className = "fa-solid fa-moon";
  } else {
    iconElement.className = "fa-solid fa-sun";
  }
}

/* ==============================================================
   3. SCROLL REVEAL (Safe & Lightweight Animation)
   ============================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");

  function checkReveal() {
    const windowHeight = window.innerHeight;
    reveals.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 80) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", checkReveal);
  checkReveal(); // Huwasha mara moja wakati ukurasa unapoanza
}

/* ==============================================================
   4. MOBILE NAVIGATION (MENU YA SIMU)
   ============================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-item");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navItems.forEach((btn) => btn.classList.remove("active"));
        item.classList.add("active");
        navLinks.classList.remove("show");
      });
    });
  }
}

/* ==============================================================
   5. SCROLL SPY (MWANGA WA MENU YA JUU KIOTOMATIKI)
   ============================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-item");

  window.addEventListener("scroll", () => {
    let currentId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.pageYOffset >= sectionTop) {
        currentId = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${currentId}`) {
        item.classList.add("active");
      }
    });
  });
}

/* ==============================================================
   6. CONTACT FORM SUBMISSION (NETLIFY READY)
   ============================================================== */
function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
        .then(() => {
          alert("Thank you! Your message has been sent successfully.");
          contactForm.reset();
        })
        .catch(() => {
          alert("Oops! There was an issue sending your message. Please try WhatsApp directly.");
        });
    });
  }
}