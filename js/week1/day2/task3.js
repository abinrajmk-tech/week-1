// 337 .Write gradeToLetter(score) four ways: if/else, switch, ternary chain, lookup object. Benchmark​
// ​1M calls with console.time()
// 338. Write processQueue(items) using three loops: while (until empty), do/while (at least once),​
// ​for...of over a Map
// 339. ​Write validateUser(user) using && short-circuit to check: user exists, user.email exists, email​
// ​includes @, role is admin
// 340. Refactor a provided deeply-nested if/else to use early returns - no nesting deeper than one​
// ​level​

function gradeToLetterIf(score) {
    if (score >= 90) {
        return "S";
    }
    if (score >= 70) {
        return "A";
    }
    if (score >= 60) {
        return "B";
    }
    if (score >= 50) {
        return "C";
    }
    if (score >= 40) {
        return "D";
    }
    return "E";
}
function gradeToLetterSwitch(score) {
    switch (true) {
        case score >= 90:
            return "S";
        case score >= 70:
            return "A";
        case score >= 60:
            return "B";
        case score >= 50:
            return "C";
        case score >= 40:
            return "D";
        default:
            return "E";
    }
}
function gradeToLetterTernary(score) {
    return score >= 90
        ? "S"
        : score >= 70
          ? "A"
          : score >= 60
            ? "B"
            : score >= 50
              ? "C"
              : score >= 40
                ? "D"
                : "E";
}

// doubt
function gradeToLetterLookup(score) {
    const lookup = {
        90: "S",
        70: "A",
        60: "B",
        50: "C",
        40: "D",
    };
    return lookup[score];
}

console.time();
for (let i = 0; i < 1000000; i++) {
    gradeToLetterIf(40);
}
console.timeEnd();

console.time();
for (let i = 0; i < 1000000; i++) {
    gradeToLetterSwitch(40);
}
console.timeEnd();

console.time();
for (let i = 0; i < 1000000; i++) {
    gradeToLetterTernary(40);
}
console.timeEnd();

console.time();
for (let i = 0; i < 1000000; i++) {
    gradeToLetterLookup(40);
}
console.timeEnd();

// processqueue()
const items = new Map();
for (i = 0; i < 50; i++) items.set(i, `item ${i}`);

function processQueueWhile(items) {
    let i = items.entries();
    let next = i.next();
    while (!next.done) {
        console.log(next.value);
        next = i.next();
    }
}
function processQueueDoWhile(items) {
    let i = items.entries();
    let next = i.next();
    do {
        console.log(next.value);
        next = i.next();
    } while (!next.done);
}
function processQueueFor(items) {
    for (item of items) {
        console.log(item);
    }
}

const user = {
    email: "a@gmail.com",
    role: "admin",
};
function validateUser(user) {
    if (
        user &&
        user.email &&
        String(user.email).includes("@") &&
        user.role == "admin"
    )
        return true;
    return false;
}
console.log(validateUser(user));
