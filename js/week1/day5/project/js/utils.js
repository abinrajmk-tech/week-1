// successToast
export function showSuccessToast(message) {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerText = `${message}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

export async function fetchPosts() {
    const url = `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=6`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function fetchUsers() {
    let start = 0;
    let limit = 5;
    let url = `https://jsonplaceholder.typicode.com/users?_start=${start}&_limit=${limit}`;
    let response = await fetch(url);
    const managers = await response.json();
    response = await fetch(url);
    const engineers = await response.json();
    return [managers, engineers];
}

export async function fetchRecentPost() {
    const url = `https://jsonplaceholder.typicode.com/posts?_start=10&_limit=3`;
    const response = await fetch(url);
    const recentPosts = await response.json();
    return recentPosts;
}
