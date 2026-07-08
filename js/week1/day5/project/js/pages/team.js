import { fetchUsers } from "../utils.js";

export async function setUsers() {
    const [managers, engineers] = await fetchUsers();
    const managementTeam = document.querySelectorAll("#management .user-card");
    const engTeam = document.querySelectorAll("#engineering .user-card");

    setDetailsHelper(managers, managementTeam);
    setDetailsHelper(engineers, engTeam);
}

export function setDetailsHelper(team, teamContainer) {
    teamContainer.forEach((member) => {
        const index = [...teamContainer].indexOf(member);
        if (index === teamContainer.length - 1) {
            return;
        }
        const name = member.querySelector("h3");
        const catchPhrase = member.querySelector(".catch-phrase");
        name.textContent = team[index].name;
        catchPhrase.textContent = team[index].company.catchPhrase;
    });
}
setUsers();
