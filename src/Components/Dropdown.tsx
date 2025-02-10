'use client'

import { Priority, Status } from "@/Types/types";

type DropdownProps = {
    onStatusChange: (status: Status) => void;
    onPriorityChange: (priority: Priority) => void;
};

export function Dropdown({ onStatusChange, onPriorityChange }: DropdownProps) {
    return (
        <div className="flex justify-start gap-3 mb-10">
            <div className="w-24">
                <label htmlFor="status" className="sr-only">Status</label>
                <select id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => onStatusChange(e.target.value as Status)} aria-label="Task status">
                    <option value="">Status</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>

            <div className="w-24">
                <label htmlFor="priority" className="sr-only">Priority</label>
                <select id="priority" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => onPriorityChange(e.target.value as Priority)} aria-label="Task priority">
                    <option value="">Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>
        </div>
    )
}
