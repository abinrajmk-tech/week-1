export let routes = [
    {
        path: "404",
        regex: null,
        keys: [],
        component: () => `<h1>404 Page Not Found</h1>`,
    },
];

export default function register(path, component) {
    const keys = [];
    const segments = path.split("/");

    const regexSegments = segments.map((segment) => {
        if (segment.startsWith(":")) {
            const paramName = segment.slice(1);
            keys.push(paramName);

            return "([^/]+)";
        }
        return segment;
    });
    const regexPattern = regexSegments.join("/");
    const regex = new RegExp(`^${regexPattern}$`, "i");

    routes.push({
        path,
        regex,
        keys,
        component,
    });
}
