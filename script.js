/* NAVBAR SCROLL */
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

/* STARTUP TERMINAL ANIMATION & TYPING EFFECT */
const roleText = "Full Stack Developer";
let roleIndex = 0;

function typeRoleEffect() {
  if (roleIndex < roleText.length) {
    document.getElementById("typing").innerHTML += roleText.charAt(roleIndex);
    roleIndex++;
    setTimeout(typeRoleEffect, 100);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const cmdElem = document.getElementById("hero-cmd");
  const hiddenContent = document.getElementById("hero-hidden-content");

  if (cmdElem && hiddenContent) {
    const commandText = "init portfolio --dev";
    let cmdIndex = 0;

    function typeCommand() {
      if (cmdIndex < commandText.length) {
        cmdElem.innerHTML += commandText.charAt(cmdIndex);
        cmdIndex++;
        setTimeout(typeCommand, 60); // typing speed
      } else {
        // Finished typing command, reveal content after a small delay
        setTimeout(() => {
          const cursor = document.querySelector(".cmd-cursor");
          if (cursor) cursor.style.display = "none";
          hiddenContent.classList.add("revealed");

          // Start the role typing effect after the main content is revealed
          setTimeout(typeRoleEffect, 500);
        }, 400);
      }
    }

    // Start typing the command shortly after page load
    setTimeout(typeCommand, 600);
  } else {
    // Fallback if elements not found
    typeRoleEffect();
  }
});

/* SCROLL ANIMATION */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".hidden").forEach(el => observer.observe(el));
/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ACTIVE LINK ON SCROLL */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    // Adjust top detection line to trigger comfortably
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (current && link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

/* CUSTOM CURSOR GLOW */
const cursorGlow = document.getElementById("cursor-glow");
document.addEventListener("mousemove", (e) => {
  if (cursorGlow && window.innerWidth > 768) {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
  }
});

/* CONTACT FORM SUBMIT */
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent successfully! Thanks for reaching out.");
    contactForm.reset();
  });
}

/* CANVAS NETWORK BACKGROUND */
const canvas = document.getElementById("bg-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particlesArray = [];
  const mouse = { x: null, y: null, radius: 150 };

  window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
      if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;

      // Mouse collision
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius) {
        if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 1;
        if (mouse.x > this.x && this.x > this.size * 10) this.x -= 1;
        if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 1;
        if (mouse.y > this.y && this.y > this.size * 10) this.y -= 1;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = document.body.classList.contains("matrix-theme") ? "rgba(34, 197, 94, 0.8)" : "rgba(168, 85, 247, 0.8)";
      ctx.fill();
    }
  }

  function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
          ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
        if (distance < (canvas.width / 7) * (canvas.height / 7)) {
          let opacity = 1 - (distance / 20000);
          const isMatrix = document.body.classList.contains("matrix-theme");
          ctx.strokeStyle = isMatrix ? `rgba(74, 222, 128, ${opacity})` : `rgba(129, 140, 248, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    connect();
  }

  init();
  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });
}

/* 3D TILT EFFECT FOR CARDS */
const tiltCards = document.querySelectorAll(".skill-card, .project-card");

tiltCards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    // Apply transformation
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    card.style.transition = "none";
  });

  card.addEventListener("mouseleave", () => {
    // Reset transformation
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = "transform 0.5s ease";
  });
});

/* HACKER TEXT EFFECT */
const hackerLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
const sectionTitles = document.querySelectorAll(".section-title");

const titleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.scrambled) {
      entry.target.dataset.scrambled = "true";

      const originalHTML = entry.target.dataset.originalHtml || entry.target.innerHTML;
      if (!entry.target.dataset.originalHtml) {
        entry.target.dataset.originalHtml = originalHTML;
      }

      const textToScramble = entry.target.innerText;

      let iterations = 0;
      const interval = setInterval(() => {
        entry.target.innerText = textToScramble.split("")
          .map((letter, index) => {
            if (index < iterations) {
              return textToScramble[index];
            }
            if (letter === " ") return " ";
            return hackerLetters[Math.floor(Math.random() * hackerLetters.length)];
          })
          .join("");

        if (iterations >= textToScramble.length) {
          clearInterval(interval);
          entry.target.innerHTML = originalHTML; // Restore original span formatting
        }

        iterations += 1 / 2; // Controls decode speed
      }, 30);
    }
  });
}, { threshold: 0.5 }); // Triggers when 50% of the title is in view

sectionTitles.forEach(title => {
  titleObserver.observe(title);
});

/* THEME TOGGLE */
const themeBtn = document.getElementById("theme-toggle");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("matrix-theme");
  });
}

/* CUSTOM CURSOR RING */
const cursorRing = document.getElementById("cursor-ring");
if (cursorRing) {
  document.addEventListener("mousemove", (e) => {
    if (window.innerWidth > 768) {
      setTimeout(() => {
        cursorRing.style.left = e.clientX + "px";
        cursorRing.style.top = e.clientY + "px";
      }, 50); // slight delay for smooth trailing effect
    }
  });

  const interactables = document.querySelectorAll("a, button, .skill-card, .project-card, .logo");
  interactables.forEach(el => {
    el.addEventListener("mouseenter", () => cursorRing.classList.add("hovered"));
    el.addEventListener("mouseleave", () => cursorRing.classList.remove("hovered"));
  });
}

/* ANIMATED SKILL BARS */
const skillLevels = document.querySelectorAll(".skill-level");
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const level = entry.target.getAttribute("data-level");
      entry.target.style.width = level;
    }
  });
}, { threshold: 0.5 });

skillLevels.forEach(skill => skillsObserver.observe(skill));

/* PROJECT TERMINAL TYPER */
const termBodies = document.querySelectorAll(".term-body");

termBodies.forEach(term => {
  const fullText = term.getAttribute("data-stack").replace(/\\n/g, "\n");
  term.innerHTML = ""; // Clear existing text
  let typingTimeout;

  const projectCard = term.closest(".project-card");
  if (projectCard) {
    projectCard.addEventListener("mouseenter", () => {
      clearTimeout(typingTimeout); // Stop any ongoing typing
      term.innerHTML = "";         // Clear the terminal
      let i = 0;

      function type() {
        if (i < fullText.length) {
          term.innerHTML += fullText.charAt(i) === '\n' ? '<br>' : fullText.charAt(i);
          i++;
          typingTimeout = setTimeout(type, 20); // typing speed
        }
      }
      type();
    });
  }
});

/* PROJECT FILTERS */
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

if (filterBtns && projectCards) {
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
          card.style.display = "block";
          setTimeout(() => card.style.opacity = "1", 50);
        } else {
          card.style.opacity = "0";
          setTimeout(() => card.style.display = "none", 300);
        }
      });
    });
  });
}

/* COPY TO CLIPBOARD */
document.querySelectorAll(".copyable").forEach(item => {
  item.addEventListener("click", () => {
    const textToCopy = item.getAttribute("data-copy");
    navigator.clipboard.writeText(textToCopy).then(() => {
      const span = item.querySelector("span");
      const origText = span.innerText;
      span.innerText = "Copied!";
      span.style.color = "#27C93F";
      setTimeout(() => {
        span.innerText = origText;
        span.style.color = "inherit";
      }, 2000);
    });
  });
});