import { useState } from 'react';
import { useCartProducts, useNumCartProducts } from './useCartData';

export default function CartPage() {
  const { numCartProducts } = useNumCartProducts();
  const { cartItems, addItem, removeItem, setItemCount } = useCartProducts();
  const [field, setField] = useState('');

  return (
    <div>
      <h3>Num in cart: {numCartProducts}</h3>
      <ul>
        {cartItems.map(({ id, count }) => (
          <li key={id}>
            ID: {id}, Count: {count}
          </li>
        ))}
      </ul>
      <input value={field} onChange={(e) => setField(e.target.value)} />
      <button type="button" onClick={() => addItem(field)}>
        Add
      </button>
      <button type="button" onClick={() => removeItem(field)}>
        Remove
      </button>
      <button type="button" onClick={() => setItemCount(field, 10)}>
        Set count
      </button>
    </div>
  );
}
