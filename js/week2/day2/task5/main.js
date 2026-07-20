if ("serviceWorker" in navigator) {
    console.log("serviceWorker available");
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./sw.js")
            .then((reg) => console.log("service worker registered", reg))
            .catch((err) => console.log(err));
    });
}
