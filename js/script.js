(function() {
    const startTime = performance.now();

    window.addEventListener('load', function() {
        const loadTime = performance.now() - startTime;
        
        const footer = document.querySelector('.footer');
        const loadTimeInfo = document.createElement('p');
        loadTimeInfo.textContent = `Время загрузки страницы: ${loadTime.toFixed(2)} мс`;
        footer.appendChild(loadTimeInfo);
    });
})();

(function() {
    const activeClass = 'active';
    const navItems = document.querySelectorAll('.nav__item a');
    
    navItems.forEach(item => {
        if (item.href === document.location.href) {
            item.classList.add(activeClass);
        }
    });
})();