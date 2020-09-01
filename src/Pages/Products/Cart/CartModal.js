import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../../Redux/Actions"
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

  render() {
    const {cartList, cartModal, closeModal, openWishlist, closeWishlist, cartQuantityHandler } = this.props;
    return (
      <>
        {cartModal && (
          <div className="product-container">
            <div className="bag-title">
              <div>
                <button className="change">
                  Bag ({cartQuantityHandler()})
                </button>
                <button>Wishlist (0)</button>
              </div>
              <button className="close" onClick={closeModal}>
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
         )}
        {openWishlist && this.state.wishList.length > 0 && (
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
        )}
      </>
    );
  }
}

export default connect(state => {
  return {
    cartList: state.cartList,
    cartModal: state.cartModal,
  }}, { closeModal })(CartModal);
