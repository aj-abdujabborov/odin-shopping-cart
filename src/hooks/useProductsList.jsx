import { useState, useEffect } from 'react';

function sortProducts(array, sortBy = 'title', sortDir = 'asc') {
  if (!array) return undefined;

  const sortVal = sortDir === 'desc' ? -1 : 1;
  if (sortBy === 'price') {
    return array.toSorted((a, b) => (a.price > b.price ? sortVal : -sortVal));
  }
  return array.toSorted((a, b) => (a.title > b.title ? sortVal : -sortVal));
}

function useProductsList({ id = null, category = 'all', sortBy, sortDir }) {
  // ID will override category
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);

  const baseUrl = `https://fakestoreapi.com`;
  let suffixUrl;
  if (id) suffixUrl = `/products/${id}`;
  else if (category !== 'all') suffixUrl = `/products/category/${category}`;
  else suffixUrl = `/products`;
  const fullUrl = baseUrl + suffixUrl;

  useEffect(() => {
    setLoading(true);
    setError(null);

    (async function getData() {
      try {
        const response = await fetch(fullUrl, { mode: 'cors' });
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        let data = await response.json();
        if (Array.isArray(data)) data = sortProducts(data, sortBy, sortDir);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [fullUrl, sortBy, sortDir]);

  return { loading, error, products };
}

export default useProductsList;
export { sortProducts };
