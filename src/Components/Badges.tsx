import { LockClock } from '@mui/icons-material'
import React from 'react'


export const StatusLabel = ({ status }: { status: 'To Do' | 'In Progress' | 'Done' }) => {

    return (
        <div className='mt-1.5'>
            {status === 'To Do' && <span className="bg-blue-700 text-white text-xs font-medium me-2 px-3 py-2 rounded-md">To Do</span>}
            {status === 'In Progress' && <span className="bg-yellow-700 text-white text-xs font-medium me-2 px-3 py-2 rounded-md">In Progress</span>}
            {status === 'Done' && <span className="bg-green-700 text-white text-xs font-medium me-2 px-3 py-2 rounded-md">Done</span>}
        </div>
    )
}

export const PriorityLabel = ({ priority }: { priority: 'High' | 'Medium' | 'Low' }) => {

    return (
        <div className='mt-1.5'>
            {priority === 'High' && <span className="bg-red-700 text-white text-xs font-medium me-2 px-3 py-2 rounded-md">High</span>}
            {priority === 'Medium' && <span className="bg-green-700 text-white text-xs font-medium me-2 px-3 py-2 rounded-md">Medium</span>}
            {priority === 'Low' && <span className="bg-yellow-400 text-white text-xs font-medium me-2 px-3 py-2 rounded-md">Low</span>}
        </div>
    )
}

export const DuedateLabel = ({ date }: { date: string }) => {

    return (
        <div className='mt-1.5'>
            <span className="bg-orange-500 text-white text-xs font-medium me-2 px-3 py-2 rounded-md">{date} <LockClock /> </span>
        </div>
    )
}
