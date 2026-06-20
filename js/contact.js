document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("BakeBox_Cart")) || [];
  const badge = document.getElementById("cartCountBadge");
  if (badge) {
    const totalItems = cart.reduce((tally, item) => tally + item.quantity, 0);
    if (totalItems > 0) {
      badge.textContent = totalItems;
      badge.classList.remove("hidden");
    }
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(
        "Thank you! Your inquiry has been dispatched safely to our baking staff.",
      );
      contactForm.reset();
    });
  }

  const deliveryForm = document.getElementById("deliveryCheckForm");
  if (deliveryForm) {
    deliveryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(
        "Delivery address coordinates saved successfully! These details will automatically be utilized for your next  pastry checkout run.",
      );
    });
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
