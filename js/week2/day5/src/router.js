// router.js
import { store } from "./js/store.js";
import Home from "./routes/home.js";
import Login from "./routes/login.js";
import SignUp from "./routes/signUp.js";

const routes = {
    "/": Home,
    login: Login,
    signup: SignUp,
    404: () => "<h1>404 Page Not Found </h1>",
};

const app = document.getElementById("app");

const render = (state) => {
    const viewFunction = routes[state.route.path] || routes["404"];
    app.innerHTML = viewFunction();
};

window.addEventListener("click", (event) => {
    const element = event.target.closest("[data-action");
    if (!element) return;

    const action = element.dataset.action;
    const taskId = element.closest("[data-id]")?.dataset.id;
    if (action === "delete-task") {
        //remove task
    }
    if (action === "open-modal") {
        const modal = document.querySelector(".task-modal");
        modal.style.display = "flex";
    }
    if (action === "close-modal") {
        const modal = document.querySelector(".task-modal");
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
    if (action === "submit-task") {
        event.preventDefault();
        const form = document.getElementById("task-form");
        const data = new FormData(form);
        const title = data.get("name");
        const priority = data.get("priority");
        const assignee = data.get("assignee");
        const due = data.get("due-date");

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

const syncRouterWithHash = () => {
    const path = location.hash.slice(1) || "/";
    store.dispatch({
        type: "ROUTE_CHANGED",
        payload: { path, params: {} },
    });
};
store.subscribe(render);

window.addEventListener("load", syncRouterWithHash);
window.addEventListener("hashchange", syncRouterWithHash);
