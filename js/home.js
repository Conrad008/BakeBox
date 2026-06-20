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