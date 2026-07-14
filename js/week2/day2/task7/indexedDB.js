export default class IndexedDB {
    constructor(dbName, dbVersion, stores) {
        ((this.dbName = dbName),
            (this.dbVersion = dbVersion),
            (this.stores = stores));
        this.db = null;
    }
    openDb() {
        return new Promise((resolve, reject) => {
            if (!window.indexedDB)
                return reject(new Error("IndexedDb not supported"));

            //1. open db
            const request = window.indexedDB.open(this.dbName, this.dbVersion);

            //2. resolve successfull connection
            request.onsuccess = (e) => {
                this.db = request.result;
                resolve(this.db);
            };

            //3. handle errors
            request.onerror = (e) => {
                reject(request.error);
            };

            //4 . handle database creation and upgrades
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                this.stores.forEach((store) => {
                    if (!db.objectStoreNames.contains(store.name))
                        db.createObjectStore(store.name, store.option);
                });
            };
        });
    }
    getRecord(storeName, key) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject(new Error("database not initialized"));
            }
            if (key === undefined || key === null) {
                return reject(new Error("A valid key must be provided"));
            }

            const transaction = this.db.transaction([storeName], "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.get(key);
            request.onsuccess = (e) => {
                resolve(e.target.result);
            };
            request.onerror = (e) => {
                reject(e.target.error);
            };
        });
    }
    getAllRecords(storeName) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject(new Error("database not initialized"));
            }

            const transaction = this.db.transaction([storeName], "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = (e) => {
                resolve(e.target.result);
            };
            request.onerror = (e) => {
                reject(e.target.error);
            };
        });
    }
    addRecord(storeName, record) {
        return new Promise((resolve, reject) => {
            if (!this.db) return reject(new Error("database not initialized"));

            const transaction = this.db.transaction([storeName], "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.add(record);

            request.onsuccess = (e) => {
                resolve(e.target.result);
            };
            request.onerror = (e) => {
                reject(e.target.error);
            };
        });
    }
    deleteRecord(storeName, key) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject(new Error("database not initialized"));
            }
            if (key === undefined || key === null)
                return reject(new Error("a valid key must be provided"));
            const transaction = this.db.transaction([storeName], "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);

            request.onsuccess = (e) => {
                resolve(e.target.result);
            };
            request.onerror = (e) => {
                reject(e.target.error);
            };
        });
    }
    updateRecord(storeName, record) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject(new Error("db not initialized"));
            }

            const transaction = this.db.transaction([storeName], "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.put(record);
            request.onsuccess = (e) => {
                resolve(e.target.result);
            };
            request.onerror = (e) => {
                reject(e.target.error);
            };
        });
    }
}
