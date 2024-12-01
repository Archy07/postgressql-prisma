import { Link } from 'react-router';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-300">
      <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-500">${product.price}</p>
      <Link to={`/productos/${product.id}`} className="text-blue-600 hover:underline mt-4 block">
        Ver detalles
      </Link>
    </div>
  );
};

export default ProductCard;