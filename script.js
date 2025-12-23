document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SCROLL ANIMATION (Skills Bar Activation)
    const skillLevels = document.querySelectorAll('.skill-level');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.getAttribute('data-level');
                const widthValue = `${level}%`;

                // Set the width for the animation on the parent element
                // The actual filled bar is the ::after pseudo-element, but we use width on the parent for simplicity.
                // NOTE: We need to set the width property on the element itself, not its pseudo-element, for the JS-CSS transition to work smoothly.
                skillBar.style.width = '100px'; 
                
                // Set the width for the *filled* part (::after pseudo-element)
                // We use a custom property here, which must be handled in the CSS/JS interaction carefully.
                // A simpler, more reliable approach is to modify the CSS directly or use a helper class, but we will adjust the existing CSS based on data-level.
                
                // Here we calculate the percentage based on the 100px max width and update the ::after element's width
                skillBar.style.setProperty('--skill-fill-width', widthValue);
                
                // Since direct pseudo-element manipulation is hard, we adjust the parent width and use CSS for the visual fill:
                skillBar.style.width = level + 'px'; // Set parent width to show the fill (since max is 100px)
                
                // Stop observing once animated
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Initial observation of all skill bars
    skillLevels.forEach(skill => {
        // Reset width to 0 for initial state before observation
        skill.style.width = '0px'; 
        skillObserver.observe(skill);
    });

    // 2. ACTIVE NAV LINK HIGHLIGHTING
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar nav a');

    window.addEventListener('scroll', () => {
        let current = 'home'; // Default to home

        // Loop through sections to find which one is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const scrollThreshold = section.clientHeight * 0.3; // 30% offset from the top of the viewport
            
            if (pageYOffset >= sectionTop - scrollThreshold) {
                current = section.getAttribute('id');
            }
        });

        // Add 'active' class to the corresponding navigation link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SKILLS BAR ANIMATION (Activation on Scroll) ---
    const skillLevels = document.querySelectorAll('.skill-level');

    const skillObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the skill bar is visible
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.getAttribute('data-level');
                
                // Set the width for the animation based on data-level (max 100px)
                // This targets the CSS transition set up earlier.
                skillBar.style.width = level + 'px'; 
                
                // Optional: You can also use skillBar.style.width = level + '%'; if max width is set to 100%
                
                observer.unobserve(entry.target); 
            }
        });
    }, skillObserverOptions);

    // Initial observation of all skill bars
    skillLevels.forEach(skill => {
        // Reset width to 0 for initial state before observation
        skill.style.width = '0px'; 
        skillObserver.observe(skill);
    });

    // --- 2. FADE-IN EFFECT FOR PROJECTS & SKILL GROUPS (The Attractive Part) ---
    const elementsToAnimate = document.querySelectorAll('.project-item, .skill-group, .education-group, .ability-group, .hobbies-group');

    const animateObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'is-visible' class to trigger the CSS animation
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
        });


    }, animateObserverOptions);

    // Initial styling and observation for fade-in effect
    elementsToAnimate.forEach(el => {
        // Set initial opacity (in CSS) or apply an initial class here if necessary
        animateObserver.observe(el);
    });

    // --- 3. ACTIVE NAV LINK HIGHLIGHTING (from previous code) ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar nav a');

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
});







document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SET UP INTERSECTION OBSERVER FOR SCROLL REVEAL (FADE-IN EFFECT) ---
    const elementsToAnimate = document.querySelectorAll(
        '.hero-content, .about-content, .about-image, .grid-column, .project-card, .contact-item'
    );

    const animateObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'is-visible' class to trigger the CSS animation
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, animateObserverOptions);

    // Initial styling and observation for fade-in effect
    elementsToAnimate.forEach(el => {
        // Set initial state (opacity: 0, translateY: 20px) via CSS
        animateObserver.observe(el);
    });


    // --- 2. SKILLS BAR ANIMATION (Activation on Scroll) ---
    const skillLevels = document.querySelectorAll('.skill-level');

    const skillObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.getAttribute('data-level');
                const widthValue = `${level}px`;
                
                // STAGGERED EFFECT: Delay the animation slightly for each subsequent bar
                setTimeout(() => {
                    skillBar.style.width = widthValue;
                }, index * 100); // 100ms delay between each bar

                observer.unobserve(entry.target);
            }
        });
    }, skillObserverOptions);

    // Initial observation of all skill bars
    skillLevels.forEach(skill => {
        // Reset width to 0 for initial state before observation
        skill.style.width = '0px'; 
        skillObserver.observe(skill);
    });

    // --- 3. ACTIVE NAV LINK HIGHLIGHTING ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar nav a');

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
});


const nameText = "MURUGAN ANAND";
const nameEl = document.querySelector(".full-name");

let i = 0;
nameEl.textContent = "";

function typeName() {
  if (i < nameText.length) {
    nameEl.textContent += nameText.charAt(i);
    i++;
    setTimeout(typeName, 90);
  }
}

window.addEventListener("load", typeName);


window.addEventListener("load", () => {
  const bg = document.querySelector(".background-overlay");

  if (bg) {
    // thoda delay for luxury feel
    setTimeout(() => {
      bg.style.opacity = "1";
    }, 200);
  }
});


