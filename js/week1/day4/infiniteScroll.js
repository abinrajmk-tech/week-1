let n = 0;
async function fetchBlog() {
    const url = `https://jsonplaceholder.typicode.com/posts?_start=${n}&_limit=10`;
    try {
        const response = await fetch(url);
        handleError(response.status);
        const data = await response.json();
        data.forEach((item) => {
            const blog = blogCard.cloneNode(true);
            const heading = blog.children[0];
            const paragraph = blog.children[1];
            heading.textContent = item.title;
            paragraph.textContent = item.body;
            container.appendChild(blog);
        });
        const lastBlog = container.lastElementChild;
    } catch (error) {
        console.error("error");
        const retryButton = document.querySelector(".retry-btn");
        retryButton.style.display = "block";
        retryButton.addEventListener("click", retryFetch);
    }
}
function handleError(status) {
    if (status === 404) {
        console.log("url not found");
        return;
    }
}
function retryFetch(url) {
    fetchBlog();
}
const blogCard = document.querySelector(".blog-card");
const container = document.querySelector(".blog-container");
const line = document.querySelector(".line");
const loading = document.querySelector(".loader");

fetchBlog();

const options = {
    root: null,
    threshold: 1.0,
};

const callback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            n = n + 10;
            if (n >= 100) {
                console.log(`All blog fetched`);
                loading.style.display = "none";
                const p = document.querySelector("#end");
                p.textContent = "End of feed";
                return;
            }

            setTimeout(() => {
                fetchBlog();
            }, 1000);
        }
    });
};
const observer = new IntersectionObserver(callback, options);

observer.observe(line);
