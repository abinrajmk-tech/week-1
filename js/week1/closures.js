function createCounter() {
    let count = 0;
    function increment() {
        count++;
    }
    function decrement() {
        count--;
    }
    function getCount() {
        return count;
    }
    function reset() {
        count = 0;
    }
    return {
        increment,
        decrement,
        getCount,
        reset,
    };
}

let a = createCounter();

a.increment();
a.increment();
console.log(a.getCount());

// memoize function
function fibonacci(n) {
    if (n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoize = (func) => {
    const cache = new Map();
    return (value) => {
        if (!cache.get(value)) {
            cache.set(value, func(value));
        }
        return cache.get(value);
    };
};

const memoizedFibonacci = memoize(fibonacci);

console.time();
console.log(fibonacci(40));
console.log(fibonacci(40));
console.timeEnd();

console.time();
console.log(memoizedFibonacci(40));
console.log(memoizedFibonacci(40));
console.timeEnd();

// once function

function once(fun) {
    let called = false;
    let first;
    return (value) => {
        if (!called) {
            first = fun(value);
            called = true;
        }
        return first;
    };
}

function greet(name) {
    return "Hello " + name;
}

const greetingOnce = once(greet);
console.log(greetingOnce("John"));

console.log(greetingOnce("Christi"));
// both returns John

//​Build createRateLimiter(fn, maxCalls, windowMs) that throws if fn is called more than maxCalls​ ​times in windowMs
// doubt
