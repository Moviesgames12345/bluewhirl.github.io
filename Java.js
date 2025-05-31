import { initNavbar } from './Navbar.js';
import { setupFooter } from './Footer.js';
import { loadProjects } from './Projects.js';

/**
 * Java.js
 * Main JavaScript entry point for bluewhirl.github.io project.
 * This file imports and initializes modules from other scripts in the directory.
 */

// Example: Importing other modules (assuming ES6 modules and proper file structure)

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    setupFooter();
    loadProjects();
    // Add any additional initialization here
});