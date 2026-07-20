// ​Task 4 (50 min) - Advanced Array Methods​
// ​Given orders (each with an items array), use flatMap to get all items with their parent order id​
// ​Use findLast and findLastIndex on a log array to find the most recent error entry​
// ​Build chunk(arr, size), zip(...arrays) that interleaves arrays, and groupBy(arr, keyFn) without​
// ​Object.groupBy​
// ​376.​ ​Use Array.from({ length: 12 }, (_, i) => ...) to generate a monthly calendar array​

const orders = [
    { id: 1, items: ["item1", "item2", "item3"] },
    { id: 2, items: ["item3", "item4", "item5", "item6"] },
    { id: 3, items: ["item8", "item9", "item3"] },
];

const flatItems = orders.flatMap((order) => {
    return order.items.map((item) => {
        return {
            id: order.id,
            item: item,
        };
    });
});

// chunks

export function chunk(arr, size) {
    if (!Array.isArray(arr)) {
        throw new TypeError("first argument must be an array");
    }

    let chunked = [];

    for (let i = 0; i < arr.length; i += size) {
        chunked.push(arr.slice(i, i + size));
    }
    return chunked;
}

export function zip(...arrays) {
    if (!arrays.every(Array.isArray))
        throw new TypeError("arguments must be array");
    const maxLength = Math.max(...arrays.map((array) => array.length));
    return Array.from({ length: maxLength }, (_, index) =>
        arrays.map((array) => array[index])
    );
}

export function groupBy(arr, keyFn) {
    if (!Array.isArray(arr))
        throw new TypeError("first argument must me an array");
    const result = {};
    arr.forEach((element, index) => {
        const key = keyFn(element, index);
        if (!result[key]) result[key] = [];

        result[key].push(element);
    });
    return result;
}

export const pipe =
    (...functions) =>
    (value) => {
        return functions.reduce((currentValue, currentFunction) => {
            if (typeof currentFunction !== "function") {
                throw new TypeError("All arguments must be a fn");
            }
            return currentFunction(currentValue);
        }, value);
    };

export const compose =
    (...functions) =>
    (value) => {
        return functions.reduceRight((currentValue, currentFunction) => {
            if (typeof currentFunction !== "function") {
                throw new TypeError("All arguments must be a function");
            }
            return currentFunction(currentValue);
        }, value);
    };

export function curry(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("All arguments must be a function");
    }
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function (...nextArgs) {
            return curried.apply(this, [...args, ...nextArgs]);
        };
    };
}

export function partial(fn) {
    const collect = (boundArgs, ...args) => {
        const collectedArgs = boundArgs.concat(args);
        return collectedArgs.length >= fn.length
            ? fn.apply(null, collectedArgs)
            : collect.bind(null, collectedArgs);
    };
    return collect.bind(null, []);
}
