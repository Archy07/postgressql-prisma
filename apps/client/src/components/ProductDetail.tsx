import { GetProductResponse } from '@repo/schemas';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Usamos useQuery para obtener las colecciones
  const { data, status, error } = useQuery<GetProductResponse>({
    queryKey: ['product'],
    queryFn: () => fetch(`http://localhost:5001/api/product/${id}`).then((res) => res.json()),
  });

  if (status === 'pending') {
    return <span>Cargando producto...</span>;
  }

  if (status === 'error') {
    return <span>Error al cargar producto: {error instanceof Error ? error.message : 'Desconocido'}</span>;
  }
  
  const product = data.data;

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center space-x-8">
        <img src={product.image ?? undefined} alt={product.name} className="w-96 h-96 object-cover" />
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