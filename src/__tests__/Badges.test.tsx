import { render, screen } from '@testing-library/react';
import { StatusLabel, PriorityLabel, DuedateLabel } from '@/Components/Badges';

describe('Badges components', () => {
    test('StatusLabel renders correct status', () => {
        render(<StatusLabel status="To Do" />);
        expect(screen.getByText('To Do')).toBeInTheDocument();
    });

    test('PriorityLabel renders correct priority', () => {
        render(<PriorityLabel priority="High" />);
        expect(screen.getByText('High')).toBeInTheDocument();
    });

    test('DuedateLabel renders correct date', () => {
        render(<DuedateLabel date="2023-10-01" />);
        expect(screen.getByText('2023-10-01')).toBeInTheDocument();
    });
});
