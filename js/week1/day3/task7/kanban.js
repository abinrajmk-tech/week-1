const columns = document.querySelectorAll(".tasks");
const parent = document.querySelector(".container");
const todo = document.querySelector(".todo");
const tasks = document.querySelectorAll("li");
const blankli = document.createElement("li");
blankli.classList.add("blank");
tasks.forEach((task) => {
    task.tabIndex = 0;
});
let index = 0;
columns.forEach((column) => {
    column.addEventListener("dragstart", (event) => {
        console.log(event.target);
        event.target.id = "dragged-task";
    });
    column.addEventListener("dragend", (event) => {
        event.target.removeAttribute("id");
    });
    column.addEventListener("dragover", (event) => {
        event.preventDefault();
    });
    column.addEventListener("drop", (event) => {
        event.preventDefault();
        const draggedTask = document.getElementById("dragged-task");
        draggedTask.remove();
        column.children[1].appendChild(draggedTask);
    });
});

const bin = document.querySelector(".bin");
bin.addEventListener("dragover", (event) => {
    event.preventDefault();
    bin.style.border = "1px solid red";
});
bin.addEventListener("dragleave", (event) => {
    event.preventDefault();
    bin.style.border = "0";
});
bin.addEventListener("drop", (event) => {
    event.preventDefault();
    const draggedTask = document.getElementById("dragged-task");
    draggedTask.remove();
    saveStatus();
});

const addButtons = document.querySelectorAll(".add-btn");
addButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const parent = button.parentElement;
        const task = document.createElement("li");
        task.classList.add("task");
        task.setAttribute("contenteditable", "true");
        task.setAttribute("draggable", "true");
        task.textContent = "New Task";
        parent.children[1].appendChild(task);
        saveStatus();
    });
});

window.addEventListener("keydown", (event) => {
    if (document.activeElement.className != "task") return;
    if (event.code === "Space") {
        blankli.remove;
        let column = document.activeElement.parentElement.parentElement;
        index = [...columns].indexOf(column);
        const task = document.activeElement;
        task.id = "dragged-task";
    }
    if (event.code == "ArrowRight") {
        index = (((index + 1) % 3) + 3) % 3;
        columns[index].children[1].appendChild(blankli);
    }
    if (event.code == "ArrowLeft") {
        index = (((index - 1) % 3) + 3) % 3;
        columns[index].children[1].appendChild(blankli);
    }
});
window.addEventListener("keyup", (event) => {
    if (document.activeElement.className != "task") return;

    if (event.code === "Space") {
        const task = document.activeElement;
        column = columns[index];
        column.children[1].appendChild(task);
        column.children[1].removeChild(blankli);
        task.removeAttribute("id");
        task.focus();
    }
});

function saveStatus() {
    columns.forEach((column) => {
        console.log("status");
        localStorage.setItem(column.className, column.innerHTML);
    });
}

if (localStorage.getItem("todo tasks") !== null)
    columns[0].innerHTML = localStorage.getItem("todo tasks");
if (localStorage.getItem("inprogress tasks") !== null)
    columns[1].innerHTML = localStorage.getItem("inprogress tasks");
if (localStorage.getItem("done tasks") !== null)
    columns[2].innerHTML = localStorage.getItem("done tasks");
