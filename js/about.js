document.addEventListener('DOMContentLoaded', () => {
            const cart = JSON.parse(localStorage.getItem('BakeBox_Cart')) || [];
            const badge = document.getElementById('cartCountBadge');
            if (badge) {
            const totalItems = cart.reduce((tally, item) => tally + item.quantity, 0);
            if (totalItems > 0) {
            badge.textContent = totalItems;
            badge.classList.remove('hidden');
        }
    }
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