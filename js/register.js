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

        const emailExists = users.some(user => user.email === emailValue)

        if (emailExists) {
            emailInput.setCustomValidity("This email is already registered.");
            emailInput.reportValidity();
            
            emailInput.addEventListener('input', function clearValid() {
                emailInput.setCustomValidity("");
                emailInput.removeEventListener('input', clearValid);
            });
            return;
        }

        const newUser = {
            id: Date.now(), 
            name: nameValue,
            email: emailValue,
            phone: phoneValue,
            password: passwordValue
        };
    })
});