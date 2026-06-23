document.addEventListener('DOMContentLoaded', () => {
    /* -------------------------------------------------------------
       1. Light/Dark Theme Toggle
       ------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const bodyElement = document.body;

    // Check for saved theme preference, otherwise use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        bodyElement.classList.replace('light-theme', 'dark-theme');
    } else {
        bodyElement.classList.replace('dark-theme', 'light-theme');
    }

    // Toggle theme action
    themeToggleBtn.addEventListener('click', () => {
        if (bodyElement.classList.contains('light-theme')) {
            bodyElement.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            bodyElement.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
        }
    });

    /* -------------------------------------------------------------
       2. Mobile Navigation Toggle
       ------------------------------------------------------------- */
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu visibility
    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /* -------------------------------------------------------------
       3. Scroll Reveal Animation (Intersection Observer)
       ------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once revealed, we don't need to observe it anymore
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust trigger point slightly above screen bottom
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Initial fade in for hero content elements sequentially
    const heroElements = document.querySelectorAll('.hero-section .animate-fade');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        }, index * 120); // Stagger element animations
    });

    /* -------------------------------------------------------------
       4. Email Copy to Clipboard
       ------------------------------------------------------------- */
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailText = 'anushkapatil7722@gmail.com';
    const copySvg = document.querySelector('.copy-svg');
    const checkSvg = document.querySelector('.check-svg');

    // Create container for copy success message in the DOM
    const successMsg = document.createElement('span');
    successMsg.className = 'copy-success-message';
    successMsg.textContent = 'Copied to clipboard!';
    copyEmailBtn.parentNode.parentNode.appendChild(successMsg);

    copyEmailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(emailText).then(() => {
            // Show checkmark, hide copy icon
            copySvg.classList.add('hidden');
            checkSvg.classList.remove('hidden');
            successMsg.classList.add('visible');

            // Revert back after 2 seconds
            setTimeout(() => {
                copySvg.classList.remove('hidden');
                checkSvg.classList.add('hidden');
                successMsg.classList.remove('visible');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });

    /* -------------------------------------------------------------
       5. Scroll Indicator Action
       ------------------------------------------------------------- */
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
