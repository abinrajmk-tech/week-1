// store.js
export const initialState = {
    route: {
        path: "/",
        params: {},
    },

    tasks: [
        {
            id: 0,
            title: "Create Login Page",
            assigned: "Rahul",
            due: "25-AUG-2026",
            status: "Pending",
            priority: "High",
        },
        {
            id: 1,
            title: "Design Layout",
            assigned: "Priya",
            due: "30-Jul-2026",
            status: "Completed",
            priority: "Medium",
        },
        {
            id: 2,
            title: "API Integration",
            assigned: "Arjun",
            due: "10-Sep-2026",
            status: "Pending",
            priority: "High",
        },
        {
            id: 3,
            title: "Write Unit Tests",
            assigned: "Sneha",
            due: "5-Aug-2026",
            status: "Pending",
            priority: "Low",
        },
    ],
};
export function reducer(state, action) {
    switch (action.type) {
        case "ROUTE_CHANGED":
            return {
                ...state,
                route: action.payload,
            };
        case "ADD_TASK": {
            const updatedTasks = [
                ...state.tasks,
                {
                    id: state.tasks.length,
                    ...action.payload,
                },
            ];
            return { ...state, tasks: updatedTasks };
        }
        case "UPDATE_TASK": {
            const { id, updates } = action.payload;

            const updatedTasks = state.tasks.map((task) =>
                task.id == id ? { ...task, ...updates } : task
            );

            return {
                ...state,
                tasks: updatedTasks,
            };
        }
        case "DELETE_TASK": {
            const { id } = action.payload;
            const updatedTasks = state.tasks.filter((task) => task.id != id);
            return {
                ...state,
                tasks: updatedTasks,
            };
        }
        default:
            return state;
    }
}

export function createStore(initialState, reducer) {
    let state = JSON.parse(localStorage.getItem("state")) || initialState;
    const listeners = [];
    return {
        getState() {
            return state;
        },
        dispatch(action) {
            state = reducer(state, action);
            localStorage.setItem("state", JSON.stringify(state));
            listeners.forEach((listener) => listener(state));
        },
        subscribe(listener) {
            listeners.push(listener);
            return () => {
                const index = listener.indexOf(listener);
                if (index > -1) listener.splice(index, 1);
            };
        },
    };
}

export const store = createStore(initialState, reducer);

export function getStats(tasks) {
    const total = tasks.length;
    const completed = tasks.filter(
        (task) => task.status === "Completed"
    ).length;
    return { total, completed, pending: total - completed };
}
