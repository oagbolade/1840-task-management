import { Delete, Edit } from '@mui/icons-material';
import React from 'react';
import { DuedateLabel, PriorityLabel, StatusLabel } from './Badges';
import { Priority, Status } from '@/Types/types';

type CardProps = {
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    dueDate: string;
    onDelete: () => void;
    onEdit: () => void;
}

export function Card({title, description, priority, status, dueDate, onDelete, onEdit }: CardProps) {
    return (
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm mb-5">
            <div className='flex justify-between'>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
                <div className='flex gap-2'>
                    <p onClick={onDelete}>
                        <Delete color='error' />
                    </p>
                    <p onClick={onEdit}>
                        <Edit color='success' />
                    </p>
                </div>
            </div>
            <p className="mb-3 font-normal text-gray-700">{description}</p>

            <div className='flex justify-between'>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    View
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>

                <div className='flex'>
                    <PriorityLabel priority={priority} />
                    <StatusLabel status={status} />
                    <DuedateLabel date={dueDate} />
                </div>
            </div>

        </div>

    );
}