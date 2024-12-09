import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from './ProductCard';
import { Product } from '@repo/schemas';
import { MemoryRouter } from 'react-router';

test('loads and displays ProductCard', async () => {
  var testProduct: Product = {
    id: 123,
    name: 'test',
    description: 'test description',
    image: null,
    price: 99.99
  };

  render(<MemoryRouter>
    <ProductCard key={testProduct.id} product={testProduct} />
  </MemoryRouter>);

  expect(screen.getByRole('link', { name: /ver detalles/i })).toBeInTheDocument();
})