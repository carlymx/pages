// Array de frameworks para iterar sobre ellos
const frameworks = [
    'bootstrap', 'bulma', 'foundation', 'semantic', 'materialize', 
    'tailwind', 'unocss', 'daisyui', 'flowbite', 'ionic'
];

// Elementos del DOM
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Estado del tema
let isDarkTheme = false;

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    // Aplicar el framework por defecto a todas las tarjetas
    applyDefaultFrameworks();
    
    // Añadir event listeners a los iconos de frameworks
    addFrameworkIconListeners();
    
    // Añadir event listeners a los botones de cambio de tema por tarjeta
    addCardThemeToggleListeners();
    
    // Añadir event listener al botón de cambio de tema global
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleGlobalTheme);
    }
    
    // Añadir event listeners a los botones internos de las tarjetas
    addInternalButtonListeners();
});

// Aplicar el framework por defecto a todas las tarjetas
function applyDefaultFrameworks() {
    const cards = document.querySelectorAll('.example-card');
    
    cards.forEach((card, index) => {
        // Aplicar el framework correspondiente según el índice
        const framework = frameworks[index % frameworks.length];
        applyFrameworkToCard(card, framework);
    });
}

// Añadir event listeners a los iconos de frameworks
function addFrameworkIconListeners() {
    const frameworkIcons = document.querySelectorAll('.framework-icon');
    
    frameworkIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevenir cualquier propagación no deseada
            const framework = this.getAttribute('data-framework');
            const card = this.closest('.example-card');
            
            // Remover clases activas de todos los iconos de esta tarjeta
            const allIcons = card.querySelectorAll('.framework-icon');
            allIcons.forEach(i => i.classList.remove('active'));
            
            // Añadir clase activa al icono seleccionado
            this.classList.add('active');
            
            // Aplicar el framework a la tarjeta
            applyFrameworkToCard(card, framework);
        });
    });
}

// Añadir event listeners a los botones de cambio de tema por tarjeta
function addCardThemeToggleListeners() {
    const cardThemeToggles = document.querySelectorAll('.theme-toggle-btn');
    
    cardThemeToggles.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevenir cualquier propagación no deseada
            const card = this.closest('.example-card');
            toggleCardTheme(card);
        });
    });
}

// Añadir event listeners a los botones internos de las tarjetas
function addInternalButtonListeners() {
    // Listener para el botón de modal
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-trigger')) {
            e.stopPropagation();
            alert('¡Este es un ejemplo de ' + 
                 e.target.closest('.example-card').classList
                 .toString().split(' ')
                 .find(cls => cls.startsWith('framework-'))
                 .replace('framework-', '') + 
                 ' modal!');
        }
    });
    
    // Listener para el botón de formulario
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('form-content') && e.target.tagName === 'BUTTON') {
            e.stopPropagation();
            alert('¡Formulario enviado con el framework actual!');
        }
    });
}

// Aplicar un framework específico a una tarjeta
function applyFrameworkToCard(card, framework) {
    // Remover todas las clases de framework anteriores
    frameworks.forEach(f => {
        card.classList.remove(`framework-${f}`);
    });
    
    // Añadir la clase del framework seleccionado
    card.classList.add(`framework-${framework}`);
    
    // Actualizar el contenido dinámico según el framework
    updateExampleContent(card, framework);
}

