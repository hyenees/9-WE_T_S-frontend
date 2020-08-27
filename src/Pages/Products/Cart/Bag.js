import React from "react";
import { connect } from "react-redux";
import { changeQuantity, removeProduct } from "../../../Redux/Actions"
import "./CartProduct.scss";
import { GoPlus } from "react-icons/go";
import { GoDash } from "react-icons/go";

class Bag extends React.Component { 
  render() {
    const { cartList, changeQuantity, removeProduct } = this.props;
    
    return (
      cartList.map((item, i)=>(
        <div className="bag-box" key={i}>
        <div className="product">
          <div className="product-img">
            <img src={item.productImage} alt="" />
          </div>
          <div className="product-box">
            <div className="product-name">{item.name}</div>
            <div className="select-box">
              <div className="size">
                <span>Size</span>
                <div className="control">
                  <select>
                    {item.size &&
                      item.size.map((s, index) => {
                        return (
                          <option
                            selected={
                              s === item.selectedOption
                                ? "selected"
                                : ""
                            }
                            key={index}
                          >
                            {s}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="colour">
                <span>Colour</span>
                <span>{item.color}</span>
              </div>
              <div className="quantity">
                <span>Quantity</span>
                <div className="control">
                  <button
                    onClick={()=>changeQuantity(-1, item.name)}
                    style={{
                      cursor:
                        item.quantity === 1 ? "not-allowed" : "pointer",
                      color:
                        item.quantity === 1
                          ? "rgb(203, 203, 203)"
                          : "black",
                    }}
                  >
                    <GoDash size="16" position="absolute" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="4"
                    value={item.quantity}
                  />
                  <button
                    onClick={()=>changeQuantity(1, item.name)}
                    style={{
                      cursor:
                        item.quantity === 4 ? "not-allowed" : "pointer",
                      color:
                        item.quantity === 4
                          ? "rgb(203, 203, 203)"
                          : "black",
                    }}
                  >
                    <GoPlus />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="remove-price">
            <button className="remove" onClick={()=>removeProduct(item.name, item.selectedOption)}>Remove</button>
            <div className="price">
              ₩{item.price && item.price.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      ))
     
    )
  }
}
export default connect(state => {
  return {
    cartList: state.cartList
  }}, { changeQuantity, removeProduct })(Bag);
