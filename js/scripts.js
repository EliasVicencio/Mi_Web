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
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
        contactForm.reset();
    });
}

// ========== CARRUSEL DE PROYECTOS ==========
class ProjectsCarousel {
    constructor() {
        this.track = document.getElementById('projectsTrack');
        this.cards = document.querySelectorAll('.project-card');
        this.indicators = document.querySelectorAll('.indicator');
        this.currentIndex = 0;
        this.autoplayInterval = null;
        this.isTransitioning = false;
        
        // Si no hay track o cards, salir
        if (!this.track || this.cards.length === 0) return;
        
        this.updateVisibleCount();
        this.init();
    }
    
    init() {
        this.startAutoplay();
        
        // Pausar autoplay al hacer hover sobre el track
        this.track.addEventListener('mouseenter', () => this.stopAutoplay());
        this.track.addEventListener('mouseleave', () => this.startAutoplay());
        
        // Actualizar al redimensionar la ventana
        window.addEventListener('resize', () => {
            this.updateVisibleCount();
            this.updateCarousel();
        });
        
        // Prevenir clicks múltiples durante la transición
        this.track.addEventListener('transitionstart', () => {
            this.isTransitioning = true;
        });
        
        this.track.addEventListener('transitionend', () => {
            this.isTransitioning = false;
        });
    }
    
    updateVisibleCount() {
        if (window.innerWidth <= 768) {
            this.visibleCards = 1;
        } else if (window.innerWidth <= 992) {
            this.visibleCards = 2;
        } else {
            this.visibleCards = 3;
        }
        
        this.maxIndex = Math.max(0, this.cards.length - this.visibleCards);
        this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
    }
    
    moveSlide(direction) {
        if (this.isTransitioning) return;
        
        const newIndex = this.currentIndex + direction;
        
        if (newIndex < 0) {
            this.currentIndex = this.maxIndex;
        } else if (newIndex > this.maxIndex) {
            this.currentIndex = 0;
        } else {
            this.currentIndex = newIndex;
        }
        
        this.updateCarousel();
    }
    
    goToSlide(index) {
        if (this.isTransitioning) return;
        if (index < 0 || index > this.maxIndex) return;
        
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    updateCarousel() {
        if (!this.track || this.cards.length === 0) return;
        
        // Calcular el desplazamiento
        const card = this.cards[0];
        const cardWidth = card.offsetWidth;
        const gap = 30; // Mismo valor que en CSS
        const translateX = -this.currentIndex * (cardWidth + gap);
        
        this.track.style.transform = `translateX(${translateX}px)`;
        
        // Actualizar indicadores
        this.indicators.forEach((indicator, i) => {
            if (i === this.currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    startAutoplay() {
        if (this.autoplayInterval) return;
        
        this.autoplayInterval = setInterval(() => {
            this.moveSlide(1);
        }, 5000);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// Variables globales
let projectsCarousel = null;

// Funciones globales para los botones
function moveSlide(direction) {
    if (projectsCarousel) {
        projectsCarousel.moveSlide(direction);
    }
}

function goToSlide(index) {
    if (projectsCarousel) {
        projectsCarousel.goToSlide(index);
    }
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar carrusel si existe la sección
    if (document.getElementById('projectsTrack')) {
        projectsCarousel = new ProjectsCarousel();
    }
    
    // Inicializar observer para animaciones
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
});