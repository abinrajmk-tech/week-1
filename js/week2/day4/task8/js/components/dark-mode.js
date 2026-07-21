let isLightMode = localStorage.getItem("light-theme");
const themeButton = document.querySelector(".theme-btn");

export function toggleTheme() {
    if (isLightMode) {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "");
    }
    isLightMode = !isLightMode;
    localStorage.setItem("light-theme", isLightMode);
}

export function onClick() {
    toggleTheme();
    themeButton.setAttribute("aria-pressed", !isLightMode);
}

export function setTheme() {
    if (isLightMode === "true")
        document.documentElement.setAttribute("data-theme", "");
    else document.documentElement.setAttribute("data-theme", "dark");

    themeButton.addEventListener("click", onClick);
}

export const init = () => {
    setTheme();
};
