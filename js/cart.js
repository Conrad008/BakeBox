document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    setupCheckoutController();
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

function renderCart (){
    const cart = JSON.parse(localStorage.getItem('BakeBox_Cart')) || {};
    const container = document.getElementById('cartItemsContainer');
    const badge = document.getElementById('cartCountBadge')

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-16 bg-white border border-stone-100 rounded-xl p-8 space-y-4">
                <div class="text-stone-300 text-5xl"><i class="fa-solid fa-basket-shopping"></i></div>
                <p class="text-stone-500 font-medium">Your basket is looking empty.</p>
                <a href="products.html" class="inline-block bg-thirdPalette text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-amber-700 transition-colors">
                    Browse Fresh Pastries
                </a>
            </div>
        `;
        if (badge) badge.classList.add('hidden');
        document.getElementById('checkoutForm')?.classList.add('hidden');
        updateBillTotals(0);
        toggleCheckoutButtonState(false);
        return;
    }

    container.innerHTML = '';
    let runningBillSum = 0;
    let badgeTotalCount = 0;

    cart.forEach(item => {
        const itemRowCost = item.price * item.quantity;
        runningBillSum += itemRowCost;
        badgeTotalCount += item.quantity

        const row = document.createElement('div');
        row.className = "bg-white border border-stone-100 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-fadeIn";

        row.innerHTML = `
            <div class="flex items-center gap-4 w-full sm:w-auto">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg bg-stone-50 shrink-0" onerror="this.src='https://placehold.co/100x100?text=Bake'">
                <div>
                    <h3 class="font-bold text-stone-800 text-base leading-tight">${item.name}</h3>
                    <p class="text-xs font-semibold text-amber-600 uppercase mt-0.5">${item.category}</p>
                </div>
            </div>
            
            <div class="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-none pt-3 sm:pt-0">
                <div class="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                    <button class="px-2.5 py-1 text-stone-500 hover:bg-stone-200/50 transition-colors font-bold" onclick="adjustItemQuantity('${item.id}', -1)">-</button>
                    <span class="px-3 py-1 font-bold text-xs text-stone-800">${item.quantity}</span>
                    <button class="px-2.5 py-1 text-stone-500 hover:bg-stone-200/50 transition-colors font-bold" onclick="adjustItemQuantity('${item.id}', 1)">+</button>
                </div>
                
                <div class="text-right flex items-center gap-4">
                    <span class="font-black text-stone-900 min-w-[70px]">KSH${itemRowCost.toFixed(2)}</span>
                    <button class="text-stone-300 hover:text-red-600 transition-colors p-1 text-sm" onclick="removeCartItem('${item.id}')" aria-label="Remove item">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(row);
    });

    if (badge) {
        badge.textContent = badgeTotalCount;
        badge.classList.remove('hidden');
    }
    updateBillTotals(runningBillSum);
    toggleCheckoutButtonState(true);
}

window.adjustItemQuantity = function(id, balanceMod){
    let cart = JSON.parse(localStorage.getItem('BakeBox_Cart')) || {};

    const targetedItem = cart.find(item => item.id === id);

    if(targetedItem){
        targetedItem.quantity += balanceMod;

        if (targetedItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
        localStorage.setItem('BakeBox_Cart', JSON.stringify(cart));
        renderCart();
    }
    
};