const getFocusable = () => {
    return Array.from(
        document.querySelectorAll(
            "a, button, [href] , textarea, input , [tabindex]:not([tabindex='-1']) [aria-expanded]"
        )
    ).filter((element) => {
        return (
            !element.hasAttribute("disabled") &&
            !element.getAttribute("aria-hidden") &&
            element.offsetWidth > 0 &&
            element.offsetHeight > 0
        );
    });
};

const focusable = getFocusable();
console.log(focusable);

window.addEventListener("keydown", (event) => {
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
