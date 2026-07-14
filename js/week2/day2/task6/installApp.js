let installPrompt = null;
const installButton = document.getElementById("install");

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    installButton.removeAttribute("hidden");
});
installButton.addEventListener("click", (event) => {
    installPrompt.prompt();
});
