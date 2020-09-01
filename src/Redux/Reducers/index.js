import { combineReducers } from "redux";
import cartList from "./cartList";
import cartModal from "./cartModal";

export default combineReducers({ cartList, cartModal });