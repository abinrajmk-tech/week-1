const elem = document.querySelector(".element");

for (let i = 0; i < 10000; i++) {
    elem.style.height = `${i}px`;
}
for (let i = 0; i < 10000; i++) {
    console.log(elem.offsetHeight);
}
