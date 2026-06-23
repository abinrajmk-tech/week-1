// ​Task 5 (45 min) - Arrays & Objects - Mastery​
// ​312.​
// ​Given 20 employee objects (name, dept, salary, yearsExp), chain methods to: filter Engineering​
// ​with salary > 70000, map to {name, salary}, sort by salary descending - all in one expression​
// ​313.​ ​Destructure a nested config object into flat variables in a single destructuring statement​
// ​314. ​Merge two objects with spread. Show Object.entries(), keys(), values() on the result.​
// ​315.​ ​Write deepClone(obj) that clones a flat object without JSON.parse/stringify

const employee = [
    {
        name: "John",
        dept: " engineering",
        salary: "10000",
        yearsExp: 3,
    },
    {
        name: "John B",
        dept: " engineering",
        salary: "13000",
        yearsExp: 4,
    },
    {
        name: "James A",
        dept: " engineering",
        salary: "14000",
        yearsExp: 3,
    },
    {
        name: "Name 1",
        dept: " engineering",
        salary: "16000",
        yearsExp: 3,
    },
    {
        name: "Name 2",
        dept: " engineering",
        salary: "64000",
        yearsExp: 3,
    },
    {
        name: "Name 3",
        dept: " engineering",
        salary: "16000",
        yearsExp: 3,
    },
    {
        name: "Name 4",
        dept: " engineering",
        salary: "64000",
        yearsExp: 3,
    },
    {
        name: "Name 5",
        dept: " engineering",
        salary: "83000",
        yearsExp: 7,
    },
    {
        name: "Name 6",
        dept: " engineering",
        salary: "82000",
        yearsExp: 7,
    },
    {
        name: "Name 7",
        dept: " engineering",
        salary: "74000",
        yearsExp: 7,
    },
    {
        name: "Name 8",
        dept: " engineering",
        salary: "84000",
        yearsExp: 7,
    },
    {
        name: "Name 9",
        dept: " engineering",
        salary: "14000",
        yearsExp: 3,
    },
    {
        name: "Name 10",
        dept: " engineering",
        salary: "14000",
        yearsExp: 3,
    },
    {
        name: "Name 11",
        dept: " engineering",
        salary: "14000",
        yearsExp: 3,
    },
    {
        name: "Name 12",
        dept: " engineering",
        salary: "14000",
        yearsExp: 3,
    },
    {
        name: "Name 13",
        dept: " engineering",
        salary: "14000",
        yearsExp: 3,
    },
    {
        name: "Name 14",
        dept: " engineering",
        salary: "14000",
        yearsExp: 3,
    },
    {
        name: "Name 15",
        dept: " engineering",
        salary: "14000",
        yearsExp: 3,
    },
    {
        name: "Name 16",
        dept: " engineering",
        salary: "14000",
        yearsExp: 3,
    },
    {
        name: "Name 17",
        dept: " engineering",
        salary: "14000",
        yearsExp: 3,
    },
];

const highPaidEmployees = employee
    .filter((emp) => emp.salary > 70000)
    .map((emp) => ({
        name: emp.name,
        salary: emp.salary,
    }))
    .sort((emp1, emp2) => emp2.salary - emp1.salary);

console.log(highPaidEmployees);

// destructuring

const person = {
    name: " David",
    education: {
        bachelors: "btech",
        masters: "mba",
    },
};

const {
    education: { bachelors },
} = person;
console.log(bachelors);

// merge 2 object

const primaryDetails = {
    name: "Rexie",
    age: 18,
};
const secondary = {
    country: "london",
};
const details = {
    ...primaryDetails,
    ...secondary,
};

console.log(
    Object.entries(details),
    Object.keys(details),
    Object.values(details),
);

// deepClone
function deepClone(obj) {
    return structuredClone(obj);
}
const cloned = deepClone(details);
cloned.age = 20;
console.log(details);
console.log(cloned);
