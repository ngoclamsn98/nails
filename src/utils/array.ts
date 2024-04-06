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

  data?.forEach((pkg, index) => {
    pkg?.categories?.forEach((category, position) => {
      category?.products?.forEach((product) => {
        productCategoryMap[product.id] = {
          name: `packages.${index}.categories.${position}.id`,
          category: category.id,
        };
      });
    });
  });

  return productCategoryMap;
};

export const mapValueProductToCategory = (arr, obj) => {
  if (!Object.keys(obj).length) return {};

  let transformObj = {};

  Object.values(obj).forEach((item: any) => {
    transformObj[item.name] = null;
  });

  arr.forEach((id) => {
    const itemName = obj[id]?.name;
    transformObj[itemName] = obj[id]?.category;
  });

  return transformObj;
};
