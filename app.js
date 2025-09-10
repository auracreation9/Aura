// AURA Creative Agency - Premium JavaScript Animations
class AuraAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupCustomCursor();
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupTypingAnimation();
        this.setupTestimonialsCarousel();
        this.setupContactForm();
        this.setupSmoothScrolling();
        this.setupParticleEffects();
        this.setupMobileOptimizations();
    }

    // Loading Screen Animation
    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const progressBar = document.querySelector('.progress-bar');
        
        // Animate progress bar
        setTimeout(() => {
            progressBar.style.transform = 'translateX(0)';
        }, 500);

        // Hide loading screen after animation completes
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'visible';
            this.triggerInitialAnimations();
        }, 3500);
    }

    // Custom Cursor Effects
    setupCustomCursor() {
        if (window.innerWidth <= 768) return; // Disable on mobile

        const cursor = document.querySelector('.custom-cursor');
        const follower = document.querySelector('.cursor-follower');

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Smooth follower animation
        const animateFollower = () => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .feature-card, .service-card, .portfolio-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.backgroundColor = 'rgba(212, 175, 55, 0.3)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.backgroundColor = 'transparent';
            });
        });
    }

    // Navigation Functionality
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Active nav link highlighting
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Scroll-triggered Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.classList.add('animate');
                    
                    // Stagger animation for grid items
                    if (element.classList.contains('features-grid') || 
                        element.classList.contains('services-grid') ||
                        element.classList.contains('portfolio-grid')) {
                        this.staggerGridAnimation(element);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.section-title, .section-subtitle, .feature-card, .service-card, .portfolio-item, .contact-info, .contact-form'
        );
        
        animateElements.forEach(el => observer.observe(el));
    }

    // Staggered Grid Animations
    staggerGridAnimation(gridElement) {
        const gridItems = gridElement.children;
        Array.from(gridItems).forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate');
            }, index * 150);
        });
    }

    // Typing Animation
    setupTypingAnimation() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const text = typingElement.getAttribute('data-text');
        let i = 0;

        const typeWriter = () => {
            if (i < text.length) {
                typingElement.style.width = ((i + 1) / text.length * 100) + '%';
                i++;
                setTimeout(typeWriter, 80);
            } else {
                // Remove typing cursor after completion
                setTimeout(() => {
                    typingElement.style.borderRight = 'none';
                }, 2000);
            }
        };

        // Start typing animation after loading screen
        setTimeout(() => {
            typingElement.textContent = text;
            typingElement.style.width = '0';
            typeWriter();
        }, 4000);
    }

    // Testimonials Carousel
    setupTestimonialsCarousel() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const navDots = document.querySelectorAll('.nav-dot');
        let currentSlide = 0;

        const showSlide = (index) => {
            // Hide all cards
            testimonialCards.forEach((card, i) => {
                card.classList.remove('active');
                if (i === index) {
                    setTimeout(() => {
                        card.classList.add('active');
                    }, 200);
                }
            });

            // Update nav dots
            navDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            currentSlide = index;
        };

        // Nav dot click handlers
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        // Auto-rotate testimonials
        setInterval(() => {
            const nextSlide = (currentSlide + 1) % testimonialCards.length;
            showSlide(nextSlide);
        }, 6000);
    }

    // Contact Form Functionality
    setupContactForm() {
        const form = document.getElementById('contactForm');
        const inputs = form.querySelectorAll('input, textarea');

        // Floating label animation
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (input.value === '') {
                    input.parentElement.classList.remove('focused');
                }
            });

            // Check if input has value on page load
            if (input.value !== '') {
                input.parentElement.classList.add('focused');
            }
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.btn-luxury');
            const originalText = submitBtn.querySelector('span').textContent;
            
            // Show loading state
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.style.pointerEvents = 'none';
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                
                // Reset form
                setTimeout(() => {
                    form.reset();
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.style.background = 'linear-gradient(135deg, var(--color-gold), var(--color-gold-dark))';
                    submitBtn.style.pointerEvents = 'auto';
                    
                    // Remove focused class from form groups
                    inputs.forEach(input => {
                        input.parentElement.classList.remove('focused');
                    });
                }, 2000);
            }, 1500);
        });
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Hero CTA scroll to about
        const heroBtn = document.getElementById('heroBtn');
        if (heroBtn) {
            heroBtn.addEventListener('click', () => {
                const aboutSection = document.getElementById('about');
                const offsetTop = aboutSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Particle Effects
    setupParticleEffects() {
        this.createFloatingParticles();
        this.setupParallaxEffect();
    }

    // Floating Particles Animation
    createFloatingParticles() {
        const heroSection = document.querySelector('.hero');
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(212, 175, 55, 0.6);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s;
            `;
            heroSection.appendChild(particle);
        }

        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translateY(0px) translateX(0px);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Parallax Scrolling Effect
    setupParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.hero-background, .testimonials-background');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    // Mobile Optimizations
    setupMobileOptimizations() {
        // Reduce animations on mobile for better performance
        if (window.innerWidth <= 768) {
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
                
                .floating-particle {
                    display: none !important;
                }
            `;
            document.head.appendChild(style);
        }

        // Touch-friendly interactions
        const touchElements = document.querySelectorAll('.feature-card, .service-card, .portfolio-item');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', () => {
                element.style.transform = '';
            });
        });
    }

    // Trigger initial animations after loading screen
    triggerInitialAnimations() {
        // Animate visible elements immediately
        const visibleElements = document.querySelectorAll('.section-title, .section-subtitle');
        visibleElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.classList.add('animate');
            }
        });
    }

    // Portfolio Filter Animation (if needed for expansion)
    setupPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.portfolio-filter');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter portfolio items
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Magnetic Button Effect
    setupMagneticButtons() {
        const magneticElements = document.querySelectorAll('.btn-luxury');
        
        magneticElements.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    // Text Reveal Animation
    setupTextRevealAnimation() {
        const revealElements = document.querySelectorAll('.text-reveal');
        
        revealElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.animationDelay = `${index * 0.05}s`;
                span.className = 'reveal-char';
                element.appendChild(span);
            });
        });
    }

    // Scroll Progress Indicator
    setupScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--color-gold), var(--color-gold-light));
            z-index: 10001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuraAnimations();
});

// Additional utility functions
const AuraUtils = {
    // Debounce function for performance
    debounce: (func, wait, immediate) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Smooth animation frame
    animate: (draw, duration) => {
        const start = performance.now();
        
        requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;
            
            draw(timeFraction);
            
            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
    }
};

// Performance optimization
window.addEventListener('load', () => {
    // Remove loading classes after everything is loaded
    document.body.classList.add('loaded');
    
    // Setup additional performance optimizations
    if ('IntersectionObserver' in window) {
        // Enhanced scroll animations are already set up
        console.log('🎨 AURA Creative Agency - Premium animations loaded successfully');
    }
});

// Handle viewport changes
window.addEventListener('resize', AuraUtils.debounce(() => {
    // Recalculate animations on resize if needed
    const isMobile = window.innerWidth <= 768;
    document.body.classList.toggle('mobile', isMobile);
}, 250));

// Preload critical assets
const preloadAssets = () => {
    const criticalImages = [
        'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/bbf6dd37926e304da58c7f79782029e08734918b.png',
        'https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/c4e258fa-88ce-4d49-a4c9-c4c7bc8e600f.png'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

preloadAssets();