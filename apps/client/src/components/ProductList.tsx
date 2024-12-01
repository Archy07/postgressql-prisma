import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import ProductCard from './ProductCard';

const products = [
  { id: 1, name: 'Producto 1', image: '/images/product1.jpg', price: 19.99 },
  { id: 2, name: 'Producto 2', image: '/images/product2.jpg', price: 29.99 },
  { id: 3, name: 'Producto 3', image: '/images/product3.jpg', price: 39.99 },
  // Más productos
];

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center space-x-2 mb-8">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {/* Ícono de lupa */}
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;