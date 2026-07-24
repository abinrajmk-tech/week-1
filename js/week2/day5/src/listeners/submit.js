import { store } from "../store.js";
import FormValidator from "../utilities/formValidator.js";

export default function submitEventListeners() {
    window.addEventListener("submit", (event) => {
        event.preventDefault();
        const element = event.submitter;
        const action = element.dataset.action;
        if (action === "submit-task") {
            const form = document.getElementById("task-form");
            const rules = {
                name: { required: true },
                priority: { required: true },
                assignee: { required: true },
                due: { required: true },
            };
            const formValidator = new FormValidator(form, rules);

            const isValid = formValidator.validateAll();
            if (!isValid) {
                return;
            }

            const data = new FormData(form);
            const title = data.get("name");
            const priority = data.get("priority");
            const assignee = data.get("assignee");
            const due = data.get("due");

            store.dispatch({
                type: "ADD_TASK",
                payload: {
                    title: title,
                    assigned: assignee,
                    due: due,
                    status: "Pending",
                    priority: priority,
                },
            });
        }
    });
}
