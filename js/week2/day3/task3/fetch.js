export async function fetchJson(url) {
    try {
        const result = await fetch(url);
        const data = await result.json();
        return data;
    } catch (error) {
        throw new Error("HttpError");
    }
}
// fetchJson("https://mock.httpstatus.io/500");

export function debounce(func, delay = 300) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

export const memoize = (func) => {
    const cache = {};
    return (...args) => {
        let strKey = args.join(",");
        if (!cache[strKey]) {
            console.log("adding to cache");
            cache[strKey] = func.apply(this, args);
        }

        return cache[strKey];
    };
};
