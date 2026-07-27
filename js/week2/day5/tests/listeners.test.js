beforeEach(() => {
    jest.resetModules();
    document.body.innerHTML = "";
});

describe("click events : ", () => {
    test("open modal when  add button clicked : ", async () => {
        const { default: clickEventListeners } =
            await import("../src/listeners/click.js");
        document.body.innerHTML = `<div
                class="task-modal-container"
                style="display:none"
            ></div>
            <button data-action="open-modal"></button> `;

        clickEventListeners();
        document.querySelector("button").click();

        expect(
            document.querySelector(".task-modal-container").style.display
        ).toBe("flex");
    });
    test("close modal when close button clicked : ", async () => {
        const { default: clickEventListeners } =
            await import("../src/listeners/click.js");
        document.body.innerHTML = `<div
                class="task-modal-container"
                style="display:none"
            ></div>
            <button data-action="close-modal"></button>`;
        clickEventListeners();
        document.querySelector("button").click();
        expect(
            document.querySelector(".task-modal-container").style.display
        ).toBe("none");
    });
    test("dispatch UPDATE_TASK event when compelete button clicked", async () => {
        const dispatch = jest.fn();

        jest.doMock("../src/store.js", () => ({
            store: {
                getState: () => ({
                    tasks: [
                        {
                            status: "Pending",
                        },
                    ],
                }),
                dispatch,
            },
        }));
        const { default: clickEventListeners } =
            await import("../src/listeners/click.js");
        document.body.innerHTML = ` <div class="task" data-id="0">
            <button data-action="complete"></button>
        </div>`;
        clickEventListeners();
        document.querySelector("button").click();

        expect(dispatch).toHaveBeenCalledWith({
            type: "UPDATE_TASK",
            payload: {
                id: "0",
                updates: {
                    status: "Completed",
                },
            },
        });
    });
    test("dispatch DELETE_TASK event on data-action: remove-task", async () => {
        const dispatch = jest.fn();

        jest.doMock("../src/store.js", () => ({
            store: {
                getState: () => ({
                    tasks: [
                        {
                            id: "101",
                        },
                    ],
                }),
                dispatch,
            },
        }));
        const { default: clickEventListeners } =
            await import("../src/listeners/click.js");
        document.body.innerHTML = ` <div class="task" data-id="101">
            <button data-action="remove-task"></button>
        </div>`;
        clickEventListeners();
        document.querySelector("button").click();
        expect(dispatch).toHaveBeenCalledWith({
            type: "DELETE_TASK",
            payload: {
                id: "101",
            },
        });
    });
});

describe("keydown events", () => {
    test("Escape key : closes the modal ", async () => {
        const { default: keyBoardEventListener } =
            await import("../src/listeners/key.js");
        document.body.innerHTML = `<div
            class="task-modal-container"
            style="display:flex"
        >
            <div class="task-modal" style="display:flex"></div>
        </div> `;
        keyBoardEventListener();
        const escapeEvent = new KeyboardEvent("keydown", {
            key: "Escape",
            keyCode: "27",
        });
        window.dispatchEvent(escapeEvent);

        expect(document.querySelector(".task-modal").style.display).toBe(
            "none"
        );
    });
    test("Enter key : submit the form", async () => {
        const { default: keyBoardEventListener } =
            await import("../src/listeners/key.js");
        document.body.innerHTML = `<div
            class="task-modal-container"
            style="display:flex"
        >
            <div class="task-modal" style="display:flex"></div>
            <button id="submitTask"></button>
        </div> `;
        const clickSpy = jest.spyOn(
            document.getElementById("submitTask"),
            "click"
        );
        keyBoardEventListener();
        const enterEvent = new KeyboardEvent("keydown", {
            key: "Enter",
        });
        window.dispatchEvent(enterEvent);
        expect(clickSpy).toHaveBeenCalledTimes(2);
    });
});

describe("submit events", () => {
    test("submiting form dispatch ADD_TASK", async () => {
        const dispatch = jest.fn();
        jest.doMock("../src/store.js", () => ({
            store: {
                getState: () => ({
                    tasks: [],
                }),
                dispatch,
            },
        }));
        jest.doMock("../src/utilities/formValidator.js", () => ({
            __esModule: true,
            default: jest.fn().mockImplementation(() => ({
                validateAll: () => true,
            })),
        }));

        const { default: modal } = await import("../src/components/modal");
        const { default: submitEventListeners } =
            await import("../src/listeners/submit.js");

        document.body.innerHTML = modal();
        submitEventListeners();

        const form = document.getElementById("task-form");

        form.querySelector("input#name").value = "task";
        form.querySelector("#priority").value = "Medium";
        form.querySelector("#assignee").value = "Rahul";
        form.querySelector("#due-date").value = "2026-07-09";

        const submitButton = document.getElementById("submitTask");
        submitButton.click();
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: "ADD_TASK",
            payload: {
                title: "task",
                assigned: "Rahul",
                due: "2026-07-09",
                status: "Pending",
                priority: "Medium",
            },
        });
    });
    test("submitting invalid form : ", async () => {
        const dispatch = jest.fn();
        jest.doMock("../src/store.js", () => ({
            store: {
                getState: () => ({
                    tasks: [],
                }),
                dispatch,
            },
        }));
        jest.doMock("../src/utilities/formValidator.js", () => ({
            __esModule: true,
            default: jest.fn().mockImplementation(() => ({
                validateAll: () => false,
            })),
        }));
        const { default: modal } = await import("../src/components/modal");
        const { default: submitEventListeners } =
            await import("../src/listeners/submit.js");

        document.body.innerHTML = modal();
        submitEventListeners();

        const form = document.getElementById("task-form");

        form.querySelector("input#name").value = "task";
        form.querySelector("#priority").value = "Medium";
        form.querySelector("#assignee").value = "Rahul";
        form.querySelector("#due-date").value = "2026-07-09";

        const submitButton = document.getElementById("submitTask");
        submitButton.click();
        expect(dispatch).not.toHaveBeenCalled();
    });
});
