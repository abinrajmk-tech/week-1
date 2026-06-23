const overlayContent = (document.getElementsByClassName(
    "overlay-content",
)[0].style.border = " 1px solid orange");

const projectOneHeading = (document.getElementById("project-1-h2").style.color =
    "red");

const para = (document.getElementsByTagName("a")[0].style.color = "indigo");

const partitions = document.querySelector(".partition");
partitions.style.border = "2px solid indigo";

const projects = document.querySelectorAll(".projects");
const mainContainer = document.querySelector(".main-container");

projects.forEach((project) => {
    project.style.border = "1px solid green";
});

const parent = document.querySelector(".projects");

const firstChild = parent.firstElementChild;
console.log(firstChild);

const lastchild = parent.lastElementChild;
console.log(lastchild);

const nextSibling = parent.nextElementSibling;

function addCard(title, imageUrl, body) {
    const container = document.createElement("div");
    container.classList.add("stats");
    container.classList.add("partition");

    const img = document.createElement("img");
    img.setAttribute("src", imageUrl);

    const heading = document.createElement("h2");
    heading.textContent = title;

    const link = document.createElement("a");
    link.textContent = "Visit Project \u2192";

    const image = document.createElement("div");
    image.classList.add("image");
    const content = document.createElement("div");
    content.classList.add("overlay-content");

    image.appendChild(img);
    content.appendChild(heading);
    content.appendChild(link);

    container.appendChild(image);
    container.appendChild(content);

    mainContainer.appendChild(container);
}
function removeCard(id) {
    const card = document.getElementById("project-2");
    card.remove();
}
function clearAllCards() {
    const cards = Array.from(mainContainer.children);
    cards.forEach((card) => {
        card.remove();
    });
}