// Actualizar el contenido dinámico según el framework
function updateExampleContent(card, framework) {
    const exampleType = card.id;
    let contentElement;
    
    switch(exampleType) {
        case 'button-example':
            contentElement = card.querySelector('.button-container .btn-primary');
            if (contentElement) {
                contentElement.textContent = `${framework.charAt(0).toUpperCase() + framework.slice(1)} Button`;
            }
            break;
            
        case 'input-example':
            contentElement = card.querySelector('.input-container .input-field');
            if (contentElement) {
                contentElement.placeholder = `Input con ${framework.charAt(0).toUpperCase() + framework.slice(1)}`;
            }
            break;
            
        case 'card-example':
            contentElement = card.querySelector('.card-container .card-content h4');
            if (contentElement) {
                contentElement.textContent = `${framework.charAt(0).toUpperCase() + framework.slice(1)} Card`;
            }
            break;
            
        case 'alert-example':
            contentElement = card.querySelector('.alert-container .alert-content');
            if (contentElement) {
                contentElement.textContent = `Alerta usando ${framework.charAt(0).toUpperCase() + framework.slice(1)} estilos`;
            }
            break;
            
        case 'grid-example':
            // Actualizar contenido del grid
            const gridItems = card.querySelectorAll('.grid-item');
            gridItems.forEach((item, index) => {
                item.textContent = `Columna ${index + 1} (${framework.charAt(0).toUpperCase() + framework.slice(1)})`;
            });
            break;
            
        case 'form-example':
            // Actualizar placeholders y texto de botón
            const formInputs = card.querySelectorAll('.form-container .input-field');
            if (formInputs[0]) {
                formInputs[0].setAttribute('placeholder', `Nombre (${framework.charAt(0).toUpperCase() + framework.slice(1)})`);
            }
            if (formInputs[1]) {
                formInputs[1].setAttribute('placeholder', `Email (${framework.charAt(0).toUpperCase() + framework.slice(1)})`);
            }
            const formBtn = card.querySelector('.form-container .btn-primary');
            if (formBtn) {
                formBtn.textContent = `Enviar (${framework.charAt(0).toUpperCase() + framework.slice(1)})`;
            }
            break;
            
        case 'modal-example':
            // Actualizar contenido del modal
            const modalBtn = card.querySelector('.modal-container .btn-primary.modal-trigger');
            if (modalBtn) {
                modalBtn.textContent = `Abrir ${framework.charAt(0).toUpperCase() + framework.slice(1)} Modal`;
            }
            break;
            
        case 'navigation-example':
            // Actualizar enlaces de navegación
            const navLinks = card.querySelectorAll('.nav-link');
            if (navLinks[0]) {
                navLinks[0].textContent = `Inicio (${framework.charAt(0).toUpperCase() + framework.slice(1)})`;
            }
            if (navLinks[1]) {
                navLinks[1].textContent = `Acerca (${framework.charAt(0).toUpperCase() + framework.slice(1)})`;
            }
            if (navLinks[2]) {
                navLinks[2].textContent = `Contacto (${framework.charAt(0).toUpperCase() + framework.slice(1)})`;
            }
            break;
            
        case 'badge-example':
            // Actualizar badge
            const badge = card.querySelector('.badge-content');
            if (badge) {
                badge.textContent = `Badge ${framework.charAt(0).toUpperCase() + framework.slice(1)}`;
            }
            break;
            
        case 'progress-example':
            // Actualizar barra de progreso si es necesario
            // No hay texto específico en la barra de progreso, pero los estilos cambiarán
            break;
    }
}

// Alternar tema global
function toggleGlobalTheme() {
    isDarkTheme = !isDarkTheme;
    
    if (isDarkTheme) {
        body.classList.add('dark-theme');
        themeToggleBtn.textContent = 'Cambiar a tema claro';
    } else {
        body.classList.remove('dark-theme');
        themeToggleBtn.textContent = 'Cambiar a tema oscuro';
    }
}

// Alternar tema para una tarjeta específica
function toggleCardTheme(card) {
    // El tema individual de tarjetas se gestionará a través de la clase dark-theme
    card.classList.toggle('dark-theme');
    
    // Encontrar el botón de cambio de tema en esta tarjeta
    const themeBtn = card.querySelector('.theme-toggle-btn');
    
    if (card.classList.contains('dark-theme')) {
        themeBtn.textContent = 'Tema claro';
    } else {
        themeBtn.textContent = 'Tema oscuro';
    }
}