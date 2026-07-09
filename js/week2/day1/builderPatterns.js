// Task 2 (45 min) - Factory & Builder Patterns
// 450 : Build createUser({ name, email, role='viewer', createdAt=Date.now() }) that validates and
//          returns a frozen user with an id (use crypto.randomUUID()
// 451 : Build QueryBuilder that chains: from(table).where(condition).select(fields).limit(n).build()
//          returning a query string
// 452 : Build createNotification({ type, message, duration, dismissible }) factory with defaults and a
//          show() method

function createUser({ name, email, role = "viewer", createdAt = Date.now() }) {
    if (!name) throw new Error("Must provide a name");

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !pattern.test(email)) throw new Error("Invalid email");

    let uuid = crypto.randomUUID();
    let user = {
        uuid,
        name,
        email,
        role,
    };
    Object.freeze(user);
    return user;
}
let user = createUser({ name: "abin", email: "abin@gmail.com" });
console.log(user);
user.name = "new name";
console.log(user);

class QueryBuilder {
    constructor() {
        this.query = {
            select: ["*"],
            from: "",
            where: [],
            limit: null,
        };
    }
    select(column) {
        this.query.select = Array.isArray(column) ? column : [column];
        return this;
    }
    from(table) {
        this.query.from = table;
        return this;
    }
    where(condition) {
        this.query.where.push(condition);
        return this;
    }
    limit(count) {
        this.query.limit = count;
        return this;
    }
    build() {
        let newQuery = `SELECT  ${this.query.select.join(",")} FROM ${this.query.from} `;
        if (this.query.where.length) {
            newQuery += `WHERE ${this.query.where.join(" AND ")}`;
        }
        if (this.query.limit) {
            newQuery += ` LIMIT ${this.query.limit}`;
        }
        return newQuery;
    }
}
const query = new QueryBuilder()
    .select(["name", "email"])
    .from("users")
    .where("name='abin'")
    .limit(1)
    .build();
console.log(query);

function createNotification({
    type,
    message,
    duration = 5,
    dismissible = false,
}) {
    let notification = {
        type,
        message,
        duration,
        dismissible,
    };
    return {
        notification,
        show() {
            console.log(this.notification);
        },
    };
}
const notification = createNotification({
    type: "alert",
    message: "alert: notification",
    duration: 10,
});
notification.show();
