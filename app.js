// Selección de elementos del DOM
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Función para establecer el tema
function setTheme(theme) {
    // Aplicar el tema con una transición suave
    const root = document.documentElement;
    const previousTheme = root.getAttribute('data-theme');
    
    if (previousTheme) {
        // Agregar clase para la transición
        root.classList.add('theme-transitioning');
    }
    
    // Establecer el nuevo tema
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Actualizar el ícono del toggle
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    
    if (theme === 'dark') {
        sunIcon?.classList.add('hidden');
        moonIcon?.classList.remove('hidden');
    } else {
        sunIcon?.classList.remove('hidden');
        moonIcon?.classList.add('hidden');
    }
    
    // Remover la clase de transición después de que termine
    if (previousTheme) {
        setTimeout(() => {
            root.classList.remove('theme-transitioning');
        }, 300); // Debe coincidir con la duración de la transición en CSS
    }
}

// Función para alternar el tema
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Inicializar el tema
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Usar la preferencia del sistema
        const theme = prefersDarkScheme.matches ? 'dark' : 'light';
        setTheme(theme);
    }
}

// Event listeners
themeToggle.addEventListener('click', toggleTheme);
prefersDarkScheme.addEventListener('change', (e) => {
    const theme = e.matches ? 'dark' : 'light';
    setTheme(theme);
});

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', initializeTheme);

let lastScrollY = window.scrollY; // Posición inicial del scroll

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
    // Si el usuario hace scroll hacia abajo, oculta la navbar
    navbar.classList.add('hidden');
  } else {
    // Si el usuario hace scroll hacia arriba, muestra la navbar
    navbar.classList.remove('hidden');
  }

  lastScrollY = currentScrollY; // Actualiza la posición del scroll
});

// Smooth Scroll para los enlaces de navegación
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto de escritura para el typewriter
const typewriterElement = document.querySelector('.typed-text');
const phrases = ['Diseñador UX/UI', 'Desarrollador Frontend'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeWriter, 2000); // Espera antes de empezar a borrar
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeWriter, 500); // Espera antes de empezar la siguiente frase
    } else {
        setTimeout(typeWriter, isDeleting ? 50 : 100);
    }
}

typeWriter(); // Iniciar el efecto de escritura

// Animación de los iconos de tecnología
const techItems = document.querySelectorAll('.tech-item');

function animateTechItems() {
    techItems.forEach((item, index) => {
        item.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;
    });
}

animateTechItems();

// Contador para las estadísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

const statCards = document.querySelectorAll('.stat-card');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.value);
            animateCounter(entry.target.querySelector('.stat-number'), target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

statCards.forEach(card => observer.observe(card));

// Efecto hover en las tarjetas de proyectos y hobbies
const projectCards = document.querySelectorAll('.project-card');
const hobbyCards = document.querySelectorAll('.hobby-card');

function addHoverEffect(cards) {
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

addHoverEffect(projectCards);
addHoverEffect(hobbyCards);

// Validación del formulario de contacto
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Recopilar datos del formulario
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validación
    let isValid = true;
    const errors = {};

    if (name === '') {
        isValid = false;
        errors.name = 'Por favor, ingrese su nombre.';
    }

    if (email === '') {
        isValid = false;
        errors.email = 'Por favor, ingrese su correo electrónico.';
    } else if (!isValidEmail(email)) {
        isValid = false;
        errors.email = 'Por favor, ingrese un correo electrónico válido.';
    }

    if (subject === '') {
        isValid = false;
        errors.subject = 'Por favor, ingrese un asunto.';
    }

    if (message === '') {
        isValid = false;
        errors.message = 'Por favor, ingrese un mensaje.';
    }

    // Mostrar errores o enviar formulario
    if (!isValid) {
        showErrors(errors);
    } else {
        // Simulación de envío de formulario (reemplazar con lógica real de envío)
        showFeedback('Tu mensaje ha sido enviado con éxito. ¡Gracias por contactarme!', 'success');
        contactForm.reset();
        clearErrors();
    }
});

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showErrors(errors) {
    clearErrors();
    Object.keys(errors).forEach(field => {
        const errorElement = document.getElementById(`${field}-error`);
        if (errorElement) {
            errorElement.textContent = errors[field];
        }
    });
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

function showFeedback(message, type) {
    formFeedback.textContent = message;
    formFeedback.className = `feedback ${type}`;
    formFeedback.style.display = 'block';

    setTimeout(() => {
        formFeedback.style.display = 'none';
    }, 5000);
}



// Animación al hacer scroll
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Lazy loading para imágenes
const lazyImages = document.querySelectorAll('img[data-src]');

const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            lazyImageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    lazyImageObserver.observe(img);
});