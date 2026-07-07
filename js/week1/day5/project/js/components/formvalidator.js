//  Task 3 (70 min) - Wire All Form Validation
//  432.
//  FormValidator on contact form: name (required, min 2), email (required, valid), phone (optional,
//  pattern), message (required, min 20)
//  433.   1.5 second loading state on submit, then success toast and form reset
//  434.
//  All error messages in a visible span below the field - not in a browser alert
import { showSuccessToast } from "../utils.js";
export const rules = {
    name: { required: true, minLength: 3, maxLength: 10 },
    email: {
        required: true,
        email: true,
        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/,
    },
    phone: { required: true },
    linkedin: { required: true },
    role: {
        required: true,
        custom: { fn: (value) => value.toLowerCase() === "admin" },
    },
    experience: { required: true },
    message: { required: true, minLength: 20 },
};

export default class FormValidator {
    constructor(form, rules) {
        this.form = form;
        this.rules = rules;
    }

    validate(field) {
        if (!field || !this.rules[field.name]) {
            return;
        }
        const ruleSet = this.rules[field.name];
        const span = field.nextElementSibling;
        let isInvalid = false;
        for (const rule of Object.keys(ruleSet)) {
            switch (rule) {
                case "required":
                    if (ruleSet[rule] && field.value.trim() === "") {
                        span.textContent = `error : ${field.name}  is required`;
                        isInvalid = true;
                    }
                    break;
                case "minLength":
                    if (
                        ruleSet[rule] &&
                        field.value.trim().length < ruleSet[rule]
                    ) {
                        span.textContent = `error :  minimim length should be ${ruleSet[rule]} `;
                        isInvalid = true;
                    }
                    break;
                case "maxLength":
                    if (
                        ruleSet[rule] &&
                        field.value.trim().length > ruleSet[rule]
                    ) {
                        span.textContent = `error :  maximum length should be ${ruleSet[rule]} `;
                        isInvalid = true;
                    }
                    break;
                case "pattern":
                    if (!ruleSet[rule].test(field.value)) {
                        span.textContent = `pattern doesnt match`;
                        isInvalid = true;
                    }
                    break;
                case "email":
                    if (!rules["email"].pattern.test(field.value)) {
                        span.textContent = `input must be an email :`;
                        isInvalid = true;
                    }
                    break;
                case "custom":
                    if (!ruleSet[rule].fn(field.value)) {
                        span.textContent = `custom function not matching`;
                        isInvalid = true;
                    }
                    break;
            }
            if (isInvalid) break;
        }
        if (isInvalid) {
            field.classList.add("is-invalid");
            field.classList.remove("is-valid");
        } else {
            field.classList.add("is-valid");
            field.classList.remove("is-invalid");
            span.textContent = `${field.name}`;
        }
    }
    validateAll() {
        Object.keys(this.rules).forEach((key) => {
            const field = this.form[key];
            if (field) this.validate(this.form[key]);
        });
    }
}

export async function HandleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const btntext = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = "submitting..";
    try {
        // const formData = new FormData(form);
        // const data = Object.fromEntries(formData.entries());

        await new Promise((resolve) => setTimeout(resolve, 1500));
        form.reset();
        showSuccessToast("sucess");
        const valids = document.querySelectorAll(".is-valid + label ");
        valids.forEach((valid) => {
            valid.style.color = "#0009";
        });
    } catch (error) {
        console.error(error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = btntext;
    }
}
