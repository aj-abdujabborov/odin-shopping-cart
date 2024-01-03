import { useState, useEffect } from 'react';

function sortProducts(array, sortBy = 'title', sortDir = 'asc') {
  if (!array) return undefined;

  const sortVal = sortDir === 'desc' ? -1 : 1;
  if (sortBy === 'price') {
    return array.toSorted((a, b) => (a.price > b.price ? sortVal : -sortVal));
  }
  return array.toSorted((a, b) => (a.title > b.title ? sortVal : -sortVal));
}

const baseUrl = 'https://fakestoreapi.com';

function useProductsByCategory({ category = 'all', sortBy, sortDir }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);

  let fullUrl = baseUrl;
  if (category !== 'all') fullUrl += `/products/category/${category}`;
  else fullUrl += `/products`;

  useEffect(() => {
    setLoading(true);
    setError(null);

    (async function getData() {
      try {
        const response = await fetch(fullUrl, { mode: 'cors' });
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = sortProducts(await response.json(), sortBy, sortDir);
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

function useProductsByIds({ ids, sortBy, sortDir }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    async function fetchById(id) {
      const response = await fetch(`${baseUrl}/products/${id}`, {
        mode: 'cors',
      });
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    }

    (async function getData() {
      try {
        const responseArray = ids.map((id) => fetchById(id));

        const data = await Promise.all(responseArray);
        const sortedData = sortProducts(data, sortBy, sortDir);
        setProducts(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [ids, sortBy, sortDir]);

  return { loading, error, products };
}

export { useProductsByCategory, useProductsByIds, sortProducts };
