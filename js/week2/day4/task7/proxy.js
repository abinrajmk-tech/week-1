const nameInput = document.getElementById("name");
const nameSpan = document.getElementById("name-span");

const state = new Proxy(
    {
        name: "Abin",
    },
    {
        get(target, property) {
            return target[property];
        },
        set(obj, prop, newVal) {
            if (prop === "name") {
                nameSpan.textContent = newVal;
            }
            obj[prop] = newVal;
            return true;
        },
        deleteProperty(target, prop) {
            if (prop in target) {
                delete target[prop];
            }
        },
    }
);
nameInput.addEventListener("input", () => {
    state.name = nameInput.value;
});
