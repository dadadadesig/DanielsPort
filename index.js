// index.js

// Initialize GSAP and register plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ------------------------
// Utility Functions
// ------------------------

// Throttle function to limit the rate at which a function can fire.
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function to ensure a function is only called after a certain period of inactivity.
function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}

// ------------------------
// Interactive Visual Effects
// ------------------------

// Cyberpunk trail effect animation - optimized with throttling
document.addEventListener('mousemove', throttle((e) => {
    const cyberpunkTrail = document.createElement('div');
    cyberpunkTrail.className = 'cyberpunk-trail';
    document.body.appendChild(cyberpunkTrail);
    cyberpunkTrail.style.left = e.clientX + 'px';
    cyberpunkTrail.style.top = e.clientY + 'px';
    gsap.to(cyberpunkTrail, {
        opacity: 0,
        scale: 1.5,
        duration: 1,
        ease: 'power1.out',
        onComplete: () => {
            cyberpunkTrail.remove();
        }
    });
}, 100)); // Increased throttle limit for gentler trail

// Click effect animation - optimized for smoothness
document.addEventListener('click', (e) => {
    const clickEffect = document.createElement('div');
    clickEffect.className = 'click-effect';
    document.body.appendChild(clickEffect);
    clickEffect.style.left = e.clientX + 'px';
    clickEffect.style.top = e.clientY + 'px';
    gsap.to(clickEffect, {
        width: 50,
        height: 50,
        opacity: 0,
        duration: 0.6,
        ease: 'power1.out',
        onComplete: () => {
            clickEffect.remove();
        }
    });
});

// ------------------------
// Loading Animation
// ------------------------

// Handle loader visibility and initial animations
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => {
                loader.style.display = 'none';
                // Animate hero section elements with gentle fade-in and slide-up
                gsap.fromTo('.hero h1', 
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.3 }
                );
                gsap.fromTo('.hero p', 
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.5 }
                );
                gsap.fromTo('.cta-buttons', 
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.7 }
                );
            }
        });
    }
});

// ------------------------
// Sticky Navigation Hide/Show on Scroll
// ------------------------

// Hide navigation on scroll down and show on scroll up with gentle transitions
let lastScrollTop = 0;
window.addEventListener('scroll', debounce(() => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('.header');

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down - hide header gently
        gsap.to(header, {
            y: '-100%',
            duration: 0.5,
            ease: 'power2.out'
        });
    } else {
        // Scrolling up - show header gently
        gsap.to(header, {
            y: '0%',
            duration: 0.5,
            ease: 'power2.out'
        });
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
}, 200));

// ------------------------
// Section Animations on Scroll
// ------------------------

// Animate elements within each section as they gently enter the viewport
const sections = gsap.utils.toArray('section');
sections.forEach(section => {
    // Animate headers
    gsap.from(section.querySelectorAll('h2, h1'), {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Animate paragraphs and other content
    gsap.from(section.querySelectorAll('p, .cta-buttons, .projects-grid, .skills-grid, .testimonials-grid, .flow-videos-container, .about-image, .about-content, .flow-caption'), {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});

// ------------------------
// User Flows Section Animations
// ------------------------

// Specifically target the User Flows section for gentle animations
const userFlowsSection = document.querySelector('.user-flows-section');
if (userFlowsSection) {
    gsap.from(userFlowsSection.querySelectorAll('.flow-video'), {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: userFlowsSection,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}
/* Back-to-Top Button (Optional) */

// Apply subtle scaling on hover for interactive buttons
const buttons = document.querySelectorAll('.view-project-btn, .btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.02, // Minimal scaling for gentleness
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ------------------------
// Smooth Scroll with GSAP ScrollToPlugin
// ------------------------

// Enable smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {duration: 1, scrollTo: {y: target, offsetY: 70}, ease: 'power2.out'});
        }
    });
});

// ------------------------
// Active Link Highlighting
// ------------------------

// Highlight the active navigation link based on scroll position
const navItems = document.querySelectorAll('.nav-item');
window.addEventListener('scroll', throttle(() => {
    let scrollPos = window.scrollY + 150; // Adjust as needed for accurate detection
    sections.forEach((section, index) => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            navItems.forEach(item => item.classList.remove('active'));
            if(navItems[index]) navItems[index].classList.add('active');
        }
    });
}, 200));

// ------------------------
// Hamburger Menu Toggle
// ------------------------

// Toggle the navigation menu on small screens with smooth transitions
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('menu-active');
    if(navLinks.classList.contains('menu-active')) {
        gsap.to(navLinks, {
            duration: 0.5,
            opacity: 1,
            ease: 'power2.out',
            display: 'flex'
        });
    } else {
        gsap.to(navLinks, {
            duration: 0.5,
            opacity: 0,
            ease: 'power2.out',
            onComplete: () => {
                navLinks.style.display = 'none';
            }
        });
    }
});


// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        if(navLinks.classList.contains('menu-active')) {
            navLinks.classList.remove('menu-active');
            gsap.to(navLinks, {
                duration: 0.5,
                opacity: 0,
                ease: 'power2.out',
                onComplete: () => {
                    navLinks.style.display = 'none';
                }
            });
        }
    }
});
