document.addEventListener('DOMContentLoaded', () => {
    const activeSession = JSON.parse(localStorage.getItem('BakeBox_Session'))

    if (!activeSession || !activeSession.isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    const userGreeting = document.getElementById('userGreeting');
    if (userGreeting) userGreeting.innerHTML = `Welcome back, <span class="text-thirdPalette italic">${activeSession.name}</span>!`;

    initDashboardSystem();
    setupLogoutController();
    updateCartCountBadge();
});

async function initDashboardSystem() {
    const featuredGrid = document.getElementById('featuredGrid');
    const searchInput = document.getElementById('dashboardSearch');
    const dropdown = document.getElementById('searchResultsDropdown');

    try {
        const response = await fetch('products.json');
        if (!response.ok) throw new Error('Data transmission error.');
        const products = await response.json();

        const featuredCakes = products.filter(p => p.category === 'cakes').slice(0, 2);
        const featuredMuffins = products.filter(p => p.category === 'muffins').slice(0, 2);
        const featuredPastries = products.filter(p => p.category === 'pastries').slice(0, 2);
        
        const combinedFeatures = [...featuredCakes, ...featuredMuffins, ...featuredPastries];
        renderFeaturedMenu(combinedFeatures, featuredGrid);

        setupLiveSearch(products, searchInput, dropdown);

    } catch (error) {
        console.error('Error establishing dashboard dependencies:', error);
        if (featuredGrid) featuredGrid.innerHTML = `<p class="text-red-500 col-span-full text-center">Failed to fetch daily features menu loop.</p>`;
    }
}