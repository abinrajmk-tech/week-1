function double(num) {
    return 2 * num;
}

function addOne(num) {
    return num + 1;
}

//pipe
const pipe =
    (...functions) =>
    (value) => {
        return functions.reduce((currentValue, currentFunction) => {
            return currentFunction(currentValue);
        }, value);
    };

const x = pipe(double, addOne)(5);
console.log(x);

//compose
const compose =
    (...functions) =>
    (value) => {
        return functions.reduceRight((currentValue, currentFunction) => {
            return currentFunction(currentValue);
        }, value);
    };

const y = compose(addOne, double)(5);
console.log(y);

//curry
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function (...nextArgs) {
            return curried.apply(this, [...args, ...nextArgs]);
        };
    };
}

const add = (a, b, c) => a + b + c;

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3));
//partial
function partial(fn) {
    const collect = (boundArgs, ...args) => {
        const collectedArgs = boundArgs.concat(args);
        return collectedArgs.length >= fn.length
            ? fn.apply(null, collectedArgs)
            : collect.bind(null, collectedArgs);
    };
    return collect.bind(null, []);
}

function power(exponent, base) {
    return base ** exponent;
}

const square = partial(power)(2);
const cube = partial(power)(3);
const root = partial(power)(0.5);
console.log(square(4));
console.log(cube(4));
console.log(root(4));
