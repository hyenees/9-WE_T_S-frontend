export const addProduct = item => {
    return {
      type: "ADD_PRODUCT",
      payload: item
    }
}

export const changeQuantity = (count, name, size) => {
    return {
      type: "CHANGE_QUANTITY",
      payload: count,
      product_name : name,
      product_size : size,
    }
}

export const removeProduct = (name, size) => {
  return {
    type: "REMOVE_PRODUCT",
    name,
    size
  }
}

export const openModal = () => {
  return {
    type: "OPEN_MODAL"
  }
}

export const closeModal = () => {
  return {
    type: "CLOSE_MODAL"
  }
}

 