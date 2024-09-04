import {
  queryClient,
  useSearchCategoriesQuery,
  useSearchProductsQuery
} from '@openstudio/thelia-api-utils';
import { isArray } from 'lodash';
import { QueryClientProvider } from 'react-query';
import priceFormat from '@utils/priceFormat';
import Price from '@react/Price/Price';
import { formatProductsResults } from '@utils/product';
import { createRoot } from 'react-dom/client';
import { SearchBarProps } from './SearchBar.types';
import '@components/Molecules/SearchBar/searchBar.css';
import { useState } from 'react';
import { useDebounce } from 'react-use';

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
  const { data: productsData = null, isLoading: isLoadingProducts } =
    useSearchProductsQuery({
      /* @ts-ignore */
      ref: query,
      title: query,
      limit: 12
    });

  const { data: categoriesData = null, isLoading: isLoadingCategories } =
    useSearchCategoriesQuery({
      /* @ts-ignore */
      ref: query,
      title: query,
      limit: 12
    });

  return (
    <div className="SearchDropdown-results-grid">
      <div className="mb-8 SearchDropdown-results-products">
        <div className="mb-[14px] text-sm uppercase text-grey">
          {productsData?.length > 0
            ? productsData.length + ' produits'
            : 'Produits'}
        </div>

        {isLoadingProducts ? (
          'Chargement'
        ) : (
          <ProductsResults data={productsData?.slice(0, 4)} />
        )}
      </div>
      <div className="mb-8 SearchDropdown-results-categories">
        <div className="mb-[14px] uppercase text-grey text-sm">Catégories</div>
        {isLoadingCategories ? (
          'Chargement'
        ) : (
          <CategoriesResults data={categoriesData} />
        )}
      </div>
      {productsData?.length > 4 || categoriesData?.length > 0 ? (
        <a href={`/search?query=${query}`} className="mx-auto mt-8 Button">
          Voir tous les produits
        </a>
      ) : null}
    </div>
  );
};

export const Item = ({
  title,
  price,
  promoPrice,
  image,
  url,
  promo
}: {
  title: string;
  price: number | null;
  promoPrice: number;
  image: string;
  url: string;
  promo: boolean;
}) => {
  return (
    <a href={url} className="CartItem">
      <div className="CartItem-img">
        <img src={image} alt="" loading="lazy" />
      </div>
      <div className="CartItem-contain">
        <strong>{title}</strong>
        {price === null ? null : (
          <div>
            <span>{promo && priceFormat(promoPrice)}</span>
            <span className={promo ? 'mt-1 text-sm line-through' : ''}>
              <Price price={price} />
            </span>
          </div>
        )}
      </div>
    </a>
  );
};

// any is used because the hook response is not typed
const ProductsResults = ({ data = null }: { data: any }) => {
  if (!data || data.length === 0 || !isArray(data)) {
    return (
      <div className="font-medium">Aucun résultat pour cette recherche</div>
    );
  }

  return (
    <div className="SearchDropdown-results">
      {formatProductsResults(data).map((result) => (
        <Item {...result} key={result.id} />
      ))}
    </div>
  );
};

// any is used because the hook response is not typed
const CategoriesResults = ({ data = null }: { data: any }) => {
  if (!data || data.length === 0 || !isArray(data)) {
    return (
      <div className="font-medium">Aucun résultat pour cette catégorie</div>
    );
  }

  return (
    <div className="SearchDropdown-results-categories-list">
      {data.map((result) => (
        <a href={result.url} className="underline" key={result.id}>
          {result.i18n.title}
        </a>
      ))}
    </div>
  );
};

export default function SearchBarRoot() {
  const DOMElement = document.getElementById('SearchBar');

  if (!DOMElement) return;

  const root = createRoot(DOMElement);

  root.render(
    <QueryClientProvider client={queryClient}>
      <SearchBar />
    </QueryClientProvider>
  );
}
