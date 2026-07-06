const search = document.querySelector("#search");
const usernameH = document.querySelectorAll(".username");
const avatarImg = document.querySelector(".avatar img");
const nameH2 = document.querySelector("#name");
const followerSpan = document.querySelector("#follower-count");
const followingSpan = document.querySelector("#following-count");
const bioP = document.querySelector("#bio");
const locationSpan = document.querySelector("#loc");

let controller = null;

search.addEventListener("keydown", async (event) => {
    if (event.key == "Enter") {
        try {
            if (controller) {
                controller.abort();
            }
        } catch (error) {
            console.error("previous request aborted");
        }

        controller = new AbortController();
        const usernameInput = search.value.trim();
        if (usernameInput === "") return;
        const url = `https://api.github.com/users/${usernameInput}`;
        console.log(url);
        const response = await fetch(url, { signal: controller.signal });
        if (handleError(response.status)) {
            return;
        }
        const data = await response.json();
        console.log(data);

        const username = data.login;
        const avatarUrl = data.avatar_url;
        const name = data.name;
        const followers = data.followers;
        const following = data.following;
        const bio = data.bio;
        const loc = data.location;
        for (const heading of usernameH) {
            heading.textContent = username;
        }

        avatarImg.setAttribute("src", avatarUrl);
        nameH2.textContent = name;
        followerSpan.textContent = followers;
        followingSpan.textContent = following;
        bioP.textContent = bio;
        locationSpan.textContent = loc;

        const repo_url = `https://api.github.com/users/${usernameInput}/repos`;
        const repoResponse = await fetch(repo_url);
        let repos = await repoResponse.json();

        repos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

        const repoContainer = document.querySelector(".card-container");
        repoContainer.replaceChildren();
        const repoCard = document.querySelector(".repo-card");

        for (repo of repos.splice(0, 6)) {
            const clonedRepoCard = repoCard.cloneNode(true);
            const repoNameDiv = clonedRepoCard.querySelector(".repo-name");
            const repoDescription =
                clonedRepoCard.querySelector(".description");
            const language = clonedRepoCard.querySelector(".language-badge");
            const star = clonedRepoCard.querySelector(".star-count span");

            repoNameDiv.textContent = repo.name;
            repoDescription.textContent = repo.description;
            language.textContent = repo.language;
            star.textContent = repo.stargazers_count;
            repoContainer.appendChild(clonedRepoCard);
        }
    }
});

function handleError(statusCode) {
    try {
        if (statusCode === 403) {
            throw new Error("Forbidden | rate limit exceeded");
        }
        if (statusCode === 404) {
            throw new Error("user not found");
        }
        if (statusCode === 400) {
            throw new Error("bad request");
        }
    } catch (error) {
        console.error(error.message);
        return 1;
    }
}
