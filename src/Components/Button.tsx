import { Add } from '@mui/icons-material'
import React from 'react'

export const Button = ({ onClick }: { onClick: () => void }) => {
    return (
        <button onClick={onClick} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
            Add Task <Add />
        </button>
    )
}
