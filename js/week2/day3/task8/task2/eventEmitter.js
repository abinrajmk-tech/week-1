export class EventEmitter {
    constructor() {
        this.eventMap = new Map();
    }
    on(event, listener) {
        if (!this.eventMap[event]) this.eventMap[event] = [];

        this.eventMap[event].push(listener);
    }
    off(event, listener) {
        if (this.eventMap[event])
            this.eventMap[event] = this.eventMap[event].filter(
                (fn) => fn != listener
            );
    }
    emit(event, ...args) {
        if (this.eventMap[event]) {
            this.eventMap[event].forEach((listener) => listener(...args));
            if (this.eventMap["*"])
                this.eventMap["*"].forEach((listener) => listener(...args));
        }
    }
    once(event, listener) {
        const wrapper = (...args) => {
            this.off(event, wrapper);
            listener(...args);
        };
        this.on(event, wrapper);
    }
}
export class UserStore extends EventEmitter {
    constructor() {
        super();
        this.users = {};
    }
    add(id, name) {
        this.users[id] = name;
        this.emit("userAdded", id);
    }
    remove(id) {
        delete this.users.id;
        this.emit("userRemoved", id);
    }
    update(id, name) {
        this.users[id] = name;
        this.emit("userUpdated", id);
    }
}
