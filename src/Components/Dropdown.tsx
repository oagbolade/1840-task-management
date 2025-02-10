'use client'

import { Priority, Status } from "@/Types/types";

type DropdownProps = {
    onStatusChange: (status: Status) => void;
    onPriorityChange: (priority: Priority) => void;
    onSortChange: (sortBy: string) => void;
};

export function Dropdown({ onStatusChange, onPriorityChange, onSortChange }: DropdownProps) {
    return (
        <div className="flex justify-start gap-20 mb-10">
            <div className="flex justify-start gap-3 mb-10">
                <div className="w-30">
                    <label className="text-gray-900">Filter by:</label>
                    <select id="status" className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => onStatusChange(e.target.value as Status)} aria-label="Task status">
                        <option value="">Status</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <div className="w-30 mt-8">
                    <select id="priority" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => onPriorityChange(e.target.value as Priority)} aria-label="Task priority">
                        <option value="">Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-start gap-3 mb-10">
                <div className="w-30">
                    <label className="text-gray-900">Sort by(Desc):</label>
                    <select id="sort" className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => onSortChange(e.target.value)} aria-label="Sort tasks">
                        <option value="">Sort By</option>
                        <option value="dueDate">Due Date</option>
                        <option value="priority">Priority</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
