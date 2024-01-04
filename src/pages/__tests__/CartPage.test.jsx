import { describe, test, it, expect, vi } from 'vitest';
import { render, screen, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartPage from '../CartPage';

const clickers = vi.hoisted(() => {
  const addRecords = [];
  const removeRecords = [];
  const setRecords = [];
  return {
    addItem(id) {
      addRecords.push(id);
    },
    removeItem(id) {
      removeRecords.push(id);
    },
    setItemCount(id, count) {
      setRecords.push({ id, count });
    },
    addRecords,
    removeRecords,
    setRecords,
  };
});

vi.mock('../../hooks/useCartData.jsx', () => ({
  useNumCartProducts() {
    return { numCartProducts: 4 };
  },
  useCartProducts() {
    return {
      cartItemIds: [2, 6],
      cartItemCounts: [1, 3],
      addItem: clickers.addItem,
      removeItem: clickers.removeItem,
      setItemCount: clickers.setItemCount,
    };
  },
}));

vi.mock('../../hooks/useProductsAPI.jsx', () => ({
  useProductsByIds(ids) {
    return {
      loading: false,
      error: null,
      products: [
        { id: ids[0], title: 'Backpack', price: 99.99, image: 'backpackLink' },
        { id: ids[1], title: 'Waffle', price: 4.99, image: 'waffleLink' },
      ],
    };
  },
}));

describe('Product IDs from cart are used to create a card for each product', () => {
  test('Product "Waffle" title can be found', () => {
    render(<CartPage />);

    const product = screen.getByRole('listitem', { name: 'Waffle' });
    const title = within(product).getByRole('heading');
    expect(title).toHaveTextContent('Waffle');
    // extra matcher from testing-library/jest-dom
  });

  test('Plus button exists on Waffle product', async () => {
    render(<CartPage />);

    const product = screen.getByRole('listitem', { name: 'Waffle' });
    const increaseButton = within(product).getByRole('button', {
      name: 'Increase quantity by 1',
    });
    expect(increaseButton).toBeInTheDocument();
  });

  test("Pressing plus button on Waffle product calls adder function with Waffle's ID", async () => {
    render(<CartPage />);

    const product = screen.getByRole('listitem', { name: 'Waffle' });
    const increaseButton = within(product).getByRole('button', {
      name: 'Increase quantity by 1',
    });

    const user = userEvent.setup();
    await user.click(increaseButton);
    expect(clickers.addRecords.pop()).toBe(6);
  });

  test("Pressing minus button on Waffle product calls remover function with Waffle's ID", async () => {
    render(<CartPage />);

    const product = screen.getByRole('listitem', { name: 'Waffle' });
    const decreaseButton = within(product).getByRole('button', {
      name: 'Decrease quantity by 1',
    });

    const user = userEvent.setup();
    await user.click(decreaseButton);
    expect(clickers.removeRecords.pop()).toBe(6);
  });

  test("Setting quantity on Waffle product calls setter function with Waffle's ID", async () => {
    render(<CartPage />);

    const product = screen.getByRole('listitem', { name: 'Waffle' });
    const quantityInput = within(product).getByRole('spinbutton');
    const user = userEvent.setup();

    await user.type(quantityInput, '{Backspace}5{Tab}');
    expect(quantityInput).toHaveAttribute('value', '5');
  });
});
