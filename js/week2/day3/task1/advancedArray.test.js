import { chunk, compose, curry, partial } from "./advancedArray.js";
import { zip } from "./advancedArray.js";
import { groupBy } from "./advancedArray.js";
import { pipe } from "./advancedArray.js";
const code = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const result = [[1, 2, 3, 4], [5, 6, 7, 8], [9]];

//...............1.chunk.......................

// happy path
test("chunk [1-9] to equal [[1,2,3,4],[5,6,7,8],[9]]", () => {
    expect(chunk(code, 4)).toEqual(result);
});

// edge case
test("chunk handles  empty array", () => {
    expect(chunk([], 2)).toEqual([]);
});

// error case
test("chunk throws type error when invalid array input", () => {
    expect(() => chunk("1", 2)).toThrow(TypeError);
});

//..................2.zip..........................
test("zip:  happy path", () => {
    expect(zip([1, 2], ["a", "b"])).toEqual([
        [1, "a"],
        [2, "b"],
    ]);
});

// zip edge case

test("zip : handles empty array inputs", () => {
    expect(zip([], [])).toEqual([]);
});

// zip error case

test("zip : handles invalid inputs", () => {
    expect(() => zip(1, 2)).toThrow(TypeError);
});

//......................3.groupBy..............
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
];
const groupByResult = {
    may: [
        { id: 1, log: "log 1", month: "may" },
        { id: 2, log: "log 2", month: "may" },
    ],
    june: [{ id: 3, log: "log 2", month: "june" }],
};

//happy path

test("groupBy : happy path", () => {
    expect(groupBy(log, (item) => item.month)).toEqual(groupByResult);
});

// edge case
test("groupBY : edge case", () => {
    expect(groupBy([], () => {})).toEqual({});
});

// error case
test("groupBy : error case", () => {
    expect(() => groupBy("a", () => {})).toThrow(TypeError);
});

//....................4.Pipe ........................................
function double(num) {
    return 2 * num;
}

function addOne(num) {
    return num + 1;
}

// happy path
test("pipe : happy path", () => {
    expect(pipe(double, addOne)(5)).toBe(11);
});

// edge case
test("pipe : edge case", () => {
    expect(pipe()(5)).toBe(5);
});

// error case
test("pipe : error case", () => {
    expect(() => pipe("a", "a")(4)).toThrow(TypeError);
});

// ...................5.compose.......................................

//happy path
test("compose : happy path", () => {
    expect(compose(double, addOne)(5)).toBe(12);
});

// edge case
test("compose : edge case", () => {
    expect(compose()(5)).toBe(5);
});

// error case
test("compose : error case", () => {
    expect(() => compose("a", "a")(4)).toThrow(TypeError);
});

const add = (a, b, c) => a + b + c;

// ..................6.curry.....................

test("curry : happy path", () => {
    expect(curry(add)(1)(2)(3)).toBe(6);
});

test("curry: edge case", () => {
    expect(typeof curry(add)).toBe("function");
});

test("curry : error case", () => {
    expect(() => curry("a")).toThrow(TypeError);
});

//..............7.partial.................

function power(exponent, base) {
    return base ** exponent;
}

console.log(partial());

test("partial : happy Path", () => {
    expect(partial(power)(2)(2)).toBe(4);
});

test("partial : edge case", () => {
    const fn = partial();
    expect(typeof fn).toEqual("function");
});
