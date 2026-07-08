//  353.
//  Add IntersectionObserver to all section headings and feature cards on the home page - add
//  class=visible to trigger CSS animations
//  354.   Add reading progress bar to the blog article page: fixed div width tracks scrollY /
//  document.body.scrollHeight
//  355.   Add back-to-top button that appears after 300px scroll - smooth scroll on click
//  356.
//  Use requestAnimationFrame for the progress bar update

const scroller = document.querySelector(".scroller");
const scrollupBtnDiv = document.querySelector(".scrollup-btn");
const scrollupBtn = document.querySelector(".scrollup-btn button");

window.addEventListener("scroll", () => {
    if (scrollupBtnDiv) {
        if (window.scrollY >= 300) {
            scrollupBtnDiv.style.opacity = "1";
        } else {
            if (scrollupBtn) scrollupBtnDiv.style.opacity = "0";
        }
    }
});

if (scrollupBtn) {
    scrollupBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}

function updateProgressBar() {
    const scrollTop = window.scrollY;
    const ScrollHeight = document.body.scrollHeight;
    const innerheight = window.innerHeight;

    if (scroller) {
        let scrollPercent;
        scrollPercent = (scrollTop / (ScrollHeight - innerheight)) * 100;
        scroller.style.width = scrollPercent + "%";
    }
    requestAnimationFrame(updateProgressBar);
}
requestAnimationFrame(updateProgressBar);
