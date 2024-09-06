import { useQuery } from 'react-query';
import { Category } from '../../types';
import { fetcher } from '../../fetcher';

export const useCategoryById = (categoryId: number) => {
  return useQuery(['category', categoryId], () =>
    fetcher<Category>(`/categories/${categoryId}`)
  );
};

export const useCategoriesList = (
  params: { [key: string]: string | number } = {}
) => {
  return useQuery(['categories', params], () =>
    fetcher<Category[]>('/categories', { params })
  );
};
