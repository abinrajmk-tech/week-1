import IndexedDB from "./indexedDB.js";

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
    column.addEventListener("dragover", (event) => {
        event.preventDefault();
    });
    column.addEventListener("drop", async (event) => {
        event.preventDefault();
        const draggedTask = document.getElementById("dragged-task");
        draggedTask.remove();
        const taskList = column.querySelector(".task-list");
        taskList.appendChild(draggedTask);
        await saveToDB();
    });
});
function handleDragStart(event) {
    event.target.id = "dragged-task";
}
function handleDragEnd(event) {
    event.target.removeAttribute("id");
}
function reattachTaskListeners() {
    const allTasks = document.querySelectorAll(".task");
    allTasks.forEach((task) => {
        task.tabIndex = 0;
        task.removeEventListener("dragstart", handleDragStart);
        task.removeEventListener("dragend", handleDragEnd);

        task.addEventListener("dragstart", handleDragStart);
        task.addEventListener("dragend", handleDragEnd);
    });
}
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
    saveToDB();
});

const addButtons = document.querySelectorAll(".add-btn");
addButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
        const parent = button.parentElement;
        const taskList = parent.querySelector(".task-list");
        const task = document.createElement("li");
        task.classList.add("task");
        task.setAttribute("contenteditable", "true");
        task.setAttribute("draggable", "true");
        task.tabIndex = 0;
        task.textContent = "New Task";
        parent.children[1].appendChild(task);
        reattachTaskListeners();
        await saveToDB();
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
        localStorage.setItem(column.className, column.innerHTML);
    });
}

const configStores = [{ name: "todo", option: { keyPath: "column" } }];
const todoDB = new IndexedDB("todoDB", 1, configStores);

async function saveToDB() {
    for (const column of columns) {
        const taskList = column.querySelector(".task-list");
        const record = {
            column: column.className,
            htmlContent: taskList.innerHTML,
        };
        await todoDB.updateRecord("todo", record);
    }
}
async function loadFromDB() {
    const records = await todoDB.getAllRecords("todo");
    for (const record of records) {
        const classSelector = `.${record.column.split(" ").join(".")}`;
        const targetColumn = document.querySelector(classSelector);
        if (targetColumn) {
            const taskList = targetColumn.querySelector(".task-list");
            if (taskList) {
                taskList.innerHTML = record.htmlContent;
            }
        }
    }
    reattachTaskListeners();
}

async function initDB() {
    await todoDB.openDb();
    console.log("db opened successfully");
    await loadFromDB();
}
initDB();

window.addEventListener("online", (event) => {
    const todoData = {};
    for (const col of columns) {
        const list = [];
        for (const task of col.querySelectorAll(".task")) {
            list.push(task.textContent.trim());
        }
        todoData[col.className] = list;
    }
    pushToMockAPI(todoData);
});

async function pushToMockAPI(todoData) {
    console.log(todoData);
    const url = "https://jsonplaceholder.typicode.com/posts";
    const options = {
        method: "POST",
        body: JSON.stringify({
            title: "TODO",
            body: todoData,
            userId: 1,
        }),
        headers: {
            "Content-type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
}
