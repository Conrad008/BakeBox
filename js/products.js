document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('productsGrid');
    
    
    fetchProducts(productsGrid);
    updateCartBadge();
});


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


async function fetchProducts(gridElement){
    if (!gridElement) return;

    try {
        const response = await fetch('products.json');
        if (!response.ok) throw new Error('Failed to retrieve inventory data.');
        
        const products = await response.json();
        renderProducts(products, gridElement);
    } catch (error){
        console.error('Error loading BakeBox inventory:', error);
        gridElement.innerHTML = `<p class="text-red-500 text-center col-span-full">Unable to load pastries right now. Please try refreshing.</p>`;
    }
}

function renderProducts (products, gridElement){
    gridElement.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');

        card.className = "bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden flex flex-col justify-between transition transform hover:-translate-y-1 hover:shadow-md duration-300 animate-fadeIn";

        card.innerHTML = `
        <div>

        <div class="h-48 w-full overflow-hidden bg-stone-100 relative">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/400x300?text=Fresh+Bake'">
                    <span class="absolute top-2 right-2 bg-amber-500/90 text-white text-xs font-semibold px-2 py-1 rounded">
                        ${product.rating}/10
                    </span>
                </div>

                <div class="p-4">
                    <span class="text-xs font-bold uppercase tracking-wider text-amber-600">${product.category}</span>
                    <h3 class="text-lg font-bold text-stone-800 mt-1">${product.name}</h3>
                </div>

        </div>
        <div class = "p-4 pt-0 flex items-center justify-between mt-4">
            <span class="text-xl font-black text-stone-900">KSH${product.price.toFixed(2)}
            </span>
            <button data-id="${product.id}" class="add-to-cart-btn bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition dynamic-colors">
             Add to Cart
            </button>
        </div>
        `;

        gridElement.appendChild(card);
    });

    cartListeners(products);

}

function cartListeners(products){
    const buttons = document.querySelectorAll('.add-to-cart-btn');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            const targetProduct = products.find(p => p.id === productId);

            if(targetProduct){
                addToCart(targetProduct);

                button.textContent = 'Added!';
                button.classList.replace('bg-amber-600', 'bg-emerald-600');
                button.disabled = true;

                setTimeout(() => {
                    button.textContent = 'Add to cart';
                    button.classList.replace('bg-emerald-600', 'bg-amber-600');
                    button.disabled = false;
                },1000)
            }
        });
    });
}

function addToCart(product) {
    
    const cart = JSON.parse(localStorage.getItem('BakeBox_Cart')) || [];

   
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        
        cart.push({
            ...product,
            quantity: 1
        });
    }

    
    localStorage.setItem('BakeBox_Cart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('BakeBox_Cart')) || [];
    const badge = document.getElementById('cartCountBadge');
    
    if (!badge) return;

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.classList.remove('hidden'); 
    } else {
        badge.classList.add('hidden'); 
    }
}