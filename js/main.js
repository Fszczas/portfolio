// EmailJS — replace these with your actual IDs from emailjs.com
const EMAILJS_PUBLIC_KEY  = '2EOOMFATJI6h00W3O';
const EMAILJS_SERVICE_ID  = 'service_926cfbf';
const EMAILJS_TEMPLATE_ID = 'template_n1n50pk';

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

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

    /* --- 5. Image Sliders --- */
    document.querySelectorAll('[data-slider]').forEach(slider => {
        const track = slider.querySelector('.slider-track');
        const dots = slider.querySelectorAll('.slider-dot');
        const prevBtn = slider.querySelector('.slider-btn.prev');
        const nextBtn = slider.querySelector('.slider-btn.next');
        const total = dots.length;
        let current = 0;

        function goTo(index) {
            current = (index + total) % total;
            track.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
        }

        prevBtn.addEventListener('click', e => { e.stopPropagation(); goTo(current - 1); });
        nextBtn.addEventListener('click', e => { e.stopPropagation(); goTo(current + 1); });
        dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
    });

    /* --- 6. Contact Form --- */
    const contactForm = document.getElementById('contact-form');
    const submitBtn   = document.getElementById('submit-btn');
    const formStatus  = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            submitBtn.querySelector('.btn-text').style.display    = 'none';
            submitBtn.querySelector('.btn-loading').style.display = 'inline';
            submitBtn.disabled = true;
            formStatus.textContent = '';
            formStatus.className = 'form-status';

            try {
                await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm);
                formStatus.textContent = 'Message sent! I\'ll get back to you soon.';
                formStatus.classList.add('form-status--success');
                contactForm.reset();
            } catch {
                formStatus.textContent = 'Something went wrong. Please try again.';
                formStatus.classList.add('form-status--error');
            } finally {
                submitBtn.querySelector('.btn-text').style.display    = 'inline';
                submitBtn.querySelector('.btn-loading').style.display = 'none';
                submitBtn.disabled = false;
            }
        });
    }

    /* --- 7. Mobile Menu Toggle --- */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('mobile-open');
            mobileBtn.innerHTML = isOpen
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
});
