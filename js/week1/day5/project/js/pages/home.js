import { fetchRecentPost } from "../utils.js";

const container = document.querySelector(".recent-posts");
async function setRecentPost() {
    const recentPosts = await fetchRecentPost();

    const post = document.createElement("div");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    post.classList.add("post");
    post.append(h3, p);

    recentPosts.forEach((news) => {
        const newPost = post.cloneNode(true);
        const title = newPost.querySelector("h3");
        const body = newPost.querySelector("p");
        title.textContent = news.title;
        body.textContent = news.body;
        container.append(newPost);
    });
}

setRecentPost();
