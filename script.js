// ===========================
// AMANATION-inspired Interaction System
// ===========================

// GSAP Plugin Registration
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Global State
let isLoading = true;
let isMobileMenuOpen = false;

// ===========================
// Initialization
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    initLoading();
    initSmoothScroll();
    initHeader();
    initMobileMenu();
    initAnimations();
    initScrollTriggers();
    initInteractions();
    initParallaxEffects();
});

// ===========================
// Smooth Scroll (Lenis-style)
// ===========================
let scrollY = 0;
let scrollDirection = 'down';

function initSmoothScroll() {
    let lastScrollY = window.scrollY;
    
    // Custom smooth scroll behavior
    const smoothScroll = () => {
        const currentScrollY = window.scrollY;
        scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        scrollY = currentScrollY;
        lastScrollY = currentScrollY;
        
        // Update CSS custom property for parallax effects
        document.documentElement.style.setProperty('--scroll-y', scrollY + 'px');
        requestAnimationFrame(smoothScroll);
    };
    
    requestAnimationFrame(smoothScroll);
}

// ===========================
// Loading Experience
// ===========================
function initLoading() {
    const loadingScreen = document.getElementById('loading');
    
    // Simulate loading progress
    const progressBar = loadingScreen.querySelector('.loading-bar');
    
    // Animate progress bar
    gsap.fromTo(progressBar, 
        { scaleX: 0 },
        { 
            scaleX: 1, 
            duration: 2,
            ease: "power2.inOut",
            onComplete: hideLoading
        }
    );
}

function hideLoading() {
    const loadingScreen = document.getElementById('loading');
    
    gsap.to(loadingScreen, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            loadingScreen.classList.add('hidden');
            isLoading = false;
            startMainAnimations();
        }
    });
}

function startMainAnimations() {
    // Set initial visible state - no hiding
    gsap.set('.hero-title .title-line, .hero-subtitle, .hero-stats .stat-item, .cta-primary, .hero-video, .food-item, .scroll-indicator', {
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0
    });
    
    // Simple fade-in animation only
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .fromTo('.hero-title .title-line', 
            { opacity: 0, y: 20 },
            {
                duration: 0.6,
                opacity: 1,
                y: 0,
                stagger: 0.1,
                ease: 'power2.out'
            })
        .fromTo('.hero-subtitle',
            { opacity: 0 },
            {
                duration: 0.5,
                opacity: 1,
                ease: 'power2.out'
            }, '-=0.3')
        .fromTo('.hero-stats .stat-item',
            { opacity: 0 },
            {
                duration: 0.4,
                opacity: 1,
                stagger: 0.1,
                ease: 'power2.out'
            }, '-=0.2')
        .fromTo('.cta-primary',
            { opacity: 0 },
            {
                duration: 0.5,
                opacity: 1,
                ease: 'power2.out'
            }, '-=0.2')
        .fromTo('.hero-video',
            { opacity: 0 },
            {
                duration: 0.6,
                opacity: 1,
                ease: 'power2.out'
            }, '-=0.4')
        .fromTo('.food-item',
            { opacity: 0 },
            {
                duration: 0.4,
                opacity: 1,
                stagger: 0.05,
                ease: 'power2.out'
            }, '-=0.3')
        .fromTo('.scroll-indicator',
            { opacity: 0 },
            {
                duration: 0.5,
                opacity: 1,
                ease: 'power2.out'
            }, '-=0.2');
}

