export const init = () => {
    const content = document.querySelector(".content");
    const contentBtn = document.querySelector("#content-btn");
    const tab1 = document.querySelector("#tab-1");
    const tab2 = document.querySelector("#tab-2");
    const tabButton1 = document.querySelector("#tab-btn1");
    const tabButton2 = document.querySelector("#tab-btn2");
    sessionStorage.setItem("main-contents", contentBtn.ariaExpanded);

    contentBtn.addEventListener("click", viewContent);
    tabButton1.addEventListener("click", (event) => {
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
    });
    tabButton2.addEventListener("click", (event) => {
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
    });

    function viewContent() {
        let isExpanded;
        isExpanded = contentBtn.getAttribute("aria-expanded") === "true";
        content.classList.toggle("content-height");
        contentBtn.setAttribute("aria-expanded", !isExpanded);
        sessionStorage.setItem("main-contents", contentBtn.ariaExpanded);
    }

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
};
