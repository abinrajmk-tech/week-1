import FormValidator, {
    rules,
    HandleSubmit,
} from "./components/formvalidator.js";

const form = document.querySelector("form");

if (form) {
    const formValidator = new FormValidator(form, rules);

    form.addEventListener(
        "blur",
        (event) => {
            formValidator.validate(event.target);
            console.log(event.target.name);
        },
        true
    );
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        formValidator.validateAll();
        HandleSubmit(event);
    });
}
