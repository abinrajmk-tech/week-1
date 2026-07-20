const options = {
    root: null,
    threshold: 0.5,
};
const lazyLoadImages = (entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.src = entry.target.dataset.src;
    });
};

const imgs = document.querySelectorAll("img");
const imgObserver = new IntersectionObserver(lazyLoadImages, options);
imgs.forEach((img) => imgObserver.observe(img));

// header intersection  observer
const container = document.querySelector(".container");

function observeSentinels(container, className, getStuckState) {
    const sentinelObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            fireEvent(
                getStuckState(entry),
                entry.target.parentElement.querySelector(".sticky")
            );
        });
    });
    addSentinels(container, className).forEach((el) =>
        sentinelObserver.observe(el)
    );
}

observeSentinels(
    container,
    "sticky-sentinel-top",
    (entry) => !entry.isIntersecting && entry.boundingClientRect.top < 10
);
observeSentinels(
    container,
    "sticky-sentinel-bottom",
    (entry) => entry.isIntersecting || entry.boundingClientRect.top > 10
);

function addSentinels(container, className) {
    return Array.from(container.querySelectorAll(".sticky")).map((el) => {
        const sentinel = document.createElement("div");
        sentinel.classList.add("sticky-sentinel", className);
        el.parentElement.append(sentinel);
        return sentinel;
    });
}

function fireEvent(stuck, target) {
    const e = new CustomEvent("sticky-change", { detail: { stuck, target } });
    document.dispatchEvent(e);
}

document.addEventListener("sticky-change", (e) => {
    // console.log(e.detail.target);
});
const count = document.querySelector("#count");
function countCallback() {
    const target = 10000;
    const duration = 1000;
    let start = null;
    function animateCount(now) {
        if (!start) start = now;
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const rate = progress ** 3;
        const value = Math.floor(rate * target);
        count.textContent = value;
        if (progress < 1) {
            requestAnimationFrame(animateCount);
        }
    }
    requestAnimationFrame(animateCount);
}
const countObserver = new IntersectionObserver(countCallback, {});
countObserver.observe(count);
