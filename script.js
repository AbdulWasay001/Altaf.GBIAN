// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = document.querySelector('header').offsetHeight;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Hamburger menu toggle with improved functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Prevent body scroll when mobile menu is open
    if (navLinks.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        body.style.overflow = 'auto';
    }
});

// Handle window resize to ensure proper menu state
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        body.style.overflow = 'auto';
    }
});

// Touch/swipe support for mobile gallery
let touchStartX = 0;
let touchEndX = 0;

document.querySelectorAll('.gallery-grid img').forEach(img => {
    img.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    img.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe(img);
    });
});

function handleSwipe(element) {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next image
        const nextElement = element.nextElementSibling || element.parentElement.firstElementChild;
        nextElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous image
        const prevElement = element.previousElementSibling || element.parentElement.lastElementChild;
        prevElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

// Enhanced Text Animation Observer
const textAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation to headings
            if (entry.target.classList.contains('animate-heading')) {
                entry.target.style.animation = 'slideInDown 0.8s ease-out forwards';
            }
            // Add animation to paragraphs
            if (entry.target.classList.contains('animate-paragraph')) {
                entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
            }
            // Add stagger animation to grids
            if (entry.target.classList.contains('animate-stagger')) {
                const children = entry.target.querySelectorAll(':scope > *');
                children.forEach((child, index) => {
                    child.style.animation = `fadeInUp 0.8s ease-out ${index * 0.15}s forwards`;
                    child.style.opacity = '0';
                });
            }
            // Add animation to other animated elements
            if (entry.target.classList.contains('animate-text-left')) {
                entry.target.style.animation = 'slideInLeft 0.8s ease-out forwards';
            }
            if (entry.target.classList.contains('animate-text-right')) {
                entry.target.style.animation = 'slideInRight 0.8s ease-out forwards';
            }
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Observe all animated text elements
document.querySelectorAll('.animate-heading, .animate-paragraph, .animate-stagger, .animate-text-left, .animate-text-right').forEach(el => {
    textAnimationObserver.observe(el);
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat-card, .achievement, .achievement-item, .testimonial-item, .gallery-grid img').forEach(el => {
    observer.observe(el);
});

// Contact form submission (placeholder)
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    // Here you would typically send the form data to a server
});

// Dynamic stats counter animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 30);
}

// Trigger counter animation when stats section is in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(document.querySelector('.stats'));

// Gallery lightbox (simple implementation)
const galleryImages = document.querySelectorAll('.gallery-grid img');
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${img.src}" alt="${img.alt}">
                <span class="close">&times;</span>
            </div>
        `;
        document.body.appendChild(lightbox);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.className === 'close') {
                document.body.removeChild(lightbox);
            }
        });
    });
});

// Add CSS for lightbox
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    .lightbox-content img {
        max-width: 100%;
        max-height: 100%;
        border-radius: 10px;
    }
    .close {
        position: absolute;
        top: -10px;
        right: -10px;
        color: #fff;
        font-size: 30px;
        cursor: pointer;
        background: #333;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(lightboxStyle);

// Initialize particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ffffff'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            },
            polygon: {
                nb_sides: 5
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

// Initialize Vanilla Tilt for cards
VanillaTilt.init(document.querySelectorAll('.stat-card, .achievement-item, .testimonial-item'), {
    max: 25,
    speed: 400,
    glare: true,
    'max-glare': 0.5
});