// ===========================
// Header Interactions
// ===========================
function initHeader() {
    const header = document.getElementById('header');
    let lastScrollY = 0;
    
    // Header scroll behavior
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        onUpdate: (self) => {
            const currentScrollY = self.scroll();
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                gsap.to(header, {
                    y: -80,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                // Scrolling up
                gsap.to(header, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
            
            lastScrollY = currentScrollY;
        }
    });
    
    // Header background change
    ScrollTrigger.create({
        start: 'top -1',
        end: 99999,
        onEnter: () => {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        },
        onLeaveBack: () => {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// ===========================
// Mobile Menu System
// ===========================
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const menuLines = document.querySelectorAll('.menu-line');
    const menuText = document.querySelector('.menu-text');
    
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking on links
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    function toggleMobileMenu() {
        if (isMobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        isMobileMenuOpen = true;
        mobileOverlay.classList.add('active');
        
        // Animate menu toggle button
        gsap.to(menuLines[0], { rotation: 45, y: 6, duration: 0.3 });
        gsap.to(menuLines[1], { rotation: -45, y: -6, duration: 0.3 });
        gsap.to(menuText, { opacity: 0, duration: 0.2 });
        
        // Animate menu items
        gsap.fromTo('.mobile-link', 
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.6, 
                stagger: 0.1, 
                ease: 'power2.out',
                delay: 0.2
            }
        );
    }
    
    function closeMobileMenu() {
        isMobileMenuOpen = false;
        mobileOverlay.classList.remove('active');
        
        // Reset menu toggle button
        gsap.to(menuLines[0], { rotation: 0, y: 0, duration: 0.3 });
        gsap.to(menuLines[1], { rotation: 0, y: 0, duration: 0.3 });
        gsap.to(menuText, { opacity: 1, duration: 0.3, delay: 0.1 });
    }
}

// ===========================
// Scroll Trigger Animations
// ===========================
function initScrollTriggers() {
    // Problem cards animation
    ScrollTrigger.create({
        trigger: '.problems-grid',
        start: 'top 80%',
        onEnter: () => {
            gsap.fromTo('.problem-card', 
                { y: 60, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.8, 
                    stagger: 0.15,
                    ease: 'power2.out'
                }
            );
        }
    });
    
    // Story reveal animation
    ScrollTrigger.create({
        trigger: '.story-reveal',
        start: 'top 80%',
        onEnter: () => {
            const tl = gsap.timeline();
            tl.from('.reveal-title', {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power2.out'
            })
            .from('.formula-box', {
                duration: 0.8,
                scale: 0.8,
                opacity: 0,
                ease: 'back.out(1.7)'
            }, '-=0.5')
            .from('.formula-description', {
                duration: 0.6,
                y: 30,
                opacity: 0,
                ease: 'power2.out'
            }, '-=0.3');
        }
    });
    
    // Method cards animation
    ScrollTrigger.create({
        trigger: '.method-grid',
        start: 'top 80%',
        onEnter: () => {
            gsap.fromTo('.method-card', 
                { y: 80, opacity: 0, rotateX: 15 },
                { 
                    y: 0, 
                    opacity: 1,
                    rotateX: 0,
                    duration: 1, 
                    stagger: 0.2,
                    ease: 'power2.out'
                }
            );
        }
    });
    
    // Author section animation
    ScrollTrigger.create({
        trigger: '.author-content',
        start: 'top 80%',
        onEnter: () => {
            const tl = gsap.timeline();
            tl.from('.author-avatar', {
                duration: 1,
                scale: 0,
                rotation: 180,
                ease: 'back.out(1.7)'
            })
            .from('.author-badge', {
                duration: 0.6,
                scale: 0,
                ease: 'back.out(1.7)'
            }, '-=0.5')
            .from('.author-info > *', {
                duration: 0.8,
                x: 50,
                opacity: 0,
                stagger: 0.1,
                ease: 'power2.out'
            }, '-=0.8');
        }
    });
    
    // Chat demo animation
    ScrollTrigger.create({
        trigger: '.chat-container',
        start: 'top 80%',
        onEnter: () => {
            gsap.fromTo('.chat-message', 
                { y: 30, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.6, 
                    stagger: 0.4,
                    ease: 'power2.out'
                }
            );
        }
    });
    
    // Food items hover animation setup
    initFoodItemAnimations();
}

// ===========================
// Interactive Animations
// ===========================
function initAnimations() {
    // Subtle floating animation for food items only
    gsap.to('.food-item:nth-child(odd)', {
        y: -5, // Reduced from -10 to -5
        duration: 3, // Slower animation
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true
    });
    
    gsap.to('.food-item:nth-child(even)', {
        y: 5, // Reduced from 10 to 5
        duration: 3.5, // Slower animation
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1.5
    });
}

function initFoodItemAnimations() {
    const foodItems = document.querySelectorAll('.food-item');
    
    foodItems.forEach((item, index) => {
        const icon = item.querySelector('.material-icons');
        const name = item.querySelector('.food-name');
        
        // Hover animations
        item.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                scale: 1.2,
                rotation: 15,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
            gsap.to(name, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            gsap.to(name, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        // Click animation
        item.addEventListener('click', () => {
            gsap.fromTo(item, 
                { scale: 1 },
                { 
                    scale: 0.95, 
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut'
                }
            );
        });
    });
}

// ===========================
// Interactive Elements
// ===========================
function initInteractions() {
    // Button hover effects
    const buttons = document.querySelectorAll('.cta-primary, .cta-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
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
    
    // Card hover effects
    const cards = document.querySelectorAll('.problem-card, .method-card');
    
    cards.forEach(card => {
        const icon = card.querySelector('.material-icons');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -8,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            if (icon) {
                gsap.to(icon, {
                    scale: 1.1,
                    rotation: 5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            if (icon) {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 80
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    });
    
    // Mobile CTA visibility
    initMobileCTA();
}

// ===========================
// Mobile CTA Management
// ===========================
function initMobileCTA() {
    const mobileCTA = document.getElementById('mobile-cta');
    
    if (!mobileCTA) return;
    
    // Show/hide based on scroll position
    ScrollTrigger.create({
        trigger: '.story-section',
        start: 'top 80%',
        onEnter: () => {
            gsap.to(mobileCTA, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        },
        onLeaveBack: () => {
            gsap.to(mobileCTA, {
                y: 100,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
    
    // Hide when reaching final section
    ScrollTrigger.create({
        trigger: '.final-section',
        start: 'top 80%',
        onEnter: () => {
            gsap.to(mobileCTA, {
                y: 100,
                duration: 0.3,
                ease: 'power2.out'
            });
        },
        onLeaveBack: () => {
            gsap.to(mobileCTA, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
}

// ===========================
// Utility Functions
// ===========================
function scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    
    if (targetElement) {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: targetElement,
                offsetY: 80
            },
            ease: 'power2.inOut'
        });
    }
}

function openArticle() {
    // Open the actual note.com article
    window.open('https://note.com/chesco_aiblog/n/n745acdec4a6d', '_blank');
}

function showArticleModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 8px;
        text-align: center;
        max-width: 500px;
        margin: 20px;
    `;
    
    content.innerHTML = `
        <h3 style="margin-bottom: 20px; font-family: Inter, sans-serif;">記事への遷移</h3>
        <p style="margin-bottom: 30px; color: #666;">実際の実装では、ここで note.com の記事URLにリダイレクトします</p>
        <button onclick="this.closest('[style*=\"fixed\"]').remove()" 
                style="background: #e4691d; color: white; border: none; padding: 12px 24px; border-radius: 25px; cursor: pointer;">
            閉じる
        </button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Animate modal appearance
    gsap.to(modal, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
    });
    
    gsap.fromTo(content, 
        { scale: 0.8, y: 50 },
        { 
            scale: 1, 
            y: 0, 
            duration: 0.5, 
            ease: 'back.out(1.7)',
            delay: 0.1
        }
    );
}

// ===========================
// Performance Optimization
// ===========================

// Throttle scroll events
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

function updateOnScroll() {
    // Perform scroll-based updates here
    ticking = false;
}

window.addEventListener('scroll', requestTick, { passive: true });

// ===========================
// Accessibility Enhancements
// ===========================

// Reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable complex animations for users who prefer reduced motion
    gsap.globalTimeline.timeScale(0.1);
}

// Focus management
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ===========================
// Error Handling
// ===========================

window.addEventListener('error', (e) => {
    console.warn('Script error:', e.error);
    // Graceful degradation - ensure basic functionality works
});

// GSAP error handling
if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded. Falling back to CSS animations.');
    document.body.classList.add('no-js-animations');
}

// ===========================
// Parallax Effects
// ===========================
function initParallaxEffects() {
    // Remove parallax effect that was causing elements to disappear
    // Keep elements in their original positions
    
    // Simple fade-in for section titles only (excluding hero titles)
    const titleElements = document.querySelectorAll('.section-title');
    
    titleElements.forEach(text => {
        ScrollTrigger.create({
            trigger: text,
            start: 'top 85%',
            onEnter: () => {
                gsap.fromTo(text, 
                    {
                        y: 30,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power2.out'
                    }
                );
            }
        });
    });
    
    // Remove aggressive card skewing and magnetic buttons
    // Keep only subtle hover effects
}

// ===========================
// Simplified Interactions
// ===========================
// Removed aggressive magnetic button effects for better UX

// ===========================
// Initialization Complete
// ===========================

console.log('🍝 サイゼマーケティングLP initialized successfully!');