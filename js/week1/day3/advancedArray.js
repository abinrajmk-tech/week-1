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
console.log(flatItems);

const log = [
    {
        id: 1,
        log: "log 1",
        month: "may",
    },
    {
        id: 2,
        log: "log 2",
        month: "may",
    },
    {
        id: 3,
        log: "log 2",
        month: "june",
    },
    {
        id: 4,
        log: "log 2",
        month: "june",
    },
    {
        id: 5,
        log: "log 2",
        month: "june",
    },
];

const recentLog = log.findLast((log) => log.month === "june");
console.log(recentLog);
const recentLogIndex = log.findLastIndex((log) => log.month === "june");
console.log(recentLogIndex);

// chunks

const code = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function chunk(arr, size) {
    chunked = [];
    for (let i = 0; i < arr.length; i += size) {
        chunked.push(arr.slice(i, i + size));
    }
    return chunked;
}

console.log(chunk(code, 4));

function zip(...arrays) {
    const maxLength = Math.max(...arrays.map((array) => array.length));
    return Array.from({ length: maxLength }, (_, index) =>
        arrays.map((array) => array[index])
    );
}
console.log(zip([1, 2, 3, 4, 5], ["a", "b", "c"]));

function groupBy(arr, keyFn) {
    const result = [];
    arr.forEach((element, index) => {
        const key = keyFn(element, index);
        if (!result[key]) result[key] = [];

        result[key].push(element);
    });
    return result;
}
const monthlyLog = groupBy(log, (item) => item.month);

const calendar = Array.from({ length: 12 }, (_, index) => {
    let monthStart = new Date(2026, index, 1);
    let monthEnd = new Date(2026, index + 1, 1);
    let Days = monthEnd - monthStart;
    Days = Days / (1000 * 60 * 60 * 24);
    return Array.from({ length: Days }, (_, index) => index + 1);
});

console.log(calendar);
let monthStart = new Date(2026, 0, 1);
console.log(monthStart);
