import ProductCard from './ProductCard';

const products = [
  { id: 1, name: 'Producto 1', image: '/images/product1.jpg', price: 19.99 },
  { id: 2, name: 'Producto 2', image: '/images/product2.jpg', price: 29.99 },
  { id: 3, name: 'Producto 3', image: '/images/product3.jpg', price: 39.99 },
  // Más productos
];

const ProductList = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;