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

        const emailValue = emailInput.value.trim();
        if (emailValue === ""){
            showInputError(emailInput)
            isValid = false
        }
        else{
            clearInputError(emailInput)
        }

        const passwordValue = passwordInput.value

        if (passwordValue.length < 6) {
            showInputError(passwordInput);
            isValid = false;
        } else {
            clearInputError(passwordInput);
        }

        if (!isValid) {
            event.preventDefault();
            return;
        }

        const users = JSON.parse(localStorage.getItem('bakebox_users')) || [];

        const matchedUser = users.find(user => user.email === emailValue);

        if (!matchedUser) {
            
            showInputError(emailInput);
            emailInput.setCustomValidity("No account found with this email.");
            emailInput.reportValidity();
            return;
        }

        if (matchedUser.password !== passwordValue) {
            
            showInputError(passwordInput);
            passwordInput.setCustomValidity("Incorrect password. Try again");
            passwordInput.reportValidity();
            return;
        }

        const userSession = {
            id: matchedUser.id,           
            name: matchedUser.name,       
            email: matchedUser.email,
            isLoggedIn: true,
            loginTime: new Date().getTime()
        };

        try {
            localStorage.setItem('BakeBox_Session', JSON.stringify(userSession))
        } catch (error) {
            console.error("failed to store user data", error)
        }

        window.location.href = 'home.html'
    });

    emailInput.addEventListener('input', () => {
        if (emailInput.classList.contains('border-red-500')) {
            clearInputError(emailInput);
        }
    });

    passwordInput.addEventListener('input', () => {
        if (passwordInput.classList.contains('border-red-500')) {
            clearInputError(passwordInput);
        }
    });

})
