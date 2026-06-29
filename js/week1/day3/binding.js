// Task 2 (40 min) - this Binding - All Four Rules
// 366. ​Demonstrate all four: default binding (standalone call), implicit (method call), explicit​
// ​(call/apply/bind), new (constructor)
// ​367. ​367.​ ​Show this-loss: assign a class method to a variable, call it, show this is undefined in strict​
// ​mode. Fix three ways: arrow in constructor, .bind(), class field.
// 368.​ ​Build bindAll(obj) that binds all enumerable methods to obj
// 369.​
// ​Show that arrow class fields fix this even in setTimeout callbacks

//default bind
var x = 20;
function defaultBinding() {
    console.log(this.x);
}
defaultBinding.x = 40;
defaultBinding();

// implicit binding
var x = 30;
const obj = {
    x: 10,
    implicitBinding: function () {
        console.log(this.x);
    },
};
obj.implicitBinding();

// explicit binding
const obj2 = {
    x: 25,
};

function explicitBinding(y, z) {
    console.log(`x : ${this.x} , y:${y} , z:${z}`);
}

explicitBinding.call(obj2, 2, 3);
explicitBinding.apply(obj2, [2, 3]);

const a = explicitBinding.bind(obj2, 5, 6);
a();

// constructor binding
function constructorBinding(item, price) {
    this.item = item;
    this.price = price;
}
const b = new constructorBinding("Pen", 31);
console.log(`item : ${b.item} price : ${b.price}`);

// this-loss

// class ThisLoss {
//     loss = "this is lost";
//     lost() {
//         console.log(this.loss);
//     }
// }
// const lostObject = new ThisLoss();
// const func = lostObject.lost;
// func();

//solution by arrow in constructor
class ThisLossSolved {
    loss = "this loss will be solved using arrow in constructor";
    constructor() {
        this.lost = () => {
            console.log(this.loss);
        };
    }
}

const lostObject = new ThisLossSolved();
const func = lostObject.lost;
func();

class ThisLossSolvedBind {
    loss = "this loss will be solved using bind()";
    lost = () => {
        console.log(this.loss);
    };
}

const lostObject2 = new ThisLossSolvedBind();
const func2 = lostObject2.lost.bind(lostObject2);
func2();

class ThisLossSolvedClassField {
    loss = "this loss will be solved using classField";
    lost = () => {
        console.log(this.loss);
    };
}

const lostObject3 = new ThisLossSolvedClassField();
const func3 = lostObject3.lost();

class Employee {
    constructor(department) {
        this.department = department;
    }
    details() {
        console.log(this.department);
    }
}

const e = new Employee("IT");
// eDetails();

function bindAll(obj) {
    let methods = Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter(
        function (p) {
            return typeof obj[p] === "function";
        }
    );
    methods.forEach((method) => {
        if (method !== "constructor") {
            obj[method] = obj[method].bind(obj);
        }
    });
}
bindAll(e);
const eDetails = e.details;
eDetails();

class Greet {
    greet = "hello";
    wish = () => {
        console.log(this.greet);
    };
}
const object1 = new Greet();
const g = object1.wish;

setTimeout(() => {
    g();
}, 2000);
