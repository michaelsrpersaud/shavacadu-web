// Function to redirect to the Chrome Web Store
function redirectToChromeWebStore() {
    window.location.href = 'https://chrome.google.com/webstore/detail/bjlppgafakigmpbjlodkdfaefkandphp';
}

// Add event listener for the Chrome Store button
document.addEventListener('DOMContentLoaded', function() {
    const chromeShopBtn = document.getElementById('chromeShopBtn');
    if (chromeShopBtn) {
        chromeShopBtn.addEventListener('click', redirectToChromeWebStore);
    }
});
