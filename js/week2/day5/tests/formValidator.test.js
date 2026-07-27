import FormValidator from "../src/utilities/formValidator.js";

beforeEach(() => {
    document.body.innerHTML = "";
});

describe("form validator", () => {
    test("validateAll : valid form", () => {
        document.body.innerHTML = `
        <form>
            <input name="name" value="Task">
            <span></span>

            <select name="priority">
                <option value="High" selected>High</option>
            </select>
            <span></span>
        </form>
    `;

        const form = document.querySelector("form");

        const rules = {
            name: { required: true },
            priority: { required: true },
        };

        const validator = new FormValidator(form, rules);
        validator.validate("name");
        expect(document.querySelector("input").classList).not.toContain(
            "invalid"
        );
        expect(validator.validateAll()).toBe(true);
    });
    test("validateAll : invalid form", () => {
        document.body.innerHTML = `
            <form>
                <input id="name" name="name" />
                <span></span>
            </form>
        `;
        const form = document.querySelector("form");
        const rules = {
            name: { required: true },
        };
        const validator = new FormValidator(form, rules);
        expect(validator.validateAll()).toBe(false);
        expect(document.querySelector("span").textContent).toBe(
            "Error this field is required"
        );
    });
});
