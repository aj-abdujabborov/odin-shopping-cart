import { useContext } from 'react';
import { CartContext, CartDispatchContext } from '../CartContext';

function useCart() {
  const cart = useContext(CartContext);
  return { ...cart, numProducts: cart.counts.reduce((acc, co) => acc + co, 0) };
}

function useCartDispatch() {
  const dispatch = useContext(CartDispatchContext);
  return {
    add(id) {
      dispatch({ type: 'add', id });
    },
    remove(id) {
      dispatch({ type: 'remove', id });
    },
    setCount(id, count) {
      dispatch({ type: 'setCount', id, count });
    },
  };
}

export { useCart, useCartDispatch };
