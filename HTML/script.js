// ====================================
// PAGE LOADER
// ====================================
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 1000);
    }
});

// ====================================
// SCROLL PROGRESS BAR
// ====================================
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// ====================================
// MOBILE MENU TOGGLE
// ====================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        const icon = mobileMenuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// ====================================
// FADE UP ANIMATIONS
// ====================================
const fadeUpObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-up-visible');
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

const fadeElements = document.querySelectorAll('.hero-content, .about-content, .about-image, .section-title, .project-card, .contact-item, .grid-column');
fadeElements.forEach(el => {
    el.classList.add('fade-up');
    fadeUpObserver.observe(el);
});

// ====================================
// SKILLS BAR ANIMATION
// ====================================
const skillLevels = document.querySelectorAll('.skill-level');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const skillBar = entry.target;
            const level = skillBar.getAttribute('data-level');
            
            setTimeout(() => {
                skillBar.style.width = level + 'px';
            }, index * 100);
            
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillLevels.forEach(skill => {
    skill.style.width = '0px';
    skillObserver.observe(skill);
});

// ====================================
// ACTIVE NAV LINK HIGHLIGHTING
// ====================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar nav a, .nav-menu a');

window.addEventListener('scroll', () => {
    let current = 'home';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const scrollThreshold = section.clientHeight * 0.3;
        
        if (pageYOffset >= sectionTop - scrollThreshold) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ====================================
// 3D TILT CARDS (Desktop only)
// ====================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 15;
        const rotateY = ((centerX - x) / centerX) * 15;
        
        card.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale3d(1.05, 1.05, 1.05)
        `;
        card.style.transition = 'none';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s ease';
    });
});

// ====================================
// MAGNETIC BUTTONS
// ====================================
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;
        
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// ====================================
// PARALLAX HERO (Desktop only)
// ====================================
window.addEventListener('scroll', () => {
    if (window.innerWidth < 768) return;
    
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < 700) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
});

// ====================================
// GLITCH TEXT ON HOVER
// ====================================
const glitchText = document.querySelector('.full-name');

if (glitchText) {
    glitchText.addEventListener('mouseenter', () => {
        glitchText.classList.add('glitch-active');
        setTimeout(() => glitchText.classList.remove('glitch-active'), 500);
    });
}

// ====================================
// NAVBAR HIDE ON SCROLL DOWN
// ====================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ====================================
// SECTION FADE IN
// ====================================
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, { threshold: 0.15 });

sections.forEach(section => {
    section.classList.add('section-hidden');
    sectionObserver.observe(section);
});

// ====================================
// PROJECT IMAGE PARALLAX ON SCROLL
// ====================================
window.addEventListener('scroll', () => {
    if (window.innerWidth < 768) return;
    
    projectCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
        
        if (scrollPercent > 0 && scrollPercent < 1) {
            const img = card.querySelector('.project-image-placeholder img');
            if (img) {
                img.style.transform = `translateY(${scrollPercent * 20}px)`;
            }
        }
    });
});

// ====================================
// LAZY LOAD IMAGES WITH BLUR EFFECT
// ====================================
const projectImages = document.querySelectorAll('.project-image-placeholder img, .about-image img');

projectImages.forEach(img => {
    img.style.filter = 'blur(10px)';
    img.style.transition = 'filter 0.5s ease';
    
    if (img.complete) {
        img.style.filter = 'blur(0)';
    } else {
        img.addEventListener('load', () => {
            img.style.filter = 'blur(0)';
        });
    }
});

// ====================================
// TYPING EFFECT FOR NAME
// ====================================
const nameText = "MURUGAN ANAND";
const nameEl = document.querySelector(".full-name");

if (nameEl) {
    let i = 0;
    const originalText = nameEl.textContent;
    nameEl.textContent = "";
    nameEl.style.opacity = '1';
    
    function typeName() {
        if (i < nameText.length) {
            nameEl.textContent += nameText.charAt(i);
            i++;
            setTimeout(typeName, 90);
        }
    }
    
    setTimeout(typeName, 800);
}

// ====================================
// CONSOLE MESSAGE
// ====================================
console.log('%c🚀 Ultra Pro Max Animations Active!', 'color: #00bcd4; font-size: 16px; font-weight: bold;');
console.log('%c✨ Portfolio by Murugan Anand', 'color: #00bcd4; font-size: 14px;');