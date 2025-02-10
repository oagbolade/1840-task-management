import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '@/Components/SearchBar';

describe('SearchBar component', () => {
    test('calls onSearch with the correct value', () => {
        const handleSearch = jest.fn();
        render(<SearchBar onSearch={handleSearch} />);

        const input = screen.getByPlaceholderText('Search task by title or description');
        fireEvent.change(input, { target: { value: 'Test' } });

        expect(handleSearch).toHaveBeenCalledWith('Test');
    });
});
