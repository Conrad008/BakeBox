document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const showInputError = (inputEl) => {
    inputEl.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
    inputEl.classList.remove('border-white/50', 'focus:ring-thirdPalette', 'focus:border-thirdPalette');
    };

    const clearInputError = (inputEl) => {
    inputEl.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
    inputEl.classList.add('border-white/50', 'focus:ring-thirdPalette', 'focus:border-thirdPalette');
    };

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let isValid = true;

        const emailValue = emailInput.trim();
        if (emailValue === ""){
            showInputError(emailInput)
            isValid = false
        }
        else{
            clearInputError(emailInput)
        }

        if (passwordValue.length < 6) {
            showInputError(passwordInput);
            isValid = false;
        } else {
            clearInputError(passwordInput);
        }
    })

})
