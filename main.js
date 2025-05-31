/**
 * Java.js
 * Main JavaScript entry point for bluewhirl.github.io project.
 * This file imports and initializes modules from other scripts in the directory.
 */

import { initNavbar } from './Navbar.js';
import { setupFooter } from './Footer.js';
import { loadProjects } from './Projects.js';

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    setupFooter();
    loadProjects();
    // Add any additional initialization here

    // 1. Typewriter effect for hero subtitle
    const subtitle = document.getElementById("hero-subtitle");
    if (subtitle && subtitle.textContent.trim() === "") {
        const text = "Innovative games. Unforgettable experiences.";
        let i = 0;
        function type() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(type, 40);
            }
        }
        type();
    }

    // 2. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // 3. Scroll reveal animations
    const revealElements = document.querySelectorAll("section, .game-card, .team-member");
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                el.classList.add("visible");
            }
        });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // 4. 3D tilt effect for game cards
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width/2;
            const y = e.clientY - rect.top - rect.height/2;
            card.style.transform = `rotateY(${x/20}deg) rotateX(${-y/20}deg) scale(1.04)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // 5. Dark/Light mode toggle
    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
        toggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            toggle.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
        });
        // Set initial icon based on mode
        toggle.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
    }

    // 6. Toast notification on contact form submit
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            let toast = document.getElementById("toast");
            if (!toast) {
                toast = document.createElement("div");
                toast.id = "toast";
                toast.style.display = "none";
                toast.style.position = "fixed";
                toast.style.bottom = "32px";
                toast.style.left = "50%";
                toast.style.transform = "translateX(-50%)";
                toast.style.background = "#38bdf8";
                toast.style.color = "#fff";
                toast.style.padding = "16px 32px";
                toast.style.borderRadius = "8px";
                toast.style.boxShadow = "0 2px 12px #5ecfff33";
                toast.style.zIndex = "1000";
                toast.style.fontWeight = "600";
                document.body.appendChild(toast);
            }
            toast.textContent = "Thank you for contacting us!";
            toast.style.display = "block";
            setTimeout(() => { toast.style.display = "none"; }, 3000);
            form.reset();
        });
    }
});