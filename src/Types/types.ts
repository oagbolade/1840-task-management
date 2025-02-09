export type Tasks = {
    title: string,
    description: string,
    priority: 'High' | 'Medium' | 'Low',
    status: 'To Do' | 'In Progress' | 'Done',
    dueDate: string
}