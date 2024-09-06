import { isArray } from 'lodash';
import { QueryClientProvider } from 'react-query';
import priceFormat from '@utils/priceFormat';
import Price from '@react/Price/Price';
import { formatProductsResults } from '@utils/product';
import { createRoot } from 'react-dom/client';
import { SearchBarProps } from './SearchBar.types';
import { useState } from 'react';
import { useDebounce } from 'react-use';
import { useProductList } from '../../../assets/js/lib/hooks/product';
import { useCategoriesList } from '../../../assets/js/lib/hooks/category';
import { queryClient } from '../../../assets/js/lib/queryClient';
import { Category, Product } from '../../../assets/js/lib/types';

import '@components/Molecules/SearchBar/searchBar.css';

export const SearchBar = ({ type = 'classic' }: SearchBarProps) => {
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [search, setSearch] = useState('');

  const classes =
    type !== 'classic' ? `SearchBar SearchBar--${type}` : 'SearchBar';

  const [,] = useDebounce(() => setDebouncedQuery(search), 500, [search]);

  return (
    <>
      <label className={classes} aria-label="Search">
        <button className="w-4 h-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="15 15 14.48 14.47"
          >
            <path
              d="m29.22 27.93-2.81-2.82a6.29 6.29 0 0 0 1.26-3.78c0-3.5-2.84-6.33-6.33-6.33S15 17.84 15 21.33s2.84 6.33 6.33 6.33c1.41 0 2.71-.47 3.76-1.25l2.83 2.8c.17.17.4.26.64.26.5 0 .91-.39.92-.88 0-.25-.09-.49-.27-.66h.01Zm-7.89-2.08c-2.5 0-4.52-2.03-4.52-4.52 0-2.5 2.03-4.52 4.52-4.52 2.5 0 4.52 2.03 4.52 4.53 0 2.5-2.03 4.52-4.53 4.52l.01-.01Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <input
          type="text"
          name="query"
          placeholder="e.g. Shoes, T-shirts, ..."
          autoComplete="off"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </label>

      {debouncedQuery.length > 0 && (
        <div className="SearchDropdown">
          <SearchDropdown query={debouncedQuery} />
        </div>
      )}
    </>
  );
};

export const SearchDropdown = ({ query }: { query: string }) => {
  const { data: productsData, isLoading: isLoadingProducts } = useProductList({
    title: `%${query}%`,
    limit: 12
  });

  console.log(productsData);

  const { data: categoriesData = null, isLoading: isLoadingCategories } =
    useCategoriesList({
      title: query,
      limit: 12
    });

  console.log(categoriesData);

  return (
    <div className="SearchDropdown-results-grid">
      <div className="mb-8 SearchDropdown-results-products">
        <div className="mb-[14px] text-sm uppercase text-grey">
          {productsData && productsData.length > 0
            ? productsData?.length + ' produits'
            : 'Produits'}
        </div>

        {isLoadingProducts ? (
          'Chargement'
        ) : (
          <ProductsResults data={productsData?.slice(0, 4) || []} />
        )}
      </div>
      <div className="mb-8 SearchDropdown-results-categories">
        <div className="mb-[14px] uppercase text-grey text-sm">Catégories</div>
        {isLoadingCategories ? (
          'Chargement'
        ) : (
          <CategoriesResults data={categoriesData || []} />
        )}
      </div>
      {(productsData && productsData?.length > 4) ||
      (categoriesData && categoriesData?.length > 0) ? (
        <a href={`/search?query=${query}`} className="mx-auto mt-8 Button">
          Voir tous les produits
        </a>
      ) : null}
    </div>
  );
};

// TODO : Get image from API
export const ProductItem = ({ product }: { product: Product }) => {
  const defaultPSE = product.productSaleElements.find((pse) => pse.isDefault);

  return (
    <a href={product.publicUrl} className="CartItem">
      <div className="CartItem-img">
        <img src={'/'} alt="" loading="lazy" />
      </div>
      <div className="CartItem-contain">
        <strong>{product.i18ns?.fr_FR?.title}</strong>
        {defaultPSE?.productPrices[0]?.price === null ? null : (
          <div>
            <span>
              {defaultPSE?.promo &&
                priceFormat(defaultPSE.productPrices[0]?.promoPrice)}
            </span>
            <span
              className={defaultPSE?.promo ? 'mt-1 text-sm line-through' : ''}
            >
              <Price price={defaultPSE?.productPrices[0]?.price || 0} />
            </span>
          </div>
        )}
      </div>
    </a>
  );
};

const ProductsResults = ({ data }: { data: Product[] }) => {
  if (!data || data.length === 0 || !isArray(data)) {
    return (
      <div className="font-medium">Aucun résultat pour cette recherche</div>
    );
  }

  return (
    <div className="SearchDropdown-results">
      {data.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

const CategoriesResults = ({ data }: { data: Category[] }) => {
  if (!data || data.length === 0 || !isArray(data)) {
    return (
      <div className="font-medium">Aucun résultat pour cette catégorie</div>
    );
  }

  return (
    <div className="SearchDropdown-results-categories-list">
      {data.map((result) => (
        <a href={result.publicUrl} className="underline" key={result.id}>
          {result.i18ns?.fr_FR?.title}
        </a>
      ))}
    </div>
  );
};

export default function SearchBarDropdownRoot() {
  const DOMElement = document.getElementById('SearchBar');

  if (!DOMElement) return;

  const root = createRoot(DOMElement);

  root.render(
    <QueryClientProvider client={queryClient}>
      <SearchBar />
    </QueryClientProvider>
  );
}
