export const init = () => {
    const hamburgerButton = document.querySelector(".hamburger");
    const navbar = document.querySelector(".sidebar-nav");
    navbar.tabIndex = -1;

    let isOpen = false;

    hamburgerButton.addEventListener("click", () => {
        if (!isOpen) {
            navbar.classList.add("open");
            navbar.setAttribute("aria-expanded", true);
        } else {
            navbar.classList.remove("open");
            navbar.setAttribute("aria-expanded", false);
        }
        isOpen = !isOpen;
        navbar.focus();
    });
};
