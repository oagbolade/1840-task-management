import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/Components/Button';

describe('Button component', () => {
    test('calls onClick when button is clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick} />);

        fireEvent.click(screen.getByText('Add Task'));

        expect(handleClick).toHaveBeenCalled();
    });
});
