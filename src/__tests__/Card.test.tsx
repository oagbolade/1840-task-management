import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '@/Components/Card';
import { Priority, Status } from '@/Types/types';

describe('Card component', () => {
    const mockTask = {
        title: 'Test Task',
        description: 'Test Description',
        priority: 'High' as Priority,
        status: 'To Do' as Status,
        dueDate: '2023-10-01'
    };

    test('renders task details correctly', () => {
        render(<Card {...mockTask} onDelete={jest.fn()} onEdit={jest.fn()} onView={jest.fn()} />);

        expect(screen.getByText(mockTask.title)).toBeInTheDocument();
        expect(screen.getByText(mockTask.description)).toBeInTheDocument();
    });

    test('calls onDelete when delete icon is clicked', () => {
        const handleDelete = jest.fn();
        render(<Card {...mockTask} onDelete={handleDelete} onEdit={jest.fn()} onView={jest.fn()} />);

        fireEvent.click(screen.getByTestId('delete-icon'));

        expect(handleDelete).toHaveBeenCalled();
    });

    test('calls onEdit when edit icon is clicked', () => {
        const handleEdit = jest.fn();
        render(<Card {...mockTask} onDelete={jest.fn()} onEdit={handleEdit} onView={jest.fn()} />);

        fireEvent.click(screen.getByTestId('edit-icon'));

        expect(handleEdit).toHaveBeenCalled();
    });

    test('calls onView when view button is clicked', () => {
        const handleView = jest.fn();
        render(<Card {...mockTask} onDelete={jest.fn()} onEdit={jest.fn()} onView={handleView} />);

        fireEvent.click(screen.getByText('View Task'));

        expect(handleView).toHaveBeenCalled();
    });
});
