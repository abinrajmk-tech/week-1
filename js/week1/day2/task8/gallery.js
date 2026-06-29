const images = document.querySelectorAll(".images");
const overlay = document.querySelector(".overlay");
const imgOverview = document.createElement("img");
const leftButton = document.querySelector("#left");
const rightButton = document.querySelector("#right");
const closeButton = document.querySelector("#close");
let index = 0;
function replaceSrc() {
    const src = images[index].firstElementChild
        .getAttribute("src")
        .replace("600", "1200/800");
    imgOverview.setAttribute("src", src);
}
function closeOverlay() {
    document.querySelector(".overlay img").remove();
    overlay.style.display = "none";
    overlayOpen = false;
    document.body.style.overflow = "auto";
}
images.forEach((image) => {
    image.tabIndex = -1;
    image.addEventListener("click", () => {
        index = findIndex();
        replaceSrc();
        overlay.appendChild(imgOverview);
        overlay.style.display = "flex";
        document.body.style.overflow = "hidden";
    });
});

closeButton.addEventListener("click", () => {
    closeOverlay();
});
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeOverlay();
    }
    if (event.key === "ArrowRight") {
        next(event);
    }
    if (event.key === "ArrowLeft") {
        prev(event);
    }
    if (event.key === "Tab") {
        if (event.shiftKey) {
            if (document.activeElement === closeButton) {
                event.preventDefault();
                rightButton.focus();
            }
        } else {
            if (document.activeElement === rightButton) {
                event.preventDefault();
                closeButton.focus();
            }
        }
    }
});

function next(e) {
    e.stopPropagation();
    index = (index + 1) % images.length;
    replaceSrc();
    rightButton.focus();
}
function prev(e) {
    e.stopPropagation();
    index == 0 ? (index = images.length - 1) : index--;
    replaceSrc();
    leftButton.focus();
}
function findIndex() {
    const clickedImage = event.target;
    const clickedImageDiv = clickedImage.parentElement;
    const index = [...images].indexOf(clickedImageDiv);
    return index;
}

let touchStartX, touchendX;

window.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
});
window.addEventListener("touchend", (event) => {
    touchendX = event.changedTouches[0].screenX;
    handleGestures(event);
});

function handleGestures(event) {
    if (touchendX < touchStartX) {
        next(event);
    } else {
        prev(event);
    }
}
