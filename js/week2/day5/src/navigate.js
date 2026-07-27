import { routes } from "./register.js";
import { store } from "./store.js";

export function navigate(url_path) {
    const routeExists = routes.some(
        (route) => route.regex && route.regex.test(url_path)
    );
    const path = routeExists ? url_path : 404;
    if (window.location.pathname !== url_path && path !== "404") {
        window.history.pushState({}, "", url_path);
    }
    store.dispatch({
        type: "ROUTE_CHANGED",
        payload: { path, params: {} },
    });
}
