const div = document.querySelector("div");

const map = new WeakMap();

map.set(window, div);
function remove() {
    div.remove();
}
function get() {
    console.log(map.get(window));
}

class WeakObject {
    #data = new WeakSet();
    set = (value) => {
        return this.#data.set(this, value);
    };
    get = () => {
        return this.#data.get(this);
    };
}

const weakObject = new WeakObject();
