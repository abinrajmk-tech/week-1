const navigationLinks = document.querySelectorAll(".categories a,.sidebar a");
const breadCrumb = document.querySelector("#breadCrumb");
navigationLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const article = link.getAttribute("href").slice(1);
        history.pushState({}, "", `?article=${article}`);
        document.querySelector(`#${article}`).scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });
        link.focus();

        breadCrumb.textContent = `article / ${article}`;
    });
});

window.addEventListener("load", () => {
    const params = new URLSearchParams(location.search);
    article = params.get("article");
    if (!article) return;
    document.querySelector(`#${article}`).scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
    });
    breadCrumb.textContent = `article / ${article}`;
});
