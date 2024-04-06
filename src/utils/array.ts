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

export const handleShowDeleteBtn = (arr) => {
  if (!arr?.length) return false;
  return arr.some((product) => product.selected);
};

export const deleteProduct = (arrSelected, arrProduct) => {
  const ids = arrSelected
    .map((product) => {
      if (product.selected) {
        return product.id;
      }
      return null;
    })
    .filter((product) => product);
  return arrProduct.filter((product) => !ids.includes(product.id));
};

export const productToKey = (data) => {
  const productCategoryMap = {};

  data?.forEach((pkg) => {
    pkg?.categories?.forEach((category) => {
      category?.products?.forEach((product) => {
        productCategoryMap[product.id] = category.id;
      });
    });
  });
  return productCategoryMap;
};
