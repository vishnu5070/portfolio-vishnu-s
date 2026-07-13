document.addEventListener('DOMContentLoaded', () => {

    // =============== HAMBURGER MENU & NAVBAR ===============
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
            }
        });
    });

    // =============== HEADER SHADOW ON SCROLL ===============
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // =============== TYPING EFFECT ===============
    const roleTextElement = document.getElementById('role-text');
    const roles = ['Graphic Designer', 'Full Stack Developer', 'AI Student'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            roleTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            roleTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before starting new word
        }

        setTimeout(type, typeSpeed);
    }

    if(roleTextElement) {
        type();
    }


    // =============== SCROLL REVEAL ANIMATION ===============
    const sectionsToReveal = document.querySelectorAll('section');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after it's visible
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });

    sectionsToReveal.forEach(section => {
        section.classList.add('reveal'); // Add reveal class to all sections
        revealObserver.observe(section);
    });

    // =============== ACTIVE NAV LINK ON SCROLL ===============
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a');

    function updateActiveNavLink() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - header.offsetHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call
});
