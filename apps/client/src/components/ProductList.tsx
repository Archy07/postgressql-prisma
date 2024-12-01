import { useState } from 'react';
import { MagnifyingGlassIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid';
import ProductCard from './ProductCard';

// Datos de ejemplo (con colecciones y precios)
const products = [
    { id: 1, name: 'Producto 1', image: '/images/product1.jpg', price: 19.99, collections: ['Colección A', 'Colección B'] },
    { id: 2, name: 'Producto 2', image: '/images/product2.jpg', price: 29.99, collections: ['Colección B'] },
    { id: 3, name: 'Producto 3', image: '/images/product3.jpg', price: 39.99, collections: ['Colección A'] },
    // Más productos
];

const collections = ['Colección A', 'Colección B', 'Colección C'];

const ProductList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCollection, setSelectedCollection] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Filtrar productos por nombre
    const filteredBySearch = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filtrar productos por colección seleccionada
    const filteredByCollection = selectedCollection
        ? filteredBySearch.filter((product) => product.collections.includes(selectedCollection))
        : filteredBySearch;

    // Ordenar productos por precio
    const sortedProducts = [...filteredByCollection].sort((a, b) => {
        if (sortOrder === 'asc') return a.price - b.price;
        return b.price - a.price;
    });

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSortToggle = () => {
        setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };

    const handleCollectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCollection(event.target.value);
    };

    return (
        <div className="container mx-auto p-8">
            <div className="flex justify-between items-center mb-8">
                <div className="relative w-full sm:w-64">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleSortToggle}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                        aria-label="Ordenar por precio"
                    >
                        {sortOrder === 'asc' ? (
                            <ChevronDownIcon className="w-5 h-5" />
                        ) : (
                            <ChevronUpIcon className="w-5 h-5" />
                        )}
                    </button>

                    <div className="relative">
                        <select
                            value={selectedCollection}
                            onChange={handleCollectionChange}
                            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="">Seleccionar colección</option>
                            {collections.map((collection) => (
                                <option key={collection} value={collection}>
                                    {collection}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {sortedProducts.length === 0 ? (
                    <p className="col-span-full text-center">No se encontraron productos.</p>
                ) : (
                    sortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductList;