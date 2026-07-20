// Task 6 (55 min) - MutationObserver & ResizeObserver
// Use MutationObserver to auto-apply IntersectionObserver animation to any new article added​ ​to the blog feed
// Use MutationObserver to log every DOM change in the body to a floating overlay panel​(element added/removed/attribute changed)
// Use ResizeObserver to make a chart-like element that redraws content when its container size​ ​changes
// ​Add a matchMedia listener that logs every time the viewport crosses 768px and 1024px

const container = document.querySelector(".container");
const addBtn = document.querySelector("#addbtn");
const overlay = document.querySelector("#overlay");

let i = 1;
function addBlog() {
    const blog = document.createElement("div");
    blog.classList.add("blog");
    const title = document.createElement("h1");
    const body = document.createElement("p");
    title.textContent = `Blog ${i++}`;
    body.textContent =
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis laudantium mollitia a nostrum earum praesentium maiores tempore esse quas modi, ad aspernatur officiis sapiente id quod ab. Sit, doloremque optio.";
    blog.append(title);
    blog.append(body);
    container.append(blog);
}
addBtn.addEventListener("click", addBlog);
function mutationCallback(mutationList, observer) {
    for (mutation of mutationList) {
        if (mutation.type === "childList") {
            for (child of mutation.addedNodes) {
                blogIntersectionobserver.observe(child);
                overlay.querySelector("#type").textContent =
                    `mutation type : ${mutation.type}`;
                overlay.querySelector("#addedNode").textContent =
                    `added Node : ${child}`;
                console.log(child);
                overlay.querySelector("#attribute").textContent =
                    `attribute changed : ${mutation.attributeName}`;
            }
        }
    }
}
const config = { childList: true };
const mutationObserver = new MutationObserver(mutationCallback);

mutationObserver.observe(container, config);

const blogIntersectionobserver = new IntersectionObserver(blogCallback, {
    threshold: 1,
});
function blogCallback(entries, observer) {
    for (entry of entries) {
        entry.target.style.backgroundColor = entry.isIntersecting
            ? "grey"
            : "whitesmoke";
    }
}

const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
        if (entry.contentBoxSize) {
            const containerWidth = entry.contentBoxSize[0].inlineSize;
            const containerHeight = entry.contentBoxSize[0].blockSize;
            const blogs = document.querySelectorAll(".blog");
            for (blog of blogs) {
                if (containerWidth < 1000) {
                    blog.querySelector(" p").style.fontSize = "2.5em";
                }
                if (containerWidth < 800) {
                    blog.querySelector(" p").style.fontSize = "2em";
                    overlay.style.display = "none";
                }
                if (containerWidth < 600) {
                    blog.querySelector(" p").style.fontSize = "1.5em";
                }
                if (containerWidth < 500) {
                    blog.querySelector(" p").style.fontSize = "1.2em";
                }
                if (containerWidth < 400) {
                    blog.querySelector(" p").style.fontSize = "1em";
                }
            }
        }
    }
});
resizeObserver.observe(container);

const matchMediaListener = window.matchMedia("(width =768px");
const matchMediaListener2 = window.matchMedia("(width =1024px");
matchMediaListener.addEventListener("change", () => {
    console.log("768px : " + matchMediaListener.matches);
});
matchMediaListener2.addEventListener("change", () => {
    console.log("1024px );
});
