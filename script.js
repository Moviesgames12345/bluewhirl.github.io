/**
 * script.js
 * Main JavaScript for Blue Whirl Game Studio website.
 * Handles theme toggling, smooth scrolling, animations, form submissions, etc.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement; // Target <html> for class
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    // Load saved theme from localStorage or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light') {
        htmlElement.classList.add('light');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else if (savedTheme === 'dark') {
        htmlElement.classList.remove('light'); // Ensure light is removed if explicitly dark
        if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else if (prefersDark) { // Default to dark if no saved theme and system prefers dark
        htmlElement.classList.remove('light');
        if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else { // Default to light if no saved theme and system prefers light
         htmlElement.classList.add('light');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }


    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            htmlElement.classList.toggle('light');
            const isLight = htmlElement.classList.contains('light');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            if (themeIcon) {
                themeIcon.classList.toggle('fa-moon', !isLight);
                themeIcon.classList.toggle('fa-sun', isLight);
            }
        });
    }

    // --- Mobile Menu ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                 if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }


    // --- Typewriter effect for hero subtitle ---
    const subtitleElement = document.getElementById("hero-subtitle");
    if (subtitleElement) {
        const originalText = subtitleElement.textContent.trim();
        subtitleElement.textContent = ''; // Clear it initially
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                subtitleElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Adjust typing speed (milliseconds)
            }
        }
        // Only start typewriter if the element exists and has text
        if (originalText) {
           setTimeout(typeWriter, 500); // Delay start slightly
        }
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const hrefAttribute = this.getAttribute("href");
            if (hrefAttribute && hrefAttribute !== "#") { // Ensure it's a valid ID selector
                try {
                    const targetElement = document.querySelector(hrefAttribute);
                    if (targetElement) {
                        e.preventDefault();
                        // Consider navbar height for offset if it's sticky
                        const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });
                    }
                } catch (error) {
                    console.warn("Smooth scroll target not found or invalid selector:", hrefAttribute, error);
                }
            }
        });
    });

    // --- Scroll reveal animations ---
    const revealElements = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            // Reveal when element is 85% up the screen or 100px from top for smaller elements
            if (elementTop < windowHeight - (el.offsetHeight > 100 ? windowHeight * 0.15 : 50) ) {
                el.classList.add("visible");
            }
        });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Initial check

    // --- 3D Tilt effect for game cards ---
    // Applied via CSS hover, but JS can enhance or control it if needed
    // For this version, pure CSS hover is efficient.
    // If you need JS-controlled tilt:
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            // Max rotation in degrees
            const maxRotate = 5;
            const rotateX = (y / rect.height) * maxRotate * -1; // Invert Y for natural feel
            const rotateY = (x / rect.width) * maxRotate;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });


    // --- Contact Form Submission with Toast Notification ---
    const contactForm = document.getElementById("contact-form");
    const toast = document.getElementById("toast");

    if (contactForm && toast) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            // Basic validation (can be enhanced)
            const name = contactForm.name.value.trim();
            const email = contactForm.email.value.trim();
            const message = contactForm.message.value.trim();

            if (!name || !email || !message) {
                toast.textContent = "Please fill all fields!";
                toast.style.backgroundColor = "#ef4444"; // Red for error
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                 toast.textContent = "Invalid email address!";
                toast.style.backgroundColor = "#ef4444"; // Red for error
            }
            else {
                // Simulate form submission
                console.log("Form submitted:", { name, email, message });
                toast.textContent = "Thank you for your message!";
                toast.style.backgroundColor = "#38bdf8"; // Sky blue for success
                contactForm.reset();
            }

            toast.classList.remove('opacity-0');
            toast.classList.add('opacity-100');

            setTimeout(() => {
                toast.classList.remove('opacity-100');
                toast.classList.add('opacity-0');
            }, 3000);
        });
    }

    // --- Update current year in footer ---
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Lightbox for Image Gallery (on echoes-in-the-dark.html) ---
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const galleryThumbnails = document.querySelectorAll('.gallery-thumbnail');

    if (lightbox && lightboxImg && lightboxCaption) {
        galleryThumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                lightbox.style.display = "flex"; // Use flex for centering
                lightboxImg.src = this.dataset.src || this.src; // Use data-src for higher-res if available
                lightboxCaption.innerHTML = this.dataset.caption || this.alt;
            });
        });

        const closeBtn = lightbox.querySelector('.lightbox-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                lightbox.style.display = "none";
            });
        }

        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
            }
        });
    }

});
