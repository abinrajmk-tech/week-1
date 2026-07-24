export default class FormValidator {
    constructor(form, rules) {
        this.form = form;
        this.rules = rules;
        this.allValid = true;
    }
    validate(field) {
        if (!this.rules[field.name]) {
            return;
        }
        const fieldRules = this.rules[field.name];
        const span = field.nextElementSibling;
        let isInvalid = false;

        for (const rule of Object.keys(fieldRules)) {
            switch (rule) {
                case "required": {
                    if (fieldRules[rule] && field.value.trim() === "") {
                        span.textContent = `Error this field is required`;
                        isInvalid = true;

                        break;
                    }
                }
            }
            if (isInvalid) {
                field.classList.add("invalid");
                this.allValid = false;
            } else {
                field.classList.remove("invalid");
                span.textContent = "";
            }
        }
    }
    validateAll() {
        Object.keys(this.rules).map((key) => this.validate(this.form[key]));
        return this.allValid;
    }
}
