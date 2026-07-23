import addButton from "./addButton.js";
import modal from "./modal.js";
import stats from "./stats.js";
import tasks from "./tasks.js";

export default function main() {
    return `
     <div class="main-content" role="main">
    ${stats()}
    ${addButton()}
    ${tasks()}
    ${modal()}

    </div>

    `;
}
