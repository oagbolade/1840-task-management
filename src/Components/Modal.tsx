import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Priority, Status } from '@/Types/types';

type ModalProps = {
    closeModal: () => void;
    onAddTask: (task: { title: string, description: string, priority: Priority, status: Status, dueDate: string }) => void;
    task?: { title: string, description: string, priority: Priority, status: Status, dueDate: string } | null;
};

export function Modal({ closeModal, onAddTask, task }: ModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<Priority>('');
    const [status, setStatus] = useState<Status>('');
    const [dueDate, setDueDate] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setPriority(task.priority);
            setStatus(task.status);
            setDueDate(task.dueDate);
        }
    }, [task]);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!title) newErrors.title = 'Title is required';
        if (!description) newErrors.description = 'Description is required';
        if (!priority) newErrors.priority = 'Priority is required';
        if (!status) newErrors.status = 'Status is required';
        if (!dueDate) newErrors.dueDate = 'Due date is required';
        return newErrors;
    };

    const handleSubmit = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            onAddTask({ title, description, priority, status, dueDate });
            closeModal();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4 text-gray-700">{task ? 'Edit Task' : 'Add Task'}</h2>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="mb-2 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500" 
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                <textarea 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className="mb-2 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500" 
                ></textarea>
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                <select 
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value as Priority)} 
                    className="mb-2 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                >
                    <option value="">Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                {errors.priority && <p className="text-red-500 text-sm">{errors.priority}</p>}
                <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value as Status)} 
                    className="mb-2 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                >
                    <option value="">Status</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
                {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                <input 
                    type="date" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)} 
                    className="text-gray-500 mb-2 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate}</p>}
                <div className="flex justify-end gap-2">
                    <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1">
                        {task ? 'Save Changes' : 'Add Task'} <AddIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}
