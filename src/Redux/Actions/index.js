export const addProduct = item => {
    return {
      type: "ADD_PRODUCT",
      payload: item
    }
}

export const changeQuantity = (count, name) => {
    return {
      type: "CHANGE_QUANTITY",
      payload: count,
      product_name : name,
    }
}

export const removeProduct = (name, size) => {
  return {
    type: "REMOVE_PRODUCT",
    name,
    size
  }
}

 