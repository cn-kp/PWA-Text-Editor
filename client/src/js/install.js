const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA 
window.addEventListener('beforeinstallprompt', (event) => {
    // reveal prompt
    window.deferredPrompt = event;

    butInstall.classList.toggle('hidden', false);
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const prompt = window.deferredPrompt;

    if (!prompt) {
        return;
    }
    // reveal prompt
    prompt.prompt();

    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true);
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // clear prompt
    window.deferredPrompt = null
});
