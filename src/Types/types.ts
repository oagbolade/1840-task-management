export type Priority = "High" | "Medium" | "Low" | '';

export type Status = "To Do" | "In Progress" | "Done" | '';

export type Tasks = {
    title: string,
    description: string,
    priority: Priority,
    status: Status,
    dueDate: string
}