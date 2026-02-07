
function loadComponent(componentPath, targetSelector) {
    fetch(componentPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${componentPath}: ${response.status}`);
            }

            return response.text();
        })
        .then(html => {
            // Determine page depth to fix relative paths in loaded component
            const pathDepth = window.location.pathname.split('/').filter(p => p && p !== 'student-accommodation').length;
            const basePrefix = pathDepth > 1 ? '../'.repeat(pathDepth - 1) : '';

            // Replace relative ../ links in the component HTML so they work from any page
            html = html.replace(/href="\.\.\/(?!\.\.)/g, `href="${basePrefix}`);

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


document.addEventListener('DOMContentLoaded', function () {
    // Determine the correct component path based on current page location
    const pathParts = window.location.pathname.split('/');
    const isRootPage = window.location.pathname.endsWith('index.html') ||
        window.location.pathname.endsWith('student-accommodation/');
    const componentPath = isRootPage ? './components/' : '../components/';

    // header
    if (!document.querySelector('#header-placeholder')) {
        const headerPlaceholder = document.createElement('div');
        headerPlaceholder.id = 'header-placeholder';
        document.body.appendChild(headerPlaceholder);
    }
    loadComponent(componentPath + 'header.html', '#header-placeholder');

    // footer
    if (!document.querySelector('#footer-placeholder')) {
        const footerPlaceholder = document.createElement('div');
        footerPlaceholder.id = 'footer-placeholder';
        document.body.appendChild(footerPlaceholder);
    }
    loadComponent(componentPath + 'footer.html', '#footer-placeholder');

    // WhatsApp button
    if (!document.querySelector('#whatsapp-placeholder')) {
        const whatsappPlaceholder = document.createElement('div');
        whatsappPlaceholder.id = 'whatsapp-placeholder';
        document.body.appendChild(whatsappPlaceholder);
    }
    loadComponent(componentPath + 'whatsapp-button.html', '#whatsapp-placeholder');

});

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// saved theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            document.getElementById('navLinks').classList.remove('active');
        }
    });

});
