// ​Task 3 (45 min) - Fetch API - Full Pattern​
// ​400.​
// ​Fetch posts from https://jsonplaceholder.typicode.com/posts. Log the response status and​
// ​headers.​
// ​401.​ ​Write fetchJSON(url, options) - wrapper that throws HttpError (custom class) if response.ok is​
// ​false​
// ​402.​ ​POST a new post with correct Content-Type header. Log the created resource.​
// ​403.​
// ​Add timeout with AbortController: abort after 5 seconds, show a friendly timeout message​
class HttpError extends Error {
    constructor(message) {
        super(message);
    }
}
const url = "https://jsonplaceholder.typicode.com/posts";

async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`response status : ${response.status}`);
        }

        console.log(response.status);
        console.log(response.headers);
    } catch (error) {
        console.error(error.message);
    }
}
await getData(url);

const user = {
    name: "user 1",

    department: "IT",
};
const options = {
    method: "POST",
    headers: {
        "Content-type": "application/JSON",
    },
    body: JSON.stringify(user),
};
async function fetchJSON(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new HttpError("Http");
        }
        return response.json();
    } catch (error) {
        console.log(error.message);
        return 408;
    }
}
console.log(await fetchJSON(url, options));
console.log(await fetchJSON(url, { signal: AbortSignal.timeout(5000) }));
