import { useState, useEffect } from 'react';

const cartData = (function CartData() {
  const items = [];
  const contentSubscribers = [];
  const lengthSubscribers = [];

  function subscribe(callback, data) {
    let array;
    if (data === 'number') array = lengthSubscribers;
    else if (data === 'content') array = contentSubscribers;
    array.push(callback);

    function removeSubscriber() {
      const ind = array.findIndex((setter) => setter === callback);
      array.splice(ind, 1);
    }

    return removeSubscriber;
  }

  function getNumItems() {
    return items.reduce((sum, curr) => sum + curr.count, 0);
  }

  function getItems() {
    return [...items];
  }

  function push() {
    contentSubscribers.forEach((setter) => setter([...items]));
    lengthSubscribers.forEach((setter) => setter(getNumItems()));
  }

  function addItem(itemId) {
    const thisItem = items.find((item) => item.id === itemId);
    if (thisItem) thisItem.count += 1;
    else items.push({ id: itemId, count: 1 });

    console.log(items);

    push();
  }

  function removeItem(itemId) {
    const ind = items.findIndex((item) => item.id === itemId);
    if (ind === -1) return;

    items[ind].count -= 1;
    if (items[ind].count <= 0) {
      items.splice(ind, 1);
    }

    push();
  }

  function setItemCount(itemId, count) {
    const thisItem = items.find((item) => item.id === itemId);
    if (thisItem) thisItem.count = count;
    else items.push({ id: itemId, count });

    push();
  }

  return {
    subscribe,
    getNumItems,
    getItems,
    addItem,
    removeItem,
    setItemCount,
  };
})();

function useNumCartProducts() {
  const [numCartItems, setNumCartItems] = useState(cartData.getNumItems());

  useEffect(() => {
    const cleaner = cartData.subscribe(setNumCartItems, 'number');
    return cleaner;
  }, []);

  return { numCartProducts: numCartItems };
}

function useCartProducts() {
  const [cartItems, setCartItems] = useState(cartData.getItems());

  useEffect(() => {
    const cleaner = cartData.subscribe(setCartItems, 'content');
    return cleaner;
  }, []);

  return {
    cartItems,
    addItem: cartData.addItem,
    removeItem: cartData.removeItem,
    setItemCount: cartData.setItemCount,
  };
}

export { useNumCartProducts, useCartProducts };
