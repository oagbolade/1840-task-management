import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from '@/Components/Dropdown';

describe('Dropdown component', () => {
    test('calls onStatusChange with the correct value', () => {
        const handleStatusChange = jest.fn();
        render(<Dropdown onStatusChange={handleStatusChange} onPriorityChange={jest.fn()} />);

        fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'In Progress' } });

        expect(handleStatusChange).toHaveBeenCalledWith('In Progress');
    });

    test('calls onPriorityChange with the correct value', () => {
        const handlePriorityChange = jest.fn();
        render(<Dropdown onStatusChange={jest.fn()} onPriorityChange={handlePriorityChange} />);

        fireEvent.change(screen.getByLabelText('Priority'), { target: { value: 'High' } });

        expect(handlePriorityChange).toHaveBeenCalledWith('High');
    });
});
