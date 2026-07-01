// Task 1 (35 min) - Event Loop - Predict 10 Output Orders​
// ​394.​
// ​For each of ten code snippets mixing console.log, setTimeout(fn, 0), Promise.resolve().then(),​
// ​and queueMicrotask(), predict the output order before running​
// ​395.​ ​For every wrong prediction, write an explanation using: call stack, microtask queue, task queue​
// ​396.​
// ​Write your own event loop puzzle and give it to a pod partner to solve

const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve(3), 3000);
});
promise1.then((result) => console.log(result));

const promise2 = new Promise((resolve, reject) => {
    resolve("first");
    setTimeout(() => resolve("second"), 3000);
});
promise2.then((result) => console.log(result));

const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("1 : promise 3");
    }, 3000);
    resolve("2 : promise 3");
});
promise3.then((result) => console.log(result));

const promise4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error("promise4 rejected"));
    }, 1000);
});
promise4.catch((error) => console.error(error));
const promise5 = Promise.reject(new Error("promise 5 failed"));
promise5.catch((error) => {
    console.log(error);
});
const promise6 = new Promise((resolve, reject) => {
    throw new Error("promise 6 error");
    resolve("Promise 6 resolved");
    reject("promise 6 not resolved");
});
promise6.catch((error) => console.error("promise 6 error occured"));
// promise6.then((value) => console.log(value));

const promise7 = new Promise((resolve, reject) => {
    resolve("promise 7 resolved");
});

queueMicrotask(() => {
    console.log("this is before promise 7");
});

promise7.then((result) => {
    console.log(result);
});
const promise8 = new Promise((resolve, reject) => {
    resolve("promise 8");
});
promise8.then((result) => console.log(result));
queueMicrotask(() => {
    console.log("this is after promise 8 ");
});

const promise9 = new Promise((resolve, reject) => {
    resolve("9th promise resolved");
    reject("9th promise rejected");
}).then((result) => console.log(result));

const promise10 = new Promise((resolve, reject) => {
    resolve("promise 10 resolved");
    queueMicrotask(() => {
        console.log(" queue micro task inside 10");
    });
}).then((result) => console.log(result));
