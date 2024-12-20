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
    const currentUrl = document.location.href;

    navItems.forEach(item => {
        const itemUrl = item.href;

        const isExactMatch = itemUrl === currentUrl;
        const isHomePage = (currentUrl.endsWith('/') || currentUrl.endsWith('/index.html')) && 
                            (itemUrl.endsWith('/') || itemUrl.endsWith('/index.html'));

        if (isExactMatch || isHomePage) {
            item.classList.add(activeClass);
        }
    });
})();
