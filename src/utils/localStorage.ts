import { Tasks } from "@/Types/types";

const TASKS_KEY = 'tasks';

export const getTasksFromLocalStorage = (): Tasks[] => {
    if (typeof window !== "undefined") {
        const tasks = localStorage.getItem(TASKS_KEY);
        return tasks ? JSON.parse(tasks) : [];
    }

    return [];
};

export const saveTasksToLocalStorage = (tasks: Tasks[]): void => {
    if (typeof window !== "undefined") {
        localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    }
};
