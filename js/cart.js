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