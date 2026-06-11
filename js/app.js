/**
 * Science Unpacked - Main Application JavaScript
 */

'use strict';

// ===== MOBILE NAVIGATION =====
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
    
    // Close menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== PARTICLE ANIMATION =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        // Random size
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random opacity
        particle.style.opacity = 0.3 + Math.random() * 0.5;
        
        particlesContainer.appendChild(particle);
    }
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 100;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== TABLE OF CONTENTS ACTIVE STATE =====
function updateActiveTocLink() {
    const sections = document.querySelectorAll('.note-section');
    const tocLinks = document.querySelectorAll('.toc-list a');
    
    if (!sections.length || !tocLinks.length) return;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });
    
    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

if (document.querySelector('.toc-list')) {
    window.addEventListener('scroll', updateActiveTocLink);
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.topic-card, .feature-item, .preview-card').forEach(el => {
    observer.observe(el);
});

// ===== VIDEO PLAYER PLACEHOLDER =====
function initVideoPlayer() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (!videoPlaceholder) return;
    
    // Check if iframe exists (video embedded)
    const iframe = videoPlaceholder.querySelector('iframe');
    if (iframe) {
        videoPlaceholder.classList.add('has-video');
    }
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ===== TOAST NOTIFICATION =====
function showToast(message, duration = 3000) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: var(--surface);
        color: var(--text);
        padding: 16px 24px;
        border-radius: var(--radius);
        border: 1px solid var(--border);
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    
    // Remove after duration
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Science Unpacked initialized');
    
    // createParticles(); // Replaced by universe-bg.js
    initVideoPlayer();
});

// Export functions for use in other scripts
window.ScienceUnpacked = {
    showToast,
    copyToClipboard,
    debounce
};

// ===== SCROLL PROGRESS BAR =====
(function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + '%';
    }, { passive: true });
})();

// ===== INTERSECTION OBSERVER FOR REVEAL ANIMATIONS =====
(function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        observer.observe(el);
    });
})();

// ===== 3D CARD TILT =====
(function initCardTilt() {
    if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on touch
    
    document.querySelectorAll('.card-3d').forEach(card => {
        const inner = card.querySelector('.card-3d-inner') || card;
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            inner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
})();

// ===== GLOW FOLLOW EFFECT =====
(function initGlowFollow() {
    document.querySelectorAll('.glow-follow').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            el.style.setProperty('--x', (e.clientX - rect.left) + 'px');
            el.style.setProperty('--y', (e.clientY - rect.top) + 'px');
        });
    });
})();

// ===== MAGNETIC BUTTONS =====
(function initMagneticButtons() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    document.querySelectorAll('.btn-magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
})();

// ===== HERO TEXT REVEAL =====
(function initHeroTextReveal() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.innerHTML;
    const words = text.split(/(<[^>]+>)/).filter(Boolean);
    
    heroTitle.innerHTML = words.map((word, i) => {
        if (word.startsWith('<')) return word;
        return word.split(/(\s+)/).map(w => {
            if (w.trim() === '') return w;
            return `<span class="hero-reveal-word" style="animation-delay: ${i * 0.08}s">${w}</span>`;
        }).join('');
    }).join('');
})();

// ===== STAT COUNTERS =====
(function initStatCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (!counters.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                const duration = 2000;
                const start = performance.now();
                
                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(eased * target);
                    if (progress < 1) requestAnimationFrame(update);
                }
                
                requestAnimationFrame(update);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(c => observer.observe(c));
})();

// ===== MOUSE-REACTIVE ORBS =====
(function initMouseOrbs() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    const orbs = document.querySelectorAll('.gradient-orb');
    if (!orbs.length) return;
    
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function animate() {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        
        orbs.forEach((orb, i) => {
            const factor = (i + 1) * 15;
            orb.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
})();

// Subject card mouse glow tracking
document.querySelectorAll('.subject-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', ((e.clientX - rect.left) / rect.width * 100) + '%');
        card.style.setProperty('--mouse-y', ((e.clientY - rect.top) / rect.height * 100) + '%');
    });
});
