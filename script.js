// =========================
// LOADING SCREEN
// =========================

document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");
    }, 100);
});

// Mobile Menu

const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  const icon = menuIcon.querySelector("i");

  if (navLinks.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});


// Close menu when clicking a link

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");

    const icon = menuIcon.querySelector("i");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  });
});


// Typing Animation

const roles = [
  "Web Developer",
  "Frontend Developer",
  "UI Designer",
  "Programmer",
  "errors resolver"
];

const typingText = document.getElementById("typing-text");

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

  const currentRole = roles[roleIndex];

  if (!deleting) {

    typingText.textContent =
      currentRole.substring(0, characterIndex + 1);

    characterIndex++;

    if (characterIndex === currentRole.length) {

      deleting = true;

      setTimeout(typeEffect, 1500);

      return;
    }

  } else {

    typingText.textContent =
      currentRole.substring(0, characterIndex - 1);

    characterIndex--;

    if (characterIndex === 0) {

      deleting = false;

      roleIndex =
        (roleIndex + 1) % roles.length;
    }

  }

  const speed = deleting ? 50 : 100;

  setTimeout(typeEffect, speed);
}

typeEffect();


// Contact Form

// =========================
// CONTACT FORM
// =========================

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");

contactForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const submitButton =
        contactForm.querySelector("button");

    submitButton.disabled = true;

    submitButton.innerHTML = `
        Sending...
        <i class="fa-solid fa-spinner fa-spin"></i>
    `;

    formMessage.textContent = "";

    try {

        const response = await fetch(
            contactForm.action,
            {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            }
        );

        if (response.ok) {

            formMessage.textContent =
                "Message sent successfully! I'll get back to you soon.";

            contactForm.reset();

            submitButton.innerHTML = `
                Message Sent
                <i class="fa-solid fa-check"></i>
            `;

            setTimeout(() => {

                submitButton.disabled = false;

                submitButton.innerHTML = `
                    Send Message
                    <i class="fa-solid fa-paper-plane"></i>
                `;

            }, 3000);

        } else {

            throw new Error("Failed");

        }

    } catch (error) {

        formMessage.textContent =
            "Something went wrong. Please try again.";

        submitButton.disabled = false;

        submitButton.innerHTML = `
            Send Message
            <i class="fa-solid fa-paper-plane"></i>
        `;
    }

});


// Current Year

document.getElementById("year").textContent =
  new Date().getFullYear();


// Navbar Active Link

const sections =
  document.querySelectorAll("section");

const navigationLinks =
  document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let currentSection = "";

  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop - 150;

    const sectionHeight =
      section.clientHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection =
        section.getAttribute("id");
    }

  });

  navigationLinks.forEach((link) => {

    link.style.color = "";

    if (
      link.getAttribute("href") ===
      `#${currentSection}`
    ) {
      link.style.color = "#00d9ff";
    }

  });

});

// =========================
// INTERACTIVE SKILLS
// =========================

const skillCards =
    document.querySelectorAll(".skill-card");

const skillsSection =
    document.querySelector("#skills");

let skillsAnimated = false;

function animateSkills() {

    if (skillsAnimated) return;

    const sectionTop =
        skillsSection.getBoundingClientRect().top;

    const triggerPoint =
        window.innerHeight * 0.8;

    if (sectionTop < triggerPoint) {

        skillsAnimated = true;

        skillCards.forEach((card, index) => {

            const progress =
                card.querySelector(".skill-progress");

            const percent =
                card.dataset.percent;

            setTimeout(() => {

                progress.style.width =
                    `${percent}%`;

                card.classList.add("active");

            }, index * 150);

        });
    }
}

window.addEventListener("scroll", animateSkills);

animateSkills();


// Click interaction

skillCards.forEach(card => {

    card.addEventListener("click", () => {

        skillCards.forEach(item => {
            item.classList.remove("active");
        });

        card.classList.add("active");

    });

});

// =========================
// SCROLL REVEAL
// =========================

const revealElements = document.querySelectorAll(
    "section, .section-heading, .about-content, .about-image, .skill-card, .project-card, .contact-info, .contact-form"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {
    revealObserver.observe(element);
});

// =========================
// BACK TO TOP
// =========================

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});