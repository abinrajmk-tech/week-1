import { store } from "../store.js";

export default function clickEventListeners() {
    window.addEventListener("click", (event) => {
        const element = event.target.closest("[data-action");
        if (!element) return;

        const action = element.dataset.action;
        const taskId = element.closest("[data-id]")?.dataset.id;

        if (action === "open-modal") {
            const modal = document.querySelector(".task-modal-container");
            modal.style.display = "flex";
        }
        if (action === "close-modal") {
            const modal = document.querySelector(".task-modal-container");
            modal.style.display = "none";
        }
        if (action === "complete") {
            const state = store.getState();
            let taskList = state.tasks;

            const status =
                taskList[taskId].status == "Pending" ? "Completed" : "Pending";

            store.dispatch({
                type: "UPDATE_TASK",
                payload: {
                    id: taskId,
                    updates: {
                        status: status,
                    },
                },
            });
        }

        if (action === "remove-task") {
            store.dispatch({
                type: "DELETE_TASK",
                payload: {
                    id: taskId,
                },
            });
        }
    });
}
