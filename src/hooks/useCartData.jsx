import { useState, useEffect } from 'react';

const cartData = (function CartData() {
  const itemCounts = [];
  const itemIds = [];
  const idsSubscribers = [];
  const countsSubscribers = [];
  const lengthSubscribers = [];

  function loadCountsFromStorage() {
    if (localStorage.getItem('counts')) {
      JSON.parse(localStorage.getItem('counts')).forEach((count) =>
        itemCounts.push(count),
      );
    }
  }

  function loadIdsFromStorage() {
    if (localStorage.getItem('ids')) {
      JSON.parse(localStorage.getItem('ids')).forEach((id) => itemIds.push(id));
    }
  }

  function saveCountsToStorage() {
    localStorage.setItem('counts', JSON.stringify(itemCounts));
  }

  function saveIdsToStorage() {
    localStorage.setItem('ids', JSON.stringify(itemIds));
  }

  function subscribe(to, callback) {
    let array;
    if (to === 'totalCount') array = lengthSubscribers;
    else if (to === 'counts') array = countsSubscribers;
    else if (to === 'ids') array = idsSubscribers;
    else return undefined;
    array.push(callback);

    function removeSubscriber() {
      const ind = array.findIndex((setter) => setter === callback);
      array.splice(ind, 1);
    }

    return removeSubscriber;
  }

  function getNumItems() {
    return itemCounts.reduce((sum, curr) => sum + curr, 0);
  }

  function getItemCounts() {
    return itemCounts;
  }

  function getItemIds() {
    return itemIds;
  }

  function pushCountChange() {
    countsSubscribers.forEach((setter) => setter([...itemCounts]));
    lengthSubscribers.forEach((setter) => setter(getNumItems()));

    saveCountsToStorage();
  }

  function pushAllChanges() {
    pushCountChange();
    idsSubscribers.forEach((setter) => setter([...itemIds]));
    saveIdsToStorage();
  }

  function addItem(thisId) {
    const thisInd = itemIds.findIndex((id) => id === thisId);
    if (thisInd !== -1) {
      itemCounts[thisInd] += 1;
      pushCountChange();
    } else {
      itemIds.push(thisId);
      itemCounts.push(1);
      pushAllChanges();
    }
  }

  function removeItem(thisId) {
    const thisInd = itemIds.findIndex((id) => id === thisId);
    if (thisInd === -1) return;

    itemCounts[thisInd] -= 1;
    if (itemCounts[thisInd] <= 0) {
      itemCounts.splice(thisInd, 1);
      itemIds.splice(thisInd, 1);
      pushAllChanges();
    } else {
      pushCountChange();
    }
  }

  function setItemCount(thisId, count) {
    const thisInd = itemIds.findIndex((id) => id === thisId);
    if (thisInd !== -1) {
      itemCounts[thisInd] = count;
      if (itemCounts[thisInd] <= 0) {
        itemCounts.splice(thisInd, 1);
        itemIds.splice(thisInd, 1);
        pushAllChanges();
      } else {
        pushCountChange();
      }
    } else {
      itemIds.push(thisId);
      itemCounts.push(count);
      pushAllChanges();
    }
  }

  loadCountsFromStorage();
  loadIdsFromStorage();

  return {
    subscribe,
    getNumItems,
    getItemCounts,
    getItemIds,
    addItem,
    removeItem,
    setItemCount,
  };
})();

function useNumCartProducts() {
  const [numCartItems, setNumCartItems] = useState(cartData.getNumItems());

  useEffect(() => {
    const cleaner = cartData.subscribe('totalCount', setNumCartItems);
    return cleaner;
  }, []);

  return { numCartProducts: numCartItems };
}

function useCartProducts() {
  const [cartItemIds, setCartItemIds] = useState(cartData.getItemIds());
  const [cartItemCounts, setCartItemCounts] = useState(
    cartData.getItemCounts(),
  );

  useEffect(() => {
    const idsCleaner = cartData.subscribe('ids', setCartItemIds);
    const countsCleaner = cartData.subscribe('counts', setCartItemCounts);
    return () => {
      idsCleaner();
      countsCleaner();
    };
  }, []);

  return {
    cartItemIds,
    cartItemCounts,
    addItem: cartData.addItem,
    removeItem: cartData.removeItem,
    setItemCount: cartData.setItemCount,
  };
}

export { useNumCartProducts, useCartProducts };
