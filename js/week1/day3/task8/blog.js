// Task 8 (45 min) - Blog Comment System​
// ​Comment section on blog article page: name + comment input, comments shown newest first​
// ​Support nested replies: each comment has a Reply button that opens an inline form​
// ​Upvotes persisted to localStorage - each user can upvote once per comment​
// ​Sanitise comment text using textContent not innerHTML to prevent XSS​

let comments = [];
const currentUsername = "John";

if (localStorage.getItem("comments") !== null) {
    comments = JSON.parse(localStorage.getItem("comments"));
}
function saveComments() {
    localStorage.setItem("comments", JSON.stringify(comments));
}
function renderComments() {
    const list = document.getElementById("comments-list");
    list.innerHTML = "";
    const sortedComment = [...comments].reverse();
    sortedComment.forEach((comment) => {
        if (!comment.parentId) {
            list.appendChild(createComment(comment));
        }
    });
}
function createComment(comment) {
    // comment div
    const div = document.createElement("div");
    div.className = "comment";
    div.id = `comment-${comment.id}`;

    // comment content
    const author = document.createElement("span");
    author.textContent = `@${comment.author || currentUsername}:`;
    const textP = document.createElement("p");
    textP.textContent = comment.text;
    textP.classList.add("comment-para");

    // upvote butn
    const hasUpvoted =
        comment.upvotedBy && comment.upvotedBy.includes(currentUsername);
    const upvoteBtn = document.createElement("button");
    upvoteBtn.textContent = `Upvote ${comment.upvotes}`;
    upvoteBtn.style.color = hasUpvoted ? "blue" : "black";
    upvoteBtn.onclick = () => toggleUpvote(comment.id);
    upvoteBtn.classList.add("upvote-btn");

    // reply button
    const replyBtn = document.createElement("button");
    replyBtn.textContent = "reply";
    replyBtn.onclick = () => toggleReply(comment.id);

    // reply box
    const replyDiv = document.createElement("div");
    replyDiv.id = `reply-box-${comment.id}`;
    replyDiv.classList.add("reply-container");
    replyDiv.style.display = "none";

    // reply text
    const textarea = document.createElement("textarea");
    textarea.id = `reply-text-${comment.id}`;
    textarea.placeholder = "send reply";
    textarea.classList.add("comment-text");

    //  submit btn
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "send";
    submitBtn.onclick = () => addReply(comment.id);

    replyDiv.append(textarea, submitBtn);

    // child replies container
    const repliesContainer = document.createElement("div");
    repliesContainer.className = "replies";
    repliesContainer.id = `replies-${comment.id}`;

    // commend card
    div.append(
        author,
        textP,
        upvoteBtn,
        replyBtn,
        replyDiv,
        repliesContainer,
        repliesContainer
    );

    // display replies
    const sortedComment = [...comments].reverse();
    sortedComment.forEach((c) => {
        if (c.parentId === comment.id) {
            repliesContainer.appendChild(createComment(c));
        }
    });

    return div;
}

function addMainComment() {
    const textInput = document.getElementById("main-comment");
    if (!textInput.value.trim()) return;
    const newComment = {
        id: `comment-${currentUsername}-${Date.now()}`,
        text: textInput.value.trim(),
        author: currentUsername,
        parentId: null,
        upvotes: 0,
        upvotedBy: [],
    };
    comments.push(newComment);
    saveComments();
    renderComments();
    textInput.value = "";
}
function addReply(parentId) {
    const textInput = document.getElementById(`reply-text-${parentId}`);
    if (!textInput.value.trim()) return;

    const newReply = {
        id: `reply-${currentUsername}-${Date.now().toString()}`,
        text: textInput.value.trim(),
        author: currentUsername,
        parentId: parentId,
        upvotes: 0,
        upvotedBy: [],
    };
    comments.push(newReply);
    saveComments();
    renderComments();
}

function toggleUpvote(commentId) {
    const comment = comments.find((c) => c.id === commentId);
    if (!comment) return;
    const userIndex = comment.upvotedBy.indexOf(currentUsername);
    if (userIndex == -1) {
        comment.upvotedBy.push(currentUsername);
        comment.upvotes += 1;
    } else {
        comment.upvotedBy.splice(userIndex, 1);
        comment.upvotes = comment.upvotes >= 1 ? comment.upvotes - 1 : 0;
    }
    saveComments();
    renderComments();
}
function toggleReply(commentId) {
    const box = document.getElementById(`reply-box-${commentId}`);
    box.style.display = box.style.display === "none" ? "block" : "none";
    // if (box.style.display === "none") {
    //     box.style.display = "block";
    // } else {
    //     box.style.display = "none";
    // }
}

renderComments();
