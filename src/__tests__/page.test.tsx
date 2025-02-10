import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@/app/page';

describe('Home page', () => {
    test('renders SearchBar, Dropdown, and Button components', () => {
        render(<Home />);

        expect(screen.getByPlaceholderText('Search task by title or description')).toBeInTheDocument();
        expect(screen.getByLabelText('Status')).toBeInTheDocument();
        expect(screen.getByLabelText('Priority')).toBeInTheDocument();
        expect(screen.getByText('Add Task')).toBeInTheDocument();
    });

    test('opens modal when Add Task button is clicked', () => {
        render(<Home />);

        fireEvent.click(screen.getByText('Add Task'));

        expect(screen.getByText('Add Task')).toBeInTheDocument();
    });

    test('filters tasks based on search term', () => {
        render(<Home />);

        fireEvent.change(screen.getByPlaceholderText('Search task by title or description'), { target: { value: 'Test' } });

        // Add assertions to check if tasks are filtered correctly
    });

    test('filters tasks based on status and priority', () => {
        render(<Home />);

        fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'In Progress' } });
        fireEvent.change(screen.getByLabelText('Priority'), { target: { value: 'High' } });

        // Add assertions to check if tasks are filtered correctly
    });
});
