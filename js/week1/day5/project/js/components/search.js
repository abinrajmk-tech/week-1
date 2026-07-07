import { fetchPosts } from "../utils.js";
const searchbar = document.getElementById("searchbar");
const notFound = document.querySelector("#not-found");

const articles = document.querySelectorAll(".service-container article");
function removeHighlights() {
    articles.forEach((article) => {
        const title = article.querySelector("h2");
        const body = article.querySelector("p");
        title.innerHTML = title.textContent;
        body.innerHTML = body.textContent;
    });
}
function processFilter(filter) {
    if (!filter) {
        articles.forEach((article) => {
            article.classList.remove("hide");
        });
        notFound.classList.add("hide");
        removeHighlights();
        return;
    }
    let allHidden = true;
    const re = new RegExp(`${filter}`, "gi");

    articles.forEach((article) => {
        const textContent = article.innerText.toLowerCase();
        if (textContent.includes(filter)) {
            article.classList.remove("hide");
            allHidden = false;

            const title = article.querySelector("h2");
            const body = article.querySelector("p");
            title.innerHTML = title.textContent.replace(re, `<span>$&</span>`);
            body.innerHTML = body.textContent.replace(re, `<span>$&</span>`);
        } else {
            article.classList.add("hide");
        }
    });
    if (allHidden) {
        notFound.classList.remove("hide");
    } else {
        notFound.classList.add("hide");
    }
}

window.addEventListener("popstate", (event) => {
    if (event.state === null) {
        return;
    }
    searchbar.value = event.state.q;
    let filter = searchbar.value.trim().toLowerCase();
    processFilter(filter);
});
searchbar.addEventListener("keyup", () => {
    let filter = searchbar.value.trim().toLowerCase();
    if (filter === "") {
        history.pushState({}, "", window.location.pathname);
        processFilter("");
        return;
    }
    history.pushState({ q: filter }, "", `?q=${filter}`);
    processFilter(filter);
});

async function setServices() {
    const data = await fetchPosts();
    const ServiceArticles = document.querySelectorAll(
        ".service-container article"
    );
    ServiceArticles.forEach((service) => {
        const title = service.querySelector("h2");
        const body = service.querySelector("p");
        const index = [...ServiceArticles].indexOf(service);

        title.textContent = data[index].title;
        body.textContent = data[index].body;
    });
}
setServices();
