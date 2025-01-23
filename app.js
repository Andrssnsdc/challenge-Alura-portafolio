// Selección de elementos del DO

document.addEventListener('DOMContentLoaded', () => {
    const themeToggles = document.querySelectorAll('.theme-toggle, .theme-toggle-bug');
    const root = document.documentElement;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (themeToggles.length === 0) {
        console.error('No theme toggle buttons found.');
        return;
    }

    // Función para actualizar los estados visuales de todos los botones
    function syncThemeIcons(theme) {
        themeToggles.forEach(toggle => {
            if (theme === 'dark') {
                toggle.classList.add('dark');
                toggle.classList.remove('light');
            } else {
                toggle.classList.add('light');
                toggle.classList.remove('dark');
            }
        });
    }

    // Función para establecer el tema
    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        syncThemeIcons(theme);
    }

    // Función para alternar el tema
    function toggleTheme() {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    // Establecer el tema inicial
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        const theme = savedTheme || (prefersDarkScheme.matches ? 'dark' : 'light');
        setTheme(theme);
    }

    // Agregar event listeners a todos los toggles
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });

    // Inicializar el tema al cargar la página
    initializeTheme();
});


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
const phrases = ['Desarrollador Frontend','Diseñador UX/UI' ];
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



const initScrollProgress = () => {
    const progressBar = document.getElementById('scroll-progress');
    const progressText = document.getElementById('scroll-progress-text');

    // Obtener el valor de la variable CSS usando getComputedStyle
    const rootStyles = getComputedStyle(document.documentElement);
    const colorText = rootStyles.getPropertyValue('--color-background').trim();  // Se obtiene el valor de la variable de color

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollTop / docHeight) * 100;

        // Actualizar el ancho de la barra de progreso
        progressBar.style.width = `${scrollPercentage}%`;

        // Mostrar el texto a medida que avanza la barra de progreso
        if (scrollPercentage > 0) {
            progressText.style.color = colorText; // Usamos el valor de la variable CSS
            progressText.style.width = `${scrollPercentage}%`; // El texto se dibuja gradualmente conforme avanza la barra
        } else {
            progressText.style.color = "transparent"; // Inicialmente invisible
            progressText.style.width = "0%"; // Inicialmente no visible
        }
    });
};

// Inicializar al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
});



document.addEventListener('DOMContentLoaded', () => {
    const progressFill = document.querySelector('.progress-fill');
    const stages = document.querySelectorAll('.stage');
   
    const timeDisplay = document.querySelector('.final-design .time');
    const buttonRepair= document.querySelector('.button-repair');
    let currentStage = 0;
  
    function updateTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      timeDisplay.textContent = `${hours}:${minutes}`;
    }
  
    function setTheme(theme) {
      setTimeout(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      }, 100); // Agrega una demora de 100ms antes de aplicar el tema
    }
  
   
    
    function updateStage(stage) {
        stages.forEach((s, index) => {
            if (index === stage) {
                // Primero removemos las clases para reiniciar la animación
                s.classList.remove('active');
                // Forzamos un reflow
                void s.offsetWidth;
                // Agregamos la clase para iniciar la animación
                s.classList.add('active');
            } else {
                s.classList.remove('active');
                s.style.opacity = '0';
            }
        });
        
        progressFill.style.width = `${(stage + 1) * 14.2857}%`;
    }
  
    function progressStages() {
        // Reiniciamos el estado
        stages.forEach(s => {
            s.style.opacity = '0';
            s.classList.remove('active');
        });
        progressFill.style.width = '0';
        currentStage = 0;

        // Secuencia de animaciones con delays
        
        setTimeout(() => updateStage(1), 400);
        setTimeout(() => updateStage(2), 5000);
        setTimeout(() => updateStage(3), 8000);
        setTimeout(() => updateStage(4), 12000);
        setTimeout(() => updateStage(5), 15000);
        setTimeout(() => updateStage(6), 19000);
    }
  
   
  
    // Update time every minute
    updateTime();
    setInterval(updateTime, 10000);   
  
   
    
  
    
    buttonRepair?.addEventListener('click', progressStages);

    updateStage(0)

    progressFill.style.width = '0%';
    
  
});
  

    const codeBlock = document.querySelector(".code");
