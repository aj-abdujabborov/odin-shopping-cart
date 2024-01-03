import { describe, test, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useProductsList from '../useProductsList';

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

function callHook(hookProps = { id: null }) {
  const { result, rerender } = renderHook(() => useProductsList(hookProps));

  async function fastForward() {
    await act(async () => {
      await getPromiseTimer(1000);
      rerender();
    });
  }

  return { result, rerender, fastForward };
}

describe.skip('Hook provides a list of products', () => {
  test('Loading starts as true and turns false soon after', async () => {
    const { result, fastForward } = callHook();
    expect(result.current.loading).toBe(true);
    await fastForward();
    expect(result.current.loading).toBe(false);
  });

  test('Invalid queries throw an error', async () => {
    const { result, fastForward } = callHook({ id: 999999 });
    await fastForward();
    expect(result.current.error).toBeTruthy();
  });

  test('More than 1 product is returned', async () => {
    const { result, fastForward } = callHook();
    await fastForward();
    expect(result.current.products.length).toBeGreaterThan(1);
  });

  test('Products have the expected keys', async () => {
    const { result, fastForward } = callHook();
    await fastForward();

    expect(result.current.products[0]).toHaveProperty('title');
    expect(result.current.products[0]).toHaveProperty('price');
    expect(result.current.products[0]).toHaveProperty('id');
    expect(result.current.products[0]).toHaveProperty('image');
    expect(result.current.products[0]).toHaveProperty('category');
    expect(result.current.products[0]).toHaveProperty('rating');
  });
});

describe('All input props of hooks work', () => {
  test('Category property works', async () => {
    const category = "men's clothing";
    const { result, fastForward } = callHook({ category });
    await fastForward();

    expect(
      result.current.products.every((prod) => prod.category === category),
    ).toBe(true);
  });

  test('ID property works', async () => {
    const id = 12;
    const { result, fastForward } = callHook({ id });
    await fastForward();

    expect(result.current.products.id).toBe(id);
    expect(result.current.products).toHaveProperty('title');
    expect(result.current.products).toHaveProperty('price');
    expect(result.current.products).toHaveProperty('id');
    expect(result.current.products).toHaveProperty('image');
    expect(result.current.products).toHaveProperty('category');
    expect(result.current.products).toHaveProperty('rating');
  });
});
