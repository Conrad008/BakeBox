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

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');

    if(mobileMenuBtn && mobileMenuDrawer){
        mobileMenuBtn.addEventListener('click', () => {

            mobileMenuDrawer.classList.toggle('hidden');

            console.log('Menu toggled! Current classes:', mobileMenuDrawer.className);
        });
    } else{
        console.warn('menu links not found');
    }
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

function renderFeaturedMenu(items, gridElement){
    if(!gridElement) return;

    gridElement.innerHTML = '';

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = "bg-white border border-stone-200/60 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition duration-200 animate-fadeIn";
        card.innerHTML = `
            <div>
                <div class="h-44 w-full relative overflow-hidden bg-stone-50">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                    <span class="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">${item.rating}</span>
                </div>
                <div class="p-4">
                    <span class="text-[10px] font-bold tracking-widest text-amber-600 uppercase">${item.category}</span>
                    <h3 class="font-bold text-stone-800 text-base mt-0.5 leading-tight">${item.name}</h3>
                </div>
            </div>
            <div class="p-4 pt-0 flex items-center justify-between">
                <span class="font-black text-stone-900">KSH ${item.price.toFixed(2)}</span>
                <button onclick="handleDashboardAddToCart('${item.id}', this)" class="bg-thirdPalette hover:bg-amber-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
                    Add to Cart
                </button>
            </div>
        `;
        gridElement.appendChild(card);
    });
}

function setupLiveSearch(allProducts, searchInput, dropdown) {
    if (!searchInput || !dropdown) return;

    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.trim().toLowerCase();
        
        if (keyword === '') {
            dropdown.classList.add('hidden');
            return;
        }

        const matches = allProducts.filter(p => 
            p.name.toLowerCase().includes(keyword) || 
            p.category.toLowerCase().includes(keyword)
        );

        if (matches.length === 0) {
            dropdown.innerHTML = `<div class="p-4 text-xs text-stone-400 font-medium italic text-center">No matching pastries baking today...</div>`;
        } else {
            dropdown.innerHTML = '';
            matches.forEach(match => {
                const matchRow = document.createElement('div');
                matchRow.className = "p-3 border-b border-stone-50 hover:bg-amber-50/50 cursor-pointer flex items-center justify-between text-sm transition-colors";
                matchRow.innerHTML = `
                    <div class="flex items-center gap-3">
                        <img src="${match.image}" class="w-8 h-8 rounded object-cover bg-stone-100">
                        <div>
                            <p class="font-semibold text-stone-800 leading-tight">${match.name}</p>
                            <p class="text-[10px] font-bold text-amber-600 uppercase mt-0.5">${match.category}</p>
                        </div>
                    </div>
                    <span class="font-black text-stone-900 text-xs">KSH ${match.price.toFixed(2)}</span>
                `;
                
                matchRow.addEventListener('click', () => {
                    executeLocalCartPush(match);
                    searchInput.value = '';
                    dropdown.classList.add('hidden');
                    alert(`Added ${match.name} to basket!`);
                    updateCartCountBadge();
                });

                dropdown.appendChild(matchRow);
            });
        }
        dropdown.classList.remove('hidden');
    });

    document.addEventListener('click', (event) => {
        if (!searchInput.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.add('hidden');
        }
    });
}

window.handleDashboardAddToCart = function(id, buttonEl) {
    fetch('products.json')
        .then(res => res.json())
        .then(products => {
            const targetedItem = products.find(p => p.id === id);
            if (targetedItem) {
                executeLocalCartPush(targetedItem);
                updateCartCountBadge();

                const oldTxt = buttonEl.textContent;
                buttonEl.textContent = 'Added';
                buttonEl.classList.replace('bg-thirdPalette', 'bg-emerald-600');
                
                setTimeout(() => {
                    buttonEl.textContent = oldTxt;
                    buttonEl.classList.replace('bg-emerald-600', 'bg-thirdPalette');
                }, 1000);
            }
        });
};

function executeLocalCartPush(product) {
    const cart = JSON.parse(localStorage.getItem('BakeBox_Cart')) || [];
    const matchedIdx = cart.find(item => item.id === product.id);

    if (matchedIdx) matchedIdx.quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    localStorage.setItem('BakeBox_Cart', JSON.stringify(cart));
}

function updateCartCountBadge() {
    const cart = JSON.parse(localStorage.getItem('BakeBox_Cart')) || [];
    const badge = document.getElementById('cartCountBadge');
    if (!badge) return;

    const tally = cart.reduce((sum, current) => sum + current.quantity, 0);
    if (tally > 0) {
        badge.textContent = tally;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

function setupLogoutController() {
    const btn = document.getElementById('logoutBtn');
    if (btn) {
        btn.addEventListener('click', () => {
            localStorage.removeItem('BakeBox_Session');
            window.location.href = 'index.html';
        });
    }
}