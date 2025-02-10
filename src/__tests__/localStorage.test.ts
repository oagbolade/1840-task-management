import { getTasksFromLocalStorage, saveTasksToLocalStorage } from '@/utils/localStorage';
import { Tasks } from '@/Types/types';

describe('localStorage utility functions', () => {
    const mockTasks: Tasks[] = [
        { title: 'Task 1', description: 'Description 1', priority: 'High', status: 'To Do', dueDate: '2023-10-01' },
        { title: 'Task 2', description: 'Description 2', priority: 'Medium', status: 'In Progress', dueDate: '2023-10-02' }
    ];

    beforeEach(() => {
        localStorage.clear();
    });

    test('getTasksFromLocalStorage should return an empty array if no tasks are stored', () => {
        const tasks = getTasksFromLocalStorage();
        expect(tasks).toEqual([]);
    });

    test('saveTasksToLocalStorage should save tasks to localStorage', () => {
        saveTasksToLocalStorage(mockTasks);
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        expect(storedTasks).toEqual(mockTasks);
    });

    test('getTasksFromLocalStorage should return tasks from localStorage', () => {
        localStorage.setItem('tasks', JSON.stringify(mockTasks));
        const tasks = getTasksFromLocalStorage();
        expect(tasks).toEqual(mockTasks);
    });
});
