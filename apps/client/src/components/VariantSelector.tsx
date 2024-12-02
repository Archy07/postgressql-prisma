import { ListVariantsResponse } from '@repo/schemas';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface VariantSelectorProps {
  productId: number;  // Lista de variantes
}

const VariantSelector = ({ productId }: VariantSelectorProps) => {
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);

  const { data, status, error } = useQuery<ListVariantsResponse>({
    queryKey: [`variant${productId}`],
    queryFn: () => fetch(`http://localhost:5001/api/variant?productId=${productId}`).then((res) => res.json()),
  });

  if (status === 'pending') {
    return <span>Cargando variantes...</span>;
  }

  if (status === 'error') {
    return <span>Error al cargar variantes: {error instanceof Error ? error.message : 'Desconocido'}</span>;
  }

  const handleVariantChange = (variant: number) => {
    setSelectedVariant(variant);  // Cambiar variante seleccionada
  };

  const variants = data.data;

  return (
    <div className="space-x-4 mt-4">
      <p className="font-semibold">Selecciona una variante:</p>
      <div className="flex space-x-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => handleVariantChange(variant.id)}
            className={`px-4 py-2 rounded-lg border border-gray-300 focus:outline-none ${
              selectedVariant === variant.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            {variant.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VariantSelector;