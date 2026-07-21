import FormValidator, {
    rules,
    HandleSubmit,
} from "./components/formvalidator.js";
import { init as darkMode } from "./components/dark-mode.js";
import { init as navbarInit } from "./components/nav.js";
import { init as intersectionObserver } from "./components/intersectionObserver.js";
import { init as scrollAnimation } from "./components/scrollanimation.js";
import { init as accordion } from "./components/accordion.js";
import { init as focusTrap } from "./components/focusTrap.js";
import { init as search } from "./components/search.js";

darkMode();
navbarInit();
intersectionObserver();
scrollAnimation();
accordion();
focusTrap();
search();

const form = document.querySelector("form");

if (form) {
    const formValidator = new FormValidator(form, rules);

    form.addEventListener(
        "blur",
        (event) => {
            formValidator.validate(event.target);
        },
        true
    );
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        formValidator.validateAll();
        HandleSubmit(event);
    });
}
