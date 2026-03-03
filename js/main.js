document.addEventListener('DOMContentLoaded', () => {
    /* --- 1. Navbar Scroll Effect --- */
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- 2. Typewriter Effect --- */
    const typewriterElement = document.getElementById('typewriter');
    // Words to cycle through for the hero section
    const words = [
        "React | Node.js | TypeScript",
        "Frontend Engineering",
        "Creative Coding",
        "Next.js | Tailwind CSS"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    const typingDelay = 100;
    const erasingDelay = 50;
    const newWordDelay = 2000;

    function type() {
        const currentWord = words[wordIndex];

        if (isPaused) {
            setTimeout(type, newWordDelay);
            isPaused = false;
            return;
        }

        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at the end of word
            isPaused = true;
            isDeleting = true;
            setTimeout(type, newWordDelay);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? erasingDelay : typingDelay);
        }
    }

    // Start typing effect immediately
    type();

    /* --- 3. Scroll Reveal Animations --- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Grab all elements with fade-in-section class
    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => observer.observe(el));

    /* --- 4. Smooth Scrolling for Anchor Links --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Account for fixed header nav
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* --- 5. Mobile Menu Toggle (Basic logic) --- */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            // For a basic MVP toggle, just alternating display style via inline CSS.
            // In a more robust solution, toggle a class and use CSS transforms.
            if (navLinks.style.display === 'flex' || navLinks.style.display === 'block') {
                navLinks.style.display = 'none';
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.right = '0';
                navLinks.style.background = 'rgba(17, 34, 64, 0.95)';
                navLinks.style.padding = '20px';
                navLinks.style.borderRadius = '0 0 0 10px';
                mobileBtn.innerHTML = '<i class="fas fa-times"></i>';
            }
        });
    }
});
