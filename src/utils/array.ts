export const updateQuantity = (arrQty, arrUpdate) => {
  const idQuantityMap = {};

  for (const item of arrQty) {
    idQuantityMap[item.id] = item.quantity;
  }

  for (const item of arrUpdate) {
    if (idQuantityMap.hasOwnProperty(item.id)) {
      item.quantity = idQuantityMap[item.id] || 1;
    }
  }

  return arrUpdate;
};

export const totalPrice = (arr) => {
  if (!arr.length) return 0;
  return arr.reduce((init, product) => {
    return (init += product.quantity * product.price);
  }, 0);
};
