import { describe, test, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProductsByIds, useProductsByCategory } from '../useProductsAPI';

// TEST IS OUT OF DATE. NEED TO TEST TWO FUNCTIONS.

// More tests to implement
// * When a request gives error, but next gives status = ok,
//   loading is shown again, error is falsy, and data is valid
// * sortBy property functions as expected
// * sort property functions as expected

function getPromiseTimer(duration) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), duration);
  });
}

function callCategoryHook(hookProps = { category: undefined }) {
  const { result, rerender } = renderHook(() =>
    useProductsByCategory(hookProps),
  );

  async function fastForward() {
    await act(async () => {
      await getPromiseTimer(1000);
      rerender();
    });
  }

  return { result, rerender, fastForward };
}

function callIdsHook(ids = [1, 2]) {
  const { result, rerender } = renderHook(() => useProductsByIds(ids));

  async function fastForward() {
    await act(async () => {
      await getPromiseTimer(1000);
      rerender();
    });
  }

  return { result, rerender, fastForward };
}

describe('useProductsByCategory works as expected', () => {
  test('Loading starts as true and turns false soon after', async () => {
    const { result, fastForward } = callCategoryHook();
    expect(result.current.loading).toBe(true);
    await fastForward();
    expect(result.current.loading).toBe(false);
  });

  test('Invalid category throw an error', async () => {
    const { result, fastForward } = callCategoryHook({
      category: 'thisAbsoluteIsNotAProductCategory',
    });
    await fastForward();
    expect(result.current.error).toBeTruthy();
  });

  test('Valid category returns appropriate products', async () => {
    const category = "men's clothing";
    const { result, fastForward } = callCategoryHook({ category });
    await fastForward();

    expect(
      result.current.products.every((prod) => prod.category === category),
    ).toBe(true);
  });

  test('More than 1 product is returned', async () => {
    const { result, fastForward } = callCategoryHook();
    await fastForward();
    expect(result.current.products.length).toBeGreaterThan(1);
  });

  test('Products have the expected keys', async () => {
    const { result, fastForward } = callCategoryHook();
    await fastForward();

    expect(result.current.products[0]).toHaveProperty('title');
    expect(result.current.products[0]).toHaveProperty('price');
    expect(result.current.products[0]).toHaveProperty('id');
    expect(result.current.products[0]).toHaveProperty('image');
    expect(result.current.products[0]).toHaveProperty('category');
    expect(result.current.products[0]).toHaveProperty('rating');
  });
});

describe('useProductsByIds works', () => {
  test('Loading starts as true and turns false soon after', async () => {
    const { result, fastForward } = callIdsHook();
    expect(result.current.loading).toBe(true);
    await fastForward();
    expect(result.current.loading).toBe(false);
  });

  test('Invalid id throw an error', async () => {
    const { result, fastForward } = callIdsHook([999999]);
    await fastForward();
    expect(result.current.error).toBeTruthy();
  });

  test('Using valid ids return products with those ids', async () => {
    const ids = [1, 3, 5];
    const { result, fastForward } = callIdsHook(ids);
    await fastForward();

    expect(
      result.current.products.every((prod, ind) => prod.id === ids[ind]),
    ).toBe(true);
  });

  test('Products have the expected keys', async () => {
    const { result, fastForward } = callIdsHook([3]);
    await fastForward();

    expect(result.current.products[0]).toHaveProperty('title');
    expect(result.current.products[0]).toHaveProperty('price');
    expect(result.current.products[0]).toHaveProperty('id');
    expect(result.current.products[0]).toHaveProperty('image');
    expect(result.current.products[0]).toHaveProperty('category');
    expect(result.current.products[0]).toHaveProperty('rating');
  });
});
