// Icono de modo oscuro
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    }
});

// Efecto de la barra de navegación
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    } else {
    navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
    
    // Update active link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    this.classList.add('active');
    });
});

// Form submission
const contactForm = document.querySelector('form[name="contacto"]');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate form submission
    alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
    contactForm.reset();
});

// Animación en scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('fadeInUp');
    }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});