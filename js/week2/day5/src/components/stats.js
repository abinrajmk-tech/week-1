import { getStats, store } from "../js/store.js";
export default function stats() {
    const { tasks } = store.getState();
    const { total, completed, pending } = getStats(tasks);
    const stats = getStats(tasks);

    return  ` <div class="stats-container">
                    <div class="stats-cards">
                        ${Object.keys(stats)
                            .map((stat) => {
                                return `<div class="stats card">
                                                    <p class="value ${stat}">${stats[stat]}</p>
                                                    <p class="stat-description">${stat.toUpperCase()}</p>
                                        </div>`;
                            })
                            .join("")}
                    </div>
            </div>`;
}
