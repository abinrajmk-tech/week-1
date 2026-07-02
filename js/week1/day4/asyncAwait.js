// Task 4 (50 min) - Async/Await - Full Patterns​
// ​ 04.​
// 4
// ​405.​
// ​Convert the three-chained Promise exercise to async/await. Compare side by side.​
// ​Write loadDashboard(userId) that fetches user, posts, and todos in parallel (Promise.all), then​
// ​fetches the first post's comments. Handle errors at each step.​
// ​406.​ ​Demonstrate the sequential vs parallel bug: time both approaches​
// ​407.​
// ​Show the forEach async bug - it doesn't await. Fix with for...of and with​
// ​Promise.all(arr.map(async fn)).

// chained promises

const user = {
    id: 0,
    orderId: 1,
    item: "item1",
};
let posts = [
    {
        postId: 1,
        title: "Post 1",
        content: "this is post 1",
        comments: ["comment 1 ", " comment 2"],
    },
    {
        postId: 2,
        title: "Post 2",
        content: "this is post 2",
        comments: ["comment 3 ", " comment 4"],
    },
    {
        postId: 3,
        title: "Post 3",
        content: "this is post 3",
        comments: ["comment 5 ", " comment  6"],
    },
];
let todo = [
    {
        id: 1,
        task: "touch Typing",
    },
    {
        id: 2,
        task: "Swimming",
    },
    {
        id: 3,
        task: "play football",
    },
    {
        id: 4,
        task: "watch Movies",
    },
];

function getUser() {
    return new Promise((resolve, reject) => {
        resolve(user.id);
    });
}
async function getOrders() {
    let id = await getUser();
    return new Promise((resolve, reject) => {
        if (id === "undefined") {
            reject(new Error("error: User Not Found"));
        } else {
            resolve(user.orderId);
        }
    });
}
async function getOrderDetail() {
    try {
        let orderId = await getOrders();
        console.log(orderId);
        console.log(user);
    } catch (error) {
        console.error(error);
    }
}
getOrderDetail();

async function fetchUser() {
    return new Promise((resolve, reject) => {
        const id = user.id;
        if (id !== "undefined") resolve(id);
        else reject(new Error("User not Found"));
    });
}
async function fetchPost() {
    return new Promise((resolve, reject) => {
        if (posts != "undefined") {
            resolve(posts);
        } else {
            reject(new Error("posts not found"));
        }
    });
}
async function fetchTodo() {
    return new Promise((resolve, reject) => {
        if (todo != "undefined") {
            resolve(todo);
        } else {
            reject(new Error("Todo list not found"));
        }
    });
}
async function loadDashboard() {
    try {
        console.time("Loading Dashboard Parallel");
        let results = await Promise.all([
            fetchUser(),
            fetchPost(),
            fetchTodo(),
        ]);
        console.timeEnd("Loading Dashboard Parallel");
        return results;
    } catch (error) {
        console.error(error);
    }
}
loadDashboard().then((result) => {
    console.log(result);
    console.log(result[1][0].comments);
});

async function sequential() {
    try {
        console.time("sequential");
        const user = await fetchUser();
        const post = await fetchPost();
        const todo = await fetchTodo();
        console.timeEnd("sequential");
        return post[0].comments;
    } catch (error) {
        console.log(error);
    }
}
sequential().then((result) => console.log(result));

// forEach async bug
let fruits = ["apple", "orange", "banana"];

async function eatFruit(fruit) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(fruit), 2000);
    });
}

await fruits.forEach(async (fruit) => {
    const nextfruit = await eatFruit(fruit);
    console.log(`ate ${fruit}`);
});
console.log("ate all fruits"); // prints before eatFruit completes .

// fix 1 : for...of

for (const fruit of fruits) {
    const nextfruit = await eatFruit(fruit);
    console.log(`ate 2 : ${fruit}`);
}
console.log("ate all fruits : for .. of");

await Promise.all(
    fruits.map(async (fruit) => {
        const nextfruit = await eatFruit(fruit);
        console.log(`ate 3 : ${fruit}`);
    })
);
console.log("ate all fruits : Promise.all");
