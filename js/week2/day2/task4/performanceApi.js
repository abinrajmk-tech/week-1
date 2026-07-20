class VirtualScroll {
    constructor(container, items, itemHeight) {
        this.container = container;
        this.items = items;
        this.itemHeight = itemHeight;
        this.containerHeight = 700;
        this.visibleItems = Math.ceil(this.containerHeight / itemHeight);
        this.totalHeight = items.length * itemHeight;
        this.setupContainer();
        this.render();
        this.container.addEventListener("scroll", () => this.render());
    }
    setupContainer() {
        this.container.style.height = `${this.containerHeight}px`;
        this.container.style.overflow = "auto";
        this.container.style.position = "relative";

        this.content = document.createElement("div");
        this.content.style.height = `${this.totalHeight}px`;
        this.container.appendChild(this.content);
    }
    render() {
        const scrollTop = this.container.scrollTop;
        const startIndex = Math.floor(scrollTop / this.itemHeight);
        const endIndex = startIndex + this.visibleItems + 1;

        this.content.innerHTML = "";
        for (let i = startIndex; i <= endIndex && i < this.items.length; i++) {
            const item = document.createElement("div");
            item.style.position = "absolute";
            item.style.top = `${i * this.itemHeight}px`;
            item.style.height = `${this.itemHeight}px`;
            item.textContent = this.items[i];
            this.content.appendChild(item);
        }
    }
}

const container = document.getElementById("scroll-container");

// 1. 1000 virtual scroll items

let startTime = performance.now();
const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);
new VirtualScroll(container, items, 50);
let endTime = performance.now();
let duration = endTime - startTime;
console.log("virtual scroll :  " + duration);

// 2. render 1000 dom items
const nodes = document.getElementById("nodes");

startTime = performance.now();
for (let i = 0; i < 1000; i++) {
    const node = document.createElement("div");
    node.style.height = "1px";
    nodes.appendChild(node);
}
endTime = performance.now();
duration = endTime - startTime;
console.log("1000 DOM nodes rendered : " + duration);

// performanceObserver

// a.LargestContentfulPaint (lcp)

const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log("LCP: ", lastEntry.startTime);
});
lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

// b.Cumulative Layout Shift (cls)

const clsObserver = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
        console.log("Layout Shift:", entry);
    }
});
clsObserver.observe({ type: "layout-shift", buffered: true });

//c. performance mark()

function fib(n, a = 0, b = 1) {
    if (n == 0) return a;
    if (n == 1) return b;
    return fib(n - 1, b, a + b);
}

// start timing
performance.mark("startFib");

const result = fib(7);

//end timing
performance.mark("endFib");

const measure = performance.measure("fibDuration", "startFib", "endFib");
console.log(`result : ${result}`);
console.log(`Execution Time = ${measure.duration} sub-ms`);

// detect slow connections and disable autoplay

let preloadVideo = true;
let animations = true;
const connection = navigator.connection;
if (connection) {
    if (connection.effectiveType === "slow-2g") {
        preloadVideo = false;
        animations = false;
    } else {
        console.log(connection.effectiveType);
    }
}
