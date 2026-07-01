// Task 2 (45 min) - Promises from Scratch​
// ​397.​
// ​Create five Promises using new Promise((resolve, reject) => { setTimeout(...) }) - mix resolves​
// ​and rejects​
// ​398.​ ​Chain three dependent Promises: getUser → getOrders(userId) → getOrderDetail(orderId).​
// ​Reject getOrders if userId is undefined.​
// ​399.​ ​Demonstrate Promise.all (three parallel calls, time ≈ slowest), Promise.allSettled (one resolves,​
// ​one rejects - both returned), Promise.race​

const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("promise 1 ");
    }, 1000);

    resolve("Promise 1 resolved");
    reject("Promise 1 resolved");
}).then((value) => console.log(value));

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("promise 2 ");
    }, 2000);

    resolve("Promise 2 resolved");
    reject("Promise 2 resolved");
}).then((value) => console.log(value));

const promise3 = new Promise((resolve, reject) => {
    reject("promise3 rejected");
}).then((value) => console.error("promise 3 rejected "));

const promise4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("promise 4");
    }, 2000);

    resolve("Promise 4 resolved");
    reject("Promise   4 rejected");
}).then((value) => console.log(value));

const promise5 = new Promise((resolve, reject) => {
    reject("Promise   5 rejected");
}).then((value) => console.log("promise 5 rejected"));
promise5.catch((error) => {
    console.log("promise 5 error handled");
});

promise3.catch((error) => {
    console.log("promise 3 error handled");
});

const users = [
    {
        id: "",
        orderId: 1,
        item: "item1",
    },
];

const getuser = new Promise((resolve, reject) => {
    resolve(users[0].id);
    reject(-1);
});
const getOrders = getuser.then((userId) => {
    return new Promise((resolve, reject) => {
        if (users[0].id) resolve(users[0].orderId);
        else reject("Not found");
    });
});

const getOrderDetail = getOrders
    .catch((error) => console.log("User not found"))
    .then((orderId) => {
        return new Promise((resolve, reject) => {
            resolve(users[0]);
        });
    })
    .then((userDetails) => console.log(userDetails));

// promise all
const promiseA = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});
const promiseB = new Promise((resolve, reject) => {
    setTimeout(() => reject(2), 2000);
});
const promiseC = new Promise((resolve, reject) => {
    setTimeout(() => resolve(3), 3000);
});

Promise.all([promiseA, promiseB, promiseC])
    .then((values) => {
        console.log(values);
    })
    .catch((error) => console.log("handled " + error));

Promise.allSettled([promiseA, promiseB]).then((results) => {
    results.forEach((result) => console.log(result));
});

Promise.race([promiseA, promiseC]).then((value) => {
    console.log("race : " + value);
});
