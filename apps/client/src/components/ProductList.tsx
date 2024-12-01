import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MagnifyingGlassIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid';
import { ListProductsResponse } from '@repo/schemas';
import { productsQueryOptions } from '../utils/productsQueryOptions';
import ProductCard from './ProductCard';

const collections = [1, 2, 3];

const ProductList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCollection, setSelectedCollection] = useState<number>();
    const [sortOrder, setSortOrder] = useState<'price-asc' | 'price-desc'>('price-asc');

    // Llamada a la API utilizando react-query y la utilidad `productsQueryOptions`
    const { status, data, error } = useQuery<ListProductsResponse>({
        ...productsQueryOptions({
            collection: selectedCollection,
            sort: sortOrder,
            q: searchTerm,
        })
    });

    if (status === 'error') {
        return <span>Error: {error instanceof Error ? error.message : 'Something went wrong'}</span>;
    }

    const products = data?.data || [];

    // Funciones para manejar cambios de estado
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSortToggle = () => {
        setSortOrder((prevSortOrder) => (prevSortOrder === 'price-asc' ? 'price-desc' : 'price-asc'));
    };

    const handleCollectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCollection(Number(event.target.value));
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
                        {sortOrder === 'price-asc' ? (
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

            {/* Mostrar los productos obtenidos de la API */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.length === 0 ? (
                    <p className="col-span-full text-center">No se encontraron productos.</p>
                ) : (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductList;