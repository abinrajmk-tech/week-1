//  localstorage persistence demo
const user = "user1";

if (localStorage.getItem("user") === null) localStorage.setItem("user", user);

document.querySelector("h1").textContent = localStorage.getItem("user");

// sessionStorage persistence demo

function setSession(value) {
    sessionStorage.setItem("ttl", value);
}

// storageManager
class StorageManager {
    get(key) {
        return sessionStorage.getItem(key);
    }
    set(key, value, ttl) {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + ttl,
        };
        sessionStorage.setItem(key, JSON.stringify(item));
    }
    delete(key) {
        sessionStorage.removeItem(key);
    }
    clear() {
        sessionStorage.clear();
    }
}

const storageManager = new StorageManager();
storageManager.clear();
storageManager.set("name", "john", 5000);
storageManager.set("duration", Date.now(), 10000);
storageManager.delete("duration");

// indexDB

let db;
const studentA = {
    name: "John",
    email: "john@nomail.com",
};
function createDatabase() {
    const request = window.indexedDB.open("Students", 1);

    // event handling
    request.onerror = (e) => {
        console.error(`IndexDb error : ${e.target.error.message}`);
    };
    request.onsuccess = (e) => {
        console.info("Sucessful db connection");
        db = request.result;

        addStudent(studentA);
    };
    request.onupgradeneeded = (e) => {
        console.info("Database created");
        const db = request.result;
        const objectStore = db.createObjectStore("Students", {
            keyPath: "email",
        });
        objectStore.createIndex("email", "email", { unique: true });
        objectStore.createIndex("name", "name", { unique: false });

        objectStore.transaction.oncompleted = (e) => {
            console.log("obsect store 'Students' created");
        };
    };
}
createDatabase();
function addStudent(student) {
    if (!db) {
        console.error("db is not connected yet");
        return;
    }
    const transaction = db.transaction("Students", "readwrite");

    transaction.oncomplete = function (event) {
        console.log("transaction complete");
    };
    transaction.onerror = function (event) {
        console.error("transaction error");
    };
    const objectStore = transaction.objectStore("Students");

    // add new student
    const request = objectStore.put(student);
    request.onsuccess = () => {
        console.log(`New student added, email: ${request.result}`);

        getStudent("john@nomail.com", (student) => console.log(student));
    };
    request.onerror = (error) => {
        console.error(`Error: cannot add new student :${error}`);
    };
}
function getStudent(key, callback) {
    const request = db
        .transaction("Students", "readonly")
        .objectStore("Students")
        .get(key);
    request.onsuccess = () => {
        if (callback) callback(request.result);
    };
    request.onerror = (err) => {
        console.error(`Error to get student info : ${err}`);
    };
}
