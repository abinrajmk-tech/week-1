const code = document.createElement("div");
code.textContent = `console.log('hello world')`;
const codeBlock = document.querySelector(".codeBlock");
codeBlock.append(code);

const copyToClipboard = () => {
    navigator.clipboard
        .writeText(code.textContent)
        .then(() => {
            console.log("text copied to clipboard");
            const svg = codeBlock.querySelector("button").querySelector("svg");
            svg.style.fill = "red";
            setTimeout(() => {
                svg.style.fill = "black";
            }, 2000);
        })
        .catch((error) => {
            console.error("Failed to copy text");
        });
};
codeBlock.querySelector("button").addEventListener("click", copyToClipboard);

// request notification permission

Notification.requestPermission();

document
    .querySelector("button[type='submit']")
    .addEventListener("click", () => {
        if (Notification.permission === "granted") {
            const notification = new Notification("Greetings");
        }
    });
let latitude;
let longitude;

navigator.geolocation.getCurrentPosition((position) => {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
    longitudeInput = document.querySelector("#longitude");
    latitudeInput = document.querySelector("#latitude");
    latitudeInput.value = latitude;
    longitudeInput.value = latitude;
});

// webshare api
const shareButton = document.querySelector("#shareButton");
shareButton.addEventListener("click", async () => {
    const shareData = { title: "Example Page", url: "example.com" };
    try {
        await navigator.share();
        console.log("Data was shared successfully");
    } catch (err) {
        navigator.clipboard.writeText(JSON.stringify(shareData));
        console.log("copied data to clipboard");
        console.error("Share failed:", err.message);
    }
});
