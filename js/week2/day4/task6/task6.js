let arr = null;
const container = document.querySelector("#container");
const sortBtn = document.querySelector("#sort-btn");
const addBtn = document.querySelector("#add-btn");

const worker = new Worker("./worker.js");
const callBack = (each) => {
    const p = document.createElement("p");
    p.textContent = each;
    container.appendChild(p);
};

addBtn.addEventListener("click", () => {
    arr = Array.from({ length: 1000 }, () => {
        return Math.floor(Math.random() * 100000);
    });
    arr.forEach(callBack);
});
sortBtn.addEventListener("click", () => {
    if (!arr.length) return;
    worker.postMessage(arr);
});
worker.onmessage = (e) => {
    const data = e.data;
    container.replaceChildren();
    data.forEach(callBack);
};
