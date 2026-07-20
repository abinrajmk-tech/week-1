const rules = {
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
};

export class FormValidator {
    constructor(form, rules) {
        this.form = form;
        this.rules = rules;
    }

    validate(field) {
        if (!this.rules[field.name]) {
            return;
        }
        const ruleSet = this.rules[field.name];
        const span = field.nextElementSibling;
        console.log(span);
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
                    const pattern = rules["email"].pattern;
                    if (!pattern.test(field.value)) {
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

            if (isInvalid) {
                field.classList.add("is-invalid");
                field.classList.remove("is-valid");
            } else {
                field.classList.add("is-valid");
                field.classList.remove("is-invalid");
                span.textContent = "";
            }
        }
    }
    validateAll() {
        Object.keys(this.rules).forEach((key) => this.validate(this.form[key]));
    }
}
