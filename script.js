// Shivansh Nigam Portfolio JavaScript Logic

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Progress Bar
  const scrollProgress = document.querySelector('#scrollLine span');
  const updateScrollProgress = () => {
    if (!scrollProgress) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;
  };
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // 2. Theme Toggle (Dark / Light)
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  // Check saved theme preference or default to dark
  const savedTheme = localStorage.getItem('sn_theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('sn_theme', newTheme);
  });

  // 3. Toast Notifications
  const toastContainer = document.getElementById('toastContainer');
  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);

    // Trigger animate-in
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // 4. Copy Email to Clipboard (Contact Section)
  const emailText = 'nigamman20@gmail.com';
  const contactCopyBtn = document.getElementById('copyEmailContactBtn');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailText).then(() => {
      showToast('Email copied to clipboard! 📋');
    }).catch(() => {
      showToast('Failed to copy email.');
    });
  };

  contactCopyBtn?.addEventListener('click', handleCopyEmail);

  // 5. Project Filtering Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'grid';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 6. Mobile Overlay Menu Toggle
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  menuBtn?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuBtn.classList.toggle('active', isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn?.classList.remove('active');
      menuBtn?.setAttribute('aria-expanded', 'false');
    });
  });

  // 7. Scroll Reveal Animation (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el, index) => {
    el.style.transitionDelay = `${(index % 4) * 60}ms`;
    revealObserver.observe(el);
  });

  // 8. Custom Magnetic Cursor (Desktop)
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');

  if (cursorDot && cursorOutline && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      // Smooth lag for outline
      cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 500, fill: 'forwards' });
    });

    // Expand cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .email-copy-box, .toolkit-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.6)';
        cursorOutline.style.borderColor = 'var(--accent-color)';
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.borderColor = 'rgba(99, 102, 241, 0.4)';
      });
    });
  }

  // 9. Active Nav Link Highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav a');

  const highlightNavOnScroll = () => {
    const scrollY = window.scrollY;
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 10. Atithi Bhoj Closed Testing Modal Trigger
  const atithiPlayStoreBtn = document.getElementById('atithiPlayStoreBtn');
  const closedTestingModal = document.getElementById('closedTestingModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (atithiPlayStoreBtn && closedTestingModal) {
    atithiPlayStoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closedTestingModal.classList.add('open');
      closedTestingModal.setAttribute('aria-hidden', 'false');
    });

    const closeModal = () => {
      closedTestingModal.classList.remove('open');
      closedTestingModal.setAttribute('aria-hidden', 'true');
    };

    closeModalBtn?.addEventListener('click', closeModal);

    // Close on backdrop click
    closedTestingModal.addEventListener('click', (e) => {
      if (e.target === closedTestingModal) {
        closeModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && closedTestingModal.classList.contains('open')) {
        closeModal();
      }
    });
  }
});
