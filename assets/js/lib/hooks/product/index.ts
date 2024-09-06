import { useQuery } from 'react-query';
import { Category, Product } from '../../types';
import { fetcher } from '../../fetcher';

export const useProductById = (productId: number) => {
  return useQuery(['product', productId], () =>
    fetcher<Category>(`/products/${productId}`)
  );
};

export const useProductList = (
  params: { [key: string]: string | number } = {}
) => {
  return useQuery(['products', params], () =>
    fetcher<Product[]>('/products', { params })
  );
};
