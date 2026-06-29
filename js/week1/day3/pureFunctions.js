// ​Task 3 (45 min) - Pure Functions & Immutable State​
// ​370.​
// ​Write impure updateUser(users, id, changes) that mutates the array. Write the pure version.​
// ​Verify the original is unchanged.​
// ​371.​ ​Build a five-step pipeline: parseCSV, validateRows, transformRows, filterInvalid, formatOutput -​
// ​each a pure function with no side effects​
// ​372.​ ​Write deepFreeze(obj) that recursively freezes all nested objects
const fs = require("fs");

let users = [
    {
        id: 1,
        name: "abin",
        address: "",
    },
    {
        id: 2,
        name: "Benison",
        address: "",
    },
    {
        id: 3,
        name: "Vaishak",
        address: "",
    },
    {
        id: 4,
        name: "Aswin",
        address: "",
    },
];

// impure function
function updateUser(users, id, changes) {
    let newUser;
    users.forEach((user) => {
        if (user.id == id) {
            newUser = user;
        }
    });
    if (!newUser) {
        return null;
    }
    if (changes.id) {
        newUser.id = changes.id;
    }
    if (changes.address) {
        newUser.address = changes.address;
    }

    return 1;
}

//  pure function
function pureUpdateUser(users, id, changes) {
    let newUser;
    let result = JSON.parse(JSON.stringify(users));
    result.forEach((user) => {
        if (user.id == id) {
            newUser = user;
        }
    });
    if (!newUser) {
        return null;
    }
    if (changes.id) {
        newUser.id = changes.id;
    }
    if (changes.address) {
        newUser.address = changes.address;
    }

    return result;
}

const result = pureUpdateUser(users, 3, { id: 7, address: "address 1" });
// console.log(result);

// five step pipeline

// 1. parseCSV
function parseCSV(csv) {
    return csv.split("\n").map((row) => row.split(","));
}
// 2. validateRows
const validRows = [];
const invalidRows = [];
function validateRows(rows) {
    const result = JSON.parse(JSON.stringify(rows));
    const errors = [];
    const columnLength = rows[0].length;
    result.forEach((row, index) => {
        if (row.length != columnLength) {
            errors.push("Invalid no of Fields in rows , row no : " + index);
            invalidRows.push(index);
        } else {
            validRows.push(index);
        }
    });
    if (errors.length > 0) {
        console.log(errors);
    }
    return result;
}
// 3 transform rows
function transformRows(rows) {
    const result = JSON.parse(JSON.stringify(rows));
    result.forEach((row, index) => {
        if (index == 0) {
            return;
        }
        phone = row[3];
        row[3] = phone.replaceAll(".", "");
    });
    return result;
}
// 4 filter invalid
function filterInvalid(rows) {
    const result = JSON.parse(JSON.stringify(rows));
    const error = [];
    for (i of invalidRows) {
        result.splice(i, 1);
    }
    return result;
}
// 5 format output
function formatOutput(rows) {
    const result = JSON.parse(JSON.stringify(rows));
    const newResult = [];
    const headers = result[0];
    result.forEach((row, index) => {
        const obj = {};
        if (index === 0) {
            return;
        }
        headers.forEach((header, index2) => {
            obj[headers[index2]] = row[index2];
        });
        newResult.push(obj);
    });
    return newResult;
}

const path = "./js/week1/day3/users.csv";
function processCSV(path) {
    fs.readFile(path, "utf8", (error, data) => {
        if (error) {
            console.error("Error reading the file :", error);
        }
        const parsedCSV = parseCSV(data);
        const validatedCSV = validateRows(parsedCSV);
        const transformedCSV = transformRows(validatedCSV);
        const filteredCSV = filterInvalid(transformedCSV);
        const formatedCSV = formatOutput(filteredCSV);
        console.log(formatedCSV);
    });
}
processCSV(path);

// deepFreeze(obj)

function deepFreeze(obj) {
    const propNames = Reflect.ownKeys(obj);

    for (const name of propNames) {
        const value = obj[name];
        if (
            (value && typeof value === "object") ||
            typeof value == "function"
        ) {
            deepFreeze(value);
        }
    }
    return Object.freeze(obj);
}
const user = {
    name: "John",
    address: {
        a: null,
        b: "Germany",
    },
};
deepFreeze(user);
user.address.a = "address";
console.log(user.address.a); // output : null
// console.log(user.name);
