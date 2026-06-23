// ​304.​
// ​Write greet(name, greeting='Hello') as: a function declaration, a function expression, an arrow​
// ​function, and an object method​
// ​305.​ ​Build a calculator object with add, subtract, multiply, divide - handle division by zero​
// ​306.​
// ​Write createMultiplier(factor) - a factory returning a function that multiplies by factor. Verify:​
// ​createMultiplier(3)(7) === 21​
// ​307.​ ​Demonstrate arguments object vs rest parameters - show why arrow functions cannot use​
// ​arguments

// function declaration
function greet(name, greeting = "Hello") {
    console.log(greeting);
}

greet();

// arrow function
const greet2 = (name = "Alex ", greeting = "Hello") =>
    console.log(greeting + " " + name);

greet2();

//  function expression

const greet3 = function (name = "John", greeting = "hello") {
    console.log(greeting + " " + name);
};
greet3();

// object methods
const greetings = {
    name: "Sam",
    greeting: "hello ",
    greet: function () {
        console.log(this.greeting + this.name);
    },
};

greetings.greet();

const calculator = {
    add: function (a, b) {
        return a + b;
    },
    sub: function (a, b) {
        return a - b;
    },
    mul: function (a, b) {
        return a * b;
    },
    div: function (a, b) {
        if (!b) {
            throw new Error("Division By Zero b = " + b);
        }
        return a / b;
    },
};
console.log(calculator.add(4, 4));
console.log(calculator.mul(4, 4));
console.log(calculator.sub(4, 4));
console.log(calculator.div(12, 4));
// console.log(calculator.div(3,0))

// factory returning function
function createMultiplier(x) {
    return function (y) {
        return x * y;
    };
}

console.log(createMultiplier(3)(7) === 21);

// argument object

function argument_object() {
    console.log(arguments);
}
argument_object(1, 2, 3, 5);

// rest parameters

function rest_parameters(...numbers) {
    console.log(numbers);
}
rest_parameters(1, 4, 6, 8);

// why arrow functions cannot use arguments? :  using arguments inside an arrow function shows arguments of enclosing scope
