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
const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
new VirtualScroll(container, items, 50);