const editorContent = document.querySelector(".editor-content");
const styles = `
.final-desing .main-circle {
        width: 40rem;
        height: 40rem;
        border-radius: 100%;
        background: linear-gradient(40deg, #ff0080, #ff8c00 70%);
        position: absolute;
        z-index: 1;
        left: 50%;
        -webkit-transform: translate(-50%, -70%);
        -ms-transform: translate(-50%, -70%);
        transform: translate(-50%, -70%);
      }
      
      /* Phone */
      .final-desing .phone {
        position: relative;
        z-index: 2;
        width: 18rem;
        height: 17rem;
        background-color: inherit;
        transition: background-color 0.6s;
        -webkit-box-shadow: 0 4px 35px rgba(0, 0, 0, 0.1);
        box-shadow: 0 4px 35px rgba(0, 0, 0, 0.1);
        border-radius: 40px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
      }
      
      /* Top */
      .final-desing .menu {
        /*   background-color: blue; */
        font-size: 80%;
        opacity: 0.4;
        padding: 0.8rem 1.8rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }
      
      .final-desing .icons {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        margin-top: 0.5rem;
      }
      
      .final-desing .battery {
        width: 0.85rem;
        height: 0.45rem;
        background-color: black;
      }
      
      .final-desing .network {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 6.8px 7.2px 6.8px;
        border-color: transparent transparent black transparent;
        -webkit-transform: rotate(135deg);
        -ms-transform: rotate(135deg);
        transform: rotate(135deg);
        margin: 0.12rem 0.5rem;
      }
      
      /* Middle */
      .content {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        margin: auto;
        text-align: center;
        width: 70%;
        -webkit-transform: translateY(5%);
        -ms-transform: translateY(5%);
        transform: translateY(5%);
      }
      
       .circle {
        position: relative;
        border-radius: 100%;
        width: 8rem;
        height: 8rem;
        background: linear-gradient(
          40deg,
          #ff0080,
          #ff8c00,
          #e8e8e8,
          #8983f7,
          #a3dafb 80%
        );
        background-size: 400%;
        transition: background-position 0.6s;
        margin: auto;
      }
      
      .crescent {
        position: absolute;
        border-radius: 100%;
        right: 0;
        width: 6rem;
        height: 6rem;
        background: #e8e8e8;
        -webkit-transform: scale(0);
        -ms-transform: scale(0);
        transform: scale(0);
        -webkit-transform-origin: top right;
        -ms-transform-origin: top right;
        transform-origin: top right;
        -webkit-transition:
          -webkit-transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1),
          background-color 0.6s;
        transition:
          -webkit-transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1),
          background-color 0.6s;
        transition:
          transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1),
          background-color 0.6s;
        transition:
          transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1),
          -webkit-transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1),
          background-color 0.6s;
      }
      
      label,
      .toggle {
        height: 2.8rem;
        border-radius: 100px;
      }
      
      label {
        width: 100%;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 100px;
        position: relative;
        margin: 1.8rem 0 4rem 0;
        cursor: pointer;
      }
      
      .toggle {
        position: absolute;
        width: 50%;
        background-color: #fff;
        -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
        -webkit-transition: -webkit-transform 0.3s
          cubic-bezier(0.25, 0.46, 0.45, 0.94);
        transition: -webkit-transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        transition:
          transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
          -webkit-transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      
      .names {
        font-size: 90%;
        font-weight: bolder;
        color: black;
        width: 65%;
        margin-left: 17.5%;
        margin-top: 6.5%;
        position: absolute;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      .dark {
        opacity: 0.5;
      }
      
      .mark {
        border-radius: 100px;
        background-color: black;
      }
      
      .time {
        color: black;
      }
      /* -------- Switch Styles ------------*/
      [type="checkbox"] {
        display: none;
      }
      /* Toggle */
      [type="checkbox"]:checked + .app .toggle {
        -webkit-transform: translateX(100%);
        -ms-transform: translateX(100%);
        transform: translateX(100%);
        background-color: #34323d;
      }
      
      [type="checkbox"]:checked + .app .dark {
        opacity: 1;
        color: white;
      }
      
      [type="checkbox"]:checked + .app .light {
        opacity: 1;
        color: white;
      }
      /* App */
      [type="checkbox"]:checked + .app .phone {
        background-color: #26242e;
        color: white;
      }
      /* Circle */
      [type="checkbox"]:checked + .app .crescent {
        -webkit-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
        background: #26242e;
      }
      
      [type="checkbox"]:checked + .app .circle {
        background-position: 100% 100%;
      }
      
      [type="checkbox"]:checked + .app .main-circle {
        background: linear-gradient(40deg, #8983f7, #a3dafb 70%);
      }
      
      [type="checkbox"]:checked + .time {
        color: white;
      }
      
      [type="checkbox"]:checked + .app .body .phone .menu .time {
        color: white;
      }
      
      [type="checkbox"]:checked + .app .body .phone .menu .icons .network {
        border-color: transparent transparent white transparent;
      }
      
      [type="checkbox"]:checked + .app .body .phone .menu .icons .battery {
        background-color: white;
      }
      
      [type="checkbox"]:checked + .app .body {
        border-radius: 40px;
      }
      
      
`;



let index = 0;
function typeCode() {
    const totalWords = styles.split(' ').length; // Contar las palabras
    const maxTime = 16000; // 15 segundos en milisegundos
    const interval = maxTime / totalWords; // Intervalo entre palabras
    const wordsToWrite = 1; // Número de palabras a escribir en cada intervalo
    let currentIndex = 0;
    const buttonRepair= document.querySelector('.button-repair');
  
    function writeWords() {
      if (currentIndex < totalWords) {
        const nextWords = styles.split(' ').slice(currentIndex, currentIndex + wordsToWrite).join(' ');
        codeBlock.textContent += nextWords + ' '; // Agregar las siguientes 5 palabras
        currentIndex += wordsToWrite;
  
        // Mantener el scroll en la parte inferior
        editorContent.scrollTop = editorContent.scrollHeight;
  
        if (currentIndex < totalWords) {
          setTimeout(writeWords, interval); // Llamar de nuevo para agregar más palabras
        }
      }
    }
  
    buttonRepair?.addEventListener('click',writeWords); // Iniciar la escritura de palabras
  }

// Inicia la escritura cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  typeCode();
});
