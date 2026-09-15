/* 2026 Developer Portfolio - Interactive Engine */

document.addEventListener('DOMContentLoaded', () => {
    // Kinetic Cursor Tracking
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-follower');

    if (cursor && follower && window.innerWidth > 900) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate3d(${e.clientX - 8}px, ${e.clientY - 8}px, 0)`;
            follower.style.transform = `translate3d(${e.clientX - 22}px, ${e.clientY - 22}px, 0)`;
        });
    }

    // Smooth Navigation Highlight
    const sections = document.querySelectorAll('section, div[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-tab-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
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
});

// Project Studio Category Filtering
function filterProjects(category, btn) {
    const cards = document.querySelectorAll('.studio-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Skill Matrix Category Tabs
function switchMatrixTab(tabId, btn) {
    const contents = document.querySelectorAll('.matrix-grid-content');
    const buttons = document.querySelectorAll('.matrix-btn');

    contents.forEach(c => c.style.display = 'none');
    buttons.forEach(b => b.classList.remove('active'));

    document.getElementById(`matrix-${tabId}`).style.display = 'grid';
    btn.classList.add('active');
}

// Copy Email Notification
function copyEmail(email) {
    navigator.clipboard.writeText(email).then(() => {
        const toast = document.getElementById('email-toast');
        if (toast) {
            toast.style.display = 'block';
            setTimeout(() => {
                toast.style.display = 'none';
            }, 3000);
        }
    });
}
