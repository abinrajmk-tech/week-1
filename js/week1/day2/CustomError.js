// ​ 341.​​Create ValidationError extending Error with statusCode, message, and field name​
// ​342.​ ​Write parseUserInput(input) that throws TypeError, RangeError, or ValidationError for specific​
// ​failures​
// ​343.​ ​Catch each error type separately with different handling​
// ​344.​​Add window.onerror and window.addEventListener('unhandledrejection') that display errors in a​
// ​visible overlay on the page​

class ValidationError extends Error {
    constructor(statusCode, message, fieldname) {
        super(message);
        this.statusCode = statusCode;
        this.fieldname = fieldname;
        this.name = "Validation Error";
    }
}

function parseUserInput(input) {
    try {
        if (isNaN(input.id)) {
            throw new TypeError();
        }
        if (input.id <= 0 || input.id > 100) {
            throw new RangeError();
        }
        if (!input.email.includes("@")) {
            throw new ValidationError(400, ": email must have @", "email");
        }
    } catch (error) {
        if (error instanceof TypeError) {
            console.error(error.name, "Id must be a number");
        }
        if (error instanceof RangeError) {
            console.error(error.name, "Id must be within [0-100]");
        }
        if (error instanceof ValidationError) {
            console.error(error.statusCode, error.name, error.message);
        }
    }
}
const input = {
    id: 1,
    email: "ab.com",
};
const input2 = {
    id: -11,
    email: "a@b.com",
};
parseUserInput(input);
parseUserInput(input2);
window.onerror = function (message, url, lineNo, columnNo, error) {
    const overlay = document.querySelector(".overlay");
    const errorMsg = document.querySelector(".error-msg");
    let ErrorMessage = `
    <h1>On Error</h1>
    <p>Message: ${message} </p>    
    <p>File: ${url} </p>    
    <p>Line no: ${lineNo}:${columnNo} </p>    
    `;

    errorMsg.innerHTML = ErrorMessage;
    overlay.style.display = "flex";

    return true;
};

window.addEventListener("unhandledrejection", (e) => {
    const overlay = document.querySelector(".overlay");
    const errorMsg = document.querySelector(".error-msg-2");

    let ErrorMessage = `
    <h1>Unhandledrejection</h1>
    <p>Message: promise rejected </p>    
    <p>Reason : ${e.reason} </p>    
    `;

    errorMsg.innerHTML = ErrorMessage;
});

function buttonClickFunction() {
    const rejectedPromise = new Promise((resolve, reject) => {
        reject(new Error("Unhandled Rejection"));
    });
    a();
}
