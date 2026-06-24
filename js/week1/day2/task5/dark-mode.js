let isLightMode = localStorage.getItem("light-theme");
if (isLightMode === "true") {
    document.documentElement.setAttribute("data-theme", "");
} else {
    document.documentElement.setAttribute("data-theme", "dark");
}

function toggleTheme() {
    if (isLightMode) {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "");
    }
    isLightMode = !isLightMode;
    localStorage.setItem("light-theme", isLightMode);
}
const themeButton = document.querySelector(".theme-btn");
themeButton.addEventListener("click", onClick);

function onClick() {
    toggleTheme();
    themeButton.setAttribute("aria-pressed", !isLightMode);
}