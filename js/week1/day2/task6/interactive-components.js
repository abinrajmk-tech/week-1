const content = document.querySelector(".content");
const contentBtn = document.querySelector("#content-btn");
const tab1 = document.querySelector("#tab-1");
const tab2 = document.querySelector("#tab-2");
const tabButton1 = document.querySelector("#tab-btn1");
const tabButton2 = document.querySelector("#tab-btn2");
const rating = document.querySelector(".rating");
sessionStorage.setItem("main-content", contentBtn.ariaExpanded);

function viewContent() {
    let isExpanded;
    isExpanded = contentBtn.getAttribute("aria-expanded") === "true";
    content.classList.toggle("content-height");
    contentBtn.setAttribute("aria-expanded", !isExpanded);
    sessionStorage.setItem("main-content", contentBtn.ariaExpanded);
}
function makeTabVisible(event) {
    const currentButton = event.target;

    if (currentButton.id === "tab-btn1") {
        tabButton1.setAttribute("aria-expanded", true);
        tabButton2.setAttribute("aria-expanded", false);

        tab1.classList.add("tab-visible");
        tab2.classList.remove("tab-visible");
    } else {
        tabButton1.setAttribute("aria-expanded", false);
        tabButton2.setAttribute("aria-expanded", true);

        tab2.classList.add("tab-visible");
        tab1.classList.remove("tab-visible");
    }
    sessionStorage.setItem("tab-1", tabButton1.ariaExpanded);
    sessionStorage.setItem("tab-2", tabButton2.ariaExpanded);
}

rating.addEventListener("click", (event) => {
    clickedBtn = event.target.closest("button");
    allBtns = clickedBtn.parentElement.children;
    if (clickedBtn.textContent != "\u2605") {
        // set ratings
        for (let i = 0; i < allBtns.length; i++) {
            allBtns[i].textContent = "\u2605";
            if (allBtns[i] === clickedBtn) {
                break;
            }
        }
    } else {
        // reset ratings
        for (let i = allBtns.length - 1; i >= 0; i--) {
            allBtns[i].textContent = "\u2606";
            if (allBtns[i - 1] === clickedBtn) {
                break;
            }
        }
    }
});

const focusBtns = document.querySelectorAll("button");
let i = 0;

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowUp") {
        if (i == 0) {
            i = focusBtns.length - 1;
        } else {
            i = i - 1;
        }
        focusBtns[i].focus();
    }
    if (event.key === "ArrowDown") {
        if (i == focusBtns.length - 1) {
            i = 0;
        } else {
            i++;
        }

        focusBtns[i].focus();
    }
    if (event.key === "Home") {
        i = 0;
        focusBtns[i].focus();
    }
    if (event.key === "End") {
        i = focusBtns.length - 1;
        focusBtns[i].focus();
    }
});
