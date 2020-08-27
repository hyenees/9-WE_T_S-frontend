import React from "react";
import { connect } from "react-redux";
import {changeQuantity} from "../../../Redux/Actions"
import CartProduct from "./CartProduct";
import WishProduct from "../Wishlist/WishProduct";
import { API_URL } from "../../../config"
import "./CartModal.scss";

class CartModal extends React.Component {
  constructor(){
    super();
    this.state={
      wishList : [],
    }
  }

  componentDidMount() {
    fetch(`${API_URL}/order/like-product`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("access_token")
      }
    })
      .then(res => res.json())
      .then(res => this.setState({
        wishList : res.wish_list
      }))
  }

  cartQuantityHandler = ()=>{
    const { cartList } = this.props
    if(cartList.length === 0){
      return 0;
    }
    if(cartList.length === 1){
      console.log(cartList[0].quantity)
      return cartList[0].quantity
    }
    if(cartList.length > 1){
      cartList.reduce((a, b) => {
        return a.quantity + b.quantity})
    }
  }

  render() {
    const {cartList, openCart, closeCart, openWishlist, closeWishlist } = this.props;
    return (
      <>
        {openCart ? (
          <div className="product-container">
            <div className="bag-title">
              <div>
                <button className="change">
                  Bag ({this.cartQuantityHandler()})
                </button>
                <button>Wishlist (0)</button>
              </div>
              <button className="close" onClick={closeCart}>
                Close
              </button>
            </div>
            {cartList.length > 0 ? 
            <CartProduct/> 
            : 
            <div className="empty-bag">
              <img src="https://www.amiparis.com/static/ami/build/images/animated-ami-mascot.84104bd9c856ea6668f2.gif" alt="man"/>
              <div>쇼핑백에 담긴 상품이 없습니다</div>
            </div>
            }
          </div>
        ) : null}
        {openWishlist && this.state.wishList.length > 0 ? (
          <div className="product-container">
            <div className="bag-title">
              <div>
                <button>Bag (0)</button>
                <button className="change">
                  Wishlist (
                  {this.state.wishList.length}
                  )
                </button>
              </div>
              <button className="close" onClick={closeWishlist}>
                Close
              </button>
            </div>
            <div className="wish">
            <WishProduct wishList={this.state.wishList}/>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default connect(state => {
  return {
    cartList: state.cartList
  }}, { changeQuantity })(CartModal);
