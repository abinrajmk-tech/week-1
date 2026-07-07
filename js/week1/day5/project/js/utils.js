// successToast
export function showSuccessToast(message) {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerText = `${message}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
