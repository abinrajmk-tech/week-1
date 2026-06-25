const searchbar = document.getElementById("searchbar");
const searchArea = document.querySelector(".service-container");
const article1 = document.querySelector(".article-1");
const article2 = document.querySelector(".article-2");
const article3 = document.querySelector(".article-3");
const notFound = document.querySelector("#not-found");
const modifyText = searchArea.innerHTML;
const oldInnerHTML = searchArea.innerHTML;
searchbar.addEventListener("keyup", () => {
    let filter = searchbar.value.trim().toLowerCase();
    if (filter === "") {
        searchArea.innerHTML = oldInnerHTML;
        notFound.classList.add("hide");
        return;
    }

    const re = new RegExp(`${filter}`, "gi");
    let newText = modifyText.replace(re, `<span>$&</span>`);
    searchArea.innerHTML = newText;
    let notFoundinArticle1 = false,
        notFoundinArticle2 = false,
        notFoundinArticle3 = false;
    console.log(article1.innerHTML);
    if (!article1.innerText.toLowerCase().includes(filter)) {
        newText = newText.replace(
            /class="article-1"/gi,
            'class="article-1 hide"',
        );
        notFoundinArticle1 = true;
    }
    if (!article2.innerText.toLowerCase().includes(filter)) {
        newText = newText.replace(
            /class="article-2"/gi,
            'class="article-2 hide"',
        );
        notFoundinArticle2 = true;
    }
    if (!article3.innerText.toLowerCase().includes(filter)) {
        newText = newText.replace(
            /class="article-3"/gi,
            'class="article-3 hide"',
        );
        notFoundinArticle3 = true;
    }
    if (notFoundinArticle1 && notFoundinArticle2 && notFoundinArticle3) {
        notFound.classList.remove("hide");
    }

    searchArea.innerHTML = newText;
});
