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
    navbar.addEventListener("keydown", (event) => {
        if (event.key == "Escape" && isOpen) {
            isOpen = !isOpen;
            navbar.classList.remove("open");
        }
    });

    navbar.addEventListener("keydown", (event) => {
        let query = ".sidebar-nav a";
        let focusable = document.querySelectorAll(query);
        let first = focusable[0];
        let last = focusable[focusable.length - 1];

        if (event.key === "Tab") {
            if (event.shiftKey) {
                if (document.activeElement === first) {
                    last.focus();
                    event.preventDefault();
                }
            } else {
                if (document.activeElement === last) {
                    first.focus();
                    event.preventDefault();
                }
            }
        }
    });
};
