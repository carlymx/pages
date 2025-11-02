// Effects WebARENA - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Cambiar Tema';
    } else {
        body.classList.remove('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i> Cambiar Tema';
    }
    
    // Toggle theme function - only affects main page background, not cards
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        const isDarkTheme = body.classList.contains('dark-theme');
        
        // Save theme preference to localStorage
        if (isDarkTheme) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Cambiar Tema';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Cambiar Tema';
        }
    });
    
    // Framework toggle functionality
    const frameworkIcons = document.querySelectorAll('.framework-icon');
    
    frameworkIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            
            const framework = this.getAttribute('data-framework');
            const card = this.closest('.card');
            const allIconsInCard = card.querySelectorAll('.framework-icon');
            
            // Remove active class from all icons in this card
            allIconsInCard.forEach(i => i.classList.remove('active'));
            
            // Remove framework classes from the card
            card.classList.remove('framework-default', 'framework-animate', 'framework-tailwind', 'framework-bootstrap');
            
            // Add active class to clicked icon
            this.classList.add('active');
            
            // Add framework class to the card
            card.classList.add(`framework-${framework}`);
            
            // Trigger reflow to restart CSS animations
            const effectElement = card.querySelector('.effect-btn, .effect-box, .text-effect, .attention-element, .transform-element, .shadow-element, .gradient-element, .glass-element, .loading-spinner, .animated-element');
            if (effectElement) {
                // Force reflow to restart animations
                void effectElement.offsetWidth;
            }
        });
    });
    
    // Initialize framework classes from localStorage if they exist
    document.querySelectorAll('.card').forEach(card => {
        const activeIcon = card.querySelector('.framework-icon.active');
        if (activeIcon) {
            const framework = activeIcon.getAttribute('data-framework');
            card.classList.add(`framework-${framework}`);
        }
    });
    
    // Individual card theme toggle functionality
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            
            const card = this.closest('.card');
            
            // Toggle dark theme class on the card
            card.classList.toggle('dark-theme');
            
            // Save individual card theme preference
            const cardId = card.getAttribute('id');
            const isCardDark = card.classList.contains('dark-theme');
            localStorage.setItem(`card-theme-${cardId}`, isCardDark ? 'dark' : 'light');
        });
    });
    
    // Initialize individual card themes from localStorage if they exist
    document.querySelectorAll('.card').forEach(card => {
        const cardId = card.getAttribute('id');
        const savedCardTheme = localStorage.getItem(`card-theme-${cardId}`);
        if (savedCardTheme === 'dark') {
            card.classList.add('dark-theme');
        }
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = 'auto';
        });
    });
    
    // Add hover effects to elements to trigger animations
    const hoverElements = document.querySelectorAll('.hover-button, .transition-box, .transform-element, .shadow-element, .attention-element');
    hoverElements.forEach(element => {
        // Add event listeners that work with different frameworks
        element.addEventListener('mouseenter', function() {
            // Trigger effects are handled by CSS
        });
        
        element.addEventListener('mouseleave', function() {
            // Trigger effects are handled by CSS
        });
    });
});