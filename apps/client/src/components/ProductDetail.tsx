import { useParams } from 'react-router';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const product = { id, name: `Producto ${id}`, description: 'Descripción del producto', price: 19.99 };

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center space-x-8">
        <img src="/images/product1.jpg" alt={product.name} className="w-96 h-96 object-cover" />
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl font-semibold mt-4">${product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;