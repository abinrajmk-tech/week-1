import Headers from "../components/header.js";
import main from "../components/mainContent.js";

export default function Home() {
    return `
    ${Headers()}
    ${main()}
    `;
}
