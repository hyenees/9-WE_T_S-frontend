
const INITIAL_STATE = [];

const cartList = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [ ...state, action.payload ];
    case "CHANGE_QUANTITY":
      let newArr = state;
      return newArr.map(item => {
        if(item.name === action.product_name){
          if(action.payload === 1){
            if(item.quantity === 4){
              return item;
            }
          }else{
            if(item.quantity === 1 ){
              return item;
            }
          }
          item.quantity += action.payload
        }
       return item;
      });
    case "REMOVE_PRODUCT":
      let itemList = state;
      return itemList.filter(item=>item.selectedOption !== action.size || item.name !== action.name)
    default:
      return state;
  }
};

export default cartList;