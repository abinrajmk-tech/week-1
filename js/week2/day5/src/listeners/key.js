export default function keyBoardEventListener() {
    window.addEventListener("keydown", (e) => {
        const modal = document.querySelector(".task-modal");
        if (e?.key === "Escape") {
            e.preventDefault();
            if (modal?.style.display === "flex") {
                modal.style.display = "none";
            }
        }
        if (e?.key === "Enter") {
            e.preventDefault();
            if (modal?.style.display === "flex") {
                const submitButton = document.getElementById("submitTask");
                submitButton.click();
            }
        }
    });
}
