import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

import { removeItem } from "../../redux/cart/cart.actions"

import "./CartItem.style.scss";

const CartItem = ({ removeItemFromCart, addFlashMsg, image, name, id, price, platform, quantity, history }) => {

  const removeFromCart = async () => {
    removeItemFromCart({ id })
    addFlashMsg({ msg:"Item Removed From Cart!", type: "success" })
  };

  return (
    <div className="cart-item">
      <img
        className="cart-item-image"
        src={image}
        alt={name}
      />
      <div className="cart-item-details">
        <span className="cart-item-name" onClick={()=>history.push(`/inventory/${id}`)}>
          {name.length>20?name.slice(0,20)+"...":name}
        </span>
        <span className="cart-item-price">
          Price: {price} $
        </span>
        <span className="cart-item-platform">
          Platform: {platform}
        </span>
        <span className="cart-item-quantity">
          Quantity: {quantity}
        </span>
      </div>
      <div className="cart-item-buttons">
        <button className="cart-item-remove-button" onClick={removeFromCart}>
          <i className="fa fa-trash" />
        </button>
      </div>
    </div>
  );
}

const mapDispatch = dispatch => {
    return {
        removeItemFromCart(payload) {
          dispatch(removeItem(payload.id));
        },
        addFlashMsg(payload){
          dispatch({type:"ADD_MSG", payload})
        },
    }
}

export default compose(withRouter, connect(null, mapDispatch))(CartItem)