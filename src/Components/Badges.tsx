import { Priority, Status } from '@/Types/types'
import { LockClock } from '@mui/icons-material'
import React from 'react'


export const StatusLabel = ({ status }: { status: Status }) => {

    return (
        <div className='mt-2'>
            {status === 'To Do' && <span className="bg-blue-400 text-white text-xs font-medium me-2 px-3 py-2 rounded-3xl" aria-label="Status: To Do">To Do</span>}
            {status === 'In Progress' && <span className="bg-yellow-400 text-white text-xs font-medium me-2 px-3 py-2 rounded-3xl" aria-label="Status: In Progress">In Progress</span>}
            {status === 'Done' && <span className="bg-green-400 text-white text-xs font-medium me-2 px-3 py-2 rounded-3xl" aria-label="Status: Done">Done</span>}
        </div>
    )
}

export const PriorityLabel = ({ priority }: { priority: Priority }) => {

    return (
        <div className='mt-2'>
            {priority === 'High' && <span className="bg-red-400 text-white text-xs font-medium me-2 px-3 py-2 rounded-3xl" aria-label="Priority: High">High</span>}
            {priority === 'Medium' && <span className="bg-green-400 text-white text-xs font-medium me-2 px-3 py-2 rounded-3xl" aria-label="Priority: Medium">Medium</span>}
            {priority === 'Low' && <span className="bg-yellow-400 text-white text-xs font-medium me-2 px-3 py-2 rounded-3xl" aria-label="Priority: Low">Low</span>}
        </div>
    )
}

export const DuedateLabel = ({ date }: { date: string }) => {

    return (
        <div className='mt-2'>
            <span className="bg-orange-500 text-white text-xs font-medium me-2 px-3 py-2 rounded-md" aria-label={`Due date: ${date}`}>{date} <LockClock /> </span>
        </div>
    )
}
