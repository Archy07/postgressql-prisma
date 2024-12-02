import { useQuery } from '@tanstack/react-query';
import { ListCollectionsResponse } from '@repo/schemas';  // Asegúrate de tener la interfaz adecuada

interface CollectionSelectorProps {
  selectedCollection?: number;
  onChange: (collection: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CollectionSelector = ({ selectedCollection, onChange }: CollectionSelectorProps) => {
  // Usamos useQuery para obtener las colecciones
  const { data, status, error } = useQuery<ListCollectionsResponse>({
    queryKey: ['collections'],
    queryFn: () => fetch('http://localhost:5001/api/collection').then((res) => res.json()),
  });

  const collections = data?.data ?? [];

  if (status === 'pending') {
    return <span>Cargando colecciones...</span>;
  }

  if (status === 'error') {
    return <span>Error al cargar colecciones: {error instanceof Error ? error.message : 'Desconocido'}</span>;
  }

  return (
    <select
      value={selectedCollection}
      onChange={(e) => onChange(e)}
      className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
    >
      <option value="">Seleccionar colección</option>
      {collections.map((collection) => (
        <option key={collection.id} value={collection.id}>
          {collection.name}
        </option>
      ))}
    </select>
  );
};

export default CollectionSelector;