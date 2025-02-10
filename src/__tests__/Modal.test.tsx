import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '@/Components/Modal';
import { Priority, Status } from '@/Types/types';

describe('Modal component', () => {
    const mockTask = {
        title: 'Test Task',
        description: 'Test Description',
        priority: 'High' as Priority,
        status: 'To Do' as Status,
        dueDate: '2023-10-01'
    };

    test('renders correctly in view mode', () => {
        render(<Modal closeModal={jest.fn()} onAddTask={jest.fn()} task={mockTask} isViewMode={true} />);

        expect(screen.getByDisplayValue(mockTask.title)).toBeDisabled();
        expect(screen.getByDisplayValue(mockTask.description)).toBeDisabled();
    });

    test('renders correctly in edit mode', () => {
        render(<Modal closeModal={jest.fn()} onAddTask={jest.fn()} task={mockTask} isViewMode={false} />);

        expect(screen.getByDisplayValue(mockTask.title)).not.toBeDisabled();
        expect(screen.getByDisplayValue(mockTask.description)).not.toBeDisabled();
    });

    test('calls onAddTask with correct values', () => {
        const handleAddTask = jest.fn();
        render(<Modal closeModal={jest.fn()} onAddTask={handleAddTask} task={null} isViewMode={false} />);

        fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Task' } });
        fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'New Description' } });
        fireEvent.change(screen.getByDisplayValue('Priority'), { target: { value: 'Medium' } });
        fireEvent.change(screen.getByDisplayValue('Status'), { target: { value: 'In Progress' } });
        fireEvent.change(screen.getByDisplayValue('Due Date'), { target: { value: '2023-10-10' } });

        fireEvent.click(screen.getByText('Add Task'));

        expect(handleAddTask).toHaveBeenCalledWith({
            title: 'New Task',
            description: 'New Description',
            priority: 'Medium',
            status: 'In Progress',
            dueDate: '2023-10-10'
        });
    });
});
