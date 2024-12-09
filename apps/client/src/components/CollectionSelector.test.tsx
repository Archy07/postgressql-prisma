import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CollectionSelector from './CollectionSelector';
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

describe('CollectionSelector', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('renders loading state when collections are loading', () => {
    (useQuery as jest.Mock).mockReturnValue({
      status: 'pending',
      data: null,
      error: null,
    });

    render(<CollectionSelector onChange={mockOnChange} />);

    expect(screen.getByText('Cargando colecciones...')).toBeInTheDocument();
  });

  test('renders error state when there is an error loading collections', () => {
    (useQuery as jest.Mock).mockReturnValue({
      status: 'error',
      data: null,
      error: new Error('Error al cargar las colecciones'),
    });

    render(<CollectionSelector onChange={mockOnChange} />);

    expect(screen.getByText('Error al cargar colecciones: Error al cargar las colecciones')).toBeInTheDocument();
  });

  test('renders collection selector when collections are loaded successfully', async () => {
    const mockData = {
      data: [
        { id: 1, name: 'Colección 1' },
        { id: 2, name: 'Colección 2' },
      ],
    };

    (useQuery as jest.Mock).mockReturnValue({
      status: 'success',
      data: mockData,
      error: null,
    });

    render(<CollectionSelector onChange={mockOnChange} />);

    await waitFor(() => expect(screen.getByText('Colección 1')).toBeInTheDocument());
    expect(screen.getByText('Colección 2')).toBeInTheDocument();

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('');
  });

  test('calls onChange when a collection is selected', async () => {
    const mockData = {
      data: [
        { id: 1, name: 'Colección 1' },
        { id: 2, name: 'Colección 2' },
      ],
    };
  
    (useQuery as jest.Mock).mockReturnValue({
      status: 'success',
      data: mockData,
      error: null,
    });
  
    render(<CollectionSelector onChange={mockOnChange} />);
  
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '1' } });
  
    expect(mockOnChange).toHaveBeenCalledTimes(1);

    expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({
        value: '1',
      }),
    }));
  });
});
