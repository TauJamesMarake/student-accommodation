/*
 * This script dynamically loads footer and WhatsApp components into all pages
 */

function loadComponent(componentPath, targetSelector) {
    fetch(componentPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${componentPath}: ${response.status}`);
            }

            return response.text();
        })
        .then(html => {
            const target = document.querySelector(targetSelector);
            if (target) {
                target.innerHTML = html;

                // Execute any scripts in the loaded component
                const scripts = target.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    newScript.textContent = script.textContent;
                    document.body.appendChild(newScript);
                });
            }

        })
        .catch(error => {
            console.error('Error loading component:', error);
        });
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Load footer component
    // Create footer placeholder if it doesn't exist
    if (!document.querySelector('#footer-placeholder')) {
        const footerPlaceholder = document.createElement('div');
        footerPlaceholder.id = 'footer-placeholder';


        document.body.appendChild(footerPlaceholder);
    }
    loadComponent('/components/footer.html', '#footer-placeholder');

    // Load WhatsApp button component
    // Create WhatsApp placeholder if it doesn't exist
    if (!document.querySelector('#whatsapp-placeholder')) {
        const whatsappPlaceholder = document.createElement('div');
        whatsappPlaceholder.id = 'whatsapp-placeholder';
        document.body.appendChild(whatsappPlaceholder);
    }
    loadComponent('/components/whatsapp-button.html', '#whatsapp-placeholder');

});

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';

    document.body.setAttribute('data-theme', savedTheme);
});

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';

    document.body.setAttribute('data-theme', savedTheme);
});

/**
 * Alternative Method: Using innerHTML (simpler but less robust)
 * 
 * Add these placeholders to your HTML:
 * <div id="footer-placeholder"></div>
 * <div id="whatsapp-placeholder"></div>
 * 
 * Then use this script to load components
 */
