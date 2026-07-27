// router.js
import { store } from "./store.js";
import Home from "./routes/home.js";
import Login from "./routes/login.js";
import signup from "./routes/signUp.js";
import SignUp from "./routes/signUp.js";
import clickEventListeners from "./listeners/click.js";
import submitEventListeners from "./listeners/submit.js";
import keyBoardEventListener from "./listeners/key.js";

import register from "./register.js";
import { routes } from "./register.js";
import { navigate } from "./navigate.js";
import { getTask } from "./components/getTask.js";

register("/", Home);
register("/login", Login);
register("/signup", signup);
register("/tasks/:id", getTask);

const app = document.getElementById("app");

let previousPath = null;
const render = (state) => {
    const currentPath = state.route.path;

    let match = null;
    let matchedRoute = routes.find((route) => {
        if (!route.regex) return false;
        match = currentPath.match(route.regex);
        return match !== null;
    });
    if (!matchedRoute) {
        matchedRoute = routes.find((route) => route.path === "404");
    }

    const params = {};
    if (match && matchedRoute.keys.length > 0) {
        matchedRoute.keys.forEach((key, index) => {
            params[key] = match[index + 1];
        });
    }
    state.route.params = params;

    if (previousPath === matchedRoute.path) {
        app.classList.add("skip-animations");
    } else {
        app.classList.remove("skip-animations");
    }
    previousPath = matchedRoute.path;

    app.innerHTML = matchedRoute.component(params);
};
export function getPath() {
    return window.location.pathname.toLowerCase();
}

clickEventListeners();
submitEventListeners();
keyBoardEventListener();

store.subscribe(render);

window.addEventListener("load", () => navigate(getPath()));
window.addEventListener("popstate", () => navigate(getPath()));
