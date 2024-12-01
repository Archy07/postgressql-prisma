import { ListProductsResponse, ProductsQuery } from '@repo/schemas';
import { queryOptions } from '@tanstack/react-query';

export const productsQueryOptions = ({
  collection,
  sort,
  q,
}: ProductsQuery) => {
  const searchParams = new URLSearchParams();

  if (collection) {
    searchParams.set('collection', collection.toString());
  }

  if (sort) {
    searchParams.set('sort', sort);
  }

  if (q) {
    searchParams.set('q', q);
  }

  const url = `http://localhost:5001/api/product?${searchParams.toString()}`;

  return queryOptions<ListProductsResponse>({
    queryKey: ['productsSearch', collection, sort, q],
    queryFn: () => fetch(url).then((result) => result.json()),
  });
};