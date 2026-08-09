// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    }
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    if (cursorFollower) {
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
    }
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Enhanced cursor interactions
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .education-highlight-card, .education-details-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursor) cursor.style.transform = 'scale(1.5)';
        if (cursorFollower) cursorFollower.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        if (cursor) cursor.style.transform = 'scale(1)';
        if (cursorFollower) cursorFollower.style.transform = 'scale(1)';
    });
});

// Mobile Menu Toggle with smooth animation
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-link');
const mobileTabItems = document.querySelectorAll('.mobile-tab-item');

if (mobileMenuToggle && navLinksContainer) {
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navLinksContainer.classList.toggle('mobile-active');
        mobileMenuToggle.classList.toggle('active', isOpen);
        mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('mobile-active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav')) {
            navLinksContainer.classList.remove('mobile-active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            navLinksContainer.classList.remove('mobile-active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navLinksContainer.classList.remove('mobile-active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Skills Category Switching
function showSkillCategory(category, clickedButton) {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
    
    document.querySelectorAll('.skill-category').forEach(cat => {
        cat.classList.remove('active');
    });
    
    const targetCat = document.getElementById(category);
    if (targetCat) {
        targetCat.classList.add('active');
    }
}

// Make showSkillCategory globally accessible because of inline onclick handlers
window.showSkillCategory = showSkillCategory;

// Smooth Scrolling Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Mobile Tab Navigation Smooth Scroll
mobileTabItems.forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = tab.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Offset scroll by header height (60px) on mobile
            const offset = 60;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        
        mobileTabItems.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// Scroll-based Navigation Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    // Scroll offset accounts for sticky top header (60px) + buffer
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Desktop Highlight
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) activeLink.classList.add('active');

            // Mobile Tab Highlight
            mobileTabItems.forEach(tab => tab.classList.remove('active'));
            // Map both Education and Experience to the "Journey" tab (#education)
            let targetId = sectionId;
            if (sectionId === 'experience') {
                targetId = 'education';
            }
            const activeTab = document.querySelector(`.mobile-tab-item[href="#${targetId}"]`);
            if (activeTab) activeTab.classList.add('active');
        }
    });
});

// Reveal Animations
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Typing Animation for Hero
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animations
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        setTimeout(() => {
            typeWriter(heroTitle, 'Android & Software Developer', 80);
        }, 1000);
    }
});

// Parallax Effect for Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const bgAnimation = document.querySelector('.bg-animation');
    if (bgAnimation) {
        bgAnimation.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Project Card Tilt Effect
const tiltElements = document.querySelectorAll('.project-card, .skill-item, .education-highlight-card, .education-details-card');

tiltElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Add floating animation to hero elements
const floatingElements = document.querySelectorAll('.hero-content > *');
floatingElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
    el.classList.add('fade-in-up');
});

// Add glow effect on scroll
window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.documentElement.style.setProperty('--scroll-progress', scrollPercent + '%');
});

