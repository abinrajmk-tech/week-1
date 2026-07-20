export const init = () => {
    const content = document.querySelector(".content");
    const contentBtn = document.querySelector("#content-btn");

    function viewContent() {
        let isExpanded;
        isExpanded = contentBtn.getAttribute("aria-expanded") === "true";
        content.classList.toggle("content-height");
        contentBtn.setAttribute("aria-expanded", !isExpanded);
    }
    contentBtn.addEventListener("click", viewContent);
};
