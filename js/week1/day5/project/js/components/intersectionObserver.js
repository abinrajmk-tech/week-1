const options = {
    root: null,
    rootMargin: "0px",
    scrollMargin: "0px",
    threshold: 1.0,
};

const callback = (entries) => {
    entries.forEach((entry) => {
        let element = entry.target;
        if (entry.isIntersecting) {
            console.log(element);
            element.classList.add("visible");
        } else {
            element.classList.remove("visible");
        }
    });
};
const observer = new IntersectionObserver(callback, options);

const targets = document.querySelectorAll(".targets");

for (const target of targets) {
    observer.observe(target);
}
