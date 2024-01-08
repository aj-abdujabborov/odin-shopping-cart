import { createContext, useReducer } from 'react';

function loadFromStorage() {
  return (
    localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart'))
  );
}

function saveToStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

const initialCart = loadFromStorage() || {
  ids: [],
  counts: [],
};

function cartReducer(cart, action) {
  let updatedCart;

  switch (action.type) {
    case 'add': {
      const thisInd = cart.ids.findIndex((id) => id === action.id);
      if (thisInd >= 0) {
        updatedCart = {
          ...cart,
          counts: cart.counts.map((co, ind) => (ind === thisInd ? co + 1 : co)),
        };
      } else {
        updatedCart = {
          ...cart,
          ids: [...cart.ids, action.id],
          counts: [...cart.counts, 1],
        };
      }

      break;
    }

    case 'remove': {
      const thisInd = cart.ids.findIndex((id) => id === action.id);
      if (thisInd === -1) return cart;

      if (cart.counts[thisInd] > 1) {
        updatedCart = {
          ...cart,
          counts: cart.counts.map((co, ind) => (ind === thisInd ? co - 1 : co)),
        };
      } else {
        updatedCart = {
          ...cart,
          ids: cart.ids.filter((id, ind) => ind !== thisInd),
          counts: cart.counts.filter((id, ind) => ind !== thisInd),
        };
      }

      break;
    }

    case 'setCount': {
      const thisInd = cart.ids.findIndex((id) => id === action.id);

      if (thisInd >= 0 && action.count > 0) {
        updatedCart = {
          ...cart,
          count: cart.count.map((co, ind) =>
            ind === thisInd ? action.count : co,
          ),
        };
      } else if (thisInd >= 0 && action.count <= 0) {
        updatedCart = {
          ...cart,
          ids: cart.ids.filter((id, ind) => ind !== thisInd),
          counts: cart.counts.filter((co, ind) => ind !== thisInd),
        };
      } else if (action.count > 0) {
        updatedCart = {
          ...cart,
          ids: [...cart.ids, action.id],
          counts: [...cart.counts, action.count],
        };
      }
      break;
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }

  saveToStorage(updatedCart);
  return updatedCart;
}

const CartContext = createContext(null);
const CartDispatchContext = createContext(null);

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

export default CartProvider;
export { CartProvider, CartContext, CartDispatchContext };
