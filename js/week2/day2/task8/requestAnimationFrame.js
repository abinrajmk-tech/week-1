const count = document.querySelector("#count");
const bar = document.querySelector("#bar");
const barText = document.querySelector("#bar-text");
const uploading = document.querySelector("#uploading");

function countCallback() {
    const target = 100000;
    const duration = 1000;
    let start = null;
    function animateCount(now) {
        if (!start) start = now;
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const rate = 1 - (1 - progress) ** 2;
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

let currentProgress = 0;

function updateProgressBar() {
    function render() {
        let currentWidth = parseFloat(bar.style.width) || 0;
        if (currentWidth < uploadPercent) {
            bar.style.width = `${++currentWidth}%`;
            barText.textContent = `${currentWidth}%`;
            uploading.textContent = "Uploading...";
        }
        if (currentWidth < 100) {
            requestAnimationFrame(render);
        }
        if (currentWidth >= 100) {
            uploading.textContent = "Uploaded ";
        }
    }
    requestAnimationFrame(render);
}
updateProgressBar();

let uploadPercent;

function setUploadPercent() {
    setTimeout(() => {
        uploadPercent = 0;
    });
    setTimeout(() => {
        uploadPercent = 5;
    }, 500);
    setTimeout(() => {
        uploadPercent = 35;
    }, 1000);
    setTimeout(() => {
        uploadPercent = 56;
    }, 2000);
    setTimeout(() => {
        uploadPercent = 99;
    }, 3000);
    setTimeout(() => {
        uploadPercent = 100;
    }, 4000);
}
setUploadPercent();
