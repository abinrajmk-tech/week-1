// 1
if (true) {
    var x = 3;
}
console.log(x);

if (true) {
    let x = 3;
}
console.log(x);
//------------------------------------------------------------------------------------------

// 2 - Reference Error
function test() {
    var y1 = 2; // local scope
}
try {
    console.log(y1);
} catch (error) {
    console.log("error : Reference error " + error);
}

function test() {
    let y = 2;
}
try {
    console.log(y);
} catch (err) {
    console.log(err);
}
// ------------------------------------------------------------------------------------------

// 3  reassigning value is allowed in var and let
var z = 1; //global scope
z = 4;
console.log(z);

let z2 = 1;
z2 = 4;
try {
    console.log(z2);
} catch (err) {
    console.error(err);
}

//------------------------------------------------------------------------------------------
// 4 : var : redeclaration allowed , let : redeclaration not allowed
var p = "hello";
var p = "world";
console.log(p);

let q = "hello";
try {
    let q = "worlds";
    console.log(q);
} catch (err) {
    console.error(err);
}

//------------------------------------------------------------------------------------------

// 5 : const : reassigning not allowed

var w = 4;
w = 32;
console.log(w);

const s = "football";
try {
    s = "cricket";
    console.log(s);
} catch (err) {
    console.error(err);
}

// hoisting

x = 5;

console.log("x is used before declaration : ", +x);
var x;

// block scope
if (true) {
    let r = "sports"; // cannot be accessed outside the block
    var z = "blue"; // can be accessed outside the block
}
console.log(z);

// nested function

function outer() {
    var a = "apple";
    function middle() {
        var b = "banana";
        function innermost() {
            var c = "carrot";
            console.log(a, b, c);
        }
        innermost();
    }
    middle();
}
outer();

// var-in-loop closure bug

for (var i = 0; i < 3; i++) {
    setTimeout(function () {
        console.log(i);
    }, 1000);
}
console.log("\n");

// solution with let
for (let j = 0; j < 3; j++) {
    setTimeout(() => {
        console.log(j);
    }, 1000);
}
