// swapark.js

// Initialize GSAP and register plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ------------------------
// Utility Functions
// ------------------------

// Throttle function to limit the rate at which a function can fire.
const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Debounce function to ensure a function is only called after a certain period of inactivity.
const debounce = (func, delay) => {
    let debounceTimer;
    return (...args) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func(...args), delay);
    };
};

// ------------------------
// Interactive Visual Effects
// ------------------------

// Cyberpunk trail effect on mouse move
document.addEventListener('mousemove', throttle((e) => {
    const trail = document.createElement('div');
    trail.classList.add('cyberpunk-trail');
    Object.assign(trail.style, {
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
    });
    document.body.appendChild(trail);
    gsap.to(trail, {
        opacity: 0,
        scale: 2,
        duration: 1.2,
        ease: 'power1.out',
        onComplete: () => trail.remove()
    });
}, 50));

// Click effect animation
document.addEventListener('click', (e) => {
    const effect = document.createElement('div');
    effect.classList.add('click-effect');
    Object.assign(effect.style, {
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
    });
    document.body.appendChild(effect);
    gsap.to(effect, {
        width: 100,
        height: 100,
        opacity: 0,
        duration: 0.4,
        ease: 'power1.out',
        onComplete: () => effect.remove()
    });
});

// ------------------------
// Loading Animation
// ------------------------

// Assuming there is a loader element with class 'loader' in your HTML
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
                loader.style.display = 'none';
                // Animate home section elements
                gsap.to(['.home-section h1', '.home-section p'], {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    delay: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    }
});

// ------------------------
// Sticky Navigation Hide/Show on Scroll
// ------------------------

let lastScroll = 0;
window.addEventListener('scroll', debounce(() => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('.header');
    gsap.to(header, {
        y: currentScroll > lastScroll ? '-100%' : '0%',
        duration: 0.3,
        ease: 'power2.out'
    });
    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
}, 100));

// ------------------------
// Section Animations on Scroll
// ------------------------

const sections = gsap.utils.toArray('section');
sections.forEach(section => {
    // Animate headers
    gsap.from(section.querySelector('h2, h1'), {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
            trigger: section,
            start: 'top center+=100'
        }
    });

    // Animate content within sections
    gsap.from(section.querySelectorAll('p, ul, .timeline-content, .screens-grid, .contact-form, .solution-features, .feature, .personas-grid, .portfolio-grid, .wireframes-content, .results-grid, .result-item'), {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});

// ------------------------
// Button Hover Effects
// ------------------------

document.querySelectorAll('.contact-form button, .view-project-btn').forEach(btn => {
    ['mouseenter', 'mouseleave'].forEach(evt => {
        btn.addEventListener(evt, () => {
            gsap.to(btn, {
                scale: evt === 'mouseenter' ? 1.05 : 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
});

// ------------------------
// Hamburger Menu Toggle
// ------------------------

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('open');
    }
});

// ------------------------
// Chart.js Initialization
// ------------------------

if (typeof Chart !== 'undefined') {
    const chartsConfig = [
        {
            id: 'question1Chart',
            type: 'bar',
            data: {
                labels: ['Never', '1-2 times', '3-4 times', '5+ times'],
                datasets: [{
                    label: '% of Respondents',
                    data: [10, 30, 40, 20],
                    backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(54,162,235,0.6)', 'rgba(255,206,86,0.6)', 'rgba(255,99,132,0.6)'],
                    borderColor: ['rgba(75,192,192,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)', 'rgba(255,99,132,1)'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, max: 100, ticks: { callback: v => `${v}%` } }
                },
                plugins: {
                    title: { display: true, text: 'How Often Do You Encounter Difficulty Finding a Parking Spot?' },
                    legend: { display: false }
                }
            }
        },
        {
            id: 'question2Chart',
            type: 'pie',
            data: {
                labels: [
                    'Real-time parking availability',
                    'In-app payment options',
                    'User parking spot ratings',
                    'Pre-booking parking spots',
                    'Access to parking cost information',
                    'Support for local languages',
                    'Integration with public transportation services',
                    'Real-time alerts on parking availability'
                ],
                datasets: [{
                    data: [60, 55, 45, 35, 50, 30, 25, 40],
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                        '#9966FF', '#FF9F40', '#C9CBCF', '#FFCD56'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'Which Features Are Most Important to You in a Parking Search App?' }
                }
            }
        },
        {
            id: 'question3Chart',
            type: 'doughnut',
            data: {
                labels: ['1 - Not Satisfied at All', '2 - Slightly Satisfied', '3 - Neutral', '4 - Satisfied', '5 - Very Satisfied'],
                datasets: [{
                    data: [15, 25, 30, 20, 10],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'How Satisfied Are You with Current Parking Search Solutions?' },
                    legend: { position: 'bottom' }
                }
            }
        },
        {
            id: 'question4Chart',
            type: 'bar',
            data: {
                labels: [
                    'Time-saving', 'Cost-saving', 'User-friendly interface',
                    'Reliable and real-time information', 'Recommendations based on other users',
                    'Excellent customer support and service', 'Security and protection of personal information',
                    'Integration with other applications'
                ],
                datasets: [{
                    label: '% of Respondents',
                    data: [65, 50, 45, 60, 35, 25, 30, 20],
                    backgroundColor: 'rgba(54,162,235,0.6)',
                    borderColor: 'rgba(54,162,235,1)',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { beginAtZero: true, max: 100, ticks: { callback: v => `${v}%` } }
                },
                plugins: {
                    title: { display: true, text: 'Main Reasons to Use a New Parking Search App' },
                    legend: { display: false }
                }
            }
        }
    ];

    chartsConfig.forEach(({ id, type, data, options }) => {
        const ctx = document.getElementById(id)?.getContext('2d');
        if (ctx) new Chart(ctx, { type, data, options });
    });
} else {
    console.error('Chart.js library is not loaded.');
}

// ------------------------
// Additional Animations (Optional)
// ------------------------

// Example: Animate project cards, about section, skills, testimonials
['.portfolio-item', '.feature', '.persona', '.wireframe-item', '.result-item'].forEach(selector => {
    gsap.from(gsap.utils.toArray(selector), {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: selector.includes('persona') ? '.personas-section' :
                     selector.includes('wireframe') ? '.wireframes-section' :
                     selector.includes('result') ? '.results-section' :
                     '.portfolio-section',
            start: 'top center+=100'
        }
    });
});
// Smooth Scroll with GSAP ScrollToPlugin
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {duration: 1, scrollTo: target, ease: 'power2.out'});
        }
    });
});

// Active Link Highlighting
const sectionsId = sections.map(section => section.getAttribute('id'));
const navLinksArr = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', throttle(() => {
    const scrollPos = window.scrollY + 100;
    sections.forEach((section, index) => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            navLinksArr.forEach(link => link.classList.remove('active'));
            navLinksArr[index].classList.add('active');
        }
    });
}, 100));