const ul = document.querySelector("ul");

function addTask() {
    const li = document.createElement("li");

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");

    const task = document.createElement("p");
    task.textContent = "Task ";
    task.setAttribute("contenteditable", "true");

    const button = document.createElement("button");
    button.textContent = "-";
    button.setAttribute("data-action", "remove");

    li.appendChild(input);
    li.appendChild(task);
    li.appendChild(button);
    ul.appendChild(li);
}

ul.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    const input = e.target.closest("input[type=checkbox]");
    if (button) {
        if (button.dataset.action === "remove") {
            button.parentElement.remove();
            return;
        }
        addTask();
        return;
    }
    if (input) {
        console.log("input clicked");
    }
});
