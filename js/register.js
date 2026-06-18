document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    
    const togglePasswordBtn = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const successMessage = document.getElementById('formSuccess');

    togglePasswordBtn.addEventListener('click', () => {
        const isPassword = passwordInput.getAttribute('type') === "password"

        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

        if (isPassword) {
            eyeIcon.className = "fa-regular fa-eye-slash text-base";
        } else {
            eyeIcon.className = "fa-regular fa-eye text-base";
        }
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        successMessage.classList.add('hidden');

        const emailValue = emailInput.value.trim().toLowerCase();
        const nameValue = nameInput.value.trim();
        const phoneValue = phoneInput.value.trim();
        const passwordValue = passwordInput.value;

        const users = JSON.parse(localStorage.getItem('bakebox_users')) || [];
    })
});