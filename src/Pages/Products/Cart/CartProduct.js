import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { closeModal } from "../../../Redux/Actions"
import Bag from "./Bag";
import "./CartProduct.scss";

class CartProdcut extends React.Component {
  render() {
    const { cartList, closeModal } = this.props
    return (
      <>
        <Bag/>
        <ul className="price-box">
          <li>
            <span>Order value</span>
            <span>
              ₩
              {cartList.length === 1
                ? (
                    cartList[0].price *
                    cartList[0].quantity
                  ).toLocaleString()
                : cartList &&
                  cartList
                    .reduce((a, b) => {
                      return a.price * a.quantity + b.price * b.quantity;
                    })
                    .toLocaleString()}
            </span>
          </li>
          <li>
            <span>Shipping</span>
            <span>₩31,344</span>
          </li>
          <li>
            <span className="total">Total</span>
            <span>
              ₩
              {cartList.length === 1
                ? (
                    cartList[0].price *
                      cartList[0].quantity +
                    31344
                  ).toLocaleString()
                : cartList &&
                  cartList
                    .reduce((a, b) => {
                      return (
                        a.price * a.quantity + b.price * b.quantity + 31344
                      );
                    })
                    .toLocaleString()}
            </span>
          </li>
        </ul>
        <div className="btn-box">
          <button>Checkout</button>
          <Link to="/cart">
            <button onClick={closeModal}>View bag</button>
          </Link>
        </div>
      </>
    );
  }
}

export default connect((state => {
  return {
    cartList: state.cartList
  }}),{ closeModal })(CartProdcut);
