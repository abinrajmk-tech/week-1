// stopPropagation
const outerLevel = document.querySelector(".box-1 .level-3");
const middle = document.querySelector(".box-1 .level-2");
const innerLevel = document.querySelector(".box-1 .level-1");

outerLevel.addEventListener("click", (e) => {
    console.log("outer div clicked " + e.currentTarget);
});
middle.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("middle div clicked " + e.currentTarget);
});
innerLevel.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("inner div clicked " + e.currentTarget);
});

//stopImmediatePropagation()
const alertButton = document.querySelector(".alert-button");
alertButton.addEventListener("click", alert1);
alertButton.addEventListener("click", alert2);

function alert1(e) {
    alert("alert 1 : stopImmediatePropagation");
    e.stopImmediatePropagation();
}
function alert2() {
    alert("alert 2");
}

// preventDefault() on form submit and on an anchor click
const form = document.querySelector("form");
const link = document.querySelector("a");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("form: prevented default submit");
});
link.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("link: prevented default redirection");
});
