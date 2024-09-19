import { Todo } from "@models/todo";
const fillMapper = {
    todo: "var(--color-todo)",
    "in-progress": "var(--color-in-progress)",
    done: "var(--color-done)",
    low: "var(--color-done)",
    medium: "var(--color-todo)",
    high: "var(--color-in-progress)",
}
export function exportSubtaskPriorityToChart(
    item: Todo
) {
    const { subTasks } = item;

    if (subTasks.length < 1) return [];

    const priorityMap: { [key: string]: number } = {
        low: 0,
        medium: 0,
        high: 0,
    };

    subTasks.forEach((subTask) => {
        priorityMap[subTask.priority]++;
    });

    return Object.entries(priorityMap).map(([name, value]) => ({
        name,
        value,
        fill: fillMapper[name as keyof typeof fillMapper],
    }));
}



export function exportSubtaskStatusToChart(
    item: Todo
) {
    const { subTasks } = item;

    if (subTasks.length < 1) return [];

    const statusMap: { [key: string]: number } = {
        todo: 0,
        "in-progress": 0,
        done: 0,
    }

    subTasks.forEach((subTask) => {
        statusMap[subTask.status]++;
    });

    return Object.entries(statusMap).map(([name, value]) => ({
        name,
        value,
        fill: fillMapper[name as keyof typeof fillMapper],
    }));
}